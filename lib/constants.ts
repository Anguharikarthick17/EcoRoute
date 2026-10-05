// ============================================================
// EcoRoute — Application Constants (AI Scrap Marketplace)
// ============================================================

import type { NavItem, FooterSection, SocialLink, Language } from "@/types";

// ── Platform Information ─────────────────────────────────────
export const PLATFORM_INFO = {
  name: "EcoRoute",
  fullName: "EcoRoute — AI-Powered Scrap Marketplace",
  tagline: "Turn Your Scrap Into Value.",
  subtitle: "Connect with nearby scrap dealers, get AI-powered scrap identification and price estimation, and arrange convenient pickup from your home.",
  email: "support@ecoroute.market",
  phone: "+91 98765 43210",
  address: "Tech Park Avenue, Coimbatore, Tamil Nadu - 641021",
  copyright: `© ${new Date().getFullYear()} EcoRoute Technologies. All Rights Reserved.`,
  lastUpdated: "August 2026",
  version: "2.0.0",
} as const;

// Backward-compatible alias for existing imports
export const GOV_INFO = {
  portalName: PLATFORM_INFO.name,
  portalFullName: PLATFORM_INFO.fullName,
  ministry: "AI-Powered Circular Economy Platform",
  ministryShort: "EcoRoute Market",
  government: "Smart Scrap Trading Network",
  department: "Local Scrap Dealer Network",
  helpline: "+91 98765 43210",
  helplineLabel: "Marketplace Support",
  email: PLATFORM_INFO.email,
  address: PLATFORM_INFO.address,
  copyright: PLATFORM_INFO.copyright,
  lastUpdated: PLATFORM_INFO.lastUpdated,
  version: PLATFORM_INFO.version,
} as const;

// ── Scrap Categories Supported ───────────────────────────────
export const SCRAP_CATEGORIES = [
  "Metal",
  "Aluminium",
  "Copper",
  "Brass",
  "Iron",
  "Paper",
  "Cardboard",
  "Plastic",
  "E-Waste",
  "Batteries",
  "Cables & Wires",
  "Appliances",
  "Other Recyclable Scrap",
] as const;

// ── Navigation Items ─────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Marketplace", href: "/buyer", sectionId: "marketplace" },
  { label: "How It Works", href: "/#how-it-works", sectionId: "how-it-works" },
  { label: "Sell Scrap", href: "/dashboard/upload", sectionId: undefined },
  { label: "Find Dealers", href: "/locate", sectionId: undefined },
  { label: "About", href: "/about", sectionId: "about" },
];

// ── Footer Sections ──────────────────────────────────────────
export const FOOTER_SECTIONS: FooterSection[] = [
  {
    heading: "Marketplace",
    links: [
      { label: "Browse Scrap Listings", href: "/buyer" },
      { label: "Sell Your Scrap", href: "/dashboard/upload" },
      { label: "AI Scrap Vision Tool", href: "/dashboard/upload" },
      { label: "Find Nearby Dealers", href: "/locate" },
      { label: "Live Scrap Market Rates", href: "/#rates" },
    ],
  },
  {
    heading: "For Households & Dealers",
    links: [
      { label: "Household / Seller Guide", href: "/about" },
      { label: "Join as Scrap Dealer", href: "/register?role=recycler" },
      { label: "Schedule Doorstep Pickup", href: "/pickup" },
      { label: "Green Coins Rewards", href: "/dashboard/rewards" },
      { label: "AI Route Optimization", href: "/buyer" },
    ],
  },
  {
    heading: "Company & Trust",
    links: [
      { label: "About EcoRoute", href: "/about" },
      { label: "Review 2 Research Portfolio", href: "/research" },
      { label: "Field Research Story", href: "/#field-research" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Support", href: "/contact" },
    ],
  },
];

// ── Social Media Links ───────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Twitter / X", href: "https://twitter.com/ecoroute_market", icon: "FaXTwitter" },
  { label: "Facebook", href: "https://facebook.com/ecoroutemarket", icon: "FaFacebook" },
  { label: "YouTube", href: "https://youtube.com/@ecoroutemarket", icon: "FaYoutube" },
  { label: "LinkedIn", href: "https://linkedin.com/company/ecoroute-market", icon: "FaLinkedin" },
  { label: "Instagram", href: "https://instagram.com/ecoroute_market", icon: "FaInstagram" },
];

// ── Supported Languages ──────────────────────────────────────
export const LANGUAGES: Language[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
];

// ── Routes ───────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  MARKETPLACE: "/buyer",
  ABOUT: "/about",
  SERVICES: "/services",
  LOCATE: "/locate",
  PICKUP: "/pickup",
  AWARENESS: "/awareness",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  HELP: "/dashboard/help",
  ACCESSIBILITY: "/accessibility",
} as const;

