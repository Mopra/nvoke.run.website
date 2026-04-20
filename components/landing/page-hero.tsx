import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  primaryCta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta = { label: 'Open app', href: siteConfig.appUrl, external: true },
  secondaryCta
}: PageHeroProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 sm:pt-24">
      {eyebrow ? (
        <p className="border-primary/30 bg-primary/5 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-foreground text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          {primaryCta.external ? (
            <a href={primaryCta.href}>
              {primaryCta.label} <span aria-hidden>→</span>
            </a>
          ) : (
            <Link href={primaryCta.href}>
              {primaryCta.label} <span aria-hidden>→</span>
            </Link>
          )}
        </Button>
        {secondaryCta ? (
          <Button asChild variant="ghost" size="lg">
            {secondaryCta.external ? (
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            ) : (
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            )}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
