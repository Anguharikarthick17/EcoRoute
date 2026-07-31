import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GOV_INFO } from "@/lib/constants";
import { LanguageProvider } from "@/lib/i18n";

// ── Inter Font ────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: `${GOV_INFO.portalName} | AI-Powered E-Waste Management | Government of India`,
    template: `%s | ${GOV_INFO.portalName}`,
  },
  description:
    "EcoRoute is the official Government of India AI-powered e-waste management platform. Schedule pickups, locate collection centres, track requests, and contribute to a sustainable India.",
  keywords: [
    "e-waste management",
    "electronic waste",
    "recycling",
    "government of india",
    "CPCB",
    "Digital India",
    "e-waste pickup",
    "ewaste collection centre",
  ],
  authors: [{ name: "Ministry of Environment, Forest and Climate Change" }],
  creator: "Government of India",
  publisher: "Central Pollution Control Board",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "EcoRoute — AI-Powered E-Waste Management | Government of India",
    description:
      "Official Government of India platform for responsible e-waste management. Schedule pickups, locate centres, and recycle responsibly.",
    type: "website",
    locale: "en_IN",
    siteName: "EcoRoute",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoRoute — AI-Powered E-Waste Management | Government of India",
    description:
      "Official Government of India platform for responsible e-waste management.",
  },
  metadataBase: new URL("https://ecoroute.gov.in"),
};

// ── Viewport ──────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003366",
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>
          {/* Government top bar */}
          <Header />

          {/* Main navigation */}
          <Navbar />

          {/* Page content */}
          <main id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
