"use client";

import Link from "next/link";
import { MdWarningAmber, MdArrowBack, MdHome } from "react-icons/md";
import type { NotFound404Props } from "@/types";
import { cn } from "@/lib/utils";

/**
 * NotFound404 — Government-style 404 error page component.
 *
 * Rendered by `app/not-found.tsx`. Provides navigation back options.
 *
 * @example
 * // In app/not-found.tsx:
 * import { NotFound404 } from "@/components/ui/NotFound404";
 * export default function NotFound() { return <NotFound404 />; }
 */
export function NotFound404({
  title = "Page Not Found",
  description = "The page you are looking for does not exist or has been moved. Please check the URL or return to the home page.",
  className,
}: NotFound404Props) {
  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="error-heading"
      className={cn(
        "flex-1 flex items-center justify-center",
        "bg-[var(--color-background)]",
        "py-20 px-4",
        className,
      )}
    >
      <div className="max-w-lg w-full text-center flex flex-col items-center gap-6">
        {/* Error icon */}
        <div
          className={cn(
            "flex items-center justify-center",
            "w-20 h-20 rounded-full",
            "bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]/20",
            "text-[var(--color-primary)]",
          )}
          aria-hidden="true"
        >
          <MdWarningAmber className="w-10 h-10" />
        </div>

        {/* Error code */}
        <div>
          <p
            className="text-7xl font-bold text-[var(--color-primary)] leading-none tracking-tight"
            aria-hidden="true"
          >
            404
          </p>
          <div className="h-0.5 w-16 bg-[var(--color-accent)] mx-auto mt-3 rounded-full" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1
            id="error-heading"
            className="text-2xl font-bold text-[var(--color-text)]"
          >
            {title}
          </h1>
          <p className="text-base text-[var(--color-text-muted)] leading-relaxed mx-auto">
            {description}
          </p>
        </div>

        {/* Government notice */}
        <div
          className={cn(
            "px-4 py-3 rounded border",
            "bg-amber-50 border-amber-200",
            "text-sm text-amber-800 text-left",
          )}
          role="note"
        >
          <p>
            <strong>Note:</strong> If you believe this is an error on our portal,
            please contact us at{" "}
            <a
              href="mailto:anguharikarthick@gmail.com"
              className="text-[var(--color-primary)] font-[var(--font-heading)] font-[var(--font-weight-medium)] no-underline hover:underline"
            >
              anguharikarthick@gmail.com
            </a>{" "}
            or call our helpline{" "}
            <a href="tel:18002007911" className="font-medium underline">
              1800-200-7911
            </a>
            .
          </p>
        </div>

        {/* Navigation actions */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5",
              "text-sm font-semibold rounded",
              "bg-[var(--color-primary)] text-white",
              "hover:bg-[var(--color-primary-dark)]",
              "transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-[var(--color-secondary)]",
            )}
          >
            <MdHome className="w-4 h-4" aria-hidden="true" />
            Go to Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5",
              "text-sm font-semibold rounded",
              "bg-transparent text-[var(--color-primary)]",
              "border border-[var(--color-primary)]",
              "hover:bg-[var(--color-primary)] hover:text-white",
              "transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-[var(--color-secondary)]",
            )}
          >
            <MdArrowBack className="w-4 h-4" aria-hidden="true" />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
