import Image from "next/image";
import Link from "next/link";
import { Monitor } from "lucide-react";
import type { Game } from "@/content/games";

/** The one place the pixel font lives: CRT "cabinets" for each game. */
export function Arcade({ games }: { games: Game[] }) {
  return (
    <ul className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((g) => (
        <li key={g.slug}>
          <Link href={`/games/${g.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
            <div className="crt relative aspect-[4/3] border-b border-border bg-black">
              <Image
                src={g.thumbnail}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-10">
                <span className="block font-pixel text-sm text-[#e8ffe9] drop-shadow-[0_0_6px_rgb(78_240_138/0.6)]">
                  {g.title.toUpperCase()}
                </span>
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <p className="text-sm text-muted">
                {g.tagline} · <span className="font-mono text-xs text-subtle">{g.engine}</span>
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5" aria-label="Controls">
                {g.controls.map((c) => (
                  <li key={c.keys} className="flex items-center gap-1.5 text-xs text-subtle">
                    <kbd className="rounded border border-b-2 border-border-strong bg-surface-2 px-1.5 font-mono text-[11px] text-fg">
                      {c.keys}
                    </kbd>
                    {c.action}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between pt-1">
                <span className="font-pixel text-[10px] text-accent group-hover:animate-pulse">▶ PLAY</span>
                {!g.mobile && (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-subtle sm:hidden">
                    <Monitor className="size-3" /> desktop only
                  </span>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
      <li>
        <div className="card flex h-full min-h-60 flex-col items-center justify-center gap-3 border-dashed p-6 text-center">
          <span className="font-pixel text-lg text-subtle">???</span>
          <span className="font-pixel text-[9px] leading-relaxed text-muted">NEXT GAME LOADING</span>
          <span className="cursor-blink font-mono text-xs text-accent">█</span>
        </div>
      </li>
    </ul>
  );
}
