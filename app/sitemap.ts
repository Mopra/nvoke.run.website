import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/site';

const LANDING_ROUTES = [
  '/features',
  '/features/http-endpoints',
  '/features/scheduled-functions',
  '/features/secrets',
  '/features/logs',
  '/features/browser-editor',
  '/features/ai-assistant',
  '/use-cases',
  '/use-cases/webhooks',
  '/use-cases/cron-jobs',
  '/use-cases/llm-tools',
  '/use-cases/stripe-webhooks',
  '/use-cases/internal-apis',
  '/alternatives',
  '/alternatives/vercel-functions',
  '/alternatives/aws-lambda',
  '/alternatives/cloudflare-workers',
  '/alternatives/val-town',
  '/alternatives/deno-deploy'
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteConfig.url}/pricing`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/changelog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteConfig.url}/terms`, changeFrequency: 'yearly', priority: 0.2 }
  ];

  const landingEntries: MetadataRoute.Sitemap = LANDING_ROUTES.map((path) => {
    const isHub = path.split('/').length === 2;
    return {
      url: `${siteConfig.url}${path}`,
      changeFrequency: 'monthly' as const,
      priority: isHub ? 0.8 : 0.7
    };
  });

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.frontmatter.date,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...staticEntries, ...landingEntries, ...postEntries];
}
