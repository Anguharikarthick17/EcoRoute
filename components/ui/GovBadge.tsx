import type { GovBadgeProps, BadgeVariant } from "@/types";
import { cn } from "@/lib/utils";

const variantConfig: Record<
  BadgeVariant,
  { label: string; classes: string }
> = {
  official: {
    label: "Official Portal",
    classes: "bg-[var(--color-primary)] text-white border-[var(--color-primary)]",
  },
  verified: {
    label: "Verified",
    classes: "bg-[var(--color-accent)] text-white border-[var(--color-accent)]",
  },
  gov: {
    label: "Govt. of India",
    classes: "bg-[var(--color-primary)] text-white border-[var(--color-primary)]",
  },
  new: {
    label: "New",
    classes: "bg-[var(--color-warning)] text-[var(--color-text)] border-[var(--color-warning)]",
  },
  beta: {
    label: "Beta",
    classes: "bg-[var(--color-secondary)] text-white border-[var(--color-secondary)]",
  },
};

/**
 * GovBadge — Official Government of India badge chip.
 *
 * Use to mark portal sections as official, verified, or government-issued.
 *
 * @example
 * <GovBadge variant="official" />
 * <GovBadge variant="verified" label="CPCB Approved" />
 */
export function GovBadge({
  variant = "official",
  label,
  className,
}: GovBadgeProps) {
  const config = variantConfig[variant];
  const displayLabel = label ?? config.label;

  return (
    <span
      role="img"
      aria-label={`Badge: ${displayLabel}`}
      className={cn(
        "inline-flex items-center gap-1.5",
        "px-2.5 py-1 rounded-sm",
        "text-xs font-semibold uppercase tracking-wider",
        "border",
        config.classes,
        className,
      )}
    >
      {/* Ashoka Chakra — simplified dot indicator */}
      <span
        className="w-1.5 h-1.5 rounded-full bg-current opacity-80"
        aria-hidden="true"
      />
      {displayLabel}
    </span>
  );
}
