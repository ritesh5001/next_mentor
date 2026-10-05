"use client";

import { useEffect, useRef, useState } from "react";

import { formatPrice } from "@/lib/format";

/**
 * An amount that counts up from ₹0 when the page loads.
 *
 * When the live dashboard refreshes and the figure changes, it counts from the
 * old amount to the new one rather than restarting at zero every 30 seconds.
 * Frames in between show whole rupees, so paise do not flicker; the last frame
 * is the exact amount. Reduced-motion users get the final figure at once.
 */
export function CountUpPrice({
  paise,
  durationMs = 1400,
}: {
  paise: number;
  durationMs?: number;
}) {
  const [shown, setShown] = useState(0);
  // What is on screen right now — the next animation starts from here, so an
  // interrupted count (or React re-running the effect) carries on smoothly.
  const current = useRef(0);

  useEffect(() => {
    const start = current.current;
    const show = (v: number) => {
      current.current = v;
      setShown(v);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || start === paise) {
      show(paise);
      return;
    }

    let frame = 0;
    const began = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / durationMs);
      // easeOutCubic — quick at first, settles gently on the final number.
      const eased = 1 - Math.pow(1 - t, 3);
      show(t < 1 ? Math.round((start + (paise - start) * eased) / 100) * 100 : paise);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paise, durationMs]);

  return (
    <>
      <span aria-hidden="true">{formatPrice(shown)}</span>
      {/* Screen readers get the real figure, not every intermediate frame. */}
      <span className="sr-only">{formatPrice(paise)}</span>
    </>
  );
}
