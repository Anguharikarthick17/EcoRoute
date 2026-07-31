"use client";

import type { FormCheckboxProps } from "@/types/auth";
import { cn } from "@/lib/utils";
import { ValidationMessage } from "./ValidationMessage";

/**
 * FormCheckbox — Accessible government-style labeled checkbox.
 *
 * @example
 * <FormCheckbox
 *   id="terms"
 *   label={<>I accept the <a href="/terms">Terms and Conditions</a></>}
 *   required
 *   error={showErrors}
 *   errorMessage="You must accept the terms to proceed."
 * />
 */
export function FormCheckbox({
  id,
  label,
  checked,
  onChange,
  required = false,
  disabled = false,
  error = false,
  errorMessage,
  className,
}: FormCheckboxProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "flex items-start gap-3 cursor-pointer",
          disabled && "cursor-not-allowed opacity-55",
        )}
      >
        {/* Checkbox input */}
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-required={required}
          aria-invalid={error}
          aria-describedby={error && errorMessage ? `${id}-error` : undefined}
          className={cn(
            "mt-0.5 w-4 h-4 rounded shrink-0",
            "accent-[var(--color-primary)]",
            "cursor-pointer",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]",
            error && "outline outline-2 outline-[var(--color-danger)]/50",
          )}
        />

        {/* Label text */}
        <span className="text-sm text-[var(--color-text)] leading-relaxed">
          {label}
          {required && (
            <span className="text-[var(--color-danger)] ml-1" aria-hidden="true">
              *
            </span>
          )}
        </span>
      </label>

      {error && errorMessage && (
        <ValidationMessage
          id={`${id}-error`}
          variant="error"
          message={errorMessage}
          className="ml-7"
        />
      )}
    </div>
  );
}
