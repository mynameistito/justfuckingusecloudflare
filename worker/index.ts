import { toEdgeContext } from "./edge-context";
import { DemoQuota } from "./demo-quota";
import { handleDemoRequest } from "./demos";
import {
	verifyTurnstileRequest,
	type TurnstileVerifier,
} from "./turnstile";

export { DemoQuota };

const API_SECURITY_HEADERS = {
	"Cache-Control": "no-store",
	"Content-Type": "application/json; charset=utf-8",
	"Cross-Origin-Opener-Policy": "same-origin",
	"Cross-Origin-Resource-Policy": "same-origin",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
} as const;

function jsonResponse(body: unknown, status = 200, extraHeaders?: HeadersInit): Response {
	const headers = new Headers(API_SECURITY_HEADERS);
	if (extraHeaders !== undefined) {
		const additions = new Headers(extraHeaders);
		additions.forEach((value, key) => headers.set(key, value));
	}

	return Response.json(body, { status, headers });
}

function contextResponse(request: Request): Response {
	if (request.method !== "GET" && request.method !== "HEAD") {
		return jsonResponse(
			{ error: "Method not allowed" },
			405,
			{ Allow: "GET, HEAD" },
		);
	}

	const body = toEdgeContext(request.cf, new Date().toISOString());
	if (request.method === "HEAD") {
		return new Response(null, { status: 200, headers: API_SECURITY_HEADERS });
	}

	return jsonResponse(body);
}

/**
 * Route one request through the small dynamic API surface.
 *
 * @param request - Incoming request routed to the Worker.
 * @param env - Generated Cloudflare bindings when the request needs a product demo.
 * @param ctx - Execution context used for tracked background work.
 * @param verifyTurnstile - Server-side human-verification boundary.
 * @returns The API response or a 404 for non-API paths.
 */
export async function handleRequest(
	request: Request,
	env?: Env,
	ctx?: ExecutionContext,
	verifyTurnstile: TurnstileVerifier = verifyTurnstileRequest,
): Promise<Response> {
	const url = new URL(request.url);

	if (url.pathname === "/api/context") {
		return contextResponse(request);
	}

	if (env !== undefined && ctx !== undefined) {
		const demoResponse = await handleDemoRequest({
			request,
			env,
			ctx,
			json: jsonResponse,
			now: new Date(),
			verifyTurnstile,
		});
		if (demoResponse !== null) {
			return demoResponse;
		}
	}

	if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
		return jsonResponse({ error: "API route not found" }, 404);
	}

	return new Response(null, { status: 404 });
}

export default {
	fetch(request, env, ctx): Promise<Response> {
		return handleRequest(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
