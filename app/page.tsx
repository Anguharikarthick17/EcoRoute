import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StatsSection } from "@/components/sections/StatsSection";
import { RecyclingCategories } from "@/components/sections/RecyclingCategories";
import { EWasteMarketplace } from "@/components/sections/EWasteMarketplace";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQSection } from "@/components/sections/FAQSection";

// ── Page-level metadata ───────────────────────────────────────
export const metadata: Metadata = {
  title:
    "EcoRoute | AI-Powered E-Waste Management | Government of India",
  description:
    "EcoRoute is the official Government of India platform for responsible electronic waste disposal. Schedule free doorstep pickups, locate CPCB-authorized recycling centres, and receive digital recycling certificates.",
  keywords: [
    "e-waste pickup India",
    "electronic waste recycling",
    "CPCB authorized recycling",
    "government e-waste platform",
    "free e-waste collection",
    "EcoRoute",
  ],
  openGraph: {
    title: "EcoRoute | AI-Powered E-Waste Management | Government of India",
    description:
      "Schedule free doorstep e-waste pickups, locate authorized recycling centres, and track your disposal — all through EcoRoute, India's official government e-waste platform.",
    type: "website",
  },
};

// ── Home Page ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust Indicators */}
      <TrustIndicators />

      {/* 3. How It Works */}
      <HowItWorks />

      {/* 4. Live E-Waste Scrap Marketplace */}
      <EWasteMarketplace />

      {/* 5. Impact Statistics */}
      <StatsSection />

      {/* 6. Recycling Categories */}
      <RecyclingCategories />

      {/* 7. CTA Banner */}
      <CTABanner />

      {/* 8. FAQ */}
      <FAQSection />
    </>
  );
}
