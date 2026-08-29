/**
 * The checkout contract between the browser and the server.
 *
 * Lives in shared/ because both sides need it: the Server Actions return these
 * shapes, and the BuyButton client component consumes them. Putting them in
 * backend/ would force a frontend file to import across the architectural
 * boundary just to name a type.
 */

export type ItemType = "course" | "plan";

export type CheckoutResult =
  | {
      status: "ok";
      razorpayOrderId: string;
      amountInPaise: number;
      currency: string;
      orderId: string;
      itemTitle: string;
      prefill: { name: string; email: string };
    }
  /** Already enrolled in the course, or already on the plan. */
  | { status: "already_owned" }
  | { status: "error"; message: string };

export type CouponPreview =
  | {
      valid: true;
      code: string;
      discountInPaise: number;
      finalAmountInPaise: number;
    }
  | { valid: false; reason: string };
