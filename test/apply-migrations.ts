import { applyD1Migrations } from "cloudflare:test";
import { env } from "cloudflare:workers";

await applyD1Migrations(env.DEMO_DB, env.TEST_MIGRATIONS);
await env.DEMO_R2.put(
  "public-demo/cloudflare-primitives.json",
  JSON.stringify({ title: "A deliberately boring R2 object" }),
  { httpMetadata: { contentType: "application/json; charset=utf-8" } }
);
