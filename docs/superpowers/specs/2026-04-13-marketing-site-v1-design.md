# nvoke.run Marketing Site — v1 Design

**Date:** 2026-04-13
**Status:** Approved (awaiting user spec review)
**Repo:** `nvoke.run.website` → `https://github.com/Mopra/nvoke.run.website`
**Target domain:** `nvoke.run` (marketing); `app.nvoke.run` is the existing app
**Product context:** nvoke is a minimal developer tool for writing, running, and managing small Node.js functions. Every function gets a real HTTPS endpoint, an API key, a 30s execution timeout, and a 128 MB heap. The app lives at `app.nvoke.run`; this site is the marketing + blog + pricing surface.

---

## 1. Goals & non-goals

### Goals

- A marketing site that reads as a developer tool, not a startup landing page: sharp, minimal, opinionated.
- A blog optimized for SEO and long-form reading, authored in MDX in this repo.
- An honest pricing page that reflects the three-tier execution-metered model.
- Warm, focused "developer workspace" aesthetic using shadcn theme tokens.
- Zero third-party runtime scripts. Fast by default (LCP < 1.5s, CLS 0).

### Non-goals (v1)

- No documentation on this site. Docs stay co-located with the app.
- No analytics. No tracking. No cookie banner.
- No light mode. Dark only.
- No unit tests, no e2e tests, no Storybook.
- No headless CMS.
- No newsletter signup, no testimonials, no logo wall, no FAQ on the home page.
- No i18n.

---

## 2. Stack

- **Framework:** Next.js 15 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css`; no `tailwind.config.ts`)
- **Components:** shadcn/ui (v4-compatible track)
- **MDX:** `@next/mdx` (compile-time), `gray-matter` for frontmatter, Zod for schema validation
- **Syntax highlighting:** Shiki at build time (warm-tinted theme)
- **Fonts:** Geist Sans + Geist Mono via `next/font` (self-hosted)
- **Hosting:** Vercel (GitHub-integrated preview + production deploys)
- **Package manager:** npm
- **Node:** 20+

---

## 3. Scope — pages

1. **Home** (`/`)
2. **Blog index** (`/blog`)
3. **Blog post** (`/blog/[slug]`)
4. **Pricing** (`/pricing`)
5. **Privacy** (`/privacy`) — stub with placeholder content marked `TODO`
6. **Terms** (`/terms`) — stub with placeholder content marked `TODO`

Nothing else in v1.

---

## 4. File layout

```
nvoke.run.website/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Home
│   │   ├── pricing/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── blog/
│   │   ├── page.tsx              # index
│   │   ├── layout.tsx            # long-form typography wrapper
│   │   └── [slug]/page.tsx
│   ├── og/route.tsx              # dynamic OG images (next/og)
│   ├── icon.tsx                  # generated favicon
│   ├── apple-icon.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx                # root: fonts, tokens, header/footer
│   └── globals.css               # Tailwind v4 @theme, tokens, base styles
├── content/
│   └── blog/
│       └── hello-world.mdx       # seed placeholder post
├── components/
│   ├── ui/                       # shadcn primitives
│   ├── site/                     # Header, Footer, Logo, CTA, JsonLd
│   ├── home/                     # Hero, CodePanel, Bullets, Closer
│   └── mdx/                      # Code, Callout, anchor headings
├── lib/
│   ├── blog.ts                   # getAllPosts, getPostBySlug, schema
│   ├── seo.ts                    # buildMetadata helper
│   └── site.ts                   # site config (name, url, nav, social)
├── public/                       # static assets
├── .editorconfig
├── .prettierrc
├── .gitignore
├── next.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

Route group `(marketing)` shares a layout with the site header/footer. `/blog` has its own layout for long-form typography.

`lib/site.ts` is the single source of truth for nav links, footer links, social URLs, and site URL.

---

## 5. Design system & tokens

**Strategy:** Dark only. All colors expressed as shadcn semantic tokens (`--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--border`, `--ring`, `--accent`, etc.) defined in `app/globals.css` under Tailwind v4's `@theme` block. No hardcoded palette colors anywhere — tweakcn themes can be swapped by replacing the token block.

### Palette (warm neutrals + sage)

Ported from the app's direction: 80° hue family for neutrals, ~150° hue for the sage accent. All values expressed in OKLCH. Exact numbers calibrated during the build; the shape is:

- `--background`: very dark warm neutral, ~`oklch(0.16 0.008 80)` — not black, slightly brown
- `--foreground`: warm off-white, ~`oklch(0.95 0.01 80)`
- `--card` / `--popover`: one shade lighter than `--background`
- `--muted`: mid warm gray for secondary text
- `--muted-foreground`: a reader-friendly step above `--muted`
- `--border`: low-contrast warm line color
- `--primary`: sage, ~`oklch(0.72 0.09 150)` — used sparingly, mostly on CTAs and rings
- `--primary-foreground`: dark warm neutral for sage-background text
- `--ring`: same sage, for focus states
- `--accent`: subtle warm elevation for hover states
- `--destructive`: a warm-leaning red (kept in tokens in case any shadcn component needs it)

No blues, no cool grays. No hardcoded hex values outside the token block.

### Typography

- **Sans (UI + body):** Geist Sans via `next/font`, self-hosted, zero network requests.
- **Mono (code panel + inline code):** Geist Mono via `next/font`.
- **Scale:** Tailwind defaults. Hero uses `tracking-tight` display size (`text-5xl`–`text-6xl`). Body is `text-base` with `leading-relaxed`. Blog post body is `text-[17px]` with `leading-[1.7]` for reading comfort.

### Warm workshop details

- **Subtle grain:** a single fixed inline SVG noise layer at ~3% opacity rendered as a `::before` on `body`, `pointer-events-none`, `position: fixed; inset: 0`. ~1KB inline SVG, no network request.
- **Warm background gradient:** one very subtle radial gradient at the top of the page: `background: radial-gradient(ellipse at top, oklch(0.19 0.012 80), transparent 70%)`. Applied to the root layout, behind everything, barely visible — just enough depth for the hero.
- **Code blocks:** Shiki at build time, warm-tinted theme. Start from a neutral theme (e.g. Vesper) and retint toward the 80° family so code blocks feel part of the site, not pasted in. Exact theme created and committed during build.
- **Depth rule:** the app's "sidebar darker than content" rule applied locally:
  - Header: background level
  - Card / code panel: one shade above background
  - Footer: one shade below background
  - Output region inside the code panel: half a shade darker than the code region

### Motion

Minimal. Three animated things total:

1. The home page code panel typing + output reveal (scroll-triggered, once)
2. Hover states (150ms ease)
3. Focus rings (instant)

All motion honors `prefers-reduced-motion: reduce`.

---

## 6. Home page

**Goal:** One screen (±30%) that tells a developer what nvoke does, shows what it looks like, and gets them into the app.

### Structure

1. **Header** — sticky, translucent `backdrop-blur`. Left: `nvoke` wordmark. Right: `Blog` · `Pricing` · `Open app →` (primary button → `https://app.nvoke.run`).

2. **Hero** — centered-left column, max-width ~720px.
   - Optional eyebrow: tiny sage label (e.g. `Developer tool` or `v0.1`)
   - Headline, display size, tracking-tight. Working draft: _"Write a function. Invoke it. That's the whole tool."_
   - Sub, one sentence, muted. Working draft: _"nvoke runs small Node.js functions with a real HTTP endpoint. No YAML, no cold-start rituals, no dashboard tour."_
   - Two CTAs inline: primary `Open app →` → `app.nvoke.run`; secondary `Read the blog` → `/blog`.

3. **Code panel** — see Section 7. Full-width container, max-width ~960px, centered.

4. **Three bullets** — single row on desktop, stacked on mobile. Each ≤ 12 words.
   - _Write it in your browser._ Monaco editor, syntax highlighting, no local setup.
   - _Get a real endpoint._ Every function gets an HTTPS URL and an API key.
   - _Runs in 30 seconds or less._ Hard timeout, 128MB heap, no surprises.

5. **Closer** — one muted line centered, then one primary button.
   - Line working draft: _"Built for people who'd rather ship than configure."_
   - Button: `Open app →`

6. **Footer** — see Section 11.

### Deliberately NOT on this page

No feature grid. No "trusted by" logos. No testimonials. No FAQ. No newsletter signup. No cookie banner.

### Voice

DHH / Primeagen with a friendly twist. Direct, slightly opinionated, no jargon, no apology. Not "We believe in..." and not emoji-laden hype. Working drafts above are shape, not final copy; refinement happens in the build with the user in the loop.

---

## 7. The animated code panel

The one non-trivial interactive component on the site, and the centerpiece of the home page.

### Visual anatomy

One card (warm-tinted, one shade above background) with four horizontal bands:

1. **Chrome bar** — three muted dots, filename tab (`hello.js`)
2. **Code area** — Geist Mono, Shiki-highlighted
3. **Action bar** — right-aligned `Run ▸` button (decorative, see accessibility)
4. **Output region** — half a shade darker than the code region; shows the method line, status line, and JSON response

Separators between bands use `--border`.

### Example content (working draft)

```js
export default async function (req) {
  const { name = 'world' } = req.body;
  return { message: `Hello, ${name}!` };
}
```

Output region:

```
POST /api/invoke/hello
200 OK · 47ms
{ "message": "Hello, world!" }
```

This content is hardcoded — it's marketing copy, not a live execution.

### Behavior

- **SSR initial state:** full code present, Run button visible, output region rendered **empty but reserving its final height** (prevents CLS). This is what crawlers and reduced-motion users see.
- **On scroll-into-view** (IntersectionObserver, `threshold: 0.4`, fires once):
  1. Clear the code text, then type it back in at ~30ms/char with a blinking caret. ~2s total.
  2. Pause ~400ms.
  3. Run button gains a subtle sage pulse for ~600ms (visual hint, no click).
  4. Output region fades in top-to-bottom over ~300ms: method line, status line, JSON body.
  5. Caret stops blinking. Animation never replays.
- **`prefers-reduced-motion: reduce`:** skip the typing animation entirely. SSR already shows the final code; output fades in over 200ms on mount (or is present from SSR — implementer's choice, both are acceptable).
- **`document.visibilityState`:** pause animation when tab is hidden, resume on focus.

### Implementation

- Single client component: `components/home/code-panel.tsx` (marked `"use client"`).
- Code is **highlighted at build time** by Shiki in the server component parent, which passes pre-highlighted HTML tokens as props to the client component. The animation reveals those tokens character-by-character. No Shiki runtime bundle is shipped.
- Target client JS for this component: ~2KB gzipped. No animation library.

### Accessibility

- `<pre><code aria-label="Example nvoke function">` — screen readers see the finished code, not the typing.
- Run button is a real `<button>` but `aria-hidden="true"` and `tabIndex={-1}`. It is decorative.
- Output region: `aria-live="off"`.
- Contrast ratios for all text inside the panel meet WCAG AA.

---

## 8. Blog pipeline

### Authoring

Posts live as `.mdx` files in `content/blog/`. Flat directory, no subfolders. Filename = slug.

### Frontmatter schema

```yaml
---
title: 'Why we built nvoke'
description: 'A short sentence for search results and OG cards.'
date: 2026-04-20
draft: false # optional, default false
---
```

Exactly four fields:

- `title` (string, required)
- `description` (string, required)
- `date` (YYYY-MM-DD, required)
- `draft` (boolean, optional, default `false`)

Validated by Zod in `lib/blog.ts`. Missing or malformed fields **fail the build**, not production. `slug` is derived from filename.

### Draft and date behavior

- `draft: true` posts are **excluded from production builds** (listing, routing, sitemap). In `next dev`, they are visible so the author can preview them.
- Posts with `date` in the future are **hidden in production** (listing and routes) and **visible in dev**. This enables scheduled posts: write it, set a future date, push, and it goes live on that date without a redeploy. Implementation: the blog index and post routes use `revalidate = 3600` (hourly ISR) and re-evaluate `date <= now()` on each revalidation. A future-dated post becomes live within an hour of its date — acceptable for a marketing blog.

### Parsing & routing

- `lib/blog.ts` exports:
  - `getAllPosts()` → sorted reverse-chronological, filters drafts and future dates in production
  - `getPostBySlug(slug)` → returns post + compiled MDX
  - `getAllSlugs()` → for `generateStaticParams`
- `app/blog/page.tsx` — index. One row per post: `date` (muted, small) · `title` (linked, large) · `description` (one line). No excerpts, no read-more, no pagination (add when > 20 posts).
- `app/blog/[slug]/page.tsx` — reads and renders the MDX. Uses `generateStaticParams` over all non-draft, non-future slugs. Each post has its own `generateMetadata`.

### Long-form typography

`app/blog/layout.tsx` (or an `<article>` wrapper inside the post page) provides:

- Single column, `max-w-[68ch]`, centered
- Body: `text-[17px]`, `leading-[1.7]`
- Custom prose CSS (not `@tailwindcss/typography` — it fights the warm palette). One file, opinionated defaults for `h2`, `h3`, `p`, `ul`, `ol`, `a`, `blockquote`, `hr`, `img`, `code`, `pre`.
- `h1` is rendered by the layout from frontmatter `title`. MDX posts use `h2` and `h3` only.

### MDX components

Mapped at the page level via the `components` prop passed into the MDX render call (the `@next/mdx` `MDXContent` component, or whatever entry point is used). Custom components:

- **Fenced code blocks** → Shiki at build time, warm-tinted theme. Supports `title="file.ts"` meta. Line numbers off by default.
- **`<Callout type="note|warn">`** — warm-tinted box, one short paragraph.
- **`<img>`** — routed through `next/image`.
- Standard elements styled via the prose CSS.

No `<Tweet>`, no `<YouTube>`, no `<Codepen>` in v1.

### Post page footer

Below the article:

1. Thin divider
2. "← Back to blog" link

That's it. No related posts, no share buttons, no author bio, no subscribe.

### Seed content

One placeholder post: `content/blog/hello-world.mdx`. Titled something like _"This is the first post"_ with a single paragraph. Replaced by the first real post before or soon after launch. No lorem ipsum.

---

## 9. Pricing page

### Structure

1. Site header
2. **Page intro**
   - Headline: _"Pay for what you run."_
   - Sub: _"Every plan includes the full product. Only the ceiling changes."_
3. **Three pricing cards**, equal width, equal height, aligned baselines. No "Most popular" badge on any card.
4. **"Included in every plan" row** — a single paragraph, not repeated per card.
5. **FAQ** — 4 short Q&As, `<h3>` + `<p>`, no accordion.
6. **Closing CTA** — one line + one button. `Open app →`.
7. Footer

### The three cards

|         | Free                     | Nano                                          | Scale                             |
| ------- | ------------------------ | --------------------------------------------- | --------------------------------- |
| Price   | $0 / month               | $5 / month                                    | $19 / month                       |
| Tagline | _For kicking the tires._ | _For a side project that's actually running._ | _For something people depend on._ |
| Limit   | 100 executions / month   | 5,000 executions / month                      | 50,000 executions / month         |
| CTA     | Start free →             | Choose Nano →                                 | Choose Scale →                    |

All three CTAs link to `https://app.nvoke.run` (sign-up). No Stripe embed, no credit card fields, no plan picker on this page — the app handles billing.

### Card visual

Warm card background, thin border, price in display size, limit in body size, tagline in muted italic, CTA as a full-width button at the bottom. Sage accent appears on the hovered card's border.

### "Included in every plan" copy

> Every plan includes: the editor, real HTTPS endpoints, API keys, 30-second execution timeout, 128 MB heap, logs, and whatever we ship next week.

### FAQ (working drafts)

1. **What counts as an execution?** One invocation of one function. A function that calls itself is still one execution. HTTP 4xx from your code counts; a 500 from our runner doesn't.
2. **What happens if I hit my limit?** Invocations start returning 429. Your functions stay, your keys stay, your code stays. Upgrade or wait for the month to roll over.
3. **Can I change plans mid-month?** Yes. Upgrades take effect immediately with a prorated charge. Downgrades take effect at the next billing cycle.
4. **Do unused executions roll over?** No. Each month starts at zero.

Copy is shape, not final. Author reviews and edits before launch.

### Deliberately NOT on the pricing page

No enterprise / Contact sales tier. No annual/monthly toggle. No feature comparison table. No competitor bashing. No money-back guarantee (Free is the trial).

---

## 10. SEO plumbing

### Metadata API

Every route exports `generateMetadata` (or a static `metadata` object). `lib/seo.ts` provides `buildMetadata({ title, description, path, type })` as the single source of truth.

- **Title template:** `%s — nvoke` for subpages; home is `nvoke — write a function, invoke it`
- **Description:** per-page, ~150 chars, hand-written for home, pricing, blog index, and each post
- **Canonical URLs:** `https://nvoke.run` + pathname on every page
- **`openGraph` and `twitter`** metadata auto-populated from the same inputs

### OG images

Dynamic, generated via `next/og` at `app/og/route.tsx`. Query params: `?title=...&kind=post|page`. Returns a 1200×630 PNG:

- Warm dark background matching the site
- `nvoke` wordmark top-left
- Title large, tracking-tight, left-aligned, vertically centered
- For posts: post date + "nvoke blog" small, bottom-left
- Grain overlay rendered in the image itself

Each page points `openGraph.images` at `/og?title=<encoded>&kind=...`. Vercel caches per unique query string.

### Sitemap

`app/sitemap.ts` exports a function returning entries for:

- Static routes: `/`, `/pricing`, `/blog`, `/privacy`, `/terms`
- Dynamic routes: one entry per published (non-draft, non-future) blog post, `lastModified` = post `date`

Output: `https://nvoke.run/sitemap.xml`

### Robots

`app/robots.ts` returns: `User-agent: *, Allow: /`, `Sitemap: https://nvoke.run/sitemap.xml`. No AI crawler blocking in v1 (opinionated choice; easy to reverse).

### JSON-LD structured data

Injected via a `<JsonLd>` component that `JSON.stringify`s a JS object safely (escapes `</script>`).

- Every page: `Organization` schema
- Blog index: `Blog` schema
- Each post: `BlogPosting` schema with `headline`, `description`, `datePublished`, `dateModified`, `author`, `image` (OG image URL)

### Favicons

- `app/icon.tsx` — favicon generated at build time from the wordmark mark
- `app/apple-icon.tsx` — iOS icon
- Minimal `manifest.webmanifest` for installability (no service worker)

### Performance targets (Lighthouse on production build, Fast 3G simulation)

- Performance ≥ 95
- Accessibility 100
- Best Practices 100
- SEO 100
- LCP < 1.5s
- CLS 0
- Home page client JS < 30KB gzipped

### Not included in v1

No analytics. No RSS feed (easy to add later). No `hreflang` (single language). No `AggregateRating` or `Product` schema on pricing. No Search Console verification file in the repo — author adds meta tag or DNS record at launch.

---

## 11. Footer, legal, header nav

### Header

Sticky, `backdrop-blur`, background at site background level. Content:

- Left: `nvoke` wordmark (links to `/`)
- Right: `Blog` · `Pricing` · `Open app →` (primary button → `https://app.nvoke.run`)

On mobile, the text links collapse into a small menu or stay inline if they fit — implementer's call during build.

### Footer

Minimal, one row on desktop, stacked on mobile:

- Left: `nvoke` wordmark + one-line tagline + `© 2026 nvoke`
- Right: `Blog` · `Pricing` · `Open app` · `GitHub` (repo link — author provides URL)

That's it. No Product / Resources / Company column structure.

### Legal pages

- `app/(marketing)/privacy/page.tsx` — stub page with placeholder content. Visible `TODO` marker. Reachable from footer only if privacy link is added; v1 footer does not link it (can be added later).
- `app/(marketing)/terms/page.tsx` — same treatment.

Actual legal content is written by the author (ideally reviewed by a lawyer) before launch. This spec does not include auto-drafted legal text.

---

## 12. Deployment & tooling

### Hosting

Vercel, Next.js framework preset. Production deploys from `main`. Preview deploys on all other branches and PRs. GitHub integration configured by the user in the Vercel dashboard.

### Domains

- `nvoke.run` → production
- `www.nvoke.run` → 308 redirect to `nvoke.run`
- Preview deploys auto-assigned `*.vercel.app` URLs

### Environment variables

None in v1. The marketing site has no API calls, no analytics keys, no database.

### GitHub repo setup

- `.gitignore` — Node + Next.js standard (`node_modules`, `.next`, `.vercel`, `.env*.local`, `next-env.d.ts`)
- `engines.node` pinned to `>=20` in `package.json`
- No GitHub Actions in v1 — Vercel handles build, deploy, preview URLs, and PR status checks
- Branch protection on `main` is author's choice

### Local dev scripts

- `npm install`
- `npm run dev` → `next dev` on `:3000`
- `npm run build` → production build locally
- `npm run lint` → `next lint`
- `npm run typecheck` → `tsc --noEmit`

### Linting & formatting

- ESLint: `eslint-config-next` (default rules, no overrides)
- Prettier: default config + `prettier-plugin-tailwindcss` for class sorting
- `.editorconfig`: standard 6-line config for line endings and indentation

### TypeScript config

- `strict: true`
- `noUncheckedIndexedAccess: true`
- Path alias: `@/*` → `./`

### Build-time quality bar

- TypeScript errors fail the build
- Zod validation errors in `lib/blog.ts` (bad frontmatter) fail the build
- No test suite in v1

### Not in v1

No unit tests, no Storybook, no Playwright / Cypress, no Husky / lint-staged, no CHANGELOG.md, no i18n.

---

## 13. First-deploy sequence

1. Scaffold Next.js app in the existing `nvoke.run.website/` directory
2. Build all pages, components, MDX pipeline per this spec
3. First commit → push to GitHub
4. User imports repo in Vercel, attaches `nvoke.run` as production domain
5. Vercel builds and deploys; site live at `nvoke.run` with placeholder post and home page
6. Iterate on copy, palette calibration, and code panel polish on preview deploys

---

## 14. Open decisions deferred to build

These are intentionally left to implementation and in-build review, not pre-decided in this spec:

- Exact OKLCH values for every token (shape fixed; numbers calibrated on real pixels)
- Final Shiki warm-tinted theme (starting point: Vesper or similar, retinted)
- Final copy for hero, bullets, closer, pricing tagline, FAQ answers (working drafts above are shape)
- Header behavior on mobile (inline links vs. collapsed menu)
- Exact border weights, card shadows, spacing on the code panel
- Whether `draft` posts also fail the build if they lack `draft: true` — or simply validate like any other post. Default: validate like any other post.
