import type {
	DemoFact,
	DemoQuotaReceipt,
	DemoResponse,
	JsonDemoId,
} from "../src/domain/live-demo";
import {
	TURNSTILE_ACTIONS,
	type TurnstileAction,
} from "../src/domain/turnstile";
import { toEdgeContext } from "./edge-context";
import type { DemoQuota, QuotaDecision } from "./demo-quota";
import {
	turnstileSitekeyForRequest,
	type TurnstileVerification,
	type TurnstileVerifier,
} from "./turnstile";

const R2_OBJECT_KEY = "public-demo/cloudflare-primitives.json";
const ALLOWED_IMAGE_WIDTHS = new Set([320, 640, 960]);

const DEMO_LIMITS = {
	d1: 1_000,
	kv: 100,
	r2: 500,
	cache: 5_000,
	images: 100,
} as const;

const R2_DOCUMENT = JSON.stringify(
	{
		title: "A deliberately boring R2 object",
		purpose: "Prove private object storage without accepting public uploads.",
		guardrails: [
			"One fixed key",
			"A tiny immutable payload",
			"Daily application quota",
		],
	},
	null,
	2,
);

const KV_PRODUCTS = [
	{ name: "Workers KV", job: "Read-heavy configuration at the edge" },
	{ name: "D1", job: "Relational data with SQLite semantics" },
	{ name: "R2", job: "Private object storage without egress fees" },
	{ name: "Durable Objects", job: "Strongly consistent coordination" },
] as const;

type JsonResponder = (
	body: unknown,
	status?: number,
	extraHeaders?: HeadersInit,
) => Response;

type DemoContext = {
	readonly request: Request;
	readonly env: Env;
	readonly ctx: ExecutionContext;
	readonly json: JsonResponder;
	readonly now: Date;
	readonly verifyTurnstile: TurnstileVerifier;
};

type ProtectedRoute = {
	readonly action: TurnstileAction;
	readonly run: (context: DemoContext) => Promise<Response>;
};

type QuotaResult =
	| { readonly _tag: "allowed"; readonly receipt: DemoQuotaReceipt }
	| { readonly _tag: "denied"; readonly response: Response }
	| { readonly _tag: "unavailable"; readonly response: Response };

type D1ProductRow = {
	readonly name: string;
	readonly job: string;
	readonly free_allowance: string;
};

type KvProduct = {
	readonly name: string;
	readonly job: string;
};

type CacheRecord = {
	readonly generatedAt: string;
	readonly message: string;
};

function tomorrowUtc(now: Date): string {
	const reset = new Date(now);
	reset.setUTCDate(reset.getUTCDate() + 1);
	reset.setUTCHours(0, 0, 0, 0);
	return reset.toISOString();
}

function logDemo(
	demo: string,
	requestId: string,
	status: "success" | "quota_denied" | "error",
): void {
	console.log(JSON.stringify({ event: "demo_request", demo, requestId, status }));
}

async function takeQuota(
	demo: keyof typeof DEMO_LIMITS,
	context: DemoContext,
): Promise<QuotaResult> {
	const date = context.now.toISOString().slice(0, 10);
	const resetAt = tomorrowUtc(context.now);
	const namespace: DurableObjectNamespace<DemoQuota> = context.env.DEMO_QUOTA;
	const stub = namespace.getByName(`${demo}:${date}`);

	let decision: QuotaDecision;
	try {
		decision = await stub.take(DEMO_LIMITS[demo], resetAt);
	} catch (error: unknown) {
		console.error(JSON.stringify({
			event: "demo_quota_error",
			demo,
			message: error instanceof Error ? error.message : "Unknown quota error",
		}));
		return {
			_tag: "unavailable",
			response: context.json(
				{ error: "The demo safety gate is temporarily unavailable." },
				503,
				{ "Retry-After": "60" },
			),
		};
	}

	if (!decision.allowed) {
		return {
			_tag: "denied",
			response: context.json(
				{
					error: "This demo reached its free daily allowance. Try again after the UTC reset.",
					quota: decision,
				},
				429,
				{
					"Retry-After": String(
						Math.max(1, Math.ceil((Date.parse(resetAt) - context.now.getTime()) / 1_000)),
					),
					"X-Demo-Quota-Limit": String(decision.limit),
					"X-Demo-Quota-Remaining": "0",
				},
			),
		};
	}

	return {
		_tag: "allowed",
		receipt: {
			used: decision.used,
			limit: decision.limit,
			resetAt: decision.resetAt,
		},
	};
}

function createReceipt(
	context: DemoContext,
	requestId: string,
	products: ReadonlyArray<string>,
	proof: string,
	quota: DemoQuotaReceipt,
) {
	const edge = toEdgeContext(context.request.cf, context.now.toISOString());
	return {
		products,
		proof,
		colo: edge.colo,
		requestId,
		generatedAt: edge.generatedAt,
		quota,
	};
}

function successResponse(
	context: DemoContext,
	demo: JsonDemoId,
	requestId: string,
	products: ReadonlyArray<string>,
	proof: string,
	quota: DemoQuotaReceipt,
	facts: ReadonlyArray<DemoFact>,
	artifact?: { readonly href: string; readonly label: string },
): Response {
	const body: DemoResponse = {
		demo,
		receipt: createReceipt(context, requestId, products, proof, quota),
		facts,
		...(artifact === undefined ? {} : { artifact }),
	};
	logDemo(demo, requestId, "success");
	return context.json(body, 200, {
		"X-Demo-Quota-Limit": String(quota.limit),
		"X-Demo-Quota-Remaining": String(Math.max(0, quota.limit - quota.used)),
	});
}

function serviceError(
	context: DemoContext,
	demo: string,
	requestId: string,
	error: unknown,
): Response {
	console.error(JSON.stringify({
		event: "demo_service_error",
		demo,
		requestId,
		message: error instanceof Error ? error.message : "Unknown service error",
	}));
	logDemo(demo, requestId, "error");
	return context.json(
		{ error: `${demo.toUpperCase()} is not ready yet. Apply the documented setup and try again.` },
		503,
	);
}

async function d1Demo(context: DemoContext): Promise<Response> {
	const requestId = crypto.randomUUID();
	const quota = await takeQuota("d1", context);
	if (quota._tag !== "allowed") {
		logDemo("d1", requestId, quota._tag === "denied" ? "quota_denied" : "error");
		return quota.response;
	}

	try {
		const query = await context.env.DEMO_DB.prepare(
			"SELECT name, job, free_allowance FROM demo_products ORDER BY id LIMIT 5",
		).all<D1ProductRow>();
		const first = query.results[0];

		return successResponse(
			context,
			"d1",
			requestId,
			["D1", "Workers", "Durable Objects"],
			"A real SQL query executed against a migrated D1 database.",
			quota.receipt,
			[
				{ label: "Rows returned", value: String(query.results.length) },
				{ label: "Rows read", value: String(query.meta.rows_read ?? query.results.length) },
				{ label: "Served by", value: query.meta.served_by_colo ?? "local D1" },
				{ label: first?.name ?? "First record", value: first?.job ?? "No seeded row" },
			],
		);
	} catch (error: unknown) {
		return serviceError(context, "d1", requestId, error);
	}
}

function selectDailyProduct(now: Date): KvProduct {
	const dayNumber = Math.floor(now.getTime() / 86_400_000);
	return KV_PRODUCTS[dayNumber % KV_PRODUCTS.length] ?? KV_PRODUCTS[0];
}

async function kvDemo(context: DemoContext): Promise<Response> {
	const requestId = crypto.randomUUID();
	const quota = await takeQuota("kv", context);
	if (quota._tag !== "allowed") {
		logDemo("kv", requestId, quota._tag === "denied" ? "quota_denied" : "error");
		return quota.response;
	}

	const date = context.now.toISOString().slice(0, 10);
	const key = `product-of-the-day:${date}`;

	try {
		const stored = await context.env.DEMO_KV.getWithMetadata<KvProduct, { seededAt: string }>(
			key,
			"json",
		);
		const product = stored.value ?? selectDailyProduct(context.now);
		const cacheState = stored.value === null ? "SEEDED" : "EDGE READ";

		if (stored.value === null) {
			await context.env.DEMO_KV.put(key, JSON.stringify(product), {
				expirationTtl: 172_800,
				metadata: { seededAt: context.now.toISOString() },
			});
		}

		return successResponse(
			context,
			"kv",
			requestId,
			["Workers KV", "Workers", "Durable Objects"],
			"A date-keyed JSON value was read from the global KV namespace.",
			quota.receipt,
			[
				{ label: "KV result", value: cacheState },
				{ label: "Key", value: key },
				{ label: "Product", value: product.name },
				{ label: "Best for", value: product.job },
			],
		);
	} catch (error: unknown) {
		return serviceError(context, "kv", requestId, error);
	}
}

async function ensureR2Object(bucket: R2Bucket): Promise<R2Object> {
	const existing = await bucket.head(R2_OBJECT_KEY);
	if (existing !== null) {
		return existing;
	}

	return bucket.put(R2_OBJECT_KEY, R2_DOCUMENT, {
		httpMetadata: { contentType: "application/json; charset=utf-8" },
		customMetadata: { demo: "fixed-private-object" },
	});
}

async function r2Demo(context: DemoContext): Promise<Response> {
	const requestId = crypto.randomUUID();
	const quota = await takeQuota("r2", context);
	if (quota._tag !== "allowed") {
		logDemo("r2", requestId, quota._tag === "denied" ? "quota_denied" : "error");
		return quota.response;
	}

	try {
		const object = await ensureR2Object(context.env.DEMO_R2);
		return successResponse(
			context,
			"r2",
			requestId,
			["R2", "Workers", "Durable Objects"],
			"The Worker inspected one fixed object in a private R2 bucket.",
			quota.receipt,
			[
				{ label: "Visibility", value: "PRIVATE BINDING" },
				{ label: "Object key", value: object.key },
				{ label: "Size", value: `${object.size} bytes` },
				{ label: "ETag", value: object.etag.slice(0, 12) },
			],
			{ href: "/api/demos/r2/download", label: "Download the fixed object" },
		);
	} catch (error: unknown) {
		return serviceError(context, "r2", requestId, error);
	}
}

async function r2Download(context: DemoContext): Promise<Response> {
	const requestId = crypto.randomUUID();
	const quota = await takeQuota("r2", context);
	if (quota._tag !== "allowed") {
		return quota.response;
	}

	try {
		await ensureR2Object(context.env.DEMO_R2);
		const object = await context.env.DEMO_R2.get(R2_OBJECT_KEY);
		if (object === null) {
			return context.json({ error: "The fixed demo object is unavailable." }, 404);
		}

		const headers = new Headers({
			"Cache-Control": "private, max-age=60",
			"Content-Disposition": 'attachment; filename="cloudflare-primitives.json"',
			"X-Content-Type-Options": "nosniff",
			"X-Demo-Request-Id": requestId,
		});
		object.writeHttpMetadata(headers);
		headers.set("ETag", object.httpEtag);
		logDemo("r2-download", requestId, "success");
		return new Response(object.body, { headers });
	} catch (error: unknown) {
		return serviceError(context, "r2", requestId, error);
	}
}

function isCacheRecord(value: unknown): value is CacheRecord {
	return (
		typeof value === "object" &&
		value !== null &&
		"generatedAt" in value &&
		typeof value.generatedAt === "string" &&
		"message" in value &&
		typeof value.message === "string"
	);
}

async function cacheDemo(context: DemoContext): Promise<Response> {
	const requestId = crypto.randomUUID();
	const quota = await takeQuota("cache", context);
	if (quota._tag !== "allowed") {
		logDemo("cache", requestId, quota._tag === "denied" ? "quota_denied" : "error");
		return quota.response;
	}

	try {
		const cacheKey = new Request(`${new URL(context.request.url).origin}/__demo-cache/value`);
		const demoCache = await caches.open("jfu-live-lab");
		const cached = await demoCache.match(cacheKey);
		let record: CacheRecord;
		let state: "HIT" | "MISS";

		if (cached === undefined) {
			state = "MISS";
			record = {
				generatedAt: context.now.toISOString(),
				message: "Stored once at this Cloudflare data center",
			};
			const cacheValue = Response.json(record, {
				headers: { "Cache-Control": "public, max-age=300" },
			});
			context.ctx.waitUntil(demoCache.put(cacheKey, cacheValue));
		} else {
			const payload: unknown = await cached.json();
			if (!isCacheRecord(payload)) {
				throw new Error("Unexpected cache record");
			}
			state = "HIT";
			record = payload;
		}

		return successResponse(
			context,
			"cache",
			requestId,
			["Cache", "Workers", "Durable Objects"],
			"The Cache API checked a five-minute value scoped to this data center.",
			quota.receipt,
			[
				{ label: "Cache status", value: state },
				{ label: "Cached at", value: record.generatedAt },
				{ label: "TTL", value: "300 seconds" },
				{ label: "Scope", value: "Current data center" },
			],
		);
	} catch (error: unknown) {
		return serviceError(context, "cache", requestId, error);
	}
}

async function imagesDemo(context: DemoContext): Promise<Response> {
	const requestId = crypto.randomUUID();
	const widthParameter = new URL(context.request.url).searchParams.get("width");
	const width = widthParameter === null ? 640 : Number(widthParameter);
	if (!ALLOWED_IMAGE_WIDTHS.has(width)) {
		return context.json(
			{ error: "Width must be one of 320, 640, or 960 pixels." },
			400,
		);
	}

	const quota = await takeQuota("images", context);
	if (quota._tag !== "allowed") {
		logDemo("images", requestId, quota._tag === "denied" ? "quota_denied" : "error");
		return quota.response;
	}

	try {
		const sourceUrl = new URL("/art/platform-core.webp", context.request.url);
		const source = await context.env.ASSETS.fetch(new Request(sourceUrl));
		if (!source.ok || source.body === null) {
			throw new Error("Source asset is unavailable");
		}

		const result = await context.env.IMAGES
			.input(source.body)
			.transform({ width, fit: "scale-down" })
			.output({ format: "image/webp", quality: 82 });
		const transformed = result.response();
		const headers = new Headers(transformed.headers);
		headers.set("Cache-Control", "public, max-age=86400");
		headers.set("X-Demo-Products", "Images, Workers, Static Assets, Durable Objects");
		headers.set("X-Demo-Quota-Limit", String(quota.receipt.limit));
		headers.set("X-Demo-Quota-Remaining", String(quota.receipt.limit - quota.receipt.used));
		headers.set("X-Demo-Request-Id", requestId);
		logDemo("images", requestId, "success");
		return new Response(transformed.body, { status: transformed.status, headers });
	} catch (error: unknown) {
		return serviceError(context, "images", requestId, error);
	}
}

function turnstileProof(
	context: DemoContext,
	verification: Extract<TurnstileVerification, { readonly _tag: "verified" }>,
): Response {
	return context.json({
		verified: true,
		action: verification.action,
		hostname: verification.hostname,
		message: "Cloudflare verified a fresh, single-use Turnstile token.",
	});
}

function protectedRoute(pathname: string): ProtectedRoute | null {
	switch (pathname) {
		case "/api/demos/d1":
			return { action: TURNSTILE_ACTIONS.d1, run: d1Demo };
		case "/api/demos/kv":
			return { action: TURNSTILE_ACTIONS.kv, run: kvDemo };
		case "/api/demos/r2":
			return { action: TURNSTILE_ACTIONS.r2, run: r2Demo };
		case "/api/demos/r2/download":
			return { action: TURNSTILE_ACTIONS.r2Download, run: r2Download };
		case "/api/demos/cache":
			return { action: TURNSTILE_ACTIONS.cache, run: cacheDemo };
		case "/api/demos/images":
			return { action: TURNSTILE_ACTIONS.images, run: imagesDemo };
		default:
			return null;
	}
}

/** Route one allow-listed, quota-protected product demo. */
export async function handleDemoRequest(context: DemoContext): Promise<Response | null> {
	const pathname = new URL(context.request.url).pathname;
	if (pathname === "/api/demos/turnstile/config") {
		if (context.request.method !== "GET") {
			return context.json({ error: "Method not allowed" }, 405, { Allow: "GET" });
		}
		return context.json({
			sitekey: turnstileSitekeyForRequest(context.request, context.env),
		});
	}

	const route = protectedRoute(pathname);
	const isTurnstileProof = pathname === "/api/demos/turnstile";
	if (route === null && !isTurnstileProof) {
		return null;
	}
	if (context.request.method !== "POST") {
		return context.json({ error: "Method not allowed" }, 405, { Allow: "POST" });
	}

	const action = isTurnstileProof ? TURNSTILE_ACTIONS.liveLab : route?.action;
	if (action === undefined) {
		return context.json({ error: "Demo route not found" }, 404);
	}

	const verification = await context.verifyTurnstile(
		context.request,
		context.env,
		action,
	);
	if (verification._tag === "rejected") {
		console.log(JSON.stringify({
			event: "turnstile_rejected",
			action,
			reason: verification.reason,
		}));
		return context.json(
			{ error: "Human verification failed. Refresh the challenge and try again." },
			403,
		);
	}

	if (isTurnstileProof) {
		return turnstileProof(context, verification);
	}
	if (route === null) {
		return context.json({ error: "Demo route not found" }, 404);
	}

	return route.run(context);
}
