"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

export function DashboardVideoWrapper({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});

    const handleVisibilityChange = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.08); }
        }
        .dashboard-bg-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -2;
          pointer-events: none;
          animation: slowZoom 20s ease-in-out infinite alternate;
          will-change: transform;
          transform-origin: center center;
        }
        .dashboard-bg-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(6,18,40,0.72) 0%, rgba(10,24,50,0.65) 100%);
          backdrop-filter: blur(0px);
        }
      `}</style>

      {/* ── Full-page fixed background video ────────────────────── */}
      <video
        ref={videoRef}
        src="/videos/seller-dashboard.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        className="dashboard-bg-video"
      />

      {/* ── Full-page dark overlay ───────────────────────────────── */}
      <div className="dashboard-bg-overlay" aria-hidden="true" />

      {/* ── Dashboard content (glass card) ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 w-full min-w-0 p-6 sm:p-8 lg:p-10 rounded-[24px]"
        style={{
          background: "rgba(255, 255, 255, 0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.50)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.40)",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
