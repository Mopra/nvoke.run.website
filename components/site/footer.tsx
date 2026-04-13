import Link from 'next/link';
import { Logo } from './logo';
import { siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/50 bg-footer">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
