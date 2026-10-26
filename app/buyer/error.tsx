"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MdRefresh, MdStorefront, MdArrowBack } from "react-icons/md";

/**
 * Scrap Dealer Hub Error Boundary (app/buyer/error.tsx)
 *
 * Catches runtime errors in the dealer operations interface, proximity filters,
 * or route optimizer and allows the dealer to retry without losing local session state.
 */
export default function BuyerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[EcoRoute Scrap Dealer Portal Error]:", error.message);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
          <MdStorefront className="w-7 h-7" />
        </div>

        <h2 className="text-xl font-black text-slate-900 mb-2">
          Scrap Dealer Dashboard Notice
        </h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          The dealer marketplace interface encountered a temporary synchronization glitch.
          Your bids, active collection routes, and account details remain intact.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition"
          >
            <MdRefresh className="w-4 h-4" /> Refresh Marketplace
          </button>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
          >
            <MdArrowBack className="w-4 h-4" /> Go to Main Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
