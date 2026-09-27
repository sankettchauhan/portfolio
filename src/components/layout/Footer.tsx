import { ArrowUp, FileText, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/brands";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { LocalTime } from "@/components/ui/LocalTime";

const links = [
  { label: "GitHub", href: profile.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedinIcon },
  { label: "X", href: profile.socials.x, Icon: XIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  { label: "Resume", href: profile.resume, Icon: FileText },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border">
      <Container size="wide" className="flex flex-col gap-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Logo />
            <p className="text-sm text-muted">
              {profile.role} · {profile.location.city}, {profile.location.region} ·{" "}
              <LocalTime className="font-mono text-xs" />
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {links.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="grid size-10 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-dashed border-border pt-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · built with Next.js
          </p>
          <a href="#top" className="flex items-center gap-1 hover:text-accent">
            <ArrowUp className="size-3" />
            back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
