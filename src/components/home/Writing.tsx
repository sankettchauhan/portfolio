import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/content/posts";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export function Writing({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="reveal border-t border-border">
      {posts.slice(0, 3).map((p) => (
        <li key={p.slug}>
          <Link
            href={`/blog/${p.slug}`}
            className="group flex flex-col gap-1 border-b border-border py-4 transition-colors hover:bg-surface sm:flex-row sm:items-baseline sm:gap-6 sm:px-2"
          >
            <time dateTime={p.date} className="w-28 shrink-0 font-mono text-xs text-subtle">
              {fmt.format(new Date(p.date))}
            </time>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 font-medium text-fg group-hover:text-accent">
                {p.title}
                {p.draft && (
                  <span className="rounded border border-border px-1 font-mono text-[10px] font-normal text-subtle">
                    draft · dev only
                  </span>
                )}
              </span>
              <span className="mt-0.5 block text-sm text-muted">{p.summary}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-subtle">
              {p.readingMinutes} min
              <ArrowUpRight aria-hidden className="size-3.5 group-hover:text-accent" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
