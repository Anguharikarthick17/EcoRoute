"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MdArrowForward, MdStorefront, MdCameraAlt } from "react-icons/md";

export function CTABanner() {
  return (
    <section
      aria-label="Call to action"
      className="bg-gradient-to-r from-[#0F5132] via-[#115E38] to-[#0F172A] text-white py-16 lg:py-20 relative overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            Start Today
          </span>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Ready to Turn Your Scrap Into Value?
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
            Upload a photo now to get instant AI scrap estimation and connect with trusted nearby dealers for convenient doorstep pickup.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-extrabold rounded-xl bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-all duration-200 no-underline shadow-lg hover:scale-[1.02]"
            >
              <MdCameraAlt className="w-5 h-5" />
              Sell Your Scrap
              <MdArrowForward className="w-4 h-4" />
            </Link>
            <Link
              href="/buyer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-all duration-200 no-underline"
            >
              <MdStorefront className="w-5 h-5 text-emerald-300" />
              Explore Marketplace
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
