import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { submitKycSchema, requestPayoutSchema } from "@nextmentor/shared";

import { db } from "@/db";
import { kycSubmissions } from "@/db/schema";
import { encryptSecret } from "@/lib/crypto";
import {
  getWalletSummary,
  getAssociates,
  getCommissionHistory,
  getLedger,
  getReferralStats,
  getTopPerformers,
  getMyKyc,
  getMyPayouts,
  MIN_PAYOUT_IN_PAISE,
} from "@/services/affiliate";
import { createPayoutRequest } from "@/services/payouts";
import { requireUser, currentUser } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";

export const affiliateRoutes = new Hono();

affiliateRoutes.get("/affiliate/summary", requireUser, async (c) => {
  const user = currentUser(c);
  const [wallet, stats, associates] = await Promise.all([
    getWalletSummary(user.id),
    getReferralStats(user.id, user.referralCode),
    getAssociates(user.id, 25),
  ]);
  return ok(c, { wallet, stats, associates, referralCode: user.referralCode });
});

affiliateRoutes.get("/affiliate/earnings", requireUser, async (c) => {
  const user = currentUser(c);
  const [wallet, commissions, ledger, kyc, payouts] = await Promise.all([
    getWalletSummary(user.id),
    getCommissionHistory(user.id, 25),
    getLedger(user.id, 25),
    getMyKyc(user.id),
    getMyPayouts(user.id),
  ]);
  return ok(c, {
    wallet,
    commissions,
    ledger,
    kyc,
    payouts,
    minPayoutInPaise: MIN_PAYOUT_IN_PAISE,
  });
});

affiliateRoutes.get("/affiliate/leaderboard", requireUser, async (c) =>
  ok(c, await getTopPerformers(20)),
);

affiliateRoutes.get("/affiliate/kyc", requireUser, async (c) =>
  ok(c, await getMyKyc(currentUser(c).id)),
);

/**
 * Submits or resubmits KYC.
 *
 * The account number is encrypted before it touches the database; only the last
 * four digits are stored in the clear, which is all an admin needs to confirm
 * they are paying the right account.
 */
affiliateRoutes.post("/affiliate/kyc", requireUser, async (c) => {
  const body = await parseBody(c, submitKycSchema);
  if (!body.ok) return body.response;

  const user = currentUser(c);
  const d = body.data;

  // A wrong digit sends the money to a stranger and is not recoverable.
  if (d.accountNumber !== d.confirmAccountNumber) {
    return fail(c, "The account numbers do not match.", "validation");
  }

  const [existing] = await db
    .select({ status: kycSubmissions.status })
    .from(kycSubmissions)
    .where(eq(kycSubmissions.userId, user.id))
    .limit(1);

  // Approved details are frozen: silently changing the destination account
  // after approval is how a compromised session drains a wallet.
  if (existing?.status === "approved") {
    return fail(
      c,
      "Your KYC is already approved. Contact support to change your bank details.",
      "forbidden",
    );
  }

  const values = {
    userId: user.id,
    fullName: d.fullName,
    panNumber: d.panNumber,
    aadhaarLast4: d.aadhaarLast4 || null,
    bankAccountName: d.bankAccountName,
    accountNumberEncrypted: encryptSecret(d.accountNumber),
    accountNumberLast4: d.accountNumber.slice(-4),
    ifsc: d.ifsc,
    status: "pending" as const,
    rejectionReason: null,
    reviewedById: null,
    reviewedAt: null,
    updatedAt: new Date(),
  };

  await db
    .insert(kycSubmissions)
    .values(values)
    .onConflictDoUpdate({ target: kycSubmissions.userId, set: values });

  return ok(c, { submitted: true });
});

affiliateRoutes.post("/affiliate/payouts", requireUser, async (c) => {
  const body = await parseBody(c, requestPayoutSchema);
  if (!body.ok) return body.response;

  const result = await createPayoutRequest({
    userId: currentUser(c).id,
    amountInPaise: Math.round(body.data.amountInRupees * 100),
  });

  return result.ok ? ok(c, { message: result.message }) : fail(c, result.error, "validation");
});
