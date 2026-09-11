import * as React from "react";

import { cn } from "@/lib/cn";

/**
 * Pill CTA whose fill wipes downward into frosted glass on hover.
 *
 * The two states and their timing live in the `.btn-liquid` utility in
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
        // Radius, fill, blur, colours, shadow and focus ring all come from
        // .btn-liquid — see globals.css.
        "btn-liquid inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 px-7 text-[15px] font-bold",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {/* stroke="currentColor" so the icon inverts with the label instead of
          needing a rule of its own. */}
      <svg
        className="size-[18px] shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {label}
    </button>
  );
}
