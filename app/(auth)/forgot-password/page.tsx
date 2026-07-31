"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FormInput, GovAlertBox, AuthCard } from "@/components/forms";
import { MdEmail, MdArrowForward, MdArrowBack } from "react-icons/md";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const emailError =
    showError && !email
      ? "Email address is required."
      : showError && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Please enter a valid email address."
        : undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowError(true);
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitted(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <AuthCard maxWidth="md">
        {submitted ? (
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
              <MdEmail className="w-8 h-8 text-[var(--color-accent)]" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-[var(--color-text)]">
                Reset Link Sent
              </h1>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                If an account exists for{" "}
                <strong className="text-[var(--color-text)]">{email}</strong>,
                you will receive a password reset link within 5 minutes.
              </p>
            </div>
            <GovAlertBox variant="info">
              Check your spam or junk folder if you do not receive the email.
              The link will expire after <strong>30 minutes</strong> for security.
            </GovAlertBox>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
            >
              <MdArrowBack className="w-4 h-4" aria-hidden="true" />
              Return to Login
            </Link>
          </motion.div>
        ) : (
          /* ── Form state ────────────────────────────────── */
          <>
            {/* Heading */}
            <div className="flex flex-col gap-1.5 mb-7">
              <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Enter your registered email address to receive password reset instructions.
              </p>
            </div>

            {/* Notice */}
            <GovAlertBox variant="security" title="Security Notice" className="mb-6">
              For your protection, password reset links are valid for 30 minutes
              and can only be used once. Never share your reset link with anyone.
            </GovAlertBox>

            {/* Form */}
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-label="Forgot password form"
              className="flex flex-col gap-5"
            >
              <FormInput
                id="forgot-email"
                label="Registered Email Address"
                type="email"
                placeholder="yourname@example.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                state={emailError ? "error" : "default"}
                errorMessage={emailError}
                hintMessage="Use the email address associated with your EcoRoute account."
                prefix={<MdEmail className="w-4 h-4" />}
              />

              {/* Submit */}
              <button
                type="submit"
                id="forgot-submit-btn"
                className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.99] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
              >
                Send Reset Link
                <MdArrowForward className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Back to login */}
              <Link
                href="/login"
                id="forgot-back-btn"
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
