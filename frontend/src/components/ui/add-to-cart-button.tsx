import * as React from "react";
import { ShoppingBag } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Pill CTA that turns to frosted glass on hover.
 *
 * The two states and their timing live in the `.btn-glass` utility in
 * globals.css, not here, so the marketing CtaButton and the shared Button can
 * wear the same treatment without three copies of the same transition list.
 *
 * Sized with min-h-12 rather than a fixed height: the label can wrap on a
 * narrow phone without the icon and text colliding.
 */
export interface AddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function AddToCartButton({
  label = "Add To Cart",
  className,
  type = "button",
  ...props
}: AddToCartButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "btn-glass inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-bold",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <ShoppingBag className="size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  );
}
