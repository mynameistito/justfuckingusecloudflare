import { exports } from "cloudflare:workers";
import {
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { TURNSTILE_ACTIONS, type TurnstileAction } from "../src/domain/turnstile";
import { toEdgeContext } from "../worker/edge-context";
import { handleRequest } from "../worker/index";
import type { TurnstileVerifier } from "../worker/turnstile";

function verifierFor(expectedAction: TurnstileAction): TurnstileVerifier {
	return async (_request, _env, actualAction) =>
		actualAction === expectedAction
			? {
				_tag: "verified",
				action: actualAction,
				hostname: "example.com",
			}
			: { _tag: "rejected", reason: "action_mismatch" };
}

async function protectedFetch(
	path: string,
	expectedAction: TurnstileAction,
): Promise<Response> {
	const ctx = createExecutionContext();
	const response = await handleRequest(
		new Request(`https://example.com${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ turnstileToken: "test-token" }),
		}),
		env,
		ctx,
		verifierFor(expectedAction),
	);
	await waitOnExecutionContext(ctx);
	return response;
}

describe("edge context projection", () => {
	it("returns explicit local fallbacks when Cloudflare metadata is unavailable", () => {
		expect(toEdgeContext(undefined, "2026-07-31T00:00:00.000Z")).toEqual({
			colo: "LOCAL",
			country: null,
			city: null,
			region: null,
			timezone: null,
			httpProtocol: null,
			tlsVersion: null,
			edgeRttMs: null,
			generatedAt: "2026-07-31T00:00:00.000Z",
		});
	});

	it("keeps only the coarse metadata used by the public proof panel", () => {
		const cf = {
			colo: "AKL",
			country: "NZ",
			city: "Auckland",
			region: "Auckland",
			timezone: "Pacific/Auckland",
			httpProtocol: "HTTP/3",
			tlsVersion: "TLSv1.3",
			clientTcpRtt: 8,
		} as IncomingRequestCfProperties;

		expect(toEdgeContext(cf, "2026-07-31T00:00:00.000Z")).toMatchObject({
			colo: "AKL",
			country: "NZ",
			city: "Auckland",
			httpProtocol: "HTTP/3",
			tlsVersion: "TLSv1.3",
			edgeRttMs: 8,
		});
	});
});

describe("Worker API", () => {
	it("serves context as private JSON", async () => {
		const response = await exports.default.fetch(
			new Request("https://example.com/api/context"),
		);
		const body = await response.json<{
			readonly colo: string;
			readonly generatedAt: string;
		}>();

		expect(response.status).toBe(200);
		expect(response.headers.get("cache-control")).toBe("no-store");
		expect(response.headers.get("x-content-type-options")).toBe("nosniff");
		expect(body.colo).toBe("LOCAL");
		expect(Number.isNaN(Date.parse(body.generatedAt))).toBe(false);
	});

	it("supports HEAD without returning a body", async () => {
		const response = await exports.default.fetch(
			new Request("https://example.com/api/context", { method: "HEAD" }),
		);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe("");
	});

	it("rejects unsupported methods", async () => {
		const response = await exports.default.fetch(
			new Request("https://example.com/api/context", { method: "POST" }),
		);

		expect(response.status).toBe(405);
		expect(response.headers.get("allow")).toBe("GET, HEAD");
		expect(await response.json()).toEqual({ error: "Method not allowed" });
	});

	it("keeps unknown API paths out of the SPA fallback", async () => {
		const response = await exports.default.fetch(
			new Request("https://example.com/api/missing"),
		);

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({ error: "API route not found" });
	});

	it("treats the API root as an API 404", async () => {
		const response = await exports.default.fetch(new Request("https://example.com/api"));

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({ error: "API route not found" });
	});

	it("runs the D1 demo against migrated local data", async () => {
		const response = await protectedFetch(
			"/api/demos/d1",
			TURNSTILE_ACTIONS.d1,
		);
		const body = await response.json<{
			readonly demo: string;
			readonly facts: ReadonlyArray<{ readonly label: string; readonly value: string }>;
			readonly receipt: { readonly products: ReadonlyArray<string> };
		}>();

		expect(response.status).toBe(200);
		expect(body.demo).toBe("d1");
		expect(body.receipt.products).toContain("D1");
		expect(body.facts).toContainEqual({ label: "Rows returned", value: "5" });
	});

	it("seeds then reads the bounded KV demo key", async () => {
		const first = await protectedFetch(
			"/api/demos/kv",
			TURNSTILE_ACTIONS.kv,
		);
		const second = await protectedFetch(
			"/api/demos/kv",
			TURNSTILE_ACTIONS.kv,
		);
		const firstBody = await first.json<{
			readonly facts: ReadonlyArray<{ readonly value: string }>;
		}>();
		const secondBody = await second.json<{
			readonly facts: ReadonlyArray<{ readonly value: string }>;
		}>();

		expect(first.status).toBe(200);
		expect(second.status).toBe(200);
		expect(firstBody.facts[0]?.value).toBe("SEEDED");
		expect(secondBody.facts[0]?.value).toBe("EDGE READ");
	});

	it("keeps R2 access fixed and private", async () => {
		const response = await protectedFetch(
			"/api/demos/r2",
			TURNSTILE_ACTIONS.r2,
		);
		const body = await response.json<{
			readonly artifact: { readonly href: string };
			readonly facts: ReadonlyArray<{ readonly value: string }>;
		}>();

		expect(response.status).toBe(200);
		expect(body.facts[0]?.value).toBe("PRIVATE BINDING");
		expect(body.artifact.href).toBe("/api/demos/r2/download");
	});

	it("rejects image dimensions outside the allow-list before transforming", async () => {
		const response = await protectedFetch(
			"/api/demos/images?width=321",
			TURNSTILE_ACTIONS.images,
		);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			error: "Width must be one of 320, 640, or 960 pixels.",
		});
	});

	it("rejects unverified requests before running a demo", async () => {
		const response = await exports.default.fetch(
			new Request("https://example.com/api/demos/r2", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ turnstileToken: "not-a-real-token" }),
			}),
		);

		expect(response.status).toBe(403);
	});

	it("rejects GET requests to protected demo routes", async () => {
		const response = await exports.default.fetch(
			new Request("https://example.com/api/demos/r2"),
		);

		expect(response.status).toBe(405);
		expect(response.headers.get("allow")).toBe("POST");
	});

	it("serves the public Turnstile sitekey without exposing a secret", async () => {
		const response = await exports.default.fetch(
			new Request("https://example.com/api/demos/turnstile/config"),
		);
		const body = await response.json<Record<string, unknown>>();

		expect(response.status).toBe(200);
		expect(typeof body.sitekey).toBe("string");
		expect(body).not.toHaveProperty("secret");
	});

	it("maps the dedicated proof to its exact Turnstile action", async () => {
		const response = await protectedFetch(
			"/api/demos/turnstile",
			TURNSTILE_ACTIONS.liveLab,
		);
		const body = await response.json<{ readonly action: string; readonly verified: boolean }>();

		expect(response.status).toBe(200);
		expect(body).toEqual({
			verified: true,
			action: TURNSTILE_ACTIONS.liveLab,
			hostname: "example.com",
			message: "Cloudflare verified a fresh, single-use Turnstile token.",
		});
	});
});
