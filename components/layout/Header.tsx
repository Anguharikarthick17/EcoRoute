"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { GOV_INFO } from "@/lib/constants";
import { SUPPORTED_LANGUAGES, useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  MdPhone,
  MdLanguage,
  MdKeyboardArrowDown,
  MdCheck,
} from "react-icons/md";

/**
 * Header — Government of India style top bar.
 * Language switcher changes the entire site language via LanguageContext.
 */
export function Header() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t, currentLanguage } = useTranslation();

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  }, []);

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
      {/* ── Tricolour stripe ─────────────────────────────────── */}
      <div className="gov-stripe" aria-hidden="true" />

      {/* ── Top Government Bar ────────────────────────────────── */}
      <div className="bg-[var(--color-primary)] text-white relative z-[999]">
        <div className="container-gov">
          <div className="flex items-center justify-between py-1.5 gap-4 flex-wrap">

            {/* Left: Emblem + Portal name */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 border border-white/25 shrink-0"
                aria-hidden="true"
              >
                <span className="text-[10px] font-bold text-white">🇮🇳</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
                  {t("header.govt")}
                </span>
                <span className="text-[10px] text-white/65 hidden sm:block">
                  {GOV_INFO.ministry}
                </span>
              </div>

              {/* Separator */}
              <div className="h-6 w-px bg-white/25 hidden md:block" aria-hidden="true" />

              {/* Official portal badge */}
              <span
                className="hidden md:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-white/80"
                aria-label="Official Government Portal"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gov-stripe-2)] shrink-0" aria-hidden="true" />
                {t("header.portal")}
              </span>
            </div>

            {/* Right: Helpline + Language Selector + Date */}
            <div className="flex items-center gap-4 text-[11px]">

              {/* Helpline */}
              <a
                href={`tel:${GOV_INFO.helpline.replace(/-/g, "")}`}
                className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-150 no-underline"
                aria-label={`${GOV_INFO.helplineLabel}: ${GOV_INFO.helpline}`}
              >
                <MdPhone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="font-semibold">{GOV_INFO.helpline}</span>
                <span className="hidden sm:inline text-white/60">· {t("header.tollFree")}</span>
              </a>

              {/* Separator */}
              <div className="h-4 w-px bg-white/25" aria-hidden="true" />

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
                    "flex items-center gap-1.5 text-white/90 hover:text-white",
                    "transition-colors duration-150 py-0.5 px-1 rounded",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                  )}
                >
                  <MdLanguage className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {/* Show native label on desktop */}
                  <span className="hidden sm:inline font-medium">
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
                      "bg-white border border-gray-200 rounded-lg",
                      "shadow-2xl min-w-[200px] overflow-hidden",
                      "py-1 text-gray-900",
                    )}
                  >
                    {/* Dropdown header */}
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
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
                            "w-full text-left px-3 py-2.5",
                            "flex items-center justify-between gap-3",
                            "transition-colors duration-100",
                            isActive
                              ? "bg-[var(--color-primary)]/8 text-[var(--color-primary)]"
                              : "text-gray-700 hover:bg-gray-50",
                          )}
                        >
                          <div className="flex flex-col leading-tight">
                            <span className={cn("text-sm font-medium", isActive && "font-semibold")}>
                              {language.nativeLabel}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {language.label}
                            </span>
                          </div>
                          {isActive && (
                            <MdCheck className="w-4 h-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Date */}
              {currentDate && (
                <>
                  <div className="h-4 w-px bg-white/25 hidden lg:block" aria-hidden="true" />
                  <time
                    dateTime={new Date().toISOString().split("T")[0]}
                    className="text-white/65 hidden lg:block"
                    aria-label={`Today's date: ${currentDate}`}
                  >
                    {currentDate}
                  </time>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Digital India bar ─────────────────────────────────── */}
      <div className="bg-[var(--color-primary-light)] border-b border-[var(--color-primary-dark)]/40 text-white/90">
        <div className="container-gov">
          <div className="flex items-center justify-between py-1 text-[11px] font-medium flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <Link
                href="https://www.digitalindia.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors duration-150 no-underline font-semibold"
                aria-label="Digital India (opens in new tab)"
              >
                Digital India
              </Link>
              <span aria-hidden="true" className="text-white/60">·</span>
              <Link
                href="https://cpcb.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors duration-150 no-underline font-semibold"
                aria-label="Central Pollution Control Board (opens in new tab)"
              >
                CPCB
              </Link>
              <span aria-hidden="true" className="text-white/60">·</span>
              <Link
                href="https://moef.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors duration-150 no-underline font-semibold"
                aria-label="Ministry of Environment, Forest and Climate Change (opens in new tab)"
              >
                MoEFCC
              </Link>
            </div>
            <span className="text-white/80 font-medium">
              {GOV_INFO.department}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
