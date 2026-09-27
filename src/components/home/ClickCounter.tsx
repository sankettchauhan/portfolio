"use client";

import { useState } from "react";
import { MousePointerClick } from "lucide-react";

/**
 * "Pointless, yet oddly satisfying." Milestone 5 wires the global total to
 * /api/clicks (Upstash); until then only the visitor's own count is live.
 */
export function ClickCounter() {
  const [mine, setMine] = useState(0);
  const [bump, setBump] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <button
        type="button"
        onClick={() => {
          setMine((n) => n + 1);
          setBump((b) => b + 1);
        }}
        className="group relative flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong bg-accent-soft py-4 transition-transform active:scale-95"
      >
        <MousePointerClick className="size-5 text-accent transition-transform group-hover:-rotate-12" />
        <span className="font-mono text-xs uppercase tracking-widest text-fg">click me</span>
        <span
          key={bump}
          aria-hidden
          className="pointer-events-none absolute -top-1 right-3 font-mono text-xs text-accent opacity-0 [animation:float-up_700ms_ease-out]"
        >
          +1
        </span>
      </button>
      <p className="mt-3 text-center font-mono text-xs text-muted" aria-live="polite">
        you: <span className="text-fg">{mine}</span> · everyone: <span className="text-fg">—</span>
      </p>
    </div>
  );
}
