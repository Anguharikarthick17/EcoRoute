import type { StatusBadgeProps } from "@/types/citizen";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  // Pickup statuses
  Submitted: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-600",
  },
  Approved: {
    bg: "bg-sky-50",
    text: "text-sky-800",
    border: "border-sky-200",
    dot: "bg-sky-600",
  },
  Assigned: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "bg-indigo-600",
  },
  Collected: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    dot: "bg-amber-600",
  },
  Delivered: {
    bg: "bg-teal-50",
    text: "text-teal-800",
    border: "border-teal-200",
    dot: "bg-teal-600",
  },
  Recycled: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    dot: "bg-emerald-600",
  },
  Completed: {
    bg: "bg-green-50",
    text: "text-[var(--color-accent)]",
    border: "border-green-200",
    dot: "bg-[var(--color-accent)]",
  },
  Cancelled: {
    bg: "bg-red-50",
    text: "text-[var(--color-danger)]",
    border: "border-red-200",
    dot: "bg-[var(--color-danger)]",
  },

  // Hazard Levels
  Low: {
    bg: "bg-green-50",
    text: "text-[var(--color-accent)]",
    border: "border-green-200",
    dot: "bg-[var(--color-accent)]",
  },
  Moderate: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    dot: "bg-amber-600",
  },
  High: {
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-200",
    dot: "bg-orange-600",
  },
  Critical: {
    bg: "bg-red-50",
    text: "text-[var(--color-danger)]",
    border: "border-red-200",
    dot: "bg-[var(--color-danger)]",
  },
};

const DEFAULT_CONFIG = {
  bg: "bg-slate-50",
  text: "text-slate-700",
  border: "border-slate-200",
  dot: "bg-slate-500",
};

/**
 * StatusBadge — Government-style pill badge with status dot indicator.
 */
export function StatusBadge({
  status,
  size = "md",
  className,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || DEFAULT_CONFIG;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full border shrink-0",
        config.bg,
        config.text,
        config.border,
        sizeClasses,
        className,
      )}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}
