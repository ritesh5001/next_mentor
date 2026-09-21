"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { CheckoutResult, ItemType } from "@nextmentor/shared";

// Razorpay's Checkout.js. Loaded on demand rather than in the page bundle —
// most visitors never open checkout, and it is not small.
const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function loadCheckoutScript(): Promise<boolean> {
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

export type CheckoutPhase = "idle" | "opening" | "confirming";

/**
 * Creates an order, opens the Razorpay modal, and waits for access to be
 * granted. Shared by every buy button so there is one payment path to trust.
 *
 * `start` returning a `signin` result means the visitor has no session; the
 * caller decides where to send them.
 */
export function useRazorpayCheckout({
  itemType,
  slug,
  successPath,
  razorpayKeyId,
  createCheckout,
  pollOwnership,
}: {
  itemType: ItemType;
  slug: string;
  successPath: string;
  razorpayKeyId?: string;
  createCheckout: (input: {
    itemType: ItemType;
    slug: string;
    couponCode?: string;
  }) => Promise<CheckoutResult | { status: "signin" }>;
  pollOwnership: (input: { itemType: ItemType; slug: string }) => Promise<{ owned: boolean }>;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<CheckoutPhase>("idle");
  const [error, setError] = useState<string | null>(null);

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

  const start = useCallback(
    async (couponCode?: string): Promise<"signin" | void> => {
      setError(null);
      setPhase("opening");

      const result = await createCheckout({ itemType, slug, couponCode });

      if (result.status === "signin") {
        setPhase("idle");
        return "signin";
      }
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
        key: razorpayKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        order_id: result.razorpayOrderId,
        amount: result.amountInPaise,
        currency: result.currency,
        name: "NextMentor",
        description: result.itemTitle,
        prefill: { name: result.prefill.name, email: result.prefill.email },
        theme: { color: "#1b3fa0" },
        handler: () => void waitForOwnership(),
        modal: { ondismiss: () => setPhase("idle") },
      });

      rzp.open();
    },
    [createCheckout, itemType, razorpayKeyId, router, slug, successPath, waitForOwnership],
  );

  return { start, phase, error };
}
