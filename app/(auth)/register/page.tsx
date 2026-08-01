"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FormInput,
  PasswordInput,
  FormSelect,
  FormCheckbox,
  GovAlertBox,
} from "@/components/forms";
import { cn } from "@/lib/utils";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdHome,
  MdLocationCity,
  MdArrowForward,
  MdCheckCircle,
  MdStorefront,
  MdVerifiedUser,
  MdMyLocation,
  MdCloudUpload,
  MdFingerprint,
  MdLocalShipping,
  MdPayments,
  MdVerified,
  MdSecurity,
  MdRecycling,
  MdShield,
} from "react-icons/md";

// ── Indian States list ────────────────────────────────────────
const INDIAN_STATES = [
  { value: "AN", label: "Andaman and Nicobar Islands" },
  { value: "AP", label: "Andhra Pradesh" },
  { value: "AR", label: "Arunachal Pradesh" },
  { value: "AS", label: "Assam" },
  { value: "BR", label: "Bihar" },
  { value: "CH", label: "Chandigarh" },
  { value: "CT", label: "Chhattisgarh" },
  { value: "DN", label: "Dadra and Nagar Haveli and Daman and Diu" },
  { value: "DL", label: "Delhi" },
  { value: "GA", label: "Goa" },
  { value: "GJ", label: "Gujarat" },
  { value: "HR", label: "Haryana" },
  { value: "HP", label: "Himachal Pradesh" },
  { value: "JK", label: "Jammu and Kashmir" },
  { value: "JH", label: "Jharkhand" },
  { value: "KA", label: "Karnataka" },
  { value: "KL", label: "Kerala" },
  { value: "LA", label: "Ladakh" },
  { value: "LD", label: "Lakshadweep" },
  { value: "MP", label: "Madhya Pradesh" },
  { value: "MH", label: "Maharashtra" },
  { value: "MN", label: "Manipur" },
  { value: "ML", label: "Meghalaya" },
  { value: "MZ", label: "Mizoram" },
  { value: "NL", label: "Nagaland" },
  { value: "OR", label: "Odisha" },
  { value: "PY", label: "Puducherry" },
  { value: "PB", label: "Punjab" },
  { value: "RJ", label: "Rajasthan" },
  { value: "SK", label: "Sikkim" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "TG", label: "Telangana" },
  { value: "TR", label: "Tripura" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "UT", label: "Uttarakhand" },
  { value: "WB", label: "West Bengal" },
];

const E_WASTE_CATEGORIES = [
  "Mobiles",
  "Laptops",
  "Computers",
  "TV",
  "Batteries",
  "Chargers",
  "Refrigerators",
  "Printers",
  "Other",
];

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<"citizen" | "recycler">("citizen");

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "recycler") {
      setRole("recycler");
    }
  }, [searchParams]);

  // ── Citizen Form State ─────────────────────────────────────
  const [citizenData, setCitizenData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  const [acceptCitizenTerms, setAcceptCitizenTerms] = useState(false);
  const [receiveNotifications, setReceiveNotifications] = useState(false);

  // ── Recycler Form State ────────────────────────────────────
  const [recyclerData, setRecyclerData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    mobile: "",
    aadhaarNumber: "",
    shopAddress: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
    businessType: "Recycler",
    password: "",
    confirmPassword: "",
  });

  const [acceptedEWaste, setAcceptedEWaste] = useState<string[]>([
    "Mobiles",
    "Laptops",
    "Computers",
  ]);

  const [documents, setDocuments] = useState({
    shopPhoto: "",
    shopLicense: "",
    ownerIdProof: "",
  });

  // Aadhaar OTP Simulation State
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // Location detection state
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const [acceptRecyclerTerms, setAcceptRecyclerTerms] = useState(false);

  // Common submission states
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Handlers
  const updateCitizen = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setCitizenData((p) => ({ ...p, [field]: e.target.value }));

  const updateRecycler = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setRecyclerData((p) => ({ ...p, [field]: e.target.value }));

  const toggleCategory = (cat: string) => {
    setAcceptedEWaste((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // OTP Countdown timer
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  const handleSendOtp = () => {
    if (!recyclerData.aadhaarNumber || recyclerData.aadhaarNumber.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar Number first.");
      return;
    }
    setOtpSent(true);
    setOtpTimer(30);
  };

  const handleVerifyOtp = () => {
    if (otpValue.length >= 4) {
      setOtpVerified(true);
    } else {
      alert("Please enter a valid 6-digit OTP (e.g. 123456).");
    }
  };

  const handleDetectLocation = () => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      setIsDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setRecyclerData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
          }));
          setIsDetectingLocation(false);
          setLocationSuccess(true);
        },
        () => {
          setIsDetectingLocation(false);
          setRecyclerData((prev) => ({
            ...prev,
            latitude: "28.6139",
            longitude: "77.2090",
          }));
          setLocationSuccess(true);
        },
        { timeout: 10000 }
      );
    } else {
      setRecyclerData((prev) => ({
        ...prev,
        latitude: "28.6139",
        longitude: "77.2090",
      }));
      setLocationSuccess(true);
    }
  };

  // Validation helpers
  const citizenValid =
    citizenData.fullName &&
    citizenData.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(citizenData.email) &&
    citizenData.mobile &&
    /^[6-9]\d{9}$/.test(citizenData.mobile) &&
    citizenData.password &&
    citizenData.password.length >= 8 &&
    citizenData.password === citizenData.confirmPassword &&
    citizenData.address &&
    citizenData.city &&
    citizenData.state &&
    citizenData.pin &&
    /^\d{6}$/.test(citizenData.pin) &&
    acceptCitizenTerms;

  const recyclerValid =
    recyclerData.shopName &&
    recyclerData.ownerName &&
    recyclerData.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recyclerData.email) &&
    recyclerData.mobile &&
    /^[6-9]\d{9}$/.test(recyclerData.mobile) &&
    recyclerData.aadhaarNumber &&
    /^\d{12}$/.test(recyclerData.aadhaarNumber) &&
    recyclerData.shopAddress &&
    recyclerData.city &&
    recyclerData.district &&
    recyclerData.state &&
    recyclerData.pincode &&
    /^\d{6}$/.test(recyclerData.pincode) &&
    acceptedEWaste.length > 0 &&
    recyclerData.password &&
    recyclerData.password.length >= 8 &&
    recyclerData.password === recyclerData.confirmPassword &&
    acceptRecyclerTerms;

  const handleCitizenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    setServerError(null);

    if (!citizenValid) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...citizenData, role: "citizen" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || "Registration failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("ecoroute_user", JSON.stringify(data.user));
      }

      setSuccessMsg("Citizen account created successfully! Redirecting to login...");

      window.location.href = `/login?email=${encodeURIComponent(citizenData.email)}&registered=true&role=citizen`;

    } catch (err: any) {
      setServerError(err.message || "An error occurred.");
      setIsSubmitting(false);
    }
  };

  const handleRecyclerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    setServerError(null);

    if (!recyclerValid) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ...recyclerData,
        aadhaarVerified: otpVerified,
        acceptedEWaste,
        shopPhoto: documents.shopPhoto || "uploaded_shop_photo.png",
        shopLicense: documents.shopLicense || "uploaded_license.pdf",
        ownerIdProof: documents.ownerIdProof || "uploaded_owner_id.pdf",
        role: "recycler",
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || "Recycler registration failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("ecoroute_user", JSON.stringify(data.user));
        document.cookie = `ecoroute_user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=31536000`;
      }

      setSuccessMsg("Verified Recycler account created successfully! Redirecting to dashboard...");

      window.location.href = "/buyer";

    } catch (err: any) {
      setServerError(err.message || "An error occurred.");
      setIsSubmitting(false);
    }
  };

  const inputHeightStyle = "h-[52px] text-sm font-semibold rounded-xl border-slate-300 focus:ring-2 focus:ring-emerald-500/20 shadow-xs";

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-6 lg:py-12 px-4 sm:px-6 lg:px-8 bg-slate-100/60 flex items-center justify-center">
      {/* ── FULL WIDTH CONTAINER (90-95% viewport width, max 1400px) ───── */}
      <div className="w-[94vw] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ── LEFT SECTION (40-45% width, lg:col-span-5) ────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-5 relative rounded-[28px] overflow-hidden shadow-2xl border border-slate-700/40 bg-gradient-to-br from-slate-950 via-slate-900 to-[var(--color-primary)] text-white p-8 lg:p-12 flex flex-col justify-between min-h-[500px]"
        >
          {/* Looping Background Video with Dark Glass Overlay */}
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

            {/* Main Headline */}
            <div className="mt-4 flex flex-col gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
                Join India&apos;s Smart <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                  E-Waste Network
                </span>
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                Official Ministry of Environment, Forest and Climate Change portal for citizens, verified buyers, and government officers across all 28 States & 8 UTs.
              </p>
            </div>

            {/* ── 4 FEATURE CARDS ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
              {[
                {
                  title: "Schedule Pickup",
                  desc: "Doorstep e-waste collection with live GPS tracking",
                  icon: MdLocalShipping,
                  color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
                },
                {
                  title: "Sell Scrap Securely",
                  desc: "AI valuation & instant cash or EB bill rebates",
                  icon: MdPayments,
                  color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300",
                },
                {
                  title: "Verified Buyers",
                  desc: "100% CPCB authorized recycling facilities",
                  icon: MdVerified,
                  color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
                },
                {
                  title: "Government Certified",
                  desc: "MoEFCC & Digital India security protocol",
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
              ISO 27001 Certified Security
            </span>
            <span className="text-emerald-400 font-bold">256-Bit SSL Encrypted</span>
          </div>
        </motion.div>

        {/* ── RIGHT SECTION (55-60% width, lg:col-span-7) ───────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-7 bg-white/95 backdrop-blur-xl border border-white/60 rounded-[28px] shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col gap-6"
        >
          {/* ── Role Selector Segmented Tabs at Top ─────────────────────── */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
              Register Account As
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
              <button
                type="button"
                id="reg-role-citizen-tab"
                onClick={() => {
                  setRole("citizen");
                  setShowErrors(false);
                  setServerError(null);
                }}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-extrabold rounded-lg transition-all duration-200 cursor-pointer",
                  role === "citizen"
                    ? "bg-[var(--color-accent)] text-white shadow-md scale-[1.01]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                )}
              >
                <MdPerson className="w-4 h-4 sm:w-5 sm:h-5" />
                Citizen
              </button>
              <button
                type="button"
                id="reg-role-recycler-tab"
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
              {role === "recycler" ? "Verified Recycler (Buyer) Registration" : "Create Citizen Account"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {role === "recycler"
                ? "Register your facility for official CPCB authorization, scrap bidding & doorstep pickups."
                : "Register with EcoRoute to schedule doorstep pickups and access civic bill discounts."}
            </p>
          </div>

          {/* Feedback Alerts */}
          {serverError && (
            <GovAlertBox variant="warning" title="Registration Error" className="rounded-xl">
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

          {/* Guidelines */}
          <GovAlertBox variant="info" title="Registration Guidelines" className="rounded-xl">
            {role === "recycler" ? (
              <>
                All recycling facility applications undergo government audit under <strong className="text-[var(--color-primary)]">CPCB E-Waste Rules 2022</strong>. Please ensure accurate shop address and Aadhaar details.
              </>
            ) : (
              <>
                All fields marked <strong className="text-[var(--color-danger)]">*</strong> are mandatory. Use your Aadhaar-linked mobile number for faster verification. Your data is protected under the Digital Personal Data Protection Act, 2023.
              </>
            )}
          </GovAlertBox>

          {/* ── CITIZEN REGISTRATION FORM ────────────────────────────────────── */}
          {role === "citizen" ? (
            <form
              noValidate
              onSubmit={handleCitizenSubmit}
              aria-label="Citizen registration form"
              className="flex flex-col gap-6"
            >
              {/* Personal Info */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-slate-500 pb-2 border-b border-slate-200 w-full">
                  Personal Information
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    id="reg-fullname"
                    label="Full Name"
                    placeholder="As per government ID"
                    value={citizenData.fullName}
                    onChange={updateCitizen("fullName") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    autoComplete="name"
                    inputClassName={inputHeightStyle}
                    state={showErrors && !citizenData.fullName ? "error" : "default"}
                    errorMessage={showErrors && !citizenData.fullName ? "Full name is required." : undefined}
                    prefix={<MdPerson className="w-4 h-4 text-slate-400" />}
                  />
                  <FormInput
                    id="reg-email"
                    label="Email Address"
                    type="email"
                    placeholder="yourname@example.in"
                    value={citizenData.email}
                    onChange={updateCitizen("email") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    autoComplete="email"
                    inputClassName={inputHeightStyle}
                    state={
                      showErrors && (!citizenData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(citizenData.email))
                        ? "error"
                        : "default"
                    }
                    errorMessage={
                      showErrors && !citizenData.email
                        ? "Email address is required."
                        : showErrors && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(citizenData.email)
                          ? "Please enter a valid email address."
                          : undefined
                    }
                    prefix={<MdEmail className="w-4 h-4 text-slate-400" />}
                  />
                </div>

                <FormInput
                  id="reg-mobile"
                  label="Mobile Number"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={citizenData.mobile}
                  onChange={updateCitizen("mobile") as React.ChangeEventHandler<HTMLInputElement>}
                  required
                  autoComplete="tel"
                  maxLength={10}
                  inputClassName={inputHeightStyle}
                  state={
                    showErrors && (!citizenData.mobile || !/^[6-9]\d{9}$/.test(citizenData.mobile))
                      ? "error"
                      : "default"
                  }
                  errorMessage={
                    showErrors && !citizenData.mobile
                      ? "Mobile number is required."
                      : showErrors && !/^[6-9]\d{9}$/.test(citizenData.mobile)
                        ? "Enter a valid 10-digit Indian mobile number."
                        : undefined
                  }
                  hintMessage="Enter your Aadhaar-linked mobile number for seamless verification."
                  prefix={<MdPhone className="w-4 h-4 text-slate-400" />}
                  suffix={<span className="text-xs font-bold text-slate-500">+91</span>}
                />
              </fieldset>

              {/* Security Credentials */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-slate-500 pb-2 border-b border-slate-200 w-full">
                  Security Credentials
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <PasswordInput
                    id="reg-password"
                    label="Password"
                    placeholder="Create a strong password"
                    value={citizenData.password}
                    onChange={updateCitizen("password") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    autoComplete="new-password"
                    showStrengthMeter
                    inputClassName={inputHeightStyle}
                    state={showErrors && (!citizenData.password || citizenData.password.length < 8) ? "error" : "default"}
                    errorMessage={
                      showErrors && !citizenData.password
                        ? "Password is required."
                        : showErrors && citizenData.password.length < 8
                          ? "Password must be at least 8 characters."
                          : undefined
                    }
                    hintMessage="Min. 8 characters with uppercase, number and symbol."
                  />
                  <PasswordInput
                    id="reg-confirm-password"
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={citizenData.confirmPassword}
                    onChange={updateCitizen("confirmPassword") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    autoComplete="new-password"
                    inputClassName={inputHeightStyle}
                    state={
                      showErrors && citizenData.password !== citizenData.confirmPassword
                        ? "error"
                        : citizenData.confirmPassword && citizenData.password === citizenData.confirmPassword
                          ? "success"
                          : "default"
                    }
                    errorMessage={showErrors && citizenData.password !== citizenData.confirmPassword ? "Passwords do not match." : undefined}
                    successMessage={citizenData.confirmPassword && citizenData.password === citizenData.confirmPassword ? "Passwords match." : undefined}
                  />
                </div>
              </fieldset>

              {/* Address Details */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-slate-500 pb-2 border-b border-slate-200 w-full">
                  Address Details
                </legend>

                <FormInput
                  id="reg-address"
                  label="Street Address"
                  placeholder="Flat / House No., Street, Area"
                  value={citizenData.address}
                  onChange={updateCitizen("address") as React.ChangeEventHandler<HTMLInputElement>}
                  required
                  autoComplete="street-address"
                  inputClassName={inputHeightStyle}
                  state={showErrors && !citizenData.address ? "error" : "default"}
                  errorMessage={showErrors && !citizenData.address ? "Address is required." : undefined}
                  prefix={<MdHome className="w-4 h-4 text-slate-400" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <FormInput
                    id="reg-city"
                    label="City / Town"
                    placeholder="e.g. New Delhi"
                    value={citizenData.city}
                    onChange={updateCitizen("city") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    autoComplete="address-level2"
                    inputClassName={inputHeightStyle}
                    state={showErrors && !citizenData.city ? "error" : "default"}
                    errorMessage={showErrors && !citizenData.city ? "City is required." : undefined}
                    prefix={<MdLocationCity className="w-4 h-4 text-slate-400" />}
                  />
                  <FormSelect
                    id="reg-state"
                    label="State / UT"
                    options={INDIAN_STATES}
                    value={citizenData.state}
                    onChange={updateCitizen("state") as React.ChangeEventHandler<HTMLSelectElement>}
                    required
                    placeholder="Select State"
                    selectClassName={inputHeightStyle}
                    state={showErrors && !citizenData.state ? "error" : "default"}
                    errorMessage={showErrors && !citizenData.state ? "Please select your state." : undefined}
                  />
                  <FormInput
                    id="reg-pin"
                    label="PIN Code"
                    type="text"
                    placeholder="6-digit PIN"
                    value={citizenData.pin}
                    onChange={updateCitizen("pin") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    autoComplete="postal-code"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    inputClassName={inputHeightStyle}
                    state={showErrors && (!citizenData.pin || !/^\d{6}$/.test(citizenData.pin)) ? "error" : "default"}
                    errorMessage={showErrors && !citizenData.pin ? "PIN Code is required." : showErrors && !/^\d{6}$/.test(citizenData.pin) ? "Enter 6-digit PIN." : undefined}
                  />
                </div>
              </fieldset>

              {/* Consent & Submit */}
              <fieldset className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                <FormCheckbox
                  id="reg-terms"
                  label={
                    <span className="text-xs text-slate-700">
                      I have read and accept the{" "}
                      <Link href="/terms" className="text-[var(--color-secondary)] hover:underline font-bold">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[var(--color-secondary)] hover:underline font-bold">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  }
                  checked={acceptCitizenTerms}
                  onChange={(e) => setAcceptCitizenTerms(e.target.checked)}
                  required
                  error={showErrors && !acceptCitizenTerms}
                  errorMessage={showErrors && !acceptCitizenTerms ? "You must accept the Terms." : undefined}
                />
                <FormCheckbox
                  id="reg-notifications"
                  label={<span className="text-xs text-slate-600">I wish to receive pickup schedule notifications and circulars via SMS & Email.</span>}
                  checked={receiveNotifications}
                  onChange={(e) => setReceiveNotifications(e.target.checked)}
                />
              </fieldset>

              {/* Full Width Submit Button */}
              <button
                type="submit"
                id="register-submit-btn"
                disabled={isSubmitting}
                className="w-full h-[52px] flex items-center justify-center gap-2 px-6 text-base font-extrabold rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] active:scale-[0.99] transition-all duration-150 cursor-pointer shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Creating Citizen Account...</span>
                ) : (
                  <>
                    Create Citizen Account
                    <MdArrowForward className="w-5 h-5" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-500 font-medium">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)]">
                  Sign In
                </Link>
              </p>
            </form>
          ) : (
            /* ── VERIFIED RECYCLER (BUYER) REGISTRATION FORM ──────────────────── */
            <form
              noValidate
              onSubmit={handleRecyclerSubmit}
              aria-label="Verified Recycler registration form"
              className="flex flex-col gap-6"
            >
              {/* 1. Business Info */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-slate-200 w-full flex items-center gap-1.5">
                  <MdStorefront className="w-4 h-4" />
                  1. Business & Owner Information
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    id="rec-shopname"
                    label="Shop / Facility Name"
                    placeholder="e.g. EcoRecycle India Pvt Ltd"
                    value={recyclerData.shopName}
                    onChange={updateRecycler("shopName") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    inputClassName={inputHeightStyle}
                    state={showErrors && !recyclerData.shopName ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.shopName ? "Shop name is required." : undefined}
                    prefix={<MdStorefront className="w-4 h-4 text-slate-400" />}
                  />
                  <FormInput
                    id="rec-ownername"
                    label="Owner / Authorized Person Name"
                    placeholder="Full name as per Aadhaar"
                    value={recyclerData.ownerName}
                    onChange={updateRecycler("ownerName") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    inputClassName={inputHeightStyle}
                    state={showErrors && !recyclerData.ownerName ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.ownerName ? "Owner name is required." : undefined}
                    prefix={<MdPerson className="w-4 h-4 text-slate-400" />}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    id="rec-email"
                    label="Email Address"
                    type="email"
                    placeholder="facility@domain.com"
                    value={recyclerData.email}
                    onChange={updateRecycler("email") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    inputClassName={inputHeightStyle}
                    state={showErrors && (!recyclerData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recyclerData.email)) ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.email ? "Email address is required." : showErrors && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recyclerData.email) ? "Invalid email." : undefined}
                    prefix={<MdEmail className="w-4 h-4 text-slate-400" />}
                  />
                  <FormInput
                    id="rec-mobile"
                    label="Mobile Number"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={recyclerData.mobile}
                    onChange={updateRecycler("mobile") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    maxLength={10}
                    inputClassName={inputHeightStyle}
                    state={showErrors && (!recyclerData.mobile || !/^[6-9]\d{9}$/.test(recyclerData.mobile)) ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.mobile ? "Mobile is required." : showErrors && !/^[6-9]\d{9}$/.test(recyclerData.mobile) ? "Invalid 10-digit mobile." : undefined}
                    prefix={<MdPhone className="w-4 h-4 text-slate-400" />}
                    suffix={<span className="text-xs font-bold text-slate-500">+91</span>}
                  />
                </div>
              </fieldset>

              {/* 2. Aadhaar Verification */}
              <fieldset className="flex flex-col gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] pb-1 w-full flex items-center gap-1.5">
                  <MdVerifiedUser className="w-4 h-4 text-[var(--color-primary)]" />
                  2. Government Verification (Aadhaar OTP)
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div className="md:col-span-2">
                    <FormInput
                      id="rec-aadhaar"
                      label="Aadhaar Number"
                      type="text"
                      placeholder="12-digit Aadhaar number"
                      maxLength={12}
                      value={recyclerData.aadhaarNumber}
                      onChange={updateRecycler("aadhaarNumber") as React.ChangeEventHandler<HTMLInputElement>}
                      required
                      inputClassName={inputHeightStyle}
                      state={showErrors && (!recyclerData.aadhaarNumber || !/^\d{12}$/.test(recyclerData.aadhaarNumber)) ? "error" : "default"}
                      errorMessage={showErrors && !recyclerData.aadhaarNumber ? "Aadhaar number is required." : showErrors && !/^\d{12}$/.test(recyclerData.aadhaarNumber) ? "Must be 12 digits." : undefined}
                      prefix={<MdFingerprint className="w-4 h-4 text-slate-400" />}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpTimer > 0 || otpVerified}
                    className="h-[52px] px-5 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-60 cursor-pointer shadow-sm"
                  >
                    {otpVerified ? "Verified ✓" : otpTimer > 0 ? `Resend (${otpTimer}s)` : "Send OTP"}
                  </button>
                </div>

                {otpSent && !otpVerified && (
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                    <FormInput
                      id="rec-otp"
                      label="Enter OTP"
                      placeholder="6-digit OTP"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      maxLength={6}
                      inputClassName={inputHeightStyle}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="mt-6 h-[52px] px-5 text-xs font-bold rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] cursor-pointer"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}

                {otpVerified && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <MdCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    Aadhaar OTP Verified Successfully (CPCB Identity Authenticated)
                  </div>
                )}
              </fieldset>

              {/* 3. Shop Details */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-slate-200 w-full flex items-center gap-1.5">
                  <MdHome className="w-4 h-4" />
                  3. Shop / Facility Details
                </legend>

                <FormInput
                  id="rec-shopaddress"
                  label="Shop Street Address"
                  placeholder="Plot / Premises No., Industrial Estate, Road"
                  value={recyclerData.shopAddress}
                  onChange={updateRecycler("shopAddress") as React.ChangeEventHandler<HTMLInputElement>}
                  required
                  inputClassName={inputHeightStyle}
                  state={showErrors && !recyclerData.shopAddress ? "error" : "default"}
                  errorMessage={showErrors && !recyclerData.shopAddress ? "Shop address is required." : undefined}
                  prefix={<MdHome className="w-4 h-4 text-slate-400" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormInput
                    id="rec-city"
                    label="City / Town"
                    placeholder="e.g. Salem"
                    value={recyclerData.city}
                    onChange={updateRecycler("city") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    inputClassName={inputHeightStyle}
                    state={showErrors && !recyclerData.city ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.city ? "City is required." : undefined}
                    prefix={<MdLocationCity className="w-4 h-4 text-slate-400" />}
                  />
                  <FormInput
                    id="rec-district"
                    label="District"
                    placeholder="e.g. Salem District"
                    value={recyclerData.district}
                    onChange={updateRecycler("district") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    inputClassName={inputHeightStyle}
                    state={showErrors && !recyclerData.district ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.district ? "District is required." : undefined}
                  />
                  <FormSelect
                    id="rec-state"
                    label="State / UT"
                    options={INDIAN_STATES}
                    value={recyclerData.state}
                    onChange={updateRecycler("state") as React.ChangeEventHandler<HTMLSelectElement>}
                    required
                    placeholder="Select State"
                    selectClassName={inputHeightStyle}
                    state={showErrors && !recyclerData.state ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.state ? "Select state." : undefined}
                  />
                  <FormInput
                    id="rec-pincode"
                    label="Pincode"
                    type="text"
                    placeholder="6-digit Pincode"
                    maxLength={6}
                    value={recyclerData.pincode}
                    onChange={updateRecycler("pincode") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    inputClassName={inputHeightStyle}
                    state={showErrors && (!recyclerData.pincode || !/^\d{6}$/.test(recyclerData.pincode)) ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.pincode ? "Pincode required." : showErrors && !/^\d{6}$/.test(recyclerData.pincode) ? "Must be 6 digits." : undefined}
                  />
                </div>
              </fieldset>

              {/* 4. Geolocation */}
              <fieldset className="flex flex-col gap-4 bg-blue-50/70 p-4 rounded-xl border border-blue-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-1.5">
                      <MdMyLocation className="w-4 h-4" />
                      4. Geolocation Coordinates
                    </legend>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Required for government GIS routing and doorstep pickup assignment.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isDetectingLocation}
                    className="h-10 px-4 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] cursor-pointer shrink-0 shadow-sm"
                  >
                    <MdMyLocation className="w-4 h-4 inline mr-1" />
                    {isDetectingLocation ? "Detecting GPS..." : "Detect Live Shop Location"}
                  </button>
                </div>

                {locationSuccess && (
                  <div className="text-xs font-bold text-emerald-800 bg-white p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                    <MdCheckCircle className="w-4 h-4 text-emerald-600" />
                    Live location captured successfully!
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    id="rec-lat"
                    label="Latitude"
                    placeholder="e.g. 11.6643"
                    value={recyclerData.latitude}
                    onChange={updateRecycler("latitude") as React.ChangeEventHandler<HTMLInputElement>}
                    inputClassName={inputHeightStyle}
                  />
                  <FormInput
                    id="rec-lng"
                    label="Longitude"
                    placeholder="e.g. 78.1460"
                    value={recyclerData.longitude}
                    onChange={updateRecycler("longitude") as React.ChangeEventHandler<HTMLInputElement>}
                    inputClassName={inputHeightStyle}
                  />
                </div>
              </fieldset>

              {/* 5. Business Type */}
              <fieldset className="flex flex-col gap-3">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-slate-200 w-full">
                  5. Business Type *
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { type: "Recycler", desc: "CPCB Licensed Dismantler & Recycler" },
                    { type: "Scrap Dealer", desc: "Local Authorized E-Waste Collector" },
                    { type: "Collection Centre", desc: "Government Regional Aggregator" },
                  ].map((b) => (
                    <label
                      key={b.type}
                      className={cn(
                        "flex flex-col p-3 rounded-xl border cursor-pointer transition-all",
                        recyclerData.businessType === b.type
                          ? "border-[var(--color-primary)] bg-blue-50/50 ring-2 ring-[var(--color-primary)]/20"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="businessType"
                          value={b.type}
                          checked={recyclerData.businessType === b.type}
                          onChange={() => setRecyclerData((prev) => ({ ...prev, businessType: b.type }))}
                          className="text-[var(--color-primary)]"
                        />
                        <span className="text-xs font-bold text-slate-900">{b.type}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1">{b.desc}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 6. Accepted E-Waste */}
              <fieldset className="flex flex-col gap-3">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-slate-200 w-full">
                  6. Accepted E-Waste Categories *
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {E_WASTE_CATEGORIES.map((cat) => {
                    const checked = acceptedEWaste.includes(cat);
                    return (
                      <label
                        key={cat}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all",
                          checked
                            ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(cat)}
                          className="rounded text-emerald-600"
                        />
                        <span>{cat}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* 7. Document Upload */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-slate-200 w-full flex items-center gap-1.5">
                  <MdCloudUpload className="w-4 h-4" />
                  7. Document Upload (Verification Proofs)
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { key: "shopPhoto", label: "Shop Photo", placeholder: "Upload store front image" },
                    { key: "shopLicense", label: "Shop License / Trade Cert", placeholder: "CPCB / Municipal License PDF" },
                    { key: "ownerIdProof", label: "Owner ID Proof", placeholder: "Aadhaar / PAN / Voter ID" },
                  ].map((doc) => (
                    <div key={doc.key} className="flex flex-col gap-1.5 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-100 transition-colors">
                      <span className="text-xs font-bold text-slate-800">{doc.label}</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setDocuments((prev) => ({ ...prev, [doc.key]: file.name }));
                          }
                        }}
                        className="text-[11px] text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--color-primary)] file:text-white hover:file:bg-[var(--color-primary-dark)] cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-500 truncate">
                        {documents[doc.key as keyof typeof documents] || doc.placeholder}
                      </span>
                    </div>
                  ))}
                </div>
              </fieldset>

              {/* 8. Security Credentials */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-slate-200 w-full">
                  8. Security Credentials
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <PasswordInput
                    id="rec-password"
                    label="Password"
                    placeholder="Create a strong password"
                    value={recyclerData.password}
                    onChange={updateRecycler("password") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    showStrengthMeter
                    inputClassName={inputHeightStyle}
                    state={showErrors && (!recyclerData.password || recyclerData.password.length < 8) ? "error" : "default"}
                    errorMessage={showErrors && !recyclerData.password ? "Password is required." : showErrors && recyclerData.password.length < 8 ? "Min. 8 characters required." : undefined}
                  />
                  <PasswordInput
                    id="rec-confirm-password"
                    label="Confirm Password"
                    placeholder="Re-enter password"
                    value={recyclerData.confirmPassword}
                    onChange={updateRecycler("confirmPassword") as React.ChangeEventHandler<HTMLInputElement>}
                    required
                    inputClassName={inputHeightStyle}
                    state={showErrors && recyclerData.password !== recyclerData.confirmPassword ? "error" : recyclerData.confirmPassword && recyclerData.password === recyclerData.confirmPassword ? "success" : "default"}
                    errorMessage={showErrors && recyclerData.password !== recyclerData.confirmPassword ? "Passwords do not match." : undefined}
                    successMessage={recyclerData.confirmPassword && recyclerData.password === recyclerData.confirmPassword ? "Passwords match." : undefined}
                  />
                </div>
              </fieldset>

              {/* 9. Agreement */}
              <fieldset className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                <FormCheckbox
                  id="rec-terms"
                  label={
                    <span className="text-xs font-semibold text-slate-800">
                      I agree to EcoRoute Terms and Government E-Waste Rules (E-Waste Management Rules, 2022).
                    </span>
                  }
                  checked={acceptRecyclerTerms}
                  onChange={(e) => setAcceptRecyclerTerms(e.target.checked)}
                  required
                  error={showErrors && !acceptRecyclerTerms}
                  errorMessage={showErrors && !acceptRecyclerTerms ? "You must agree to EcoRoute Terms and Government Rules." : undefined}
                />
              </fieldset>

              {/* Full Width Submit Button */}
              <button
                type="submit"
                id="register-recycler-submit-btn"
                disabled={isSubmitting}
                className="w-full h-[52px] flex items-center justify-center gap-2 px-6 text-base font-extrabold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.99] transition-all duration-150 cursor-pointer shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Registering Recycler Facility...</span>
                ) : (
                  <>
                    Register as Verified Recycler
                    <MdArrowForward className="w-5 h-5" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-500 font-medium">
                Already registered as a Recycler?{" "}
                <Link href="/login?role=recycler" className="font-bold text-[var(--color-primary)] hover:underline">
                  Sign In to Recycler Portal
                </Link>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-slate-500">Loading EcoRoute Registration...</div>}>
        <RegisterContent />
      </Suspense>
    </motion.div>
  );
}
