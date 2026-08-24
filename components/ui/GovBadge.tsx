import type { GovBadgeProps, BadgeVariant } from "@/types";
import { cn } from "@/lib/utils";

const variantConfig: Record<
  BadgeVariant,
  { label: string; classes: string }
> = {
  official: {
    label: "AI Verified",
    classes: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  verified: {
    label: "Verified Dealer",
    classes: "bg-teal-50 text-teal-800 border-teal-200",
  },
  gov: {
    label: "EcoRoute Certified",
    classes: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  new: {
    label: "New Listing",
    classes: "bg-amber-50 text-amber-800 border-amber-200",
  },
  beta: {
    label: "AI Scrap Vision",
    classes: "bg-sky-50 text-sky-800 border-sky-200",
  },
};

/**
 * GovBadge / MarketplaceBadge — Clean marketplace status chip.
 */
export function GovBadge({
  variant = "official",
  label,
  className,
}: GovBadgeProps) {
  const config = variantConfig[variant] || variantConfig.official;
  const displayLabel = label ?? config.label;

  return (
    <span
      role="status"
      aria-label={`Badge: ${displayLabel}`}
      className={cn(
        "inline-flex items-center gap-1.5",
        "px-2.5 py-0.5 rounded-full",
        "text-xs font-bold tracking-tight",
        "border shadow-2xs",
        config.classes,
        className,
      )}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-current opacity-80"
        aria-hidden="true"
      />
      {displayLabel}
    </span>
  );
}

