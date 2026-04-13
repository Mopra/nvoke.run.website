import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/site/json-ld';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Writing from the nvoke team.',
  path: '/blog'
});

// ISR: re-evaluate hourly so future-dated posts go live automatically
export const revalidate = 3600;

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${siteConfig.name} blog`,
          url: `${siteConfig.url}/blog`
        }}
      />
      <header>
        <h1 className="text-foreground text-4xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground mt-3">Writing from the nvoke team.</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground mt-16">No posts yet.</p>
      ) : (
        <ul className="mt-16 space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <time className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                {formatDate(post.frontmatter.date)}
              </time>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="text-foreground hover:text-primary">
                  {post.frontmatter.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mt-1">{post.frontmatter.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
