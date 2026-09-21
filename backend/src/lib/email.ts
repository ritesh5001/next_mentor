import { Resend } from "resend";

import { env } from "./env";
import { appUrl } from "@/lib/env";

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

/**
 * Renders the code as a big, spaced, selectable block.
 *
 * Monospace with wide letter-spacing so 0/O and 1/7 cannot be misread, and
 * plain selectable text rather than an image so it can be copied — and so it
 * still arrives in clients that block images by default.
 */
function codeBlock(code: string): string {
  return `<div style="margin:28px 0;padding:20px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:12px;text-align:center">
    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:34px;font-weight:700;letter-spacing:10px;color:#101a47">${code}</div>
  </div>`;
}

export function sendVerificationEmail(
  to: string,
  code: string,
  expiresInMinutes: number,
  name?: string | null,
) {
  return send({
    to,
    // The code is in the subject too: it is often all someone needs, straight
    // from the notification, without opening the message.
    subject: `${code} is your NextMentor verification code`,
    html: layout(
      `Welcome${name ? `, ${name}` : ""}`,
      `<p style="margin:0">Enter this code to confirm your email and activate your account.</p>
       ${codeBlock(code)}
       <p style="margin:0;color:#64748b">This code expires in ${expiresInMinutes} minutes and can be used once.</p>
       <p style="margin:12px 0 0;color:#64748b">If you did not create an account, you can ignore this email.</p>`,
    ),
  });
}

export function sendPasswordResetEmail(to: string, code: string, expiresInMinutes: number) {
  return send({
    to,
    subject: `${code} is your NextMentor password reset code`,
    html: layout(
      "Reset your password",
      `<p style="margin:0">Enter this code to choose a new password.</p>
       ${codeBlock(code)}
       <p style="margin:0;color:#64748b">This code expires in ${expiresInMinutes} minutes and can be used once.</p>
       <p style="margin:12px 0 0;color:#64748b"><strong>If you did not request this, ignore this email</strong> — your password will not change. Nobody can reset it without this code.</p>`,
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

/* ------------------------------------------------- affiliate notifications */

/**
 * Every KYC and payout state change is emailed.
 *
 * These are money events on someone else's earnings. A status that changes
 * silently in a dashboard nobody has open reads as "nothing is happening",
 * which turns into a support ticket — or worse, a suspicion that the platform
 * is sitting on their money.
 */

export function sendKycApprovedEmail(to: string, name: string | null) {
  return send({
    to,
    subject: "Your KYC is approved — NextMentor",
    html: layout(
      "You're verified",
      `<p style="margin:0">${name ? `${name}, your` : "Your"} KYC has been approved.
       You can now withdraw your earnings to the bank account you registered.</p>`,
      { label: "Withdraw earnings", url: `${appUrl()}/dashboard/earnings` },
    ),
  });
}

export function sendKycRejectedEmail(to: string, reason: string) {
  return send({
    to,
    subject: "Action needed on your KYC — NextMentor",
    html: layout(
      "We couldn't verify your details",
      `<p style="margin:0">Your KYC submission was not approved for this reason:</p>
       <p style="margin:12px 0;padding:12px;background:#fef3c7;border-radius:8px;color:#92400e">${reason}</p>
       <p style="margin:0">Correct the details and resubmit — it only takes a minute.</p>`,
      { label: "Update my KYC", url: `${appUrl()}/dashboard/kyc` },
    ),
  });
}

export function sendPayoutApprovedEmail(to: string, amountFormatted: string) {
  return send({
    to,
    subject: `Withdrawal approved — ${amountFormatted}`,
    html: layout(
      "Your withdrawal is approved",
      `<p style="margin:0">We're transferring <strong>${amountFormatted}</strong> to your
       registered bank account. Transfers usually land within 3 working days.</p>`,
      { label: "View earnings", url: `${appUrl()}/dashboard/earnings` },
    ),
  });
}

export function sendPayoutPaidEmail(
  to: string,
  amountFormatted: string,
  utrNumber: string,
) {
  return send({
    to,
    subject: `${amountFormatted} sent — NextMentor`,
    html: layout(
      "Your money is on its way",
      `<p style="margin:0">We've transferred <strong>${amountFormatted}</strong> to your bank account.</p>
       <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;font-size:14px">
         <tr><td style="padding:6px 0;color:#64748b">Amount</td><td align="right" style="padding:6px 0;font-weight:600">${amountFormatted}</td></tr>
         <tr><td style="padding:6px 0;color:#64748b">Bank reference (UTR)</td><td align="right" style="padding:6px 0;font-family:ui-monospace,monospace;font-size:13px">${utrNumber}</td></tr>
       </table>
       <p style="margin:16px 0 0;font-size:13px;color:#64748b">Quote that reference if you
       need to trace the payment with your bank.</p>`,
      { label: "View earnings", url: `${appUrl()}/dashboard/earnings` },
    ),
  });
}

export function sendPayoutRejectedEmail(
  to: string,
  amountFormatted: string,
  reason: string,
) {
  return send({
    to,
    subject: "Your withdrawal was not processed — NextMentor",
    html: layout(
      "Withdrawal not processed",
      `<p style="margin:0">Your request for <strong>${amountFormatted}</strong> was not
       processed for this reason:</p>
       <p style="margin:12px 0;padding:12px;background:#fee2e2;border-radius:8px;color:#991b1b">${reason}</p>
       <p style="margin:0"><strong>The funds have been returned to your wallet</strong> and
       you can request a new withdrawal at any time.</p>`,
      { label: "View earnings", url: `${appUrl()}/dashboard/earnings` },
    ),
  });
}

/**
 * Sent to the sponsor the moment a sale lands.
 *
 * Deliberately says nothing about when the money can be withdrawn. It used to
 * print the date the refund window closes, and promoters forward these emails
 * — a fixed date in writing reads as a payout promise, and payouts actually go
 * out on the Monday run after that, not on the date shown. The dashboard is
 * where the live balance and its status belong.
 */
export function sendCommissionEarnedEmail(params: {
  to: string;
  amountFormatted: string;
  buyerName: string;
}) {
  return send({
    to: params.to,
    subject: `You earned ${params.amountFormatted} — NextMentor`,
    html: layout(
      "You just earned commission",
      `<p style="margin:0"><strong>${esc(params.buyerName)}</strong> made a purchase through your
       affiliate link, and you earned <strong>${params.amountFormatted}</strong>.</p>
       <p style="margin:12px 0 0;color:#64748b">It has been added to your earnings. Keep
       sharing your link — every purchase through it adds to your income, and you can follow it
       all live on your dashboard.</p>`,
      { label: "View my earnings", url: `${appUrl()}/dashboard/overview` },
    ),
  });
}

/* ---------------------------------------------------------------- welcome */

/** User-typed values go into HTML here, so they are escaped. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sent once, when a paid signup is activated: the new member's ID and the
 * credentials they chose, so they (or the member who signed them up) have
 * everything needed to log in.
 */
export function sendWelcomeCredentialsEmail(params: {
  to: string;
  name: string | null;
  memberId: string;
  password: string;
  planName: string;
}) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;color:#64748b">${label}</td><td align="right" style="padding:8px 0;font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;word-break:break-all">${value}</td></tr>`;

  return send({
    to: params.to,
    subject: "Congratulations! Your NextMentor ID is ready",
    html: layout(
      `Congratulations${params.name ? `, ${esc(params.name.split(" ")[0])}` : ""}! 🎉`,
      `<p style="margin:0">Your <strong>${esc(params.planName)}</strong> membership is active. Here are your login details:</p>
       <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;font-size:14px;background:#f1f5f9;border-radius:12px;padding:8px 16px">
         ${row("Member ID", esc(params.memberId))}
         ${row("Login email", esc(params.to))}
         ${row("Password", esc(params.password))}
       </table>
       <p style="margin:20px 0 0;font-size:13px;color:#64748b">For your security, change this password after you log in (Dashboard → Profile) and never share it with anyone.</p>`,
      { label: "Log in to your dashboard", url: `${appUrl()}/login` },
    ),
  });
}

/** Sent when an admin sets a new password for a member, if they chose to. */
export function sendPasswordSetByAdminEmail(params: {
  to: string;
  name: string | null;
  memberId: string;
  password: string;
}) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;color:#64748b">${label}</td><td align="right" style="padding:8px 0;font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;word-break:break-all">${value}</td></tr>`;

  return send({
    to: params.to,
    subject: "Your NextMentor password has been updated",
    html: layout(
      `Hi${params.name ? ` ${esc(params.name.split(" ")[0])}` : ""}, your password was updated`,
      `<p style="margin:0">Our team has set a new password for your account. Your login details:</p>
       <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;font-size:14px;background:#f1f5f9;border-radius:12px;padding:8px 16px">
         ${row("Member ID", esc(params.memberId))}
         ${row("Login email", esc(params.to))}
         ${row("New password", esc(params.password))}
       </table>
       <p style="margin:20px 0 0;font-size:13px;color:#64748b">For your security, change it after you log in (Dashboard → Profile). If you did not ask for this, contact support.</p>`,
      { label: "Log in", url: `${appUrl()}/login` },
    ),
  });
}
