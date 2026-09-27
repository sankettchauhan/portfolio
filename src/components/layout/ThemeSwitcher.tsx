"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import { Moon, Palette, Sun } from "lucide-react";
import {
  DEFAULT_MODE,
  DEFAULT_THEME,
  MODE_KEY,
  THEMES,
  THEME_KEY,
  type Mode,
  type ThemeId,
} from "@/lib/theme";

// The <html> attributes are the source of truth (set before paint by
// themeInitScript), so React subscribes to them rather than owning a copy.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-mode"],
  });
  return () => observer.disconnect();
}

function useHtmlAttr<T extends string>(name: string, fallback: T): T {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.getAttribute(name) as T) ?? fallback,
    () => fallback,
  );
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode / blocked storage: the choice just won't be remembered.
  }
}

export function ThemeSwitcher() {
  const theme = useHtmlAttr<ThemeId>("data-theme", DEFAULT_THEME);
  const mode = useHtmlAttr<Mode>("data-mode", DEFAULT_MODE);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setTheme = (id: ThemeId) => {
    document.documentElement.setAttribute("data-theme", id);
    persist(THEME_KEY, id);
  };
  const setMode = (m: Mode) => {
    document.documentElement.setAttribute("data-mode", m);
    persist(MODE_KEY, m);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Change theme"
        className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-accent"
      >
        <Palette className="size-4" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Theme settings"
          className="card absolute right-0 top-11 z-50 w-56 p-3 shadow-2xl shadow-black/40"
        >
          <p className="eyebrow mb-2 text-subtle">palette</p>
          <div className="flex flex-col gap-1">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                aria-pressed={theme === t.id}
                className={clsx(
                  "flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  theme === t.id
                    ? "bg-accent-soft text-fg"
                    : "text-muted hover:bg-surface-2 hover:text-fg",
                )}
              >
                <span
                  className="size-3 rounded-full ring-2 ring-border"
                  style={{ background: t.swatch }}
                />
                {t.label}
                {theme === t.id && <span className="ml-auto font-mono text-xs text-accent">●</span>}
              </button>
            ))}
          </div>

          <p className="eyebrow mb-2 mt-4 text-subtle">mode</p>
          <div className="grid grid-cols-2 gap-1 rounded-lg border border-border p-1">
            {(
              [
                ["dark", Moon],
                ["light", Sun],
              ] as const
            ).map(([m, Icon]) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={clsx(
                  "flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs capitalize transition-colors",
                  mode === m ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
              >
                <Icon className="size-3.5" />
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
