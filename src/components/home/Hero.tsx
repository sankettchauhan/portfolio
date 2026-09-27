import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/layout/Container";
import { AvatarSprite } from "@/components/ui/AvatarSprite";

export function Hero() {
  return (
    <Container size="wide" className="pb-10 pt-12 sm:pb-14 sm:pt-20">
      <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto] sm:gap-12">
        <div>
          <p className="eyebrow">
            {"> "}hello world<span className="cursor-blink">_</span>
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Hi, I&apos;m {profile.shortName}.
          </h1>
          <p className="glow-text mt-3 font-mono text-sm text-accent sm:text-base">
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
        </div>

        <div className="order-first sm:order-none">
          <div className="size-24 overflow-hidden rounded-2xl border border-border-strong bg-surface-2 p-2 sm:size-52 sm:p-5 lg:size-60 lg:p-6">
            <AvatarSprite className="size-full" />
          </div>
        </div>
      </div>
    </Container>
  );
}
