"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, Award } from "lucide-react";
import type { Certification } from "@/content/certifications";
import { TechIcon } from "@/components/icons/TechIcon";

const VISIBLE = 5;

/** Prasoon-style rows: logo │ title, "@ issuer · date", ↗. First 5 visible. */
export function Certifications({ items }: { items: Certification[] }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = items.length - VISIBLE;

  return (
    <div className="reveal">
      <ul className="border-t border-border">
        {items.slice(0, VISIBLE).map((c) => (
          <Row key={c.title} cert={c} />
        ))}
      </ul>
      {hidden > 0 && (
        <>
          <div id="more-certs" className="accordion" data-open={expanded}>
            <ul>
              {items.slice(VISIBLE).map((c) => (
                <Row key={c.title} cert={c} />
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls="more-certs"
            className="mx-auto mt-4 flex rounded-lg border border-dashed border-border-strong px-4 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-accent"
          >
            {expanded ? "show less" : `+ ${hidden} more`}
          </button>
        </>
      )}
    </div>
  );
}

function Row({ cert: c }: { cert: Certification }) {
  const content = (
    <>
      <span className="grid w-14 shrink-0 place-items-center self-stretch text-accent">
        {c.kind === "award" && !c.icon ? (
          <Award className="size-5" />
        ) : (
          <TechIcon slug={c.icon} name={c.issuer} className="size-5" />
        )}
      </span>
      <span className="min-w-0 flex-1 border-l border-dashed border-border py-3.5 pl-4 pr-2">
        <span className="flex items-center gap-2">
          <span className="font-medium leading-snug text-fg underline-offset-4 group-hover:underline">{c.title}</span>
          {c.kind === "award" && (
            <span className="shrink-0 rounded border border-accent/40 px-1 font-mono text-[10px] text-accent">award</span>
          )}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted">
          <span>@ {c.issuer}</span>
          {c.date && (
            <>
              <span aria-hidden className="h-3.5 w-px bg-border-strong" />
              <time className="font-mono text-xs">{c.date}</time>
            </>
          )}
        </span>
      </span>
      {c.link && <ArrowUpRight aria-hidden className="mr-3 size-4 shrink-0 text-subtle group-hover:text-accent" />}
    </>
  );

  const cls = clsx(
    "group flex items-center border-b border-border transition-colors",
    c.link && "hover:bg-surface",
  );
  return (
    <li>
      {c.link ? (
        <a href={c.link} target="_blank" rel="noopener noreferrer" className={cls}>
          {content}
        </a>
      ) : (
        <div className={cls}>{content}</div>
      )}
    </li>
  );
}
