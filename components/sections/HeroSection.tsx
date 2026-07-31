"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { MdArrowForward, MdLocationOn, MdVerified, MdSecurity, MdLogin } from "react-icons/md";

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
      {/* Keyframe for slow video zoom */}
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.08); }
        }
        .hero-video-zoom {
          animation: slowZoom 20s linear infinite alternate;
        }
      `}</style>

      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative w-full overflow-hidden flex items-center"
        style={{ minHeight: "680px", height: "calc(100vh - 120px)", maxHeight: "820px" }}
      >
        {/* ── Full-background video ─────────────────────────────── */}
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          className="hero-video-zoom absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />

        {/* ── 45–55% Subtle Dark Overlay for readability & video focus ─────────────────────────────── */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-slate-950/30"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />

        {/* ── Hero content (70–90px Left Padding on Desktop) ─────────────────────────────────────── */}
        <div
          className="relative z-10 w-full text-left pl-6 sm:pl-10 md:pl-16 lg:pl-[80px] xl:pl-[90px] pr-6 md:pr-12 py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-widest bg-white/15 border border-white/30 text-white backdrop-blur-md shadow-xs">
                ✦ {t("hero.badge.official")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-widest bg-[#2E7D32]/85 border border-[#4CAF50]/50 text-white backdrop-blur-md shadow-xs">
                ✔ {t("hero.badge.verified")}
              </span>
            </div>

            {/* Heading (Desktop: 60px, Laptop: 56px, Tablet: 48px, Mobile: 36px, Weight: 800, LineHeight: 1.05, LetterSpacing: -1px, MaxWidth: 680px) */}
            <h1
              id="hero-heading"
              className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[60px] font-[800] leading-[1.05] tracking-[-1px] max-w-[680px] text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.35)]"
            >
              {t("hero.title")}
            </h1>

            {/* Paragraph (MaxWidth: 520px, FontSize: 18px, LineHeight: 1.7, Color: rgba(255,255,255,0.9), 24px Top Spacing) */}
            <p
              className="text-[18px] leading-[1.7] max-w-[520px] mt-6 text-white/90 font-medium [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]"
            >
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons (28px below description, Height: 46px, Horizontal Padding: 24–28px, Radius: 10px, 0.3s transition) */}
            <div className="flex flex-wrap items-center gap-3.5 mt-[28px]">
              <Link
                href="/login"
                id="hero-cta-login"
                className="inline-flex items-center justify-center gap-2 h-[46px] px-6 sm:px-[26px] text-sm font-extrabold rounded-[10px] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all duration-300 ease-in-out no-underline shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <MdLogin className="w-4 h-4" aria-hidden="true" />
                Login to Portal
                <MdArrowForward className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/locate"
                id="hero-cta-locate"
                className="inline-flex items-center justify-center gap-2 h-[46px] px-6 sm:px-[26px] text-sm font-extrabold rounded-[10px] bg-white/10 text-white border-2 border-white/80 hover:bg-white hover:text-slate-950 transition-all duration-300 ease-in-out no-underline backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                <MdLocationOn className="w-4 h-4" aria-hidden="true" />
                {t("hero.cta.locate")}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-5 border-t border-white/20 max-w-[680px] w-full">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
                <MdVerified className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                {t("hero.trust.authorized")}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
                <MdSecurity className="w-4 h-4 text-cyan-300 shrink-0" aria-hidden="true" />
                {t("hero.trust.security")}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
                <span className="text-base leading-none" aria-hidden="true">🇮🇳</span>
                {t("hero.trust.madeInIndia")}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
