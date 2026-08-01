import {
  createExecutionContext,
  env,
  waitOnExecutionContext,
} from "cloudflare:test";
import { exports } from "cloudflare:workers";
import { describe, expect, it } from "vitest";

import { TURNSTILE_ACTIONS } from "../../src/domain/turnstile";
import type { TurnstileAction } from "../../src/domain/turnstile";
import { toEdgeContext } from "../../worker/edge-context";
import { handleRequest } from "../../worker/index";
import type { TurnstileVerifier } from "../../worker/turnstile";

const verifierFor =
  (expectedAction: TurnstileAction): TurnstileVerifier =>
  (_request, _env, actualAction) =>
    Promise.resolve(
      actualAction === expectedAction
        ? {
            _tag: "verified",
            action: actualAction,
            hostname: "example.com",
          }
        : { _tag: "rejected", reason: "action_mismatch" }
    );

const protectedFetch = async (
  path: string,
  expectedAction: TurnstileAction
): Promise<Response> => {
  const ctx = createExecutionContext();
  const response = await handleRequest(
    new Request(`https://example.com${path}`, {
      body: JSON.stringify({ turnstileToken: "test-token" }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }),
    env,
    ctx,
    verifierFor(expectedAction)
  );
  await waitOnExecutionContext(ctx);
  return response;
};

describe("edge context projection", () => {
  it("returns explicit local fallbacks when Cloudflare metadata is unavailable", () => {
    expect(toEdgeContext(undefined, "2026-07-31T00:00:00.000Z")).toStrictEqual({
      city: null,
      colo: "LOCAL",
      country: null,
      edgeRttMs: null,
      generatedAt: "2026-07-31T00:00:00.000Z",
      httpProtocol: null,
      region: null,
      timezone: null,
      tlsVersion: null,
    });
  });

  it("keeps only the coarse metadata used by the public proof panel", () => {
    const cf = {
      city: "Auckland",
      clientTcpRtt: 8,
      colo: "AKL",
      country: "NZ",
      httpProtocol: "HTTP/3",
      region: "Auckland",
      timezone: "Pacific/Auckland",
      tlsVersion: "TLSv1.3",
    } as IncomingRequestCfProperties;

    expect(toEdgeContext(cf, "2026-07-31T00:00:00.000Z")).toMatchObject({
      city: "Auckland",
      colo: "AKL",
      country: "NZ",
      edgeRttMs: 8,
      httpProtocol: "HTTP/3",
      tlsVersion: "TLSv1.3",
    });
  });

  it("uses QUIC RTT when TCP metadata is unavailable", () => {
    expect(
      toEdgeContext(
        // SAFETY: toEdgeContext accepts the sparse runtime metadata projection; this test intentionally supplies only the fields it reads.
        {
          city: "Auckland",
          clientQuicRtt: 12,
          colo: "AKL",
          country: "NZ",
          httpProtocol: "HTTP/3",
          region: "Auckland",
          timezone: "Pacific/Auckland",
          tlsVersion: "TLSv1.3",
        } as unknown as IncomingRequestCfProperties,
        "2026-07-31T00:00:00.000Z"
      ).edgeRttMs
    ).toBe(12);
  });
});

describe("Worker API", () => {
  it("serves context as private JSON", async () => {
    const response = await exports.default.fetch(
      new Request("https://example.com/api/context")
    );
    const body = await response.json<{
      readonly colo: string;
      readonly generatedAt: string;
    }>();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(body.colo).toBe("LOCAL");
    expect(Number.isNaN(Date.parse(body.generatedAt))).toBeFalsy();
  });

  it("supports HEAD without returning a body", async () => {
    const response = await exports.default.fetch(
      new Request("https://example.com/api/context", { method: "HEAD" })
    );

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe("");
  });

  it("rejects unsupported methods", async () => {
    const response = await exports.default.fetch(
      new Request("https://example.com/api/context", { method: "POST" })
    );

    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET, HEAD");
    await expect(response.json()).resolves.toStrictEqual({
      error: "Method not allowed",
    });
  });

  it("keeps unknown API paths out of the SPA fallback", async () => {
    const response = await exports.default.fetch(
      new Request("https://example.com/api/missing")
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toStrictEqual({
      error: "API route not found",
    });
  });

  it("treats the API root as an API 404", async () => {
    const response = await exports.default.fetch(
      new Request("https://example.com/api")
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toStrictEqual({
      error: "API route not found",
    });
  });

  it("runs the D1 demo against migrated local data", async () => {
    const response = await protectedFetch(
      "/api/demos/d1",
      TURNSTILE_ACTIONS.d1
    );
    const body = await response.json<{
      readonly demo: string;
      readonly facts: readonly {
        readonly label: string;
        readonly value: string;
      }[];
      readonly receipt: { readonly products: readonly string[] };
    }>();

    expect(response.status).toBe(200);
    expect(body.demo).toBe("d1");
    expect(body.receipt.products).toContain("D1");
    expect(body.facts).toContainEqual({ label: "Rows returned", value: "5" });
  });

  it("seeds then reads the bounded KV demo key", async () => {
    const first = await protectedFetch("/api/demos/kv", TURNSTILE_ACTIONS.kv);
    const second = await protectedFetch("/api/demos/kv", TURNSTILE_ACTIONS.kv);
    const firstBody = await first.json<{
      readonly facts: readonly { readonly value: string }[];
    }>();
    const secondBody = await second.json<{
      readonly facts: readonly { readonly value: string }[];
    }>();

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(firstBody.facts[0]?.value).toBe("SEEDED");
    expect(secondBody.facts[0]?.value).toBe("EDGE READ");
  });

  it("keeps R2 access fixed and private", async () => {
    const response = await protectedFetch(
      "/api/demos/r2",
      TURNSTILE_ACTIONS.r2
    );
    const body = await response.json<{
      readonly artifact: { readonly href: string };
      readonly facts: readonly { readonly value: string }[];
    }>();

    expect(response.status).toBe(200);
    expect(body.facts[0]?.value).toBe("PRIVATE BINDING");
    expect(body.artifact.href).toBe("/api/demos/r2/download");
  });

  it("rejects image dimensions outside the allow-list before transforming", async () => {
    const response = await protectedFetch(
      "/api/demos/images?width=321",
      TURNSTILE_ACTIONS.images
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toStrictEqual({
      error: "Width must be one of 320, 640, or 960 pixels.",
    });
  });

  it("rejects unverified requests before running a demo", async () => {
    const response = await handleRequest(
      new Request("https://example.com/api/demos/r2", {
        body: JSON.stringify({ turnstileToken: "not-a-real-token" }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }),
      env,
      createExecutionContext(),
      verifierFor(TURNSTILE_ACTIONS.d1)
    );

    expect(response.status).toBe(403);
  });

  it("returns quota details when a demo reaches its daily limit", async () => {
    const date = new Date().toISOString().slice(0, 10);
    const quota = env.DEMO_QUOTA.getByName(`r2:${date}`);
    const resetAt = new Date(Date.now() + 86_400_000).toISOString();
    await Promise.all(
      Array.from({ length: 500 }, () => quota.take(500, resetAt))
    );

    const response = await protectedFetch(
      "/api/demos/r2",
      TURNSTILE_ACTIONS.r2
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).not.toBeNull();
    expect(response.headers.get("x-demo-quota-limit")).toBe("500");
  });

  it("rejects GET requests to protected demo routes", async () => {
    const response = await exports.default.fetch(
      new Request("https://example.com/api/demos/r2")
    );

    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST");
  });

  it("serves the public Turnstile sitekey without exposing a secret", async () => {
    const response = await exports.default.fetch(
      new Request("https://example.com/api/demos/turnstile/config")
    );
    const body = await response.json<Record<string, unknown>>();

    expect(response.status).toBe(200);
    expect(body.sitekey).toBeTypeOf("string");
    expect(body).not.toHaveProperty("secret");
  });

  it("maps the dedicated proof to its exact Turnstile action", async () => {
    const response = await protectedFetch(
      "/api/demos/turnstile",
      TURNSTILE_ACTIONS.liveLab
    );
    const body = await response.json<{
      readonly action: string;
      readonly verified: boolean;
    }>();

    expect(response.status).toBe(200);
    expect(body).toStrictEqual({
      action: TURNSTILE_ACTIONS.liveLab,
      hostname: "example.com",
      message: "Cloudflare verified a fresh, single-use Turnstile token.",
      verified: true,
    });
  });
});
