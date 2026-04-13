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
