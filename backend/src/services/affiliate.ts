import { and, desc, eq, gte, sql } from "drizzle-orm";

import { db } from "@/db";
import { publicUrl } from "@/lib/imagekit";
import {
  commissions,
  earningCredits,
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

export const LEADERBOARD_PERIODS = ["today", "week", "month", "all"] as const;
export type LeaderboardPeriod = (typeof LEADERBOARD_PERIODS)[number];

/** Start of the window for a period, on the same UTC day boundaries the overview uses. */
function periodStart(period: LeaderboardPeriod): Date | null {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  if (period === "today") return d;
  if (period === "week") {
    d.setUTCDate(d.getUTCDate() - 6);
    return d;
  }
  if (period === "month") return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
  return null;
}

/**
 * Top performers for a period, plus the viewer's own standing.
 *
 * Ranked on earned commission — pending, approved and paid — the same
 * definition the overview uses. Counting cleared commission only left "today"
 * and "this week" permanently empty, because nothing clears inside the 7-day
 * refund window. Reversed commission never counts.
 */
export async function getTopPerformers(
  viewerId: string,
  period: LeaderboardPeriod = "month",
  limit = 10,
) {
  const since = periodStart(period);

  // Commission and admin credits, one row per earning event, so a credit
  // ranks a member exactly as a sale of the same size would.
  const earnings = db
    .select({
      userId: sql<string>`${commissions.earnerId}`.as("user_id"),
      amount: sql<number>`${commissions.amountInPaise}`.as("amount"),
    })
    .from(commissions)
    .where(
      and(
        sql`${commissions.status} in ('pending', 'approved', 'paid')`,
        since ? gte(commissions.createdAt, since) : undefined,
      ),
    )
    .unionAll(
      db
        .select({
          userId: sql<string>`${earningCredits.userId}`.as("user_id"),
          amount: sql<number>`${earningCredits.amountInPaise}`.as("amount"),
        })
        .from(earningCredits)
        .where(since ? gte(earningCredits.createdAt, since) : undefined),
    )
    .as("earnings");

  const totals = db
    .select({
      userId: earnings.userId,
      earnedInPaise: sql<number>`cast(sum(${earnings.amount}) as int)`.as("earned"),
      saleCount: sql<number>`cast(count(*) as int)`.as("sale_count"),
      rank: sql<number>`cast(rank() over (order by sum(${earnings.amount}) desc) as int)`.as("rank"),
    })
    .from(earnings)
    .groupBy(earnings.userId)
    .as("totals");

  const [top, mine, viewer] = await Promise.all([
    db
      .select({
        userId: users.id,
        name: users.name,
        image: users.image,
        earnedInPaise: totals.earnedInPaise,
        saleCount: totals.saleCount,
        rank: totals.rank,
      })
      .from(totals)
      .innerJoin(users, eq(users.id, totals.userId))
      .orderBy(totals.rank, users.id)
      .limit(limit),
    db
      .select({ rank: totals.rank, earnedInPaise: totals.earnedInPaise })
      .from(totals)
      .where(eq(totals.userId, viewerId))
      .limit(1),
    db.select({ image: users.image }).from(users).where(eq(users.id, viewerId)).limit(1),
  ]);

  return {
    period,
    // `image` holds an ImageKit path for uploaded photos; sent raw, every
    // uploaded avatar on the board was a broken image.
    top: top.map((t) => ({ ...t, image: publicUrl(t.image) })),
    me: mine[0] ?? null,
    myImage: publicUrl(viewer[0]?.image),
  };
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
      // "draft" until the form is submitted. Uploading a document first saves
      // a placeholder row whose stored status is already "pending"; reporting
      // that as-is told the page the KYC was under review, which hid the
      // upload section after the first document.
      status: sql<"draft" | "pending" | "approved" | "rejected">`case when ${kycSubmissions.accountNumberEncrypted} = '' then 'draft' else ${kycSubmissions.status}::text end`,
      rejectionReason: kycSubmissions.rejectionReason,
      createdAt: kycSubmissions.createdAt,
      reviewedAt: kycSubmissions.reviewedAt,
      // Booleans, not paths. The owner needs to know a document is on file;
      // handing back the storage path would serve no purpose and widen what a
      // compromised session can learn.
      hasAadhaarFront: sql<boolean>`${kycSubmissions.aadhaarFrontPath} is not null`,
      hasAadhaarBack: sql<boolean>`${kycSubmissions.aadhaarBackPath} is not null`,
      hasPanFront: sql<boolean>`${kycSubmissions.panFrontPath} is not null`,
      hasPanBack: sql<boolean>`${kycSubmissions.panBackPath} is not null`,
      hasBankProof: sql<boolean>`${kycSubmissions.bankProofPath} is not null`,
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
      aadhaarFrontPath: kycSubmissions.aadhaarFrontPath,
      aadhaarBackPath: kycSubmissions.aadhaarBackPath,
      panFrontPath: kycSubmissions.panFrontPath,
      panBackPath: kycSubmissions.panBackPath,
      bankProofPath: kycSubmissions.bankProofPath,
      status: kycSubmissions.status,
      createdAt: kycSubmissions.createdAt,
      userEmail: users.email,
      userName: users.name,
    })
    .from(kycSubmissions)
    .innerJoin(users, eq(users.id, kycSubmissions.userId))
    .where(
      and(
        // Placeholders from document uploads are not submissions yet.
        sql`${kycSubmissions.accountNumberEncrypted} <> ''`,
        status ? eq(kycSubmissions.status, status) : undefined,
      ),
    )
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
