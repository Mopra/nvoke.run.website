import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { ComparisonTable } from '@/components/landing/comparison-table';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'nvoke vs Deno Deploy',
  description:
    'Deno Deploy is a sharp edge platform for Deno code. nvoke is for teams that want Node.js and npm, not Deno. Real comparison of both.',
  path: '/alternatives/deno-deploy'
});

const ROWS = [
  {
    criterion: 'Runtime',
    nvoke: 'Node.js 20+. Import from npm normally.',
    other: 'Deno. URL imports, partial npm compat via npm: specifier.'
  },
  {
    criterion: 'Package ecosystem',
    nvoke: 'Every npm package, every day.',
    other: 'Deno stdlib + JSR + npm compat. Broad, but not identical.'
  },
  {
    criterion: 'Where code runs',
    nvoke: 'Single region. Typical warm invocation ~100ms.',
    other: 'Edge. Runs in many regions, low global latency.'
  },
  {
    criterion: 'Project model',
    nvoke: 'Each function is its own unit. No "project" required.',
    other: 'Projects link to a git repo; deploy per push.'
  },
  {
    criterion: 'Editor',
    nvoke: 'Monaco in the browser.',
    other: 'Local editor + git push. Playground for experimentation.'
  },
  {
    criterion: 'Best for',
    nvoke: 'Node.js teams. Webhooks, cron, LLM tools.',
    other: 'Teams building on Deno. Edge-latency-sensitive workloads.'
  }
];

export default function DenoDeployComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Alternative"
        title="nvoke vs Deno Deploy."
        description="Deno Deploy is the natural home for Deno code: same runtime, same conventions, deployed at the edge. nvoke is the natural home for Node.js code. Which one is right for you depends mostly on which runtime you already use."
        secondaryCta={{ label: 'All alternatives', href: '/alternatives' }}
      />

      <ComparisonTable otherLabel="Deno Deploy" rows={ROWS} />

      <ProseSection title="Runtime is the real question">
        <p>
          Deno is a strong runtime with modern defaults: TypeScript out of the box, web-standard
          APIs, sensible permission model, a standard library that actually ships as a
          coherent unit. Deno Deploy is a natural extension of that — if you are writing Deno,
          deploying on Deno Deploy is the path of least resistance.
        </p>
        <p>
          Most production Node.js code is not Deno. npm packages that assume Node-specific
          behavior, native modules, frameworks tied to Node internals — all of those force you
          to evaluate compatibility before picking Deno as a target. nvoke skips that evaluation
          by running stock Node.js.
        </p>
      </ProseSection>

      <ProseSection title="Project shape">
        <p>
          Deno Deploy projects link to a git repo. Every push redeploys. That is a great
          workflow if your functions live in a repo with other things, or if you want change
          review before deploy. It is slower if your function is a throwaway webhook you want
          to change in thirty seconds.
        </p>
        <p>
          nvoke treats each function as its own unit. No git required. Edit, save, live. If
          you want git integration, you can use the nvoke API from CI, but it is not the
          default path.
        </p>
      </ProseSection>

      <ProseSection title="Edge versus region">
        <p>
          Deno Deploy runs at the edge. For workloads where latency to the user matters — a
          personalized redirect, a CDN-adjacent header rewrite — that is a real advantage.
          nvoke runs in a single region. For webhooks, cron jobs, and LLM tools, the edge is
          not the bottleneck.
        </p>
      </ProseSection>

      <CTA
        title="If you write Node.js, pick nvoke."
        description="If you write Deno, pick Deno Deploy. Both are good tools; the right one is the one that matches your runtime."
      />
    </>
  );
}
