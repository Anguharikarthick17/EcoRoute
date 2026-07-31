import { cn } from "@/lib/utils";

/**
 * FormDivider — Horizontal "OR" divider for auth forms.
 *
 * @example
 * <FormDivider label="OR" />
 */
export function FormDivider({ label = "OR", className }: { label?: string; className?: string }) {
  return (
    <div
      role="separator"
      aria-label={label}
      className={cn("flex items-center gap-3 my-1", className)}
    >
      <div className="flex-1 h-px bg-[var(--color-border)]" aria-hidden="true" />
      <span className="text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-widest shrink-0 px-1">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--color-border)]" aria-hidden="true" />
    </div>
  );
}
