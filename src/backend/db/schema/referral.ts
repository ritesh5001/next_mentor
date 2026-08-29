import { relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { orders } from "./commerce";

/**
 * The affiliate system.
 *
 * Single-level in v1 (your choice), but `commissions.level` exists from day one
 * so extending to L2/L3 is a config change rather than a migration against a
 * table that is already full of money records.
 */

export const commissionStatusEnum = pgEnum("commission_status", [
  "pending", // earned, inside the refund window
  "approved", // matured, withdrawable
  "paid", // included in a completed payout
  "reversed", // source order was refunded
]);

/**
 * credit / debit change the wallet's total. `transfer` moves money between
 * pending and available without changing it — maturity is the only case, and
 * recording it as a credit double-counted every commission.
 */
export const ledgerDirectionEnum = pgEnum("ledger_direction", [
  "credit",
  "debit",
  "transfer",
]);

export const kycStatusEnum = pgEnum("kyc_status", ["pending", "approved", "rejected"]);

export const payoutStatusEnum = pgEnum("payout_status", [
  "requested",
  "approved",
  "paid",
  "rejected",
]);

/**
 * Raw click log for an affiliate link.
 *
 * IPs are stored as a salted hash, never in the clear: this is behavioural data
 * about people who have not signed up yet, and we only ever need to ask "is
 * this the same visitor again?", which a hash answers perfectly well.
 */
export const referralClicks = pgTable(
  "referral_clicks",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    referralCode: text("referral_code").notNull(),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    landingPath: text("landing_path"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("referral_clicks_code_created_idx").on(t.referralCode, t.createdAt),
    index("referral_clicks_created_idx").on(t.createdAt),
  ],
);

/**
 * One row per commission earned.
 *
 * The UNIQUE below is the load-bearing part of the whole system: even if the
 * Razorpay webhook is delivered five times, the second insert violates the
 * constraint and nobody gets paid twice. That guarantee lives in the database,
 * not in application logic that could race.
 */
export const commissions = pgTable(
  "commissions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    /** Who earns it. */
    earnerId: text("earner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    /** Whose purchase generated it. */
    sourceUserId: text("source_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    orderId: text("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),

    /** Always 1 in v1. Present so multi-level needs no migration. */
    level: integer("level").notNull().default(1),

    /** Snapshot of the rate at the time of the sale, in basis points. */
    rateBps: integer("rate_bps").notNull(),
    /** The order amount the rate was applied to — net of any discount. */
    baseAmountInPaise: integer("base_amount_in_paise").notNull(),
    amountInPaise: integer("amount_in_paise").notNull(),

    status: commissionStatusEnum("status").notNull().default("pending"),
    /** When it becomes withdrawable — after the refund window closes. */
    maturesAt: timestamp("matures_at", { withTimezone: true }).notNull(),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    reversedAt: timestamp("reversed_at", { withTimezone: true }),
    payoutRequestId: text("payout_request_id"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // Double-payment is structurally impossible, not merely unlikely.
    uniqueIndex("commissions_order_earner_level_unique").on(t.orderId, t.earnerId, t.level),
    index("commissions_earner_status_idx").on(t.earnerId, t.status),
    index("commissions_matures_idx").on(t.status, t.maturesAt),
    index("commissions_source_idx").on(t.sourceUserId),
    index("commissions_payout_idx").on(t.payoutRequestId),
  ],
);

/**
 * Cached balances.
 *
 * These numbers are a projection of `walletLedger`, never the source of truth.
 * If the two ever disagree, the ledger is right — see `reconcileWallet`.
 */
export const wallets = pgTable(
  "wallets",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    /** Withdrawable now. */
    availableInPaise: integer("available_in_paise").notNull().default(0),
    /** Earned but still inside the refund window. */
    pendingInPaise: integer("pending_in_paise").notNull().default(0),
    /** Lifetime gross, for display only — never decremented. */
    lifetimeEarnedInPaise: integer("lifetime_earned_in_paise").notNull().default(0),
    /** Total already paid out. */
    withdrawnInPaise: integer("withdrawn_in_paise").notNull().default(0),

    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("wallets_user_unique").on(t.userId)],
);

/**
 * Append-only history of every balance movement.
 *
 * Nothing here is ever updated or deleted. The after-balances are recorded on
 * each row so a statement can be rendered without replaying the whole table,
 * and so a corrupted projection is obvious at a glance.
 *
 * Net wallet value = sum(credit) − sum(debit). `transfer` rows are excluded:
 * they reclassify money that is already counted.
 */
export const walletLedger = pgTable(
  "wallet_ledger",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    walletId: text("wallet_id")
      .notNull()
      .references(() => wallets.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    direction: ledgerDirectionEnum("direction").notNull(),
    amountInPaise: integer("amount_in_paise").notNull(),
    availableAfterInPaise: integer("available_after_in_paise").notNull(),
    pendingAfterInPaise: integer("pending_after_in_paise").notNull(),

    /** "commission" | "payout" | "reversal" | "adjustment" */
    referenceType: text("reference_type").notNull(),
    referenceId: text("reference_id"),
    note: text("note"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("wallet_ledger_user_created_idx").on(t.userId, t.createdAt),
    index("wallet_ledger_reference_idx").on(t.referenceType, t.referenceId),
  ],
);

/**
 * KYC and bank details — the highest-risk data in the system.
 *
 * The account number is encrypted at rest (AES-256-GCM, see backend/lib/crypto).
 * Only the last 4 of Aadhaar is kept; the full number is never stored. PAN is
 * stored in full because payouts legally require it, but it is never selected
 * into any list view.
 */
export const kycSubmissions = pgTable(
  "kyc_submissions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    fullName: text("full_name").notNull(),
    panNumber: text("pan_number").notNull(),
    aadhaarLast4: text("aadhaar_last4"),

    bankAccountName: text("bank_account_name").notNull(),
    /** AES-256-GCM ciphertext. Never rendered, only decrypted at payout time. */
    accountNumberEncrypted: text("account_number_encrypted").notNull(),
    /** Plaintext last 4, so admins can confirm an account without decrypting. */
    accountNumberLast4: text("account_number_last4").notNull(),
    ifsc: text("ifsc").notNull(),

    /** R2 keys for uploaded ID documents. */
    documentKeys: jsonb("document_keys").$type<string[]>().notNull().default([]),

    status: kycStatusEnum("status").notNull().default("pending"),
    rejectionReason: text("rejection_reason"),
    reviewedById: text("reviewed_by_id").references(() => users.id, { onDelete: "set null" }),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // One live submission per user; a resubmission replaces the old row.
    uniqueIndex("kyc_user_unique").on(t.userId),
    index("kyc_status_idx").on(t.status),
  ],
);

export const payoutRequests = pgTable(
  "payout_requests",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kycId: text("kyc_id").references(() => kycSubmissions.id, { onDelete: "set null" }),

    amountInPaise: integer("amount_in_paise").notNull(),
    status: payoutStatusEnum("status").notNull().default("requested"),

    /** Bank reference recorded by the admin after paying manually. */
    utrNumber: text("utr_number"),
    adminNote: text("admin_note"),
    processedById: text("processed_by_id").references(() => users.id, { onDelete: "set null" }),
    processedAt: timestamp("processed_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("payout_requests_user_status_idx").on(t.userId, t.status),
    index("payout_requests_status_created_idx").on(t.status, t.createdAt),
  ],
);

export const commissionsRelations = relations(commissions, ({ one }) => ({
  earner: one(users, { fields: [commissions.earnerId], references: [users.id] }),
  sourceUser: one(users, { fields: [commissions.sourceUserId], references: [users.id] }),
  order: one(orders, { fields: [commissions.orderId], references: [orders.id] }),
}));

export const walletsRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, { fields: [wallets.userId], references: [users.id] }),
  entries: many(walletLedger),
}));

export const walletLedgerRelations = relations(walletLedger, ({ one }) => ({
  wallet: one(wallets, { fields: [walletLedger.walletId], references: [wallets.id] }),
}));

export type Commission = typeof commissions.$inferSelect;
export type Wallet = typeof wallets.$inferSelect;
export type WalletLedgerEntry = typeof walletLedger.$inferSelect;
export type KycSubmission = typeof kycSubmissions.$inferSelect;
export type PayoutRequest = typeof payoutRequests.$inferSelect;
