export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavChild[];
};

export const siteConfig = {
  name: 'nvoke',
  tagline: 'Write a function. Invoke it. That is the whole tool.',
  description:
    'nvoke runs small Node.js functions with a real HTTP endpoint. No YAML, no cold-start rituals, no dashboard tour.',
  url: 'https://nvoke.run',
  appUrl: 'https://app.nvoke.run',
  docsUrl: 'https://docs.nvoke.run',
  ogImage: 'https://nvoke.run/og?title=nvoke',
  links: {
    github: 'https://github.com/Mopra/nvoke.run.website'
  },
  nav: [
    {
      label: 'Features',
      href: '/features',
      children: [
        {
          label: 'HTTP endpoints',
          href: '/features/http-endpoints',
          description: 'Every function gets a real HTTPS URL.'
        },
        {
          label: 'Scheduled functions',
          href: '/features/scheduled-functions',
          description: 'Cron syntax, no infrastructure.'
        },
        {
          label: 'Secrets',
          href: '/features/secrets',
          description: 'Encrypted env vars, per function.'
        },
        {
          label: 'Logs',
          href: '/features/logs',
          description: 'Live tail, searchable history.'
        },
        {
          label: 'Browser editor',
          href: '/features/browser-editor',
          description: 'Monaco, syntax highlighting, no local setup.'
        },
        {
          label: 'AI assistant',
          href: '/features/ai-assistant',
          description: 'Write, refactor, and explain code in the editor.'
        }
      ]
    },
    {
      label: 'Use cases',
      href: '/use-cases',
      children: [
        {
          label: 'Webhooks',
          href: '/use-cases/webhooks',
          description: 'Receive and act on HTTP callbacks.'
        },
        {
          label: 'Cron jobs',
          href: '/use-cases/cron-jobs',
          description: 'Scheduled tasks without a server.'
        },
        {
          label: 'LLM tool endpoints',
          href: '/use-cases/llm-tools',
          description: 'Give AI agents a real URL to call.'
        },
        {
          label: 'Stripe webhooks',
          href: '/use-cases/stripe-webhooks',
          description: 'Handle Stripe events in minutes.'
        },
        {
          label: 'Internal APIs',
          href: '/use-cases/internal-apis',
          description: 'Small endpoints for your own tools.'
        }
      ]
    },
    {
      label: 'Alternatives',
      href: '/alternatives',
      children: [
        {
          label: 'vs Vercel Functions',
          href: '/alternatives/vercel-functions',
          description: 'Standalone functions without a Next.js app.'
        },
        {
          label: 'vs AWS Lambda',
          href: '/alternatives/aws-lambda',
          description: 'Lambda, without the YAML.'
        },
        {
          label: 'vs Cloudflare Workers',
          href: '/alternatives/cloudflare-workers',
          description: 'Node.js, not just Workers runtime.'
        },
        {
          label: 'vs Val.town',
          href: '/alternatives/val-town',
          description: 'Closer to production, same feel.'
        },
        {
          label: 'vs Deno Deploy',
          href: '/alternatives/deno-deploy',
          description: 'Node.js and npm, not Deno.'
        }
      ]
    },
    {
      label: 'Resources',
      href: '/blog',
      children: [
        {
          label: 'Docs',
          href: 'https://docs.nvoke.run',
          description: 'Guides, API reference, and how-tos.'
        },
        {
          label: 'Blog',
          href: '/blog',
          description: 'Deep dives and product thinking.'
        },
        {
          label: 'Changelog',
          href: '/changelog',
          description: 'What shipped, release by release.'
        }
      ]
    },
    { label: 'Pricing', href: '/pricing' }
  ] as readonly NavItem[]
} as const;

export type SiteConfig = typeof siteConfig;
