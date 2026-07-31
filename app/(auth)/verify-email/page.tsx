"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthCard, GovAlertBox } from "@/components/forms";
import { MdCheckCircle, MdArrowForward, MdVerified } from "react-icons/md";

export default function VerifyEmailPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <AuthCard maxWidth="md">
        <div className="flex flex-col items-center text-center gap-6 py-4">

          {/* ── Success animation ────────────────────────── */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            className="relative"
            aria-hidden="true"
          >
            {/* Outer ring */}
            <div className="w-24 h-24 rounded-full bg-[var(--color-accent)]/10 border-4 border-[var(--color-accent)]/20 flex items-center justify-center">
              {/* Inner circle */}
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                <MdCheckCircle className="w-9 h-9 text-white" />
              </div>
            </div>
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border-2 border-[var(--color-accent)] flex items-center justify-center">
              <MdVerified className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
          </motion.div>

          {/* ── Text ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-2xl font-bold text-[var(--color-text)]">
              Email Verified Successfully
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
              Your EcoRoute account has been successfully verified. You can now
              access all government e-waste management services.
            </p>
          </motion.div>

          {/* ── What's next ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="w-full flex flex-col gap-3"
          >
            <div className="border border-[var(--color-accent)]/25 bg-green-50 rounded-lg p-4 text-left">
              <p className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider mb-2">
                Account Benefits Unlocked
              </p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "Schedule free doorstep e-waste pickup",
                  "Locate CPCB-authorized recycling centres",
                  "Track your e-waste in real time",
                  "Download government-issued recycling certificates",
                ].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
                  >
                    <MdCheckCircle
                      className="w-3.5 h-3.5 text-[var(--color-accent)] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <GovAlertBox variant="info">
              This verification link is now inactive. If you did not verify this
              account, please contact EcoRoute Support at{" "}
              <a href="mailto:anguharikarthick@gmail.com" className="font-medium underline">
                anguharikarthick@gmail.com
              </a>
              .
            </GovAlertBox>
          </motion.div>

          {/* ── CTA ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="w-full"
          >
            <Link
              href="/login"
              id="verify-login-btn"
              className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.99] transition-all duration-150 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
            >
              Proceed to Login
              <MdArrowForward className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </AuthCard>
    </motion.div>
  );
}
