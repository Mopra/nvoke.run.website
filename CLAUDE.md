# nvoke.run.website — agent instructions

The public marketing site for nvoke.run. Next.js 15 + React 19 + Tailwind v4 + shadcn/ui. Deploys to `nvoke.run`.

## Sibling repos

This repo is one of three under the [Mopra/nvoke](https://github.com/Mopra) project. Local sibling paths (when working from the umbrella workspace):

- `../nvoke.run/` — the product (web app at `app.nvoke.run`, API). Handles anything behind login, user data, dashboards.
- `../nvoke.run.docs/` — the documentation (`docs.nvoke.run`). Handles all user-facing docs content, guides, API reference.

**When to switch repos:**
- If the request is about a product feature, dashboard, auth, or API → switch to `../nvoke.run/`.
- If the request is about writing or updating documentation content → switch to `../nvoke.run.docs/`.
- If the request is about landing pages, marketing copy, pricing, or public SEO pages → stay here.

## Conventions

- **Theme tokens only (hard rule):** use shadcn theme tokens (CSS variables like `bg-background`, `text-foreground`, `bg-footer`). **No hardcoded palette colors.** This rule exists so tweakcn theme swaps work instantly across the project.
- Theme direction is warm 80°-tinted neutrals with a sage (~150°) ring accent. Sidebar/footer surfaces are darker than content.
- Absolute URLs when linking to sibling properties (`https://app.nvoke.run`, `https://docs.nvoke.run`). Never relative.
- Cross-property links from marketing to docs/app open in the **same tab**.
