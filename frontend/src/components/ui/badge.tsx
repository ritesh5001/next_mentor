import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "money";

const tones: Record<Tone, string> = {
  neutral: "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
  primary: "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]",
  success: "bg-[var(--color-success-subtle)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-subtle)] text-[var(--color-warning)]",
  danger: "bg-[var(--color-destructive-subtle)] text-[var(--color-destructive)]",
  money: "bg-[var(--color-accent-subtle)] text-[var(--color-accent)]",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
