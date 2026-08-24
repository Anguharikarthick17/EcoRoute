"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { PLATFORM_INFO } from "@/lib/constants";
import { SUPPORTED_LANGUAGES, useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  MdTrendingUp,
  MdLanguage,
  MdKeyboardArrowDown,
  MdCheck,
  MdAutoAwesome,
  MdLocationOn,
} from "react-icons/md";

/**
 * Header — Clean private marketplace top ticker & utility bar.
 */
export function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t, currentLanguage } = useTranslation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header role="banner" className="relative z-[999]">
      {/* ── Modern marketplace subtle accent line ──────────────── */}
      <div className="marketplace-stripe" aria-hidden="true" />

      {/* ── Top Utility & Live Rates Bar ────────────────────────── */}
      <div className="bg-[#0F172A] text-white relative z-[999] border-b border-slate-800/80">
        <div className="w-full px-5 sm:px-8 py-2">
          <div className="flex items-center justify-between gap-4 flex-wrap text-xs">

            {/* Left: Live AI Vision & Market Scrap Highlights */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                AI Scrap Vision Live
              </span>

              <div className="hidden md:flex items-center gap-2 text-slate-300 text-[11px]">
                <MdTrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Live Scrap Rates:</span>
                <span>Copper ₹750/kg</span>
                <span className="text-slate-600">·</span>
                <span>Aluminium ₹180/kg</span>
                <span className="text-slate-600">·</span>
                <span>Brass ₹480/kg</span>
                <span className="text-slate-600">·</span>
                <span>Iron ₹38/kg</span>
              </div>
            </div>

            {/* Right: Quick Features + Language Selector */}
            <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
              <Link
                href="/locate"
                className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors duration-150 font-medium"
              >
                <MdLocationOn className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Find Nearby Dealers</span>
              </Link>

              <div className="h-3.5 w-px bg-slate-700 hidden sm:block" aria-hidden="true" />

              {/* ── Language Selector ── */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  id="language-toggle"
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  aria-label={`${t("lang.select")}: ${currentLanguage.nativeLabel}`}
                  onClick={() => setLangOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1.5 text-slate-200 hover:text-white font-semibold",
                    "transition-colors duration-150 py-0.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
                  )}
                >
                  <MdLanguage className="w-3.5 h-3.5 shrink-0 text-cyan-400" aria-hidden="true" />
                  <span className="font-bold text-[11px]">
                    {currentLanguage.nativeLabel}
                  </span>
                  <MdKeyboardArrowDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      langOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Dropdown */}
                {langOpen && (
                  <div
                    role="listbox"
                    aria-labelledby="language-toggle"
                    aria-label={t("lang.select")}
                    className={cn(
                      "absolute right-0 top-full mt-2 z-[9999]",
                      "bg-white border border-slate-200 rounded-xl",
                      "shadow-2xl min-w-[200px] overflow-hidden",
                      "py-1 text-slate-900",
                    )}
                  >
                    <div className="px-3.5 py-1.5 border-b border-slate-100 bg-slate-50">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                        {t("lang.select")}
                      </p>
                    </div>

                    {SUPPORTED_LANGUAGES.map((language) => {
                      const isActive = lang === language.code;
                      return (
                        <button
                          key={language.code}
                          role="option"
                          aria-selected={isActive}
                          type="button"
                          onClick={() => {
                            setLang(language.code);
                            setLangOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3.5 py-2",
                            "flex items-center justify-between gap-3",
                            "transition-colors duration-100 cursor-pointer",
                            isActive
                              ? "bg-emerald-50 text-emerald-800 font-bold"
                              : "text-slate-700 hover:bg-slate-50 font-medium",
                          )}
                        >
                          <div className="flex flex-col leading-tight">
                            <span className={cn("text-xs", isActive && "font-extrabold")}>
                              {language.nativeLabel}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {language.label}
                            </span>
                          </div>
                          {isActive && (
                            <MdCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

