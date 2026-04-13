import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

type Plan = {
  name: string;
  price: string;
  tagline: string;
  limit: string;
  cta: string;
};

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-xl border border-border bg-card p-6 transition-colors',
        'hover:border-primary/60'
      )}
    >
      <header>
        <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          {plan.name}
        </h3>
        <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{plan.price}</p>
        <p className="mt-2 text-sm italic text-muted-foreground">{plan.tagline}</p>
      </header>
      <div className="mt-6 border-t border-border pt-6">
        <p className="text-sm text-foreground">{plan.limit}</p>
      </div>
      <div className="mt-auto pt-6">
        <Button asChild className="w-full">
          <a href={siteConfig.appUrl}>
            {plan.cta} <span aria-hidden>→</span>
          </a>
        </Button>
      </div>
    </article>
  );
}
