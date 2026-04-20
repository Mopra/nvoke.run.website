import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'HTTP endpoints',
  description:
    'Every nvoke function gets a real HTTPS URL. Send it a POST, get a response. No handlers, no event shapes, no cold-start rituals.',
  path: '/features/http-endpoints'
});

const EXAMPLE = `export default async function (req) {
  const { name = "world" } = req.body;
  return { message: \`Hello, \${name}!\` };
}`;

const FACTS = [
  {
    title: 'HTTPS out of the box',
    description:
      'Every function gets a signed HTTPS URL on nvoke.run. Certificates are managed; there is no listener to configure.'
  },
  {
    title: 'JSON in, JSON out',
    description:
      'Return a plain object and nvoke serializes it. Return a Response if you need custom status codes or headers.'
  },
  {
    title: 'API key auth',
    description:
      'Each function has a rotating API key. Toggle a flag to make the endpoint public for webhooks that cannot attach headers.'
  }
];

export default function HttpEndpointsPage() {
  return (
    <>
      <PageHero
        eyebrow="Feature"
        title="Every function is a real HTTPS URL."
        description="You write one function. nvoke gives you a signed, public HTTPS endpoint for it in seconds. No load balancer, no gateway, no YAML."
        secondaryCta={{ label: 'All features', href: '/features' }}
      />

      <CodeBlock code={EXAMPLE} caption="Write this. POST to your endpoint. Get JSON back." />

      <ProseSection title="How endpoints work on nvoke">
        <p>
          A function in nvoke is a default-exported async function that takes a request and returns
          a value. There is no handler signature to memorize, no framework to import, no SDK to
          install. The platform handles the HTTP layer so you can focus on what the function does.
        </p>
        <p>
          When you save a function, we publish it to a URL like{' '}
          <strong>https://app.nvoke.run/api/invoke/your-function</strong>. The URL is stable — it
          stays the same across deploys, versions, and rollbacks. Put it in a webhook field, a cron
          runner, an LLM tool manifest, or a cURL command.
        </p>
        <p>
          Requests hit a warm Node.js worker pool. Typical time-to-first-byte for a small function
          is under 100 ms. There are no cold starts in the usual sense: workers are kept ready for
          functions that receive traffic, and the first invocation of a rarely-called function
          warms up in roughly a second.
        </p>
      </ProseSection>

      <ProseSection title="Authentication and public endpoints">
        <p>
          By default, every endpoint requires an <strong>x-api-key</strong> header. The key lives
          in the app and is rotated with a single click — old keys keep working for 24 hours so you
          can roll without a window of broken callers.
        </p>
        <p>
          For webhooks that cannot attach custom headers (Stripe, GitHub, Slack), mark the function
          as public. nvoke will still capture the request, but anyone can call it; you are
          expected to verify signatures inside the function body.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Get a URL in 30 seconds."
        description="Sign up, paste a function, hit save. The endpoint is live before the page finishes reloading."
      />
    </>
  );
}
