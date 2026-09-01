import {
  type AnyPgColumn,
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * "instructor" is retained in the database enum but is no longer a role the
 * application issues or accepts — the platform has exactly two account types.
 * Removing a value from a Postgres enum requires rebuilding the type, and an
 * unused member costs nothing, so it stays as a tombstone.
 */
export const userRoleEnum = pgEnum("user_role", ["student", "instructor", "admin"]);

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("email_verified", { mode: "date", withTimezone: true }),
    image: text("image"),

    // Null for OAuth-only accounts. Never selected into any client payload.
    passwordHash: text("password_hash"),

    role: userRoleEnum("role").notNull().default("student"),

    // Referral attribution is captured at signup from day one, even though the
    // commission engine does not land until Phase 3. Backfilling attribution
    // after the fact is impossible — the cookie is long gone.
    referralCode: text("referral_code").notNull(),
    referredById: text("referred_by_id").references((): AnyPgColumn => users.id, {
      onDelete: "set null",
    }),
    referredAt: timestamp("referred_at", { withTimezone: true }),

    phone: text("phone"),
    isBlocked: boolean("is_blocked").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("users_email_unique").on(t.email),
    uniqueIndex("users_referral_code_unique").on(t.referralCode),
    index("users_referred_by_idx").on(t.referredById),
  ],
);

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // OAuth account type, kept for the accounts table shape.
    type: text("type").$type<"oauth" | "oidc" | "email" | "webauthn">().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (t) => [
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
    index("accounts_user_id_idx").on(t.userId),
  ],
);

export const sessions = pgTable(
  "sessions",
  {
    sessionToken: text("session_token").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date", withTimezone: true }).notNull(),
  },
  (t) => [index("sessions_user_id_idx").on(t.userId)],
);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date", withTimezone: true }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

/**
 * Password-reset and email-verification tokens live here rather than in
 * `verificationTokens` so that consuming one is a single-row delete keyed by
 * the token itself, and so the two flows can expire on different schedules.
 * Only the SHA-256 hash is stored — a database leak must not hand out the
 * ability to reset arbitrary accounts.
 */
export const authTokenPurposeEnum = pgEnum("auth_token_purpose", [
  "email_verification",
  "password_reset",
]);

export const authTokens = pgTable(
  "auth_tokens",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    /** SHA-256 of the 6-digit code. Never the code itself. */
    tokenHash: text("token_hash").notNull(),
    purpose: authTokenPurposeEnum("purpose").notNull(),

    /**
     * Wrong guesses against this code.
     *
     * A 6-digit code is only a million possibilities, so without a cap an
     * attacker walks the whole space in minutes. The code is burned once this
     * reaches MAX_OTP_ATTEMPTS — see lib/otp.ts.
     */
    attemptCount: integer("attempt_count").notNull().default(0),

    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    consumedAt: timestamp("consumed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // NOTE: tokenHash is deliberately NOT unique.
    //
    // It was, back when this held 256-bit random tokens. With 6-digit codes
    // two users will eventually be issued the same one, and a unique index
    // would make the second person's signup fail with a database error.
    // Codes are looked up by (userId, purpose) instead, which is also what
    // stops an attacker brute-forcing a code without knowing whose it is.
    index("auth_tokens_user_purpose_idx").on(t.userId, t.purpose),
    index("auth_tokens_lookup_idx").on(t.userId, t.purpose, t.consumedAt),
  ],
);

export const usersRelations = relations(users, ({ one, many }) => ({
  referrer: one(users, {
    fields: [users.referredById],
    references: [users.id],
    relationName: "referrals",
  }),
  referrals: many(users, { relationName: "referrals" }),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
