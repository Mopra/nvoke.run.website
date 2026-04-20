import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';

type CTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTA({
  title = 'Ship it today.',
  description = 'Create a function, get an endpoint, keep moving.',
  primaryLabel = 'Open app',
  secondaryLabel = 'Read the docs',
  secondaryHref = siteConfig.docsUrl
}: CTAProps) {
  const isSecondaryExternal = secondaryHref.startsWith('http');
  return (
    <section className="mx-auto my-24 max-w-3xl px-6 text-center">
      <h2 className="text-foreground text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground mt-3">{description}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <a href={siteConfig.appUrl}>
            {primaryLabel} <span aria-hidden>→</span>
          </a>
        </Button>
        <Button asChild variant="ghost" size="lg">
          {isSecondaryExternal ? (
            <a href={secondaryHref}>{secondaryLabel}</a>
          ) : (
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          )}
        </Button>
      </div>
    </section>
  );
}
