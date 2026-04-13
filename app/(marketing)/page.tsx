import { Hero } from '@/components/home/hero';
import { CodePanel } from '@/components/home/code-panel';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />
      <CodePanel />
    </>
  );
}
