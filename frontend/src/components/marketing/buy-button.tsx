"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Tag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { formatPrice } from "@/lib/format";
import { useRazorpayCheckout } from "@/lib/use-razorpay-checkout";
import type { CheckoutResult, CouponPreview, ItemType } from "@nextmentor/shared";

type Props = {
  itemType: ItemType;
  slug: string;
  /** Undiscounted price, in paise. */
  priceInPaise: number;
  razorpayKeyId: string;
  /** Where to send the buyer once ownership is confirmed. */
  successPath: string;
  allowCoupon?: boolean;
  /** The verb on the button — "Upgrade now" reads better than "Enrol" there. */
  actionLabel?: string;
  /** Open the payment window as soon as the button mounts (e.g. right after sign-in). */
  autoStart?: boolean;
  createCheckout: (input: {
    itemType: ItemType;
    slug: string;
    couponCode?: string;
  }) => Promise<CheckoutResult>;
  previewCoupon: (input: {
    code: string;
    itemType: ItemType;
    slug: string;
  }) => Promise<CouponPreview>;
  pollOwnership: (input: { itemType: ItemType; slug: string }) => Promise<{ owned: boolean }>;
};

export function BuyButton({
  itemType,
  slug,
  priceInPaise,
  razorpayKeyId,
  successPath,
  allowCoupon = true,
  actionLabel = "Enrol now",
  autoStart = false,
  createCheckout,
  previewCoupon,
  pollOwnership,
}: Props) {
  const { start, phase, error } = useRazorpayCheckout({
    itemType,
    slug,
    successPath,
    razorpayKeyId,
    createCheckout,
    pollOwnership,
  });

  const [couponOpen, setCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponChecking, setCouponChecking] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [applied, setApplied] = useState<{
    code: string;
    discountInPaise: number;
    finalAmountInPaise: number;
  } | null>(null);

  const payable = applied?.finalAmountInPaise ?? priceInPaise;

  const applyCoupon = useCallback(async () => {
    const code = couponInput.trim();
    if (!code) return;

    setCouponChecking(true);
    setCouponError(null);

    const result = await previewCoupon({ code, itemType, slug });

    if (result.valid) {
      setApplied({
        code: result.code,
        discountInPaise: result.discountInPaise,
        finalAmountInPaise: result.finalAmountInPaise,
      });
      setCouponInput("");
    } else {
      setCouponError(result.reason);
      setApplied(null);
    }
    setCouponChecking(false);
  }, [couponInput, itemType, previewCoupon, slug]);

  const handleClick = useCallback(() => void start(applied?.code), [applied, start]);

  // Fire once, not on every re-render the checkout state causes.
  const autoStarted = useRef(false);
  useEffect(() => {
    if (!autoStart || autoStarted.current) return;
    autoStarted.current = true;
    void start();
  }, [autoStart, start]);

  return (
    <div className="flex flex-col gap-3">
      {applied && (
        <div className="flex items-center justify-between gap-2 rounded-[var(--radius-control)] bg-[var(--color-success-subtle)] px-3 py-2 text-sm">
          <span className="flex min-w-0 items-center gap-1.5 font-medium text-[var(--color-success)]">
            <Tag className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span className="truncate">{applied.code}</span>
          </span>
          <span className="flex items-center gap-2">
            {/* Amber marks money saved — the one thing amber is for. */}
            <span className="tabular font-bold text-[var(--color-accent)]">
              −{formatPrice(applied.discountInPaise)}
            </span>
            <button
              type="button"
              onClick={() => setApplied(null)}
              aria-label={`Remove coupon ${applied.code}`}
              className="flex size-6 items-center justify-center rounded text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              <X className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
          </span>
        </div>
      )}

      <Button size="lg" className="w-full" loading={phase !== "idle"} onClick={handleClick}>
        {phase === "confirming" ? "Confirming payment…" : `${actionLabel} — ${formatPrice(payable)}`}
      </Button>

      {allowCoupon && !applied && (
        couponOpen ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2">
              <label htmlFor="coupon" className="sr-only">
                Coupon code
              </label>
              <input
                id="coupon"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void applyCoupon();
                  }
                }}
                placeholder="COUPON CODE"
                autoComplete="off"
                aria-invalid={couponError ? true : undefined}
                aria-describedby={couponError ? "coupon-error" : undefined}
                className="min-h-11 flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px] uppercase tracking-wide"
              />
              <Button
                type="button"
                variant="secondary"
                loading={couponChecking}
                onClick={() => void applyCoupon()}
              >
                Apply
              </Button>
            </div>
            {couponError && (
              <p id="coupon-error" role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
                {couponError}
              </p>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCouponOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            <Tag className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            Have a coupon code?
          </button>
        )
      )}

      {error && <Alert tone="info">{error}</Alert>}

      <p className="text-center text-xs text-[var(--color-muted-foreground)]">
        Secure payment via Razorpay · UPI, cards, netbanking
      </p>
    </div>
  );
}
