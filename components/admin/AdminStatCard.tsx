import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

export function AdminStatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBg = "bg-[var(--color-primary)]/10",
  iconColor = "text-[var(--color-primary)]",
  className,
}: AdminStatCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[var(--color-border)] rounded-lg p-5 shadow-xs flex flex-col justify-between gap-3 hover:border-slate-300 transition-all",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            {title}
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
            {value}
          </span>
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
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
