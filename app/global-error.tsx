"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MdRefresh, MdHome } from "react-icons/md";

/**
 * Root Global Error Boundary (catches root layout failures)
 *
 * In Next.js App Router, global-error.tsx replaces the root layout when an error
 * occurs at the root level, and must define its own <html> and <body> tags.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[EcoRoute Global Layout Error]:", error.message);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-md text-center">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-center font-black text-2xl">
            !
          </div>

          <h1 className="text-xl font-black text-slate-900 mb-2">
            System Level Operational Error
          </h1>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            A critical interface error occurred. Please refresh or return to the main portal.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition"
            >
              <MdRefresh className="w-4 h-4" /> Reload System
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
            >
              <MdHome className="w-4 h-4" /> Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
