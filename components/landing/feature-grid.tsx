import Link from 'next/link';

export type GridCard = {
  title: string;
  description: string;
  href?: string;
};

type FeatureGridProps = {
  items: readonly GridCard[];
  columns?: 2 | 3;
};

export function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  const gridClass = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <section className="mx-auto mt-12 max-w-5xl px-6">
      <ul className={`grid gap-4 ${gridClass}`}>
        {items.map((item) => {
          const content = (
            <>
              <h3 className="text-foreground font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
            </>
          );
          return (
            <li key={item.title}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="border-border/60 hover:border-primary/40 hover:bg-muted/40 block h-full rounded-lg border p-5 transition-colors"
                >
                  {content}
                </Link>
              ) : (
                <div className="border-border/60 h-full rounded-lg border p-5">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
