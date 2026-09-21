"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

type LinkPackage = { slug: string; name: string; priceInPaise: number };

/**
 * Copyable affiliate link, with a native share sheet on mobile.
 *
 * The member picks what the link sells: the general homepage link, or one of
 * the packages — which lands the new person on signup with that package
 * preselected. Every variant carries the member's referral ID.
 */
export function AffiliateLink({
  baseUrl,
  code,
  packages,
}: {
  baseUrl: string;
  code: string;
  packages: LinkPackage[];
}) {
  const [copied, setCopied] = useState(false);
  const [target, setTarget] = useState<string>(packages[0]?.slug ?? "");
  const url = target
    ? `${baseUrl}/register?ref=${code}&plan=${target}`
    : `${baseUrl}/?ref=${code}`;
  const selected = packages.find((p) => p.slug === target);

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
        text: selected
          ? `Join NextMentor with the ${selected.name} package:`
          : "I'm learning on NextMentor — join me:",
        url,
      });
    } catch {
      // The user dismissed the share sheet. Not an error.
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="min-w-0">
        <legend className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted-foreground)]">
          Link for
        </legend>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[...packages.map((p) => ({ slug: p.slug, label: p.name, price: formatPrice(p.priceInPaise) })), { slug: "", label: "Homepage", price: "Any package" }].map((opt) => {
            const active = opt.slug === target;
            return (
              <button
                key={opt.slug || "home"}
                type="button"
                onClick={() => {
                  setTarget(opt.slug);
                  setCopied(false);
                }}
                aria-pressed={active}
                className={cn(
                  "flex min-h-14 flex-col items-start justify-center rounded-[14px] px-3.5 py-2 text-left ring-1 transition-colors",
                  active
                    ? "bg-[var(--brand-ink)] text-white ring-[var(--brand-ink)]"
                    : "bg-white text-[var(--brand-ink)] ring-[rgb(16_26_71/0.12)] hover:ring-[rgb(16_26_71/0.25)]",
                )}
              >
                <span className="text-[14px] font-semibold">{opt.label}</span>
                <span className={cn("tabular text-[12px]", active ? "text-white/70" : "text-[var(--color-muted-foreground)]")}>
                  {opt.price}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex min-h-11 min-w-0 flex-1 items-center rounded-[12px] bg-[var(--brand-hero-wash)] px-3 py-2.5 ring-1 ring-[rgb(16_26_71/0.08)]">
          <span className="truncate font-mono text-[13px] text-[var(--brand-ink)]">{url}</span>
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

      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
        Your referral ID <span className="font-mono font-bold text-[var(--brand-ink)]">{code}</span> is in
        the link.{" "}
        {selected
          ? `It opens signup with the ${selected.name} package already selected.`
          : "It opens the homepage, where they can pick any package."}{" "}
        Anyone who signs up through it is credited to you for 30 days after their first visit.
      </p>
    </div>
  );
}
