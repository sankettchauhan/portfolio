import clsx from "clsx";
import { getTechIcon } from "@/lib/tech-icons";

/** Monochrome brand mark, or a monogram when no icon exists for the slug. */
export function TechIcon({
  slug,
  name,
  className,
}: {
  slug?: string;
  name: string;
  className?: string;
}) {
  const icon = getTechIcon(slug);
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={clsx("shrink-0", className)}>
        <path d={icon.path} />
      </svg>
    );
  }
  const letters = name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={clsx(
        "grid shrink-0 place-items-center rounded-[3px] border border-current font-mono text-[0.5em] font-bold leading-none",
        className,
      )}
    >
      {letters}
    </span>
  );
}
