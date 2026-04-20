import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Internal APIs',
  description:
    'Small endpoints for your own tools. Build dashboards, Slack bots, and CLIs that hit a single nvoke function instead of spinning up a service.',
  path: '/use-cases/internal-apis'
});

const EXAMPLE = `// Internal endpoint for the on-call dashboard
export default async function (req) {
  const { team } = req.body;
  const rows = await db.query(
    "select name, pager from users where team = $1 and on_call_until > now()",
    [team]
  );
  return { team, on_call: rows };
}`;

const FACTS = [
  {
    title: 'One function per endpoint',
    description:
      'No router, no framework. The URL path is the function name. Refactoring is dragging and dropping code into a new function.'
  },
  {
    title: 'API keys you can share',
    description:
      'Generate a key for your internal tool, paste it into the tool, rotate when someone leaves. No IAM console to navigate.'
  },
  {
    title: 'The fastest path from idea to URL',
    description:
      'Need an endpoint for a new internal tool? Write the function, hit save, paste the URL into your consumer. Five minutes, start to finish.'
  }
];

export default function InternalApisPage() {
  return (
    <>
      <PageHero
        eyebrow="Use case"
        title="Small endpoints for your own tools."
        description="Not every endpoint needs to live in your main backend. Internal dashboards, admin tools, Slack slash commands, one-off CLI helpers — these are the endpoints that slow a monolith down. Host them on nvoke instead."
        secondaryCta={{ label: 'More use cases', href: '/use-cases' }}
      />

      <CodeBlock code={EXAMPLE} caption="An internal endpoint for a team on-call dashboard." />

      <ProseSection title="The endpoint-shaped work">
        <p>
          Most internal tools are a UI talking to a small number of custom endpoints. The UI
          lives in a Notion embed, a Retool app, a Slack bot, or a CLI someone on the team
          maintains. The endpoints are usually thin: query a database, do a bit of
          transformation, return JSON. They do not belong in your customer-facing backend
          because they slow down deploys and widen the blast radius of internal bugs.
        </p>
        <p>
          nvoke is built exactly for this. Each endpoint is a function, deployable in seconds,
          with logs you can read when the Slack bot starts acting weird. The URL is stable, so
          the consumer does not break when you refactor the implementation.
        </p>
      </ProseSection>

      <ProseSection title="Connecting to your database">
        <p>
          nvoke functions can reach any public or VPC-peered database. Paste the connection
          string as a secret, import your driver of choice (<strong>pg</strong>,{' '}
          <strong>mysql2</strong>, <strong>@planetscale/database</strong>,{' '}
          <strong>@neondatabase/serverless</strong>), query, return. For serverless databases
          with HTTP-based drivers (Neon, PlanetScale, Turso), the story is particularly clean
          because the driver does not hold long-lived TCP connections.
        </p>
        <p>
          For databases behind a private network, nvoke supports outbound egress through a
          static IP on the Scale plan. Whitelist that IP on your database and you are done.
        </p>
      </ProseSection>

      <ProseSection title="When to graduate off nvoke">
        <p>
          If an internal endpoint grows into a real service — shared code across many functions,
          complex state, sustained throughput — it is probably time to fold it into your main
          backend. nvoke is for the small stuff. We will never tell you that an abstraction
          sitting at two hundred lines is the same as one sitting at ten thousand.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Build your internal tool today."
        description="Ship the endpoints on nvoke. Ship the UI wherever you want. Done in an afternoon."
      />
    </>
  );
}
