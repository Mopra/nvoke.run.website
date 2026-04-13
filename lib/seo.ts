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
