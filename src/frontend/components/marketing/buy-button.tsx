"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Tag, X } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
import { Alert } from "@/frontend/components/ui/alert";
import { formatPrice } from "@/frontend/lib/format";
import type { CheckoutResult, CouponPreview, ItemType } from "@/shared/checkout";

type Props = {
  itemType: ItemType;
  slug: string;
  /** Undiscounted price, in paise. */
  priceInPaise: number;
  razorpayKeyId: string;
  /** Where to send the buyer once ownership is confirmed. */
  successPath: string;
  allowCoupon?: boolean;
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

// Razorpay's Checkout.js. Loaded on demand rather than in the page bundle —
// most visitors never open checkout, and it is not small.
const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadCheckoutScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function BuyButton({
  itemType,
  slug,
  priceInPaise,
  razorpayKeyId,
  successPath,
  allowCoupon = true,
  createCheckout,
  previewCoupon,
  pollOwnership,
}: Props) {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "opening" | "confirming">("idle");
  const [error, setError] = useState<string | null>(null);

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

  /**
   * After the modal closes we poll for ownership instead of trusting the
   * browser's success callback. The webhook is what actually grants access, and
   * it usually lands within a second or two — but the callback payload comes
   * through the buyer's own machine, so it is not evidence of anything.
   */
  const waitForOwnership = useCallback(async () => {
    setPhase("confirming");
    for (let attempt = 0; attempt < 15; attempt++) {
      const { owned } = await pollOwnership({ itemType, slug });
      if (owned) {
        router.push(successPath);
        return;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
    // Payment almost certainly succeeded; the webhook is just slow or retrying.
    setPhase("idle");
    setError("Payment received. Access is being activated — check your dashboard in a moment.");
  }, [itemType, pollOwnership, router, slug, successPath]);

  const handleClick = useCallback(async () => {
    setError(null);
    setPhase("opening");

    const result = await createCheckout({
      itemType,
      slug,
      couponCode: applied?.code,
    });

    if (result.status === "already_owned") {
      router.push(successPath);
      return;
    }
    if (result.status === "error") {
      setError(result.message);
      setPhase("idle");
      return;
    }

    const ready = await loadCheckoutScript();
    if (!ready || !window.Razorpay) {
      setError("Could not load the payment window. Check your connection and try again.");
      setPhase("idle");
      return;
    }

    const rzp = new window.Razorpay({
      key: razorpayKeyId,
      order_id: result.razorpayOrderId,
      amount: result.amountInPaise,
      currency: result.currency,
      name: "NextMentor",
      description: result.itemTitle,
      prefill: { name: result.prefill.name, email: result.prefill.email },
      theme: { color: "#0D9488" },
      handler: () => void waitForOwnership(),
      modal: { ondismiss: () => setPhase("idle") },
    });

    rzp.open();
  }, [applied, createCheckout, itemType, razorpayKeyId, router, slug, successPath, waitForOwnership]);

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

      <Button size="lg" className="w-full" loading={phase !== "idle"} onClick={() => void handleClick()}>
        {phase === "confirming" ? "Confirming payment…" : `Enrol now — ${formatPrice(payable)}`}
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
