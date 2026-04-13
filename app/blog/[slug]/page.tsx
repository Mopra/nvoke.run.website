import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { Callout } from '@/components/mdx/callout';
import { CodeBlock } from '@/components/mdx/code-block';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ title: 'Not found' });
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.frontmatter.date.toISOString()
  });
}

type CodeChildProps = { children?: string; className?: string };

const components = {
  Callout,
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => {
    // Fenced code blocks arrive as <pre><code className="language-xxx">...</code></pre>
    const codeEl = props.children as React.ReactElement<CodeChildProps> | undefined;
    const code = codeEl?.props?.children;
    const className = codeEl?.props?.className ?? '';
    const lang = /language-(\w+)/.exec(className)?.[1] ?? 'text';
    if (typeof code === 'string') {
      return <CodeBlock language={lang}>{code}</CodeBlock>;
    }
    return <pre {...props} />;
  }
};

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <header className="mb-10">
        <time className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {formatDate(post.frontmatter.date)}
        </time>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground">
          {post.frontmatter.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{post.frontmatter.description}</p>
      </header>

      <div className="prose">
        <MDXRemote source={post.content} components={components} />
      </div>

      <footer className="mt-16 border-t border-border pt-8">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to blog
        </Link>
      </footer>
    </article>
  );
}
