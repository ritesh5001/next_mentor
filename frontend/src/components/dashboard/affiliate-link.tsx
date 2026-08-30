"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Copyable affiliate link, with a native share sheet on mobile. */
export function AffiliateLink({ url, code }: { url: string; code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard needs a secure context and permission. The link is visible
      // and selectable either way, so there is nothing to recover from.
    }
  }

  async function share() {
    if (!navigator.share) return void copy();
    try {
      await navigator.share({
        title: "Learn digital skills that pay",
        text: "I'm learning on NextMentor — join me:",
        url,
      });
    } catch {
      // The user dismissed the share sheet. Not an error.
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-2.5">
          <span className="truncate font-mono text-sm">{url}</span>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => void copy()} className="flex-1 sm:flex-none">
            {copied ? (
              <>
                <Check className="size-4" strokeWidth={2} aria-hidden="true" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Copy link
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={() => void share()}
            aria-label="Share your affiliate link"
            className="flex-1 sm:flex-none"
          >
            <Share2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Share
          </Button>
        </div>
      </div>

      {/* Announced politely so a screen reader confirms the copy happened. */}
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>

      <p className="text-xs text-[var(--color-muted-foreground)]">
        Your code is <span className="font-mono font-bold">{code}</span>. Anyone who signs up
        through this link is credited to you for 30 days after their first visit.
      </p>
    </div>
  );
}
