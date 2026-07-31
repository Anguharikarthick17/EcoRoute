import type { CitizenSectionHeaderProps } from "@/types/citizen";
import { cn } from "@/lib/utils";

/**
 * CitizenSectionHeader — Page or section header for citizen portal pages.
 */
export function CitizenSectionHeader({
  title,
  subtitle,
  badge,
  action,
  className,
}: CitizenSectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[var(--color-border)] mb-8",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        {badge && (
          <span className="w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--color-primary)]/8 text-[var(--color-primary)]">
            {badge}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[var(--color-text-muted)] max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
