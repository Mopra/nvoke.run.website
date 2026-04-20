import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Stripe webhooks',
  description:
    'Handle Stripe events with a single nvoke function. Signature verification, event routing, captured logs, replay-on-failure — all in under 50 lines.',
  path: '/use-cases/stripe-webhooks'
});

const EXAMPLE = `import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function (req) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return new Response("bad signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await markOrderPaid(event.data.object);
      break;
    case "customer.subscription.deleted":
      await markSubscriptionCanceled(event.data.object);
      break;
  }

  return { received: true };
}`;

const FACTS = [
  {
    title: 'Signature verification built-in',
    description:
      'req.rawBody is the untouched request body — exactly what Stripe signed. Pass it to stripe.webhooks.constructEvent and you are done.'
  },
  {
    title: 'One endpoint, many events',
    description:
      'Stripe encourages a single endpoint for all events. Route by event.type inside the function. Keep everything in one editable file.'
  },
  {
    title: 'Replay the exact payload',
    description:
      'When something goes wrong in production, replay the captured invocation with the same signed payload. No dry-run harness to build.'
  }
];

export default function StripeWebhooksPage() {
  return (
    <>
      <PageHero
        eyebrow="Use case"
        title="Stripe webhooks in under 50 lines."
        description="Stripe sends you payment events. You need to turn them into database writes. A Stripe webhook handler on nvoke is one function, one URL, one secret."
        secondaryCta={{ label: 'More use cases', href: '/use-cases' }}
      />

      <CodeBlock code={EXAMPLE} caption="A complete Stripe webhook handler." />

      <ProseSection title="Setup, end to end">
        <p>
          Create a function on nvoke, paste the handler above, add two secrets:{' '}
          <strong>STRIPE_SECRET_KEY</strong> and <strong>STRIPE_WEBHOOK_SECRET</strong>. Mark the
          endpoint as public so Stripe can POST without an API key header. Copy the endpoint URL,
          open the Stripe dashboard, add it as a webhook endpoint, select the events you care
          about. Stripe will send a test event — you will see it hit in the log panel within a
          second.
        </p>
        <p>
          That is the entire setup. No Vercel project, no Lambda + API Gateway, no ngrok tunnel
          during development. Local development, if you want it, is a matter of running{' '}
          <strong>stripe listen --forward-to</strong> against the same URL.
        </p>
      </ProseSection>

      <ProseSection title="Idempotency, the quiet killer">
        <p>
          Stripe will retry a webhook on any non-2xx response, and will sometimes deliver the
          same event twice for other reasons. Every handler must be idempotent: handling
          <strong> checkout.session.completed</strong> twice for the same session must not charge
          the customer again or send two confirmation emails.
        </p>
        <p>
          The usual pattern: use <strong>event.id</strong> as a dedupe key. Either skip handling
          if you have already seen the ID, or make the downstream side effect idempotent (UPSERT,
          a unique constraint on <strong>event_id</strong> in the order table). Both work; the
          second is more robust under concurrent delivery.
        </p>
      </ProseSection>

      <ProseSection title="What not to do in a webhook">
        <p>
          Do not block the webhook response on slow downstream work. If you need to send a
          complex email, reconcile against an external system, or do anything that might take
          more than a few seconds, write the event to a database table and process it from a
          scheduled nvoke function. Stripe wants a fast 200.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Ship a Stripe handler tonight."
        description="Paste the handler above, add your keys, copy the URL into Stripe. Done before dinner."
      />
    </>
  );
}
