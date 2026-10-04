import type { NextRequest } from "next/server";

import { API_BASE } from "@/lib/api";

/**
 * Certificate PDF, served from this origin.
 *
 * The dashboard and the public verify page both link to
 * /api/certificates/<serial>, but the API lives on another host and nothing
 * here forwarded /api — so the link was a 404 and certificates never
 * downloaded. This streams the PDF the API renders, as a download.
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ serial: string }> },
) {
  const { serial } = await ctx.params;
  const clean = serial.trim().toUpperCase();

  const upstream = await fetch(`${API_BASE}/api/certificates/${encodeURIComponent(clean)}/pdf`, {
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return new Response(await upstream.text().catch(() => "Certificate not found"), {
      status: upstream.status === 200 ? 502 : upstream.status,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="NextMentor-${clean.replace(/[^A-Z0-9-]/g, "")}.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
