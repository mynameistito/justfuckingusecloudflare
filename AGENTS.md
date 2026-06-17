# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-10
**Commit:** 7346e3a
**Branch:** main

## OVERVIEW

Satirical landing page advocating Cloudflare over multi-vendor cloud infra. React 19 + Vite 8 + Tailwind CSS 4 SPA deployed to Cloudflare Workers with custom domain `justfuckingusecloudflare.com`. URL personalization via `?to=Name&from=Name` query params.

## STRUCTURE

```text
justfuckingusecloudflare/
├── src/                  # Vite root (NOT project root)
│   ├── index.html        # HTML entry (inside src/ — non-standard)
│   ├── index.tsx          # React mount point
│   ├── index.css          # Single line: @import "tailwindcss"
│   ├── app.tsx            # Router + HomePage composition
│   ├── components/        # All UI components (React.FC, named exports)
│   └── hooks/             # usePersonalization — URL param hook
├── worker/
│   └── index.ts           # SPA fallback handler (redundant with wrangler SPA mode)
├── scripts/
│   └── deploy.js          # Branch-aware: wrangler deploy (prod) vs versions upload (preview)
└── public/                # Static assets (favicons, OG image, _headers, webmanifest)
```

## WHERE TO LOOK

| Task                  | Location                                       | Notes                                        |
| --------------------- | ---------------------------------------------- | -------------------------------------------- |
| Add a page/route      | `src/app.tsx`                                  | Routes defined in `<Routes>` block           |
| Add a UI section      | `src/components/`                              | Create new `.tsx` file, import in `app.tsx`  |
| Personalization logic | `src/hooks/use-personalization.ts`             | Reads `?to=` and `?from=` params             |
| Worker logic          | `worker/index.ts`                              | Currently just SPA fallback                  |
| Deployment config     | `wrangler.jsonc`                               | Worker name, assets dir, routes              |
| Build config          | `vite.config.ts`                               | Root=src, plugins order matters              |
| Styling               | `src/index.html` (inline `<style>`) + Tailwind | Custom fonts/anim in HTML, utils in Tailwind |
| Static assets         | `public/`                                      | `_headers`, favicons, OG image, webmanifest  |
| Deploy script         | `scripts/deploy.js`                            | Detects prod vs preview branch               |

## CODE MAP

| Symbol               | Type      | Location                              | Role                                        |
| -------------------- | --------- | ------------------------------------- | ------------------------------------------- |
| `App`                | Component | `src/app.tsx:69`                      | Root: BrowserRouter + routes                |
| `HomePage`           | Component | `src/app.tsx:15`                      | Composes all sections, uses personalization |
| `ScrollToTop`        | Component | `src/app.tsx:56`                      | Scrolls to top on route change              |
| `usePersonalization` | Hook      | `src/hooks/use-personalization.ts:18` | Reads/normalizes `?to=` `?from=` URL params |
| `normalizeName`      | Function  | `src/hooks/use-personalization.ts:6`  | Capitalizes first letter, trims whitespace  |
| `Hero`               | Component | `src/components/hero.tsx`             | Personalized hero banner                    |
| `Rant`               | Component | `src/components/rant.tsx`             | Satirical comparison section                |
| `Comparison`         | Component | `src/components/comparison.tsx`       | AWS vs CF feature cards                     |
| `Features`           | Component | `src/components/features.tsx`         | Cloudflare feature checklist                |
| `CTA`                | Component | `src/components/cta.tsx`              | Call to action + signup link                |
| `ShareLink`          | Component | `src/components/share-link.tsx`       | Form: generates personalized share URL      |
| `ThankYou`           | Component | `src/components/thank-you.tsx`        | "Sent by X" attribution (conditional)       |
| `PrivacyPolicy`      | Component | `src/components/privacy-policy.tsx`   | `/privacy-policy` route                     |
| `Footer`             | Component | `src/components/footer.tsx`           | Links + copyright                           |

## CONVENTIONS

- **Vite root is `src/`** — `index.html` lives inside `src/`, not project root. All paths resolve from `src/`.
- **All components use named exports** (`export const Name: React.FC = () => ...`). No default exports on components. Only `App` uses `export default` for the entry point.
- **React.FC type** is used on all components despite being an older pattern.
- **All imports are relative** — `@/` path alias is configured but unused in current code.
- **Tailwind CSS v4** — CSS entry is single line `@import "tailwindcss"`. Custom fonts (Anton, JetBrains Mono, Space Grotesk) and animations are in `index.html` inline `<style>`, not Tailwind config.
- **Package manager is Bun** — scripts use `bun x`, lockfile is `bun.lock`. `package-lock.json` is gitignored.
- **Biome/Ultracite** — all linting/formatting via `biome.jsonc` extending `ultracite/core`, `ultracite/react`, `ultracite/biome/core`, `ultracite/biome/react`. No ESLint.
- **Claude Code auto-fix** — `.claude/settings.json` runs `bun x ultracite fix` after every Write/Edit.
- **No tests** — zero test infrastructure, test framework, or test files.
- **No active git hooks** — `lefthook.yml` has only commented examples. No pre-commit hooks enforce linting.
- **Validate and sanitize user input** — URL params (e.g., `?to=`, `?from=`) processed via `usePersonalization`'s `normalizeName` (trims + capitalizes). React auto-escapes JSX output, but avoid rendering raw user input via `dangerouslySetInnerHTML`.

## ANTI-PATTERNS (THIS PROJECT)

- **No barrel files** — don't create `index.ts` re-exports in components or hooks
- **No `console.log` in production** — existing easter-egg logs in `app.tsx` are a known violation
- **No default exports on components** — always `export const Name: React.FC`
- **No `.forEach()`** — use `for...of` instead
- **No `any` type** — use `unknown`
- **No `dangerouslySetInnerHTML`** or `eval()`
- **No spreads in loop accumulators** — no `arr.reduce((acc, x) => [...acc, x])`
- **No `var`** — use `const` by default, `let` only for reassignment

## UNIQUE STYLES

- **Dark theme** — `#0a0a0a` background, `#fafafa` text, `#F6821F` orange accent throughout
- **Noise overlay** — SVG `feTurbulence` filter on `body::before` (can impact low-end device performance)
- **Google Fonts** — Anton (headings), JetBrains Mono (monospace), Space Grotesk (body) loaded via external `<link>` with no `font-display: swap`
- **Metadata file** — `metadata.json` at project root is consumed by `@cloudflare/vite-plugin` for Worker manifest
- **Dual build output** — Cloudflare plugin outputs both `dist/client/` (static assets) and `dist/justfuckingusecloudflare/` (Worker bundle)

## COMMANDS

```bash
bun run dev          # Dev server on port 3000
bun run build        # Production build → dist/
bun run preview      # Preview production build
bun run deploy       # Branch-aware deployment (prod vs preview)
bun run fix          # Auto-fix linting/formatting (ultracite)
bun run check        # Lint/format check only
bun run typecheck    # TypeScript type checking (tsc --noEmit)
bun run ultracheck   # Fix then verify (fix + check)
```

## NOTES

- **`_headers` file** in `public/` uses Cloudflare Pages syntax but project deploys as a Worker. Headers may not be applied correctly.
- **README inaccuracies** — References Husky (uses Lefthook) and `src/pages/` directory (doesn't exist).
- **Personalization params** — `?to=` and `?from=` rendered in JSX via `usePersonalization`. React auto-escapes; `normalizeName` trims and capitalizes. Avoid rendering raw URL input via `dangerouslySetInnerHTML`.
- **Deploy script** expects `dist/justfuckingusecloudflare` directory to exist before deploying.
- **Worker is redundant** — `worker/index.ts` just serves `index.html`, duplicating `not_found_handling: "single-page-application"` in `wrangler.jsonc`.
