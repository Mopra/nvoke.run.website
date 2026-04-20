import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { siteConfig } from '@/lib/site';
import type { NavItem } from '@/lib/site';

function NavLink({ item }: { item: NavItem }) {
  if (!item.children || item.children.length === 0) {
    const isExternal = item.href.startsWith('http');
    const className =
      'text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 transition-colors';
    if (isExternal) {
      return (
        <a href={item.href} className={className}>
          {item.label}
        </a>
      );
    }
    return (
      <Link href={item.href} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={item.href}
        className="text-muted-foreground hover:text-foreground focus-visible:text-foreground inline-flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors"
      >
        {item.label}
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className="size-3 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
        >
          <path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>
      <div
        className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
        role="menu"
      >
        <div className="border-border/60 bg-background/95 w-72 rounded-lg border p-2 shadow-lg backdrop-blur-md">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className="hover:bg-muted focus-visible:bg-muted block rounded-md px-3 py-2 transition-colors"
            >
              <div className="text-foreground text-sm font-medium">{child.label}</div>
              {child.description ? (
                <div className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                  {child.description}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="border-border/50 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="flex items-center gap-1 text-sm">
          {siteConfig.nav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          <Button asChild variant="ghost" size="sm" className="ml-2">
            <a href={siteConfig.appUrl}>Log in</a>
          </Button>
          <Button asChild size="sm">
            <a href={siteConfig.appUrl}>
              Launch app <span aria-hidden>→</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
