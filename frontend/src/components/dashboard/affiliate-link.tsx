"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  name,
  packages,
}: {
  baseUrl: string;
  code: string;
  /** The member's name, shown beside their code as on a referral card. */
  name: string;
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
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-[var(--brand-ink)]">My referral code</span>
        <div className="flex min-h-12 items-center justify-between gap-3 rounded-[12px] bg-[var(--brand-hero-wash)] px-4 ring-1 ring-[rgb(16_26_71/0.1)]">
          <span className="truncate text-[15px] font-medium text-[var(--brand-ink)]">{name}</span>
          <span className="shrink-0 font-mono text-[14px] font-bold text-[var(--brand-green)]">{code}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="link-for" className="text-sm font-medium text-[var(--brand-ink)]">
          Generate link for
        </label>
        <select
          id="link-for"
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
            setCopied(false);
          }}
          className="min-h-12 rounded-[12px] border border-[rgb(16_26_71/0.15)] bg-white px-4 text-[16px] font-medium text-[var(--brand-ink)]"
        >
          {packages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} package — {formatPrice(p.priceInPaise)}
            </option>
          ))}
          <option value="">Homepage — any package</option>
        </select>
      </div>

      <div className="flex min-h-11 min-w-0 items-center rounded-[12px] bg-[var(--brand-hero-wash)] px-3 py-2.5 ring-1 ring-[rgb(16_26_71/0.08)]">
        <span className="truncate font-mono text-[13px] text-[var(--brand-ink)]/80">{url}</span>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={() => void copy()}
          className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(90deg,#0e7a4a,#0b4a34_45%,#101a47)] px-6 text-[16px] font-semibold text-white shadow-[0_14px_28px_-16px_rgb(16_26_71/0.8)] transition-opacity hover:opacity-95"
        >
          {copied ? (
            <>
              <Check className="size-5" strokeWidth={2.2} aria-hidden="true" />
              Link copied
            </>
          ) : (
            <>
              <Copy className="size-5" strokeWidth={1.8} aria-hidden="true" />
              Copy referral link
            </>
          )}
        </button>
        <Button
          variant="secondary"
          onClick={() => void share()}
          aria-label="Share your referral link"
          className="min-h-13 sm:w-auto"
        >
          <Share2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Share
        </Button>
      </div>

      {/* Announced politely so a screen reader confirms the copy happened. */}
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>

      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
        {selected
          ? `The link opens signup with the ${selected.name} package already selected, with your referral ID ${code} applied.`
          : `The link opens the homepage with your referral ID ${code} applied — they can pick any package.`}{" "}
        Anyone who signs up through it is credited to you for 30 days after their first visit.
      </p>
    </div>
  );
}
