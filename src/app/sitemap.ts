import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { games } from "@/content/games";
import { getAllPosts, writingEnabled } from "@/lib/posts";

/**
 * Generated at build time (no request-time APIs used), same as every other
 * page here. Blog entries only appear once writingEnabled() agrees — the
 * same gate that hides the Writing section and nav link until there are
 * enough real posts to show.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = profile.siteUrl;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/games`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...games.map(
      (g): MetadataRoute.Sitemap[number] => ({
        url: `${base}/games/${g.slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
      }),
    ),
  ];

  if (await writingEnabled()) {
    const posts = await getAllPosts();
    entries.push({ url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
    for (const post of posts) {
      entries.push({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
