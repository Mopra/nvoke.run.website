import { cn } from '@/lib/utils';

type Props = {
  type?: 'note' | 'warn';
  children: React.ReactNode;
};

export function Callout({ type = 'note', children }: Props) {
  return (
    <aside
      className={cn(
        'my-6 rounded-md border px-4 py-3 text-sm',
        type === 'note' && 'border-primary/30 bg-primary/5 text-foreground',
        type === 'warn' && 'border-destructive/40 bg-destructive/5 text-foreground'
      )}
    >
      {children}
    </aside>
  );
}
