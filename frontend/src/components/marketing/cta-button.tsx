import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * The site's call to action.
 *
 * Same brand colours as before; the movement is what is new. Three things
 * happen on hover, all cheap: a light sheen sweeps across, the arrow slides,
 * and the whole control lifts a little. On press it dips.
 *
 * Only `transform` and `opacity` are animated. Both are composited, so none of
 * this touches layout and none of it can shift the page around it. The global
 * `prefers-reduced-motion` rule in globals.css flattens every duration here to
 * near zero, so a visitor who asked for stillness gets a plain button that
 * still shows its hover and focus states.
 *
 * No client JavaScript: it is CSS on `group-hover`, so this stays a Server
 * Component and ships nothing to the browser.
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group pill relative isolate inline-flex items-center gap-2 overflow-hidden font-semibold",
        "transition-transform duration-200 ease-out will-change-transform",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        // The focus ring must survive the overflow-hidden used for the sheen.
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
        size === "lg" ? "min-h-14 px-8 text-base" : "min-h-12 px-7 text-[15px]",
        variant === "primary"
          ? "brand-gradient-bg text-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-raised)]"
          : "border-2 border-[var(--color-border)] text-[var(--brand-ink)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]",
        className,
      )}
    >
      {/* The sheen. Skewed and parked off the left edge, it crosses on hover.
          Purely decorative, so it is hidden from assistive tech and sits
          behind the label rather than over it. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 -left-full -z-10 w-1/2 -skew-x-12",
          "transition-transform duration-700 ease-out",
          "group-hover:translate-x-[400%]",
          variant === "primary"
            ? "bg-gradient-to-r from-transparent via-white/30 to-transparent"
            : "bg-gradient-to-r from-transparent via-[var(--color-primary-subtle)] to-transparent",
        )}
      />

      {children}

      <ArrowRight
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
        strokeWidth={2}
        aria-hidden="true"
      />
    </Link>
  );
}
