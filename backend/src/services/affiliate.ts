import { and, desc, eq, gte, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  commissions,
  kycSubmissions,
  orders,
  payoutRequests,
  referralClicks,
  users,
  wallets,
  walletLedger,
} from "@/db/schema";

// Re-exported so existing callers keep one import path; it is defined next to
// the payout logic that enforces it.
export { MIN_PAYOUT_IN_PAISE } from "./payouts";

/** Read paths for the affiliate dashboard. */

export async function getWalletSummary(userId: string) {
  const [wallet] = await db
    .select()
    .from(wallets)
    .where(eq(wallets.userId, userId))
    .limit(1);

  // A user who has never earned has no wallet row yet — report zeroes rather
  // than creating one on a read.
  return (
    wallet ?? {
      id: null,
      userId,
      availableInPaise: 0,
      pendingInPaise: 0,
      lifetimeEarnedInPaise: 0,
      withdrawnInPaise: 0,
      updatedAt: new Date(),
    }
  );
}

/** People this user introduced, with what each has actually earned them. */
export async function getAssociates(userId: string, limit = 100) {
  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      joinedAt: users.createdAt,
      verified: users.emailVerified,
      purchaseCount: sql<number>`cast((
        select count(*) from ${orders}
        where ${orders.userId} = ${users.id} and ${orders.status} = 'paid'
      ) as int)`,
      earnedInPaise: sql<number>`cast(coalesce((
        select sum(${commissions.amountInPaise}) from ${commissions}
        where ${commissions.sourceUserId} = ${users.id}
          and ${commissions.earnerId} = ${userId}
          and ${commissions.status} <> 'reversed'
      ), 0) as int)`,
    })
    .from(users)
    .where(eq(users.referredById, userId))
    .orderBy(desc(users.createdAt))
    .limit(limit);
}

export async function getCommissionHistory(userId: string, limit = 100) {
  return db
    .select({
      id: commissions.id,
      amountInPaise: commissions.amountInPaise,
      baseAmountInPaise: commissions.baseAmountInPaise,
      rateBps: commissions.rateBps,
      status: commissions.status,
      maturesAt: commissions.maturesAt,
      createdAt: commissions.createdAt,
      sourceName: users.name,
      sourceEmail: users.email,
    })
    .from(commissions)
    .innerJoin(users, eq(users.id, commissions.sourceUserId))
    .where(eq(commissions.earnerId, userId))
    .orderBy(desc(commissions.createdAt))
    .limit(limit);
}

export async function getLedger(userId: string, limit = 50) {
  return db
    .select({
      id: walletLedger.id,
      direction: walletLedger.direction,
      amountInPaise: walletLedger.amountInPaise,
      availableAfterInPaise: walletLedger.availableAfterInPaise,
      referenceType: walletLedger.referenceType,
      note: walletLedger.note,
      createdAt: walletLedger.createdAt,
    })
    .from(walletLedger)
    .where(eq(walletLedger.userId, userId))
    .orderBy(desc(walletLedger.createdAt))
    .limit(limit);
}

/** Click and conversion counts for the affiliate link panel. */
export async function getReferralStats(userId: string, referralCode: string) {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [clicks] = await db
    .select({
      total: sql<number>`cast(count(*) as int)`,
      last30: sql<number>`cast(count(*) filter (where ${referralClicks.createdAt} >= ${thirtyDaysAgo}) as int)`,
      uniqueVisitors: sql<number>`cast(count(distinct ${referralClicks.ipHash}) as int)`,
    })
    .from(referralClicks)
    .where(eq(referralClicks.referralCode, referralCode));

  const [signups] = await db
    .select({ total: sql<number>`cast(count(*) as int)` })
    .from(users)
    .where(eq(users.referredById, userId));

  const [converted] = await db
    .select({ total: sql<number>`cast(count(distinct ${commissions.sourceUserId}) as int)` })
    .from(commissions)
    .where(and(eq(commissions.earnerId, userId), sql`${commissions.status} <> 'reversed'`));

  return {
    clicks: clicks.total,
    clicksLast30: clicks.last30,
    uniqueVisitors: clicks.uniqueVisitors,
    signups: signups.total,
    buyers: converted.total,
    // Guarded against divide-by-zero, and shown as a whole percent.
    signupRate: clicks.total > 0 ? Math.round((signups.total / clicks.total) * 100) : 0,
  };
}

/**
 * Top performers over a rolling 30 days.
 *
 * Ranked on approved and paid commission only — counting pending would let
 * someone top the board with sales that are still refundable.
 */
export async function getTopPerformers(limit = 20) {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  return db
    .select({
      userId: users.id,
      name: users.name,
      image: users.image,
      earnedInPaise: sql<number>`cast(coalesce(sum(${commissions.amountInPaise}), 0) as int)`,
      saleCount: sql<number>`cast(count(*) as int)`,
    })
    .from(commissions)
    .innerJoin(users, eq(users.id, commissions.earnerId))
    .where(
      and(
        gte(commissions.createdAt, since),
        sql`${commissions.status} in ('approved', 'paid')`,
      ),
    )
    .groupBy(users.id)
    .orderBy(desc(sql`sum(${commissions.amountInPaise})`))
    .limit(limit);
}

/* ---------------------------------------------------------------------- KYC */

/**
 * The user's own KYC record.
 *
 * Never selects `accountNumberEncrypted` or `panNumber` — the owner does not
 * need them rendered back, and not selecting them means they cannot leak into
 * a client payload by accident.
 */
export async function getMyKyc(userId: string) {
  const [row] = await db
    .select({
      id: kycSubmissions.id,
      fullName: kycSubmissions.fullName,
      bankAccountName: kycSubmissions.bankAccountName,
      accountNumberLast4: kycSubmissions.accountNumberLast4,
      ifsc: kycSubmissions.ifsc,
      aadhaarLast4: kycSubmissions.aadhaarLast4,
      status: kycSubmissions.status,
      rejectionReason: kycSubmissions.rejectionReason,
      createdAt: kycSubmissions.createdAt,
      reviewedAt: kycSubmissions.reviewedAt,
    })
    .from(kycSubmissions)
    .where(eq(kycSubmissions.userId, userId))
    .limit(1);

  return row ?? null;
}

/** Admin review queue. Full PAN is shown here; the account number is not. */
export async function listKycForAdmin(status?: "pending" | "approved" | "rejected") {
  return db
    .select({
      id: kycSubmissions.id,
      userId: kycSubmissions.userId,
      fullName: kycSubmissions.fullName,
      panNumber: kycSubmissions.panNumber,
      aadhaarLast4: kycSubmissions.aadhaarLast4,
      bankAccountName: kycSubmissions.bankAccountName,
      accountNumberLast4: kycSubmissions.accountNumberLast4,
      ifsc: kycSubmissions.ifsc,
      documentKeys: kycSubmissions.documentKeys,
      status: kycSubmissions.status,
      createdAt: kycSubmissions.createdAt,
      userEmail: users.email,
      userName: users.name,
    })
    .from(kycSubmissions)
    .innerJoin(users, eq(users.id, kycSubmissions.userId))
    .where(status ? eq(kycSubmissions.status, status) : undefined)
    .orderBy(desc(kycSubmissions.createdAt));
}

/* ------------------------------------------------------------------ payouts */

export async function getMyPayouts(userId: string) {
  return db
    .select({
      id: payoutRequests.id,
      amountInPaise: payoutRequests.amountInPaise,
      status: payoutRequests.status,
      utrNumber: payoutRequests.utrNumber,
      adminNote: payoutRequests.adminNote,
      createdAt: payoutRequests.createdAt,
      processedAt: payoutRequests.processedAt,
    })
    .from(payoutRequests)
    .where(eq(payoutRequests.userId, userId))
    .orderBy(desc(payoutRequests.createdAt));
}

export async function listPayoutsForAdmin(status?: "requested" | "approved" | "paid" | "rejected") {
  return db
    .select({
      id: payoutRequests.id,
      userId: payoutRequests.userId,
      amountInPaise: payoutRequests.amountInPaise,
      status: payoutRequests.status,
      utrNumber: payoutRequests.utrNumber,
      createdAt: payoutRequests.createdAt,
      processedAt: payoutRequests.processedAt,
      userName: users.name,
      userEmail: users.email,
      bankAccountName: kycSubmissions.bankAccountName,
      accountNumberLast4: kycSubmissions.accountNumberLast4,
      ifsc: kycSubmissions.ifsc,
      kycStatus: kycSubmissions.status,
    })
    .from(payoutRequests)
    .innerJoin(users, eq(users.id, payoutRequests.userId))
    .leftJoin(kycSubmissions, eq(kycSubmissions.id, payoutRequests.kycId))
    .where(status ? eq(payoutRequests.status, status) : undefined)
    .orderBy(desc(payoutRequests.createdAt));
}
