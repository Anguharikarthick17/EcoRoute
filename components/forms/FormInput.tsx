"use client";

import { forwardRef } from "react";
import type { FormInputProps, InputState } from "@/types/auth";
import { cn } from "@/lib/utils";
import { ValidationMessage } from "./ValidationMessage";

// ── Border styles per state ───────────────────────────────────
const stateStyles: Record<InputState, string> = {
  default:
    "border-[var(--color-border)] focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20",
  error:
    "border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-2 focus:ring-[var(--color-danger)]/15 bg-red-50/30",
  success:
    "border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15",
  warning:
    "border-[var(--color-warning)] focus:border-[var(--color-warning)] focus:ring-2 focus:ring-[var(--color-warning)]/15",
};

/**
 * FormInput — Government-style labeled text input.
 *
 * Handles default / error / success / warning visual states.
 * Renders an optional prefix/suffix slot (icon, currency, etc.).
 *
 * @example
 * <FormInput
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="name@example.gov.in"
 *   required
 *   state="error"
 *   errorMessage="Please enter a valid email address."
 * />
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      id,
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      required = false,
      disabled = false,
      readOnly = false,
      state = "default",
      errorMessage,
      successMessage,
      hintMessage,
      autoComplete,
      className,
      inputClassName,
      maxLength,
      pattern,
      prefix,
      suffix,
    },
    ref,
  ) {
    const hasError = state === "error" && !!errorMessage;
    const hasSuccess = state === "success" && !!successMessage;
    const hasHint = !!hintMessage;
    const describedBy = [
      hasError ? `${id}-error` : "",
      hasSuccess ? `${id}-success` : "",
      hasHint ? `${id}-hint` : "",
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
            <span
              className="text-[var(--color-danger)] ml-1"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Prefix slot */}
          {prefix && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              aria-hidden="true"
            >
              {prefix}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            maxLength={maxLength}
            pattern={pattern}
            aria-required={required}
            aria-invalid={state === "error"}
            aria-describedby={describedBy}
            className={cn(
              // Base
              "w-full h-11 rounded border bg-white",
              "text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-light)]",
              "transition-all duration-150 outline-none",
              "focus-visible:outline-none",
              // Padding
              prefix ? "pl-10" : "pl-3.5",
              suffix ? "pr-10" : "pr-3.5",
              // State
              stateStyles[state],
              // Disabled
              disabled && "opacity-55 cursor-not-allowed bg-[var(--color-background)]",
              readOnly && "bg-[var(--color-background)] cursor-default",
              inputClassName,
            )}
          />

          {/* Suffix slot */}
          {suffix && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              aria-hidden="true"
            >
              {suffix}
            </div>
          )}
        </div>

        {/* Validation messages */}
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
        {hasHint && !hasError && (
          <ValidationMessage
            id={`${id}-hint`}
            variant="hint"
            message={hintMessage!}
          />
        )}
      </div>
    );
  },
);
