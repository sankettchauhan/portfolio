import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

/**
 * Blog posts are MDX files in src/content/blog. Each exports its metadata:
 *
 *   export const meta = { title, summary, date: "2026-10-01", draft: true }
 *
 * Drafts render only in development. The homepage section and nav link stay
 * hidden until at least MIN_POSTS posts are published.
 */
export type PostMeta = {
  title: string;
  summary: string;
  date: string; // ISO, e.g. "2026-10-01"
  draft?: boolean;
  tags?: string[];
};

export type Post = PostMeta & { slug: string; readingMinutes: number };

export const MIN_POSTS = 2;
const DIR = path.join(process.cwd(), "src/content/blog");
const WORDS_PER_MINUTE = 220;

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { meta } = (await import(`@/content/blog/${slug}.mdx`)) as { meta: PostMeta };
      const source = await readFile(path.join(DIR, file), "utf8");
      const words = source.replace(/^export const meta[\s\S]*?\n};?\n/m, "").split(/\s+/).length;
      return { ...meta, slug, readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
    }),
  );
  const showDrafts = process.env.NODE_ENV === "development";
  return posts.filter((p) => showDrafts || !p.draft).sort((a, b) => b.date.localeCompare(a.date));
});

export async function writingEnabled() {
  return (await getAllPosts()).length >= MIN_POSTS;
}
