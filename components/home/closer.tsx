import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';

export function Closer() {
  return (
    <section className="mx-auto my-24 max-w-3xl px-6 text-center">
      <p className="text-muted-foreground italic">
        Built for people who would rather ship than configure.
      </p>
      <div className="mt-6">
        <Button asChild size="lg">
          <a href={siteConfig.appUrl}>
            Open app <span aria-hidden>→</span>
          </a>
        </Button>
      </div>
    </section>
  );
}
