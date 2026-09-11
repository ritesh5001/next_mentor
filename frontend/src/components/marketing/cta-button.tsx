import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * The site's call to action.
 *
 * Solid navy, a modest corner radius, and one thing on hover: the colour
 * deepens. The sweeping sheen, the lift and the pill radius all went — they
 * were the loudest parts of the old look, and "minimal and professional" is
 * mostly a list of effects you decided not to ship.
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
        // Focus ring and radius both come from .btn-liquid. A Tailwind
        // `focus-visible:outline-none` here would cancel its outline.
        "group inline-flex items-center justify-center gap-2 font-semibold",
        size === "lg" ? "min-h-12 px-7 text-[15px]" : "min-h-11 px-5 text-sm",
        "btn-liquid",
        variant === "outline" && "btn-liquid--outline",
        className,
      )}
    >
      {children}

      <ArrowRight
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
        strokeWidth={2}
        aria-hidden="true"
      />
    </Link>
  );
}
