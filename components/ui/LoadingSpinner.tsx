import type { LoadingSpinnerProps, SpinnerSize } from "@/types";
import { cn } from "@/lib/utils";

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-[3px]",
  xl: "w-16 h-16 border-4",
};

/**
 * LoadingSpinner — Accessible animated spinner.
 *
 * Supports inline and full-page overlay modes.
 * Announces loading state to screen readers via aria-label.
 *
 * @example
 * <LoadingSpinner />
 * <LoadingSpinner size="lg" label="Loading your data..." />
 * <LoadingSpinner fullPage label="Please wait..." />
 */
export function LoadingSpinner({
  size = "md",
  label = "Loading…",
  className,
  fullPage = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={cn("flex flex-col items-center gap-3", className)}
    >
      <div
        className={cn(
          "rounded-full border-[var(--color-border)]",
          "border-t-[var(--color-primary)]",
          "animate-spin",
          sizeClasses[size],
        )}
        aria-hidden="true"
      />
      {label && (
        <span className="text-sm text-[var(--color-text-muted)] font-medium">
          {label}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={label}
        className="fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center bg-white/80 backdrop-blur-[2px]"
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
