/**
 * Display formatting. Pure — safe on both server and client.
 */

/** Integer paise -> "₹2,499". Never takes a float. */
export function formatPrice(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: paise % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(paise / 100);
}

/** Seconds -> "1h 24m" / "8m" / "45s". Used on catalog cards and curricula. */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) return "—";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
  if (m > 0) return `${m}m`;
  return `${totalSeconds}s`;
}

/** Seconds -> "12:04", for the timestamp beside a lesson row. */
export function formatTimestamp(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function discountPercent(priceInPaise: number, mrpInPaise: number | null): number | null {
  if (!mrpInPaise || mrpInPaise <= priceInPaise) return null;
  return Math.round(((mrpInPaise - priceInPaise) / mrpInPaise) * 100);
}

/**
 * Builds a public asset URL from an R2 object key.
 *
 * Keys are stored rather than URLs so the CDN domain can change without a data
 * migration.
 */
export function assetUrl(key: string | null | undefined): string | null {
  if (!key) return null;
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
}
