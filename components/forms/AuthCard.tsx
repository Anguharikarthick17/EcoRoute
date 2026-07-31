import Link from "next/link";
import { MdRecycling } from "react-icons/md";
import { cn } from "@/lib/utils";
import type { AuthCardProps } from "@/types/auth";

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

/**
 * AuthCard — Centered white card wrapper for all authentication pages.
 *
 * Includes the EcoRoute logo link at the top. Wrap every auth page
 * form with this component.
 *
 * @example
 * <AuthCard maxWidth="md">
 *   <h1>Citizen Login</h1>
 *   ...form...
 * </AuthCard>
 */
export function AuthCard({
  children,
  maxWidth = "md",
  className,
}: AuthCardProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[var(--color-background)] py-10 px-4">
      <div className={cn("w-full", maxWidthMap[maxWidth])}>
        {/* ── Logo ──────────────────────────────────────────── */}
        <div className="flex justify-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)] rounded"
            aria-label="EcoRoute — Return to homepage"
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded bg-[var(--color-primary)] text-white"
              aria-hidden="true"
            >
              <MdRecycling className="w-6 h-6" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-[var(--color-primary)] tracking-tight">
                EcoRoute
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                Government of India
              </span>
            </div>
          </Link>
        </div>

        {/* ── Card ──────────────────────────────────────────── */}
        <div
          className={cn(
            "bg-white border border-[var(--color-border)] rounded-lg shadow-md",
            "p-7 sm:p-8",
            className,
          )}
        >
          {children}
        </div>

        {/* ── Security footer ───────────────────────────────── */}
        <p className="mt-5 text-center text-[11px] text-[var(--color-text-muted)] flex items-center justify-center gap-1.5">
          <span aria-hidden="true">🔒</span>
          Protected by Government Standard Security · ISO 27001 Certified
        </p>
      </div>
    </div>
  );
}
