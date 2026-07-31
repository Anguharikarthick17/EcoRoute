"use client";

import { forwardRef } from "react";
import type { FormSelectProps } from "@/types/auth";
import { cn } from "@/lib/utils";
import { ValidationMessage } from "./ValidationMessage";
import { MdKeyboardArrowDown } from "react-icons/md";

/**
 * FormSelect — Government-style labeled dropdown.
 */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect(
    {
      id,
      label,
      options,
      value,
      onChange,
      required = false,
      disabled = false,
      state = "default",
      errorMessage,
      placeholder = "Select an option",
      selectClassName,
      className,
    },
    ref,
  ) {
    const stateStyle = {
      default:
        "border-[var(--color-border)] focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20",
      error:
        "border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-2 focus:ring-[var(--color-danger)]/15",
      success:
        "border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15",
      warning:
        "border-[var(--color-warning)] focus:border-[var(--color-warning)] focus:ring-2 focus:ring-[var(--color-warning)]/15",
    }[state];

    const hasError = state === "error" && !!errorMessage;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
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

        <div className="relative">
          <select
            ref={ref}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            aria-required={required}
            aria-invalid={state === "error"}
            aria-describedby={hasError ? `${id}-error` : undefined}
            className={cn(
              "w-full h-11 pl-3.5 pr-10 rounded border bg-white appearance-none",
              "text-sm text-[var(--color-text)]",
              "transition-all duration-150 outline-none focus-visible:outline-none",
              stateStyle,
              disabled && "opacity-55 cursor-not-allowed bg-[var(--color-background)]",
              !value && "text-[var(--color-text-light)]",
              selectClassName,
            )}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Custom arrow */}
          <MdKeyboardArrowDown
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {hasError && (
          <ValidationMessage
            id={`${id}-error`}
            variant="error"
            message={errorMessage!}
          />
        )}
      </div>
    );
  },
);
