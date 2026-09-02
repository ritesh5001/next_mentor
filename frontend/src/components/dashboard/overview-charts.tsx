"use client";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatPrice } from "@/lib/format";

/**
 * The two charts on the overview.
 *
 * Client components, and the only ones on the page: Recharts measures the DOM,
 * so it cannot render on the server. Everything else here stays a Server
 * Component, which keeps the chart library out of every other route's bundle.
 *
 * Colours come from the brand tokens rather than Recharts' defaults. They are
 * read at render rather than hard-coded so the charts follow a theme switch.
 */

function token(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/* ------------------------------------------------------- earnings series */

export function EarningsChart({
  data,
}: {
  data: Array<{ day: string; amountInPaise: number }>;
}) {
  const blue = token("--brand-blue", "#1b3fa0");
  const green = token("--brand-green", "#22c55e");
  const grid = token("--color-border", "#e2e8f0");
  const muted = token("--color-muted-foreground", "#64748b");

  const points = data.map((d) => ({
    label: new Date(`${d.day}T00:00:00Z`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
    }),
    rupees: d.amountInPaise / 100,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={green} stopOpacity={0.35} />
              <stop offset="100%" stopColor={blue} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: muted }}
            axisLine={{ stroke: grid }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: muted }}
            axisLine={false}
            tickLine={false}
            width={52}
            tickFormatter={(v: number) => `₹${v}`}
          />
          <Tooltip
            cursor={{ stroke: grid }}
            formatter={(v) => [formatPrice(Number(v) * 100), "Earned"] as [string, string]}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${grid}`,
              fontSize: 12,
              background: token("--color-card", "#ffffff"),
              color: token("--color-foreground", "#0f172a"),
            }}
          />
          <Area
            type="monotone"
            dataKey="rupees"
            stroke={blue}
            strokeWidth={2}
            fill="url(#earn)"
            // A dot on every point, because a week with one sale is otherwise
            // a flat line with nothing to hover.
            dot={{ r: 3, fill: blue, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            // No entrance animation. Recharts draws the path immediately but
            // holds it at zero opacity until its rAF loop runs, so anything
            // that does not animate — a headless render, a print, a browser
            // throttling background tabs — showed bare dots and no line. A
            // chart is data, and data should be readable on the first frame.
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ----------------------------------------------------------- sales donut */

export function SalesDonut({
  data,
  total,
}: {
  data: Array<{ planName: string; count: number }>;
  total: number;
}) {
  const palette = [
    token("--brand-blue", "#1b3fa0"),
    token("--brand-green-deep", "#12a150"),
    token("--brand-blue-bright", "#2e6fd4"),
    token("--brand-green", "#22c55e"),
    token("--color-accent", "#d97706"),
  ];

  if (total === 0) {
    return (
      <p className="flex h-56 items-center justify-center text-center text-sm text-[var(--color-muted-foreground)]">
        No sales in the last six months yet.
      </p>
    );
  }

  const top = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="relative h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={top}
            dataKey="count"
            nameKey="planName"
            innerRadius="62%"
            outerRadius="88%"
            paddingAngle={2}
            stroke="none"
            // Same reason as the area chart: the ring was drawn but invisible
            // until the animation ran.
            isAnimationActive={false}
          >
            {top.map((_, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v, n) =>
              [`${Number(v)} sale${Number(v) === 1 ? "" : "s"}`, String(n)] as [string, string]
            }
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${token("--color-border", "#e2e8f0")}`,
              fontSize: 12,
              background: token("--color-card", "#ffffff"),
              color: token("--color-foreground", "#0f172a"),
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* The best-selling plan, in the hole. Purely decorative: the same
          numbers are in the legend below, which is what a screen reader reads. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      >
        <span className="max-w-[7rem] truncate text-center text-xs font-bold text-[var(--color-foreground)]">
          {top[0]?.planName}
        </span>
        <span className="tabular text-2xl font-extrabold text-[var(--color-foreground)]">
          {top[0]?.count}
        </span>
      </div>
    </div>
  );
}
