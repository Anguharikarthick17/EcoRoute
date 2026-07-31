"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FormInput,
  PasswordInput,
  FormCheckbox,
  FormDivider,
  GovAlertBox,
  AuthCard,
} from "@/components/forms";
import { cn } from "@/lib/utils";
import {
  MdEmail,
  MdPhone,
  MdArrowForward,
  MdVerified,
  MdSecurity,
  MdLock,
  MdCheckCircle,
  MdPerson,
  MdStorefront,
} from "react-icons/md";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<"citizen" | "recycler">("citizen");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const paramEmail = searchParams.get("email");
    const registered = searchParams.get("registered");
    const roleParam = searchParams.get("role");

    if (paramEmail) {
      setIdentifier(paramEmail);
    }
    if (roleParam === "recycler") {
      setRole("recycler");
    }
    if (registered === "true") {
      setSuccessMsg("Account registered successfully! Enter your password to log in to the portal.");
    }
  }, [searchParams]);

  const identifierError =
    showErrors && !identifier
      ? role === "recycler"
        ? "Email address or 10-digit mobile number is required."
        : "Email address is required."
      : undefined;

  const passwordError =
    showErrors && !password ? "Password is required." : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    setServerError(null);

    if (!identifier || !password) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password, rememberMe, role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || "Invalid credentials. Please check your details and password.");
        setIsSubmitting(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("ecoroute_user", JSON.stringify(data.user));
      }

      // Recyclers go to Buyer Marketplace; Citizens go to Sell Scrap page
      const userRole = data.user?.role;
      if (userRole === "RECYCLER") {
        window.location.replace("/buyer");
      } else {
        window.location.replace("/dashboard/upload");
      }

    } catch (err: any) {
      setServerError(err.message || "Login failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard maxWidth="md">
      {/* ── Role Selector ───────────────────────────────── */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
          Select User Role
        </label>
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-lg border border-slate-200">
          <button
            type="button"
            id="role-citizen-tab"
            onClick={() => {
              setRole("citizen");
              setShowErrors(false);
              setServerError(null);
            }}
            className={cn(
              "flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded transition-all duration-150 cursor-pointer",
              role === "citizen"
                ? "bg-[var(--color-primary)] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <MdPerson className="w-4 h-4" />
            Citizen
          </button>
          <button
            type="button"
            id="role-recycler-tab"
            onClick={() => {
              setRole("recycler");
              setShowErrors(false);
              setServerError(null);
            }}
            className={cn(
              "flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded transition-all duration-150 cursor-pointer",
              role === "recycler"
                ? "bg-[var(--color-primary)] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <MdStorefront className="w-4 h-4" />
            Verified Recycler (Buyer)
          </button>
        </div>
      </div>

      {/* ── Heading ─────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5 mb-7">
        <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">
          {role === "recycler" ? "Verified Recycler Login" : "Citizen Login"}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          {role === "recycler"
            ? "Sign in with your CPCB registered recycler credentials."
            : "Access your EcoRoute account securely."}
        </p>
      </div>

      {/* ── Feedback Messages ────────────────────────────── */}
      {serverError && (
        <GovAlertBox variant="warning" title="Login Error" className="mb-6">
          {serverError}
        </GovAlertBox>
      )}

      {successMsg && (
        <GovAlertBox variant="info" title="Success!" className="mb-6">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold">
            <MdCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            {successMsg}
          </div>
        </GovAlertBox>
      )}

      {/* ── Government Security Notice ───────────────────── */}
      <GovAlertBox
        variant="security"
        title="Official Digital Platform"
        className="mb-6"
      >
        <ul className="flex flex-col gap-1 mt-1">
          <li className="flex items-center gap-1.5">
            <MdVerified className="w-3 h-3 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            {role === "recycler" ? "CPCB Authorized Facility Gateway" : "Government of India authorized service"}
          </li>
          <li className="flex items-center gap-1.5">
            <MdSecurity className="w-3 h-3 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            256-bit SSL encrypted communication
          </li>
          <li className="flex items-center gap-1.5">
            <MdLock className="w-3 h-3 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            ISO 27001 information security certified
          </li>
        </ul>
      </GovAlertBox>

      {/* ── Login Form ───────────────────────────────────── */}
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-label={`${role === "recycler" ? "Recycler" : "Citizen"} login form`}
        className="flex flex-col gap-5"
      >
        {/* Email or Mobile Number */}
        <FormInput
          id="login-identifier"
          label={role === "recycler" ? "Email or Mobile Number" : "Email Address"}
          type={role === "recycler" ? "text" : "email"}
          placeholder={role === "recycler" ? "Registered email or 10-digit mobile" : "yourname@example.in"}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          autoComplete="username"
          state={identifierError ? "error" : identifier && !identifierError ? "default" : "default"}
          errorMessage={identifierError}
          prefix={role === "recycler" ? <MdPhone className="w-4 h-4" /> : <MdEmail className="w-4 h-4" />}
        />

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <PasswordInput
            id="login-password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            state={passwordError ? "error" : "default"}
            errorMessage={passwordError}
          />
          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-secondary)] rounded"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Remember me */}
        <FormCheckbox
          id="login-remember"
          label="Keep me signed in on this device"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />

        {/* Login button */}
        <button
          type="submit"
          id="login-submit-btn"
          disabled={isSubmitting}
          className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.99] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Signing in...</span>
          ) : (
            <>
              {role === "recycler" ? "Login as Verified Recycler" : "Login to EcoRoute"}
              <MdArrowForward className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>

        {/* Divider */}
        <FormDivider />

        {/* Register */}
        <Link
          href={`/register?role=${role}`}
          id="login-register-btn"
          className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-150 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
        >
          Register as {role === "recycler" ? "Verified Recycler" : "New Account"}
        </Link>
      </form>

      {/* ── Bottom text ──────────────────────────────────── */}
      <p className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
        By logging in, you agree to EcoRoute's{" "}
        <Link href="/terms" className="text-[var(--color-secondary)] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-[var(--color-secondary)] hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <LoginContent />
      </Suspense>
    </motion.div>
  );
}
