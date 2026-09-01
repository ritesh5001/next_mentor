import { redirect } from "next/navigation";
import { forbidden, unauthorized } from "next/navigation";
import type { CatalogCourse, CourseDetail } from "@nextmentor/shared";

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

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  // Rendering guard only. The API re-checks the role on every call it serves,
  // and that check is the one that actually protects the data.
  if (user.role !== "admin") forbidden();
  return user;
}

export async function requireInstructor(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "admin" && user.role !== "instructor") forbidden();
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
    commissionRateBps: number;
    grantsAllCourses: boolean;
    expiresAt: string | null;
  }>("/api/my/subscription");

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

export const getProfile = () =>
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
  }>("/api/profile");

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
    }>;
  }>;
  active: {
    id: string;
    title: string;
    durationSeconds: number;
    lastPositionSeconds: number;
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
};

export const getMyKyc = () => apiOrNull<KycRecord>("/api/affiliate/kyc");

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
      priceInPaise: number;
      durationDays: number | null;
      commissionRateBps: number;
      grantsAllCourses: boolean;
      isActive: boolean;
      isFeatured: boolean;
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
    }>
  >("/api/admin/coupons");

export const listUsersForAdmin = (query?: string) =>
  api<
    Array<{
      id: string;
      name: string | null;
      email: string;
      role: "student" | "instructor" | "admin";
      isBlocked: boolean;
      emailVerified: string | null;
      referralCode: string;
      planName: string | null;
      enrollmentCount: number;
      spentInPaise: number;
    }>
  >(`/api/admin/users${query ? `?q=${encodeURIComponent(query)}` : ""}`);

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
    }>
  >(`/api/admin/kyc${status ? `?status=${status}` : ""}`);

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
