import { PageHero } from '@/components/landing/page-hero';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { ProseSection } from '@/components/landing/prose-section';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Use cases',
  description:
    'What people actually build on nvoke: webhook handlers, cron jobs, LLM tool endpoints, Stripe webhooks, internal APIs. Real workloads, honest writeups.',
  path: '/use-cases'
});

const USE_CASES = (
  siteConfig.nav.find((n) => n.href === '/use-cases')?.children ?? []
).map((c) => ({ title: c.label, description: c.description ?? '', href: c.href }));

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Use cases"
        title="What people actually build on nvoke."
        description="nvoke is not a replacement for a backend — it is a place to host the small, sharp pieces of code that do not belong in one. Here are the workloads we see most often."
        secondaryCta={{ label: 'See features', href: '/features' }}
      />

      <FeatureGrid items={USE_CASES} />

      <ProseSection title="The shape of a good nvoke workload">
        <p>
          The workloads that feel best on nvoke share a few properties. They are{' '}
          <strong>small</strong>: a few dozen lines of code, not a few thousand. They are{' '}
          <strong>stateless</strong>: the function does its job, returns, and is done — any state
          lives in a database or an upstream API. They are <strong>bursty</strong>: a webhook that
          fires unpredictably, a cron job that runs once an hour, an LLM agent that calls a tool
          when it decides to.
        </p>
        <p>
          If your workload needs a long-running process, a WebSocket server, or tens of gigabytes
          of memory, nvoke is the wrong tool. For the 80% of code that is just small glue between
          services, it is usually the right one.
        </p>
      </ProseSection>

      <CTA
        title="Pick a use case and ship it."
        description="Every use case below links to a writeup with a working example. Copy, adapt, deploy."
      />
    </>
  );
}
