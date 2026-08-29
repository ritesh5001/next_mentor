import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/backend/db";
import {
  commissions,
  plans,
  subscriptions,
  users,
  wallets,
  walletLedger,
} from "@/backend/db/schema";

/**
 * The commission engine — the single source of truth for what anyone earns.
 *
 * Invoked from the Razorpay webhook inside the same transaction that grants the
 * purchase, so a commission can never exist for an order that did not complete,
 * and a completed order can never silently skip its commission.
 *
 * Design rules, each of which exists because the alternative loses money:
 *
 *  - Commission is computed on the amount ACTUALLY CHARGED, never on list price
 *    or MRP. Paying 15% of a price nobody paid is paying out of your own pocket.
 *  - Every amount is integer paise; rates are basis points. No floats touch money.
 *  - UNIQUE(orderId, earnerId, level) makes a duplicate structurally impossible,
 *    however many times Razorpay retries the webhook.
 *  - Commissions start `pending` and mature after a refund window, so a refund
 *    can reverse them before the money is withdrawable.
 */

/**
 * How long a commission sits pending before it can be withdrawn.
 *
 * Must be at least as long as the window in which a refund is plausible —
 * otherwise someone withdraws, then the buyer refunds, and the wallet goes
 * negative with nothing to claw back.
 */
export const COMMISSION_MATURITY_DAYS = 7;

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type CommissionOutcome =
  | { status: "created"; amountInPaise: number; earnerId: string }
  | { status: "no_referrer" }
  | { status: "self_referral" }
  | { status: "no_rate" }
  | { status: "zero_amount" }
  | { status: "duplicate" };

/**
 * Awards commission for one paid order.
 *
 * MUST be called inside the fulfilment transaction — it takes `tx`, not `db`,
 * precisely so it cannot be called from somewhere that would leave a commission
 * committed while the order rolled back.
 */
export async function awardCommission(
  tx: Tx,
  params: {
    orderId: string;
    buyerId: string;
    /** Amount actually charged, net of any discount. */
    netAmountInPaise: number;
  },
): Promise<CommissionOutcome> {
  if (params.netAmountInPaise <= 0) return { status: "zero_amount" };

  const [buyer] = await tx
    .select({ referredById: users.referredById })
    .from(users)
    .where(eq(users.id, params.buyerId))
    .limit(1);

  if (!buyer?.referredById) return { status: "no_referrer" };

  // Belt and braces. Signup already rejects self-referral, but this is the
  // last gate before money is created and it costs one comparison.
  if (buyer.referredById === params.buyerId) return { status: "self_referral" };

  const rateBps = await getEarnerRateBps(tx, buyer.referredById);
  if (rateBps <= 0) return { status: "no_rate" };

  // Integer arithmetic end to end: (paise * bps) / 10000, floored. Flooring
  // rather than rounding means the platform never pays a paisa it did not
  // collect.
  const amountInPaise = Math.floor((params.netAmountInPaise * rateBps) / 10_000);
  if (amountInPaise <= 0) return { status: "zero_amount" };

  const maturesAt = new Date(Date.now() + COMMISSION_MATURITY_DAYS * 24 * 60 * 60 * 1000);

  const inserted = await tx
    .insert(commissions)
    .values({
      earnerId: buyer.referredById,
      sourceUserId: params.buyerId,
      orderId: params.orderId,
      level: 1,
      rateBps,
      baseAmountInPaise: params.netAmountInPaise,
      amountInPaise,
      status: "pending",
      maturesAt,
    })
    // The UNIQUE index does the real work; this turns a replayed webhook into
    // a no-op instead of an exception that would roll back the whole grant.
    .onConflictDoNothing()
    .returning({ id: commissions.id });

  if (inserted.length === 0) return { status: "duplicate" };

  await creditPending(tx, {
    userId: buyer.referredById,
    amountInPaise,
    referenceType: "commission",
    referenceId: inserted[0].id,
    note: `Commission on order ${params.orderId}`,
  });

  return { status: "created", amountInPaise, earnerId: buyer.referredById };
}

/**
 * The earner's commission rate, from their active plan.
 *
 * Someone with no plan earns nothing — the tier is what unlocks earning, which
 * is also what makes upgrading worth paying for.
 */
async function getEarnerRateBps(tx: Tx, userId: string): Promise<number> {
  const [row] = await tx
    .select({ rateBps: plans.commissionRateBps })
    .from(subscriptions)
    .innerJoin(plans, eq(plans.id, subscriptions.planId))
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active"),
        sql`(${subscriptions.expiresAt} is null or ${subscriptions.expiresAt} > now())`,
      ),
    )
    .orderBy(sql`${plans.commissionRateBps} desc`)
    .limit(1);

  return row?.rateBps ?? 0;
}

/** Creates the wallet row on first use and locks it for the caller. */
async function lockWallet(tx: Tx, userId: string) {
  await tx.insert(wallets).values({ userId }).onConflictDoNothing();

  const [wallet] = await tx
    .select()
    .from(wallets)
    .where(eq(wallets.userId, userId))
    .limit(1)
    // Row lock: two concurrent webhooks crediting the same affiliate would
    // otherwise both read the old balance and one write would vanish.
    .for("update");

  return wallet;
}

async function creditPending(
  tx: Tx,
  params: {
    userId: string;
    amountInPaise: number;
    referenceType: string;
    referenceId: string;
    note?: string;
  },
) {
  const wallet = await lockWallet(tx, params.userId);

  const pendingAfter = wallet.pendingInPaise + params.amountInPaise;
  const lifetimeAfter = wallet.lifetimeEarnedInPaise + params.amountInPaise;

  await tx
    .update(wallets)
    .set({
      pendingInPaise: pendingAfter,
      lifetimeEarnedInPaise: lifetimeAfter,
      updatedAt: new Date(),
    })
    .where(eq(wallets.id, wallet.id));

  await tx.insert(walletLedger).values({
    walletId: wallet.id,
    userId: params.userId,
    direction: "credit",
    amountInPaise: params.amountInPaise,
    availableAfterInPaise: wallet.availableInPaise,
    pendingAfterInPaise: pendingAfter,
    referenceType: params.referenceType,
    referenceId: params.referenceId,
    note: params.note,
  });
}

/**
 * Reverses every commission generated by a refunded order.
 *
 * Debits from `pending` where possible. If the commission already matured and
 * was withdrawn, the wallet can legitimately go negative — that is a real debt
 * and hiding it by clamping to zero would silently gift the money away. The
 * negative balance blocks future withdrawals until it is worked off.
 */
export async function reverseCommissionsForOrder(tx: Tx, orderId: string) {
  const rows = await tx
    .select({
      id: commissions.id,
      earnerId: commissions.earnerId,
      amountInPaise: commissions.amountInPaise,
      status: commissions.status,
    })
    .from(commissions)
    .where(eq(commissions.orderId, orderId))
    .for("update");

  let reversed = 0;

  for (const c of rows) {
    if (c.status === "reversed") continue;

    await tx
      .update(commissions)
      .set({ status: "reversed", reversedAt: new Date() })
      .where(eq(commissions.id, c.id));

    const wallet = await lockWallet(tx, c.earnerId);

    // Take it from pending first; only dip into available if it had matured.
    const fromPending = Math.min(wallet.pendingInPaise, c.amountInPaise);
    const fromAvailable = c.amountInPaise - fromPending;

    const pendingAfter = wallet.pendingInPaise - fromPending;
    const availableAfter = wallet.availableInPaise - fromAvailable;

    await tx
      .update(wallets)
      .set({
        pendingInPaise: pendingAfter,
        availableInPaise: availableAfter,
        lifetimeEarnedInPaise: Math.max(0, wallet.lifetimeEarnedInPaise - c.amountInPaise),
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, wallet.id));

    await tx.insert(walletLedger).values({
      walletId: wallet.id,
      userId: c.earnerId,
      direction: "debit",
      amountInPaise: c.amountInPaise,
      availableAfterInPaise: availableAfter,
      pendingAfterInPaise: pendingAfter,
      referenceType: "reversal",
      referenceId: c.id,
      note: `Reversed — order ${orderId} was refunded`,
    });

    reversed++;
  }

  return reversed;
}

/**
 * Moves matured commissions from pending to available.
 *
 * Run by the daily cron. Each earner is handled in its own transaction so one
 * bad row cannot stall everyone else's payout eligibility.
 */
export async function maturePendingCommissions(): Promise<{
  matured: number;
  earners: number;
}> {
  const due = await db
    .select({
      id: commissions.id,
      earnerId: commissions.earnerId,
      amountInPaise: commissions.amountInPaise,
    })
    .from(commissions)
    .where(
      and(eq(commissions.status, "pending"), sql`${commissions.maturesAt} <= now()`),
    );

  if (due.length === 0) return { matured: 0, earners: 0 };

  const byEarner = new Map<string, { ids: string[]; total: number }>();
  for (const c of due) {
    const entry = byEarner.get(c.earnerId) ?? { ids: [], total: 0 };
    entry.ids.push(c.id);
    entry.total += c.amountInPaise;
    byEarner.set(c.earnerId, entry);
  }

  let matured = 0;

  for (const [earnerId, { ids, total }] of byEarner) {
    await db.transaction(async (tx) => {
      const wallet = await lockWallet(tx, earnerId);

      const pendingAfter = wallet.pendingInPaise - total;
      const availableAfter = wallet.availableInPaise + total;

      await tx
        .update(wallets)
        .set({
          pendingInPaise: pendingAfter,
          availableInPaise: availableAfter,
          updatedAt: new Date(),
        })
        .where(eq(wallets.id, wallet.id));

      await tx
        .update(commissions)
        .set({ status: "approved", approvedAt: new Date() })
        .where(
          and(
            eq(commissions.earnerId, earnerId),
            eq(commissions.status, "pending"),
            sql`${commissions.id} = any(${sql.raw(`ARRAY[${ids.map((i) => `'${i}'`).join(",")}]`)})`,
          ),
        );

      // A transfer, not a credit: this money was already counted when the
      // commission was created. Recording it as a credit here would make the
      // ledger claim twice what the wallet holds.
      await tx.insert(walletLedger).values({
        walletId: wallet.id,
        userId: earnerId,
        direction: "transfer",
        amountInPaise: total,
        availableAfterInPaise: availableAfter,
        pendingAfterInPaise: pendingAfter,
        referenceType: "maturity",
        referenceId: null,
        note: `${ids.length} commission(s) matured and became withdrawable`,
      });

      matured += ids.length;
    });
  }

  return { matured, earners: byEarner.size };
}

/**
 * Recomputes a wallet from its ledger.
 *
 * The ledger is the source of truth; the wallet row is a cache. This is the
 * repair tool for when they disagree, and the assertion a test can make.
 *
 * `transfer` rows are excluded from the net deliberately — they move money
 * between pending and available without changing the total.
 */
export async function reconcileWallet(userId: string) {
  const [totals] = await db
    .select({
      credits: sql<number>`cast(coalesce(sum(${walletLedger.amountInPaise}) filter (where ${walletLedger.direction} = 'credit'), 0) as int)`,
      debits: sql<number>`cast(coalesce(sum(${walletLedger.amountInPaise}) filter (where ${walletLedger.direction} = 'debit'), 0) as int)`,
    })
    .from(walletLedger)
    .where(eq(walletLedger.userId, userId));

  const [wallet] = await db.select().from(wallets).where(eq(wallets.userId, userId)).limit(1);

  return {
    ledgerNetInPaise: totals.credits - totals.debits,
    walletTotalInPaise: wallet ? wallet.availableInPaise + wallet.pendingInPaise : 0,
    wallet,
  };
}
