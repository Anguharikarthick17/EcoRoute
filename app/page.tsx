import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { EWasteMarketplace } from "@/components/sections/EWasteMarketplace";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { FieldResearchSection } from "@/components/sections/FieldResearchSection";
import { RecyclingCategories } from "@/components/sections/RecyclingCategories";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQSection } from "@/components/sections/FAQSection";

// ── Page-level metadata ───────────────────────────────────────
export const metadata: Metadata = {
  title: "EcoRoute — AI-Powered Scrap Marketplace | Turn Your Scrap Into Value",
  description:
    "EcoRoute connects households with nearby scrap dealers. Upload a photo of your scrap, let AI identify and estimate it, then connect with a dealer for convenient doorstep pickup.",
  keywords: [
    "scrap marketplace",
    "sell scrap online",
    "AI scrap price estimation",
    "scrap dealers nearby",
    "metal scrap",
    "copper scrap",
    "aluminium scrap",
    "appliances recycling",
    "EcoRoute",
  ],
  openGraph: {
    title: "EcoRoute — AI-Powered Scrap Marketplace",
    description:
      "Turn your scrap into value. Connect with nearby scrap dealers, get AI price estimates, and schedule doorstep pickup.",
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

      {/* 3. How It Works (5-step flow) */}
      <HowItWorks />

      {/* 4. Live Nearby Scrap Listings */}
      <EWasteMarketplace />

      {/* 5. Why EcoRoute (6 Feature cards) */}
      <WhyChoose />

      {/* 6. Field Research Connection: Built Around a Real Local Problem */}
      <FieldResearchSection />

      {/* 7. Marketplace Stats */}
      <StatsSection />

      {/* 8. Supported Scrap Categories */}
      <RecyclingCategories />

      {/* 9. CTA Banner */}
      <CTABanner />

      {/* 10. FAQ */}
      <FAQSection />
    </>
  );
}
