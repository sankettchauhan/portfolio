"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Download, Menu, X } from "lucide-react";
import { navItems } from "@/content/site";
import { profile } from "@/content/profile";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Nav({ showWriting }: { showWriting: boolean }) {
  const [open, setOpen] = useState(false);
  const items = navItems.filter((i) => showWriting || i.href !== "/#writing");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b transition-colors duration-200",
        scrolled || open
          ? "border-border bg-bg/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download="Sanket_Chauhan_Resume.pdf"
            className="flex h-9 items-center gap-1.5 rounded-lg border border-accent/60 bg-accent-soft px-3 font-mono text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-accent-fg"
          >
            <Download className="size-3.5" />
            Resume
          </a>
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-lg border border-border text-muted md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] border-t border-border md:hidden">
          <ul className="flex flex-col px-4 py-4">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 border-b border-dashed border-border py-4 text-lg text-fg"
                >
                  <span className="font-mono text-xs text-accent">{"//"}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
