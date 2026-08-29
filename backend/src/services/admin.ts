import { and, desc, eq, ilike, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { courses, orders, plans, subscriptions, users } from "@/db/schema";

/** Read paths for the admin area. Every caller must guard with requireAdmin(). */

export async function listUsersForAdmin(params: { query?: string; limit?: number } = {}) {
  const limit = Math.min(params.limit ?? 50, 200);
  const q = params.query?.trim();

  const where = q
    ? or(ilike(users.name, `%${q}%`), ilike(users.email, `%${q}%`), eq(users.referralCode, q.toUpperCase()))
    : undefined;

  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isBlocked: users.isBlocked,
      emailVerified: users.emailVerified,
      referralCode: users.referralCode,
      createdAt: users.createdAt,
      planName: plans.name,
      // Aggregated in SQL so the list does not fan out one query per row.
      enrollmentCount: sql<number>`cast((
        select count(*) from enrollments where enrollments.user_id = ${users.id}
      ) as int)`,
      spentInPaise: sql<number>`cast(coalesce((
        select sum(${orders.amountInPaise}) from ${orders}
        where ${orders.userId} = ${users.id} and ${orders.status} = 'paid'
      ), 0) as int)`,
    })
    .from(users)
    .leftJoin(
      subscriptions,
      and(eq(subscriptions.userId, users.id), eq(subscriptions.status, "active")),
    )
    .leftJoin(plans, eq(plans.id, subscriptions.planId))
    .where(where)
    .orderBy(desc(users.createdAt))
    .limit(limit);
}

export async function listOrdersForAdmin(params: { limit?: number } = {}) {
  return db
    .select({
      id: orders.id,
      itemType: orders.itemType,
      status: orders.status,
      listPriceInPaise: orders.listPriceInPaise,
      discountInPaise: orders.discountInPaise,
      amountInPaise: orders.amountInPaise,
      razorpayPaymentId: orders.razorpayPaymentId,
      createdAt: orders.createdAt,
      paidAt: orders.paidAt,
      userName: users.name,
      userEmail: users.email,
      courseTitle: courses.title,
      planName: plans.name,
    })
    .from(orders)
    .innerJoin(users, eq(users.id, orders.userId))
    .leftJoin(courses, eq(courses.id, orders.courseId))
    .leftJoin(plans, eq(plans.id, orders.planId))
    .orderBy(desc(orders.createdAt))
    .limit(Math.min(params.limit ?? 100, 500));
}

/** Headline numbers for the overview. */
export async function getAdminStats() {
  const [revenue] = await db
    .select({
      grossInPaise: sql<number>`cast(coalesce(sum(${orders.amountInPaise}) filter (where ${orders.status} = 'paid'), 0) as int)`,
      refundedInPaise: sql<number>`cast(coalesce(sum(${orders.amountInPaise}) filter (where ${orders.status} = 'refunded'), 0) as int)`,
      paidCount: sql<number>`cast(count(*) filter (where ${orders.status} = 'paid') as int)`,
      pendingCount: sql<number>`cast(count(*) filter (where ${orders.status} = 'created') as int)`,
    })
    .from(orders);

  const [people] = await db
    .select({
      userCount: sql<number>`cast(count(*) as int)`,
      verifiedCount: sql<number>`cast(count(*) filter (where ${users.emailVerified} is not null) as int)`,
    })
    .from(users);

  const [content] = await db
    .select({
      publishedCount: sql<number>`cast(count(*) filter (where ${courses.status} = 'published') as int)`,
      draftCount: sql<number>`cast(count(*) filter (where ${courses.status} = 'draft') as int)`,
    })
    .from(courses);

  const [members] = await db
    .select({
      activeCount: sql<number>`cast(count(*) filter (where ${subscriptions.status} = 'active') as int)`,
    })
    .from(subscriptions);

  return {
    ...revenue,
    ...people,
    ...content,
    activeMembers: members.activeCount,
    netInPaise: revenue.grossInPaise - revenue.refundedInPaise,
  };
}

/**
 * Paid revenue per day for the last N days.
 *
 * generate_series fills gaps so a day with no sales is a zero, not a missing
 * point — otherwise the chart draws a straight line across quiet days and
 * makes them look busy.
 */
export async function getRevenueByDay(days = 30) {
  const rows = await db.execute<{ day: string; total: string; orders: string }>(sql`
    select
      to_char(d.day, 'YYYY-MM-DD') as day,
      coalesce(sum(o.amount_in_paise), 0)::text as total,
      count(o.id)::text as orders
    from generate_series(
      current_date - ${days - 1}::int,
      current_date,
      '1 day'
    ) as d(day)
    left join orders o
      on o.paid_at::date = d.day and o.status = 'paid'
    group by d.day
    order by d.day
  `);

  const list = Array.isArray(rows) ? rows : ((rows as { rows?: unknown[] }).rows ?? []);

  return (list as Array<{ day: string; total: string; orders: string }>).map((r) => ({
    day: r.day,
    totalInPaise: Number(r.total),
    orders: Number(r.orders),
  }));
}
