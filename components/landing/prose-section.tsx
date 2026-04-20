import type { ReactNode } from 'react';

type ProseSectionProps = {
  title?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
};

export function ProseSection({ title, eyebrow, children }: ProseSectionProps) {
  return (
    <section className="mx-auto mt-16 max-w-3xl px-6">
      {eyebrow ? (
        <p className="text-primary mb-2 font-mono text-xs tracking-wide uppercase">{eyebrow}</p>
      ) : null}
      {title ? (
        <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      ) : null}
      <div className="text-muted-foreground mt-4 space-y-4 text-base leading-relaxed [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-foreground [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}
