"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { pollOwnershipAction, startCheckoutAction } from "@/actions";
import { cn } from "@/lib/cn";
import { useRazorpayCheckout } from "@/lib/use-razorpay-checkout";

/**
 * "Buy Now" that goes straight to payment. Signed in: the Razorpay window
 * opens on this page. Signed out: create an account (membership is paid, so
 * signup leads to plan selection), with this pack preselected so its checkout
 * opens as soon as the email is verified.
 */
export function QuickBuyButton({
  slug,
  name,
  onDark = false,
}: {
  slug: string;
  name: string;
  onDark?: boolean;
}) {
  const router = useRouter();
  const { start, phase, error } = useRazorpayCheckout({
    itemType: "plan",
    slug,
    successPath: "/dashboard",
    createCheckout: startCheckoutAction,
    pollOwnership: pollOwnershipAction,
  });

  const busy = phase !== "idle";

  const onClick = async () => {
    if (busy) return;
    const outcome = await start();
    if (outcome === "signin") {
      router.push(`/register?plan=${slug}`);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={() => void onClick()}
        aria-busy={busy}
        aria-label={`Buy the ${name} pack`}
        className={cn(
          "group inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-[15px] font-semibold transition-colors disabled:cursor-wait",
          onDark
            ? "text-white ring-[1.5px] ring-white/80 hover:bg-white/10"
            : "bg-[#0b4a34] text-white hover:bg-[#0e5a40]",
        )}
        disabled={busy}
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-white text-[#0b4a34]">
          {busy ? (
            <Loader2 className="size-4 animate-spin" strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <ArrowUpRight
              className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          )}
        </span>
        {phase === "confirming" ? "Confirming…" : phase === "opening" ? "Opening…" : "Buy Now"}
      </button>
      {error && (
        <p role="alert" className={cn("max-w-[34ch] text-[13px]", onDark ? "text-white/85" : "text-[#9f1239]")}>
          {error}
        </p>
      )}
    </div>
  );
}
