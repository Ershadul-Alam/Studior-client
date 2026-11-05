# AGENTS.md

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — the only verification step (compile + TypeScript + prerender). There is no test suite. It does **not** run ESLint.
- `npm run lint` — currently reports 3 pre-existing `@next/next/no-html-link-for-pages` errors (`components/Categories.tsx`, `Footer.tsx`, `Logo.tsx`); don't assume they came from your change.

## Backend

- Studios come from an external API at `http://localhost:8000/studios` (not in this repo). It can be down; both call sites (`app/studios/page.jsx`, `components/Categories.tsx`) fetch in `try/catch` with a fallback. Keep that pattern.
- `.env` contains `MONGODB_URI`, but this frontend has no Mongo code. The external API owns the database.

## Next.js 16 / cache components

- `cacheComponents` is enabled. `export const dynamic = "force-dynamic"` is a **build error**.
- Runtime data (`fetch`, `params`, `searchParams`, `connection()`) must be read inside a `<Suspense>`-wrapped async child; otherwise build fails with "uncached or runtime data during prerendering". `app/studios/page.jsx` and `app/studios/[id]/page.jsx` are the working references. A route that must block can use `export const instant = false`.
- Mixed extensions by convention: `.tsx` for root pages/components; `.jsx` for `app/about-us`, `app/how-it-works`, and `app/studios` (including `[id]`).
- `next/image` remote URLs must be whitelisted in `next.config.ts`; only `images.unsplash.com` is allowed today.
- `◐ Partial Prerender` for `/studios` and `/studios/[id]` in build output is expected, not an error.

## Styling / shadcn

- Tailwind CSS v4 is wired through a custom `turbopack.rules` CSS loader in `next.config.ts` (not the default plugin setup).
- Theme tokens live in `app/globals.css`. Brand red is `--color-accent: #cb5043`, used as `text-accent` / `bg-accent`. Site theme is black + red: `bg-neutral-950`, `bg-white/5`, `ring-white/10`, `text-white/60`-level accents.
- Don't add `--color-accent: var(--accent)` back to the shadcn `@theme inline` block; it overrides the brand red with shadcn's near-white neutral `--accent`.
- Keep `@keyframes marquee` in `globals.css`; it is used only via the arbitrary `animate-[marquee_...]` class in `components/StudioMarquee.tsx`.
- shadcn style is `base-nova`; primitives in `components/ui/` import `cn` from the npm package `"cn"` (not `@/lib/utils`, which only re-exports it). `Button` wraps `@base-ui/react/button`, not Radix.

## Routes

- Existing routes: `/`, `/studios`, `/studios/[id]`, `/about-us`, `/how-it-works`.
- `components/Navbar.tsx` links to `/about`, but the page lives at `app/about-us/page.jsx`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
