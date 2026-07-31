import type { StatCardProps } from "@/types/citizen";
import { cn } from "@/lib/utils";

/**
 * StatCard — Executive government statistic metric card.
 */
export function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBg = "bg-[var(--color-primary)]/8",
  iconColor = "text-[var(--color-primary)]",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[var(--color-border)] rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            {title}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
            {value}
          </span>
        </div>
        <div
          className={cn(
            "w-11 h-11 rounded-lg flex items-center justify-center shrink-0",
            iconBg,
            iconColor,
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border-light)] text-xs">
          {trend && (
            <span
              className={cn(
                "font-bold px-1.5 py-0.5 rounded text-[10px]",
                trend.isPositive
                  ? "bg-green-50 text-[var(--color-accent)]"
                  : "bg-red-50 text-[var(--color-danger)]",
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
          )}
          {subtitle && (
            <span className="text-[var(--color-text-muted)] truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
