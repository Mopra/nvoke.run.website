import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 sm:pt-28">
      <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
        Developer tool
      </p>
      <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
        Write a function. Invoke it.
        <br />
        <span className="text-muted-foreground">That is the whole tool.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
        nvoke runs small Node.js functions with a real HTTP endpoint. No YAML, no cold-start
        rituals, no dashboard tour.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <a href={siteConfig.appUrl}>
            Open app <span aria-hidden>→</span>
          </a>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/blog">Read the blog</Link>
        </Button>
      </div>
    </section>
  );
}
