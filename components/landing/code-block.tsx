import { codeToHtml } from 'shiki';

type CodeBlockProps = {
  code: string;
  lang?: string;
  caption?: string;
};

export async function CodeBlock({ code, lang = 'javascript', caption }: CodeBlockProps) {
  const html = await codeToHtml(code, { lang, theme: 'vesper' });
  return (
    <figure className="mx-auto mt-10 max-w-3xl px-6">
      <div
        className="border-border/60 overflow-x-auto rounded-lg border text-sm [&>pre]:!bg-transparent [&>pre]:p-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption ? (
        <figcaption className="text-muted-foreground mt-2 text-center text-xs">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
