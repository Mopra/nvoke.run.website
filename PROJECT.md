# nvoke — project map

> **This file is the canonical cross-repo map for the nvoke project.** It's linked from every nvoke repo README so that anyone — human or LLM — reading a single repo can see how the pieces fit together.

## The three repos

nvoke lives across three independent repos under the [Mopra](https://github.com/Mopra) GitHub org. Each deploys to its own subdomain and has a focused responsibility:

| Repo | Deploys to | Purpose |
|---|---|---|
| [`Mopra/nvoke.run`](https://github.com/Mopra/nvoke.run) | `app.nvoke.run` | **The product.** Web app (`apps/web`, Vite + React + React Router) and API (`apps/api`, Fastify). Everything behind login. |
| [`Mopra/nvoke.run.website`](https://github.com/Mopra/nvoke.run.website) | `nvoke.run` | **The marketing site.** Landing pages, pricing, legal, public SEO pages. Next.js 15 + shadcn/ui. |
| [`Mopra/nvoke.run.docs`](https://github.com/Mopra/nvoke.run.docs) | `docs.nvoke.run` | **The documentation.** Getting started, guides, API reference. Next.js 16 + Nextra 4. |

## How they relate

- The three repos are **independent** (separate `package.json`, separate deploys, separate git history).
- They share **design conventions** (shadcn theme tokens, warm-neutral palette with sage accent — see each repo's `CLAUDE.md`).
- They are **interlinked** at the UI layer:
  - Marketing and docs sites carry a three-column footer listing all three properties on every page.
  - The marketing header has a `Docs` nav link and `Launch app` CTA.
  - The docs header has a `Launch app` button and a link back to the marketing home.
  - The product app has a `Docs` link pinned to its sidebar footer and contextual "Learn more →" links inside empty states.

## Working in this project

When an agent is invoked inside a single repo, it should consult that repo's own `CLAUDE.md` — each repo carries a "Sibling repos" section that describes when to bail out and switch contexts.
