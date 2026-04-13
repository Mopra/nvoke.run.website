import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'text-foreground font-mono text-base font-semibold tracking-tight',
        'transition-opacity hover:opacity-80',
        className
      )}
    >
      nvoke
    </Link>
  );
}
