/**
 * Writing index. In milestone 3 this moves to MDX files under content/blog;
 * for now it's the list the homepage section renders.
 * Drafts show only in development. The section and nav link stay hidden in
 * production until there are at least MIN_POSTS published posts.
 */
export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO
  readingMinutes: number;
  draft?: boolean;
};

export const MIN_POSTS = 2;

export const posts: PostMeta[] = [
  {
    slug: "building-zelda-in-kaboom",
    title: "[Draft] How I built a Zelda clone in Kaboom.js",
    summary: "[Level maps as ASCII grids, enemy movement and what I'd do differently.]",
    date: "2026-10-01",
    readingMinutes: 6,
    draft: true,
  },
  {
    slug: "legacy-to-react",
    title: "[Draft] Moving a 2,000-user internal tool from jQuery to React",
    summary: "[Lessons from modernizing Polaris without stopping the world.]",
    date: "2026-10-15",
    readingMinutes: 8,
    draft: true,
  },
];

export function visiblePosts() {
  const showDrafts = process.env.NODE_ENV === "development";
  return posts
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function writingEnabled() {
  return visiblePosts().length >= MIN_POSTS;
}
