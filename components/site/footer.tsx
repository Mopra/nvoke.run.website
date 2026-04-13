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
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <a href={siteConfig.appUrl} className="hover:text-foreground transition-colors">
            Open app
          </a>
          <a href={siteConfig.links.github} className="hover:text-foreground transition-colors">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
