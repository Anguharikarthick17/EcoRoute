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
    default: "EcoRoute — AI-Powered Scrap Marketplace | Turn Your Scrap Into Value",
    template: "%s | EcoRoute",
  },
  description:
    "EcoRoute connects households with nearby scrap dealers. Upload a photo of your scrap, get AI-powered scrap identification and price estimation, and arrange convenient doorstep pickup.",
  keywords: [
    "scrap marketplace",
    "sell scrap online",
    "AI scrap price estimation",
    "scrap dealer near me",
    "metal scrap",
    "copper scrap",
    "aluminium scrap",
    "e-waste recycling",
    "doorstep scrap pickup",
    "EcoRoute",
  ],
  authors: [{ name: "EcoRoute Technologies" }],
  creator: "EcoRoute",
  publisher: "EcoRoute Scrap Marketplace",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "EcoRoute — AI-Powered Scrap Marketplace",
    description:
      "Turn your scrap into value. Connect with nearby scrap dealers, get AI price estimates, and schedule doorstep pickup.",
    type: "website",
    locale: "en_IN",
    siteName: "EcoRoute",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoRoute — AI-Powered Scrap Marketplace",
    description:
      "Turn your scrap into value. Connect with nearby scrap dealers, get AI price estimates, and schedule doorstep pickup.",
  },
  metadataBase: new URL("https://ecoroute.market"),
};

// ── Viewport ──────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F5132",
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
