import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Cron jobs',
  description:
    'Run a Node.js function on a schedule. Cron expressions, captured logs, no server, no GitHub Actions cron trick.',
  path: '/use-cases/cron-jobs'
});

const EXAMPLE = `// schedule: 0 9 * * 1   (Mondays at 09:00 UTC)
export default async function () {
  const rows = await db.query(
    "select count(*) from signups where created_at > now() - interval '7 days'"
  );
  await sendEmail({
    to: "team@example.com",
    subject: "Weekly signups",
    body: \`\${rows[0].count} new signups this week.\`
  });
  return { ok: true };
}`;

const FACTS = [
  {
    title: 'Standard cron syntax',
    description:
      'Five-field expressions. Timezones supported per function. The scheduler fires on the tick, not whenever the platform gets around to it.'
  },
  {
    title: 'Same editor, same logs',
    description:
      'Scheduled functions live next to your HTTP ones. Invoke them manually to test, replay past runs from the logs panel.'
  },
  {
    title: 'No overlapping runs',
    description:
      'If a previous run is still executing when the next tick comes due, nvoke skips the tick. No duplicate emails, no concurrent database writes.'
  }
];

export default function CronJobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Use case"
        title="Cron jobs, honest ones."
        description="You have a task that needs to run every hour, every Monday, or at 3 AM on the first of the month. nvoke gives you a real scheduler — not a best-effort GitHub Actions schedule or a cron tab on a VPS you forget to patch."
        secondaryCta={{ label: 'More use cases', href: '/use-cases' }}
      />

      <CodeBlock code={EXAMPLE} caption="A weekly report job, running on a cron." />

      <ProseSection title="The usual suspects">
        <p>
          The workloads we see most often as scheduled functions: daily digest emails, weekly
          team reports, nightly data reconciliation, polling an upstream API for changes, rolling
          keys or tokens, warming caches, dispatching reminder notifications, backing up one
          system to another. The shared property is that it has to happen on time, but it does
          not have to run continuously.
        </p>
      </ProseSection>

      <ProseSection title="Why not just use GitHub Actions?">
        <p>
          You can, and for very simple tasks it is fine. But the Actions scheduler is
          best-effort: your 5-minute cron will often be 10-30 minutes late during high platform
          load. You also pay for the full job runner startup (usually 20+ seconds) every tick,
          which gets expensive if you are polling frequently.
        </p>
        <p>
          nvoke fires scheduled functions with sub-second latency off the tick, and a scheduled
          invocation costs the same as an HTTP one. If your cron needs to be on time — for
          billing, for SLA compliance, for anything where late is a bug — use a real scheduler.
        </p>
      </ProseSection>

      <ProseSection title="Designing idempotent jobs">
        <p>
          Any cron job will eventually run twice in a row for the same window. Either you deploy
          during a tick, or the platform retries, or someone manually replays a past invocation.
          Write the job so running it twice produces the same end state as running it once: use
          <strong> upsert</strong> instead of <strong>insert</strong>, track &quot;last processed
          up to&quot; timestamps, tag outgoing notifications with a dedupe key.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Schedule your first job."
        description="Write the function. Pick a cadence. nvoke takes it from there."
      />
    </>
  );
}
