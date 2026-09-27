"use client";

import { useSyncExternalStore } from "react";
import location from "@/content/location.json";

const fmt = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: location.timeZone,
});

// One shared ticker for every <LocalTime> on the page, aligned to the minute.
let now = Date.now();
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;

function tick() {
  now = Date.now();
  listeners.forEach((l) => l());
  timer = setTimeout(tick, 60_000 - (now % 60_000));
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (listeners.size === 1) tick();
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

/**
 * Your current local time, e.g. "10:42 PM IST". The page is statically
 * prerendered, so the server renders a placeholder and the browser fills in
 * the real time (no stale build-time clock, no hydration mismatch).
 */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => fmt.format(now),
    () => null,
  );
  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:-- --"} {location.tzLabel}
    </time>
  );
}
