"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Monitor, RotateCcw } from "lucide-react";
import type { Game } from "@/content/games";

/**
 * Plays a static game from /public/play/<slug>/ in an iframe. The iframe is
 * only mounted after "press start", so the game doesn't run (or grab keys)
 * until the visitor asks for it.
 */
export function GamePlayer({ game }: { game: Game }) {
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const exitFocusRef = useRef<HTMLButtonElement>(null);

  const focusGame = () => frameRef.current?.contentWindow?.focus();

  // Once focus is on the game's <canvas>, Tab alone isn't a reliable way out
  // for a keyboard user (browsers vary in whether focus traverses back out
  // of an iframe when it has nothing else to tab to). Each game's own script
  // listens for Escape and posts back here so we can hand focus to a real
  // button on the page — a guaranteed exit regardless of that browser quirk.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "exit-game" && e.source === frameRef.current?.contentWindow) {
        exitFocusRef.current?.focus();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div>
      <div
        ref={screenRef}
        className="crt relative mx-auto aspect-[4/3] w-full max-w-[calc((100dvh-6rem)*4/3)] overflow-hidden sm:max-w-[calc((100dvh-6rem)*1.6)] rounded-2xl border border-border-strong bg-black shadow-[0_0_60px_-20px_var(--accent-glow)] sm:aspect-[16/10]"
      >
        {started ? (
          <iframe
            key={run}
            ref={frameRef}
            src={`/play/${game.slug}/index.html`}
            title={`${game.title} (game)`}
            onLoad={focusGame}
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              screenRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
            }}
            className="group absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 p-6 text-center"
          >
            <span className="font-pixel text-xl text-[#e8ffe9] drop-shadow-[0_0_10px_rgb(78_240_138/0.6)] sm:text-3xl">
              {game.title.toUpperCase()}
            </span>
            <span className="cursor-blink font-pixel text-[10px] text-[#4ef08a] sm:text-xs">▶ PRESS START</span>
            <span className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-[11px] text-[#9fb8a6]">
              {game.controls.map((c) => (
                <span key={c.keys}>
                  <kbd className="rounded border border-[#2a3d31] bg-[#0c120e] px-1.5 text-[#d6e6da]">{c.keys}</kbd> {c.action}
                </span>
              ))}
            </span>
            {!game.mobile && (
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#ffb23f] sm:hidden">
                <Monitor className="size-3.5" /> needs a keyboard, best on desktop
              </span>
            )}
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-subtle">
          {started ? "click the screen if keys stop responding · Escape returns focus here" : `${game.engine} · runs in your browser`}
        </p>
        {started && (
          <div className="flex gap-2">
            <button
              type="button"
              ref={exitFocusRef}
              onClick={() => setRun((r) => r + 1)}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              <RotateCcw className="size-3.5" /> restart
            </button>
            <button
              type="button"
              onClick={() => screenRef.current?.requestFullscreen?.().then(focusGame).catch(() => {})}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              <Maximize className="size-3.5" /> fullscreen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
