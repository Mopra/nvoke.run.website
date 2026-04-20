import { PageHero } from '@/components/landing/page-hero';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';
import { getChangelog, groupByDate } from '@/lib/changelog';

export const metadata = buildMetadata({
  title: 'Changelog',
  description:
    'Every user-facing change shipped to nvoke, pulled directly from the product repo. Newest first.',
  path: '/changelog'
});

export const revalidate = 3600;

const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export default async function ChangelogPage() {
  const entries = await getChangelog();
  const groups = Array.from(groupByDate(entries).entries()).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="Everything we have shipped."
        description="Every user-facing change, pulled automatically from the nvoke product repository. Grouped by day, newest first. No marketing spin — just the commits."
        secondaryCta={{ label: 'Read the blog', href: '/blog' }}
      />

      {groups.length === 0 ? (
        <section className="mx-auto mt-12 max-w-3xl px-6">
          <p className="text-muted-foreground text-sm">
            Changelog is temporarily unavailable. Try again in a minute.
          </p>
        </section>
      ) : (
        <section className="mx-auto mt-12 max-w-3xl px-6">
          <ol className="border-border/40 relative border-l">
            {groups.map(([day, dayEntries]) => (
              <li key={day} className="mb-10 ml-6">
                <span className="bg-primary/70 border-background absolute -left-[5px] mt-2 block size-2.5 rounded-full border-2" />
                <time className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                  {DATE_FMT.format(new Date(day))}
                </time>
                <ul className="mt-2 space-y-2">
                  {dayEntries.map((entry) => (
                    <li
                      key={entry.sha}
                      className="text-muted-foreground flex items-start gap-3 leading-relaxed"
                    >
                      <span
                        className={
                          entry.type === 'feat'
                            ? 'border-primary/30 bg-primary/5 text-primary mt-[3px] inline-flex shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase'
                            : 'border-border/60 bg-muted/40 text-foreground mt-[3px] inline-flex shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase'
                        }
                      >
                        {entry.type}
                      </span>
                      <span className="min-w-0 flex-1">
                        {entry.scope ? (
                          <span className="text-foreground font-mono text-xs">
                            {entry.scope}:{' '}
                          </span>
                        ) : null}
                        <span className="text-foreground">{entry.subject}</span>{' '}
                        <a
                          href={entry.url}
                          className="text-muted-foreground hover:text-foreground ml-1 font-mono text-xs underline underline-offset-4"
                        >
                          {entry.shortSha}
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      )}

      <CTA
        title="Want the long version?"
        description="The blog has writeups for the bigger releases. The changelog above is the raw, dated stream of user-facing changes."
        secondaryLabel="Read the blog"
        secondaryHref="/blog"
      />
    </>
  );
}
