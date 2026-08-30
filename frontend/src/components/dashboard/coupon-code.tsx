"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/cn";

/** Click-to-copy code chip. */
export function CouponCode({ code, disabled }: { code: string; disabled?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions or a non-secure context. The
      // code is visible either way, so there is nothing to recover from.
    }
  }

  return (
    <button
      type="button"
      onClick={() => void copy()}
      disabled={disabled}
      aria-label={copied ? `Copied ${code}` : `Copy code ${code}`}
      className={cn(
        "flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius-control)] border border-dashed px-3 py-2 transition-colors",
        disabled
          ? "cursor-not-allowed border-[var(--color-border)] opacity-50"
          : "cursor-pointer border-[var(--color-primary)] bg-[var(--color-primary-subtle)] hover:brightness-95",
      )}
    >
      <span className="font-mono text-sm font-bold tracking-wider">{code}</span>
      {/* aria-live so the confirmation is announced, not just shown. */}
      <span className="flex items-center gap-1 text-xs font-semibold" aria-live="polite">
        {copied ? (
          <>
            <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
            Copied
          </>
        ) : (
          <>
            <Copy className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            Copy
          </>
        )}
      </span>
    </button>
  );
}
