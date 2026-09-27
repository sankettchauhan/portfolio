"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MousePointerClick } from "lucide-react";

const MINE_KEY = "clicks:mine";
const FLUSH_AFTER_MS = 700;

// "Your" count persists in this browser. If storage is blocked it still
// counts for the current visit via the in-memory fallback.
let mineFallback = 0;
const MINE_EVENT = "clicks:mine";

function readMine() {
  try {
    return Number(localStorage.getItem(MINE_KEY)) || mineFallback;
  } catch {
    return mineFallback;
  }
}

function incrementMine() {
  mineFallback = readMine() + 1;
  try {
    localStorage.setItem(MINE_KEY, String(mineFallback));
  } catch {
    // storage blocked: fallback holds the count
  }
  window.dispatchEvent(new Event(MINE_EVENT));
}

function subscribeMine(onChange: () => void) {
  window.addEventListener(MINE_EVENT, onChange);
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    window.removeEventListener(MINE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * "Pointless, yet oddly satisfying." Your own count lives in this browser;
 * the global total comes from /api/clicks. Rapid clicks are batched into one
 * request and flushed on page hide, so mashing the button costs a handful of
 * requests, not hundreds.
 */
export function ClickCounter() {
  const mine = useSyncExternalStore(subscribeMine, readMine, () => 0);
  // null = unknown yet or counter disabled on the server
  const [total, setTotal] = useState<number | null>(null);
  const [bump, setBump] = useState(0);
  const pending = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    fetch("/api/clicks")
      .then((r) => r.json())
      .then((d: { total: number | null }) => setTotal(d.total))
      .catch(() => setTotal(null));
  }, []);

  const flush = useCallback(() => {
    clearTimeout(timer.current);
    const n = pending.current;
    if (!n) return;
    pending.current = 0;
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ n }),
      keepalive: true,
    })
      .then((r) => r.json())
      // Server total already includes this batch; add clicks made since.
      .then((d: { total: number | null }) => setTotal(d.total === null ? null : d.total + pending.current))
      .catch(() => {});
  }, []);

  // Don't lose a half-built batch when the visitor leaves or switches tabs.
  useEffect(() => {
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      flush();
    };
  }, [flush]);

  const click = () => {
    incrementMine();
    setTotal((t) => (t === null ? t : t + 1));
    setBump((b) => b + 1);
    pending.current += 1;
    clearTimeout(timer.current);
    timer.current = setTimeout(flush, FLUSH_AFTER_MS);
  };

  return (
    <div className="flex h-full flex-col">
      <button
        type="button"
        onClick={click}
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
        you: <span className="text-fg">{mine.toLocaleString()}</span>
        {total !== null && (
          <>
            {" "}· everyone: <span className="text-fg">{total.toLocaleString()}</span>
          </>
        )}
      </p>
    </div>
  );
}
