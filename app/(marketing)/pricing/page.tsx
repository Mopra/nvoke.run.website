import { PlanCard } from '@/components/pricing/plan-card';
import { PricingFaq } from '@/components/pricing/faq';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pricing',
  description: 'Pay for what you run. Three plans. No feature gating.',
  path: '/pricing'
});

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    tagline: 'For kicking the tires.',
    limit: '100 executions / month',
    cta: 'Start free'
  },
  {
    name: 'Nano',
    price: '$5',
    tagline: 'For a side project that is actually running.',
    limit: '5,000 executions / month',
    cta: 'Choose Nano'
  },
  {
    name: 'Scale',
    price: '$19',
    tagline: 'For something people depend on.',
    limit: '50,000 executions / month',
    cta: 'Choose Scale'
  }
];

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-foreground text-5xl font-semibold tracking-tight">
          Pay for what you run.
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Every plan includes the full product. Only the ceiling changes.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl px-6 text-center">
        <p className="text-muted-foreground text-sm">
          Every plan includes: the editor, real HTTPS endpoints, API keys, 30-second execution
          timeout, 128 MB heap, logs, and whatever we ship next week.
        </p>
      </section>

      <PricingFaq />

      <section className="mx-auto my-24 max-w-3xl px-6 text-center">
        <p className="text-muted-foreground">Start on Free. Upgrade when you hit the ceiling.</p>
        <div className="mt-6">
          <Button asChild size="lg">
            <a href={siteConfig.appUrl}>
              Open app <span aria-hidden>→</span>
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
