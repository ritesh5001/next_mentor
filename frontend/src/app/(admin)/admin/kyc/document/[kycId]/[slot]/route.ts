import { NextResponse, type NextRequest } from "next/server";

import { api, ApiError } from "@/lib/api";

/**
 * Opens a KYC document with a link signed at click time.
 *
 * The API checks the caller is an admin; this only forwards the session and
 * redirects to the short-lived ImageKit URL it returns.
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ kycId: string; slot: string }> },
) {
  const { kycId, slot } = await ctx.params;
  try {
    const { url } = await api<{ url: string }>(
      `/api/admin/kyc/${encodeURIComponent(kycId)}/document/${encodeURIComponent(slot)}`,
    );
    return NextResponse.redirect(url, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return new NextResponse(err instanceof ApiError ? err.message : "Could not open that document.", {
      status: err instanceof ApiError ? err.status : 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
