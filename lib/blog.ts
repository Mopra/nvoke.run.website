import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  draft: z.boolean().optional().default(false)
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

function readAllPostFiles(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const parsed = matter(raw);
    const fm = frontmatterSchema.parse(parsed.data);
    return { slug, frontmatter: fm, content: parsed.content };
  });
}

function isPublishable(post: Post, now: Date): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  if (post.frontmatter.draft) return false;
  return post.frontmatter.date.getTime() <= now.getTime();
}

export function getAllPosts(): Post[] {
  const now = new Date();
  return readAllPostFiles()
    .filter((p) => isPublishable(p, now))
    .sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const now = new Date();
  const post = readAllPostFiles().find((p) => p.slug === slug);
  if (!post) return null;
  if (!isPublishable(post, now)) return null;
  return post;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
