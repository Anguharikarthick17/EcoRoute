"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { PasswordInput, GovAlertBox, AuthCard } from "@/components/forms";
import { MdArrowForward, MdArrowBack } from "react-icons/md";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordError =
    showErrors && !password
      ? "New password is required."
      : showErrors && password.length < 8
        ? "Password must be at least 8 characters long."
        : undefined;

  const confirmError =
    showErrors && !confirm
      ? "Please confirm your new password."
      : showErrors && password !== confirm
        ? "Passwords do not match."
        : undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowErrors(true);
    if (password.length >= 8 && password === confirm) {
      setSuccess(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <AuthCard maxWidth="md">
        {success ? (
          /* ── Success state ─────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center text-center gap-5 py-4"
          >
            <div
              className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 border-2 border-[var(--color-accent)]/25 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-3xl" aria-hidden="true">✓</span>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-[var(--color-text)]">
                Password Updated
              </h1>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Your password has been updated successfully. Please login with
                your new credentials.
              </p>
            </div>
            <GovAlertBox variant="success">
              For security, all existing sessions have been signed out.
              Please login again on all your devices.
            </GovAlertBox>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
            >
              Proceed to Login
              <MdArrowForward className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Heading */}
            <div className="flex flex-col gap-1.5 mb-7">
              <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">
                Reset Password
              </h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Choose a strong new password for your EcoRoute account.
              </p>
            </div>

            {/* Security notice */}
            <GovAlertBox variant="security" title="Password Requirements" className="mb-6">
              <ul className="flex flex-col gap-1 mt-1 list-none">
                {[
                  "Minimum 8 characters",
                  "At least one uppercase letter",
                  "At least one number",
                  "At least one special character (e.g. @, #, $)",
                ].map((rule) => (
                  <li key={rule} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0" aria-hidden="true" />
                    {rule}
                  </li>
                ))}
              </ul>
            </GovAlertBox>

            {/* Form */}
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-label="Reset password form"
              className="flex flex-col gap-5"
            >
              <PasswordInput
                id="reset-password"
                label="New Password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                showStrengthMeter
                state={passwordError ? "error" : "default"}
                errorMessage={passwordError}
              />

              <PasswordInput
                id="reset-confirm"
                label="Confirm New Password"
                placeholder="Re-enter your new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                state={
                  confirmError
                    ? "error"
                    : confirm && !confirmError
                      ? "success"
                      : "default"
                }
                errorMessage={confirmError}
                successMessage={confirm && !confirmError ? "Passwords match." : undefined}
              />

              {/* Submit */}
              <button
                type="submit"
                id="reset-submit-btn"
                className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.99] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
              >
                Update Password
                <MdArrowForward className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Back */}
              <Link
                href="/login"
                id="reset-back-btn"
                className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-150 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
              >
                <MdArrowBack className="w-4 h-4" aria-hidden="true" />
                Back to Login
              </Link>
            </form>
          </>
        )}
      </AuthCard>
    </motion.div>
  );
}
