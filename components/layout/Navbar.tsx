"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MdMenu, MdClose, MdRecycling, MdLogout } from "react-icons/md";
import { useTranslation } from "@/lib/i18n";

const NAV_ROUTES = [
  { href: "/",              labelKey: "nav.home",    sectionId: "home"    },
  { href: "/about",         labelKey: "nav.about",   sectionId: undefined },
  { href: "/locate",        labelKey: "nav.locate",  sectionId: undefined },
  { href: "/pickup",        labelKey: "nav.pickup",  sectionId: undefined },
  { href: "/contact",       labelKey: "nav.contact", sectionId: "contact" },
] as const;

type NavRoute = typeof NAV_ROUTES[number];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  // Check auth state & 1-hour session expiration on mount and route change
  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("ecoroute_user");
      if (stored) {
        try {
          const u = JSON.parse(stored);
          // 1-Hour Session Expiration Check
          if (u.sessionExpiresAt && Date.now() > u.sessionExpiresAt) {
            localStorage.removeItem("ecoroute_user");
            setUser(null);
            window.location.replace("/login?expired=true");
            return;
          }
          setUser(u);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    const interval = setInterval(checkUser, 10000); // Poll every 10s for 1-hr expiration
    window.addEventListener("storage", checkUser);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkUser);
    };
  }, [pathname]);

  // Active section detection on homepage
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);

      if (pathname === "/") {
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 150
        ) {
          setActiveSection("contact");
          return;
        }

        const sections = NAV_ROUTES.map((item) => item.sectionId).filter(Boolean) as string[];
        let currentSection = "home";

        for (const secId of sections) {
          const el = document.getElementById(secId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 220 && rect.bottom >= 100) {
              currentSection = secId;
            }
          }
        }
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Navigation click handler
  const handleNavClick = (e: React.MouseEvent, item: NavRoute) => {
    setMenuOpen(false);

    if (pathname === "/" && item.sectionId) {
      const targetElement = document.getElementById(item.sectionId);
      if (targetElement) {
        e.preventDefault();
        const yOffset = -15;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setActiveSection(item.sectionId);
        return;
      }
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("ecoroute_user");
    setUser(null);
    window.location.href = "/login";
  };

  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/buyer") || pathname.startsWith("/admin") || pathname.startsWith("/officer");

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "RK";

  return (
    <nav
      role="navigation"
      aria-label="Main national navigation"
      className={cn(
        "relative w-full bg-white",
        "border-b border-slate-200/80 transition-all duration-250 ease-in-out",
        "shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
      )}
    >
      {/* Compact 74px Height Full-Width Container with 28-32px side padding */}
      <div className="w-full px-7 sm:px-8 h-[74px] flex items-center justify-between relative">

        {/* ── 1. FAR LEFT: Compact Logo (44px Icon) ─────────────────────────────────── */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5 shrink-0 no-underline group transition-transform duration-200 hover:scale-[1.01]"
          aria-label="EcoRoute — Government E-Waste Portal Homepage"
        >
          <div
            className="flex items-center justify-center w-[44px] h-[44px] rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-250"
            aria-hidden="true"
          >
            <MdRecycling className="w-6 h-6 animate-spin-slow" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-black text-[var(--color-primary)] tracking-tight font-sans">
              EcoRoute
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden sm:block leading-none mt-0.5">
              National E-Waste Portal
            </span>
          </div>
        </Link>

        {/* ── 2. PERFECTLY CENTERED: Desktop Navigation Links (Gap 24–32px) ───────────────── */}
        <ul role="list" className="hidden lg:flex items-center justify-center gap-6 md:gap-7 lg:gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_ROUTES.map((item) => {
            const isPageActive =
              item.href === "/"
                ? pathname === "/" && (!activeSection || activeSection === "home")
                : pathname.startsWith(item.href) || (pathname === "/" && activeSection === item.sectionId);

            return (
              <li key={item.href} role="none" className="relative py-1">
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  aria-current={isPageActive ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-semibold transition-all duration-250 ease-in-out no-underline py-1",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] rounded",
                    isPageActive
                      ? "text-[var(--color-primary)] font-extrabold after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[3px] after:bg-[var(--color-primary)] after:rounded-full"
                      : "text-slate-700 hover:text-[var(--color-primary)] hover:font-bold",
                  )}
                >
                  {t(item.labelKey as any)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── 3. FAR RIGHT: Proportional Auth Buttons (40px Height) ───────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isDashboardRoute ? (
            <div className="flex items-center gap-3">
              <Link
                href={user?.role === "buyer" ? "/buyer" : user?.role === "admin" ? "/admin" : "/dashboard"}
                className="flex items-center gap-2 px-3.5 h-[40px] rounded-lg bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 transition-all duration-250 no-underline shadow-xs"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-xs">
                  {initials}
                </div>
                <span className="text-xs font-extrabold text-slate-800">
                  {user?.fullName || "Citizen Portal"}
                </span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-4 h-[40px] text-xs font-extrabold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-250 cursor-pointer shadow-xs hover:shadow-sm"
              >
                <MdLogout className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className={cn(
                  "flex items-center justify-center px-4.5 h-[40px] text-xs font-bold rounded-lg",
                  "text-[var(--color-primary)] border-2 border-[var(--color-primary)] bg-white",
                  "hover:bg-[var(--color-primary)] hover:text-white",
                  "transition-all duration-250 ease-in-out no-underline shadow-xs hover:shadow-sm",
                )}
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/register"
                className={cn(
                  "flex items-center justify-center px-5 h-[40px] text-xs font-extrabold rounded-lg",
                  "bg-[var(--color-primary)] text-white border-2 border-[var(--color-primary)]",
                  "hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)]",
                  "transition-all duration-250 ease-in-out no-underline shadow-sm hover:shadow-md",
                )}
              >
                {t("nav.register")}
              </Link>
            </div>
          )}
        </div>

        {/* ── Mobile Menu Trigger ───────────────────────────────────────── */}
        <button
          ref={menuButtonRef}
          type="button"
          id="mobile-menu-button"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors duration-200"
        >
          {menuOpen ? (
            <MdClose className="w-6 h-6" aria-hidden="true" />
          ) : (
            <MdMenu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* ── Mobile & Tablet Dropdown Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden border-t border-slate-200 bg-white shadow-2xl"
          >
            <div className="px-6 py-5 flex flex-col gap-2.5">
              <ul role="list" className="flex flex-col gap-1">
                {NAV_ROUTES.map((item) => {
                  const isPageActive =
                    item.href === "/"
                      ? pathname === "/" && (!activeSection || activeSection === "home")
                      : pathname.startsWith(item.href) || (pathname === "/" && activeSection === item.sectionId);

                  return (
                    <li key={item.href} role="none">
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
                        aria-current={isPageActive ? "page" : undefined}
                        className={cn(
                          "block px-4 py-2.5 text-sm rounded-lg transition-all duration-200 no-underline",
                          isPageActive
                            ? "text-[var(--color-primary)] font-black bg-[var(--color-primary)]/8"
                            : "text-slate-800 font-semibold hover:bg-slate-100",
                        )}
                      >
                        {t(item.labelKey as any)}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <hr className="my-1 border-slate-200" />

              <div className="flex flex-col gap-2 pt-1">
                {isDashboardRoute ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 px-4 h-[40px] text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer shadow-xs"
                  >
                    <MdLogout className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center justify-center px-4 h-[40px] text-xs font-bold rounded-lg text-[var(--color-primary)] border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 no-underline shadow-xs"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center px-4 h-[40px] text-xs font-bold rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors duration-200 no-underline shadow-sm"
                    >
                      {t("nav.register")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
