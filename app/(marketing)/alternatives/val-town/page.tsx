import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { ComparisonTable } from '@/components/landing/comparison-table';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'nvoke vs Val.town',
  description:
    'Val.town pioneered the "write code in the browser, get a URL" category. nvoke is the same idea, aimed at production Node.js workloads.',
  path: '/alternatives/val-town'
});

const ROWS = [
  {
    criterion: 'Shape of the idea',
    nvoke: 'Node.js functions with HTTPS URLs.',
    other: 'TypeScript vals with HTTPS URLs.'
  },
  {
    criterion: 'Runtime',
    nvoke: 'Node.js 20+ with full npm.',
    other: 'Deno. npm packages via Deno compat; varying support.'
  },
  {
    criterion: 'Community and discovery',
    nvoke: 'Private by default. Your functions are yours.',
    other: 'Public vals are browsable and forkable. Strong community ethos.'
  },
  {
    criterion: 'Positioning',
    nvoke: 'Production endpoints. Webhooks, cron, LLM tools.',
    other: 'Scripts, experiments, shared utilities. Broader range.'
  },
  {
    criterion: 'Best for',
    nvoke: 'A small function you want to treat like production infrastructure.',
    other: 'Quick scripts, social coding, exploration, personal automation.'
  }
];

export default function ValTownComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Alternative"
        title="nvoke vs Val.town."
        description="Val.town pioneered the category: write code in your browser, get a URL, share it. We love Val.town. nvoke is a neighboring idea positioned closer to production Node.js workloads."
        secondaryCta={{ label: 'All alternatives', href: '/alternatives' }}
      />

      <ComparisonTable otherLabel="Val.town" rows={ROWS} />

      <ProseSection title="Two different flavors of the same good idea">
        <p>
          Val.town and nvoke share a core belief: writing a small piece of code and getting a
          URL in thirty seconds is much nicer than the traditional serverless workflow. Where
          they differ is in who the tool is for and what kind of code it is optimized to host.
        </p>
        <p>
          Val.town leans into community and exploration: vals are easy to share, easy to fork,
          and the platform rewards making your work public. The runtime is Deno, which gives
          modern defaults (TypeScript, web-standard APIs) at the cost of npm compatibility.
        </p>
        <p>
          nvoke leans into production workloads. Your functions are private by default. The
          runtime is plain Node.js with unrestricted npm, the editor is Monaco, and the feature
          set (secrets rotation, log retention, scheduled runs, API key auth) is aimed at code
          that has to keep working without you watching it.
        </p>
      </ProseSection>

      <ProseSection title="When Val.town is the better pick">
        <p>
          If you want to share a utility with the community, fork someone else&apos;s work,
          build a quick script for personal use, or explore the social-coding aspect of the
          platform, Val.town is the right tool. The community is strong and the platform
          genuinely supports that workflow.
        </p>
      </ProseSection>

      <ProseSection title="When nvoke is the better pick">
        <p>
          If you are hosting a Stripe webhook for a customer-facing product, running a cron job
          that bills people, or giving an LLM agent a tool it calls on behalf of users, you
          probably want the code to be private and the runtime to be Node.js. That is nvoke.
        </p>
      </ProseSection>

      <CTA
        title="Try both. They coexist."
        description="There is no rule against using Val.town for exploration and nvoke for production. Many people do."
      />
    </>
  );
}
