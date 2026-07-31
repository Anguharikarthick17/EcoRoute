"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthCard, GovAlertBox } from "@/components/forms";
import { MdWarningAmber, MdHome, MdArrowBack } from "react-icons/md";

export default function AuthErrorPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <AuthCard maxWidth="md">
        <div className="flex flex-col items-center text-center gap-6 py-4">

          {/* ── Error icon ───────────────────────────────── */}
          <div
            className="w-20 h-20 rounded-full bg-[var(--color-danger)]/8 border-2 border-[var(--color-danger)]/20 flex items-center justify-center"
            aria-hidden="true"
          >
            <MdWarningAmber className="w-10 h-10 text-[var(--color-danger)]" />
          </div>

          {/* ── Error code ───────────────────────────────── */}
          <div>
            <p
              className="text-5xl font-bold text-[var(--color-primary)] leading-none"
              aria-hidden="true"
            >
              404
            </p>
            <div className="h-0.5 w-12 bg-[var(--color-danger)] mx-auto mt-2 rounded-full" aria-hidden="true" />
          </div>

          {/* ── Text ─────────────────────────────────────── */}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-[var(--color-text)]">
              Authentication Page Not Found
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
              The authentication page you are looking for does not exist, has
              expired, or you may not have permission to access it.
            </p>
          </div>

          {/* ── Common causes ────────────────────────────── */}
          <GovAlertBox variant="warning" title="Common Causes" className="text-left w-full">
            <ul className="flex flex-col gap-1.5 mt-1">
              {[
                "Your password reset link may have expired (valid for 30 minutes).",
                "You may have already used this verification link.",
                "The URL may be incorrect or mistyped.",
                "Your session may have timed out for security reasons.",
              ].map((cause) => (
                <li key={cause} className="flex items-start gap-1.5">
                  <span className="w-1 h-1 mt-1.5 rounded-full bg-amber-600 shrink-0" aria-hidden="true" />
                  {cause}
                </li>
              ))}
            </ul>
          </GovAlertBox>

          {/* ── Actions ──────────────────────────────────── */}
          <div className="w-full flex flex-col gap-3">
            <Link
              href="/"
              id="auth-error-home-btn"
              className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all duration-150 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
            >
              <MdHome className="w-4 h-4" aria-hidden="true" />
              Return to Home
            </Link>
            <Link
              href="/login"
              className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-150 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
            >
              <MdArrowBack className="w-4 h-4" aria-hidden="true" />
              Go to Login
            </Link>
          </div>

          {/* ── Support ──────────────────────────────────── */}
          <p className="text-xs text-[var(--color-text-muted)]">
            Need help?{" "}
            <a
              href="mailto:anguharikarthick@gmail.com"
              className="text-[var(--color-primary)] font-[var(--font-heading)] font-[var(--font-weight-medium)] no-underline hover:underline"
            >
              anguharikarthick@gmail.com
            </a>{" "}
            · Helpline{" "}
            <a
              href="tel:18002007911"
              className="text-[var(--color-secondary)] font-medium hover:underline"
            >
              1800-200-7911
            </a>
          </p>
        </div>
      </AuthCard>
    </motion.div>
  );
}
