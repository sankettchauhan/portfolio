"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ChevronDown, GraduationCap } from "lucide-react";
import type { Company, Education } from "@/content/experience";

type Tab = "work" | "education";
const TABS: Tab[] = ["work", "education"];

export function Experience({ work, education }: { work: Company[]; education: Education[] }) {
  const [tab, setTab] = useState<Tab>("work");
  const [open, setOpen] = useState<string | null>(work[0]?.company ?? null);
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ work: null, education: null });

  // WAI-ARIA tabs pattern: only the selected tab sits in the normal Tab
  // order (roving tabindex) — Tab from the tablist should move to the panel
  // below, not to the other tab button; arrow keys move between tabs instead.
  const moveTab = (dir: 1 | -1) => {
    const i = TABS.indexOf(tab);
    const next = TABS[(i + dir + TABS.length) % TABS.length];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="reveal">
      <div
        role="tablist"
        aria-label="Experience type"
        className="mb-5 inline-grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-1"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); moveTab(1); }
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); moveTab(-1); }
          else if (e.key === "Home") { e.preventDefault(); setTab(TABS[0]); tabRefs.current[TABS[0]]?.focus(); }
          else if (e.key === "End") { e.preventDefault(); setTab(TABS[TABS.length - 1]); tabRefs.current[TABS[TABS.length - 1]]?.focus(); }
        }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            ref={(el) => { tabRefs.current[t] = el; }}
            role="tab"
            id={`tab-${t}`}
            tabIndex={tab === t ? 0 : -1}
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            onClick={() => setTab(t)}
            className={clsx(
              "rounded-lg px-5 py-1.5 font-mono text-xs capitalize transition-colors",
              tab === t ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "work" ? (
        // role="tabpanel" goes on this div, not the <ul>: a list's items need
        // a parent exposed with the "list" role, which an explicit role
        // overrides. Put ARIA-role elements and semantic lists in different
        // elements rather than stacking roles on one.
        <div id="panel-work" role="tabpanel" aria-labelledby="tab-work">
          <ul className="space-y-3">
            {work.map((c) => (
              <li key={c.company}>
                <CompanyCard
                  company={c}
                  open={open === c.company}
                  onToggle={() => setOpen(open === c.company ? null : c.company)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div id="panel-education" role="tabpanel" aria-labelledby="tab-education">
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.school} className="card flex gap-4 p-4 sm:p-5">
                <Logo name={e.school} src={e.logo} fallback={<GraduationCap className="size-5" />} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className="font-semibold text-fg">{e.school}</h3>
                    <span className="shrink-0 font-mono text-xs text-subtle">
                      {e.start} – {e.end}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{e.degree}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {e.details.map((d) => (
                      <li key={d} className="chip">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CompanyCard({ company: c, open, onToggle }: { company: Company; open: boolean; onToggle: () => void }) {
  const latest = c.roles[0];
  const earliest = c.roles[c.roles.length - 1];
  const panelId = `exp-${c.company.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <div className={clsx("card transition-colors", open && "border-border-strong")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
      >
        <Logo name={c.company} src={c.logo} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
            <h3 className="flex items-center gap-2 font-semibold text-fg">
              {c.company}
              {c.type === "Internship" && (
                <span className="rounded border border-border px-1.5 font-mono text-[10px] font-normal text-subtle">
                  intern
                </span>
              )}
            </h3>
            <span className="shrink-0 font-mono text-xs text-subtle">
              {earliest.start} – {latest.end}
            </span>
          </div>
          <p className="text-sm text-muted">
            {latest.title}
            {c.roles.length > 1 && <span className="text-subtle"> · promoted from {earliest.title}</span>}
          </p>
        </div>
        <ChevronDown
          aria-hidden
          className={clsx("size-4 shrink-0 text-subtle transition-transform duration-300", open && "rotate-180 text-accent")}
        />
      </button>

      <div id={panelId} className="accordion" data-open={open}>
        <div>
          <div className="border-t border-dashed border-border px-4 pb-5 pt-4 sm:px-5 sm:pl-[4.75rem]">
            <ol className={clsx(c.roles.length > 1 && "relative space-y-6 border-l border-border pl-5")}>
              {c.roles.map((r) => (
                <li key={r.title} className="relative">
                  {c.roles.length > 1 && (
                    <>
                      <span aria-hidden className="absolute -left-[1.6rem] top-1.5 size-2.5 rounded-full border-2 border-surface bg-accent" />
                      <p className="mb-2 flex flex-wrap items-baseline gap-x-2 text-sm">
                        <span className="font-medium text-fg">{r.title}</span>
                        <span className="font-mono text-xs text-subtle">
                          {r.start} – {r.end}
                        </span>
                      </p>
                    </>
                  )}
                  {r.projects?.map((p) => (
                    <div key={p.name} className="mb-4 last:mb-0">
                      <p className="font-mono text-xs text-accent">▸ {p.name}</p>
                      <Bullets items={p.bullets} />
                    </div>
                  ))}
                  {r.bullets && <Bullets items={r.bullets} />}
                </li>
              ))}
            </ol>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech used">
              {c.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 max-w-3xl space-y-1.5">
      {items.map((b) => (
        <li key={b} className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:text-subtle before:content-['–']">
          {b}
        </li>
      ))}
    </ul>
  );
}

function Logo({ name, src, fallback }: { name: string; src?: string; fallback?: React.ReactNode }) {
  return (
    <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-surface-2 font-mono text-sm font-semibold text-accent">
      {src ? (
        <Image src={src} alt="" fill sizes="44px" className="object-cover" />
      ) : (
        (fallback ?? name.charAt(0))
      )}
    </span>
  );
}
