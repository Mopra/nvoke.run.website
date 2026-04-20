import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Logs',
  description:
    'Every invocation is captured: request, response, duration, console output. Live tail, searchable history, replay past runs.',
  path: '/features/logs'
});

const EXAMPLE = `export default async function (req) {
  console.log("received", { body: req.body });
  const result = await process(req.body);
  console.log("done", { ms: result.ms });
  return result;
}`;

const FACTS = [
  {
    title: 'Live tail',
    description:
      'Open the log panel next to the editor and watch invocations stream in as they happen. Great for debugging a webhook that is firing right now.'
  },
  {
    title: 'Searchable history',
    description:
      'Filter by status, duration, or log text. Jump to any past invocation and see the full request and response body.'
  },
  {
    title: 'One-click replay',
    description:
      'Click a past invocation and rerun it with the same input. Indispensable for reproducing a bug you already have a log of.'
  }
];

export default function LogsPage() {
  return (
    <>
      <PageHero
        eyebrow="Feature"
        title="Every invocation, captured."
        description="Request body, response body, duration, console output, errors. All of it, for every run, searchable in the dashboard. No log drains to configure."
        secondaryCta={{ label: 'All features', href: '/features' }}
      />

      <CodeBlock code={EXAMPLE} caption="console.log works. So does console.error." />

      <ProseSection title="What we capture">
        <p>
          For every invocation, nvoke records the HTTP method and path, the request headers (with
          sensitive values redacted), the request body, the response status and body, the total
          duration, and everything the function wrote to <strong>stdout</strong> or{' '}
          <strong>stderr</strong>. Errors include the stack trace with source-mapped line numbers.
        </p>
        <p>
          Log retention is 7 days on Free, 30 days on Nano, 90 days on Scale. Exceeding retention
          is fine — older logs simply roll off. If you need indefinite archival, point a cron
          function at the logs API and write them wherever you want.
        </p>
      </ProseSection>

      <ProseSection title="Live tail and replay">
        <p>
          The editor view has an inline log stream. Hit save, then hit your endpoint, and the new
          invocation appears in the stream within a second. This is the fastest feedback loop we
          could build for &quot;did my function just work?&quot;
        </p>
        <p>
          Every captured invocation can be replayed from the dashboard. Replaying reruns the
          function with the same request body and returns the new response — useful for verifying
          a fix against production traffic without waiting for the next real call.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="See what your functions are doing."
        description="No log drain setup. No forwarding to Datadog. Just open the dashboard."
      />
    </>
  );
}
