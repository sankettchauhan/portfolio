import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/content/projects";
import { GithubIcon } from "@/components/icons/brands";

export function ProjectGrid({ items }: { items: ProjectItem[] }) {
  return (
    <ul className="reveal grid gap-4 sm:grid-cols-2">
      {items.map((p) => (
        <li key={p.slug}>
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project: p }: { project: ProjectItem }) {
  const primary = p.live ?? p.code;
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="tint-media tint-media-dim relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
        <Image
          src={p.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="flex items-center gap-1.5 font-semibold text-fg">
          {primary ? (
            // Stretched link: the whole card is clickable; other links sit above it.
            <a href={primary} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 hover:text-accent">
              {p.title}
            </a>
          ) : (
            p.title
          )}
          <ArrowUpRight aria-hidden className="size-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          {p.code && (
            <a
              href={p.code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} source code`}
              className="relative z-10 shrink-0 text-subtle hover:text-accent"
            >
              <GithubIcon className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
