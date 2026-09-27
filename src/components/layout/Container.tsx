import clsx from "clsx";

/**
 * `content` (~768px) is the reading column; `wide` (~1024px) is for the bento
 * band and grids. Gutters are 16px on phones, 24px from tablet up.
 */
export function Container({
  size = "content",
  className,
  children,
}: {
  size?: "content" | "wide";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-4 sm:px-6",
        size === "content" ? "max-w-3xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
