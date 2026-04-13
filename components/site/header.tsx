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
