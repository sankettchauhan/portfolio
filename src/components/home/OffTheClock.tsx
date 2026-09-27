import clsx from "clsx";
import { hobbies, travel, type Hobby } from "@/content/hobbies";
import { PixelIcon } from "@/components/icons/pixel";
import { TravelMap } from "@/components/map/TravelMap";

/*
 * Laptop (4 cols): [ travel 2×2 ][ trek ][ calisthenics ]
 *                  [ travel     ][ badminton ][ f1 ]
 *                  [ ps5  ·  2  ][ anime  ·  2 ]
 */
export function OffTheClock() {
  const countriesVisited = travel.places.filter((p) => p.label !== false).length;
  const statesVisited = travel.places.filter((p) => p.label === false).length;
  return (
    <div className="reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="card flex flex-col overflow-hidden sm:col-span-2 lg:row-span-2">
        <div className="p-4 sm:p-5">
          <TileHeader icon="plane" title={travel.title} />
          <p className="mt-2 text-sm text-muted">{travel.blurb}</p>
        </div>
        <div
          role="img"
          aria-label={`Map of places visited: ${travel.places.map((p) => p.name).join(", ")}`}
          className="relative min-h-64 flex-1 overflow-hidden border-y border-border"
        >
          <TravelMap places={travel.places} className="absolute inset-0 size-full" />
          <span className="absolute bottom-1 right-1.5 font-mono text-[9px] text-subtle">Natural Earth</span>
        </div>
        <dl className="grid grid-cols-3 divide-x divide-border font-mono text-xs">
          <Stat label="countries" value={String(countriesVisited)} />
          <Stat label="states" value={String(statesVisited)} />
          <Stat label="next" value={travel.nextTrip} />
        </dl>
      </div>

      {hobbies.map((h) => (
        <HobbyTile key={h.id} hobby={h} />
      ))}
    </div>
  );
}

function HobbyTile({ hobby: h }: { hobby: Hobby }) {
  return (
    <div className={clsx("card card-hover flex flex-col p-4 sm:p-5", h.wide && "sm:col-span-2")}>
      <TileHeader icon={h.icon} title={h.title} />
      <dl className={clsx("mt-3 gap-x-6 gap-y-1.5", h.wide ? "grid sm:grid-cols-2" : "space-y-1.5")}>
        {h.facts.map((f) => (
          <div key={f.label}>
            <dt className="font-mono text-[11px] text-subtle">{f.label}</dt>
            <dd className="text-sm text-fg">{f.value}</dd>
          </div>
        ))}
      </dl>
      {h.progress && <PixelProgress {...h.progress} />}
    </div>
  );
}

function TileHeader({ icon, title }: { icon: Parameters<typeof PixelIcon>[0]["name"]; title: string }) {
  return (
    <p className="flex items-center gap-2.5 font-semibold text-fg">
      <span className="grid size-8 place-items-center rounded-lg border border-border bg-accent-soft text-accent">
        <PixelIcon name={icon} className="h-4 max-w-5" />
      </span>
      {title}
    </p>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-3 py-2.5">
      <dt className="text-[10px] text-subtle">{label}</dt>
      <dd className="truncate text-fg">{value}</dd>
    </div>
  );
}

/** Segmented, game-style progress bar. */
function PixelProgress({ label, value }: { label: string; value: number }) {
  const cells = 10;
  const filled = Math.round((value / 100) * cells);
  return (
    <div className="mt-auto pt-4">
      <div className="mb-1 flex justify-between font-mono text-[10px] text-subtle">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label} className="flex gap-0.5">
        {Array.from({ length: cells }, (_, i) => (
          <span key={i} className={clsx("h-2 flex-1", i < filled ? "bg-accent" : "bg-surface-2 ring-1 ring-inset ring-border")} />
        ))}
      </div>
    </div>
  );
}
