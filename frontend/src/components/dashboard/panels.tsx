import { cn } from "@/lib/cn";

/**
 * The dashboard's shared furniture.
 *
 * These reproduce the structural patterns of the reference dashboard the
 * client supplied: a titled panel with a solid header bar, read-only details
 * shown as boxed label/value pairs, coloured metric tiles, and dense data
 * tables with a dark header row.
 *
 * The layout and information hierarchy are copied deliberately. The look is
 * the marketing site's: white rounded cards on the wash, navy and green
 * gradients for emphasis, and green for money — so moving from the homepage
 * into the dashboard does not feel like changing products.
 */

/* ------------------------------------------------------------------ panel */

/** A titled card. The header bar is what makes a page read as sections. */
export function Panel({
  title,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[22px] bg-[var(--color-card)] shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)] ring-1 ring-[rgb(16_26_71/0.07)]",
        className,
      )}
    >
      {title && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgb(16_26_71/0.07)] px-5 py-4 sm:px-6">
          <h2 className="flex items-center gap-2.5 text-[15.5px] font-semibold tracking-[-0.2px] text-[var(--brand-ink)]">
            <span aria-hidden="true" className="h-4 w-1 rounded-full bg-[linear-gradient(180deg,#3ddc72,#12a150)]" />
            {title}
          </h2>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn("p-5 sm:p-6", bodyClassName)}>{children}</div>
    </section>
  );
}

/* ----------------------------------------------------------- detail field */

/**
 * A read-only value in a bordered box, label above.
 *
 * The reference shows identity and sponsor data this way rather than as a
 * definition list. It reads as "these are your records" instead of as a form
 * you are about to edit, which is the point: none of it is editable here.
 */
export function DetailField({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[4.25rem] flex-col justify-center gap-1 rounded-[14px] bg-[var(--brand-hero-wash)] px-4 py-3 ring-1 ring-[rgb(16_26_71/0.05)]",
        className,
      )}
    >
      <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted-foreground)]">
        {label}
      </dt>
      <dd className="truncate text-sm font-semibold text-[var(--color-foreground)]">
        {value || <span className="font-normal text-[var(--color-muted-foreground)]">Not set</span>}
      </dd>
    </div>
  );
}

/** Wraps DetailFields. A <dl> because these really are term/value pairs. */
export function DetailGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <dl className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>{children}</dl>
  );
}

/* -------------------------------------------------------------- stat tile */

export type StatTone = "primary" | "success" | "info" | "warning" | "danger" | "neutral" | "money";

/** Icon-tile gradient per tone. Money is green, as it is on the homepage. */
const TONE: Record<StatTone, string> = {
  money: "linear-gradient(145deg,#12a150,#0b4a34)",
  success: "linear-gradient(145deg,#3ddc72,#12a150)",
  primary: "linear-gradient(145deg,#2e6fd4,#1b3fa0)",
  info: "linear-gradient(145deg,#2e6fd4,#101a47)",
  neutral: "linear-gradient(145deg,#1b3fa0,#101a47)",
  warning: "linear-gradient(145deg,#f59e0b,#b45309)",
  danger: "linear-gradient(145deg,#ef4444,#b91c1c)",
};

/**
 * A metric tile: white card, figure first, with the tone carried by a
 * gradient icon tile rather than a painted background — a row of these reads
 * as one family instead of a rainbow.
 */
export function StatTile({
  label,
  value,
  hint,
  icon,
  tone = "primary",
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ReactNode;
  tone?: StatTone;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-[20px] bg-[var(--color-card)] p-5 shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)] ring-1 ring-[rgb(16_26_71/0.07)]">
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
          {label}
        </span>
        <span className="tabular text-[26px] font-semibold leading-tight tracking-[-0.6px] text-[var(--brand-ink)]">
          {value}
        </span>
        {hint && <span className="text-[12px] leading-snug text-[var(--color-muted-foreground)]">{hint}</span>}
      </div>
      {icon && (
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-[0_10px_20px_-10px_rgb(16_26_71/0.6)] [&>svg]:size-5"
          style={{ background: TONE[tone] }}
        >
          {icon}
        </span>
      )}
    </div>
  );
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    // Four across at most: a tile narrower than ~240px squeezes its figure
    // against the icon tile.
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{children}</div>
  );
}

/* ------------------------------------------------------------- data table */

/**
 * A dense table.
 *
 * Always inside its own horizontal scroller: these carry six to nine columns
 * and must not make the whole page scroll sideways on a phone.
 */
export function DataTable({
  head,
  children,
  empty,
  minWidth = 720,
}: {
  head: React.ReactNode[];
  children: React.ReactNode;
  /** Rendered instead of the table when there are no rows. */
  empty?: React.ReactNode;
  minWidth?: number;
}) {
  if (empty) {
    return (
      <p className="rounded-[16px] border border-dashed border-[rgb(16_26_71/0.14)] bg-[var(--brand-hero-wash)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
        {empty}
      </p>
    );
  }

  return (
    <div className="-mx-5 overflow-x-auto sm:-mx-6">
      <div className="inline-block min-w-full px-5 align-middle sm:px-6">
        <table className="w-full text-sm" style={{ minWidth }}>
          <thead>
            <tr className="bg-[var(--brand-hero-wash)]">
              {head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-ink)]/60",
                    i === 0 && "rounded-l-[var(--radius-control)]",
                    i === head.length - 1 && "rounded-r-[var(--radius-control)]",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

/** Zebra striping, which is what makes a wide row readable across. */
export function Row({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <tr
      className={cn(
        "align-middle border-b border-[rgb(16_26_71/0.05)] transition-colors hover:bg-[var(--brand-hero-wash)]/70",
        i % 2 === 1 && "bg-[var(--brand-hero-wash)]/40",
      )}
    >
      {children}
    </tr>
  );
}

export function Cell({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <td
      className={cn(
        "px-3 py-3",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </td>
  );
}

/* ------------------------------------------------------------ page header */

/** Page title, with room on the right for a plan badge or a primary action. */
export function PageHeader({
  title,
  subtitle,
  aside,
}: {
  title: React.ReactNode;
  subtitle?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h1 className="text-[26px] font-bold leading-tight tracking-[-0.8px] text-[var(--brand-ink)] sm:text-[30px]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[15px] text-[var(--color-muted-foreground)]">{subtitle}</p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </header>
  );
}

/** The avatar stand-in used wherever a person appears without a photo. */
export function Avatar({
  name,
  size = 32,
  src,
}: {
  name: string;
  size?: number;
  src?: string | null;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, size * 0.36),
        background: "linear-gradient(145deg,#1b3fa0,#101a47)",
      }}
    >
      {initials}
    </span>
  );
}
