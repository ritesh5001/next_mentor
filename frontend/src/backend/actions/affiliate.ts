"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/backend/db";
import { kycSubmissions, payoutRequests, users } from "@/backend/db/schema";
import { requireUser, requireAdmin } from "@/backend/lib/permissions";
import { encryptSecret } from "@/backend/lib/crypto";
import {
  createPayoutRequest,
  approvePayout,
  markPayoutPaid,
  rejectPayout,
} from "@/backend/services/payouts";
import { createImageUpload } from "@/backend/lib/r2";
import {
  sendKycApprovedEmail,
  sendKycRejectedEmail,
  sendPayoutApprovedEmail,
  sendPayoutPaidEmail,
  sendPayoutRejectedEmail,
} from "@/backend/lib/email";
import { formatPaise } from "@/backend/lib/razorpay";
import type { ActionState } from "@/shared/action-state";

export type { ActionState };

/* ---------------------------------------------------------------------- KYC */

const kycSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full legal name").max(80),
  // Indian PAN: five letters, four digits, one letter.
  panNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN, e.g. ABCDE1234F"),
  aadhaarLast4: z
    .string()
    .trim()
    .regex(/^[0-9]{4}$/, "Enter the last 4 digits of your Aadhaar")
    .optional()
    .or(z.literal("")),
  bankAccountName: z.string().trim().min(2, "Enter the name on the account").max(80),
  accountNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{6,20}$/, "Enter a valid account number"),
  confirmAccountNumber: z.string().trim(),
  ifsc: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC, e.g. HDFC0001234"),
});

/**
 * Submits or resubmits KYC.
 *
 * The account number is encrypted before it touches the database; only the last
 * four digits are stored in the clear, which is all an admin needs to confirm
 * they are paying the right account.
 */
export async function submitKycAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const parsed = kycSchema.safeParse({
    fullName: formData.get("fullName"),
    panNumber: formData.get("panNumber"),
    aadhaarLast4: formData.get("aadhaarLast4") ?? "",
    bankAccountName: formData.get("bankAccountName"),
    accountNumber: formData.get("accountNumber"),
    confirmAccountNumber: formData.get("confirmAccountNumber"),
    ifsc: formData.get("ifsc"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again" };
  }

  const d = parsed.data;

  // Typo-checking the account number matters more here than in most forms:
  // a wrong digit sends someone else the money, and it is not recoverable.
  if (d.accountNumber !== d.confirmAccountNumber) {
    return { error: "The account numbers do not match." };
  }

  const [existing] = await db
    .select({ status: kycSubmissions.status })
    .from(kycSubmissions)
    .where(eq(kycSubmissions.userId, user.id))
    .limit(1);

  // Approved details are frozen: silently changing the destination account
  // after approval is exactly how a compromised session drains a wallet.
  if (existing?.status === "approved") {
    return {
      error: "Your KYC is already approved. Contact support to change your bank details.",
    };
  }

  const values = {
    userId: user.id,
    fullName: d.fullName,
    panNumber: d.panNumber,
    aadhaarLast4: d.aadhaarLast4 || null,
    bankAccountName: d.bankAccountName,
    accountNumberEncrypted: encryptSecret(d.accountNumber),
    accountNumberLast4: d.accountNumber.slice(-4),
    ifsc: d.ifsc,
    status: "pending" as const,
    rejectionReason: null,
    reviewedById: null,
    reviewedAt: null,
    updatedAt: new Date(),
  };

  await db
    .insert(kycSubmissions)
    .values(values)
    .onConflictDoUpdate({ target: kycSubmissions.userId, set: values });

  revalidatePath("/dashboard/kyc");
  return { success: "Submitted for review. This usually takes 1–2 working days." };
}

export async function requestKycDocumentUploadAction(input: {
  contentType: string;
  contentLength: number;
}): Promise<{ uploadUrl: string; key: string } | { error: string }> {
  await requireUser();

  const result = await createImageUpload({
    prefix: "promo", // shared private prefix; keys are random and unguessable
    contentType: input.contentType,
    contentLength: input.contentLength,
  });

  if ("error" in result) return result;
  return { uploadUrl: result.uploadUrl, key: result.key };
}

/* ------------------------------------------------------------ KYC (admin) */

export async function reviewKycAction(
  kycId: string,
  decision: "approved" | "rejected",
  reason?: string,
): Promise<ActionState> {
  const admin = await requireAdmin();

  if (decision === "rejected" && !reason?.trim()) {
    // A rejection with no reason leaves the user with no way to fix it.
    return { error: "Give a reason so the user knows what to correct." };
  }

  const [updated] = await db
    .update(kycSubmissions)
    .set({
      status: decision,
      rejectionReason: decision === "rejected" ? (reason ?? "").slice(0, 500) : null,
      reviewedById: admin.id,
      reviewedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(kycSubmissions.id, kycId))
    .returning({ userId: kycSubmissions.userId });

  // Tell them. A status that changes silently in a dashboard nobody has open
  // reads as nothing happening — and this one gates their ability to withdraw.
  if (updated) {
    const [person] = await db
      .select({ email: users.email, name: users.name })
      .from(users)
      .where(eq(users.id, updated.userId))
      .limit(1);

    if (person) {
      if (decision === "approved") {
        await sendKycApprovedEmail(person.email, person.name);
      } else {
        await sendKycRejectedEmail(person.email, reason ?? "Please check your details.");
      }
    }
  }

  revalidatePath("/admin/kyc");
  return { success: decision === "approved" ? "KYC approved" : "KYC rejected" };
}

/* ------------------------------------------------------------------ payouts */

/**
 * Payout actions are thin: authenticate, then delegate.
 *
 * All the balance movement lives in services/payouts.ts so it can be driven
 * directly by tests — logic that only runs behind `requireUser()` is logic that
 * never gets tested, and this is the path that sends money to bank accounts.
 */

export async function requestPayoutAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();

  const rupees = Number(formData.get("amountInRupees"));
  if (!Number.isFinite(rupees) || rupees <= 0) {
    return { error: "Enter a valid amount." };
  }

  try {
    const result = await createPayoutRequest({
      userId: user.id,
      amountInPaise: Math.round(rupees * 100),
    });

    revalidatePath("/dashboard/earnings");
    return result.ok ? { success: result.message } : { error: result.error };
  } catch (err) {
    console.error("[payout] Request failed", err);
    return { error: "Could not submit that request. Please try again." };
  }
}

export async function approvePayoutAction(payoutId: string): Promise<ActionState> {
  const admin = await requireAdmin();
  const result = await approvePayout(payoutId, admin.id);

  if (result.ok) await notifyPayout(payoutId, "approved");

  revalidatePath("/admin/payouts");
  return result.ok ? { success: result.message } : { error: result.error };
}

/**
 * Emails the affiliate about a payout transition.
 *
 * Runs after the transaction has committed, and never throws — a mail failure
 * must not undo a transfer that actually happened.
 */
async function notifyPayout(
  payoutId: string,
  event: "approved" | "paid" | "rejected",
  detail?: string,
) {
  try {
    const [row] = await db
      .select({
        amountInPaise: payoutRequests.amountInPaise,
        utrNumber: payoutRequests.utrNumber,
        email: users.email,
      })
      .from(payoutRequests)
      .innerJoin(users, eq(users.id, payoutRequests.userId))
      .where(eq(payoutRequests.id, payoutId))
      .limit(1);

    if (!row) return;
    const amount = formatPaise(row.amountInPaise);

    if (event === "approved") {
      await sendPayoutApprovedEmail(row.email, amount);
    } else if (event === "paid") {
      await sendPayoutPaidEmail(row.email, amount, row.utrNumber ?? detail ?? "—");
    } else {
      await sendPayoutRejectedEmail(row.email, amount, detail ?? "No reason given.");
    }
  } catch (err) {
    console.error("[payout] Notification failed", payoutId, event, err);
  }
}

export async function markPayoutPaidAction(
  payoutId: string,
  utrNumber: string,
): Promise<ActionState> {
  const admin = await requireAdmin();
  const result = await markPayoutPaid({ payoutId, adminId: admin.id, utrNumber });

  if (result.ok) await notifyPayout(payoutId, "paid", utrNumber);

  revalidatePath("/admin/payouts");
  return result.ok ? { success: result.message } : { error: result.error };
}

export async function rejectPayoutAction(
  payoutId: string,
  reason: string,
): Promise<ActionState> {
  const admin = await requireAdmin();
  const result = await rejectPayout({ payoutId, adminId: admin.id, reason });

  if (result.ok) await notifyPayout(payoutId, "rejected", reason);

  revalidatePath("/admin/payouts");
  return result.ok ? { success: result.message } : { error: result.error };
}
