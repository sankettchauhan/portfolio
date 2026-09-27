import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { now } from "@/content/now";
import { games } from "@/content/games";
import { Container } from "@/components/layout/Container";
import { StaticMap } from "@/components/map/StaticMap";
import { PixelIcon } from "@/components/icons/pixel";
import { LinkedinIcon } from "@/components/icons/brands";
import { Tile } from "@/components/ui/Tile";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { LocalTime } from "@/components/ui/LocalTime";
import { ClickCounter } from "./ClickCounter";

/*
 * Laptop (4 cols):  [ map 2×2 ][ currently 2 ]
 *                   [ map     ][ click ][ play ]
 *                   [ let's connect  ·  4 ]
 * Tablet (2 cols) and phone (1 col) stack in source order.
 */
export function Bento() {
  const game = games[0];
  return (
    <Container size="wide" className="reveal">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
        <Tile
          label="currently based in"
          icon={<MapPin className="size-3.5" />}
          className="sm:col-span-2 lg:row-span-2"
        >
          <div>
            <p className="text-lg font-semibold text-fg">
              {profile.location.city}, {profile.location.region}
            </p>
            <p className="flex items-center gap-1.5 font-mono text-xs text-subtle">
              <Clock className="size-3" /> <LocalTime /> · local time
            </p>
          </div>
          <StaticMap
            map="home"
            showCenterPin
            label={`Map of ${profile.location.city}`}
            className="-mx-4 -mb-4 mt-4 min-h-52 flex-1 border-t border-border sm:-mx-5 sm:-mb-5 sm:min-h-64"
          />
        </Tile>

        <Tile label="currently" aside={<span className="font-mono text-[10px] text-subtle">{now.updated}</span>} className="sm:col-span-2">
          <dl className="space-y-2">
            {now.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="w-20 shrink-0 font-mono text-xs text-accent">{item.label}</dt>
                <dd className="text-sm text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Tile>

        <Tile label="click me" className="min-h-44">
          <ClickCounter />
        </Tile>

        <Link
          href={`/games/${game.slug}`}
          className="crt card card-hover group flex min-h-44 flex-col items-center justify-center gap-3 bg-[#050806]! p-5 text-center"
        >
          <PixelIcon name="invader" className="h-8 text-accent drop-shadow-[0_0_8px_var(--accent-glow)] transition-transform group-hover:-translate-y-1" />
          <span className="font-pixel text-[10px] leading-relaxed text-accent">INSERT COIN</span>
          <span className="cursor-blink font-pixel text-[8px] text-[#d6e6da]">PRESS START ▶</span>
          <span className="sr-only">Play {game.title}</span>
        </Link>

        <Tile label="let's connect" className="sm:col-span-2 lg:col-span-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-md text-sm text-muted">
              Hiring, collaborating, or just want to talk F1 and games? My inbox is open.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <CopyEmail email={profile.email} className="sm:min-w-72" />
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-fg transition-colors hover:border-accent/60 hover:text-accent"
              >
                <LinkedinIcon className="size-3.5" /> LinkedIn <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </Tile>
      </div>
    </Container>
  );
}
