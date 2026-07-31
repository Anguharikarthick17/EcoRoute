"use client";

import Link from "next/link";
import { CitizenSectionHeader, DashboardCard, StatusBadge } from "@/components/citizen";
import { GovAlertBox } from "@/components/forms";
import {
  MdSmartToy,
  MdVerified,
  MdWarning,
  MdLocationOn,
  MdCalendarMonth,
  MdArrowForward,
  MdPsychology,
  MdRecycling,
} from "react-icons/md";

export default function AIResultPage() {
  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="AI Waste Identification Result"
        subtitle="AI Vision Model output analysis for your uploaded electronic device."
        badge="AI Analysis Complete"
      />

      {/* Main Result Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 to-[var(--color-primary)] rounded-lg p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          
          {/* Device Image Scan Visual Box */}
          <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-emerald-400 shrink-0 bg-slate-800 flex items-center justify-center shadow-md group">
            <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
            <div className="flex flex-col items-center gap-2 text-center p-4">
              <MdSmartToy className="w-12 h-12 text-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300">
                AI SCAN: HP LAPTOP
              </span>
            </div>
            <span className="absolute top-2 left-2 bg-emerald-500 text-slate-950 font-bold text-[9px] px-2 py-0.5 rounded font-mono">
              96.8% MATCH
            </span>
          </div>

          {/* AI Output Metrics */}
          <div className="flex-1 flex flex-col gap-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Confidence: 96.8%
              </span>
              <StatusBadge status="Moderate" size="sm" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
              HP Pavilion g6 Notebook Computer
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Classified under <strong className="text-white">Category I: Information Technology & Telecommunication Equipment</strong> under CPCB E-Waste Rules.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 border-t border-slate-700/80 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Estimated Recovery Value</span>
                <span className="font-bold text-emerald-400 text-base">₹450 - ₹650</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Green Points Reward</span>
                <span className="font-bold text-amber-300 text-base">+50 Points</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Hazard Rating</span>
                <span className="font-bold text-orange-400 text-base">Moderate (Lithium Battery)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Details & Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Columns: Component breakdown & Disposal Recommendation */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <DashboardCard title="Recoverable Components & Materials">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border rounded text-center">
                <span className="font-bold text-[var(--color-primary)] block text-base">45%</span>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Aluminium Alloy</span>
              </div>
              <div className="p-3 bg-slate-50 border rounded text-center">
                <span className="font-bold text-[var(--color-accent)] block text-base">28%</span>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Copper Wiring</span>
              </div>
              <div className="p-3 bg-slate-50 border rounded text-center">
                <span className="font-bold text-amber-700 block text-base">12g</span>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Precious Gold Trace</span>
              </div>
              <div className="p-3 bg-slate-50 border rounded text-center">
                <span className="font-bold text-purple-700 block text-base">15%</span>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">Recyclable Polymer</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Official Disposal Recommendation">
            <div className="flex flex-col gap-3 text-xs">
              <p className="text-[var(--color-text)] leading-relaxed">
                This device contains a Lithium-ion battery pack and printed circuit board (PCB) assembly.
                It is <strong className="text-[var(--color-danger)]">strictly prohibited</strong> to dispose of this item in municipal solid waste bins under Schedule II of CPCB Regulations.
              </p>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <MdRecycling className="w-6 h-6 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[var(--color-accent)]">Recommended Action: Doorstep Pickup</span>
                  <p className="text-[var(--color-text-muted)] text-[11px]">
                    Schedule a free collection with our CPCB-certified partner <strong className="text-[var(--color-text)]">EcoRecycle Facility #4</strong> for full raw material extraction.
                  </p>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Suggested Recycling Center Card */}
          <DashboardCard title="Suggested Recycling Facility">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0">
                  <MdLocationOn className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text)] text-sm">
                    EcoRecycle Facility #4
                  </h4>
                  <p className="text-[var(--color-text-muted)] text-[11px]">
                    Okhla Industrial Area Phase III, New Delhi (3.2 km away)
                  </p>
                  <span className="text-[10px] font-semibold text-[var(--color-accent)]">
                    ★ 4.8 / 5 Rating · Open Today until 6:00 PM
                  </span>
                </div>
              </div>

              <Link
                href="/dashboard/schedule-pickup"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold text-xs shadow no-underline shrink-0"
              >
                <MdCalendarMonth className="w-4 h-4" />
                Book Doorstep Pickup
              </Link>
            </div>
          </DashboardCard>
        </div>

        {/* Right 1 Column: Summary CTA */}
        <div className="flex flex-col gap-6">
          <DashboardCard title="Summary & Next Step">
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-[var(--color-text-muted)]">Device Name:</span>
                <span className="font-bold text-[var(--color-text)]">HP Pavilion Laptop</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-[var(--color-text-muted)]">AI Hazard Rating:</span>
                <span className="font-bold text-amber-700">Moderate</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-[var(--color-text-muted)]">Points Credit:</span>
                <span className="font-bold text-[var(--color-accent)]">+50 Green Points</span>
              </div>

              <Link
                href="/dashboard/schedule-pickup"
                className="w-full py-3 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-bold text-center no-underline shadow flex items-center justify-center gap-2"
              >
                Proceed to Book Pickup
                <MdArrowForward className="w-4 h-4" />
              </Link>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
