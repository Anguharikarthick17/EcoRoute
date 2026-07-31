"use client";

import Link from "next/link";
import { MdInbox } from "react-icons/md";
import type { EmptyStateProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * EmptyState — No-content placeholder with icon, title, description and optional CTA.
 *
 * Fully accessible, no illustration images — uses react-icons.
 *
 * @example
 * <EmptyState
 *   title="No Records Found"
 *   description="There are no e-waste collection records to display."
 *   action={{ label: "Schedule a Pickup", href: "/pickup" }}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-label={title}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "py-16 px-6 gap-4",
        className,
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center",
          "w-16 h-16 rounded-full",
          "bg-[var(--color-background)] border border-[var(--color-border)]",
          "text-[var(--color-text-muted)]",
        )}
        aria-hidden="true"
      >
        {icon ?? <MdInbox className="w-8 h-8" />}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 max-w-sm">
        <h3 className="text-lg font-semibold text-[var(--color-text)]">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Action */}
      {action && (
        <div className="mt-2">
          {action.href ? (
            <Link
              href={action.href}
              className={cn(
                "inline-flex items-center gap-1.5 px-5 py-2.5",
                "text-sm font-semibold rounded",
                "bg-[var(--color-primary)] text-white",
                "hover:bg-[var(--color-primary-dark)]",
                "transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-[var(--color-secondary)]",
              )}
            >
              {action.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                "inline-flex items-center gap-1.5 px-5 py-2.5",
                "text-sm font-semibold rounded",
                "bg-[var(--color-primary)] text-white",
                "hover:bg-[var(--color-primary-dark)]",
                "transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-[var(--color-secondary)]",
              )}
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
