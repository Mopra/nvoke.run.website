import { PageHero } from '@/components/landing/page-hero';
import { ProseSection } from '@/components/landing/prose-section';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CTA } from '@/components/landing/cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Browser editor',
  description:
    'A real Monaco editor in the browser. Syntax highlighting, autocomplete, keyboard shortcuts. Nothing to install, nothing to configure.',
  path: '/features/browser-editor'
});

const FACTS = [
  {
    title: 'Monaco, the real thing',
    description:
      'Same editor that powers VS Code. Keyboard shortcuts, multi-cursor, find-and-replace. It behaves exactly like you expect.'
  },
  {
    title: 'No local setup',
    description:
      'No Node.js version to manage, no package install to wait for, no lockfile to conflict. Open the page, write, save.'
  },
  {
    title: 'Save, invoke, repeat',
    description:
      'Cmd+S saves. The endpoint updates in milliseconds. Hit it from another tab and watch the log stream scroll.'
  }
];

export default function BrowserEditorPage() {
  return (
    <>
      <PageHero
        eyebrow="Feature"
        title="Write in the browser. Run in production."
        description="nvoke bundles a real Monaco editor with syntax highlighting, autocomplete, and the keyboard shortcuts you already use. The code you write in the browser is the code that runs in production — no local dev environment required."
        secondaryCta={{ label: 'All features', href: '/features' }}
      />

      <ProseSection title="Why write in a browser at all?">
        <p>
          Most developers default to a local editor — VS Code, Cursor, whatever — and that is
          fine. nvoke works great as an edit-and-deploy target for a local editor, and a CLI is
          on the roadmap. But for a surprising number of functions, the browser editor is simply
          faster: no clone, no install, no ritual. Open the function, change three lines, hit
          save.
        </p>
        <p>
          This matters most for the kind of code people actually host on nvoke — small
          functions, webhook handlers, glue code, LLM tools. A webhook handler is 40 lines of
          Node.js. The cost of spinning up a local project to change five of them is high
          relative to the code.
        </p>
      </ProseSection>

      <ProseSection title="What Monaco gives you">
        <p>
          Full syntax highlighting for JavaScript and TypeScript, bracket matching, error
          squiggles, Cmd+/ to comment, Cmd+D to select next match, Cmd+Shift+L for multi-cursor
          on all matches. If you know VS Code shortcuts, you know the editor — because it is
          literally the same editor.
        </p>
        <p>
          Autocomplete covers standard Node.js APIs and anything your function imports from npm.
          We preload type definitions for popular packages so the editor knows about{' '}
          <strong>Stripe</strong>, <strong>openai</strong>, <strong>zod</strong>, and the
          request/response shapes nvoke injects.
        </p>
      </ProseSection>

      <FeatureGrid items={FACTS} columns={3} />

      <CTA
        title="Try the editor."
        description="Open a function, hit save, watch it run. That is the whole onboarding."
      />
    </>
  );
}
