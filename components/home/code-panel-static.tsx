import { codeToHtml } from 'shiki';

const EXAMPLE_CODE = `export default async function (req) {
  const { name = "world" } = req.body;
  return { message: \`Hello, \${name}!\` };
}`;

const OUTPUT_METHOD = 'POST /api/invoke/hello';
const OUTPUT_STATUS = '200 OK · 47ms';
const OUTPUT_BODY = '{ "message": "Hello, world!" }';

export async function CodePanelStatic() {
  const html = await codeToHtml(EXAMPLE_CODE, {
    lang: 'javascript',
    theme: 'vesper'
  });

  return (
    <figure
      className="mx-auto my-12 max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_0_0_oklch(0.3_0.008_80)_inset]"
      aria-label="Example nvoke function"
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <span className="ml-2 font-mono text-xs text-muted-foreground">hello.js</span>
      </div>

      {/* Code region */}
      <div
        className="overflow-x-auto bg-card px-5 py-5 font-mono text-sm [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Action bar */}
      <div className="flex items-center justify-end border-t border-border px-4 py-2.5">
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none rounded-md border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
        >
          Run ▸
        </button>
      </div>

      {/* Output region */}
      <div
        className="space-y-1 border-t border-border bg-panel-output px-5 py-4 font-mono text-xs text-muted-foreground"
        aria-live="off"
      >
        <div>{OUTPUT_METHOD}</div>
        <div className="text-primary">{OUTPUT_STATUS}</div>
        <div className="text-foreground">{OUTPUT_BODY}</div>
      </div>
    </figure>
  );
}
