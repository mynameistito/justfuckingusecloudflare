# Cloudflare Workers

STOP. Your knowledge of Cloudflare Workers APIs and limits may be outdated. Always retrieve current documentation before any Workers, KV, R2, D1, Durable Objects, Queues, Vectorize, AI, or Agents SDK task.

## Docs

- https://developers.cloudflare.com/workers/
- MCP: `https://docs.mcp.cloudflare.com/mcp`

For all limits and quotas, retrieve from the product's `/platform/limits/` page. eg. `/workers/platform/limits`

## Project Commands

| Command              | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `bun run dev`        | Apply local D1 migrations and serve the app   |
| `bun run check`      | Check formatting and lint rules               |
| `bun run typecheck`  | Type-check the project                        |
| `bun run test`       | Run the Cloudflare Worker integration tests   |
| `bun run build`      | Create the production Worker and client build |
| `bun run deploy:dry` | Validate a deploy before publishing           |
| `bun run deploy`     | Build, migrate remote D1, then deploy         |

Run `bun run cf-typegen` after changing bindings in `wrangler.jsonc`. Before deployment, run `bun run check`, `bun run test`, and `bun run deploy:dry`. Do not add the production custom domain to `wrangler.jsonc` before the final DNS cutover.

## Boundaries

- Keep live demos bounded to allow-listed inputs and per-demo Durable Object quotas.
- R2 remains private; do not add public buckets, uploads, or public mutation routes.
- D1, KV, R2, Images, and the DemoQuota Durable Object are the deployed bindings; update migrations before introducing database reads.

## Node.js Compatibility

https://developers.cloudflare.com/workers/runtime-apis/nodejs/

## Errors

- **Error 1102** (CPU/Memory exceeded): Retrieve limits from `/workers/platform/limits/`
- **All errors**: https://developers.cloudflare.com/workers/observability/errors/

## Product Docs

Retrieve API references and limits from: `/kv/` · `/r2/` · `/d1/` · `/durable-objects/` · `/queues/` · `/vectorize/` · `/workers-ai/` · `/agents/`

## Best Practices (conditional)

If the application uses Durable Objects or Workflows, refer to the relevant best practices:

- Durable Objects: https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- Workflows: https://developers.cloudflare.com/workflows/build/rules-of-workflows/
