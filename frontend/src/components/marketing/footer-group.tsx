"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * A footer column that collapses on phones and is always open from sm up.
 *
 * Three stacked lists of links eat most of a phone screen, so below sm each
 * column is a tappable heading. From sm up the panel is forced visible by
 * `sm:block` and the heading stops taking pointer events, so it reads as a
 * plain heading rather than a control that does nothing.
 */
export function FooterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 sm:border-b-0">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-white",
            "sm:pointer-events-none sm:py-0 sm:pb-5",
          )}
        >
          {title}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform duration-200 sm:hidden",
              open && "rotate-180",
            )}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </h2>

      <div className={cn("pb-4 sm:block sm:pb-0", open ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  );
}
