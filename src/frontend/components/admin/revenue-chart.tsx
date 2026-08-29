"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatPrice } from "@/frontend/lib/format";

export type RevenuePoint = { day: string; totalInPaise: number; orders: number };

function shortDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const hasRevenue = data.some((d) => d.totalInPaise > 0);

  // An axis frame with a flat line at zero reads as "broken", not "no sales".
  if (!hasRevenue) {
    return (
      <div className="flex h-64 items-center justify-center rounded-[var(--radius-control)] border border-dashed border-[var(--color-border)] text-center">
        <p className="max-w-xs px-6 text-sm text-[var(--color-muted-foreground)]">
          No paid orders in this period yet. Revenue will chart here once the first sale lands.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            {/* Grid stays low-contrast so it never competes with the data. */}
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />

            <XAxis
              dataKey="day"
              tickFormatter={shortDate}
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
            />
            <YAxis
              tickFormatter={(v: number) => `₹${Math.round(v / 100).toLocaleString("en-IN")}`}
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              width={64}
            />

            <Tooltip
              cursor={{ stroke: "var(--color-border)" }}
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "var(--color-foreground)",
              }}
              labelFormatter={(label) => shortDate(String(label))}
              formatter={(value, _name, item) => {
                const orders = (item as { payload?: RevenuePoint })?.payload?.orders ?? 0;
                return [`${formatPrice(Number(value))} · ${orders} order(s)`, "Revenue"];
              }}
            />

            {/* Amber, because this is money. */}
            <Area
              type="monotone"
              dataKey="totalInPaise"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* A chart alone is not screen-reader accessible, so the same numbers are
          available as a table. */}
      <details className="mt-3">
        <summary className="cursor-pointer text-xs font-medium text-[var(--color-muted-foreground)]">
          View as table
        </summary>
        <div className="mt-2 max-h-56 overflow-y-auto">
          <table className="w-full text-xs">
            <caption className="sr-only">Daily paid revenue</caption>
            <thead>
              <tr className="text-left text-[var(--color-muted-foreground)]">
                <th scope="col" className="py-1 font-semibold">Day</th>
                <th scope="col" className="py-1 text-right font-semibold">Orders</th>
                <th scope="col" className="py-1 text-right font-semibold">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.filter((d) => d.totalInPaise > 0).map((d) => (
                <tr key={d.day} className="border-t border-[var(--color-border)]">
                  <td className="py-1">{shortDate(d.day)}</td>
                  <td className="tabular py-1 text-right">{d.orders}</td>
                  <td className="tabular py-1 text-right font-medium">
                    {formatPrice(d.totalInPaise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </>
  );
}
