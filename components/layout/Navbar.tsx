"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MdMenu, MdClose, MdRecycling, MdLogout } from "react-icons/md";
import { useTranslation } from "@/lib/i18n";

const NAV_ROUTES = [
  { href: "/",              label: "Home",         sectionId: "home"         },
  { href: "/buyer",         label: "Marketplace",  sectionId: "marketplace"  },
  { href: "/#how-it-works", label: "How It Works", sectionId: "how-it-works" },
  { href: "/dashboard/upload", label: "Sell Scrap", sectionId: undefined     },
  { href: "/locate",        label: "Find Dealers", sectionId: undefined      },
  { href: "/about",         label: "About",        sectionId: undefined      },
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

  // Check auth state
  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("ecoroute_user");
      if (stored) {
        try {
          const u = JSON.parse(stored);
          setUser(u);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, [pathname]);

  // Active section detection on homepage
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);

      if (pathname === "/") {
        const sections = ["home", "how-it-works", "marketplace", "why-choose", "field-research"];
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

  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/buyer") || pathname.startsWith("/admin");

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "SC";

  const userRoleLabel = user?.role === "RECYCLER" || user?.role === "buyer"
    ? "Scrap Dealer"
    : user?.role === "ADMIN" || user?.role === "admin"
    ? "Admin"
    : "Household / Seller";

  return (
    <nav
      role="navigation"
      aria-label="Main marketplace navigation"
      className={cn(
        "relative w-full bg-white",
        "border-b border-slate-200/80 transition-all duration-250 ease-in-out",
        "shadow-[0_2px_12px_rgba(0,0,0,0.05)]",
      )}
    >
      {/* Container */}
      <div className="w-full px-5 sm:px-8 h-[74px] flex items-center justify-between relative max-w-7xl mx-auto">

        {/* ── 1. FAR LEFT: Logo ─────────────────────────────────────────── */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3 shrink-0 no-underline group transition-transform duration-200 hover:scale-[1.01]"
          aria-label="EcoRoute — AI-Powered Scrap Marketplace"
        >
          <div
            className="flex items-center justify-center w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-[#0F5132] to-[#16A34A] text-white shrink-0 shadow-sm group-hover:shadow-md transition-all duration-250"
            aria-hidden="true"
          >
            <MdRecycling className="w-6 h-6 animate-spin-slow" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1">
              EcoRoute <span className="text-emerald-600 text-sm">♻️</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider hidden sm:block leading-none mt-0.5">
              AI-Powered Scrap Marketplace
            </span>
          </div>
        </Link>

        {/* ── 2. CENTER: Navigation Links ───────────────────────────────── */}
        <ul role="list" className="hidden lg:flex items-center justify-center gap-6 md:gap-7 lg:gap-8">
          {NAV_ROUTES.map((item) => {
            const isPageActive =
              item.href === "/"
                ? pathname === "/" && (!activeSection || activeSection === "home")
                : pathname === item.href || (pathname === "/" && activeSection === item.sectionId);

            return (
              <li key={item.href} role="none" className="relative py-1">
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  aria-current={isPageActive ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-semibold transition-all duration-200 no-underline py-1",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 rounded",
                    isPageActive
                      ? "text-emerald-700 font-extrabold after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[3px] after:bg-emerald-600 after:rounded-full"
                      : "text-slate-700 hover:text-emerald-700 hover:font-bold",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── 3. FAR RIGHT: Auth / Dashboard CTA Buttons ───────────────────── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={user?.role === "RECYCLER" || user?.role === "buyer" ? "/buyer" : user?.role === "ADMIN" || user?.role === "admin" ? "/admin" : "/dashboard"}
                className="flex items-center gap-2 px-3.5 h-[40px] rounded-xl bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 transition-all duration-200 no-underline shadow-xs"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-xs">
                  {initials}
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs font-extrabold text-slate-800">
                    {user?.fullName || "My Account"}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 uppercase">
                    {userRoleLabel}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3.5 h-[40px] text-xs font-extrabold rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-all duration-200 cursor-pointer shadow-xs"
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
                  "flex items-center justify-center px-4.5 h-[40px] text-xs font-bold rounded-xl",
                  "text-slate-800 border border-slate-200 bg-white hover:bg-slate-50",
                  "transition-all duration-200 no-underline shadow-2xs hover:shadow-xs",
                )}
              >
                Login
              </Link>
              <Link
                href="/dashboard/upload"
                className={cn(
                  "flex items-center justify-center px-4.5 h-[40px] text-xs font-extrabold rounded-xl",
                  "bg-emerald-700 text-white hover:bg-emerald-800",
                  "transition-all duration-200 no-underline shadow-sm hover:shadow-md",
                )}
              >
                Sell Scrap
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
                      : pathname === item.href || (pathname === "/" && activeSection === item.sectionId);

                  return (
                    <li key={item.href} role="none">
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
                        aria-current={isPageActive ? "page" : undefined}
                        className={cn(
                          "block px-4 py-2.5 text-sm rounded-xl transition-all duration-200 no-underline",
                          isPageActive
                            ? "text-emerald-700 font-extrabold bg-emerald-50"
                            : "text-slate-800 font-semibold hover:bg-slate-50",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <hr className="my-1 border-slate-200" />

              <div className="flex flex-col gap-2 pt-1">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 px-4 h-[40px] text-xs font-bold rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition cursor-pointer shadow-xs"
                  >
                    <MdLogout className="w-4 h-4" />
                    Sign Out ({userRoleLabel})
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center justify-center px-4 h-[40px] text-xs font-bold rounded-xl text-slate-800 border border-slate-200 hover:bg-slate-50 transition-all duration-200 no-underline shadow-2xs"
                    >
                      Login
                    </Link>
                    <Link
                      href="/dashboard/upload"
                      className="flex items-center justify-center px-4 h-[40px] text-xs font-bold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors duration-200 no-underline shadow-sm"
                    >
                      Sell Scrap
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
