> **Part of the nvoke project** — one product across three repos:
> - [nvoke.run](https://github.com/Mopra/nvoke.run) — product (web app + API)
> - [nvoke.run.website](https://github.com/Mopra/nvoke.run.website) — marketing site (nvoke.run)
> - [nvoke.run.docs](https://github.com/Mopra/nvoke.run.docs) — documentation (docs.nvoke.run)
>
> See [PROJECT.md](https://github.com/Mopra/nvoke.run.website/blob/main/PROJECT.md) for the full project overview.

---

# nvoke.run website

Marketing site + blog for [nvoke](https://app.nvoke.run) — a minimal tool for writing, running, and managing small Node.js functions.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · MDX · Vercel.

## Dev

`npm install` then `npm run dev`. Open http://localhost:3000.

## Scripts

- `npm run dev` — start dev server on :3000
- `npm run build` — production build
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — `next lint`
- `npm run format` — Prettier

## Design spec

See `docs/superpowers/specs/2026-04-13-marketing-site-v1-design.md`.
