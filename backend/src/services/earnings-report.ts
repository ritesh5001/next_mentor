import { desc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  commissions,
  kycSubmissions,
  orders,
  payoutRequests,
  plans,
  subscriptions,
  users,
  wallets,
} from "@/db/schema";

/**
 * The payout sheet: what every member has earned and what is owed to them,
 * worked out from the ledger rather than by hand.
 *
 * The figures come from two places that are kept in step by the commission
 * and payout code: the wallet (earned / maturing / ready / withdrawn) and
 * payout_requests (money asked for but not yet sent). "To pay" is what is
 * ready AND belongs to someone whose KYC is approved — the amount the owner
 * can actually transfer today.
 */
export async function getEarningsReport() {
  const rows = await db
    .select({
      userId: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      memberId: users.referralCode,
      planName: sql<string | null>`(
        select ${plans.name} from ${subscriptions}
        join ${plans} on ${plans.id} = ${subscriptions.planId}
        where ${subscriptions.userId} = ${users.id} and ${subscriptions.status} = 'active'
        order by ${plans.tier} desc limit 1
      )`,
      referrals: sql<number>`cast((
        select count(*) from ${users} r where r.referred_by_id = ${users.id}
      ) as int)`,
      sales: sql<number>`cast((
        select count(*) from ${commissions} c
        where c.earner_id = ${users.id} and c.status <> 'reversed'
      ) as int)`,
      lifetimeEarnedInPaise: sql<number>`coalesce(${wallets.lifetimeEarnedInPaise}, 0)`,
      pendingInPaise: sql<number>`coalesce(${wallets.pendingInPaise}, 0)`,
      availableInPaise: sql<number>`coalesce(${wallets.availableInPaise}, 0)`,
      withdrawnInPaise: sql<number>`coalesce(${wallets.withdrawnInPaise}, 0)`,
      inProcessInPaise: sql<number>`cast(coalesce((
        select sum(p.amount_in_paise) from ${payoutRequests} p
        where p.user_id = ${users.id} and p.status in ('requested', 'approved')
      ), 0) as int)`,
      lastEarnedAt: sql<string | null>`(
        select max(c.created_at) from ${commissions} c where c.earner_id = ${users.id}
      )`,
      kycStatus: kycSubmissions.status,
      bankAccountName: kycSubmissions.bankAccountName,
      accountNumberLast4: kycSubmissions.accountNumberLast4,
      ifsc: kycSubmissions.ifsc,
    })
    .from(users)
    .leftJoin(wallets, eq(wallets.userId, users.id))
    .leftJoin(kycSubmissions, eq(kycSubmissions.userId, users.id))
    // Anyone with money on record, or at least one person under them.
    .where(
      sql`coalesce(${wallets.lifetimeEarnedInPaise}, 0) > 0
        or exists (select 1 from ${users} r where r.referred_by_id = ${users.id})`,
    )
    .orderBy(desc(sql`coalesce(${wallets.lifetimeEarnedInPaise}, 0)`));

  const members = rows.map((r) => ({
    ...r,
    // Payable now = ready to withdraw, and only once bank details are verified.
    toPayInPaise: r.kycStatus === "approved" ? Math.max(0, r.availableInPaise) : 0,
  }));

  const sum = (key: keyof (typeof members)[number]) =>
    members.reduce((n, m) => n + (typeof m[key] === "number" ? (m[key] as number) : 0), 0);

  return {
    members,
    totals: {
      members: members.length,
      lifetimeEarnedInPaise: sum("lifetimeEarnedInPaise"),
      pendingInPaise: sum("pendingInPaise"),
      availableInPaise: sum("availableInPaise"),
      inProcessInPaise: sum("inProcessInPaise"),
      withdrawnInPaise: sum("withdrawnInPaise"),
      toPayInPaise: sum("toPayInPaise"),
    },
  };
}

/** One member's commissions line by line, and their payout history. */
export async function getMemberEarnings(userId: string) {
  const [member] = await db
    .select({ id: users.id, name: users.name, email: users.email, memberId: users.referralCode })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (!member) return null;

  const [lines, payouts] = await Promise.all([
    db
      .select({
        id: commissions.id,
        createdAt: commissions.createdAt,
        maturesAt: commissions.maturesAt,
        status: commissions.status,
        rateBps: commissions.rateBps,
        baseAmountInPaise: commissions.baseAmountInPaise,
        amountInPaise: commissions.amountInPaise,
        level: commissions.level,
        fromName: sql<string | null>`(select u.name from ${users} u where u.id = ${commissions.sourceUserId})`,
        fromEmail: sql<string | null>`(select u.email from ${users} u where u.id = ${commissions.sourceUserId})`,
        itemName: sql<string | null>`(
          select coalesce(
            (select p.name from ${plans} p where p.id = o.plan_id),
            (select c.title from courses c where c.id = o.course_id)
          ) from ${orders} o where o.id = ${commissions.orderId}
        )`,
      })
      .from(commissions)
      .where(eq(commissions.earnerId, userId))
      .orderBy(desc(commissions.createdAt)),
    db
      .select({
        id: payoutRequests.id,
        amountInPaise: payoutRequests.amountInPaise,
        status: payoutRequests.status,
        utrNumber: payoutRequests.utrNumber,
        createdAt: payoutRequests.createdAt,
        processedAt: payoutRequests.processedAt,
      })
      .from(payoutRequests)
      .where(eq(payoutRequests.userId, userId))
      .orderBy(desc(payoutRequests.createdAt)),
  ]);

  return { member, commissions: lines, payouts };
}
