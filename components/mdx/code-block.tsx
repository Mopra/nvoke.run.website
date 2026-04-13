import { codeToHtml } from 'shiki';

type Props = {
  children: string;
  language?: string;
  title?: string;
};

export async function CodeBlock({ children, language = 'javascript', title }: Props) {
  const html = await codeToHtml(children.trim(), { lang: language, theme: 'vesper' });
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-border bg-card">
      {title && (
        <figcaption className="border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
          {title}
        </figcaption>
      )}
      <div
        className="overflow-x-auto px-4 py-4 font-mono text-sm [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
