import { Container } from "./Container";

/**
 * Every homepage section shares this header: a mono eyebrow
 * (`// 02 · experience`), a title, an optional blurb and an optional action
 * on the right (e.g. "View all").
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  action,
  size = "content",
  children,
}: {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  size?: "content" | "wide";
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-14 sm:py-20">
      <Container size={size}>
        <header className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <p className="eyebrow">
              {"// "}
              {String(index).padStart(2, "0")} · {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">{description}</p>
            )}
          </div>
          {action}
        </header>
        {children}
      </Container>
    </section>
  );
}
