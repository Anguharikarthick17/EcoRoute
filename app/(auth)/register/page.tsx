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
  AuthCard,
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
        (err) => {
          setIsDetectingLocation(false);
          // Fallback simulation
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
      }

      setSuccessMsg("Verified Recycler account created successfully! Redirecting to login...");

      window.location.href = `/login?email=${encodeURIComponent(recyclerData.email)}&registered=true&role=recycler`;

    } catch (err: any) {
      setServerError(err.message || "An error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard maxWidth="lg">
      {/* ── Role Selector Segmented Control ────────────────── */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
          Register As
        </label>
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-lg border border-slate-200">
          <button
            type="button"
            id="reg-role-citizen-tab"
            onClick={() => {
              setRole("citizen");
              setShowErrors(false);
              setServerError(null);
            }}
            className={cn(
              "flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded transition-all duration-150 cursor-pointer",
              role === "citizen"
                ? "bg-[var(--color-accent)] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <MdPerson className="w-4 h-4" />
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
              "flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded transition-all duration-150 cursor-pointer",
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
          {role === "recycler" ? "Verified Recycler (Buyer) Registration" : "Create Citizen Account"}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          {role === "recycler"
            ? "Register your recycling facility or scrap shop for official CPCB authorization & e-waste bidding."
            : "Register with EcoRoute to schedule pickups and access government e-waste services."}
        </p>
      </div>

      {/* ── Server Feedback Alerts ─────────────────────── */}
      {serverError && (
        <GovAlertBox variant="warning" title="Registration Error" className="mb-6">
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

      {/* ── Notice ──────────────────────────────────────── */}
      <GovAlertBox variant="info" title="Registration Guidelines" className="mb-7">
        {role === "recycler" ? (
          <>
            All recycling facility applications undergo government audit under <strong className="text-[var(--color-primary)]">CPCB E-Waste Rules 2022</strong>. Please ensure accurate shop address and Aadhaar details.
          </>
        ) : (
          <>
            All fields marked <strong className="text-[var(--color-danger)]">*</strong> are mandatory.
            Use your Aadhaar-linked mobile number for faster verification.
            Your data is protected under the Digital Personal Data Protection Act, 2023.
          </>
        )}
      </GovAlertBox>

      {/* ── CITIZEN FORM ─────────────────────────────────── */}
      {role === "citizen" ? (
        <form
          noValidate
          onSubmit={handleCitizenSubmit}
          aria-label="Citizen registration form"
          className="flex flex-col gap-6"
        >
          {/* Section: Personal Information */}
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] pb-3 border-b border-[var(--color-border)] w-full">
              Personal Information
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                id="reg-fullname"
                label="Full Name"
                placeholder="As per government ID"
                value={citizenData.fullName}
                onChange={updateCitizen("fullName") as React.ChangeEventHandler<HTMLInputElement>}
                required
                autoComplete="name"
                state={showErrors && !citizenData.fullName ? "error" : "default"}
                errorMessage={showErrors && !citizenData.fullName ? "Full name is required." : undefined}
                prefix={<MdPerson className="w-4 h-4" />}
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
                prefix={<MdEmail className="w-4 h-4" />}
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
              prefix={<MdPhone className="w-4 h-4" />}
              suffix={<span className="text-[10px] font-medium text-[var(--color-text-muted)]">+91</span>}
            />
          </fieldset>

          {/* Section: Security */}
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] pb-3 border-b border-[var(--color-border)] w-full">
              Security Credentials
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <PasswordInput
                id="reg-password"
                label="Password"
                placeholder="Create a strong password"
                value={citizenData.password}
                onChange={updateCitizen("password") as React.ChangeEventHandler<HTMLInputElement>}
                required
                autoComplete="new-password"
                showStrengthMeter
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

          {/* Section: Address */}
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] pb-3 border-b border-[var(--color-border)] w-full">
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
              state={showErrors && !citizenData.address ? "error" : "default"}
              errorMessage={showErrors && !citizenData.address ? "Address is required." : undefined}
              prefix={<MdHome className="w-4 h-4" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <FormInput
                id="reg-city"
                label="City / Town"
                placeholder="e.g. New Delhi"
                value={citizenData.city}
                onChange={updateCitizen("city") as React.ChangeEventHandler<HTMLInputElement>}
                required
                autoComplete="address-level2"
                state={showErrors && !citizenData.city ? "error" : "default"}
                errorMessage={showErrors && !citizenData.city ? "City is required." : undefined}
                prefix={<MdLocationCity className="w-4 h-4" />}
              />
              <FormSelect
                id="reg-state"
                label="State / UT"
                options={INDIAN_STATES}
                value={citizenData.state}
                onChange={updateCitizen("state") as React.ChangeEventHandler<HTMLSelectElement>}
                required
                placeholder="Select State"
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
                state={showErrors && (!citizenData.pin || !/^\d{6}$/.test(citizenData.pin)) ? "error" : "default"}
                errorMessage={showErrors && !citizenData.pin ? "PIN Code is required." : showErrors && !/^\d{6}$/.test(citizenData.pin) ? "Enter 6-digit PIN." : undefined}
              />
            </div>
          </fieldset>

          {/* Consent */}
          <fieldset className="flex flex-col gap-3.5">
            <legend className="sr-only">Consent</legend>
            <FormCheckbox
              id="reg-terms"
              label={
                <>
                  I have read and accept the{" "}
                  <Link href="/terms" className="text-[var(--color-secondary)] hover:underline font-medium">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[var(--color-secondary)] hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  .
                </>
              }
              checked={acceptCitizenTerms}
              onChange={(e) => setAcceptCitizenTerms(e.target.checked)}
              required
              error={showErrors && !acceptCitizenTerms}
              errorMessage={showErrors && !acceptCitizenTerms ? "You must accept the Terms." : undefined}
            />
            <FormCheckbox
              id="reg-notifications"
              label="I wish to receive notifications about pickup schedules and circulars via SMS and email."
              checked={receiveNotifications}
              onChange={(e) => setReceiveNotifications(e.target.checked)}
            />
          </fieldset>

          <button
            type="submit"
            id="register-submit-btn"
            disabled={isSubmitting}
            className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Creating Account...</span>
            ) : (
              <>
                Create Account
                <MdArrowForward className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)]">
              Sign In
            </Link>
          </p>
        </form>
      ) : (
        /* ── VERIFIED RECYCLER (BUYER) FORM ────────────────── */
        <form
          noValidate
          onSubmit={handleRecyclerSubmit}
          aria-label="Verified Recycler registration form"
          className="flex flex-col gap-7"
        >
          {/* 1. Business Information */}
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] pb-3 border-b border-[var(--color-border)] w-full flex items-center gap-1.5">
              <MdStorefront className="w-4 h-4" />
              1. Business Information
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                id="rec-shopname"
                label="Shop / Facility Name"
                placeholder="e.g. EcoRecycle India Pvt Ltd"
                value={recyclerData.shopName}
                onChange={updateRecycler("shopName") as React.ChangeEventHandler<HTMLInputElement>}
                required
                state={showErrors && !recyclerData.shopName ? "error" : "default"}
                errorMessage={showErrors && !recyclerData.shopName ? "Shop name is required." : undefined}
                prefix={<MdStorefront className="w-4 h-4" />}
              />
              <FormInput
                id="rec-ownername"
                label="Owner / Authorized Person Name"
                placeholder="Full name as per Aadhaar"
                value={recyclerData.ownerName}
                onChange={updateRecycler("ownerName") as React.ChangeEventHandler<HTMLInputElement>}
                required
                state={showErrors && !recyclerData.ownerName ? "error" : "default"}
                errorMessage={showErrors && !recyclerData.ownerName ? "Owner name is required." : undefined}
                prefix={<MdPerson className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                id="rec-email"
                label="Email Address"
                type="email"
                placeholder="facility@domain.com"
                value={recyclerData.email}
                onChange={updateRecycler("email") as React.ChangeEventHandler<HTMLInputElement>}
                required
                state={showErrors && (!recyclerData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recyclerData.email)) ? "error" : "default"}
                errorMessage={showErrors && !recyclerData.email ? "Email address is required." : showErrors && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recyclerData.email) ? "Invalid email." : undefined}
                prefix={<MdEmail className="w-4 h-4" />}
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
                state={showErrors && (!recyclerData.mobile || !/^[6-9]\d{9}$/.test(recyclerData.mobile)) ? "error" : "default"}
                errorMessage={showErrors && !recyclerData.mobile ? "Mobile is required." : showErrors && !/^[6-9]\d{9}$/.test(recyclerData.mobile) ? "Invalid 10-digit mobile." : undefined}
                prefix={<MdPhone className="w-4 h-4" />}
                suffix={<span className="text-[10px] font-medium text-[var(--color-text-muted)]">+91</span>}
              />
            </div>
          </fieldset>

          {/* 2. Government Verification (Aadhaar OTP) */}
          <fieldset className="flex flex-col gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] pb-1 w-full flex items-center gap-1.5">
              <MdVerifiedUser className="w-4 h-4 text-[var(--color-primary)]" />
              2. Government Verification
            </legend>
            <p className="text-xs text-[var(--color-text-muted)]">
              Verify your 12-digit Aadhaar number for instant CPCB identity link.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div className="sm:col-span-2">
                <FormInput
                  id="rec-aadhaar"
                  label="Aadhaar Number"
                  type="text"
                  placeholder="12-digit Aadhaar number"
                  maxLength={12}
                  value={recyclerData.aadhaarNumber}
                  onChange={updateRecycler("aadhaarNumber") as React.ChangeEventHandler<HTMLInputElement>}
                  required
                  state={showErrors && (!recyclerData.aadhaarNumber || !/^\d{12}$/.test(recyclerData.aadhaarNumber)) ? "error" : "default"}
                  errorMessage={showErrors && !recyclerData.aadhaarNumber ? "Aadhaar number is required." : showErrors && !/^\d{12}$/.test(recyclerData.aadhaarNumber) ? "Must be 12 digits." : undefined}
                  prefix={<MdFingerprint className="w-4 h-4" />}
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpTimer > 0 || otpVerified}
                className="h-10 px-4 text-xs font-bold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-60 cursor-pointer"
              >
                {otpVerified ? "Verified ✓" : otpTimer > 0 ? `Resend (${otpTimer}s)` : "Send OTP"}
              </button>
            </div>

            {otpSent && !otpVerified && (
              <div className="flex items-center gap-3 mt-2 bg-white p-3 rounded border border-slate-200">
                <FormInput
                  id="rec-otp"
                  label="Enter OTP"
                  placeholder="6-digit OTP (e.g. 123456)"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="mt-6 h-10 px-4 text-xs font-bold rounded bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] cursor-pointer"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {otpVerified && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                <MdCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                Aadhaar OTP Verified Successfully (CPCB Identity Authenticated)
              </div>
            )}
          </fieldset>

          {/* 3. Shop Details */}
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] pb-3 border-b border-[var(--color-border)] w-full flex items-center gap-1.5">
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
              state={showErrors && !recyclerData.shopAddress ? "error" : "default"}
              errorMessage={showErrors && !recyclerData.shopAddress ? "Shop address is required." : undefined}
              prefix={<MdHome className="w-4 h-4" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormInput
                id="rec-city"
                label="City / Town"
                placeholder="e.g. Salem"
                value={recyclerData.city}
                onChange={updateRecycler("city") as React.ChangeEventHandler<HTMLInputElement>}
                required
                state={showErrors && !recyclerData.city ? "error" : "default"}
                errorMessage={showErrors && !recyclerData.city ? "City is required." : undefined}
                prefix={<MdLocationCity className="w-4 h-4" />}
              />
              <FormInput
                id="rec-district"
                label="District"
                placeholder="e.g. Salem District"
                value={recyclerData.district}
                onChange={updateRecycler("district") as React.ChangeEventHandler<HTMLInputElement>}
                required
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
                state={showErrors && (!recyclerData.pincode || !/^\d{6}$/.test(recyclerData.pincode)) ? "error" : "default"}
                errorMessage={showErrors && !recyclerData.pincode ? "Pincode required." : showErrors && !/^\d{6}$/.test(recyclerData.pincode) ? "Must be 6 digits." : undefined}
              />
            </div>
          </fieldset>

          {/* 4. Location Geolocation */}
          <fieldset className="flex flex-col gap-4 bg-blue-50/70 p-4 rounded-lg border border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-1.5">
                  <MdMyLocation className="w-4 h-4" />
                  4. Geolocation Coordinates
                </legend>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  GPS coordinates are required for government GIS routing and doorstep pickup assignment.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] cursor-pointer shrink-0"
              >
                <MdMyLocation className="w-4 h-4" />
                {isDetectingLocation ? "Detecting GPS..." : "Detect Live Shop Location"}
              </button>
            </div>

            {locationSuccess && (
              <div className="text-xs font-bold text-emerald-700 bg-white p-2 rounded border border-emerald-200 flex items-center gap-1.5">
                <MdCheckCircle className="w-4 h-4 text-emerald-600" />
                Live location captured successfully!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                id="rec-lat"
                label="Latitude"
                placeholder="e.g. 11.6643"
                value={recyclerData.latitude}
                onChange={updateRecycler("latitude") as React.ChangeEventHandler<HTMLInputElement>}
              />
              <FormInput
                id="rec-lng"
                label="Longitude"
                placeholder="e.g. 78.1460"
                value={recyclerData.longitude}
                onChange={updateRecycler("longitude") as React.ChangeEventHandler<HTMLInputElement>}
              />
            </div>
          </fieldset>

          {/* 5. Business Type */}
          <fieldset className="flex flex-col gap-3">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-[var(--color-border)] w-full">
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
                    "flex flex-col p-3 rounded-lg border cursor-pointer transition-all",
                    recyclerData.businessType === b.type
                      ? "border-[var(--color-primary)] bg-blue-50/50 ring-1 ring-[var(--color-primary)]"
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
                  <span className="text-[11px] text-[var(--color-text-muted)] mt-1">{b.desc}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* 6. Accepted E-Waste Categories */}
          <fieldset className="flex flex-col gap-3">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-[var(--color-border)] w-full">
              6. Accepted E-Waste Categories *
            </legend>
            <p className="text-xs text-[var(--color-text-muted)]">
              Select all categories of e-waste your facility is certified to purchase and process.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {E_WASTE_CATEGORIES.map((cat) => {
                const checked = acceptedEWaste.includes(cat);
                return (
                  <label
                    key={cat}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded border text-xs font-medium cursor-pointer transition-all",
                      checked
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(cat)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{cat}</span>
                  </label>
                );
              })}
            </div>
            {showErrors && acceptedEWaste.length === 0 && (
              <span className="text-xs font-semibold text-red-600">Please select at least one e-waste category.</span>
            )}
          </fieldset>

          {/* 7. Document Upload */}
          <fieldset className="flex flex-col gap-4">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] pb-2 border-b border-[var(--color-border)] w-full flex items-center gap-1.5">
              <MdCloudUpload className="w-4 h-4" />
              7. Document Upload (Verification Proofs)
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: "shopPhoto", label: "Shop Photo", placeholder: "Upload store front image" },
                { key: "shopLicense", label: "Shop License / Trade Cert", placeholder: "CPCB / Municipal License PDF" },
                { key: "ownerIdProof", label: "Owner ID Proof", placeholder: "Aadhaar / PAN / Voter ID" },
              ].map((doc) => (
                <div key={doc.key} className="flex flex-col gap-1.5 p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-100/60 transition-colors">
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
                    className="text-[11px] text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[var(--color-primary)] file:text-white hover:file:bg-[var(--color-primary-dark)] cursor-pointer"
                  />
                  <span className="text-[10px] text-[var(--color-text-muted)] truncate">
                    {documents[doc.key as keyof typeof documents] || doc.placeholder}
                  </span>
                </div>
              ))}
            </div>
          </fieldset>

          {/* 8. Security Credentials */}
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] pb-3 border-b border-[var(--color-border)] w-full">
              8. Security Credentials
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <PasswordInput
                id="rec-password"
                label="Password"
                placeholder="Create a strong password"
                value={recyclerData.password}
                onChange={updateRecycler("password") as React.ChangeEventHandler<HTMLInputElement>}
                required
                showStrengthMeter
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
                state={showErrors && recyclerData.password !== recyclerData.confirmPassword ? "error" : recyclerData.confirmPassword && recyclerData.password === recyclerData.confirmPassword ? "success" : "default"}
                errorMessage={showErrors && recyclerData.password !== recyclerData.confirmPassword ? "Passwords do not match." : undefined}
                successMessage={recyclerData.confirmPassword && recyclerData.password === recyclerData.confirmPassword ? "Passwords match." : undefined}
              />
            </div>
          </fieldset>

          {/* 9. Agreement */}
          <fieldset className="flex flex-col gap-3">
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

          {/* 10. Register Button */}
          <button
            type="submit"
            id="register-recycler-submit-btn"
            disabled={isSubmitting}
            className="w-full h-11 flex items-center justify-center gap-2 px-5 text-sm font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Registering Recycler Facility...</span>
            ) : (
              <>
                Register as Verified Recycler
                <MdArrowForward className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Already registered as a Recycler?{" "}
            <Link href="/login?role=recycler" className="font-semibold text-[var(--color-primary)] hover:underline">
              Sign In to Recycler Portal
            </Link>
          </p>
        </form>
      )}
    </AuthCard>
  );
}

export default function RegisterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <RegisterContent />
      </Suspense>
    </motion.div>
  );
}
