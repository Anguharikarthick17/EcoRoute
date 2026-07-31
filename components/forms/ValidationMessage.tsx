import type { ValidationMessageProps } from "@/types/auth";
import { cn } from "@/lib/utils";
import { MdError, MdCheckCircle, MdInfo, MdWarning } from "react-icons/md";

const CONFIG = {
  error: {
    icon: MdError,
    textColor: "text-[var(--color-danger)]",
    role: "alert" as const,
  },
  success: {
    icon: MdCheckCircle,
    textColor: "text-[var(--color-accent)]",
    role: "status" as const,
  },
  hint: {
    icon: MdInfo,
    textColor: "text-[var(--color-text-muted)]",
    role: undefined,
  },
  warning: {
    icon: MdWarning,
    textColor: "text-[var(--color-warning)]",
    role: "alert" as const,
  },
} as const;

/**
 * ValidationMessage — Inline field-level validation feedback.
 *
 * Communicates error / success / hint / warning states to
 * both visual and assistive technology users.
 */
export function ValidationMessage({
  variant,
  message,
  className,
  id,
}: ValidationMessageProps & { id?: string }) {
  const { icon: Icon, textColor, role } = CONFIG[variant];

  return (
    <p
      id={id}
      role={role}
      aria-live={role === "alert" ? "polite" : undefined}
      className={cn(
        "flex items-start gap-1.5 text-xs leading-snug",
        textColor,
        className,
      )}
    >
      <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}
