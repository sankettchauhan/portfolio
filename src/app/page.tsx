import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

// Milestone 1: layout shell. Section bodies are stubs until milestone 2.
const stubs = [
  { id: "experience", eyebrow: "experience", title: "Where I've worked" },
  { id: "skills", eyebrow: "skills", title: "What I work with" },
  { id: "projects", eyebrow: "projects", title: "Things I've built" },
  { id: "arcade", eyebrow: "arcade", title: "Insert coin" },
  { id: "certifications", eyebrow: "certifications", title: "Certifications & awards" },
  { id: "writing", eyebrow: "writing", title: "Notes & write-ups" },
  { id: "contact", eyebrow: "contact", title: "Let's connect" },
];

export default function Home() {
  return (
    <>
      <Container className="pb-10 pt-16 sm:pt-24">
        <p className="eyebrow">
          {"> "}hello world<span className="cursor-blink">_</span>
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Hi, I&apos;m {profile.shortName}.
        </h1>
        <p className="mt-2 font-mono text-sm text-accent glow-text sm:text-base">
          {profile.role} @ {profile.company} · {profile.experienceYears} yrs · full-stack
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.tagline}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={profile.resume}
            download="Sanket_Chauhan_Resume.pdf"
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-strong"
          >
            <Download className="size-4" />
            Download resume
          </a>
          <a
            href="#contact"
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
            <ArrowRight className="size-4" />
          </a>
        </div>
      </Container>

      {stubs.map((s, i) => (
        <Section key={s.id} id={s.id} index={i + 1} eyebrow={s.eyebrow} title={s.title}>
          <div className="card grid h-40 place-items-center border-dashed font-mono text-xs text-subtle">
            [ {s.eyebrow} · milestone 2 ]
          </div>
        </Section>
      ))}
    </>
  );
}
