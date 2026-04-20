import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI assistant',
  description:
    'An AI assistant built into the nvoke editor. Ask it to write, refactor, or explain code. It sees your current function and applies suggestions with one click.',
  path: '/features/ai-assistant'
});

const FACTS = [
  {
    title: 'Context-aware',
    description:
      'The assistant sees the function you are editing. Ask "add error handling" and it rewrites your actual code, not a generic example.'
  },
  {
    title: 'One-click apply',
    description:
      'When the assistant returns code, a single click drops it into the editor. No copy-paste shuffle, no reformatting.'
  },
  {
    title: 'Starter prompts',
    description:
      'Common tasks are one click away: hello world, error handling, code explanation, or "turn this into a Stripe webhook".'
  }
];

export default function AiAssistantPage() {
  return (
    <>
      <PageHero
        eyebrow="Feature"
        title="An AI assistant that lives in the editor."
        description="Writing webhook handlers is repetitive. So is adding error handling, parsing request bodies, and remembering the exact shape of a Stripe event. The nvoke AI assistant does the boring parts so you can focus on the business logic."
        secondaryCta={{ label: 'All features', href: '/features' }}
      />

      <ProseSection title="What the assistant actually does">
        <p>
          The assistant lives in a panel next to your code. It has your current function in
          context, so its suggestions are about <em>your</em> code, not a generic example from a
          training dataset. Ask it to add input validation and it writes the validation for the
          shape of the request body your function is already handling.
        </p>
        <p>
          When it returns code, there is an Apply button. Click it, and the editor updates with
          the new code. You can undo, edit, or keep iterating with a follow-up prompt. The
          assistant is not a black box that ships to production — you still read the code, hit
          save, and watch the log stream.
        </p>
      </ProseSection>

      <ProseSection title="The prompts that do real work">
        <p>
          A few starter prompts live at the bottom of the panel because they are what people
          ask for most often:
        </p>
        <p>
          <strong>&quot;Write a hello world function.&quot;</strong> For when you are spinning up
          a new function and want a working starting point in two seconds.
        </p>
        <p>
          <strong>&quot;Add error handling to this function.&quot;</strong> Wraps the existing
          body in a try/catch with sensible status codes and a useful response shape. The
          assistant reads what can throw and handles it specifically, not with a generic
          <strong> return 500</strong>.
        </p>
        <p>
          <strong>&quot;Explain this code.&quot;</strong> Useful when you are reading a function
          you wrote three months ago. Also useful when you are reading a function someone else
          wrote and want a quick summary before you change it.
        </p>
        <p>
          <strong>&quot;Turn this into a Stripe webhook.&quot;</strong> Takes a skeleton function
          and adds signature verification, event type routing, and error handling wired for
          Stripe&apos;s retry behavior. You still need to add your own business logic inside the
          event handlers.
        </p>
      </ProseSection>

      <ProseSection title="Where it fits in the workflow">
        <p>
          The assistant is fastest at the start of a function and at the end of a refactor. At
          the start, it gets you from a blank editor to a running endpoint in a conversation.
          At the end, it is good at the last-mile polish: adding types, tightening error
          messages, writing the boring parts of a test.
        </p>
        <p>
          It is not good at — and should not be used for — anything you cannot verify with a
          quick read. Every line it writes ends up on your endpoint. Treat the assistant like a
          junior pair: useful, fast, occasionally wrong.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Try the assistant."
        description="Open a function in the editor and hit the sparkles icon. The first prompt is free, and so are the next hundred."
      />
    </>
  );
}
