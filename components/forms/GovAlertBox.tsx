import type { GovAlertBoxProps } from "@/types/auth";
import { cn } from "@/lib/utils";
import {
  MdInfo,
  MdCheckCircle,
  MdWarningAmber,
  MdSecurity,
} from "react-icons/md";

const VARIANT_CONFIG = {
  info: {
    icon: MdInfo,
    wrapper: "bg-blue-50 border-[var(--color-secondary)]/30",
    iconColor: "text-[var(--color-secondary)]",
    titleColor: "text-[var(--color-secondary)]",
  },
  success: {
    icon: MdCheckCircle,
    wrapper: "bg-green-50 border-[var(--color-accent)]/30",
    iconColor: "text-[var(--color-accent)]",
    titleColor: "text-[var(--color-accent)]",
  },
  warning: {
    icon: MdWarningAmber,
    wrapper: "bg-amber-50 border-[var(--color-warning)]/40",
    iconColor: "text-amber-600",
    titleColor: "text-amber-700",
  },
  security: {
    icon: MdSecurity,
    wrapper: "bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20",
    iconColor: "text-[var(--color-primary)]",
    titleColor: "text-[var(--color-primary)]",
  },
} as const;

/**
 * GovAlertBox — Government information / security / notice box.
 *
 * @example
 * <GovAlertBox variant="security" title="Secure Login">
 *   This is an official Government of India digital service. Your session is encrypted.
 * </GovAlertBox>
 */
export function GovAlertBox({
  variant = "info",
  title,
  children,
  className,
}: GovAlertBoxProps) {
  const { icon: Icon, wrapper, iconColor, titleColor } = VARIANT_CONFIG[variant];

  return (
    <div
      role="note"
      aria-label={title ?? "Notice"}
      className={cn(
        "flex gap-3 p-4 rounded border text-sm",
        wrapper,
        className,
      )}
    >
      <Icon
        className={cn("w-4 h-4 mt-0.5 shrink-0", iconColor)}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1">
        {title && (
          <p className={cn("text-xs font-bold uppercase tracking-wider", titleColor)}>
            {title}
          </p>
        )}
        <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
