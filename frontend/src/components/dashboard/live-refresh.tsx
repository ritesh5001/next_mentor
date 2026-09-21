"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Keeps the income dashboard live: re-fetches the page's server data every
 * 30 seconds while the tab is visible, and shows when it last did.
 */
export function LiveRefresh({ intervalMs = 30_000 }: { intervalMs?: number }) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
    const refresh = setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
        setSeconds(0);
      }
    }, intervalMs);
    return () => {
      clearInterval(tick);
      clearInterval(refresh);
    };
  }, [intervalMs, router]);

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white ring-1 ring-white/15">
      <span aria-hidden="true" className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--brand-green-bright)] opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-[var(--brand-green-bright)]" />
      </span>
      LIVE
      <span className="font-medium text-white/60" aria-live="off">
        · {seconds < 5 ? "just now" : `${seconds}s ago`}
      </span>
    </span>
  );
}
