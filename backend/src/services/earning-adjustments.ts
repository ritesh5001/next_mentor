import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import {
  commissions,
  earningCredits,
  payoutRequests,
  wallets,
  walletLedger,
} from "@/db/schema";

/**
 * Admin-only balance changes that do not come from a sale or a withdrawal
 * request. Both move real money through the wallet and the ledger, so the
 * member's dashboard, the leader board and the payout run all agree.
 */

type Result = { ok: true; message: string } | { ok: false; error: string };

const rupees = (paise: number) => `₹${(paise / 100).toFixed(2)}`;

/**
 * Credits earnings to a member today.
 *
 * Lands in `available` straight away: there is no order behind it to refund,
 * so a refund window would protect nothing. Shows up in today's, this week's,
 * this month's and all-time income, and on the leader board.
 */
export async function addEarningCredit(params: {
  userId: string;
  adminId: string;
  amountInPaise: number;
  note?: string;
}): Promise<Result> {
  if (!Number.isInteger(params.amountInPaise) || params.amountInPaise <= 0) {
    return { ok: false, error: "Enter an amount above zero." };
  }
  const note = params.note?.trim().slice(0, 200) || null;

  return db.transaction(async (tx) => {
    const [credit] = await tx
      .insert(earningCredits)
      .values({
        userId: params.userId,
        amountInPaise: params.amountInPaise,
        note,
        createdById: params.adminId,
      })
      .returning({ id: earningCredits.id });

    await tx.insert(wallets).values({ userId: params.userId }).onConflictDoNothing();
    const [wallet] = await tx
      .select()
      .from(wallets)
      .where(eq(wallets.userId, params.userId))
      .limit(1)
      .for("update");

    const availableAfter = wallet.availableInPaise + params.amountInPaise;
    await tx
      .update(wallets)
      .set({
        availableInPaise: availableAfter,
        lifetimeEarnedInPaise: wallet.lifetimeEarnedInPaise + params.amountInPaise,
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, wallet.id));

    await tx.insert(walletLedger).values({
      walletId: wallet.id,
      userId: params.userId,
      direction: "credit",
      amountInPaise: params.amountInPaise,
      availableAfterInPaise: availableAfter,
      pendingAfterInPaise: wallet.pendingInPaise,
      referenceType: "adjustment",
      referenceId: credit.id,
      note: note ? `Admin credit · ${note}` : "Admin credit",
    });

    return { ok: true as const, message: `Added ${rupees(params.amountInPaise)} to today's earnings` };
  });
}

/**
 * Records that a member has been paid everything they are owed, and zeroes
 * their balance — both the withdrawable and the still-maturing part.
 *
 * For transfers the owner made from the bank outside the Monday run, or for
 * more than the run listed. Without this the member's dashboard kept showing a
 * pending balance they had already received. The commissions are marked paid
 * so the nightly maturity job does not move them into `available` again; a
 * later refund of one still reverses it, as a debt, like any paid commission.
 */
export async function settleMemberBalance(params: {
  userId: string;
  adminId: string;
  utrNumber?: string;
}): Promise<Result> {
  const utr = params.utrNumber?.trim() || null;

  return db.transaction(async (tx) => {
    // An open request already holds its money, and rejecting it later hands
    // that money back — settling around it would pay the same rupees twice.
    const [open] = await tx
      .select({ id: payoutRequests.id })
      .from(payoutRequests)
      .where(
        and(
          eq(payoutRequests.userId, params.userId),
          inArray(payoutRequests.status, ["requested", "approved"]),
        ),
      )
      .limit(1);
    if (open) {
      return {
        ok: false as const,
        error: "This member has a withdrawal request in progress. Mark it paid or reject it first.",
      };
    }

    const [wallet] = await tx
      .select()
      .from(wallets)
      .where(eq(wallets.userId, params.userId))
      .limit(1)
      .for("update");

    const total = wallet ? Math.max(0, wallet.availableInPaise) + Math.max(0, wallet.pendingInPaise) : 0;
    if (!wallet || total === 0) {
      return { ok: false as const, error: "This member has no balance to settle." };
    }

    const [request] = await tx
      .insert(payoutRequests)
      .values({
        userId: params.userId,
        amountInPaise: total,
        status: "paid",
        utrNumber: utr,
        processedById: params.adminId,
        processedAt: new Date(),
        adminNote: "Balance settled by admin",
      })
      .returning({ id: payoutRequests.id });

    const availableAfter = wallet.availableInPaise - Math.max(0, wallet.availableInPaise);
    const pendingAfter = wallet.pendingInPaise - Math.max(0, wallet.pendingInPaise);

    await tx
      .update(wallets)
      .set({
        availableInPaise: availableAfter,
        pendingInPaise: pendingAfter,
        withdrawnInPaise: wallet.withdrawnInPaise + total,
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, wallet.id));

    await tx.insert(walletLedger).values({
      walletId: wallet.id,
      userId: params.userId,
      direction: "debit",
      amountInPaise: total,
      availableAfterInPaise: availableAfter,
      pendingAfterInPaise: pendingAfter,
      referenceType: "payout",
      referenceId: request.id,
      note: utr ? `Balance settled · UTR ${utr}` : "Balance settled by admin",
    });

    await tx
      .update(commissions)
      .set({ status: "paid", payoutRequestId: request.id })
      .where(
        and(
          eq(commissions.earnerId, params.userId),
          inArray(commissions.status, ["pending", "approved"]),
        ),
      );

    return { ok: true as const, message: `Settled ${rupees(total)} · balance is now ₹0` };
  });
}
