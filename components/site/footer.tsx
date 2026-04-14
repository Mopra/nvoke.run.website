import Link from 'next/link';
import { Logo } from './logo';
import { siteConfig } from '@/lib/site';

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'Launch app', href: siteConfig.appUrl }
    ]
  },
  {
    heading: 'Docs',
    links: [
      { label: 'Getting started', href: `${siteConfig.docsUrl}/getting-started` },
      { label: 'Guides', href: `${siteConfig.docsUrl}/guides/writing-functions` },
      { label: 'API reference', href: `${siteConfig.docsUrl}/api-reference/overview` }
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'GitHub', href: siteConfig.links.github },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-border/50 bg-footer mt-24 border-t">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-foreground text-sm font-semibold">{col.heading}</h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-border/50 mt-12 flex flex-col items-start gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Logo />
            <span className="text-muted-foreground text-xs">
              A quiet place to run code. © {new Date().getFullYear()} nvoke.
            </span>
          </div>
          <nav className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <Link href={siteConfig.url} className="hover:text-foreground transition-colors">
              nvoke.run
            </Link>
            <span aria-hidden>·</span>
            <Link href={siteConfig.docsUrl} className="hover:text-foreground transition-colors">
              docs.nvoke.run
            </Link>
            <span aria-hidden>·</span>
            <Link href={siteConfig.appUrl} className="hover:text-foreground transition-colors">
              app.nvoke.run
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
