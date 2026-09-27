import { ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { LinkedinIcon } from "@/components/icons/brands";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { LocalTime } from "@/components/ui/LocalTime";

export function Contact() {
  return (
    <div className="reveal card relative overflow-hidden p-6 sm:p-10">
      {/* soft accent glow in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-60 blur-3xl"
        style={{ background: "var(--accent-soft)" }}
      />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-xl">
          <p className="font-mono text-sm text-accent">
            $ ping {profile.handle}
            <span className="cursor-blink">_</span>
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-4xl">
            Let&apos;s build something together.
          </h3>
          <p className="mt-3 text-muted">
            I&apos;m always happy to talk about roles, side projects, or the last Grand Prix. The fastest way to
            reach me is email; I usually reply within a couple of days.
          </p>
          <p className="mt-4 font-mono text-xs text-subtle">
            {profile.location.city}, {profile.location.region} · <LocalTime /> right now
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 lg:w-80">
          <CopyEmail email={profile.email} />
          <a
            href={`mailto:${profile.email}`}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-strong"
          >
            <Mail className="size-4" /> Say hello
          </a>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border text-sm text-fg transition-colors hover:border-accent/60 hover:text-accent"
            >
              <LinkedinIcon className="size-3.5" /> LinkedIn <ArrowUpRight className="size-3" />
            </a>
            <a
              href={profile.resume}
              download="Sanket_Chauhan_Resume.pdf"
              className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border text-sm text-fg transition-colors hover:border-accent/60 hover:text-accent"
            >
              <Download className="size-3.5" /> Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
