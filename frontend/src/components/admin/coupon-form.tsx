"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import type { ActionState, FormAction } from "@nextmentor/shared";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Creating…" : "Create coupon"}
    </Button>
  );
}

export function CouponForm({ action }: { action: FormAction }) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);
  const [discountType, setDiscountType] = useState<"percent" | "flat">("percent");

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field
        label="Code"
        name="code"
        required
        placeholder="LAUNCH20"
        className="uppercase tracking-wide"
        hint="Letters, numbers, dashes and underscores. Stored upper-case."
        maxLength={32}
      />

      <Field
        label="Description"
        name="description"
        placeholder="Launch week offer"
        maxLength={200}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="discountType" className="text-sm font-medium">
            Discount type
          </label>
          <select
            id="discountType"
            name="discountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as "percent" | "flat")}
            className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px]"
          >
            <option value="percent">Percentage off</option>
            <option value="flat">Fixed amount off</option>
          </select>
        </div>

        <Field
          label={discountType === "percent" ? "Percent off" : "Amount off (₹)"}
          name="value"
          type="number"
          inputMode="decimal"
          step="0.01"
          min={0.01}
          max={discountType === "percent" ? 100 : undefined}
          required
          placeholder={discountType === "percent" ? "20" : "500"}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Only meaningful for a percentage — a flat discount is already capped
            by its own value. */}
        {discountType === "percent" && (
          <Field
            label="Maximum discount (₹)"
            name="maxDiscountInRupees"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="500"
            hint="Optional cap, e.g. 20% off up to ₹500."
          />
        )}

        <Field
          label="Minimum order (₹)"
          name="minOrderInRupees"
          type="number"
          inputMode="numeric"
          min={0}
          defaultValue={0}
          hint="0 means no minimum."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Total uses"
          name="maxRedemptions"
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="Unlimited"
          hint="Blank = unlimited."
        />
        <Field
          label="Uses per person"
          name="perUserLimit"
          type="number"
          inputMode="numeric"
          min={1}
          max={100}
          defaultValue={1}
        />
        <Field
          label="Expires"
          name="validUntil"
          type="date"
          hint="Optional."
        />
      </div>

      {/* Private codes: one member, nobody else. */}
      <div className="grid gap-4 rounded-[14px] bg-[var(--brand-hero-wash)] p-4 sm:grid-cols-2">
        <Field
          label="Only for this member (optional)"
          name="assignTo"
          autoComplete="off"
          placeholder="email or member ID"
          hint="Leave blank for a code anyone can use."
          containerClassName="sm:col-span-2"
        />
        <label className="flex cursor-pointer items-start gap-3 text-sm sm:col-span-2">
          <input
            type="checkbox"
            name="visibleToAssignee"
            defaultChecked
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--brand-blue)]"
          />
          <span>
            Show it in that member&apos;s Exclusive Coupons list
            <span className="block text-xs text-[var(--color-muted-foreground)]">
              Untick to keep it private — they can still type the code at checkout.
            </span>
          </span>
        </label>
      </div>

      <div className="pt-1">
        <SubmitButton />
      </div>
    </form>
  );
}
