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
  MdRecycling,
  MdLocalShipping,
  MdPayments,
  MdShield,
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
    const expired = searchParams.get("expired");

    if (paramEmail) {
      setIdentifier(paramEmail);
    }
    if (roleParam === "recycler") {
      setRole("recycler");
    }
    if (registered === "true") {
      setSuccessMsg("Account registered successfully! Enter your password to log in (1-hour active session).");
    }
    if (expired === "true") {
      setServerError("⚠️ Your 1-hour active session has expired. Please log in again to continue.");
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

  const inputHeightStyle = "h-[52px] text-sm font-semibold rounded-xl border-slate-300 focus:ring-2 focus:ring-emerald-500/20 shadow-xs";

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-8 lg:py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/60 flex items-center justify-center">
      {/* ── FULL WIDTH CONTAINER (94% viewport width, max 1400px) ───── */}
      <div className="w-[94vw] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* ── LEFT SECTION (40-45% width, lg:col-span-5) ────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-5 relative rounded-[28px] overflow-hidden shadow-2xl border border-slate-700/40 bg-gradient-to-br from-slate-950 via-slate-900 to-[var(--color-primary)] text-white p-8 lg:p-12 flex flex-col justify-between min-h-[500px]"
        >
          {/* Looping Background Video with Dark Overlay */}
          <video
            src="/videos/seller-dashboard.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-25 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-0 pointer-events-none" />

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col gap-6">
            {/* Top Brand Tag */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                <MdRecycling className="w-6 h-6 text-emerald-400 animate-spin-slow" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">EcoRoute</span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Digital India · CPCB Compliant</span>
              </div>
            </div>

            {/* Headline */}
            <div className="mt-4 flex flex-col gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
                Access India&apos;s Smart <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                  E-Waste Portal
                </span>
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                Secure Government of India service gateway for citizens, verified recyclers, and authorized collection centers across all 28 States & 8 UTs.
              </p>
            </div>

            {/* ── 4 FEATURE CARDS ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
              {[
                {
                  title: "Doorstep Pickup Tracking",
                  desc: "Real-time status updates & agent assignment",
                  icon: MdLocalShipping,
                  color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
                },
                {
                  title: "Green Coins Wallet",
                  desc: "Instant cash payouts & civic bill rebates",
                  icon: MdPayments,
                  color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300",
                },
                {
                  title: "CPCB Authorized Bidding",
                  desc: "Direct buyer access for certified scrap dealers",
                  icon: MdVerified,
                  color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
                },
                {
                  title: "256-Bit SSL Security",
                  desc: "ISO 27001 & Data Protection Act 2023 certified",
                  icon: MdShield,
                  color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300",
                },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-br ${f.color} backdrop-blur-md border p-3.5 rounded-2xl flex flex-col gap-1.5 shadow-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white/10">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-extrabold text-white">{f.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="relative z-10 pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <MdSecurity className="w-4 h-4 text-emerald-400" />
              ISO 27001 Information Security
            </span>
            <span className="text-emerald-400 font-bold">Encrypted Gateway</span>
          </div>
        </motion.div>

        {/* ── RIGHT SECTION (55-60% width, lg:col-span-7) ───────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-7 bg-white/95 backdrop-blur-xl border border-white/60 rounded-[28px] shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col gap-6 justify-center"
        >
          {/* ── Role Selector Tabs at Top ──────────────────────────────── */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
              Select User Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
              <button
                type="button"
                id="role-citizen-tab"
                onClick={() => {
                  setRole("citizen");
                  setShowErrors(false);
                  setServerError(null);
                }}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-extrabold rounded-lg transition-all duration-200 cursor-pointer",
                  role === "citizen"
                    ? "bg-[var(--color-primary)] text-white shadow-md scale-[1.01]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                )}
              >
                <MdPerson className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  "flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-extrabold rounded-lg transition-all duration-200 cursor-pointer",
                  role === "recycler"
                    ? "bg-[var(--color-primary)] text-white shadow-md scale-[1.01]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                )}
              >
                <MdStorefront className="w-4 h-4 sm:w-5 sm:h-5" />
                Verified Recycler (Buyer)
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {role === "recycler" ? "Verified Recycler Login" : "Citizen Login"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {role === "recycler"
                ? "Sign in with your CPCB registered facility credentials."
                : "Access your EcoRoute account securely to request pickups & redeem Green Coins."}
            </p>
          </div>

          {/* Feedback Messages */}
          {serverError && (
            <GovAlertBox variant="warning" title="Login Error" className="rounded-xl">
              {serverError}
            </GovAlertBox>
          )}

          {successMsg && (
            <GovAlertBox variant="info" title="Success!" className="rounded-xl">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <MdCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                {successMsg}
              </div>
            </GovAlertBox>
          )}

          {/* Government Security Notice */}
          <GovAlertBox
            variant="security"
            title="Official Digital Platform"
            className="rounded-xl"
          >
            <ul className="flex flex-col gap-1.5 mt-1 text-xs font-medium text-slate-700">
              <li className="flex items-center gap-2">
                <MdVerified className="w-4 h-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                {role === "recycler" ? "CPCB Authorized Facility Gateway" : "Government of India authorized service"}
              </li>
              <li className="flex items-center gap-2">
                <MdSecurity className="w-4 h-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                256-bit SSL encrypted communication
              </li>
              <li className="flex items-center gap-2">
                <MdLock className="w-4 h-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                ISO 27001 information security certified
              </li>
            </ul>
          </GovAlertBox>

          {/* Login Form */}
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
              inputClassName={inputHeightStyle}
              state={identifierError ? "error" : "default"}
              errorMessage={identifierError}
              prefix={role === "recycler" ? <MdPhone className="w-4 h-4 text-slate-400" /> : <MdEmail className="w-4 h-4 text-slate-400" />}
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
                inputClassName={inputHeightStyle}
                state={passwordError ? "error" : "default"}
                errorMessage={passwordError}
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Remember Me */}
            <FormCheckbox
              id="login-remember"
              label={<span className="text-xs font-medium text-slate-700">Keep me signed in on this device</span>}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            {/* Submit Button */}
            <button
              type="submit"
              id="login-submit-btn"
              disabled={isSubmitting}
              className="w-full h-[52px] flex items-center justify-center gap-2 px-6 text-base font-extrabold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.99] transition-all duration-150 shadow-lg disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  {role === "recycler" ? "Login as Verified Recycler" : "Login to EcoRoute"}
                  <MdArrowForward className="w-5 h-5" aria-hidden="true" />
                </>
              )}
            </button>

            <FormDivider />

            {/* Register Action */}
            <Link
              href={`/register?role=${role}`}
              id="login-register-btn"
              className="w-full h-[52px] flex items-center justify-center gap-2 px-6 text-sm font-extrabold rounded-xl bg-slate-50 text-[var(--color-primary)] border border-slate-300 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-150 shadow-xs text-center"
            >
              Register as {role === "recycler" ? "Verified Recycler Facility" : "New Citizen Account"}
            </Link>
          </form>

          {/* Footer Terms */}
          <p className="text-center text-xs text-slate-500 font-medium">
            By logging in, you agree to EcoRoute&apos;s{" "}
            <Link href="/terms" className="font-bold text-[var(--color-secondary)] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-bold text-[var(--color-secondary)] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-slate-500">Loading EcoRoute Login...</div>}>
        <LoginContent />
      </Suspense>
    </motion.div>
  );
}
