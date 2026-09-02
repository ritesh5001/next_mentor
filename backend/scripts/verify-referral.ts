/**
 * Smoke test for Phase 3: the commission engine, wallet ledger and payouts.
 *
 *   pnpm verify:referral
 *
 * This is the money path. Every assertion here is a bug that would otherwise
 * be found by an affiliate noticing their balance is wrong.
 */
import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import {
  users, courses, plans, subscriptions, orders, enrollments,
  commissions, wallets, walletLedger, kycSubmissions, payoutRequests,
} from "@/db/schema";
import { fulfilPaidOrder, reverseRefundedOrder } from "@/services/orders";
import { maturePendingCommissions, reconcileWallet } from "@/lib/referral";
import { generateUniqueReferralCode } from "@/lib/referral-code";
import { uniqueSlug } from "@/services/courses";
import { getOverview } from "@/services/overview";
import { encryptSecret, decryptSecret, hashIp } from "@/lib/crypto";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const stamp = Date.now();

  // ---------------------------------------------------------------- crypto
  const secret = "1234567890123456";
  const ct = encryptSecret(secret);
  check("ciphertext is not plaintext", !ct.includes(secret));
  check("round-trips correctly", decryptSecret(ct) === secret);
  check("same input -> different ciphertext", encryptSecret(secret) !== ct);

  let tamperCaught = false;
  try {
    const parts = ct.split(".");
    parts[3] = Buffer.from("tampered").toString("base64url");
    decryptSecret(parts.join("."));
  } catch { tamperCaught = true; }
  check("tampered ciphertext is rejected", tamperCaught);
  check("ip hash is not reversible plaintext", !hashIp("1.2.3.4").includes("1.2.3.4"));
  check("ip hash is stable", hashIp("1.2.3.4") === hashIp("1.2.3.4"));

  // -------------------------------------------------------------- fixtures
  const [proPlan] = await db.insert(plans).values({
    slug: `p3-pro-${stamp}`, name: "P3 Pro", priceInPaise: 100000,
    durationDays: 365, commissionRateBps: 1500, isActive: true,  // 15%
  }).returning({ id: plans.id });

  const [affiliate] = await db.insert(users).values({
    name: "Affiliate", email: `p3aff${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(), emailVerified: new Date(),
  }).returning({ id: users.id });

  // No plan yet -> should earn nothing.
  const [buyerA] = await db.insert(users).values({
    name: "Buyer A", email: `p3a${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(), emailVerified: new Date(),
    referredById: affiliate.id, referredAt: new Date(),
  }).returning({ id: users.id });

  const [course] = await db.insert(courses).values({
    slug: await uniqueSlug(`P3 Course ${stamp}`), title: "P3 Course",
    priceInPaise: 200000, status: "published", publishedAt: new Date(),
  }).returning({ id: courses.id });

  async function payOrder(userId: string, amount: number, tag: string) {
    const rzp = `order_p3_${tag}_${stamp}`;
    await db.insert(orders).values({
      userId, itemType: "course", courseId: course.id,
      listPriceInPaise: 200000, amountInPaise: amount,
      razorpayOrderId: rzp, status: "created",
    });
    return fulfilPaidOrder({
      razorpayOrderId: rzp, razorpayPaymentId: `pay_p3_${tag}_${stamp}`,
      amountReceivedInPaise: amount,
    });
  }

  // ------------------------------------------- no plan means no commission
  const r0 = await payOrder(buyerA.id, 200000, "noplan");
  check("sale fulfils", r0.status === "granted", r0.status);
  check("referrer with no plan earns nothing",
    r0.status === "granted" && r0.commissionInPaise === null);

  // ------------------------------------------------ with a plan, it earns
  await db.insert(subscriptions).values({
    userId: affiliate.id, planId: proPlan.id, status: "active",
    startsAt: new Date(), expiresAt: new Date(Date.now() + 365 * 86400000),
  });

  const [buyerB] = await db.insert(users).values({
    name: "Buyer B", email: `p3b${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(), emailVerified: new Date(),
    referredById: affiliate.id, referredAt: new Date(),
  }).returning({ id: users.id });

  // Discounted sale: commission must follow the amount CHARGED, not list price.
  const r1 = await payOrder(buyerB.id, 150000, "discounted");
  // 150000 * 1500 / 10000 = 22500
  check("commission on amount charged, not list price",
    r1.status === "granted" && r1.commissionInPaise === 22500,
    r1.status === "granted" ? String(r1.commissionInPaise) : r1.status);

  const [w1] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  check("credited to pending, not available", w1.pendingInPaise === 22500 && w1.availableInPaise === 0,
    `pending=${w1.pendingInPaise} available=${w1.availableInPaise}`);
  check("lifetime earned recorded", w1.lifetimeEarnedInPaise === 22500);

  // ------------------------------------------------------------ idempotency
  await fulfilPaidOrder({
    razorpayOrderId: `order_p3_discounted_${stamp}`,
    razorpayPaymentId: `pay_p3_discounted_${stamp}`,
    amountReceivedInPaise: 150000,
  });
  const [w2] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  check("replayed webhook does not double-pay", w2.pendingInPaise === 22500,
    String(w2.pendingInPaise));

  const comms = await db.select().from(commissions)
    .where(eq(commissions.earnerId, affiliate.id));
  check("exactly one commission row", comms.length === 1, `${comms.length} rows`);

  // ------------------------------------------------------- self-referral
  const [selfRef] = await db.insert(users).values({
    name: "Self", email: `p3self${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(), emailVerified: new Date(),
  }).returning({ id: users.id });
  await db.update(users).set({ referredById: selfRef.id }).where(eq(users.id, selfRef.id));
  await db.insert(subscriptions).values({
    userId: selfRef.id, planId: proPlan.id, status: "active",
    startsAt: new Date(), expiresAt: new Date(Date.now() + 365 * 86400000),
  });

  const rSelf = await payOrder(selfRef.id, 200000, "self");
  check("self-referral earns nothing",
    rSelf.status === "granted" && rSelf.commissionInPaise === null);

  // ---------------------------------------------------------- maturity
  const [before] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  const noneYet = await maturePendingCommissions();
  const [unchanged] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  check("immature commission stays pending",
    unchanged.pendingInPaise === before.pendingInPaise && unchanged.availableInPaise === 0,
    `matured ${noneYet.matured}`);

  // Backdate so it is due.
  await db.update(commissions)
    .set({ maturesAt: new Date(Date.now() - 86400000) })
    .where(eq(commissions.earnerId, affiliate.id));

  const result = await maturePendingCommissions();
  check("matured commission moves to available", result.matured === 1, `${result.matured}`);

  const [w3] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  check("pending drained", w3.pendingInPaise === 0, String(w3.pendingInPaise));
  check("available credited", w3.availableInPaise === 22500, String(w3.availableInPaise));

  const [comm] = await db.select().from(commissions).where(eq(commissions.earnerId, affiliate.id));
  check("commission marked approved", comm.status === "approved", comm.status);

  // -------------------------------------------------- ledger reconciliation
  const recon = await reconcileWallet(affiliate.id);
  check("ledger agrees with wallet",
    recon.ledgerNetInPaise === recon.walletTotalInPaise,
    `ledger=${recon.ledgerNetInPaise} wallet=${recon.walletTotalInPaise}`);

  // ------------------------------------------------------------- payouts
  const [kyc] = await db.insert(kycSubmissions).values({
    userId: affiliate.id, fullName: "Affiliate Person", panNumber: "ABCDE1234F",
    bankAccountName: "Affiliate Person",
    accountNumberEncrypted: encryptSecret("123456789012"),
    accountNumberLast4: "9012", ifsc: "HDFC0001234", status: "approved",
  }).returning({ id: kycSubmissions.id });

  const [payout] = await db.insert(payoutRequests).values({
    userId: affiliate.id, kycId: kyc.id, amountInPaise: 22500, status: "requested",
  }).returning({ id: payoutRequests.id });

  // Simulate the debit the action performs at request time.
  await db.update(wallets).set({ availableInPaise: 0 }).where(eq(wallets.userId, affiliate.id));
  await db.insert(walletLedger).values({
    walletId: w3.id, userId: affiliate.id, direction: "debit",
    amountInPaise: 22500, availableAfterInPaise: 0, pendingAfterInPaise: 0,
    referenceType: "payout", referenceId: payout.id, note: "Withdrawal requested",
  });

  const recon2 = await reconcileWallet(affiliate.id);
  check("ledger still balances after payout debit",
    recon2.ledgerNetInPaise === recon2.walletTotalInPaise,
    `ledger=${recon2.ledgerNetInPaise} wallet=${recon2.walletTotalInPaise}`);

  // ------------------------------------------------------ refund clawback
  const rev = await reverseRefundedOrder(`pay_p3_discounted_${stamp}`);
  check("refund reverses the order", rev.status === "reversed", rev.status);

  const [revComm] = await db.select().from(commissions)
    .where(eq(commissions.earnerId, affiliate.id));
  check("commission marked reversed", revComm.status === "reversed", revComm.status);

  const [w4] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  check("clawback shows as a real debt, not silently forgiven",
    w4.availableInPaise === -22500, String(w4.availableInPaise));

  // ------------------------------------------- payout lifecycle, for real
  // These drive services/payouts.ts directly — the same functions the Server
  // Actions call once they have authenticated.
  const {
    createPayoutRequest, approvePayout, markPayoutPaid, rejectPayout, MIN_PAYOUT_IN_PAISE,
  } = await import("@/services/payouts");

  // Reset to a clean, positive balance — recorded in the ledger as well as the
  // wallet. Injecting a balance into only one of the two would make the
  // reconciliation assertions below meaningless.
  await db.delete(walletLedger).where(eq(walletLedger.userId, affiliate.id));
  await db.delete(payoutRequests).where(eq(payoutRequests.userId, affiliate.id));
  await db.update(wallets)
    .set({ availableInPaise: 100000, pendingInPaise: 0, withdrawnInPaise: 0 })
    .where(eq(wallets.userId, affiliate.id));

  const [wForSeed] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  await db.insert(walletLedger).values({
    walletId: wForSeed.id, userId: affiliate.id, direction: "credit",
    amountInPaise: 100000, availableAfterInPaise: 100000, pendingAfterInPaise: 0,
    referenceType: "adjustment", note: "Test opening balance",
  });

  const tooSmall = await createPayoutRequest({
    userId: affiliate.id, amountInPaise: MIN_PAYOUT_IN_PAISE - 1,
  });
  check("below minimum is refused", !tooSmall.ok);

  const tooBig = await createPayoutRequest({ userId: affiliate.id, amountInPaise: 500000 });
  check("more than the balance is refused", !tooBig.ok);

  const req = await createPayoutRequest({ userId: affiliate.id, amountInPaise: 60000 });
  check("valid request accepted", req.ok);

  const [afterReq] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  check("request debits available immediately", afterReq.availableInPaise === 40000,
    String(afterReq.availableInPaise));

  const second = await createPayoutRequest({ userId: affiliate.id, amountInPaise: 40000 });
  check("a second concurrent request is refused", !second.ok);

  const [pr] = await db.select().from(payoutRequests)
    .where(eq(payoutRequests.userId, affiliate.id));

  // Reject: the money must come back.
  const rejected = await rejectPayout({
    payoutId: pr.id, adminId: affiliate.id, reason: "Bank details unclear",
  });
  check("rejection succeeds", rejected.ok);

  const [afterReject] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  check("rejection returns the funds", afterReject.availableInPaise === 100000,
    String(afterReject.availableInPaise));

  const reconAfterReject = await reconcileWallet(affiliate.id);
  check("ledger balances after reject",
    reconAfterReject.ledgerNetInPaise === reconAfterReject.walletTotalInPaise,
    `ledger=${reconAfterReject.ledgerNetInPaise} wallet=${reconAfterReject.walletTotalInPaise}`);

  const emptyReason = await rejectPayout({ payoutId: pr.id, adminId: affiliate.id, reason: "  " });
  check("rejection without a reason is refused", !emptyReason.ok);

  // Full happy path: request -> approve -> paid.
  const req2 = await createPayoutRequest({ userId: affiliate.id, amountInPaise: 70000 });
  check("new request after rejection accepted", req2.ok);

  const [pr2] = await db.select().from(payoutRequests)
    .where(and(eq(payoutRequests.userId, affiliate.id), eq(payoutRequests.status, "requested")));

  const noUtr = await markPayoutPaid({
    payoutId: pr2.id, adminId: affiliate.id, utrNumber: "abc",
  });
  check("marking paid without a valid UTR is refused", !noUtr.ok);

  check("approval succeeds", (await approvePayout(pr2.id, affiliate.id)).ok);
  check("approving twice is refused", !(await approvePayout(pr2.id, affiliate.id)).ok);

  const paid = await markPayoutPaid({
    payoutId: pr2.id, adminId: affiliate.id, utrNumber: "UTR123456789",
  });
  check("marking paid succeeds", paid.ok);
  check("paying twice is refused",
    !(await markPayoutPaid({ payoutId: pr2.id, adminId: affiliate.id, utrNumber: "UTR999" })).ok);
  check("a paid payout cannot be rejected",
    !(await rejectPayout({ payoutId: pr2.id, adminId: affiliate.id, reason: "changed mind" })).ok);

  const [afterPaid] = await db.select().from(wallets).where(eq(wallets.userId, affiliate.id));
  check("withdrawn total recorded", afterPaid.withdrawnInPaise === 70000,
    String(afterPaid.withdrawnInPaise));
  check("marking paid does not double-debit", afterPaid.availableInPaise === 30000,
    String(afterPaid.availableInPaise));

  const reconFinal = await reconcileWallet(affiliate.id);
  check("ledger balances after full payout cycle",
    reconFinal.ledgerNetInPaise === reconFinal.walletTotalInPaise,
    `ledger=${reconFinal.ledgerNetInPaise} wallet=${reconFinal.walletTotalInPaise}`);

  // ---------------------------------------------------- overview aggregates
  //
  // The overview screen reads from its own aggregation, not from the wallet.
  // All-zero output is what a broken query returns too, so these assert against
  // commissions this script actually created.
  // A known, non-zero row. Without it every assertion below compares 0 to 0
  // and would pass just as happily against a query that returns nothing.
  const probeOrder = await db
    .insert(orders)
    .values({
      userId: buyerA.id, itemType: "plan", planId: proPlan.id, listPriceInPaise: 500000,
      amountInPaise: 500000, razorpayOrderId: `order_ov_${stamp}`, status: "paid",
    })
    .returning({ id: orders.id });

  await db.insert(commissions).values({
    earnerId: affiliate.id, sourceUserId: buyerA.id, orderId: probeOrder[0].id,
    level: 1, rateBps: 1500, baseAmountInPaise: 500000, amountInPaise: 75000,
    status: "approved", maturesAt: new Date(),
  });

  const ov = await getOverview(affiliate.id);

  check("overview picks up a freshly approved commission",
    ov.earned.allTime === 75000, `got ${ov.earned.allTime}, expected 75000`);
  check("overview counts it in today's bucket",
    ov.earned.today === 75000, `got ${ov.earned.today}`);
  check("overview's last day of the series carries it",
    ov.series[6].amountInPaise === 75000, `got ${ov.series[6].amountInPaise}`);
  check("overview month-to-date includes it",
    ov.monthEarnedInPaise === 75000, `got ${ov.monthEarnedInPaise}`);

  const earnedRows = await db
    .select({ amount: commissions.amountInPaise, status: commissions.status })
    .from(commissions)
    .where(eq(commissions.earnerId, affiliate.id));
  const expectedAllTime = earnedRows
    .filter((r) => r.status === "approved" || r.status === "paid")
    .reduce((n, r) => n + r.amount, 0);

  check("overview all-time earnings match the commission rows",
    ov.earned.allTime === expectedAllTime,
    `overview=${ov.earned.allTime} rows=${expectedAllTime}`);
  check("overview excludes reversed commission",
    !earnedRows.some((r) => r.status === "reversed") || ov.earned.allTime < earnedRows.reduce((n, r) => n + r.amount, 0),
    "a reversed sale must not count as earned");
  check("overview returns exactly 7 daily points", ov.series.length === 7,
    `got ${ov.series.length}`);
  check("overview fills days with no sale rather than dropping them",
    ov.series.every((d) => typeof d.amountInPaise === "number"));
  check("overview series is in ascending date order",
    ov.series.every((d, i) => i === 0 || d.day > ov.series[i - 1].day));
  check("overview counts referred members",
    ov.members.allTime >= 2, `got ${ov.members.allTime}`);
  check("overview sales total matches its own breakdown",
    ov.totalSales === ov.sales.reduce((n, r) => n + r.count, 0));
  check("overview recent joinings are populated",
    ov.recent.length > 0, `got ${ov.recent.length}`);
  check("overview month-to-date never exceeds all-time",
    ov.monthEarnedInPaise <= ov.earned.allTime,
    `month=${ov.monthEarnedInPaise} allTime=${ov.earned.allTime}`);

  // ------------------------------------------------------------ cleanup
  await db.delete(walletLedger).where(eq(walletLedger.userId, affiliate.id));
  await db.delete(payoutRequests).where(eq(payoutRequests.userId, affiliate.id));
  await db.delete(kycSubmissions).where(eq(kycSubmissions.userId, affiliate.id));
  await db.delete(commissions).where(eq(commissions.earnerId, affiliate.id));
  await db.delete(commissions).where(eq(commissions.earnerId, selfRef.id));
  await db.delete(wallets).where(eq(wallets.userId, affiliate.id));
  for (const u of [buyerA.id, buyerB.id, selfRef.id]) {
    await db.delete(enrollments).where(eq(enrollments.userId, u));
    await db.delete(orders).where(eq(orders.userId, u));
    await db.delete(subscriptions).where(eq(subscriptions.userId, u));
  }
  await db.delete(subscriptions).where(eq(subscriptions.userId, affiliate.id));
  await db.update(users).set({ referredById: null }).where(eq(users.id, selfRef.id));
  for (const u of [buyerA.id, buyerB.id, selfRef.id, affiliate.id]) {
    await db.delete(users).where(eq(users.id, u));
  }
  await db.delete(courses).where(eq(courses.id, course.id));
  await db.delete(plans).where(eq(plans.id, proPlan.id));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
