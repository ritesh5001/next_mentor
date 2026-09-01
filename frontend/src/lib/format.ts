import { envUrl } from "@nextmentor/shared";

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
 * Builds a public asset URL from an ImageKit file path.
 *
 * Paths are stored rather than absolute URLs so the delivery endpoint can
 * change without a data migration.
 *
 * `width` uses ImageKit's on-the-fly transforms: `f-auto` serves WebP or AVIF
 * based on the browser's Accept header, and `q-auto` picks quality from the
 * image. That means an oversized upload is still delivered at a sane size,
 * which is the main reason to prefer this over serving raw objects.
 */
export function assetUrl(
  key: string | null | undefined,
  opts: { width?: number; quality?: number } = {},
): string | null {
  if (!key) return null;
  // OAuth avatars and legacy records are already absolute.
  if (key.startsWith("http://") || key.startsWith("https://")) return key;

  const base = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  if (!base) return null;

  const url = `${base.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}`;
  const tr = [opts.width ? `w-${opts.width}` : null, `q-${opts.quality ?? "auto"}`, "f-auto"]
    .filter(Boolean)
    .join(",");

  return `${url}?tr=${tr}`;
}

/**
 * Formats a date that may be a Date or an ISO string.
 *
 * Everything now arrives over JSON, where a Date is serialised to a string.
 * Calling .toLocaleDateString() on that string is a runtime crash, so every
 * render path goes through here instead.
 */
export function formatDate(
  value: Date | string | null | undefined,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" },
): string {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-IN", options);
}

export function formatDateTime(value: Date | string | null | undefined): string {
  return formatDate(value, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** True when an ISO string or Date is in the past. */
export function isPast(value: Date | string | null | undefined): boolean {
  if (!value) return false;
  const d = value instanceof Date ? value : new Date(value);
  return !Number.isNaN(d.getTime()) && d.getTime() <= Date.now();
}

/** The public site's own origin, for building shareable links. */
export function appUrl(): string {
  return envUrl(process.env.NEXT_PUBLIC_APP_URL, "http://localhost:3000");
}
