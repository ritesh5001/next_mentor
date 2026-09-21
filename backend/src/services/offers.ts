import { and, asc, desc, eq, gte, inArray, isNull, lte, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { commissions, offers, users, type OfferCriterion, type OfferMetric } from "@/db/schema";

/**
 * Offers and how far each member has got towards them.
 *
 * Progress is derived from the ledger every time it is asked for, never stored
 * on the member: a cached percentage is a number that silently goes stale, and
 * this one decides who wins a prize.
 *
 * Only activity inside the offer window counts, which is what makes an offer a
 * promotion rather than a prize for past work.
 */

const LABELS: Record<OfferMetric, string> = {
  referrals: "New members joined under you",
  sales: "Packages sold through your link",
  earnings: "Commission earned",
};

/** Commission that counts towards an offer. A reversed sale never does. */
const COUNTED = ["pending", "approved", "paid"] as const;

export type OfferProgress = {
  id: string;
  title: string;
  description: string | null;
  reward: string;
  imageUrl: string | null;
  startsAt: Date;
  endsAt: Date | null;
  criteria: Array<{
    metric: OfferMetric;
    label: string;
    target: number;
    current: number;
    /** 0–100, capped: 120% of a target is still one completed criterion. */
    percent: number;
    met: boolean;
  }>;
  /** Overall completion across every criterion, 0–100. */
  percent: number;
  qualified: boolean;
  daysLeft: number | null;
};

function liveWhere(now: Date) {
  return and(
    eq(offers.isPublished, true),
    lte(offers.startsAt, now),
    or(isNull(offers.endsAt), gte(offers.endsAt, now)),
  );
}

/** Published offers that are running right now. */
export async function listLiveOffers() {
  const now = new Date();
  return db
    .select()
    .from(offers)
    .where(liveWhere(now))
    .orderBy(asc(offers.position), desc(offers.createdAt));
}

/**
 * Every live offer with this member's progress.
 *
 * One query per metric across all offers rather than per offer: the windows
 * differ, so they are counted per offer, but a handful of live offers is a
 * handful of cheap aggregates, and the alternative is N round trips to Neon.
 */
export async function getOffersForUser(userId: string): Promise<OfferProgress[]> {
  const live = await listLiveOffers();
  if (live.length === 0) return [];

  const now = new Date();

  return Promise.all(
    live.map(async (offer) => {
      const criteria = (offer.criteria ?? []).filter((c) => c.target > 0);
      const measured = await Promise.all(
        criteria.map(async (c) => {
          const current = await measure(userId, c, offer.startsAt, offer.endsAt ?? now);
          const percent = c.target > 0 ? Math.min(100, Math.round((current / c.target) * 100)) : 0;
          return {
            metric: c.metric,
            label: c.label?.trim() || LABELS[c.metric],
            target: c.target,
            current,
            percent,
            met: current >= c.target,
          };
        }),
      );

      return {
        id: offer.id,
        title: offer.title,
        description: offer.description,
        reward: offer.reward,
        imageUrl: offer.imageUrl,
        startsAt: offer.startsAt,
        endsAt: offer.endsAt,
        criteria: measured,
        // The average, so partial progress on a second target still shows.
        // "Qualified" is the strict one: every criterion has to be met.
        percent: measured.length
          ? Math.round(measured.reduce((n, m) => n + m.percent, 0) / measured.length)
          : 0,
        qualified: measured.length > 0 && measured.every((m) => m.met),
        daysLeft: offer.endsAt
          ? Math.max(0, Math.ceil((offer.endsAt.getTime() - now.getTime()) / 86_400_000))
          : null,
      };
    }),
  );
}

/** One criterion's current value for one member, inside the offer window. */
async function measure(
  userId: string,
  criterion: OfferCriterion,
  from: Date,
  to: Date,
): Promise<number> {
  if (criterion.metric === "referrals") {
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(users)
      .where(
        and(
          eq(users.referredById, userId),
          gte(users.referredAt, from),
          lte(users.referredAt, to),
          // Only people who actually paid: an unpaid pending signup is not a
          // referral, and counting it would let anyone win by typing emails.
          sql`exists (select 1 from subscriptions s where s.user_id = ${users.id} and s.status = 'active')`,
        ),
      );
    return row?.n ?? 0;
  }

  const field =
    criterion.metric === "earnings"
      ? sql<number>`coalesce(sum(${commissions.amountInPaise}), 0)::int`
      : sql<number>`count(*)::int`;

  const [row] = await db
    .select({ n: field })
    .from(commissions)
    .where(
      and(
        eq(commissions.earnerId, userId),
        inArray(commissions.status, [...COUNTED]),
        gte(commissions.createdAt, from),
        lte(commissions.createdAt, to),
      ),
    );
  return row?.n ?? 0;
}

/* ------------------------------------------------------------------ admin */

export async function listOffersForAdmin() {
  return db.select().from(offers).orderBy(asc(offers.position), desc(offers.createdAt));
}

export type OfferInput = {
  title: string;
  description?: string | null;
  reward: string;
  imageUrl?: string | null;
  startsAt: Date;
  endsAt?: Date | null;
  criteria: OfferCriterion[];
  isPublished: boolean;
  position?: number;
};

export async function createOffer(input: OfferInput, adminId: string) {
  const [row] = await db
    .insert(offers)
    .values({ ...input, position: input.position ?? 0, createdById: adminId })
    .returning({ id: offers.id });
  return row;
}

export async function updateOffer(id: string, input: Partial<OfferInput>) {
  const [row] = await db
    .update(offers)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(offers.id, id))
    .returning({ id: offers.id });
  return row ?? null;
}

export async function deleteOffer(id: string) {
  const [row] = await db.delete(offers).where(eq(offers.id, id)).returning({ id: offers.id });
  return row ?? null;
}

/**
 * Who currently qualifies for an offer — the list the owner needs when it is
 * time to hand the prize over.
 */
export async function getOfferLeaderboard(offerId: string, limit = 50) {
  const [offer] = await db.select().from(offers).where(eq(offers.id, offerId)).limit(1);
  if (!offer) return null;

  // Anyone who has at least one person under them or one commission in the
  // window — nobody else can have made progress.
  const candidates = await db
    .select({ id: users.id, name: users.name, email: users.email, memberId: users.referralCode })
    .from(users)
    .where(
      sql`exists (select 1 from ${users} r where r.referred_by_id = ${users.id})
        or exists (select 1 from ${commissions} c where c.earner_id = ${users.id})`,
    );

  const now = new Date();
  const rows = await Promise.all(
    candidates.map(async (u) => {
      const criteria = (offer.criteria ?? []).filter((c) => c.target > 0);
      const measured = await Promise.all(
        criteria.map(async (c) => ({
          ...c,
          current: await measure(u.id, c, offer.startsAt, offer.endsAt ?? now),
        })),
      );
      const percent = measured.length
        ? Math.round(
            measured.reduce((n, m) => n + Math.min(100, (m.current / m.target) * 100), 0) /
              measured.length,
          )
        : 0;
      return {
        ...u,
        percent,
        qualified: measured.length > 0 && measured.every((m) => m.current >= m.target),
        criteria: measured,
      };
    }),
  );

  return {
    offer,
    members: rows.filter((r) => r.percent > 0).sort((a, b) => b.percent - a.percent).slice(0, limit),
  };
}
