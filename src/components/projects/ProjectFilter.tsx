"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { ProjectItem } from "@/content/projects";
import { ProjectGrid } from "@/components/home/Projects";

/** Tag chips (most-used first) that filter the project grid. */
export function ProjectFilter({ projects }: { projects: ProjectItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [projects]);

  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  const chip = (label: string, count: number, value: string | null) => (
    <button
      key={label}
      type="button"
      onClick={() => setActive(value)}
      aria-pressed={active === value}
      className={clsx(
        "chip cursor-pointer transition-colors",
        active === value ? "border-solid! border-accent! bg-accent! text-accent-fg!" : "hover:border-accent/60 hover:text-accent",
      )}
    >
      {label}
      <span className={clsx("text-[10px]", active === value ? "opacity-70" : "text-subtle")}>{count}</span>
    </button>
  );

  return (
    <>
      <div role="group" aria-label="Filter by tag" className="mb-6 flex flex-wrap gap-2">
        {chip("all", projects.length, null)}
        {tags.map(([t, n]) => chip(t, n, t))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} project{shown.length === 1 ? "" : "s"}
        {active ? ` tagged ${active}` : ""}
      </p>
      <ProjectGrid items={shown} />
    </>
  );
}
