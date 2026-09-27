import clsx from "clsx";

/** Bento tile: a card with an optional mono label row. */
export function Tile({
  label,
  icon,
  aside,
  className,
  children,
}: {
  label?: string;
  icon?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("card relative flex flex-col overflow-hidden p-4 sm:p-5", className)}>
      {label && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="eyebrow flex items-center gap-2 text-muted">
            {icon && <span className="text-accent">{icon}</span>}
            {label}
          </p>
          {aside}
        </div>
      )}
      {children}
    </div>
  );
}
