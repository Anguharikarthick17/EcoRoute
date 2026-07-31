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
        className="relative w-full overflow-hidden"
        style={{ minHeight: "700px", maxHeight: "850px", height: "80vh" }}
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

        {/* ── Dark gradient overlay ─────────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45))",
            zIndex: 1,
          }}
          aria-hidden="true"
        />

        {/* ── Hero content ─────────────────────────────────────── */}
        <div
          className="relative flex flex-col justify-center h-full px-6 sm:px-10 lg:px-20 xl:px-28"
          style={{ zIndex: 2, maxWidth: "860px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-widest bg-white/15 border border-white/30 text-white backdrop-blur-sm">
                ✦ {t("hero.badge.official")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-widest bg-[#2E7D32]/80 border border-[#4CAF50]/40 text-white backdrop-blur-sm">
                ✔ {t("hero.badge.verified")}
              </span>
            </div>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.25rem] leading-[1.1] tracking-tight font-extrabold text-white"
            >
              {t("hero.title")}
            </h1>

            {/* Paragraph */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons: Replaced Request Pickup with Login Button */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/login"
                id="hero-cta-login"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors duration-200 no-underline shadow-lg"
              >
                <MdLogin className="w-4 h-4" aria-hidden="true" />
                Login to Portal
                <MdArrowForward className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/locate"
                id="hero-cta-locate"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded bg-white/10 text-white border border-white/35 hover:bg-white/20 transition-all duration-200 no-underline backdrop-blur-sm"
              >
                <MdLocationOn className="w-4 h-4" aria-hidden="true" />
                {t("hero.cta.locate")}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-white/15">
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>
                <MdVerified className="w-4 h-4 text-green-400" aria-hidden="true" />
                {t("hero.trust.authorized")}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>
                <MdSecurity className="w-4 h-4 text-blue-300" aria-hidden="true" />
                {t("hero.trust.security")}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>
                <span className="text-base" aria-hidden="true">🇮🇳</span>
                {t("hero.trust.madeInIndia")}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
