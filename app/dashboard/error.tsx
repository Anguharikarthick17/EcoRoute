"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MdRefresh, MdHome, MdCameraAlt } from "react-icons/md";

/**
 * Household Citizen Portal Error Boundary (app/dashboard/error.tsx)
 *
 * Catches errors during photo uploads, Gemini AI appraisal scans, or pickup scheduling.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[EcoRoute Dashboard Error]:", error.message);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
          <MdCameraAlt className="w-7 h-7" />
        </div>

        <h2 className="text-xl font-black text-slate-900 mb-2">
          Scrap Valuation / Portal Issue
        </h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          There was an issue processing your request or loading the dashboard view.
          If you were uploading a scrap photo, you can retry with a smaller image or reset the view.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition"
          >
            <MdRefresh className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/dashboard/upload"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
          >
            <MdCameraAlt className="w-4 h-4" /> Return to AI Scanner
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
          >
            <MdHome className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
