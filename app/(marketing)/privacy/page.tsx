import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy',
  description: 'Privacy policy for nvoke.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-foreground text-4xl font-semibold tracking-tight">Privacy</h1>
      <p className="border-primary/30 bg-primary/5 text-primary mt-6 rounded-md border p-4 font-mono text-sm">
        TODO: replace this page with real privacy policy text before launch.
      </p>
      <div className="text-muted-foreground mt-8 space-y-4">
        <p>
          nvoke collects the minimum information needed to run your functions and bill you for
          executions. We do not run third-party analytics on this marketing site.
        </p>
        <p>
          The full privacy policy will cover: what data the app stores, how long it is kept, who can
          access it, and your rights to export or delete it.
        </p>
      </div>
    </article>
  );
}
