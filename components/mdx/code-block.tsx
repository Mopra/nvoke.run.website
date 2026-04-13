import { codeToHtml } from 'shiki';

type Props = {
  children: string;
  language?: string;
  title?: string;
};

export async function CodeBlock({ children, language = 'javascript', title }: Props) {
  const html = await codeToHtml(children.trim(), { lang: language, theme: 'vesper' });
  return (
    <figure className="border-border bg-card my-6 overflow-hidden rounded-lg border">
      {title && (
        <figcaption className="border-border text-muted-foreground border-b px-4 py-2 font-mono text-xs">
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
