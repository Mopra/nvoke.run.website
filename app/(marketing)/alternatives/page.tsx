import { PageHero } from '@/components/landing/page-hero';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { ProseSection } from '@/components/landing/prose-section';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Alternatives',
  description:
    'How nvoke compares to Vercel Functions, AWS Lambda, Cloudflare Workers, Val.town, and Deno Deploy. Honest writeups, no punches pulled.',
  path: '/alternatives'
});

const ALTS = (siteConfig.nav.find((n) => n.href === '/alternatives')?.children ?? []).map(
  (c) => ({ title: c.label, description: c.description ?? '', href: c.href })
);

export default function AlternativesPage() {
  return (
    <>
      <PageHero
        eyebrow="Alternatives"
        title="nvoke vs. the usual suspects."
        description="The serverless-functions category is crowded and mostly good. These writeups explain where nvoke fits — and, honestly, where it does not."
        secondaryCta={{ label: 'See features', href: '/features' }}
      />

      <FeatureGrid items={ALTS} />

      <ProseSection title="A note on &quot;alternatives&quot; pages">
        <p>
          Every category-leader has an alternatives page that pretends they are the obvious
          winner on every axis. We are not going to do that. The platforms below are all good at
          what they do. If you need something nvoke does not support — Python runtimes, edge
          deployment across 300 POPs, fine-grained IAM on every resource — go use the tool that
          does it.
        </p>
        <p>
          What nvoke offers is a specific shape: Node.js functions, a real HTTPS URL, secrets,
          logs, scheduling, a browser editor, one price per execution. If that shape fits, the
          comparisons below will show you why we think it fits better than the alternatives.
        </p>
      </ProseSection>

      <CTA
        title="Skeptical? Good."
        description="Read the comparison for whichever platform you would otherwise pick. Then try nvoke on the free plan."
      />
    </>
  );
}
