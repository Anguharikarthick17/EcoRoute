// ============================================================
// EcoRoute — Application Constants
// ============================================================

import type { NavItem, FooterSection, SocialLink, Language } from "@/types";

// ── Government Information ───────────────────────────────────
export const GOV_INFO = {
  portalName: "EcoRoute",
  portalFullName: "EcoRoute — AI-Powered E-Waste Management Portal",
  ministry: "Ministry of Environment, Forest and Climate Change",
  ministryShort: "MoEFCC",
  government: "Government of India",
  department: "Central Pollution Control Board (CPCB)",
  helpline: "1800-200-7911",
  helplineLabel: "Toll Free Helpline",
  email: "anguharikarthick@gmail.com",
  address: "Rathinam Technical Campus, Eachanari, Coimbatore, Tamil Nadu - 641021",
  copyright: `© ${new Date().getFullYear()} EcoRoute. Government of India. All Rights Reserved.`,
  lastUpdated: "31 July 2026",
  version: "1.0.0",
} as const;

// ── Navigation Items ─────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "About", href: "/about", sectionId: "about" },
  { label: "Locate Centre", href: "/locate-centre", sectionId: "locate-centre" },
  { label: "Pickup", href: "/pickup", sectionId: "pickup" },
  { label: "Contact", href: "/contact", sectionId: "contact" },
];

// ── Footer Sections ──────────────────────────────────────────
export const FOOTER_SECTIONS: FooterSection[] = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About EcoRoute", href: "/about" },
      { label: "Locate Centre", href: "/locate-centre" },
      { label: "Schedule Pickup", href: "/pickup" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Citizen Services",
    links: [
      { label: "Register as Producer", href: "/services/producer" },
      { label: "Register as Collector", href: "/services/collector" },
      { label: "Track Your Request", href: "/services/track" },
      { label: "E-Waste Certificate", href: "/services/certificate" },
      { label: "Report Illegal Dumping", href: "/services/report" },
      { label: "Download Reports", href: "/services/reports" },
    ],
  },
  {
    heading: "Policies & Help",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Accessibility Statement", href: "/accessibility" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Help & Support", href: "/help" },
      { label: "RTI Information", href: "/rti" },
    ],
  },
];

// ── Social Media Links ───────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Twitter / X", href: "https://twitter.com/ecoroute_india", icon: "FaXTwitter" },
  { label: "Facebook", href: "https://facebook.com/ecorouteindia", icon: "FaFacebook" },
  { label: "YouTube", href: "https://youtube.com/@ecorouteindia", icon: "FaYoutube" },
  { label: "LinkedIn", href: "https://linkedin.com/company/ecoroute-india", icon: "FaLinkedin" },
  { label: "Instagram", href: "https://instagram.com/ecoroute_india", icon: "FaInstagram" },
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
  HELP: "/help",
  ACCESSIBILITY: "/accessibility",
} as const;

// ── Government External Links ────────────────────────────────
export const GOV_LINKS = {
  digitalIndia: "https://www.digitalindia.gov.in",
  myGov: "https://www.mygov.in",
  cpcb: "https://cpcb.nic.in",
  moefcc: "https://moef.gov.in",
  umang: "https://www.umang.gov.in",
} as const;
