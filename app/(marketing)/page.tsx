import { Hero } from '@/components/home/hero';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
