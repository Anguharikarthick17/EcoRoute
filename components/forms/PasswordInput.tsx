"use client";

import { useState, forwardRef } from "react";
import type { PasswordInputProps } from "@/types/auth";
import { cn } from "@/lib/utils";
import { ValidationMessage } from "./ValidationMessage";
import { MdVisibility, MdVisibilityOff, MdLock } from "react-icons/md";

// ── Password strength config ──────────────────────────────────
type Strength = "none" | "weak" | "fair" | "strong" | "very-strong";

function getStrength(password: string): Strength {
  if (!password) return "none";
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "strong";
  return "very-strong";
}

const STRENGTH_CONFIG: Record<
  Exclude<Strength, "none">,
  { label: string; bars: number; color: string }
> = {
  weak: { label: "Weak", bars: 1, color: "bg-[var(--color-danger)]" },
  fair: { label: "Fair", bars: 2, color: "bg-[var(--color-warning)]" },
  strong: { label: "Strong", bars: 3, color: "bg-[var(--color-info)]" },
  "very-strong": { label: "Very Strong", bars: 4, color: "bg-[var(--color-accent)]" },
};

/**
 * PasswordInput — Password field with visibility toggle and optional
 * strength meter.
 *
 * @example
 * <PasswordInput
 *   id="password"
 *   label="Password"
 *   showStrengthMeter
 *   required
 *   state="error"
 *   errorMessage="Password must be at least 8 characters."
 * />
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      id,
      label,
      placeholder = "Enter your password",
      value = "",
      onChange,
      required = false,
      disabled = false,
      state = "default",
      errorMessage,
      successMessage,
      hintMessage,
      autoComplete,
      showStrengthMeter = false,
      className,
      inputClassName,
    },
    ref,
  ) {
    const [visible, setVisible] = useState(false);

    const strength = showStrengthMeter ? getStrength(value) : "none";
    const strengthConfig =
      strength !== "none" ? STRENGTH_CONFIG[strength] : null;

    const stateStyle = {
      default:
        "border-[var(--color-border)] focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20",
      error:
        "border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-2 focus:ring-[var(--color-danger)]/15 bg-red-50/30",
      success:
        "border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15",
      warning:
        "border-[var(--color-warning)] focus:border-[var(--color-warning)] focus:ring-2 focus:ring-[var(--color-warning)]/15",
    }[state];

    const hasError = state === "error" && !!errorMessage;
    const hasSuccess = state === "success" && !!successMessage;
    const describedBy = [
      hasError ? `${id}-error` : "",
      hasSuccess ? `${id}-success` : "",
      hintMessage ? `${id}-hint` : "",
      showStrengthMeter && strength !== "none" ? `${id}-strength` : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {/* Label */}
        <label
          htmlFor={id}
          className="text-sm font-semibold text-[var(--color-text)]"
        >
          {label}
          {required && (
            <span className="text-[var(--color-danger)] ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {/* Input */}
        <div className="relative flex items-center">
          {/* Lock icon prefix */}
          <MdLock
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none"
            aria-hidden="true"
          />

          <input
            ref={ref}
            id={id}
            name={id}
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-required={required}
            aria-invalid={state === "error"}
            aria-describedby={describedBy}
            className={cn(
              "w-full h-11 pl-10 pr-11 rounded border bg-white",
              "text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-light)]",
              "transition-all duration-150 outline-none focus-visible:outline-none",
              stateStyle,
              disabled && "opacity-55 cursor-not-allowed bg-[var(--color-background)]",
              inputClassName,
            )}
          />

          {/* Toggle visibility */}
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-secondary)] rounded",
            )}
            tabIndex={0}
          >
            {visible ? (
              <MdVisibilityOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <MdVisibility className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Strength meter */}
        {showStrengthMeter && value.length > 0 && strengthConfig && (
          <div
            id={`${id}-strength`}
            aria-label={`Password strength: ${strengthConfig.label}`}
            className="flex flex-col gap-1.5 mt-0.5"
          >
            <div className="flex gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-300",
                    bar <= strengthConfig.bars
                      ? strengthConfig.color
                      : "bg-[var(--color-border)]",
                  )}
                />
              ))}
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)]">
              Password strength:{" "}
              <span className="font-semibold">{strengthConfig.label}</span>
            </p>
          </div>
        )}

        {/* Validation */}
        {hasError && (
          <ValidationMessage
            id={`${id}-error`}
            variant="error"
            message={errorMessage!}
          />
        )}
        {hasSuccess && (
          <ValidationMessage
            id={`${id}-success`}
            variant="success"
            message={successMessage!}
          />
        )}
        {hintMessage && !hasError && (
          <ValidationMessage
            id={`${id}-hint`}
            variant="hint"
            message={hintMessage}
          />
        )}
      </div>
    );
  },
);
