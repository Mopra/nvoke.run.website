# nvoke.run Marketing Site v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship the nvoke.run marketing site — home, blog, pricing, legal stubs — on Next.js 15 + Tailwind v4 + shadcn, deployed to Vercel.

**Architecture:** Next.js 15 App Router with a `(marketing)` route group and a separate `/blog` layout. Dark-only theme using shadcn semantic tokens mapped from OKLCH values (warm 80° neutrals + ~150° sage). MDX blog posts in `content/blog/` compiled at SSG time via `next-mdx-remote/rsc`. All interactive JS lives in a single client component (the animated code panel). Shiki syntax highlighting at build time — zero runtime highlighter bundle.

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui, Geist Sans/Mono via `geist`, `next-mdx-remote/rsc`, `gray-matter`, Zod, Shiki, Vercel.

**Design spec:** `docs/superpowers/specs/2026-04-13-marketing-site-v1-design.md` — the source of truth for all visual, behavioral, and scope decisions. Refer back to it when this plan is ambiguous.

**No test suite in v1.** Per-task verification is: `npm run typecheck`, `npm run lint`, `npm run build`, and visual inspection at `http://localhost:3000`. This is intentional — it's a marketing site, not a product.

**Commit style:** Conventional Commits (`feat:`, `chore:`, `docs:`, `style:`, `fix:`). Every task ends with one commit.

**Working directory for all commands:** `c:/Users/morte/Documents/Github/nvoke/nvoke.run.website` (run all commands from the repo root unless otherwise specified).

**Before starting:** the repo already exists with one commit (`docs: marketing site v1 design spec`). `git init` and `origin` remote are configured. Do not re-initialize.

---

## Phase 1 — Scaffold & baseline tooling

### Task 1: Initialize Next.js project files

**Files:**

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `next-env.d.ts`
- Create: `.gitignore`
- Create: `.editorconfig`
- Create: `.prettierrc`
- Create: `.prettierignore`
- Create: `.nvmrc`
- Create: `README.md`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "nvoke-website",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=20"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.1.0",
    "prettier": "^3.4.0",
    "prettier-plugin-tailwindcss": "^0.6.9",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: false
  }
};

export default nextConfig;
```

- [ ] **Step 4: Write `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

- [ ] **Step 5: Write `.gitignore`**

```
# dependencies
node_modules
.pnp
.pnp.*

# testing
coverage

# next.js
.next
out

# production builds
build
dist

# env
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# editors
.DS_Store
.idea
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
```

- [ ] **Step 6: Write `.editorconfig`**

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

- [ ] **Step 7: Write `.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 8: Write `.prettierignore`**

```
node_modules
.next
.vercel
out
build
dist
package-lock.json
content
```

- [ ] **Step 9: Write `.nvmrc`**

```
20
```

- [ ] **Step 10: Write `README.md`**

````markdown
# nvoke.run website

Marketing site + blog for [nvoke](https://app.nvoke.run) — a minimal tool for writing, running, and managing small Node.js functions.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · MDX · Vercel.

## Dev

```bash
npm install
npm run dev
```
````

Open http://localhost:3000.

## Scripts

- `npm run dev` — start dev server on :3000
- `npm run build` — production build
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — `next lint`
- `npm run format` — Prettier

## Design spec

See `docs/superpowers/specs/2026-04-13-marketing-site-v1-design.md`.

````

- [ ] **Step 11: Install dependencies**

```bash
npm install
````

Expected: installs without errors. `package-lock.json` created. `node_modules/` populated. No peer-dependency errors (warnings are OK).

- [ ] **Step 12: Commit**

```bash
git add .gitignore .editorconfig .prettierrc .prettierignore .nvmrc README.md package.json package-lock.json tsconfig.json next.config.mjs next-env.d.ts
git commit -m "chore: scaffold Next.js 15 + TypeScript strict"
```

---

### Task 2: Minimal app shell (root layout + placeholder home)

**Files:**

- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Write `app/globals.css`** (minimal — Tailwind v4 comes in Task 3)

```css
html,
body {
  margin: 0;
  padding: 0;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  background: #1a1814;
  color: #f2efe8;
}
```

- [ ] **Step 2: Write `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'nvoke',
  description: 'Write a function. Invoke it. That is the whole tool.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Write `app/page.tsx`**

```tsx
export default function HomePage() {
  return (
    <main style={{ padding: '4rem' }}>
      <h1>nvoke</h1>
      <p>Placeholder. Real home page coming soon.</p>
    </main>
  );
}
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Run dev server and visually verify**

```bash
npm run dev
```

Open http://localhost:3000. Expected: dark warm background, "nvoke" headline, placeholder paragraph. Stop the dev server (Ctrl+C) before the next step.

- [ ] **Step 6: Run build**

```bash
npm run build
```

Expected: build succeeds. Route `/` listed in the output as `○ (Static)`.

- [ ] **Step 7: Commit**

```bash
git add app/
git commit -m "feat: minimal app shell with placeholder home"
```

---

### Task 3: Tailwind v4 + warm neutral + sage token system

**Files:**

- Modify: `package.json` (add Tailwind v4)
- Create: `postcss.config.mjs`
- Modify: `app/globals.css` (full token system)

- [ ] **Step 1: Install Tailwind v4**

```bash
npm install -D tailwindcss@^4.0.0 @tailwindcss/postcss@^4.0.0
```

Expected: installs without errors.

- [ ] **Step 2: Write `postcss.config.mjs`**

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};

export default config;
```

- [ ] **Step 3: Rewrite `app/globals.css`** with the full token system

```css
@import 'tailwindcss';

@custom-variant dark (&:is(.dark *));

:root {
  /* Warm neutral + sage palette — dark only */
  --background: oklch(0.16 0.008 80);
  --foreground: oklch(0.95 0.01 80);

  --card: oklch(0.19 0.009 80);
  --card-foreground: oklch(0.95 0.01 80);

  --popover: oklch(0.19 0.009 80);
  --popover-foreground: oklch(0.95 0.01 80);

  --primary: oklch(0.72 0.09 150);
  --primary-foreground: oklch(0.16 0.008 80);

  --secondary: oklch(0.22 0.008 80);
  --secondary-foreground: oklch(0.95 0.01 80);

  --muted: oklch(0.22 0.008 80);
  --muted-foreground: oklch(0.68 0.01 80);

  --accent: oklch(0.24 0.01 80);
  --accent-foreground: oklch(0.95 0.01 80);

  --destructive: oklch(0.55 0.18 25);
  --destructive-foreground: oklch(0.95 0.01 80);

  --border: oklch(0.26 0.008 80);
  --input: oklch(0.26 0.008 80);
  --ring: oklch(0.72 0.09 150);

  --radius: 0.5rem;

  /* Depth rule: footer one shade below background */
  --footer: oklch(0.14 0.008 80);

  /* Code panel output region: half shade below card */
  --panel-output: oklch(0.17 0.008 80);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);

  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-footer: var(--footer);
  --color-panel-output: var(--panel-output);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* Base layer: set up the body, grain overlay, warm radial gradient */
@layer base {
  * {
    border-color: var(--border);
  }

  html {
    color-scheme: dark;
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--background);
    color: var(--foreground);
    font-feature-settings:
      'rlig' 1,
      'calt' 1;
    min-height: 100vh;
    position: relative;
  }

  /* Warm radial gradient — very subtle, sits behind content */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.19 0.012 80), transparent 70%);
  }

  /* Subtle grain overlay — inline SVG noise at ~3% opacity */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    mix-blend-mode: overlay;
  }

  /* Main content sits above the grain and gradient */
  body > * {
    position: relative;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

- [ ] **Step 4: Remove the inline body style from `app/page.tsx`** and verify Tailwind classes work

Replace `app/page.tsx` with:

```tsx
export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">nvoke</h1>
      <p className="text-muted-foreground mt-4">Tailwind v4 + warm tokens loaded.</p>
    </main>
  );
}
```

- [ ] **Step 5: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 6: Run dev server and visually verify**

```bash
npm run dev
```

Open http://localhost:3000. Expected:

- Warm dark background (not pure black — slightly brown)
- Very subtle radial gradient brighter near the top
- Barely-visible grain texture overlay
- "nvoke" headline in warm off-white
- Subtext in muted warm gray

Stop dev server.

- [ ] **Step 7: Run build**

```bash
npm run build
```

Expected: succeeds, CSS output is a single file.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json postcss.config.mjs app/globals.css app/page.tsx
git commit -m "feat: Tailwind v4 with warm neutral + sage token system"
```

---

### Task 4: Fonts — Geist Sans & Geist Mono

**Files:**

- Modify: `package.json` (add `geist`)
- Modify: `app/layout.tsx`
- Modify: `app/globals.css` (map font variables into @theme)

- [ ] **Step 1: Install the `geist` package**

```bash
npm install geist
```

- [ ] **Step 2: Modify `app/layout.tsx`** to load fonts

```tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'nvoke',
  description: 'Write a function. Invoke it. That is the whole tool.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Add font variables to `app/globals.css`** inside the `@theme inline` block

Find the `@theme inline {` block in `app/globals.css`. Add these lines at the end of the block, just before the closing `}`:

```css
--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Run dev server and visually verify**

Open http://localhost:3000. "nvoke" should now render in Geist Sans. Inspect element → headline font-family chain should start with a Geist CSS variable. Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json app/layout.tsx app/globals.css
git commit -m "feat: load Geist Sans and Geist Mono via next/font"
```

---

### Task 5: Site config + utility helpers

**Files:**

- Create: `lib/site.ts`
- Create: `lib/utils.ts`
- Create: `lib/seo.ts`

- [ ] **Step 1: Install `clsx` and `tailwind-merge`** (needed for shadcn `cn` helper in Task 6)

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 2: Write `lib/site.ts`**

```ts
export const siteConfig = {
  name: 'nvoke',
  tagline: 'Write a function. Invoke it. That is the whole tool.',
  description:
    'nvoke runs small Node.js functions with a real HTTP endpoint. No YAML, no cold-start rituals, no dashboard tour.',
  url: 'https://nvoke.run',
  appUrl: 'https://app.nvoke.run',
  ogImage: 'https://nvoke.run/og?title=nvoke',
  links: {
    github: 'https://github.com/Mopra/nvoke.run.website'
  },
  nav: [
    { label: 'Blog', href: '/blog' },
    { label: 'Pricing', href: '/pricing' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
```

- [ ] **Step 3: Write `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Write `lib/seo.ts`**

```ts
import type { Metadata } from 'next';
import { siteConfig } from './site';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  type = 'website',
  publishedTime
}: BuildMetadataInput = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — write a function, invoke it`;
  const ogImage = `${siteConfig.url}/og?title=${encodeURIComponent(title ?? siteConfig.name)}&kind=${type === 'article' ? 'post' : 'page'}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? siteConfig.name }],
      ...(publishedTime ? { publishedTime } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage]
    }
  };
}
```

- [ ] **Step 5: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/ package.json package-lock.json
git commit -m "feat: site config, cn util, and SEO metadata helper"
```

---

## Phase 2 — Design system primitives & site chrome

### Task 6: shadcn Button primitive

**Files:**

- Create: `components/ui/button.tsx`

Install shadcn's Button directly (without running `shadcn` CLI, to avoid a canary-version mismatch dance). Button is the only shadcn primitive needed for v1.

- [ ] **Step 1: Install `class-variance-authority` and `@radix-ui/react-slot`**

```bash
npm install class-variance-authority @radix-ui/react-slot
```

- [ ] **Step 2: Write `components/ui/button.tsx`**

```tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
        link: 'text-foreground underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/ package.json package-lock.json
git commit -m "feat: add shadcn Button primitive"
```

---

### Task 7: Logo, Header, Footer components

**Files:**

- Create: `components/site/logo.tsx`
- Create: `components/site/header.tsx`
- Create: `components/site/footer.tsx`

- [ ] **Step 1: Write `components/site/logo.tsx`**

```tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'text-foreground font-mono text-base font-semibold tracking-tight',
        'transition-opacity hover:opacity-80',
        className
      )}
    >
      nvoke
    </Link>
  );
}
```

- [ ] **Step 2: Write `components/site/header.tsx`**

```tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { siteConfig } from '@/lib/site';

export function Header() {
  return (
    <header className="border-border/50 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Logo />
        <nav className="flex items-center gap-1 text-sm">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <a href={siteConfig.appUrl}>
              Open app <span aria-hidden>→</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Write `components/site/footer.tsx`**

```tsx
import Link from 'next/link';
import { Logo } from './logo';
import { siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-border/50 bg-footer mt-24 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <Logo />
          <span>A quiet place to run code. © {new Date().getFullYear()} nvoke.</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <a href={siteConfig.appUrl} className="hover:text-foreground">
            Open app
          </a>
          <a href={siteConfig.links.github} className="hover:text-foreground">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/site/
git commit -m "feat: site logo, header, and footer components"
```

---

### Task 8: Marketing route group with shared layout

**Files:**

- Create: `app/(marketing)/layout.tsx`
- Move: `app/page.tsx` → `app/(marketing)/page.tsx` (and replace with a real hero-less placeholder for now)

- [ ] **Step 1: Delete `app/page.tsx`**

```bash
rm app/page.tsx
```

- [ ] **Step 2: Write `app/(marketing)/layout.tsx`**

```tsx
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Write `app/(marketing)/page.tsx`** (home placeholder — real content in Task 9)

```tsx
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-5xl font-semibold tracking-tight">nvoke</h1>
      <p className="text-muted-foreground mt-4 max-w-xl text-lg">
        Route group working. Header, footer, tokens loaded.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Run dev server and visually verify**

Open http://localhost:3000. Expected:

- Sticky header at top with "nvoke" wordmark on the left, "Blog" · "Pricing" · "Open app →" on the right
- Main content area
- Footer at the bottom in a slightly darker shade than the body
- Warm palette visible throughout

Click "Blog" and "Pricing" — will 404 for now, fine. "Open app →" should link to `https://app.nvoke.run`. Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add app/
git commit -m "feat: marketing route group with header + footer layout"
```

---

## Phase 3 — Home page

### Task 9: Home hero section

**Files:**

- Create: `components/home/hero.tsx`
- Modify: `app/(marketing)/page.tsx`

- [ ] **Step 1: Write `components/home/hero.tsx`**

```tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 sm:pt-28">
      <p className="border-primary/30 bg-primary/5 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
        Developer tool
      </p>
      <h1 className="text-foreground text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
        Write a function. Invoke it.
        <br />
        <span className="text-muted-foreground">That is the whole tool.</span>
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
        nvoke runs small Node.js functions with a real HTTP endpoint. No YAML, no cold-start
        rituals, no dashboard tour.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <a href={siteConfig.appUrl}>
            Open app <span aria-hidden>→</span>
          </a>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/blog">Read the blog</Link>
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/(marketing)/page.tsx`** to render the Hero

```tsx
import { Hero } from '@/components/home/hero';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 3: Run typecheck + visual verify + build**

```bash
npm run typecheck && npm run dev
```

Visually: hero should be left-aligned, tight tracking, sage eyebrow badge, two buttons. Stop dev server.

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/ components/home/
git commit -m "feat: home page hero section"
```

---

### Task 10: Code panel — static SSR version

This task builds the code panel _without_ animation. Shiki highlights the example at build time. Next task layers on the client-side typing animation.

**Files:**

- Modify: `package.json` (add `shiki`)
- Create: `components/home/code-panel-static.tsx`
- Create: `components/home/code-panel.tsx` (server wrapper for now; will get client child in Task 11)
- Modify: `app/(marketing)/page.tsx`

- [ ] **Step 1: Install Shiki**

```bash
npm install shiki
```

- [ ] **Step 2: Write `components/home/code-panel-static.tsx`** — pure server component

```tsx
import { codeToHtml } from 'shiki';

const EXAMPLE_CODE = `export default async function (req) {
  const { name = "world" } = req.body;
  return { message: \`Hello, \${name}!\` };
}`;

const OUTPUT_METHOD = 'POST /api/invoke/hello';
const OUTPUT_STATUS = '200 OK · 47ms';
const OUTPUT_BODY = '{ "message": "Hello, world!" }';

export async function CodePanelStatic() {
  const html = await codeToHtml(EXAMPLE_CODE, {
    lang: 'javascript',
    theme: 'vesper'
  });

  return (
    <figure
      className="border-border bg-card mx-auto my-12 max-w-3xl overflow-hidden rounded-xl border shadow-[0_1px_0_0_oklch(0.3_0.008_80)_inset]"
      aria-label="Example nvoke function"
    >
      {/* Chrome bar */}
      <div className="border-border flex items-center gap-2 border-b px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
        </div>
        <span className="text-muted-foreground ml-2 font-mono text-xs">hello.js</span>
      </div>

      {/* Code region */}
      <div
        className="bg-card overflow-x-auto px-5 py-5 font-mono text-sm [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Action bar */}
      <div className="border-border flex items-center justify-end border-t px-4 py-2.5">
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          className="border-primary/30 bg-primary/10 text-primary pointer-events-none rounded-md border px-3 py-1 font-mono text-xs"
        >
          Run ▸
        </button>
      </div>

      {/* Output region */}
      <div
        className="border-border bg-panel-output text-muted-foreground space-y-1 border-t px-5 py-4 font-mono text-xs"
        aria-live="off"
      >
        <div>{OUTPUT_METHOD}</div>
        <div className="text-primary">{OUTPUT_STATUS}</div>
        <div className="text-foreground">{OUTPUT_BODY}</div>
      </div>
    </figure>
  );
}
```

- [ ] **Step 3: Write `components/home/code-panel.tsx`** — re-exports the static version for now

```tsx
export { CodePanelStatic as CodePanel } from './code-panel-static';
```

- [ ] **Step 4: Update `app/(marketing)/page.tsx`**

```tsx
import { Hero } from '@/components/home/hero';
import { CodePanel } from '@/components/home/code-panel';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />
      <CodePanel />
    </>
  );
}
```

- [ ] **Step 5: Run typecheck + dev + build**

```bash
npm run typecheck
```

No errors expected.

```bash
npm run dev
```

Verify: code panel appears below the hero with the four bands (chrome, syntax-highlighted code, Run button, output). Syntax highlighting is visible (keywords colored). Stop dev.

```bash
npm run build
```

Expected: succeeds. Shiki compiles during build — first build may be slower.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json components/home/ app/
git commit -m "feat: static SSR code panel with Shiki highlighting"
```

---

### Task 11: Code panel — scroll-triggered animation

Wrap the highlighted code in a client component that replays it character-by-character on first scroll into view. Output region also fades in after a pause.

**Files:**

- Create: `components/home/code-panel-client.tsx`
- Modify: `components/home/code-panel-static.tsx` (split — extract pre-highlighted HTML + pass to client)
- Modify: `components/home/code-panel.tsx` (compose server + client)

- [ ] **Step 1: Refactor `components/home/code-panel-static.tsx`** to only render server-side Shiki and expose the HTML

Rewrite the file as:

```tsx
import { codeToHtml } from 'shiki';

export const EXAMPLE_CODE = `export default async function (req) {
  const { name = "world" } = req.body;
  return { message: \`Hello, \${name}!\` };
}`;

export const OUTPUT_METHOD = 'POST /api/invoke/hello';
export const OUTPUT_STATUS = '200 OK · 47ms';
export const OUTPUT_BODY = '{ "message": "Hello, world!" }';

export async function highlightExample(): Promise<string> {
  return codeToHtml(EXAMPLE_CODE, {
    lang: 'javascript',
    theme: 'vesper'
  });
}
```

This file no longer exports a component — just constants and the highlighter. Remove the `CodePanelStatic` export entirely.

- [ ] **Step 2: Write `components/home/code-panel-client.tsx`** — the client component

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  highlightedHtml: string;
  plainCode: string;
  outputMethod: string;
  outputStatus: string;
  outputBody: string;
};

type Phase = 'idle' | 'typing' | 'pausing' | 'pulsing' | 'output' | 'done';

const TYPE_SPEED_MS = 28;
const POST_TYPE_PAUSE_MS = 400;
const PULSE_DURATION_MS = 600;
const OUTPUT_REVEAL_MS = 300;

export function CodePanelClient({
  highlightedHtml,
  plainCode,
  outputMethod,
  outputStatus,
  outputBody
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  // hasStarted is false until IO fires → SSR/hydrate render shows the full highlighted HTML,
  // which is what the spec calls the "SSR initial state". Once the animation starts we
  // swap to the plain-text typing view, then back to the highlighted view when done.
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedChars, setTypedChars] = useState(0);
  const [outputVisible, setOutputVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced motion on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setPhase('done');
      setOutputVisible(true);
    }
  }, []);

  // IntersectionObserver — fires once
  useEffect(() => {
    if (reducedMotion || hasStarted) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setHasStarted(true);
          setPhase('typing');
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion, hasStarted]);

  // Typing phase
  useEffect(() => {
    if (phase !== 'typing') return;
    if (typedChars >= plainCode.length) {
      setPhase('pausing');
      return;
    }
    const t = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        setTypedChars((c) => c + 1);
      }
    }, TYPE_SPEED_MS);
    return () => clearTimeout(t);
  }, [phase, typedChars, plainCode.length]);

  // Pausing → pulsing → output → done
  useEffect(() => {
    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('pulsing'), POST_TYPE_PAUSE_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'pulsing') {
      const t = setTimeout(() => setPhase('output'), PULSE_DURATION_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'output') {
      setOutputVisible(true);
      const t = setTimeout(() => setPhase('done'), OUTPUT_REVEAL_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isTyping = phase === 'typing';
  // Show full highlighted HTML when:
  // - SSR / first hydrate (!hasStarted)
  // - animation finished (phase === 'done')
  // - user prefers reduced motion
  const showFullCode = !hasStarted || phase === 'done' || reducedMotion;
  const visibleCode = plainCode.slice(0, typedChars);

  const runButtonClass = `pointer-events-none rounded-md border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary ${
    phase === 'pulsing' ? 'animate-pulse' : ''
  }`;

  return (
    <figure
      ref={containerRef}
      className="border-border bg-card mx-auto my-12 max-w-3xl overflow-hidden rounded-xl border"
      aria-label="Example nvoke function"
    >
      {/* Chrome bar */}
      <div className="border-border flex items-center gap-2 border-b px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
        </div>
        <span className="text-muted-foreground ml-2 font-mono text-xs">hello.js</span>
      </div>

      {/* Code region — either full Shiki HTML (when done) or partial plain text (while typing) */}
      <div className="bg-card overflow-x-auto px-5 py-5 font-mono text-sm [&_pre]:!bg-transparent">
        {showFullCode ? (
          <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <pre className="whitespace-pre">
            <code>
              {visibleCode}
              {isTyping && <span className="animate-pulse">▍</span>}
            </code>
          </pre>
        )}
      </div>

      {/* Action bar */}
      <div className="border-border flex items-center justify-end border-t px-4 py-2.5">
        <button type="button" aria-hidden="true" tabIndex={-1} className={runButtonClass}>
          Run ▸
        </button>
      </div>

      {/* Output region — reserves height at all times (prevents CLS) */}
      <div
        className="border-border bg-panel-output text-muted-foreground min-h-[5.25rem] space-y-1 border-t px-5 py-4 font-mono text-xs transition-opacity duration-300"
        style={{ opacity: outputVisible ? 1 : 0 }}
        aria-live="off"
      >
        <div>{outputMethod}</div>
        <div className="text-primary">{outputStatus}</div>
        <div className="text-foreground">{outputBody}</div>
      </div>
    </figure>
  );
}
```

- [ ] **Step 3: Rewrite `components/home/code-panel.tsx`** — the server wrapper that fetches highlighted HTML and renders the client

```tsx
import {
  EXAMPLE_CODE,
  OUTPUT_BODY,
  OUTPUT_METHOD,
  OUTPUT_STATUS,
  highlightExample
} from './code-panel-static';
import { CodePanelClient } from './code-panel-client';

export async function CodePanel() {
  const highlightedHtml = await highlightExample();
  return (
    <CodePanelClient
      highlightedHtml={highlightedHtml}
      plainCode={EXAMPLE_CODE}
      outputMethod={OUTPUT_METHOD}
      outputStatus={OUTPUT_STATUS}
      outputBody={OUTPUT_BODY}
    />
  );
}
```

- [ ] **Step 4: Run typecheck + dev + build**

```bash
npm run typecheck
```

No errors.

```bash
npm run dev
```

Verify at http://localhost:3000:

- On first load, code types itself in character-by-character over ~2 seconds
- After typing completes, the Run button pulses briefly
- Then the output region fades in
- Refresh → animation replays (it fires on scroll-into-view, and the page starts scrolled to top so the panel is visible immediately — animation triggers)
- Toggle "Reduce motion" in your OS preferences and refresh → animation is skipped, full code + output visible immediately
- Output region has reserved height from first paint (no layout shift)

Stop dev.

```bash
npm run build
```

Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/home/
git commit -m "feat: animated code panel with scroll-triggered typing"
```

---

### Task 12: Home page bullets + closer + metadata

**Files:**

- Create: `components/home/bullets.tsx`
- Create: `components/home/closer.tsx`
- Modify: `app/(marketing)/page.tsx`

- [ ] **Step 1: Write `components/home/bullets.tsx`**

```tsx
const BULLETS = [
  {
    title: 'Write it in your browser.',
    body: 'Monaco editor, syntax highlighting, no local setup.'
  },
  {
    title: 'Get a real endpoint.',
    body: 'Every function gets an HTTPS URL and an API key.'
  },
  {
    title: 'Runs in 30 seconds or less.',
    body: 'Hard timeout, 128 MB heap, no surprises.'
  }
];

export function Bullets() {
  return (
    <section className="mx-auto mt-12 max-w-3xl px-6">
      <ul className="grid gap-8 sm:grid-cols-3">
        {BULLETS.map((b) => (
          <li key={b.title}>
            <h3 className="text-foreground font-semibold">{b.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{b.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/home/closer.tsx`**

```tsx
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';

export function Closer() {
  return (
    <section className="mx-auto my-24 max-w-3xl px-6 text-center">
      <p className="text-muted-foreground italic">
        Built for people who would rather ship than configure.
      </p>
      <div className="mt-6">
        <Button asChild size="lg">
          <a href={siteConfig.appUrl}>
            Open app <span aria-hidden>→</span>
          </a>
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update `app/(marketing)/page.tsx`**

```tsx
import { Hero } from '@/components/home/hero';
import { CodePanel } from '@/components/home/code-panel';
import { Bullets } from '@/components/home/bullets';
import { Closer } from '@/components/home/closer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />
      <CodePanel />
      <Bullets />
      <Closer />
    </>
  );
}
```

- [ ] **Step 4: Run typecheck + dev + build**

```bash
npm run typecheck && npm run dev
```

Verify the full home page top-to-bottom: header, hero, code panel (with animation), three bullets, closer with CTA, footer. Stop dev.

```bash
npm run build
```

Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/home/ app/
git commit -m "feat: home page bullets and closer"
```

---

## Phase 4 — Pricing and legal pages

### Task 13: Pricing page

**Files:**

- Create: `app/(marketing)/pricing/page.tsx`
- Create: `components/pricing/plan-card.tsx`
- Create: `components/pricing/faq.tsx`

- [ ] **Step 1: Write `components/pricing/plan-card.tsx`**

```tsx
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

type Plan = {
  name: string;
  price: string;
  tagline: string;
  limit: string;
  cta: string;
};

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        'border-border bg-card flex flex-col rounded-xl border p-6 transition-colors',
        'hover:border-primary/60'
      )}
    >
      <header>
        <h3 className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
          {plan.name}
        </h3>
        <p className="text-foreground mt-3 text-4xl font-semibold tracking-tight">{plan.price}</p>
        <p className="text-muted-foreground mt-2 text-sm italic">{plan.tagline}</p>
      </header>
      <div className="border-border mt-6 border-t pt-6">
        <p className="text-foreground text-sm">{plan.limit}</p>
      </div>
      <div className="mt-auto pt-6">
        <Button asChild className="w-full">
          <a href={siteConfig.appUrl}>
            {plan.cta} <span aria-hidden>→</span>
          </a>
        </Button>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Write `components/pricing/faq.tsx`**

```tsx
const FAQ = [
  {
    q: 'What counts as an execution?',
    a: 'One invocation of one function. A function that calls itself is still one execution. HTTP 4xx from your code counts; a 500 from our runner does not.'
  },
  {
    q: 'What happens if I hit my limit?',
    a: 'Invocations start returning 429. Your functions stay, your keys stay, your code stays. Upgrade or wait for the month to roll over.'
  },
  {
    q: 'Can I change plans mid-month?',
    a: 'Yes. Upgrades take effect immediately with a prorated charge. Downgrades take effect at the next billing cycle.'
  },
  {
    q: 'Do unused executions roll over?',
    a: 'No. Each month starts at zero.'
  }
];

export function PricingFaq() {
  return (
    <section className="mx-auto mt-24 max-w-3xl px-6">
      <h2 className="text-foreground text-2xl font-semibold tracking-tight">Questions</h2>
      <div className="mt-8 space-y-8">
        {FAQ.map((item) => (
          <div key={item.q}>
            <h3 className="text-foreground font-semibold">{item.q}</h3>
            <p className="text-muted-foreground mt-2">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `app/(marketing)/pricing/page.tsx`**

```tsx
import { PlanCard } from '@/components/pricing/plan-card';
import { PricingFaq } from '@/components/pricing/faq';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pricing',
  description: 'Pay for what you run. Three plans. No feature gating.',
  path: '/pricing'
});

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    tagline: 'For kicking the tires.',
    limit: '100 executions / month',
    cta: 'Start free'
  },
  {
    name: 'Nano',
    price: '$5',
    tagline: 'For a side project that is actually running.',
    limit: '5,000 executions / month',
    cta: 'Choose Nano'
  },
  {
    name: 'Scale',
    price: '$19',
    tagline: 'For something people depend on.',
    limit: '50,000 executions / month',
    cta: 'Choose Scale'
  }
];

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-foreground text-5xl font-semibold tracking-tight">
          Pay for what you run.
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Every plan includes the full product. Only the ceiling changes.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl px-6 text-center">
        <p className="text-muted-foreground text-sm">
          Every plan includes: the editor, real HTTPS endpoints, API keys, 30-second execution
          timeout, 128 MB heap, logs, and whatever we ship next week.
        </p>
      </section>

      <PricingFaq />

      <section className="mx-auto my-24 max-w-3xl px-6 text-center">
        <p className="text-muted-foreground">Start on Free. Upgrade when you hit the ceiling.</p>
        <div className="mt-6">
          <Button asChild size="lg">
            <a href={siteConfig.appUrl}>
              Open app <span aria-hidden>→</span>
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Run typecheck + dev + build**

```bash
npm run typecheck && npm run dev
```

Open http://localhost:3000/pricing. Verify: intro → three cards (equal height, aligned baselines) → included-row → FAQ → closing CTA. Hover each card → border tints sage. Stop dev.

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/pricing/ app/
git commit -m "feat: pricing page with three plans and FAQ"
```

---

### Task 14: Privacy & Terms stub pages

**Files:**

- Create: `app/(marketing)/privacy/page.tsx`
- Create: `app/(marketing)/terms/page.tsx`

- [ ] **Step 1: Write `app/(marketing)/privacy/page.tsx`**

```tsx
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy',
  description: 'Privacy policy for nvoke.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-foreground text-4xl font-semibold tracking-tight">Privacy</h1>
      <p className="border-primary/30 bg-primary/5 text-primary mt-6 rounded-md border p-4 font-mono text-sm">
        TODO: replace this page with real privacy policy text before launch.
      </p>
      <div className="text-muted-foreground mt-8 space-y-4">
        <p>
          nvoke collects the minimum information needed to run your functions and bill you for
          executions. We do not run third-party analytics on this marketing site.
        </p>
        <p>
          The full privacy policy will cover: what data the app stores, how long it is kept, who can
          access it, and your rights to export or delete it.
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Write `app/(marketing)/terms/page.tsx`**

```tsx
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms',
  description: 'Terms of service for nvoke.',
  path: '/terms'
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-foreground text-4xl font-semibold tracking-tight">Terms</h1>
      <p className="border-primary/30 bg-primary/5 text-primary mt-6 rounded-md border p-4 font-mono text-sm">
        TODO: replace this page with real terms of service text before launch.
      </p>
      <div className="text-muted-foreground mt-8 space-y-4">
        <p>
          By using nvoke you agree to run reasonable code within the execution limits on your plan.
          We reserve the right to throttle, block, or remove functions that abuse the runner or
          violate the acceptable-use policy.
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Run typecheck + dev + build**

```bash
npm run typecheck && npm run dev
```

Open /privacy and /terms. Verify the TODO banner is visible. Stop dev.

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/
git commit -m "feat: privacy and terms stub pages"
```

---

## Phase 5 — Blog pipeline

### Task 15: Blog content loader (`lib/blog.ts`)

**Files:**

- Modify: `package.json` (add `gray-matter`, `zod`)
- Create: `lib/blog.ts`

- [ ] **Step 1: Install dependencies**

```bash
npm install gray-matter zod
```

- [ ] **Step 2: Write `lib/blog.ts`**

```ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  draft: z.boolean().optional().default(false)
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

function readAllPostFiles(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const parsed = matter(raw);
    const fm = frontmatterSchema.parse(parsed.data);
    return { slug, frontmatter: fm, content: parsed.content };
  });
}

function isPublishable(post: Post, now: Date): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  if (post.frontmatter.draft) return false;
  return post.frontmatter.date.getTime() <= now.getTime();
}

export function getAllPosts(): Post[] {
  const now = new Date();
  return readAllPostFiles()
    .filter((p) => isPublishable(p, now))
    .sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const now = new Date();
  const post = readAllPostFiles().find((p) => p.slug === slug);
  if (!post) return null;
  if (!isPublishable(post, now)) return null;
  return post;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
```

- [ ] **Step 3: Create the content directory and a seed post**

```bash
mkdir -p content/blog
```

Write `content/blog/hello-world.mdx`:

```mdx
---
title: 'This is the first post'
description: 'A short marker post. Replace this with the first real thing we want to say.'
date: 2026-04-13
---

This is a placeholder post. It exists so the blog index is not empty on first deploy.

Real writing goes here soon.
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json lib/blog.ts content/
git commit -m "feat: blog content loader with Zod frontmatter schema"
```

---

### Task 16: Blog index page

**Files:**

- Create: `app/blog/layout.tsx`
- Create: `app/blog/page.tsx`

- [ ] **Step 1: Write `app/blog/layout.tsx`** — long-form wrapper with header + footer

```tsx
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Write `app/blog/page.tsx`**

```tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Writing from the nvoke team.',
  path: '/blog'
});

// ISR: re-evaluate hourly so future-dated posts go live automatically
export const revalidate = 3600;

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <header>
        <h1 className="text-foreground text-4xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground mt-3">Writing from the nvoke team.</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground mt-16">No posts yet.</p>
      ) : (
        <ul className="mt-16 space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <time className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                {formatDate(post.frontmatter.date)}
              </time>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="text-foreground hover:text-primary">
                  {post.frontmatter.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mt-1">{post.frontmatter.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Run typecheck + dev + build**

```bash
npm run typecheck && npm run dev
```

Open http://localhost:3000/blog. Verify: title, tagline, one post ("This is the first post") with the 2026-04-13 date. Stop dev.

```bash
npm run build
```

Expected: succeeds. `/blog` listed as a route.

- [ ] **Step 4: Commit**

```bash
git add app/blog/
git commit -m "feat: blog index page with post listing"
```

---

### Task 17: Blog post page with MDX rendering

**Files:**

- Modify: `package.json` (add `next-mdx-remote`)
- Create: `app/blog/[slug]/page.tsx`
- Create: `components/mdx/callout.tsx`
- Create: `components/mdx/code-block.tsx`
- Create: `components/mdx/prose.css`
- Modify: `app/globals.css` (import `prose.css`)

- [ ] **Step 1: Install `next-mdx-remote`**

```bash
npm install next-mdx-remote
```

- [ ] **Step 2: Write `components/mdx/callout.tsx`**

```tsx
import { cn } from '@/lib/utils';

type Props = {
  type?: 'note' | 'warn';
  children: React.ReactNode;
};

export function Callout({ type = 'note', children }: Props) {
  return (
    <aside
      className={cn(
        'my-6 rounded-md border px-4 py-3 text-sm',
        type === 'note' && 'border-primary/30 bg-primary/5 text-foreground',
        type === 'warn' && 'border-destructive/40 bg-destructive/5 text-foreground'
      )}
    >
      {children}
    </aside>
  );
}
```

- [ ] **Step 3: Write `components/mdx/code-block.tsx`** — Shiki-highlighted code blocks (server component)

```tsx
import { codeToHtml } from 'shiki';

type Props = {
  children: string;
  language?: string;
  title?: string;
};

export async function CodeBlock({ children, language = 'javascript', title }: Props) {
  const html = await codeToHtml(children.trim(), { lang: language, theme: 'vesper' });
  return (
    <figure className="border-border bg-card my-6 overflow-hidden rounded-lg border">
      {title && (
        <figcaption className="border-border text-muted-foreground border-b px-4 py-2 font-mono text-xs">
          {title}
        </figcaption>
      )}
      <div
        className="overflow-x-auto px-4 py-4 font-mono text-sm [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
```

- [ ] **Step 4: Write `components/mdx/prose.css`** — warm-tinted prose styles

```css
.prose {
  color: var(--foreground);
  font-size: 17px;
  line-height: 1.7;
}

.prose h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.625rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--foreground);
}

.prose h3 {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--foreground);
}

.prose p {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--foreground);
}

.prose a {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}

.prose a:hover {
  text-decoration-thickness: 2px;
}

.prose ul,
.prose ol {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-top: 0.375rem;
  margin-bottom: 0.375rem;
}

.prose blockquote {
  margin: 1.5rem 0;
  border-left: 2px solid var(--primary);
  padding-left: 1rem;
  font-style: italic;
  color: var(--muted-foreground);
}

.prose hr {
  margin: 2.5rem 0;
  border: 0;
  border-top: 1px solid var(--border);
}

.prose code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  background: var(--accent);
  color: var(--foreground);
}

.prose pre code {
  padding: 0;
  background: transparent;
}

.prose img {
  margin: 1.5rem 0;
  border-radius: 8px;
  border: 1px solid var(--border);
}
```

- [ ] **Step 5: Import `prose.css` in `app/globals.css`** — add as the final line

Add this to the end of `app/globals.css`:

```css
@import '../components/mdx/prose.css';
```

- [ ] **Step 6: Write `app/blog/[slug]/page.tsx`**

```tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { Callout } from '@/components/mdx/callout';
import { CodeBlock } from '@/components/mdx/code-block';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ title: 'Not found' });
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.frontmatter.date.toISOString()
  });
}

type CodeChildProps = { children?: string; className?: string };

const components = {
  Callout,
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => {
    // Fenced code blocks arrive as <pre><code className="language-xxx">...</code></pre>
    const codeEl = props.children as React.ReactElement<CodeChildProps> | undefined;
    const code = codeEl?.props?.children;
    const className = codeEl?.props?.className ?? '';
    const lang = /language-(\w+)/.exec(className)?.[1] ?? 'text';
    if (typeof code === 'string') {
      return <CodeBlock language={lang}>{code}</CodeBlock>;
    }
    return <pre {...props} />;
  }
};

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <header className="mb-10">
        <time className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          {formatDate(post.frontmatter.date)}
        </time>
        <h1 className="text-foreground mt-3 text-4xl leading-tight font-semibold tracking-tight">
          {post.frontmatter.title}
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">{post.frontmatter.description}</p>
      </header>

      <div className="prose">
        <MDXRemote source={post.content} components={components} />
      </div>

      <footer className="border-border mt-16 border-t pt-8">
        <Link href="/blog" className="text-muted-foreground hover:text-foreground text-sm">
          ← Back to blog
        </Link>
      </footer>
    </article>
  );
}
```

- [ ] **Step 7: Run typecheck + dev + build**

```bash
npm run typecheck
```

Expected: no errors.

```bash
npm run dev
```

Open http://localhost:3000/blog/hello-world. Verify:

- Date, title, description up top
- Body paragraphs render with warm prose styles
- "← Back to blog" link at the bottom
- Typography is readable, ~68ch wide

Stop dev.

```bash
npm run build
```

Expected: succeeds. `/blog/[slug]` shows one static param.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json app/ components/mdx/
git commit -m "feat: blog post rendering with MDX, Shiki, and prose styles"
```

---

## Phase 6 — SEO plumbing

### Task 18: JSON-LD structured data

**Files:**

- Create: `components/site/json-ld.tsx`
- Modify: `app/layout.tsx` (inject Organization schema site-wide)
- Modify: `app/blog/page.tsx` (inject Blog schema)
- Modify: `app/blog/[slug]/page.tsx` (inject BlogPosting schema)

- [ ] **Step 1: Write `components/site/json-ld.tsx`**

```tsx
type Props = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c')
      }}
    />
  );
}
```

- [ ] **Step 2: Add Organization schema to `app/layout.tsx`**

Modify `app/layout.tsx` to:

```tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { JsonLd } from '@/components/site/json-ld';
import { siteConfig } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  title: 'nvoke',
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url)
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Add Blog schema to `app/blog/page.tsx`**

At the top of the `BlogIndexPage` return JSX, just inside the wrapping `<div>`, add:

```tsx
<JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} blog`,
    url: `${siteConfig.url}/blog`
  }}
/>
```

And add the imports at the top of the file:

```tsx
import { JsonLd } from '@/components/site/json-ld';
import { siteConfig } from '@/lib/site';
```

- [ ] **Step 4: Add BlogPosting schema to `app/blog/[slug]/page.tsx`**

Inside the `BlogPostPage` return, just inside the wrapping `<article>`, add:

```tsx
<JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date.toISOString(),
    dateModified: post.frontmatter.date.toISOString(),
    author: { '@type': 'Organization', name: siteConfig.name },
    image: `${siteConfig.url}/og?title=${encodeURIComponent(post.frontmatter.title)}&kind=post`,
    url: `${siteConfig.url}/blog/${post.slug}`
  }}
/>
```

And add imports:

```tsx
import { JsonLd } from '@/components/site/json-ld';
import { siteConfig } from '@/lib/site';
```

- [ ] **Step 5: Run typecheck + dev + build**

```bash
npm run typecheck && npm run dev
```

Open each page, view source, verify `<script type="application/ld+json">` is present with the right schema per page. Stop dev.

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add components/site/json-ld.tsx app/
git commit -m "feat: JSON-LD Organization, Blog, and BlogPosting schemas"
```

---

### Task 19: Dynamic OG images

**Files:**

- Create: `app/og/route.tsx`

- [ ] **Step 1: Write `app/og/route.tsx`**

```tsx
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? siteConfig.name;
  const kind = searchParams.get('kind') ?? 'page';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#1a1814',
        color: '#f2efe8',
        fontFamily: 'sans-serif'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 80,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}
      >
        nvoke
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: title.length > 40 ? 56 : 72,
          fontWeight: 600,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          maxWidth: '85%'
        }}
      >
        {title}
      </div>

      {kind === 'post' && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            fontSize: 22,
            color: '#a8a296'
          }}
        >
          nvoke blog
        </div>
      )}
    </div>,
    {
      width: 1200,
      height: 630
    }
  );
}
```

- [ ] **Step 2: Run typecheck + dev**

```bash
npm run typecheck && npm run dev
```

Open http://localhost:3000/og?title=Hello%20world&kind=post — a 1200×630 PNG should render with the title. Also http://localhost:3000/og?title=nvoke. Stop dev.

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: succeeds. `/og` appears as an edge function route.

- [ ] **Step 4: Commit**

```bash
git add app/og/
git commit -m "feat: dynamic OG images via next/og"
```

---

### Task 20: Sitemap, robots, favicons, manifest

**Files:**

- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/icon.tsx`
- Create: `app/apple-icon.tsx`
- Create: `app/manifest.ts`

- [ ] **Step 1: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteConfig.url}/pricing`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteConfig.url}/terms`, changeFrequency: 'yearly', priority: 0.2 }
  ];

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.frontmatter.date,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...staticEntries, ...postEntries];
}
```

- [ ] **Step 2: Write `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
```

- [ ] **Step 3: Write `app/icon.tsx`** — generated favicon

```tsx
import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1814',
        color: '#8fb89b',
        fontSize: 22,
        fontWeight: 700,
        fontFamily: 'monospace'
      }}
    >
      n
    </div>,
    size
  );
}
```

- [ ] **Step 4: Write `app/apple-icon.tsx`**

```tsx
import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1814',
        color: '#8fb89b',
        fontSize: 120,
        fontWeight: 700,
        fontFamily: 'monospace',
        borderRadius: 40
      }}
    >
      n
    </div>,
    size
  );
}
```

- [ ] **Step 5: Write `app/manifest.ts`**

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1814',
    theme_color: '#1a1814'
  };
}
```

- [ ] **Step 6: Run typecheck + dev**

```bash
npm run typecheck && npm run dev
```

Visit http://localhost:3000/sitemap.xml (XML with all routes + the one post), http://localhost:3000/robots.txt (allows all, points to sitemap), http://localhost:3000/icon, http://localhost:3000/apple-icon, http://localhost:3000/manifest.webmanifest (JSON). Stop dev.

- [ ] **Step 7: Run build**

```bash
npm run build
```

Expected: succeeds. Routes `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/icon`, `/apple-icon` all listed.

- [ ] **Step 8: Commit**

```bash
git add app/
git commit -m "feat: sitemap, robots, favicons, and web manifest"
```

---

## Phase 7 — Final verification

### Task 21: Final build audit + push to origin

**Files:** none

- [ ] **Step 1: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors. If lint fails on unrelated warnings (unused imports, etc.), fix them inline and amend via a new commit.

- [ ] **Step 3: Run Prettier in check mode**

```bash
npx prettier --check .
```

Expected: all files formatted. If any fail, run `npm run format` and commit the result.

- [ ] **Step 4: Production build**

```bash
npm run build
```

Expected: succeeds. Review the output:

- `/` listed as `○ (Static)` or `ƒ (Dynamic)` depending on metadata
- `/blog` listed
- `/blog/[slug]` listed with static params (one)
- `/pricing`, `/privacy`, `/terms` listed as static
- `/og` listed as Edge
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` listed

- [ ] **Step 5: Production start and smoke test**

```bash
npm run start
```

Open http://localhost:3000 and click through:

- Home: hero + code panel animation + bullets + closer + footer
- Click "Blog" → index loads with the one seed post
- Click the post → post page with title, body, back-to-blog link
- Click "Pricing" → three cards + FAQ
- Visit /privacy and /terms → TODO banner + placeholder content
- View source on each page → JSON-LD present, canonical URL, OG meta tags
- `/sitemap.xml` → includes the post
- `/robots.txt` → points to sitemap

Stop the server.

- [ ] **Step 6: Verify Lighthouse performance target** (optional but recommended)

Run Lighthouse (via DevTools or CLI) on `http://localhost:3000` in production mode. Targets per spec:

- Performance ≥ 95
- Accessibility 100
- Best Practices 100
- SEO 100
- LCP < 1.5s
- CLS 0

If any metric falls short, open a follow-up issue — do not block the ship on Lighthouse tuning. The spec targets are aspirational.

- [ ] **Step 7: Push to origin**

```bash
git push -u origin master
```

(If the default branch should be `main`, rename first:

```bash
git branch -m master main
git push -u origin main
```

Confirm with the user which branch name they want before pushing.)

Expected: push succeeds to `https://github.com/Mopra/nvoke.run.website`.

- [ ] **Step 8: Ship checklist (manual, outside this plan)**

After the push:

1. In Vercel dashboard, import the GitHub repo as a new project
2. Framework preset: Next.js (auto-detected)
3. Root directory: `./`
4. Build command: default (`next build`)
5. Environment variables: none
6. Deploy
7. Once deployed, attach `nvoke.run` as the production domain in project settings
8. Add `www.nvoke.run` as a redirect to `nvoke.run`
9. Verify the live site at `https://nvoke.run`
10. Submit `https://nvoke.run/sitemap.xml` to Google Search Console (separate step, user action)

**Plan complete.**

---

## Self-review notes

**Spec coverage checklist:**

- [x] Pages: Home (Task 12), Blog index (Task 16), Blog post (Task 17), Pricing (Task 13), Privacy (Task 14), Terms (Task 14)
- [x] Stack: Next.js 15 / React 19 / TypeScript strict (Task 1), Tailwind v4 (Task 3), shadcn Button (Task 6), Geist fonts (Task 4), next-mdx-remote (Task 17), Shiki (Task 10 + 17), gray-matter + Zod (Task 15)
- [x] Dark-only warm neutral + sage tokens (Task 3)
- [x] Grain overlay + warm radial gradient (Task 3)
- [x] Header + footer chrome (Task 7)
- [x] Hero + code panel (static + animated) + bullets + closer (Tasks 9-12)
- [x] Pricing three cards + FAQ + included row + closing CTA (Task 13)
- [x] Legal stubs with TODO markers (Task 14)
- [x] Blog content loader with draft + future-date filtering, ISR revalidation (Task 15)
- [x] Blog index with reverse-chronological listing (Task 16)
- [x] Blog post with long-form prose, MDX, custom Callout and CodeBlock (Task 17)
- [x] Seed post (Task 15)
- [x] `lib/site.ts` + `lib/seo.ts` (Task 5)
- [x] `buildMetadata` helper used on every page (Tasks 8, 9, 13, 14, 16, 17)
- [x] JSON-LD Organization / Blog / BlogPosting (Task 18)
- [x] Dynamic OG images via `next/og` (Task 19)
- [x] Sitemap + robots + icons + manifest (Task 20)
- [x] prefers-reduced-motion respected (Task 3 + Task 11)
- [x] Final build audit + push (Task 21)

**Not in v1 (deliberate, spec-aligned):** analytics, light mode, tests, Storybook, RSS, i18n, CHANGELOG.

**Deferred polish (spec Section 14):** Exact OKLCH value calibration, final Shiki theme tinting, copy refinement, mobile header behavior, code panel spacing/border details. All of these get iterated on preview deploys after Task 21 completes and the site is live.
