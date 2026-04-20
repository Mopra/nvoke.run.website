import { PageHero } from '@/components/landing/page-hero';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { ProseSection } from '@/components/landing/prose-section';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Features',
  description:
    'nvoke is a small set of sharp tools: HTTP endpoints, scheduled runs, secrets, logs, a browser editor. Every feature is on every plan.',
  path: '/features'
});

const FEATURES = (
  siteConfig.nav.find((n) => n.href === '/features')?.children ?? []
).map((c) => ({ title: c.label, description: c.description ?? '', href: c.href }));

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything you need. Nothing you don't."
        description="nvoke is a small, opinionated set of primitives for running Node.js functions on the public internet. No dashboards to tour, no abstractions to learn. Each feature below is available on every plan."
        secondaryCta={{ label: 'See pricing', href: '/pricing' }}
      />

      <FeatureGrid items={FEATURES} />

      <ProseSection title="Why we kept it small">
        <p>
          Most function platforms pile on features until the core job — run my code when something
          calls this URL — gets buried under queues, triggers, workflows, and YAML. nvoke does the
          core job and a few things that naturally sit next to it: scheduling, secrets, logs.
        </p>
        <p>
          When you write a function on nvoke, you are writing a normal Node.js module. No
          handlers, no event shapes, no provider-specific SDKs. If you know how to write{' '}
          <strong>async function (req)</strong>, you know the API.
        </p>
      </ProseSection>

      <CTA
        title="Try any feature on the free plan."
        description="Every plan includes every feature. The only difference is how many executions you get."
      />
    </>
  );
}
