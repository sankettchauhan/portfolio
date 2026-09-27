import Link from "next/link";
import { profile } from "@/content/profile";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${profile.name}, home`}
      className="group flex items-center gap-1.5 font-mono text-sm font-medium text-fg"
    >
      <span className="text-accent">~/</span>
      <span className="transition-colors group-hover:text-accent">{profile.handle}</span>
      <span aria-hidden className="cursor-blink inline-block h-4 w-2 bg-accent" />
    </Link>
  );
}
