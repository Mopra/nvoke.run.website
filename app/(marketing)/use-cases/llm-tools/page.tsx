import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { CodeBlock } from '@/components/landing/code-block';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LLM tool endpoints',
  description:
    'Give your agent a real URL to call. Host a tool as a nvoke function, expose it to Claude, GPT, or any agent framework in minutes.',
  path: '/use-cases/llm-tools'
});

const EXAMPLE = `// Tool: get_weather(city: string)
export default async function (req) {
  const { city } = req.body;
  if (!city) return new Response("city required", { status: 400 });

  const res = await fetch(
    \`https://api.weather.example/current?q=\${encodeURIComponent(city)}\`,
    { headers: { "x-api-key": process.env.WEATHER_API_KEY } }
  );
  const data = await res.json();

  return {
    city,
    temp_c: data.temp_c,
    condition: data.condition
  };
}`;

const FACTS = [
  {
    title: 'Stable URLs for tools',
    description:
      'Your tool URL does not change across deploys. Register it once in your agent framework and keep shipping.'
  },
  {
    title: 'Logs you can read',
    description:
      'When the agent calls a tool, you see the exact arguments and response in the log panel. Essential for debugging an agent that is hallucinating inputs.'
  },
  {
    title: 'Secrets stay on the server',
    description:
      'Weather API keys, search credentials, database connection strings — they live in nvoke, not in the agent prompt or the client.'
  }
];

export default function LlmToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Use case"
        title="Give your agent a real URL."
        description="LLM agents in Claude, OpenAI, or any framework need tools to be useful. A tool is just an HTTP endpoint with a declared schema. nvoke is the fastest way to host one."
        secondaryCta={{ label: 'More use cases', href: '/use-cases' }}
      />

      <CodeBlock code={EXAMPLE} caption="A weather tool. Register the URL with your agent framework." />

      <ProseSection title="The tool-use pattern, unpacked">
        <p>
          Most LLM agent frameworks expose tools the same way: you declare a name, a description,
          and a JSON schema for inputs. When the model decides to use the tool, the framework
          sends an HTTP request to a URL you configure, passing the model-chosen arguments.
          Whatever you return comes back into the conversation.
        </p>
        <p>
          The body of the tool — what it actually does — is where the interesting work happens:
          hit an internal database, search an index, call an external API, do some math. That is
          exactly the kind of small, stateless function nvoke is built for.
        </p>
      </ProseSection>

      <ProseSection title="Why nvoke works well for tools">
        <p>
          Tools need three things: a stable URL, a fast path from code change to deployed
          endpoint, and clean logs for debugging. Agents make surprising calls with surprising
          arguments, and you will spend real time reading the logs to figure out why the agent
          gave your tool an empty string or a date in 2031. nvoke captures every invocation with
          the full request body ready to inspect.
        </p>
        <p>
          The other property that matters: secrets. Your tool probably needs a third-party API
          key. You do not want that key in the agent prompt, the client, or a user-facing
          config. nvoke holds the key server-side and exposes it only to the tool endpoint.
        </p>
      </ProseSection>

      <ProseSection title="MCP servers">
        <p>
          If you are using Model Context Protocol, you can expose a nvoke function as an MCP tool
          by returning a manifest from a <strong>GET</strong> request and handling tool calls on{' '}
          <strong>POST</strong>. A full MCP example lives in the docs.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Ship an agent tool."
        description="Write the function. Paste the URL into your agent config. Let the model figure out when to call it."
      />
    </>
  );
}
