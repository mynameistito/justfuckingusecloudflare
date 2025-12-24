interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    // With not_found_handling: "single-page-application", Cloudflare automatically
    // serves index.html for navigation requests. This Worker handles edge cases.

    // Serve index.html for any request that doesn't match a static asset
    // This ensures SPA routing works for all requests
    const indexRequest = new Request(new URL("/index.html", request.url), {
      method: request.method,
      headers: request.headers,
    });

    return env.ASSETS.fetch(indexRequest);
  },
} satisfies ExportedHandler<Env>;
