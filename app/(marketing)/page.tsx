import { Hero } from '@/components/home/hero';
import { CodePanel } from '@/components/home/code-panel';
import { Bullets } from '@/components/home/bullets';
import { Closer } from '@/components/home/closer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />
      <CodePanel />
      <Bullets />
      <Closer />
    </>
  );
}
