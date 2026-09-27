import { currentStack, skillGroups } from "@/content/skills";
import { TechIcon } from "@/components/icons/TechIcon";

export function Skills() {
  return (
    <div className="reveal space-y-10">
      <div>
        <p className="eyebrow mb-3 text-muted">current stack</p>
        <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {currentStack.map((s) => (
            <li key={s.name} className="card card-hover flex items-center gap-2.5 p-2.5 sm:gap-3 sm:p-3.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-accent-soft text-accent sm:size-10">
                <TechIcon slug={s.icon} name={s.name} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-fg">{s.name}</span>
                <span className="block truncate text-xs text-muted">{s.blurb}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="space-y-4">
        {skillGroups.map((g) => (
          <div key={g.label} className="flex flex-col gap-2 border-t border-dashed border-border pt-4 sm:flex-row sm:gap-6">
            <dt className="w-28 shrink-0 pt-1 font-mono text-xs text-subtle">{g.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s.name} className="chip text-sm!">
                    <TechIcon slug={s.icon} name={s.name} className="size-3.5 text-accent" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
