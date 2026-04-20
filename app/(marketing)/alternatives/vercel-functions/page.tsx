import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { ComparisonTable } from '@/components/landing/comparison-table';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'nvoke vs Vercel Functions',
  description:
    'Vercel Functions are great if you already have a Next.js app. nvoke is for the functions that do not. Honest comparison, side by side.',
  path: '/alternatives/vercel-functions'
});

const ROWS = [
  {
    criterion: 'Primary use case',
    nvoke: 'Standalone Node.js functions with their own URLs.',
    other: 'API routes embedded in a Next.js (or framework) app.'
  },
  {
    criterion: 'Project setup',
    nvoke: 'None. Open the editor, write a function, save.',
    other: 'git repo + Vercel project + framework setup. ~10 minutes.'
  },
  {
    criterion: 'Deploy',
    nvoke: 'Save in the browser. Live in under a second.',
    other: 'git push, wait for build (~30–90 seconds), then live.'
  },
  {
    criterion: 'Runtime',
    nvoke: 'Node.js 20+.',
    other: 'Node.js or Edge runtime (V8 isolates).'
  },
  {
    criterion: 'Pricing model',
    nvoke: 'Flat plan, per-month execution ceilings.',
    other: 'Compute-time billing + bandwidth + build minutes.'
  },
  {
    criterion: 'Best for',
    nvoke: 'Webhooks, cron jobs, LLM tools, internal APIs.',
    other: 'Full-stack web apps where frontend and backend ship together.'
  }
];

export default function VercelComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Alternative"
        title="nvoke vs Vercel Functions."
        description="Vercel Functions are excellent if you already have a Next.js app. For the endpoints that are not part of a Next.js app — webhooks, cron jobs, LLM tools — they are more infrastructure than you need."
        secondaryCta={{ label: 'All alternatives', href: '/alternatives' }}
      />

      <ComparisonTable otherLabel="Vercel Functions" rows={ROWS} />

      <ProseSection title="What Vercel gets right">
        <p>
          Vercel Functions are the best-in-class story for full-stack web apps. If you are
          building a customer-facing product with Next.js, you should almost certainly deploy on
          Vercel and put your API in <strong>app/api/</strong>. The DX is tight, the framework
          integration is deep, and the edge runtime is genuinely fast.
        </p>
        <p>
          For the workloads Vercel is optimizing for — a product with a frontend and a backend
          that ship together — there is nothing wrong with what they offer. Nothing on this page
          is arguing otherwise.
        </p>
      </ProseSection>

      <ProseSection title="Where nvoke fits instead">
        <p>
          The gap Vercel does not fill is the endpoint that does not belong in your app. A
          Stripe webhook handler does not belong in your marketing site&apos;s Next.js app — it
          will redeploy every time you ship a typo fix in the hero copy. A weekly report cron
          job does not belong in your product backend — it does not need to be next to your
          login route.
        </p>
        <p>
          nvoke is the place for those. Each function is its own unit of deployment. Editing the
          webhook handler does not redeploy your marketing site. Editing the cron does not
          redeploy your product. The functions live where they logically belong: off to the
          side, independently versioned.
        </p>
      </ProseSection>

      <ProseSection title="When to pick Vercel">
        <p>
          Pick Vercel when your functions are part of a web app — when the frontend and the API
          make sense in the same repo, deploy together, share types, and reference each other.
          Pick nvoke when the function stands alone. Both can absolutely live in the same
          architecture.
        </p>
      </ProseSection>

      <CTA
        title="Try nvoke on the free plan."
        description="You do not have to leave Vercel. Host the functions that stand alone on nvoke; keep the rest where they are."
      />
    </>
  );
}
