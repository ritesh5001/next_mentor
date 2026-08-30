import { z } from "zod";

/**
 * The HTTP contract between the Vercel frontend and the Render backend.
 *
 * Both sides import these schemas: the backend validates incoming bodies with
 * them, the frontend types its client against them. One definition, so the two
 * services cannot drift apart silently — which is the main risk you take on
 * when you split a monolith into two deployables.
 */

/* ----------------------------------------------------------------- envelope */

export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: string; code?: string; fields?: Record<string, string> };
export type ApiResponse<T> = ApiOk<T> | ApiErr;

/** Every error the backend returns carries one of these. */
export const API_ERROR_CODES = [
  "unauthorized",
  "forbidden",
  "not_found",
  "validation",
  "conflict",
  "rate_limited",
  "server_error",
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

/* --------------------------------------------------------------------- auth */

export type Role = "student" | "instructor" | "admin";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name").max(80),
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72, "Passwords are limited to 72 characters")
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
    /** First-touch referral code, captured by the frontend's edge proxy. */
    referralCode: z.string().trim().max(16).optional(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const requestResetSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
});

/** A 6-digit one-time code. Spaces and dashes are stripped before validation. */
export const otpCodeSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length === 6, { message: "Enter the 6-digit code" });

export const verifyEmailOtpSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  code: otpCodeSchema,
});

export const resendOtpSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  purpose: z.enum(["email_verification", "password_reset"]),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    code: otpCodeSchema,
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72)
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * What the API returns after a code is submitted.
 *
 * A discriminated union rather than a bare boolean: the UI has to say something
 * different for "wrong code, 3 tries left" than for "that code is dead, request
 * a new one", and a boolean cannot carry that.
 */
export type OtpResult =
  | { status: "ok" }
  | { status: "invalid"; attemptsLeft: number }
  | { status: "expired" }
  | { status: "too_many_attempts" }
  | { status: "no_code" };

export type OtpSent =
  | { status: "sent"; expiresInSeconds: number }
  | { status: "cooldown"; retryAfterSeconds: number };

/** What the backend returns on a successful login. */
export type AuthSession = {
  token: string;
  /** Seconds until the JWT expires — the frontend sets its cookie to match. */
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: Role;
    referralCode: string;
    image: string | null;
  };
};

/** The claims the backend signs and the frontend forwards. */
export type JwtClaims = {
  sub: string;
  email: string;
  role: Role;
  referralCode: string;
  iat: number;
  exp: number;
};

/* -------------------------------------------------------------- login gate */

/**
 * Login can fail for a reason the UI must handle differently from a wrong
 * password, so it is a discriminated union rather than a bare error string.
 */
export type LoginResult =
  | { status: "ok"; session: AuthSession }
  | { status: "invalid_credentials" }
  | { status: "email_not_verified" }
  | { status: "blocked" };

/* ------------------------------------------------------------------ profile */

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?91[-\s]?)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72)
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((v) => v.newPassword !== v.currentPassword, {
    message: "Choose a password you have not used here before",
    path: ["newPassword"],
  });

/* ------------------------------------------------------------------ courses */

export type CatalogCourse = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  thumbnailKey: string | null;
  instructorName: string | null;
  priceInPaise: number;
  mrpInPaise: number | null;
  level: "beginner" | "intermediate" | "advanced";
  lessonCount: number;
  durationSeconds: number;
};

export type CourseLesson = {
  id: string;
  title: string;
  durationSeconds: number;
  isFreePreview: boolean;
  isReady: boolean;
};

export type CourseModule = { id: string; title: string; lessons: CourseLesson[] };

export type CourseDetail = {
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
  modules: CourseModule[];
  lessonCount: number;
  durationSeconds: number;
};

export const courseFormSchema = z.object({
  title: z.string().trim().min(3, "Title needs at least 3 characters").max(120),
  subtitle: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(5000).optional().or(z.literal("")),
  instructorName: z.string().trim().max(80).optional().or(z.literal("")),
  priceInRupees: z.coerce.number().int().min(0).max(1_000_000),
  mrpInRupees: z.coerce.number().int().min(0).max(1_000_000).optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  language: z.string().trim().min(2).max(20).default("en"),
});

/* ----------------------------------------------------------------- commerce */

export const createCheckoutSchema = z.object({
  itemType: z.enum(["course", "plan"]),
  slug: z.string().trim().min(1),
  couponCode: z.string().trim().max(32).optional(),
});

export const previewCouponSchema = z.object({
  code: z.string().trim().min(1).max(32),
  itemType: z.enum(["course", "plan"]),
  slug: z.string().trim().min(1),
});

/* -------------------------------------------------------------- affiliate */

export const submitKycSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full legal name").max(80),
  panNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN, e.g. ABCDE1234F"),
  aadhaarLast4: z
    .string()
    .trim()
    .regex(/^[0-9]{4}$/, "Enter the last 4 digits of your Aadhaar")
    .optional()
    .or(z.literal("")),
  bankAccountName: z.string().trim().min(2, "Enter the name on the account").max(80),
  accountNumber: z.string().trim().regex(/^[0-9]{6,20}$/, "Enter a valid account number"),
  confirmAccountNumber: z.string().trim(),
  ifsc: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC, e.g. HDFC0001234"),
});

export const requestPayoutSchema = z.object({
  amountInRupees: z.coerce.number().positive("Enter a valid amount"),
});

/* ---------------------------------------------------------------- progress */

export const saveProgressSchema = z.object({
  lessonId: z.string().min(1),
  positionSeconds: z.number().min(0),
  completed: z.boolean(),
});

/* ------------------------------------------------------------------ uploads */

export const requestUploadSchema = z.object({
  contentType: z.string().min(1),
  contentLength: z.number().int().positive(),
});

export type UploadTarget = { uploadUrl: string; key: string };
export type VideoUploadTarget = { uploadUrl: string; videoId: string };
