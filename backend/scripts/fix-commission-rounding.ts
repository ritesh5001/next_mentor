/**
 * One-off: commission moved to whole rupees (₹500 / ₹2,500 / ₹5,000).
 *
 * Plan rates had been nudged to 50.06% / 50.03% / 50.01% to get near ₹500,
 * which left paise on every commission. This puts every plan back on 50%, and
 * re-rounds each unpaid commission to the new rule, moving the difference
 * through the wallet with a ledger entry so balances still reconcile.
 *
 *   tsx --env-file=.env scripts/fix-commission-rounding.ts          # dry run
 *   tsx --env-file=.env scripts/fix-commission-rounding.ts --apply
 */
import { eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { commissions, plans, users, wallets, walletLedger } from "@/db/schema";
import { invalidateTag } from "@/lib/cache";
import { commissionFor } from "@/lib/referral";
import { PLANS_TAG } from "@/services/plans";

const RATE_BPS = 5000;
const apply = process.argv.includes("--apply");

const planRows = await db
  .select({ name: plans.name, rate: plans.commissionRateBps })
  .from(plans);
for (const p of planRows) {
  if (p.rate !== RATE_BPS) console.log(`plan ${p.name}: ${p.rate / 100}% -> ${RATE_BPS / 100}%`);
}

const rows = await db
  .select({
    id: commissions.id,
    earnerId: commissions.earnerId,
    earnerName: users.name,
    status: commissions.status,
    base: commissions.baseAmountInPaise,
    amount: commissions.amountInPaise,
  })
  .from(commissions)
  .innerJoin(users, eq(users.id, commissions.earnerId))
  .where(inArray(commissions.status, ["pending", "approved"]));

const changes = rows
  .map((r) => ({ ...r, next: commissionFor(r.base, RATE_BPS) }))
  .filter((r) => r.next !== r.amount);

for (const c of changes) {
  console.log(
    `${c.earnerName ?? c.earnerId} (${c.status}) sale ₹${c.base / 100}: ₹${c.amount / 100} -> ₹${c.next / 100}`,
  );
}

if (!apply) {
  console.log(`Dry run: ${changes.length} commission(s). Pass --apply to write.`);
  process.exit(0);
}

await db.transaction(async (tx) => {
  await tx.update(plans).set({ commissionRateBps: RATE_BPS, updatedAt: new Date() });

  for (const c of changes) {
    const delta = c.next - c.amount;
    await tx
      .update(commissions)
      .set({ amountInPaise: c.next, rateBps: RATE_BPS })
      .where(eq(commissions.id, c.id));

    const [wallet] = await tx
      .select()
      .from(wallets)
      .where(eq(wallets.userId, c.earnerId))
      .limit(1)
      .for("update");

    // Pending commission sits in `pending`; matured, unpaid commission in `available`.
    const pendingAfter = wallet.pendingInPaise + (c.status === "pending" ? delta : 0);
    const availableAfter = wallet.availableInPaise + (c.status === "approved" ? delta : 0);

    await tx
      .update(wallets)
      .set({
        pendingInPaise: pendingAfter,
        availableInPaise: availableAfter,
        lifetimeEarnedInPaise: wallet.lifetimeEarnedInPaise + delta,
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, wallet.id));

    await tx.insert(walletLedger).values({
      walletId: wallet.id,
      userId: c.earnerId,
      direction: delta > 0 ? "credit" : "debit",
      amountInPaise: Math.abs(delta),
      availableAfterInPaise: availableAfter,
      pendingAfterInPaise: pendingAfter,
      referenceType: "adjustment",
      referenceId: c.id,
      note: `Commission rounded to ₹${c.next / 100}`,
    });
  }
});

invalidateTag(PLANS_TAG);
console.log(`Applied: ${changes.length} commission(s) re-rounded, plan rates set to ${RATE_BPS / 100}%.`);
process.exit(0);
