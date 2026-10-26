"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MdRefresh, MdHome, MdReportProblem } from "react-icons/md";

/**
 * Root App Router Error Boundary
 *
 * Catches unhandled runtime exceptions across page segments and provides
 * a user-friendly recovery interface without exposing raw system stack traces.
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error diagnostic to server or monitoring console
    console.error("[EcoRoute App Error Boundary]:", error.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
          <MdReportProblem className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-black text-slate-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          EcoRoute encountered an unexpected operational issue while rendering this page.
          Your data is safe, and no transactions were affected.
        </p>

        {error.digest && (
          <div className="mb-6 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-mono">
            Error ID: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs transition"
          >
            <MdRefresh className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
          >
            <MdHome className="w-4 h-4" /> Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
