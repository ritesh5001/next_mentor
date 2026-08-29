"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a number when it scrolls into view.
 *
 * The reference site animates its stat tiles the same way. Respects
 * prefers-reduced-motion by jumping straight to the final value — a number
 * ticking upward is decorative, and the value is the actual content.
 */
export function Counter({
  to,
  suffix = "",
  durationMs = 1400,
}: {
  to: number;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Seeded with the real number: the server renders the correct figure, so a
  // visitor never sees "0+ learners" while JavaScript loads or if it fails.
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;

        // The count-up is decorative and the number is the real content, so
        // reduced-motion simply leaves the seeded value in place.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        setValue(0);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // easeOutCubic — fast at first, settles gently on the final number.
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
