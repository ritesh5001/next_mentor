import { cache } from "react";
import { redirect } from "next/navigation";
import { forbidden, unauthorized } from "next/navigation";
import type { CatalogCourse, CourseDetail, KycDocumentUrls, LessonResource } from "@nextmentor/shared";

import { api, apiOrNull } from "./api";
import { getSession, type SessionUser } from "./session";

/**
 * Every read the pages perform.
 *
 * Function names match the old service layer so the pages read the same, but
 * each one is now an HTTP call to the Render API. The frontend holds no
 * database credentials.
 */

/* ------------------------------------------------------------------ guards */

/** Redirects to login when signed out. Use at the top of a protected page. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSession();
  if (!user) unauthorized();
  return user;
}

/**
 * A signed-in student with a live plan — or an admin.
 *
 * Membership is paid: an account without an active plan is sent to plan
 * selection instead of the page it asked for. The API enforces the same rule
 * (402 `plan_required`); this is the redirect that makes it a flow, not an error.
 */
export async function requireMember(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role === "admin") return user;
  if (!(await getActiveSubscription())) redirect("/choose-plan");
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  // Rendering guard only. The API re-checks the role on every call it serves,
  // and that check is the one that actually protects the data.
  if (user.role !== "admin") forbidden();
  return user;
}

export { getSession, getSession as auth, getSession as getSessionUser };

/* ---------------------------------------------------------------- catalog */

/**
 * Public reads that must never take the page down with them.
 *
 * A marketing page has to render even when the API is unreachable — during a
 * Render cold start, a deploy, or a misconfigured API_URL. Before this, an
 * unreachable API turned the homepage into a blank 500, which is a far worse
 * outcome than a page that renders with an empty pricing section.
 *
 * Authenticated reads deliberately do NOT use this: silently showing an empty
 * dashboard would hide a real failure from someone who has paid.
 */
async function publicRead<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(
      `[queries] public read "${label}" failed — rendering without it. ` +
        `Check API_URL and that the API is reachable.`,
      err,
    );
    return fallback;
  }
}

/** Public, identical for everyone — cached at the edge for a minute. */
export const getCatalog = () =>
  publicRead(
    "catalog",
    () =>
      api<CatalogCourse[]>("/api/courses", {
        anonymous: true,
        revalidate: 60,
        tags: ["catalog"],
      }),
    [] as CatalogCourse[],
  );

type ActivePlan = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  priceInPaise: number;
  mrpInPaise: number | null;
  durationDays: number | null;
  features: string[];
  grantsAllCourses: boolean;
  /** Pack level; higher tiers include every lower tier's courses. */
  tier: number;
  isFeatured: boolean;
  commissionRateBps: number;
};

export const getActivePlans = (): Promise<ActivePlan[]> =>
  publicRead(
    "plans",
    () =>
      api<ActivePlan[]>("/api/plans", {
        anonymous: true,
        revalidate: 60,
        tags: ["plans"],
      }),
    [],
  );

/** Per-viewer (it carries `enrolled`), so never cached. */
export const getCourseBySlug = (slug: string) =>
  apiOrNull<CourseDetail & { enrolled: boolean }>(`/api/courses/${slug}`);

export const getEnrolledCourses = () =>
  api<
    Array<{
      id: string;
      slug: string;
      title: string;
      thumbnailKey: string | null;
      instructorName: string | null;
      enrolledAt: string;
      lessonCount: number;
      completedCount: number;
    }>
  >("/api/my/courses");

export const getActiveSubscription = () =>
  apiOrNull<{
    planId: string;
    planName: string;
    planSlug: string;
    planTier: number;
    planPriceInPaise: number;
    commissionRateBps: number;
    grantsAllCourses: boolean;
    startsAt: string;
    expiresAt: string | null;
  }>("/api/my/subscription");

/**
 * Who a referral ID belongs to, and the top package they may introduce.
 * Anonymous: the signup page needs it before anyone is signed in.
 */
export const getReferrer = (code: string) =>
  api<
    | { found: false }
    | { found: true; code: string; name: string | null; maxTier: number }
  >(`/api/signup/referrer?code=${encodeURIComponent(code)}`, { anonymous: true });

export type OfferMetric = "referrals" | "sales" | "earnings";

export type OfferCriterion = { metric: OfferMetric; target: number; label?: string };

export type OfferProgress = {
  id: string;
  title: string;
  description: string | null;
  reward: string;
  imageUrl: string | null;
  startsAt: string;
  endsAt: string | null;
  criteria: Array<{
    metric: OfferMetric;
    label: string;
    target: number;
    current: number;
    percent: number;
    met: boolean;
  }>;
  percent: number;
  qualified: boolean;
  daysLeft: number | null;
};

/** Live offers and how far this member has got towards each. */
export const getMyOffers = () => api<OfferProgress[]>("/api/my/offers");

export type AdminOffer = {
  id: string;
  title: string;
  description: string | null;
  reward: string;
  imageUrl: string | null;
  startsAt: string;
  endsAt: string | null;
  criteria: OfferCriterion[];
  isPublished: boolean;
  position: number;
  createdAt: string;
};

export const listOffersForAdmin = () => api<AdminOffer[]>("/api/admin/offers");

/** Who qualifies for one offer right now. */
export const getOfferStandings = (offerId: string) =>
  apiOrNull<{
    offer: AdminOffer;
    members: Array<{
      id: string;
      name: string | null;
      email: string;
      memberId: string;
      percent: number;
      qualified: boolean;
      criteria: Array<{ metric: OfferMetric; target: number; label?: string; current: number }>;
    }>;
  }>(`/api/admin/offers/${offerId}/standings`);

/** Live price for every package for this member, with the upgrade deadline. */
export type PlanQuote =
  | { kind: "buy"; amountInPaise: number }
  | { kind: "upgrade"; amountInPaise: number; discounted: boolean; windowEndsAt: string }
  | { kind: "blocked"; reason: string };

export const getPlanQuotes = () =>
  api<{
    upgradeWindowHours: number;
    quotes: Array<{ slug: string; tier: number; priceInPaise: number; quote: PlanQuote }>;
  }>("/api/plans/quotes");

export const getMyCoupons = () =>
  api<
    Array<{
      id: string;
      code: string;
      description: string | null;
      discountType: "percent" | "flat";
      value: number;
      maxDiscountInPaise: number | null;
      minOrderInPaise: number;
      validUntil: string | null;
      isUsedUp: boolean;
    }>
  >("/api/my/coupons");

/** Cached per request: the dashboard shell and its pages both read it. */
export const getProfile = cache(() =>
  api<{
    name: string | null;
    email: string;
    phone: string | null;
    image: string | null;
    role: "student" | "instructor" | "admin";
    referralCode: string;
    createdAt: string;
    hasPassword: boolean;
    avatarUrl: string | null;
    subscription: { planName: string } | null;
  }>("/api/profile"),
);

/** Student feedback for the homepage. Public, cached like the catalogue. */
export type Testimonial = {
  id: string;
  name: string;
  who: string | null;
  course: string | null;
  body: string;
};

export const getTestimonials = () =>
  publicRead(
    "testimonials",
    () => api<Testimonial[]>("/api/testimonials", { anonymous: true, revalidate: 60, tags: ["testimonials"] }),
    [] as Testimonial[],
  );

export const listTestimonialsForAdmin = () =>
  api<Array<Testimonial & { isPublished: boolean; position: number; createdAt: string }>>(
    "/api/admin/testimonials",
  );

/** Every certificate, for the admin list. */
export const listCertificatesForAdmin = () =>
  api<
    Array<{
      serial: string;
      recipientName: string;
      courseTitle: string;
      issuedAt: string;
      revokedAt: string | null;
      issuedById: string | null;
      email: string | null;
    }>
  >("/api/admin/certificates");

export type EarningsRow = {
  userId: string;
  name: string | null;
  email: string;
  phone: string | null;
  memberId: string;
  planName: string | null;
  referrals: number;
  sales: number;
  lifetimeEarnedInPaise: number;
  pendingInPaise: number;
  availableInPaise: number;
  withdrawnInPaise: number;
  inProcessInPaise: number;
  toPayInPaise: number;
  lastEarnedAt: string | null;
  kycStatus: "pending" | "approved" | "rejected" | null;
  bankAccountName: string | null;
  accountNumberLast4: string | null;
  ifsc: string | null;
};

/** Admin payout sheet: every earning member, with totals. */
export const getEarningsReport = () =>
  api<{
    members: EarningsRow[];
    totals: {
      members: number;
      lifetimeEarnedInPaise: number;
      pendingInPaise: number;
      availableInPaise: number;
      inProcessInPaise: number;
      withdrawnInPaise: number;
      toPayInPaise: number;
    };
  }>("/api/admin/earnings");

export type PayoutRunRow = {
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
  lastPaidAt: string | null;
};

/** The Monday payout run: who to transfer money to this week, and how much. */
export const getWeeklyPayoutRun = () =>
  api<{
    runDate: string;
    followingRunDate: string;
    pay: PayoutRunRow[];
    blocked: PayoutRunRow[];
    inProcess: PayoutRunRow[];
    forecast: Array<{ runDate: string; totalInPaise: number; members: PayoutRunRow[] }>;
    totals: {
      payInPaise: number;
      blockedInPaise: number;
      inProcessInPaise: number;
      maturingInPaise: number;
    };
  }>("/api/admin/payout-run");

/** One member's commissions line by line, and their payouts. */
export const getMemberEarnings = (userId: string) =>
  apiOrNull<{
    member: { id: string; name: string | null; email: string; memberId: string };
    commissions: Array<{
      id: string;
      createdAt: string;
      maturesAt: string;
      status: "pending" | "approved" | "paid" | "reversed";
      rateBps: number;
      baseAmountInPaise: number;
      amountInPaise: number;
      level: number;
      fromName: string | null;
      fromEmail: string | null;
      itemName: string | null;
    }>;
    payouts: Array<{
      id: string;
      amountInPaise: number;
      status: "requested" | "approved" | "paid" | "rejected";
      utrNumber: string | null;
      createdAt: string;
      processedAt: string | null;
    }>;
  }>(`/api/admin/earnings/${userId}`);

/* ------------------------------------------------------------------ learn */

export type LearnView = {
  course: { id: string; slug: string; title: string };
  curriculum: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      durationSeconds: number;
      isReady: boolean;
      isFreePreview: boolean;
      isCompleted: boolean;
      lastPositionSeconds: number;
      resources: LessonResource[];
    }>;
  }>;
  active: {
    id: string;
    title: string;
    durationSeconds: number;
    lastPositionSeconds: number;
    resources: LessonResource[];
  };
  totalLessons: number;
  completedLessons: number;
  playback: { manifestUrl: string; expiresInSeconds: number } | null;
  playbackError: string | null;
};

/** Curriculum, active lesson and a signed playback URL, in one call. */
export const getLearnView = (slug: string, lessonId?: string) =>
  apiOrNull<LearnView>(`/api/learn/${slug}${lessonId ? `?lesson=${lessonId}` : ""}`);

/* -------------------------------------------------------------- affiliate */

export const getAffiliateSummary = () =>
  api<{
    wallet: {
      availableInPaise: number;
      pendingInPaise: number;
      lifetimeEarnedInPaise: number;
      withdrawnInPaise: number;
    };
    stats: {
      clicks: number;
      clicksLast30: number;
      uniqueVisitors: number;
      signups: number;
      buyers: number;
      signupRate: number;
    };
    associates: Array<{
      id: string;
      name: string | null;
      email: string;
      joinedAt: string;
      purchaseCount: number;
      earnedInPaise: number;
    }>;
    referralCode: string;
  }>("/api/affiliate/summary");

export const getEarnings = () =>
  api<{
    wallet: {
      availableInPaise: number;
      pendingInPaise: number;
      lifetimeEarnedInPaise: number;
      withdrawnInPaise: number;
    };
    commissions: Array<{
      id: string;
      amountInPaise: number;
      baseAmountInPaise: number;
      rateBps: number;
      status: "pending" | "approved" | "paid" | "reversed";
      maturesAt: string;
      createdAt: string;
      sourceName: string | null;
    }>;
    ledger: Array<{
      id: string;
      direction: "credit" | "debit" | "transfer";
      amountInPaise: number;
      referenceType: string;
      note: string | null;
      createdAt: string;
    }>;
    kyc: KycRecord | null;
    payouts: Array<{
      id: string;
      amountInPaise: number;
      status: "requested" | "approved" | "paid" | "rejected";
      utrNumber: string | null;
      adminNote: string | null;
      createdAt: string;
    }>;
    minPayoutInPaise: number;
  }>("/api/affiliate/earnings");

export type KycRecord = {
  id: string;
  fullName: string;
  bankAccountName: string;
  accountNumberLast4: string;
  ifsc: string;
  aadhaarLast4: string | null;
  status: "pending" | "approved" | "rejected";
  rejectionReason: string | null;
  createdAt: string;
  // Presence flags, not paths. The API deliberately never sends a document's
  // storage path to its owner — it is only useful with a signed URL, and only
  // staff get one.
  hasAadhaarFront: boolean;
  hasAadhaarBack: boolean;
  hasPanFront: boolean;
  hasPanBack: boolean;
  hasBankProof: boolean;
};

export const getMyKyc = () => apiOrNull<KycRecord>("/api/affiliate/kyc");

export const getOverview = () =>
  api<{
    earned: { today: number; last7: number; last30: number; allTime: number };
    series: Array<{ day: string; amountInPaise: number }>;
    sales: Array<{ planName: string; count: number }>;
    totalSales: number;
    members: { today: number; last7: number; last30: number; allTime: number };
    clicks: { today: number; last7: number; last30: number; allTime: number };
    wallet: {
      availableInPaise: number;
      pendingInPaise: number;
      lifetimeEarnedInPaise: number;
    };
    recent: Array<{
      userId: string;
      name: string | null;
      referralCode: string;
      joinedAt: string | null;
      amountInPaise: number;
      status: "pending" | "approved" | "paid" | "reversed";
    }>;
    monthEarnedInPaise: number;
    planName: string | null;
  }>("/api/affiliate/overview");

export const getTopPerformers = () =>
  api<
    Array<{
      userId: string;
      name: string | null;
      image: string | null;
      earnedInPaise: number;
      saleCount: number;
    }>
  >("/api/affiliate/leaderboard");

/* ----------------------------------------------------------- certificates */

export const getMyCertificates = () =>
  api<{
    issued: Array<{
      serial: string;
      courseTitle: string;
      courseSlug: string;
      issuedAt: string;
      revokedAt: string | null;
    }>;
    candidates: Array<{
      courseId: string;
      courseTitle: string;
      courseSlug: string;
      total: number;
      completed: number;
      percent: number;
      isComplete: boolean;
      certificateSerial: string | null;
    }>;
  }>("/api/certificates/my");

export const getCertificateBySerial = (serial: string) =>
  apiOrNull<{
    serial: string;
    recipientName: string;
    courseTitle: string;
    issuedAt: string;
    revokedAt: string | null;
  }>(`/api/certificates/verify/${serial}`, { anonymous: true });

/* ------------------------------------------------------------- engagement */

export const getAchievementBoard = () =>
  api<
    Array<{
      id: string;
      code: string;
      title: string;
      description: string;
      icon: string;
      tier: string;
      unlockedAt: string | null;
      current: number;
      threshold: number;
      percent: number;
      metric?: string;
    }>
  >("/api/achievements");

export const getLeadsPage = () =>
  api<{
    leads: Array<{
      id: string;
      name: string;
      email: string | null;
      phone: string | null;
      source: string | null;
      status: "new" | "contacted" | "qualified" | "converted" | "lost";
      notes: string | null;
      createdAt: string;
    }>;
    stats: { total: number; new: number; contacted: number; qualified: number; converted: number; lost: number };
  }>("/api/leads");

export const getCommunityFeed = (category?: string) =>
  api<
    Array<{
      id: string;
      title: string;
      body: string;
      category: string;
      isPinned: boolean;
      isLocked: boolean;
      commentCount: number;
      createdAt: string;
      authorId: string;
      authorName: string | null;
    }>
  >(`/api/community${category ? `?category=${encodeURIComponent(category)}` : ""}`);

export const getPostWithComments = (postId: string) =>
  apiOrNull<{
    post: {
      id: string;
      title: string;
      body: string;
      category: string;
      isPinned: boolean;
      isLocked: boolean;
      createdAt: string;
      authorId: string;
      authorName: string | null;
    };
    comments: Array<{
      id: string;
      body: string;
      createdAt: string;
      authorId: string;
      authorName: string | null;
    }>;
  }>(`/api/community/${postId}`);

export const getMentorshipSlots = () =>
  api<
    Array<{
      id: string;
      title: string;
      description: string | null;
      mentorName: string;
      startsAt: string;
      endsAt: string;
      capacity: number;
      bookedCount: number;
      meetingUrl: string | null;
      planRequiredName: string | null;
      isBooked: boolean;
      seatsLeft: number;
    }>
  >("/api/mentorship");

export const getPromoAssets = () =>
  api<
    Array<{
      id: string;
      title: string;
      description: string | null;
      type: "banner" | "video" | "script" | "pdf";
      r2Key: string | null;
      videoUrl: string | null;
      bodyText: string | null;
      dimensions: string | null;
      planRequiredName: string | null;
      locked: boolean;
    }>
  >("/api/promo");

export const getTrainingModules = () =>
  api<
    Array<{
      id: string;
      title: string;
      description: string | null;
      streamVideoId: string | null;
      /** Signed playback link for an uploaded video; null when locked or none. */
      videoSrc: string | null;
      videoUrl: string | null;
      durationSeconds: number;
      planRequiredName: string | null;
      locked: boolean;
    }>
  >("/api/training");

/* ------------------------------------------------------------------ admin */

export const getAdminStats = () =>
  api<{
    grossInPaise: number;
    refundedInPaise: number;
    netInPaise: number;
    paidCount: number;
    pendingCount: number;
    userCount: number;
    verifiedCount: number;
    publishedCount: number;
    draftCount: number;
    activeMembers: number;
  }>("/api/admin/stats");

export const getRevenueByDay = () =>
  api<Array<{ day: string; totalInPaise: number; orders: number }>>("/api/admin/revenue");

export const listCoursesForAdmin = () =>
  api<
    Array<{
      id: string;
      slug: string;
      title: string;
      status: "draft" | "published" | "archived";
      priceInPaise: number;
      enrollmentCount: number;
    }>
  >("/api/admin/courses");

export const getCourseForEditor = (courseId: string) =>
  apiOrNull<{
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    thumbnailKey: string | null;
    instructorName: string | null;
    priceInPaise: number;
    mrpInPaise: number | null;
    level: "beginner" | "intermediate" | "advanced";
    language: string;
    minPlanTier: number;
    status: "draft" | "published" | "archived";
    modules: Array<{
      id: string;
      title: string;
      position: number;
      lessons: Array<{
        id: string;
        title: string;
        position: number;
        durationSeconds: number;
        isFreePreview: boolean;
        videoStatus: string;
        streamVideoId: string | null;
      }>;
    }>;
  }>(`/api/admin/courses/${courseId}`);

export const listPlansForAdmin = () =>
  api<
    Array<{
      id: string;
      slug: string;
      name: string;
      tagline: string | null;
      priceInPaise: number;
      mrpInPaise: number | null;
      durationDays: number | null;
      commissionRateBps: number;
      features: string[];
      grantsAllCourses: boolean;
      tier: number;
      isActive: boolean;
      isFeatured: boolean;
      position: number;
      memberCount: number;
    }>
  >("/api/admin/plans");

export const listCouponsForAdmin = () =>
  api<
    Array<{
      id: string;
      code: string;
      description: string | null;
      discountType: "percent" | "flat";
      value: number;
      usedCount: number;
      maxRedemptions: number | null;
      validUntil: string | null;
      isActive: boolean;
      assignedToEmail: string | null;
      assignedToCode: string | null;
      isVisibleToAssignee: boolean;
    }>
  >("/api/admin/coupons");

export const listUsersForAdmin = (query?: string) =>
  api<
    Array<{
      id: string;
      name: string | null;
      email: string;
      phone: string | null;
      state: string | null;
      role: "student" | "instructor" | "admin";
      isBlocked: boolean;
      emailVerified: string | null;
      referralCode: string;
      planName: string | null;
      enrollmentCount: number;
      spentInPaise: number;
    }>
  >(`/api/admin/users${query ? `?q=${encodeURIComponent(query)}` : ""}`);

/** A member's signup details and sponsor, for the admin member page. */
export const getUserProfileForAdmin = (userId: string) =>
  apiOrNull<{
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    state: string | null;
    role: "student" | "instructor" | "admin";
    isBlocked: boolean;
    emailVerified: string | null;
    memberId: string;
    createdAt: string;
    sponsorName: string | null;
    sponsorEmail: string | null;
    sponsorMemberId: string | null;
    planName: string | null;
  }>(`/api/admin/users/${userId}/profile`);

export const getUserAccessForAdmin = (userId: string) =>
  api<{
    enrolled: Array<{
      courseId: string;
      title: string;
      slug: string;
      enrolledAt: string;
      revokedAt: string | null;
      isGranted: boolean;
      grantedById: string | null;
    }>;
    membership: {
      subscriptionId: string;
      planId: string;
      planName: string;
      status: string;
      startsAt: string;
      expiresAt: string | null;
      grantedById: string | null;
    } | null;
  }>(`/api/admin/users/${userId}/access`);

export const listOrdersForAdmin = () =>
  api<
    Array<{
      id: string;
      itemType: "course" | "plan";
      status: "created" | "paid" | "failed" | "refunded";
      discountInPaise: number;
      amountInPaise: number;
      createdAt: string;
      paidAt: string | null;
      userName: string | null;
      userEmail: string;
      courseTitle: string | null;
      planName: string | null;
    }>
  >("/api/admin/orders");

export const listKycForAdmin = (status?: string) =>
  api<
    Array<{
      id: string;
      userId: string;
      fullName: string;
      panNumber: string;
      aadhaarLast4: string | null;
      bankAccountName: string;
      accountNumberLast4: string;
      ifsc: string;
      status: "pending" | "approved" | "rejected";
      createdAt: string;
      userEmail: string;
      userName: string | null;
      // Short-lived signed URLs generated per request by the API. They expire
      // in about five minutes, so this data is not safe to cache.
      documents: KycDocumentUrls;
    }>
  >(`/api/admin/kyc${status ? `?status=${status}` : ""}`, { cache: "no-store" });

export const listPayoutsForAdmin = (status?: string) =>
  api<
    Array<{
      id: string;
      userId: string;
      amountInPaise: number;
      status: "requested" | "approved" | "paid" | "rejected";
      utrNumber: string | null;
      createdAt: string;
      userName: string | null;
      userEmail: string;
      bankAccountName: string | null;
      accountNumberLast4: string | null;
      ifsc: string | null;
      kycStatus: string | null;
    }>
  >(`/api/admin/payouts${status ? `?status=${status}` : ""}`);

export const getAdminContent = () =>
  api<{
    plans: Array<{ id: string; name: string }>;
    assets: Array<{
      id: string;
      title: string;
      description: string | null;
      type: "banner" | "video" | "script" | "pdf";
      isActive: boolean;
      planRequiredId: string | null;
    }>;
    modules: Array<{
      id: string;
      title: string;
      streamVideoId: string | null;
      videoUrl: string | null;
      durationSeconds: number;
      planRequiredId: string | null;
    }>;
    slots: Array<{
      id: string;
      title: string;
      mentorName: string;
      startsAt: string;
      capacity: number;
      bookedCount: number;
      isCancelled: boolean;
      planRequiredId: string | null;
    }>;
  }>("/api/admin/content");

/* ------------------------------------------------------------------ assets */

/**
 * Builds a public asset URL from an R2 key.
 *
 * Lives here rather than in the backend's imagekit lib because the frontend
 * needs it to render images and must not import server code.
 */
export function publicUrl(key: string | null | undefined): string | null {
  if (!key) return null;
  if (key.startsWith("http")) return key;
  const base = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  return base ? `${base.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}` : null;
}

export { redirect };
