# Just Fucking Use Cloudflare

An independent, developer-focused guide to choosing useful Cloudflare primitives. The site is a React single-page application delivered with Cloudflare Workers Static Assets, with a small Worker API that proves the page is running at the edge.

## What is included

- Interactive, deterministic Cloudflare Stack Builder
- Versioned, shareable stack URLs
- Job-oriented product explorer with official documentation links
- Live, coarse `request.cf` metadata from `/api/context`
- Click-to-run demos backed by D1, KV, private R2, Cache, and Images
- Per-product daily usage gates coordinated by a Durable Object
- Responsive dark and light themes
- Original generated artwork stored in `public/art`

## Local development

```sh
bun install
bun run dev
```

`bun run dev` applies the D1 migration to local storage, then the Cloudflare Vite plugin runs the frontend and Worker together. Wrangler simulates the storage bindings locally, so development does not use account resources.

## Free-tier guardrails

The Live Lab does no work until a visitor clicks a demo. Inputs are fixed or allow-listed and a strongly consistent Durable Object enforces a fresh limit for each demo every UTC day.

| Demo                       | Hard daily limit | Public mutation surface   |
| -------------------------- | ---------------: | ------------------------- |
| D1 query                   |            1,000 | None                      |
| KV read / fixed daily seed |              100 | None                      |
| R2 fixed object            |              500 | None                      |
| Cache API                  |            5,000 | None                      |
| Images transform           |              100 | Three allow-listed widths |

R2 remains private and exposes only one small, fixed object through the Worker. The Images demo transforms a bundled static asset. Static page views continue to bypass the Worker, so browsing the site does not consume Worker requests.

## Verification

```sh
bun run test
bun run check
bun run deploy:dry
```

Use `bun run test`, not `bun test`. The latter invokes Bun's native test runner, which cannot provide the `cloudflare:workers` and `cloudflare:test` modules used by the Worker integration tests.

`check` regenerates Worker types, type-checks the entire project, runs the test suite, and creates the production build.

## Deployment

```sh
bun run deploy
```

Wrangler auto-provisions the declared D1, KV, and R2 resources on first deploy. The deploy script then applies the remote D1 migration. Review the resource IDs written to `wrangler.jsonc` before treating the environment as production.

The current Wrangler configuration deliberately does not claim the production domain. For the final cutover, add the custom domain after confirming that its existing apex DNS record can be replaced:

```jsonc
"routes": [
  {
    "pattern": "justfuckingusecloudflare.com",
    "custom_domain": true
  }
]
```

Then run the full deployment command above. This avoids replacing the existing site during development or review.
