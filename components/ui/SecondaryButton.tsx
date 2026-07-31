"use client";

import Link from "next/link";
import type { ButtonProps } from "@/types";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
} as const;

/**
 * SecondaryButton — Outlined government-style secondary action button.
 *
 * Used for less prominent actions alongside a PrimaryButton.
 *
 * @example
 * <SecondaryButton>Learn More</SecondaryButton>
 * <SecondaryButton href="/about" size="lg">View Details</SecondaryButton>
 */
export function SecondaryButton({
  children,
  size = "md",
  loading = false,
  href,
  external,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = cn(
    // Base
    "inline-flex items-center justify-center gap-2 font-semibold rounded",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[var(--color-secondary)]",
    "select-none cursor-pointer",
    // Colors — outlined variant
    "bg-transparent text-[var(--color-primary)]",
    "border border-[var(--color-primary)]",
    // Hover — fill on hover
    "hover:bg-[var(--color-primary)] hover:text-white",
    // Active
    "active:scale-[0.98]",
    // Disabled
    isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
    // Size
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
      >
        {loading && <LoadingDot />}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading}
      className={classes}
      {...rest}
    >
      {loading && <LoadingDot />}
      {children}
    </button>
  );
}

function LoadingDot() {
  return (
    <span
      className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin"
      aria-hidden="true"
    />
  );
}
