"use client";

import { Container } from "@/components/ui/Container";
import { MdStorefront, MdHome, MdSyncAlt, MdLightbulb, MdCheckCircle } from "react-icons/md";
import Link from "next/link";

export function FieldResearchSection() {
  return (
    <section
      id="field-research"
      aria-labelledby="field-research-heading"
      className="bg-gradient-to-b from-slate-900 via-[#0B1528] to-[#0F172A] text-white py-18 lg:py-24 relative overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold mb-6">
            <MdLightbulb className="w-4 h-4 text-emerald-400" />
            Field Research Insight
          </div>

          <h2
            id="field-research-heading"
            className="text-3xl sm:text-4xl lg:text-4xl font-black text-white tracking-tight leading-tight"
          >
            Built Around a Real Local Problem
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mt-6 max-w-3xl mx-auto font-normal">
            “Many households store recyclable scrap because they do not know which local dealer to contact. At the same time, scrap dealers often have difficulty discovering available scrap from nearby households. EcoRoute bridges this gap through a simple digital marketplace.”
          </p>
        </div>

        {/* Visual Bridge Diagram */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
          {/* Household Side */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md text-left flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MdHome className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">Households & Sellers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Old appliances, cables, metal scrap, and recyclables accumulate in balconies and store rooms with uncertain pricing.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mt-2">
              <MdCheckCircle className="w-4 h-4" /> Instant AI estimate & doorstep pickup
            </div>
          </div>

          {/* Center Bridge Indicator */}
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
              <MdSyncAlt className="w-8 h-8" />
            </div>
            <p className="text-xs font-bold text-slate-300 mt-3 uppercase tracking-wider">
              EcoRoute Marketplace
            </p>
            <span className="text-[10px] text-emerald-400 font-semibold">AI Match & Route Optimizer</span>
          </div>

          {/* Scrap Dealer Side */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md text-left flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <MdStorefront className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">Local Scrap Dealers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Depend on random door-to-door roaming without prior notice of scrap quantity, material types, or route planning.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mt-2">
              <MdCheckCircle className="w-4 h-4" /> Discover nearby verified scrap listings
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/dashboard/upload"
            className="inline-flex items-center justify-center gap-2 px-6 h-[46px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg"
          >
            Experience EcoRoute AI Scrap Vision
          </Link>
        </div>
      </Container>
    </section>
  );
}
