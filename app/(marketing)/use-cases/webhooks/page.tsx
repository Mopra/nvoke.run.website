import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Webhooks',
  description:
    'Host a webhook handler in minutes. A single Node.js function, a real HTTPS URL, verified signatures, captured logs. No server, no framework.',
  path: '/use-cases/webhooks'
});

const EXAMPLE = `import crypto from "node:crypto";

export default async function (req) {
  const sig = req.headers["x-hub-signature-256"];
  const expected =
    "sha256=" +
    crypto
      .createHmac("sha256", process.env.WEBHOOK_SECRET)
      .update(req.rawBody)
      .digest("hex");

  if (sig !== expected) return new Response("bad sig", { status: 401 });

  const event = req.body;
  if (event.action === "opened") {
    await notifySlack(\`New issue: \${event.issue.title}\`);
  }
  return { ok: true };
}`;

const FACTS = [
  {
    title: 'Signed body access',
    description:
      'req.rawBody gives you the untouched request bytes. Verify the signature against your webhook secret before trusting anything.'
  },
  {
    title: 'Public endpoints',
    description:
      'Mark the function as public so the sender does not need to attach an API key. Auth is your responsibility and lives in the function.'
  },
  {
    title: 'Retry-friendly logs',
    description:
      'If the sender retries on 5xx, every retry shows up as a separate invocation. Replay any of them to reproduce a failure.'
  }
];

export default function WebhooksPage() {
  return (
    <>
      <PageHero
        eyebrow="Use case"
        title="Webhook handlers, without the server."
        description="Every service you integrate with — Stripe, GitHub, Shopify, Slack, Linear, Zapier — wants an HTTPS URL to POST to. nvoke gives you that URL in seconds, with logs, retries, and a real editor."
        secondaryCta={{ label: 'More use cases', href: '/use-cases' }}
      />

      <CodeBlock code={EXAMPLE} caption="A GitHub webhook handler with signature verification." />

      <ProseSection title="Why webhooks are the best case for nvoke">
        <p>
          A webhook handler is the platonic ideal of a nvoke function. The shape of the work is{' '}
          <em>receive a POST, do something, return quickly</em>. There is no long-running state,
          no user session to track, no view to render. You want the code deployed somewhere with a
          URL you can paste into a webhook field, and you want to see logs when it fires.
        </p>
        <p>
          The alternative is usually running a small Express app on a VPS, a Next.js route on
          Vercel, or a Lambda behind API Gateway. All of those work. All of them also make you
          carry a lot of infrastructure for what is usually fewer than fifty lines of code.
        </p>
      </ProseSection>

      <ProseSection title="Signature verification">
        <p>
          Every serious webhook sender signs the request. Stripe uses HMAC-SHA256 over the body;
          GitHub does the same with a different header; Shopify uses base64 HMAC. The pattern is
          the same: read the signature header, compute an HMAC over the raw body with your
          shared secret, compare with <strong>crypto.timingSafeEqual</strong>.
        </p>
        <p>
          nvoke exposes <strong>req.rawBody</strong> as a Buffer so you can verify without
          worrying about JSON round-trip mutations. The parsed body is on{' '}
          <strong>req.body</strong> as usual.
        </p>
      </ProseSection>

      <ProseSection title="Responding to retries">
        <p>
          Webhook senders retry on non-2xx responses, usually with exponential backoff. That
          means two things for your handler. First: return fast. If you need to do heavy work,
          return 200 immediately and do the work out of band (a scheduled nvoke function polling
          a queue is a fine pattern). Second: be idempotent. The same event may arrive twice, and
          your function should not double-charge a customer or double-send a notification.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Ship a webhook handler today."
        description="Create a function, copy the URL, paste it into the sender's dashboard. Done."
      />
    </>
  );
}
