/**
 * The checkout contract between the browser and the server.
 *
 * Lives in shared/ because both sides need it: the Server Action returns this
 * shape, and the BuyButton client component consumes it. Putting it in
 * backend/ would force a frontend file to import across the architectural
 * boundary just to name a type.
 */
export type CheckoutResult =
  | {
      status: "ok";
      razorpayOrderId: string;
      amountInPaise: number;
      currency: string;
      orderId: string;
      courseTitle: string;
      prefill: { name: string; email: string };
    }
  | { status: "already_enrolled" }
  | { status: "error"; message: string };
