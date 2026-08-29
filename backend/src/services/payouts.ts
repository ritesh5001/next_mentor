import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/backend/db";
import {
  commissions,
  kycSubmissions,
  payoutRequests,
  wallets,
  walletLedger,
} from "@/backend/db/schema";

/**
 * Payout accounting.
 *
 * Deliberately separate from the Server Actions in actions/affiliate.ts. Those
 * are thin wrappers that authenticate and then call in here; all the balance
 * movement lives in this file so it can be driven directly by tests. Logic that
 * only runs behind `requireUser()` is logic that never gets tested, and this is
 * the code path that sends money to real bank accounts.
 */

/** Minimum balance before a withdrawal can be requested. */
export const MIN_PAYOUT_IN_PAISE = 50_000; // ₹500

export type PayoutResult = { ok: true; message: string } | { ok: false; error: string };

/**
 * Requests a withdrawal.
 *
 * Every guard runs inside one transaction with the wallet row locked, so two
 * tabs cannot withdraw the same money twice. The balance leaves `available`
 * immediately — a pending request is money already spoken for.
 */
export async function createPayoutRequest(params: {
  userId: string;
  amountInPaise: number;
}): Promise<PayoutResult> {
  if (!Number.isInteger(params.amountInPaise) || params.amountInPaise <= 0) {
    return { ok: false, error: "Enter a valid amount." };
  }

  return db.transaction(async (tx) => {
    const [kyc] = await tx
      .select({ id: kycSubmissions.id, status: kycSubmissions.status })
      .from(kycSubmissions)
      .where(eq(kycSubmissions.userId, params.userId))
      .limit(1);

    if (!kyc || kyc.status !== "approved") {
      return { ok: false as const, error: "Complete KYC verification before withdrawing." };
    }

    const [inFlight] = await tx
      .select({ id: payoutRequests.id })
      .from(payoutRequests)
      .where(
        and(
          eq(payoutRequests.userId, params.userId),
          sql`${payoutRequests.status} in ('requested', 'approved')`,
        ),
      )
      .limit(1);

    if (inFlight) {
      return { ok: false as const, error: "You already have a withdrawal in progress." };
    }

    const [wallet] = await tx
      .select()
      .from(wallets)
      .where(eq(wallets.userId, params.userId))
      .limit(1)
      .for("update");

    if (!wallet) return { ok: false as const, error: "You have no earnings to withdraw yet." };

    if (params.amountInPaise < MIN_PAYOUT_IN_PAISE) {
      return {
        ok: false as const,
        error: `The minimum withdrawal is ₹${MIN_PAYOUT_IN_PAISE / 100}.`,
      };
    }

    if (params.amountInPaise > wallet.availableInPaise) {
      return {
        ok: false as const,
        error: `You can withdraw up to ₹${(wallet.availableInPaise / 100).toFixed(2)}.`,
      };
    }

    const [request] = await tx
      .insert(payoutRequests)
      .values({
        userId: params.userId,
        kycId: kyc.id,
        amountInPaise: params.amountInPaise,
        status: "requested",
      })
      .returning({ id: payoutRequests.id });

    const availableAfter = wallet.availableInPaise - params.amountInPaise;

    await tx
      .update(wallets)
      .set({ availableInPaise: availableAfter, updatedAt: new Date() })
      .where(eq(wallets.id, wallet.id));

    await tx.insert(walletLedger).values({
      walletId: wallet.id,
      userId: params.userId,
      direction: "debit",
      amountInPaise: params.amountInPaise,
      availableAfterInPaise: availableAfter,
      pendingAfterInPaise: wallet.pendingInPaise,
      referenceType: "payout",
      referenceId: request.id,
      note: "Withdrawal requested",
    });

    return {
      ok: true as const,
      message: "Withdrawal requested. You'll hear from us within 3 working days.",
    };
  });
}

export async function approvePayout(payoutId: string, adminId: string): Promise<PayoutResult> {
  const updated = await db
    .update(payoutRequests)
    .set({ status: "approved", processedById: adminId, updatedAt: new Date() })
    .where(and(eq(payoutRequests.id, payoutId), eq(payoutRequests.status, "requested")))
    .returning({ id: payoutRequests.id });

  if (updated.length === 0) {
    return { ok: false, error: "That request is not awaiting approval." };
  }

  return { ok: true, message: "Approved. Transfer the funds, then mark it paid with the UTR." };
}

/**
 * Marks a payout as actually sent.
 *
 * The UTR is required: without a bank reference there is no way to prove the
 * transfer happened when someone disputes it months later.
 */
export async function markPayoutPaid(params: {
  payoutId: string;
  adminId: string;
  utrNumber: string;
}): Promise<PayoutResult> {
  const utr = params.utrNumber.trim();
  if (utr.length < 6) {
    return { ok: false, error: "Enter the bank UTR / reference number for this transfer." };
  }

  return db.transaction(async (tx) => {
    const [payout] = await tx
      .select()
      .from(payoutRequests)
      .where(eq(payoutRequests.id, params.payoutId))
      .limit(1)
      .for("update");

    if (!payout) return { ok: false as const, error: "That request no longer exists." };
    if (payout.status === "paid") {
      return { ok: false as const, error: "That request is already marked paid." };
    }
    if (payout.status === "rejected") {
      return { ok: false as const, error: "That request was rejected." };
    }

    await tx
      .update(payoutRequests)
      .set({
        status: "paid",
        utrNumber: utr,
        processedById: params.adminId,
        processedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(payoutRequests.id, params.payoutId));

    // The money already left `available` at request time, so there is no
    // balance change here — only the lifetime total and the commission rollup.
    await tx
      .update(wallets)
      .set({
        withdrawnInPaise: sql`${wallets.withdrawnInPaise} + ${payout.amountInPaise}`,
        updatedAt: new Date(),
      })
      .where(eq(wallets.userId, payout.userId));

    await tx
      .update(commissions)
      .set({ status: "paid", payoutRequestId: params.payoutId })
      .where(and(eq(commissions.earnerId, payout.userId), eq(commissions.status, "approved")));

    return { ok: true as const, message: `Marked paid · UTR ${utr}` };
  });
}

/**
 * Rejects a request and returns the money to the wallet.
 *
 * The refund is the important half. The balance was debited at request time, so
 * a rejection that only flipped the status would quietly destroy the
 * affiliate's earnings.
 */
export async function rejectPayout(params: {
  payoutId: string;
  adminId: string;
  reason: string;
}): Promise<PayoutResult> {
  if (!params.reason.trim()) {
    return { ok: false, error: "Give a reason so the user knows what happened." };
  }

  return db.transaction(async (tx) => {
    const [payout] = await tx
      .select()
      .from(payoutRequests)
      .where(eq(payoutRequests.id, params.payoutId))
      .limit(1)
      .for("update");

    if (!payout) return { ok: false as const, error: "That request no longer exists." };
    if (payout.status === "paid") {
      return { ok: false as const, error: "That request was already paid and cannot be rejected." };
    }
    if (payout.status === "rejected") {
      return { ok: false as const, error: "That request is already rejected." };
    }

    await tx
      .update(payoutRequests)
      .set({
        status: "rejected",
        adminNote: params.reason.slice(0, 500),
        processedById: params.adminId,
        processedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(payoutRequests.id, params.payoutId));

    const [wallet] = await tx
      .select()
      .from(wallets)
      .where(eq(wallets.userId, payout.userId))
      .limit(1)
      .for("update");

    if (wallet) {
      const availableAfter = wallet.availableInPaise + payout.amountInPaise;

      await tx
        .update(wallets)
        .set({ availableInPaise: availableAfter, updatedAt: new Date() })
        .where(eq(wallets.id, wallet.id));

      await tx.insert(walletLedger).values({
        walletId: wallet.id,
        userId: payout.userId,
        direction: "credit",
        amountInPaise: payout.amountInPaise,
        availableAfterInPaise: availableAfter,
        pendingAfterInPaise: wallet.pendingInPaise,
        referenceType: "payout",
        referenceId: params.payoutId,
        note: `Withdrawal rejected — funds returned. ${params.reason.slice(0, 200)}`,
      });
    }

    return { ok: true as const, message: "Rejected and funds returned to the wallet." };
  });
}
