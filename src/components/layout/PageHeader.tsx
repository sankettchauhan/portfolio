import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "./Container";

/** Header for subpages: terminal-style path, title, blurb and a back link. */
export function PageHeader({
  path,
  title,
  description,
  back = { href: "/", label: "home" },
  children,
}: {
  path: string;
  title: string;
  description?: React.ReactNode;
  back?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <Container size="wide" className="pb-8 pt-10 sm:pb-10 sm:pt-16">
      <Link href={back.href} className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent">
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        {back.label}
      </Link>
      <p className="eyebrow mt-6">
        {"~/"}
        {path}
        <span className="cursor-blink">_</span>
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">{description}</p>}
      {children}
    </Container>
  );
}
