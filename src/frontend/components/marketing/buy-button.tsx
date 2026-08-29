"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/frontend/components/ui/button";
import { Alert } from "@/frontend/components/ui/alert";
import type { CheckoutResult } from "@/shared/checkout";

type Props = {
  courseSlug: string;
  priceLabel: string;
  razorpayKeyId: string;
  createCheckout: (slug: string) => Promise<CheckoutResult>;
  pollEnrollment: (slug: string) => Promise<{ enrolled: boolean }>;
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
  courseSlug,
  priceLabel,
  razorpayKeyId,
  createCheckout,
  pollEnrollment,
}: Props) {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "opening" | "confirming">("idle");
  const [error, setError] = useState<string | null>(null);

  /**
   * After the modal closes we poll for the enrollment instead of trusting the
   * browser's success callback. The webhook is what actually grants access, and
   * it usually lands within a second or two — but the callback payload comes
   * through the buyer's own machine, so it is not evidence of anything.
   */
  const waitForEnrollment = useCallback(async () => {
    setPhase("confirming");
    for (let attempt = 0; attempt < 15; attempt++) {
      const { enrolled } = await pollEnrollment(courseSlug);
      if (enrolled) {
        router.push(`/learn/${courseSlug}`);
        return;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
    // Payment almost certainly succeeded; the webhook is just slow or retrying.
    setPhase("idle");
    setError(
      "Payment received. Access is being activated — check your dashboard in a moment.",
    );
  }, [courseSlug, pollEnrollment, router]);

  const handleClick = useCallback(async () => {
    setError(null);
    setPhase("opening");

    const result = await createCheckout(courseSlug);

    if (result.status === "already_enrolled") {
      router.push(`/learn/${courseSlug}`);
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
      description: result.courseTitle,
      prefill: { name: result.prefill.name, email: result.prefill.email },
      theme: { color: "#0D9488" },
      handler: () => void waitForEnrollment(),
      modal: {
        ondismiss: () => {
          setPhase("idle");
        },
      },
    });

    rzp.open();
  }, [courseSlug, createCheckout, razorpayKeyId, router, waitForEnrollment]);

  // Nothing to clean up, but make sure a stuck "confirming" state cannot
  // outlive the component if the user navigates away mid-poll.
  useEffect(() => () => setPhase("idle"), []);

  return (
    <div className="flex flex-col gap-3">
      <Button
        size="lg"
        className="w-full"
        loading={phase !== "idle"}
        onClick={() => void handleClick()}
      >
        {phase === "confirming" ? "Confirming payment…" : `Enrol now — ${priceLabel}`}
      </Button>

      {error && <Alert tone="info">{error}</Alert>}

      <p className="text-center text-xs text-[var(--color-muted-foreground)]">
        Secure payment via Razorpay · UPI, cards, netbanking
      </p>
    </div>
  );
}
