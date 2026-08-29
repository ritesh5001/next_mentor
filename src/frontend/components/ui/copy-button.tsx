"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "./button";

/** Copies arbitrary text — a promo script, a link, a code snippet. */
export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  size = "sm",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard needs a secure context and permission. The text is on screen
      // and selectable regardless, so there is nothing to recover from.
    }
  }

  return (
    <>
      <Button type="button" variant="secondary" size={size} onClick={() => void copy()}>
        {copied ? (
          <>
            <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
            {copiedLabel}
          </>
        ) : (
          <>
            <Copy className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            {label}
          </>
        )}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${copiedLabel} to clipboard` : ""}
      </span>
    </>
  );
}
