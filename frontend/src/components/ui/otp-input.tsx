"use client";

import { useRef, useState, useId } from "react";

/**
 * Six-box one-time-code input.
 *
 * Deliberately backed by a single real <input name={name}> holding the whole
 * code. The six boxes are presentation: if they were six separate named inputs
 * the server would have to reassemble them, and a browser or password manager
 * autofilling the code would have nowhere sensible to put it.
 *
 * `autoComplete="one-time-code"` is what lets iOS and Chrome offer the code
 * straight from the SMS/email notification — the single biggest usability win
 * available here, and it only works on one field.
 */
export function OtpInput({
  name = "code",
  length = 6,
  autoFocus = true,
  disabled = false,
  describedBy,
  invalid,
}: {
  name?: string;
  length?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  describedBy?: string;
  invalid?: boolean;
}) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const id = useId();

  const value = digits.join("");

  function setAt(index: number, char: string) {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
  }

  function handleChange(index: number, raw: string) {
    const cleaned = raw.replace(/\D/g, "");
    if (!cleaned) {
      setAt(index, "");
      return;
    }

    // Pasting or autofilling the whole code lands in one box — spread it across
    // the rest rather than dropping everything after the first digit.
    if (cleaned.length > 1) {
      setDigits((prev) => {
        const next = [...prev];
        for (let i = 0; i < cleaned.length && index + i < length; i++) {
          next[index + i] = cleaned[i];
        }
        return next;
      });
      const landed = Math.min(index + cleaned.length, length - 1);
      refs.current[landed]?.focus();
      return;
    }

    setAt(index, cleaned);
    if (index < length - 1) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      // Backspace in an empty box steps back and clears the previous one, which
      // is what people expect from a segmented code field.
      if (!digits[index] && index > 0) {
        e.preventDefault();
        setAt(index - 1, "");
        refs.current[index - 1]?.focus();
      }
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      refs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* The real field. Screen readers and autofill see one code input. */}
      <input
        type="hidden"
        name={name}
        value={value}
        // Not disabled: a disabled input is omitted from the submitted form.
        readOnly
      />

      <div
        className="flex justify-center gap-2"
        role="group"
        aria-label={`${length}-digit verification code`}
        aria-describedby={describedBy}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={i === 0 ? `${id}-otp` : undefined}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={invalid || undefined}
            // inputMode numeric brings up the number pad without type="number",
            // which would add spinners and allow "e" and "-".
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            autoFocus={autoFocus && i === 0}
            maxLength={length}
            className={[
              "size-12 rounded-[var(--radius-control)] border-2 text-center text-xl font-bold tabular",
              "bg-[var(--color-card)] transition-colors",
              "focus:border-[var(--color-primary)] focus:outline-none",
              invalid
                ? "border-[var(--color-destructive)]"
                : "border-[var(--color-border)]",
              disabled ? "opacity-50" : "",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
