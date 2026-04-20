import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { ComparisonTable } from '@/components/landing/comparison-table';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'nvoke vs AWS Lambda',
  description:
    'AWS Lambda is powerful and cheap at scale. It is also hours of configuration for a webhook handler. nvoke is Lambda without the YAML.',
  path: '/alternatives/aws-lambda'
});

const ROWS = [
  {
    criterion: 'Time from signup to live URL',
    nvoke: 'Under a minute.',
    other: '30–120 minutes (IAM, API Gateway, deploy pipeline).'
  },
  {
    criterion: 'Required configuration',
    nvoke: 'None. Secrets are a dialog. Logs are a panel.',
    other: 'IAM roles, execution policies, API Gateway routes, CloudWatch log groups.'
  },
  {
    criterion: 'Editor experience',
    nvoke: 'Monaco in the browser. Save = deploy.',
    other: 'Lambda console inline editor (limited) or CI/CD from a git repo.'
  },
  {
    criterion: 'Cold starts',
    nvoke: 'Sub-100ms warm, ~1s for rarely-called functions.',
    other: 'Variable, can be 500ms–3s for Node.js outside provisioned concurrency.'
  },
  {
    criterion: 'Pricing',
    nvoke: 'Flat monthly plan with execution ceiling.',
    other: 'Per-request + per-GB-second + API Gateway + data transfer.'
  },
  {
    criterion: 'Best for',
    nvoke: 'Small, bursty workloads. Webhooks, cron, LLM tools.',
    other: 'Huge scale, tight cost optimization, deep AWS integration.'
  }
];

export default function LambdaComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Alternative"
        title="nvoke vs AWS Lambda."
        description="Lambda is the original and still the most capable function-as-a-service. It is also aggressively configured: IAM, API Gateway, CloudWatch, deploy pipelines. nvoke strips all of that away for the 80% of workloads that do not need it."
        secondaryCta={{ label: 'All alternatives', href: '/alternatives' }}
      />

      <ComparisonTable otherLabel="AWS Lambda" rows={ROWS} />

      <ProseSection title="Lambda is great at scale">
        <p>
          If you are handling millions of invocations per day, are already deep in the AWS
          ecosystem, and have the team to manage CloudFormation or Terraform templates,
          Lambda is hard to beat on economics and on integration with every other AWS service.
          It is the right tool for Amazon-shaped problems.
        </p>
        <p>
          nvoke is not trying to compete with that. We are not going to host your high-traffic
          video ingestion pipeline or your global low-latency API tier. If that is what you
          need, Lambda + Fargate + the rest of AWS is the right stack.
        </p>
      </ProseSection>

      <ProseSection title="Where Lambda is overkill">
        <p>
          For the functions most people actually write — a Stripe webhook handler, a nightly
          cron job, a tool for an LLM agent, an internal endpoint for a Slack bot — Lambda is an
          enormous amount of infrastructure. You end up with an IAM role, an API Gateway, a
          deploy pipeline, a CloudWatch log group, and a Secrets Manager entry just to run
          fifty lines of code.
        </p>
        <p>
          nvoke does those fifty lines in one dialog. One URL, one editor, one secrets dialog,
          one log panel. Less power, yes. Also dramatically less cost in developer time, which
          is usually more expensive than compute.
        </p>
      </ProseSection>

      <ProseSection title="Cold starts, honestly">
        <p>
          Lambda cold starts for Node.js are usually 400ms–1s, occasionally worse. Provisioned
          concurrency fixes this but costs money per hour whether you get traffic or not. nvoke
          keeps a small warm pool for functions that see traffic, so a warm invocation is
          typically under 100ms. A rarely-called function is warmed in about a second on its
          first hit.
        </p>
        <p>
          Neither is magic. If cold starts matter for your workload, you should benchmark — not
          trust a marketing page.
        </p>
      </ProseSection>

      <CTA
        title="Skip the IAM console."
        description="Try nvoke on the free plan. If you hit the ceiling, you can graduate to Lambda on your own terms."
      />
    </>
  );
}
