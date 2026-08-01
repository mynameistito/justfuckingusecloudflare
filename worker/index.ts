import { API_SECURITY_HEADERS } from "./api-security";
import { handleDemoRequest } from "./demos";
import { toEdgeContext } from "./edge-context";
import { verifyTurnstileRequest } from "./turnstile";
import type { TurnstileVerifier } from "./turnstile";

export { DemoQuota } from "./demo-quota";

const jsonResponse = (
  body: unknown,
  status = 200,
  extraHeaders?: HeadersInit
): Response => {
  const headers = new Headers(API_SECURITY_HEADERS);
  if (extraHeaders !== undefined) {
    const additions = new Headers(extraHeaders);
    for (const [key, value] of additions.entries()) {
      headers.set(key, value);
    }
  }

  return Response.json(body, { headers, status });
};

const contextResponse = (request: Request): Response => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return jsonResponse({ error: "Method not allowed" }, 405, {
      Allow: "GET, HEAD",
    });
  }

  const body = toEdgeContext(request.cf, new Date().toISOString());
  if (request.method === "HEAD") {
    return new Response(null, { headers: API_SECURITY_HEADERS, status: 200 });
  }

  return jsonResponse(body);
};

/**
 * Route one request through the small dynamic API surface.
 *
 * @param request - Incoming request routed to the Worker.
 * @param env - Generated Cloudflare bindings when the request needs a product demo.
 * @param ctx - Execution context used for tracked background work.
 * @param verifyTurnstile - Server-side human-verification boundary.
 * @returns The API response or a 404 for non-API paths.
 */
export const handleRequest = async (
  request: Request,
  env?: Env,
  ctx?: ExecutionContext,
  verifyTurnstile: TurnstileVerifier = verifyTurnstileRequest
): Promise<Response> => {
  const url = new URL(request.url);

  if (url.pathname === "/api/context") {
    return contextResponse(request);
  }

  if (env !== undefined && ctx !== undefined) {
    const demoResponse = await handleDemoRequest({
      ctx,
      env,
      json: jsonResponse,
      now: new Date(),
      request,
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
};

export default {
  fetch(request, env, ctx): Promise<Response> {
    return handleRequest(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
