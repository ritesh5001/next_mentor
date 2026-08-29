import "server-only";

import { Resend } from "resend";

import { env } from "./env";
import { appUrl } from "@/shared/env";

let client: Resend | null = null;

function resend(): Resend {
  client ??= new Resend(env("email").RESEND_API_KEY);
  return client;
}

/**
 * Email is never allowed to fail a request.
 *
 * Every caller here sits downstream of something that already succeeded — an
 * account was created, a payment was captured. Throwing because Resend had a
 * bad minute would roll back or 500 a transaction that genuinely completed.
 * So failures are logged and swallowed, and the return value says what happened.
 */
async function send(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await resend().emails.send({
      from: env("email").EMAIL_FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });

    if (error) {
      console.error("[email] Resend rejected the message", { subject: opts.subject, error });
      return { ok: false, error: error.message };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    console.error("[email] Failed to send", { subject: opts.subject, err });
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}

const BRAND = "#0D9488";

function layout(heading: string, body: string, cta?: { label: string; url: string }) {
  return `<!doctype html>
<html lang="en"><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <tr><td style="padding:24px 32px;border-bottom:1px solid #e2e8f0">
          <span style="font-size:18px;font-weight:700;color:${BRAND}">NextMentor</span>
        </td></tr>
        <tr><td style="padding:32px">
          <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${heading}</h1>
          <div style="font-size:15px;line-height:1.6;color:#334155">${body}</div>
          ${
            cta
              ? `<div style="margin-top:28px">
                   <a href="${cta.url}" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:15px">${cta.label}</a>
                 </div>
                 <p style="margin-top:20px;font-size:13px;color:#64748b;line-height:1.5">
                   If the button does not work, paste this into your browser:<br>
                   <span style="color:#64748b;word-break:break-all">${cta.url}</span>
                 </p>`
              : ""
          }
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8">
          You received this because you have a NextMentor account.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function sendVerificationEmail(to: string, token: string, name?: string | null) {
  const url = `${appUrl()}/verify?token=${encodeURIComponent(token)}`;
  return send({
    to,
    subject: "Confirm your email — NextMentor",
    html: layout(
      `Welcome${name ? `, ${name}` : ""}`,
      `<p style="margin:0">Confirm your email address to activate your account and start learning.</p>
       <p style="margin:12px 0 0">This link expires in 24 hours.</p>`,
      { label: "Confirm email", url },
    ),
  });
}

export function sendPasswordResetEmail(to: string, token: string) {
  const url = `${appUrl()}/reset-password?token=${encodeURIComponent(token)}`;
  return send({
    to,
    subject: "Reset your password — NextMentor",
    html: layout(
      "Reset your password",
      `<p style="margin:0">Click below to choose a new password. This link expires in 1 hour.</p>
       <p style="margin:12px 0 0;color:#64748b">If you did not request this, you can ignore this email — your password will not change.</p>`,
      { label: "Reset password", url },
    ),
  });
}

export function sendPurchaseReceiptEmail(params: {
  to: string;
  name: string | null;
  /** Course title or plan name — an order buys one or the other. */
  itemName: string;
  /** Where the CTA goes: the player for a course, the dashboard for a plan. */
  destinationPath: string;
  amountFormatted: string;
  orderId: string;
}) {
  const url = `${appUrl()}${params.destinationPath}`;
  return send({
    to: params.to,
    subject: `Your purchase: ${params.itemName}`,
    html: layout(
      "Payment received",
      `<p style="margin:0">You now have full access to <strong>${params.itemName}</strong>.</p>
       <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;font-size:14px">
         <tr><td style="padding:6px 0;color:#64748b">Amount paid</td><td align="right" style="padding:6px 0;font-weight:600">${params.amountFormatted}</td></tr>
         <tr><td style="padding:6px 0;color:#64748b">Order ID</td><td align="right" style="padding:6px 0;font-family:ui-monospace,monospace;font-size:13px">${params.orderId}</td></tr>
       </table>`,
      { label: "Start learning", url },
    ),
  });
}
