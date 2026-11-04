# AGENTS.md

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — full check: compiles, typechecks TS, and prerenders all routes. Run this to verify changes; there is no test suite.

## External backend (not in this repo)

- The studios data comes from an API expected at `http://localhost:5000` (MongoDB-backed; Atlas URI in `.env`). It is often not running — `app/studios/page.jsx` fetches it at request time in a `try/catch` with a "No studios found" fallback. Keep that pattern for future DB-driven pages.
- Unused `.env` vars are fine; `.env` is auto-loaded for both `dev` and `build`.

## Next.js quirks (verified, easy to get wrong)

- `next.config.ts` enables `cacheComponents`. Therefore `export const dynamic = "force-dynamic"` is a **build error**. Use `await connection()` (from `next/server`) inside a `<Suspense>`-wrapped async component for runtime data — see `app/studios/page.jsx` for the working pattern. Header/skeleton stays static while data streams.
- Mixed extensions by convention: `.tsx` for root pages and components, `.jsx` for `app/about-us`, `app/how-it-works`, `app/studios` (plain JS, no TS types available there).
- `next/image` remote URLs are whitelisted in `next.config.ts` `images.remotePatterns` (currently only `images.unsplash.com`). Add new hosts there before using external images.
- Build output shows `◐ Partial Prerender` for `/studios` — expected, not an error.

## Styling

- Tailwind CSS v4 via `@tailwindcss/turbopack`, wired through a **custom `turbopack.rules` CSS loader** in `next.config.ts` (not the default plugin setup).
- Theme tokens live in `app/globals.css`: `@theme { --color-accent: #cb5043 }` and a second `@theme inline` block of shadcn base tokens. Use `text-accent` / `bg-accent` for the brand red.
- Site theme is black + red: dark sections use `bg-neutral-950`, cards `bg-white/5` with `ring-white/10`, text `text-white/60` level accents.
- `@keyframes marquee` in `globals.css` looks unused but is required by `animate-[marquee_...]` in `components/StudioMarquee.tsx` — don't delete it as dead CSS.

## shadcn (style: `base-nova`)

- Config in `components.json`; primitives in `components/ui/`. Note: ui components import `cn` from the npm package `"cn"` — **not** from `@/lib/utils` (which just re-exports it).
- `Button` wraps `@base-ui/react/button`, not Radix. Icons are plain inline SVG or `lucide-react`.
- shadcn base tokens are neutral/light; page sections override to the dark theme with arbitrary classes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
