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
        'border-border bg-card flex flex-col rounded-xl border p-6 transition-colors',
        'hover:border-primary/60'
      )}
    >
      <header>
        <h3 className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
          {plan.name}
        </h3>
        <p className="text-foreground mt-3 text-4xl font-semibold tracking-tight">{plan.price}</p>
        <p className="text-muted-foreground mt-2 text-sm italic">{plan.tagline}</p>
      </header>
      <div className="border-border mt-6 border-t pt-6">
        <p className="text-foreground text-sm">{plan.limit}</p>
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
