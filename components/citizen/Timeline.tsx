import type { TimelineProps } from "@/types/citizen";
import { cn } from "@/lib/utils";
import { MdCheck, MdRadioButtonUnchecked, MdErrorOutline } from "react-icons/md";

/**
 * Timeline — Vertical & horizontal step tracker for pickup tracking.
 */
export function Timeline({ steps, className }: TimelineProps) {
  return (
    <div className={cn("relative flex flex-col gap-6", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isCompleted = step.status === "completed";
        const isCurrent = step.status === "current";
        const isError = step.status === "error";

        return (
          <div key={index} className="relative flex items-start gap-4 group">
            {/* Connecting Line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-4 top-8 -bottom-6 w-0.5 z-0",
                  isCompleted ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]",
                )}
                aria-hidden="true"
              />
            )}

            {/* Icon Node */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs transition-all duration-200",
                isCompleted && "bg-[var(--color-accent)] text-white shadow-sm",
                isCurrent &&
                  "bg-[var(--color-primary)] text-white ring-4 ring-[var(--color-primary)]/15 shadow-md",
                isError && "bg-[var(--color-danger)] text-white",
                step.status === "upcoming" &&
                  "bg-slate-100 border border-[var(--color-border)] text-[var(--color-text-muted)]",
              )}
            >
              {isCompleted ? (
                <MdCheck className="w-5 h-5" />
              ) : isError ? (
                <MdErrorOutline className="w-5 h-5" />
              ) : isCurrent ? (
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              ) : (
                <MdRadioButtonUnchecked className="w-4 h-4 text-slate-400" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex flex-col gap-0.5 pt-1">
              <div className="flex items-center gap-2">
                <h4
                  className={cn(
                    "text-sm font-bold leading-tight",
                    isCompleted && "text-[var(--color-text)]",
                    isCurrent && "text-[var(--color-primary)] font-extrabold",
                    step.status === "upcoming" && "text-[var(--color-text-muted)] font-medium",
                  )}
                >
                  {step.title}
                </h4>
                {step.date && (
                  <span className="text-[11px] text-[var(--color-text-muted)] bg-slate-100 px-2 py-0.5 rounded font-mono">
                    {step.date}
                  </span>
                )}
              </div>
              {step.description && (
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mt-0.5">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
