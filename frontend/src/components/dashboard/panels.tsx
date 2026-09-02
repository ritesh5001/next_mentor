import { cn } from "@/lib/cn";

/**
 * The dashboard's shared furniture.
 *
 * These reproduce the structural patterns of the reference dashboard the
 * client supplied: a titled panel with a solid header bar, read-only details
 * shown as boxed label/value pairs, coloured metric tiles, and dense data
 * tables with a dark header row.
 *
 * The layout and information hierarchy are copied deliberately. The palette is
 * not: everything below draws on NextMentor's own tokens, and amber stays
 * reserved for money, so a metric tile showing a rupee figure looks different
 * from one counting leads on purpose.
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
        "overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {title && (
        <header
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-white sm:px-5"
          style={{ background: "var(--brand-gradient)" }}
        >
          <h2 className="text-sm font-bold tracking-wide">{title}</h2>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
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
        "flex min-h-[4.25rem] flex-col justify-center gap-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3",
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

const TONE: Record<StatTone, { bg: string; fg: string; sub: string }> = {
  // Money is amber wherever it appears, and nothing else is.
  money: { bg: "var(--color-accent)", fg: "var(--color-on-accent)", sub: "rgb(255 255 255 / 0.75)" },
  primary: { bg: "var(--brand-blue)", fg: "#ffffff", sub: "rgb(255 255 255 / 0.75)" },
  success: { bg: "var(--brand-green-deep)", fg: "#ffffff", sub: "rgb(255 255 255 / 0.8)" },
  info: { bg: "var(--brand-blue-bright)", fg: "#ffffff", sub: "rgb(255 255 255 / 0.8)" },
  warning: { bg: "#b45309", fg: "#ffffff", sub: "rgb(255 255 255 / 0.8)" },
  danger: { bg: "var(--color-destructive)", fg: "#ffffff", sub: "rgb(255 255 255 / 0.8)" },
  neutral: { bg: "var(--brand-ink)", fg: "#ffffff", sub: "rgb(255 255 255 / 0.7)" },
};

/**
 * A metric tile.
 *
 * `tone` is meaning, not decoration: `money` is the amber reserved for rupee
 * figures, so a row of tiles tells you which numbers are cash before you read
 * a single label.
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
  const t = TONE[tone];
  return (
    <div
      className="flex items-start justify-between gap-3 rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)]"
      style={{ background: t.bg, color: t.fg }}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ color: t.sub }}
        >
          {label}
        </span>
        <span className="tabular text-2xl font-extrabold leading-tight">{value}</span>
        {hint && (
          <span className="text-[11px] leading-snug" style={{ color: t.sub }}>
            {hint}
          </span>
        )}
      </div>
      {icon && <span className="shrink-0 opacity-40">{icon}</span>}
    </div>
  );
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-6">{children}</div>
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
      <p className="rounded-[var(--radius-control)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
        {empty}
      </p>
    );
  }

  return (
    <div className="-mx-4 overflow-x-auto sm:-mx-5">
      <div className="inline-block min-w-full px-4 align-middle sm:px-5">
        <table className="w-full text-sm" style={{ minWidth }}>
          <thead>
            <tr style={{ background: "var(--brand-ink)" }}>
              {head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide text-white",
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
    <tr className={cn("align-middle", i % 2 === 1 && "bg-[var(--color-muted)]/50")}>{children}</tr>
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
        "px-3 py-2.5",
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
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--color-border)] pb-4">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-xl font-extrabold tracking-tight text-[var(--color-foreground)] sm:text-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[var(--color-muted-foreground)]">{subtitle}</p>
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
        background: "var(--brand-gradient)",
      }}
    >
      {initials}
    </span>
  );
}
