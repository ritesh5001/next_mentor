"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

function remaining(endsAt: number): string | null {
  const ms = endsAt - Date.now();
  if (ms <= 0) return null;
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

/**
 * Counts down the upgrade window. Purely informational: the price itself is
 * decided by the API when checkout is created, so a stalled tab cannot buy at
 * yesterday's price.
 */
export function UpgradeCountdown({ windowEndsAt }: { windowEndsAt: string }) {
  const endsAt = new Date(windowEndsAt).getTime();
  const [left, setLeft] = useState<string | null>(() => remaining(endsAt));

  useEffect(() => {
    const id = setInterval(() => setLeft(remaining(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (!left) return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#fff4e5] px-3 py-1.5 text-[13px] font-semibold text-[#b45309]">
      <Timer className="size-4" strokeWidth={2} aria-hidden="true" />
      Upgrade offer ends in <span className="tabular">{left}</span>
    </span>
  );
}
