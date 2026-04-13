import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms',
  description: 'Terms of service for nvoke.',
  path: '/terms'
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">Terms</h1>
      <p className="mt-6 rounded-md border border-primary/30 bg-primary/5 p-4 font-mono text-sm text-primary">
        TODO: replace this page with real terms of service text before launch.
      </p>
      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>
          By using nvoke you agree to run reasonable code within the execution limits on your plan.
          We reserve the right to throttle, block, or remove functions that abuse the runner or
          violate the acceptable-use policy.
        </p>
      </div>
    </article>
  );
}
