import type { SectionTitleProps } from "@/types";
import { cn } from "@/lib/utils";

const alignClasses = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
} as const;

/**
 * SectionTitle — Government-standard section heading with optional subtitle
 * and accent underline rule.
 *
 * @example
 * <SectionTitle
 *   title="Our Services"
 *   subtitle="Comprehensive e-waste management solutions for citizens and organisations."
 *   align="center"
 *   showRule
 * />
 */
export function SectionTitle({
  title,
  subtitle,
  align = "left",
  showRule = true,
  badge,
  className,
  id,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        alignClasses[align],
        className,
      )}
    >


      {/* Heading */}
      <h2
        id={id}
        className={cn(
          "text-2xl sm:text-3xl font-bold text-[var(--color-text)]",
          "text-balance leading-tight tracking-tight",
        )}
      >
        {title}
      </h2>

      {/* Accent rule */}
      {showRule && (
        <div
          className={cn(
            "flex",
            align === "center" && "justify-center",
            align === "right" && "justify-end",
          )}
        >
          <div className="h-0.5 w-16 bg-[var(--color-primary)] rounded-full" />
          <div className="h-0.5 w-4 bg-[var(--color-accent)] rounded-full ml-1" />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "text-base text-[var(--color-text-muted)] leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
