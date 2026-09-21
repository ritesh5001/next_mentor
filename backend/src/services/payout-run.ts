import { and, asc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  commissions,
  kycSubmissions,
  payoutRequests,
  users,
  wallets,
  walletLedger,
} from "@/db/schema";
import { decryptSecret } from "@/lib/crypto";

/**
 * The Monday payout run.
 *
 * Payouts go out weekly, so the question the owner actually asks is not "what
 * has everyone ever earned" (that is the earnings report) but "who do I
 * transfer money to this Monday, and how much". This file answers exactly
 * that, splitting every member with money into four buckets:
 *
 *   pay        — matured, KYC approved: transfer this today
 *   blocked    — matured, but KYC is not approved, so it cannot be sent
 *   inProcess  — a transfer already committed and not yet marked paid
 *   forecast   — still inside the refund window, grouped by the Monday each
 *                portion first becomes payable
 *
 * Amounts come from the wallet, which the commission code keeps in step with
 * the ledger, so nothing here is calculated by hand.
 */

/** India Standard Time, in minutes ahead of UTC. The business runs on it. */
const IST_OFFSET_MIN = 330;

/** Midnight IST on the coming Monday — today, when today is Monday. */
export function nextMondayIst(now = new Date()): Date {
  const ist = new Date(now.getTime() + IST_OFFSET_MIN * 60_000);
  const daysAhead = (8 - (ist.getUTCDay() || 7)) % 7; // Mon = 1 … Sun = 7
  const monday = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate() + daysAhead);
  return new Date(monday - IST_OFFSET_MIN * 60_000);
}

/**
 * The run that first pays a commission maturing at `maturesAt`.
 *
 * Not simply the next Monday: a commission that matures on Monday afternoon
 * has not cleared by the time that morning's transfers go out, and the nightly
 * job that approves it has not run either — so it belongs to the Monday after.
 */
function payoutRunFor(maturesAt: Date): Date {
  const monday = nextMondayIst(maturesAt);
  return monday >= maturesAt ? monday : new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);
}

export type PayoutRunMember = {
  userId: string;
  name: string | null;
  email: string;
  phone: string | null;
  memberId: string;
  amountInPaise: number;
  kycStatus: "pending" | "approved" | "rejected" | null;
  bankAccountName: string | null;
  accountNumber: string | null;
  accountNumberLast4: string | null;
  ifsc: string | null;
  lastPaidAt: Date | null;
};

export async function getWeeklyPayoutRun(now = new Date()) {
  const runDate = nextMondayIst(now);
  const followingRunDate = new Date(runDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const rows = await db
    .select({
      userId: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      memberId: users.referralCode,
      availableInPaise: sql<number>`coalesce(${wallets.availableInPaise}, 0)::int`,
      pendingInPaise: sql<number>`coalesce(${wallets.pendingInPaise}, 0)::int`,
      withdrawnInPaise: sql<number>`coalesce(${wallets.withdrawnInPaise}, 0)::int`,
      inProcessInPaise: sql<number>`cast(coalesce((
        select sum(p.amount_in_paise) from ${payoutRequests} p
        where p.user_id = ${users.id} and p.status in ('requested', 'approved')
      ), 0) as int)`,
      lastPaidAt: sql<Date | null>`(
        select max(p.processed_at) from ${payoutRequests} p
        where p.user_id = ${users.id} and p.status = 'paid'
      )`,
      kycStatus: kycSubmissions.status,
      bankAccountName: kycSubmissions.bankAccountName,
      accountNumberEnc: kycSubmissions.accountNumberEncrypted,
      accountNumberLast4: kycSubmissions.accountNumberLast4,
      ifsc: kycSubmissions.ifsc,
    })
    .from(users)
    .leftJoin(wallets, eq(wallets.userId, users.id))
    .leftJoin(kycSubmissions, eq(kycSubmissions.userId, users.id))
    .where(
      sql`coalesce(${wallets.availableInPaise}, 0) > 0
        or coalesce(${wallets.pendingInPaise}, 0) > 0
        or exists (
          select 1 from ${payoutRequests} p
          where p.user_id = ${users.id} and p.status in ('requested', 'approved')
        )`,
    );

  /**
   * The full account number is decrypted only for people actually being paid
   * this run — the owner cannot make a bank transfer to a masked number, and
   * limiting it to the pay list keeps it off every other screen.
   */
  const toMember = (r: (typeof rows)[number], amountInPaise: number, withAccount: boolean) => ({
    userId: r.userId,
    name: r.name,
    email: r.email,
    phone: r.phone,
    memberId: r.memberId,
    amountInPaise,
    kycStatus: r.kycStatus,
    bankAccountName: r.bankAccountName,
    accountNumber: withAccount && r.accountNumberEnc ? safeDecrypt(r.accountNumberEnc) : null,
    accountNumberLast4: r.accountNumberLast4,
    ifsc: r.ifsc,
    lastPaidAt: r.lastPaidAt,
  }) satisfies PayoutRunMember;

  const byAmount = (a: PayoutRunMember, b: PayoutRunMember) => b.amountInPaise - a.amountInPaise;

  const pay = rows
    .filter((r) => r.availableInPaise > 0 && r.kycStatus === "approved")
    .map((r) => toMember(r, r.availableInPaise, true))
    .sort(byAmount);

  const blocked = rows
    .filter((r) => r.availableInPaise > 0 && r.kycStatus !== "approved")
    .map((r) => toMember(r, r.availableInPaise, false))
    .sort(byAmount);

  const inProcess = rows
    .filter((r) => r.inProcessInPaise > 0)
    .map((r) => toMember(r, r.inProcessInPaise, false))
    .sort(byAmount);

  /**
   * What is still maturing, grouped by the Monday it can first be paid.
   *
   * Grouped by run rather than summed into one "next week" figure because a
   * commission that clears on Monday afternoon misses that morning's transfer
   * and belongs to the Monday after — a cut-off at midnight would promise
   * money that is not there yet.
   */
  const pendingRows = await db
    .select({
      earnerId: commissions.earnerId,
      amountInPaise: commissions.amountInPaise,
      maturesAt: commissions.maturesAt,
    })
    .from(commissions)
    .where(eq(commissions.status, "pending"))
    .orderBy(asc(commissions.maturesAt));

  const byUser = new Map(rows.map((r) => [r.userId, r]));
  const runs = new Map<number, Map<string, number>>();
  for (const p of pendingRows) {
    const runAt = payoutRunFor(p.maturesAt).getTime();
    const bucket = runs.get(runAt) ?? new Map<string, number>();
    bucket.set(p.earnerId, (bucket.get(p.earnerId) ?? 0) + p.amountInPaise);
    runs.set(runAt, bucket);
  }

  const forecast = [...runs.entries()]
    .sort(([a], [b]) => a - b)
    .map(([runAt, bucket]) => {
      const members = [...bucket.entries()]
        .flatMap(([userId, amount]) => {
          const row = byUser.get(userId);
          return row ? [toMember(row, amount, false)] : [];
        })
        .sort(byAmount);
      return {
        runDate: new Date(runAt),
        totalInPaise: members.reduce((n, m) => n + m.amountInPaise, 0),
        members,
      };
    });

  const sum = (list: PayoutRunMember[]) => list.reduce((n, m) => n + m.amountInPaise, 0);

  return {
    runDate,
    followingRunDate,
    pay,
    blocked,
    inProcess,
    forecast,
    totals: {
      payInPaise: sum(pay),
      blockedInPaise: sum(blocked),
      inProcessInPaise: sum(inProcess),
      maturingInPaise: forecast.reduce((n, r) => n + r.totalInPaise, 0),
    },
  };
}

/** A bad key or a corrupted row must not take the whole payout sheet down. */
function safeDecrypt(payload: string): string | null {
  try {
    return decryptSecret(payload);
  } catch {
    return null;
  }
}

export type RecordPayoutResult = { ok: true; message: string } | { ok: false; error: string };

/**
 * Records a transfer the owner made from their bank during the Monday run.
 *
 * The member never asked for this one, so unlike `markPayoutPaid` it has to do
 * both halves: debit the wallet *and* close the request as paid. It writes a
 * `payout_requests` row so the money leaves through the same audited path as a
 * member-initiated withdrawal, and the ledger entry keeps the wallet
 * reconcilable.
 */
export async function recordDirectPayout(params: {
  userId: string;
  adminId: string;
  amountInPaise: number;
  utrNumber: string;
}): Promise<RecordPayoutResult> {
  const utr = params.utrNumber.trim();
  if (utr.length < 6) {
    return { ok: false, error: "Enter the bank UTR / reference number for this transfer." };
  }
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
      return { ok: false as const, error: "That member's KYC is not approved yet." };
    }

    const [wallet] = await tx
      .select()
      .from(wallets)
      .where(eq(wallets.userId, params.userId))
      .limit(1)
      .for("update");

    if (!wallet) return { ok: false as const, error: "That member has no earnings yet." };
    if (params.amountInPaise > wallet.availableInPaise) {
      return {
        ok: false as const,
        error: `Only ₹${(wallet.availableInPaise / 100).toFixed(2)} is ready to pay.`,
      };
    }

    const [request] = await tx
      .insert(payoutRequests)
      .values({
        userId: params.userId,
        kycId: kyc.id,
        amountInPaise: params.amountInPaise,
        status: "paid",
        utrNumber: utr,
        processedById: params.adminId,
        processedAt: new Date(),
        adminNote: "Weekly payout run",
      })
      .returning({ id: payoutRequests.id });

    const availableAfter = wallet.availableInPaise - params.amountInPaise;

    await tx
      .update(wallets)
      .set({
        availableInPaise: availableAfter,
        withdrawnInPaise: wallet.withdrawnInPaise + params.amountInPaise,
        updatedAt: new Date(),
      })
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
      note: `Weekly payout · UTR ${utr}`,
    });

    await tx
      .update(commissions)
      .set({ status: "paid", payoutRequestId: request.id })
      .where(and(eq(commissions.earnerId, params.userId), eq(commissions.status, "approved")));

    return { ok: true as const, message: `Paid ₹${(params.amountInPaise / 100).toFixed(2)} · UTR ${utr}` };
  });
}
