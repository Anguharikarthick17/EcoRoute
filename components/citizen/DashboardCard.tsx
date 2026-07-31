import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

/**
 * DashboardCard — Government portal content container with optional title header and action slot.
 */
export function DashboardCard({
  title,
  subtitle,
  action,
  children,
  className,
  headerClassName,
  bodyClassName,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[var(--color-border)] rounded-lg shadow-sm overflow-hidden",
        className,
      )}
    >
      {(title || action) && (
        <div
          className={cn(
            "flex items-center justify-between gap-4 px-6 py-4 border-b border-[var(--color-border-light)] bg-slate-50/50",
            headerClassName,
          )}
        >
          <div className="flex flex-col gap-0.5">
            {title && (
              <h3 className="text-base font-bold text-[var(--color-text)] tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[var(--color-text-muted)]">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className={cn("p-6", bodyClassName)}>{children}</div>
    </div>
  );
}
