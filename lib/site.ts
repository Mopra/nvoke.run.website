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
