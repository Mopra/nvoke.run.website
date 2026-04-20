import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Scheduled functions',
  description:
    'Run a Node.js function on a cron schedule. Pick a cadence, write the code, nvoke calls it on time. No EC2, no GitHub Actions cron trick.',
  path: '/features/scheduled-functions'
});

const EXAMPLE = `// schedule: */15 * * * *  (every 15 minutes)
export default async function () {
  const res = await fetch("https://api.example.com/health");
  if (!res.ok) await notifySlack("Upstream is down");
  return { ok: res.ok, status: res.status };
}`;

const FACTS = [
  {
    title: 'Standard cron syntax',
    description:
      'Five-field cron expressions. "0 * * * *" for hourly, "0 9 * * 1" for Monday mornings. Timezone is UTC by default and can be set per function.'
  },
  {
    title: 'At-most-once per tick',
    description:
      'If a run is still executing when the next tick comes due, nvoke skips it. Overlapping runs are a common footgun we decided not to ship.'
  },
  {
    title: 'Replay and backfill',
    description:
      'Every scheduled run shows up in the logs like any other invocation. Re-run a past execution with a single click to backfill.'
  }
];

export default function ScheduledFunctionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Feature"
        title="Cron jobs without a server."
        description="Add a schedule to any function and nvoke will call it on time. Same editor, same logs, same API as your HTTP endpoints — just with a cron expression attached."
        secondaryCta={{ label: 'All features', href: '/features' }}
      />

      <CodeBlock
        code={EXAMPLE}
        caption="Run this every 15 minutes. Set the schedule in the sidebar."
      />

      <ProseSection title="Scheduled runs, unified with HTTP">
        <p>
          A scheduled function on nvoke is the same thing as an HTTP endpoint — the only
          difference is that the platform calls it on a cron expression instead of a client.
          That means you can test a scheduled function by hitting its URL directly, and you can
          promote a manual endpoint to a scheduled one without rewriting anything.
        </p>
        <p>
          The scheduler is implemented on top of a monotonic tick. If you set a schedule of{' '}
          <strong>*/5 * * * *</strong>, nvoke will fire at 00, 05, 10, and so on — not five
          minutes after deploy. This matters when you are backfilling data or coordinating
          scheduled jobs across multiple functions.
        </p>
      </ProseSection>

      <ProseSection title="What scheduled functions are good for">
        <p>
          The obvious cases: polling an upstream API for changes, generating daily reports,
          warming caches, triggering digest emails, rolling encryption keys, reconciling
          accounting data. The shared property is that you need code to run on time, but you do
          not want to run a server to host it.
        </p>
        <p>
          If you are currently using a GitHub Actions <strong>schedule</strong> trigger as a poor
          man&apos;s cron, a scheduled nvoke function is the right move. Actions schedules are
          best-effort and often run many minutes late; nvoke fires on the tick.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Schedule your first job."
        description="Paste a function. Pick a cadence. nvoke takes it from there."
      />
    </>
  );
}
