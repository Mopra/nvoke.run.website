import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Secrets and environment variables',
  description:
    'Encrypted env vars, scoped per function. Rotate without redeploying. Read them the way you already do — process.env.',
  path: '/features/secrets'
});

const EXAMPLE = `export default async function (req) {
  const res = await fetch("https://api.stripe.com/v1/charges", {
    headers: { Authorization: \`Bearer \${process.env.STRIPE_SECRET_KEY}\` }
  });
  return res.json();
}`;

const FACTS = [
  {
    title: 'Encrypted at rest',
    description:
      'Secrets are stored encrypted. Values are decrypted only on the worker that runs the function, and only for the duration of the invocation.'
  },
  {
    title: 'Scoped per function',
    description:
      'A secret belongs to one function. Sharing a Stripe key between two functions means adding it to both — intentionally.'
  },
  {
    title: 'Rotate without deploy',
    description:
      'Update a secret value and the next invocation picks it up. No redeploy, no cache bust, no downtime.'
  }
];

export default function SecretsPage() {
  return (
    <>
      <PageHero
        eyebrow="Feature"
        title="Secrets done the boring, correct way."
        description="Encrypted env vars, one dialog to set, process.env to read. No KMS integration, no vault to learn, no plaintext in your repo."
        secondaryCta={{ label: 'All features', href: '/features' }}
      />

      <CodeBlock code={EXAMPLE} caption="Read a secret the same way you would in any Node.js app." />

      <ProseSection title="How secrets work">
        <p>
          Open a function, click Secrets, paste a name and value. The value is encrypted with a
          per-account key and stored in the database. On invocation, the worker that runs the
          function decrypts it into an environment variable that lives for the length of the
          request. It never appears in logs, never in build output, never in Git.
        </p>
        <p>
          We intentionally do <strong>not</strong> support shared secret stores or cross-function
          inheritance. Every function declares what it needs. If that is annoying for one of your
          workflows, let us know — we would rather hear the use case than default to magic.
        </p>
      </ProseSection>

      <ProseSection title="Rotation and audit">
        <p>
          You can rotate a secret any time by editing it in the dashboard. The next invocation
          picks up the new value; there is no redeploy. The dashboard also shows the last time a
          secret was read, so you can see which functions are still live-dependent on a value
          before you rotate it.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Paste a key. Ship."
        description="Stop worrying about where secrets live. nvoke handles the boring part."
      />
    </>
  );
}
