"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import {
  MdArrowForward,
  MdStorefront,
  MdAutoAwesome,
  MdLocationOn,
  MdVerified,
  MdLocalShipping,
  MdCurrencyRupee,
  MdCameraAlt,
} from "react-icons/md";

export function HeroSection() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
        .hero-video-zoom {
          animation: slowZoom 20s linear infinite alternate;
        }
      `}</style>

      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative w-full overflow-hidden flex items-center bg-slate-950"
        style={{ minHeight: "680px", height: "calc(100vh - 110px)", maxHeight: "840px" }}
      >
        {/* ── Background Video ───────────────────────────────── */}
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          className="hero-video-zoom absolute inset-0 w-full h-full object-cover opacity-35"
          style={{ zIndex: 0 }}
        />

        {/* ── Gradient Overlay for ultra-sleek readability ───────────────── */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />

        {/* ── Hero Content ────────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start max-w-3xl"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-md shadow-xs">
                <MdAutoAwesome className="w-3.5 h-3.5 text-emerald-300" />
                AI-Powered Scrap Marketplace
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 backdrop-blur-md shadow-xs">
                <MdLocationOn className="w-3.5 h-3.5 text-cyan-300" />
                Local Dealers Nearby
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-white"
            >
              Your Scrap Has Value. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Let AI Find the Right Buyer.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-200 mt-6 font-normal max-w-2xl">
              EcoRoute connects households with nearby scrap dealers. Upload a photo of your scrap, let AI identify and estimate it, then connect with a dealer for convenient doorstep pickup.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                href="/dashboard/upload"
                id="hero-cta-sell"
                className="inline-flex items-center justify-center gap-2.5 h-[50px] px-7 text-sm font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-250 ease-in-out no-underline shadow-lg shadow-emerald-950/50 hover:shadow-emerald-600/30 hover:scale-[1.02]"
              >
                <MdCameraAlt className="w-5 h-5" />
                Sell Scrap
                <MdArrowForward className="w-4 h-4" />
              </Link>
              <Link
                href="/buyer"
                id="hero-cta-browse"
                className="inline-flex items-center justify-center gap-2.5 h-[50px] px-7 text-sm font-extrabold rounded-xl bg-slate-900/80 text-slate-100 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 transition-all duration-250 ease-in-out no-underline backdrop-blur-md shadow-md hover:scale-[1.02]"
              >
                <MdStorefront className="w-5 h-5 text-emerald-400" />
                Browse Scrap
              </Link>
            </div>

            {/* Real Metrics & Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-6 border-t border-slate-800/80 w-full">
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-400">12,500+</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">Pickups Completed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-cyan-400">₹45 Lakh+</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">Paid to Households</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-300">350+</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">Scrap Dealers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">99.2%</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">AI Accuracy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
