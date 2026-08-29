import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "error" | "success" | "info";

const tones = {
  error: {
    Icon: AlertCircle,
    className:
      "bg-[var(--color-destructive-subtle)] text-[var(--color-destructive)] border-[var(--color-destructive)]/25",
  },
  success: {
    Icon: CheckCircle2,
    className:
      "bg-[var(--color-success-subtle)] text-[var(--color-success)] border-[var(--color-success)]/25",
  },
  info: {
    Icon: Info,
    className:
      "bg-[var(--color-primary-subtle)] text-[var(--color-primary)] border-[var(--color-primary)]/25",
  },
} as const;

/**
 * Colour alone never carries the meaning here — each tone also has a distinct
 * icon, so the message still reads correctly for anyone who cannot distinguish
 * red from green.
 */
export function Alert({
  tone = "info",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  const { Icon, className: toneClass } = tones[tone];

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={cn(
        "flex items-start gap-2.5 rounded-[var(--radius-control)] border px-3.5 py-3 text-sm font-medium",
        toneClass,
        className,
      )}
    >
      <Icon className="mt-px size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}
