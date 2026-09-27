"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={clsx(
        "group flex min-w-0 items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-xs text-fg transition-colors hover:border-accent/60 sm:text-sm",
        className,
      )}
    >
      <span className="truncate">{email}</span>
      <span className="ml-auto shrink-0 text-muted group-hover:text-accent" aria-live="polite">
        {copied ? (
          <span className="flex items-center gap-1 text-accent">
            <Check className="size-3.5" /> copied
          </span>
        ) : (
          <Copy className="size-3.5" aria-label="Copy email" />
        )}
      </span>
    </button>
  );
}
