import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { ComparisonTable } from '@/components/landing/comparison-table';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'nvoke vs Cloudflare Workers',
  description:
    'Cloudflare Workers are fast at the edge but run in a V8 isolate, not Node.js. nvoke runs real Node.js with npm. Honest side-by-side.',
  path: '/alternatives/cloudflare-workers'
});

const ROWS = [
  {
    criterion: 'Runtime',
    nvoke: 'Node.js 20+ with the full npm ecosystem.',
    other: 'V8 isolate. Workers runtime supports a subset of Node APIs in compat mode.'
  },
  {
    criterion: 'npm compatibility',
    nvoke: 'Any package. If it runs in Node, it runs on nvoke.',
    other: 'Many packages work; some (native deps, filesystem) do not.'
  },
  {
    criterion: 'Latency profile',
    nvoke: 'Regional. Single location, ~100ms warm.',
    other: 'Edge. Runs near the user in hundreds of POPs, <50ms globally.'
  },
  {
    criterion: 'Editor',
    nvoke: 'Monaco in the browser. No local setup.',
    other: 'wrangler CLI + local editor. Dashboard editor exists but limited.'
  },
  {
    criterion: 'Pricing',
    nvoke: 'Flat plan with execution ceiling.',
    other: 'Per-request, with a generous free tier.'
  },
  {
    criterion: 'Best for',
    nvoke: 'Node.js-compatible code. Webhooks, cron, LLM tools.',
    other: 'Edge-latency-sensitive workloads. CDN-adjacent logic.'
  }
];

export default function CloudflareComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Alternative"
        title="nvoke vs Cloudflare Workers."
        description="Cloudflare Workers are brilliant at what they do — run very fast, at the edge, in a V8 isolate. The tradeoff is that they are not Node.js. If you want to write ordinary Node code and use ordinary npm packages, nvoke is the simpler choice."
        secondaryCta={{ label: 'All alternatives', href: '/alternatives' }}
      />

      <ComparisonTable otherLabel="Cloudflare Workers" rows={ROWS} />

      <ProseSection title="The runtime question">
        <p>
          Cloudflare Workers run in V8 isolates, not Node.js. That is a deliberate design
          choice — isolates start in under a millisecond and use much less memory per request
          than a Node process — and it is genuinely impressive engineering. The cost of that
          choice is compatibility: the Workers runtime is a subset of Node, and many npm
          packages either do not work or require a compat shim.
        </p>
        <p>
          Cloudflare&apos;s Node.js compatibility mode has improved dramatically and many popular
          libraries work. But if your function uses native modules, relies on filesystem
          semantics, or imports from a package that has not been tested against the Workers
          runtime, you will find out at deploy time.
        </p>
        <p>
          nvoke runs stock Node.js 20+. Anything on npm that works in Node works on nvoke. If a
          package installs, it runs.
        </p>
      </ProseSection>

      <ProseSection title="When the edge matters">
        <p>
          For some workloads, edge latency is the product. A personalized redirect based on
          geography, a fast header rewrite for a CDN-cached asset, an A/B test selector — these
          benefit from running near the user. Cloudflare Workers are the right tool for that.
        </p>
        <p>
          nvoke runs functions in a single region. Most workloads do not care: a Stripe webhook
          does not need to be 20ms closer to Stripe&apos;s servers, and an LLM tool is gated on
          the model call, not the function. If your workload is not edge-sensitive, you are
          paying a compatibility tax for no benefit.
        </p>
      </ProseSection>

      <ProseSection title="DX and iteration speed">
        <p>
          Cloudflare Workers ship with <strong>wrangler</strong>, a capable CLI. Local
          development is decent; production deploys are fast. The dashboard has an editor, but
          it is more limited than nvoke&apos;s Monaco setup and the full experience assumes you
          are using wrangler from a local terminal.
        </p>
        <p>
          nvoke goes the other direction: the browser is the primary editor. Both approaches
          are valid. Pick whichever matches how you like to work.
        </p>
      </ProseSection>

      <CTA
        title="Write Node.js. Host it on nvoke."
        description="If edge latency is not the point and you just want your npm packages to work, nvoke is the shorter path."
      />
    </>
  );
}
