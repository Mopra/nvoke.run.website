import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-5xl font-semibold tracking-tight">nvoke</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Route group working. Header, footer, tokens loaded.
      </p>
    </div>
  );
}
