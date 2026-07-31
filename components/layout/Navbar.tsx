"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MdMenu, MdClose, MdRecycling, MdLogout, MdPerson } from "react-icons/md";
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

  // Check auth state on mount and route change
  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("ecoroute_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, [pathname]);

  // Shadow on scroll & active section detection on homepage
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
        const yOffset = -70;
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

  // Show Sign Out only when inside portal/dashboard pages. On landing/public pages, always show Login & Register.
  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/buyer") || pathname.startsWith("/admin") || pathname.startsWith("/officer");

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "RK";

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "sticky top-0 z-[var(--z-sticky)]",
        "bg-white border-b border-[var(--color-border)]",
        "transition-shadow duration-200",
        scrolled && "shadow-md",
      )}
    >
      <div className="container-gov">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={cn(
              "flex items-center gap-2.5 shrink-0",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-[var(--color-secondary)] rounded",
              "no-underline",
            )}
            aria-label="EcoRoute — Go to homepage"
          >
            <div
              className={cn(
                "flex items-center justify-center",
                "w-9 h-9 rounded",
                "bg-[var(--color-primary)]",
                "text-white shrink-0",
              )}
              aria-hidden="true"
            >
              <MdRecycling className="w-5 h-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-[var(--color-primary)] tracking-tight">
                EcoRoute
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider hidden sm:block">
                E-Waste Management
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ─────────────────────────────── */}
          <ul role="list" className="hidden lg:flex items-center gap-0.5">
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
                      "relative px-3 py-2 text-sm font-medium rounded",
                      "transition-colors duration-150 no-underline",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-[var(--color-secondary)]",
                      isPageActive
                        ? "text-[var(--color-primary)] bg-[var(--color-primary)]/8 font-bold"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-background)]",
                    )}
                  >
                    {t(item.labelKey as any)}
                    {/* Active indicator */}
                    {isPageActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[var(--color-primary)] rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop Auth Buttons ──────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            {isDashboardRoute ? (
              <div className="flex items-center gap-3">
                <Link
                  href={user?.role === "buyer" ? "/buyer" : user?.role === "admin" ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition no-underline"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {initials}
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {user?.fullName || "Citizen Portal"}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 cursor-pointer shadow-sm"
                >
                  <MdLogout className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "px-4 py-2 text-sm font-semibold rounded",
                    "text-[var(--color-primary)] border border-[var(--color-primary)]",
                    "hover:bg-[var(--color-primary)] hover:text-white",
                    "transition-all duration-200 no-underline",
                  )}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    "px-4 py-2 text-sm font-semibold rounded",
                    "bg-[var(--color-accent)] text-white",
                    "hover:bg-[var(--color-accent-dark)]",
                    "transition-colors duration-200 no-underline",
                  )}
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile menu button ────────────────────────────── */}
          <button
            ref={menuButtonRef}
            type="button"
            id="mobile-menu-button"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "lg:hidden flex items-center justify-center",
              "w-10 h-10 rounded",
              "text-[var(--color-text)] hover:bg-[var(--color-background)]",
              "transition-colors duration-150",
            )}
          >
            {menuOpen ? (
              <MdClose className="w-6 h-6" aria-hidden="true" />
            ) : (
              <MdMenu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────── */}
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
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden border-t border-[var(--color-border)] bg-white shadow-lg"
          >
            <div className="container-gov py-4 flex flex-col gap-1">
              <ul role="list" className="flex flex-col">
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
                          "block px-4 py-3 text-sm font-medium rounded",
                          "transition-colors duration-150 no-underline",
                          isPageActive
                            ? "text-[var(--color-primary)] bg-[var(--color-primary)]/8 font-bold"
                            : "text-[var(--color-text)] hover:bg-[var(--color-background)]",
                        )}
                      >
                        {t(item.labelKey as any)}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <hr className="gov-divider my-2" />

              <div className="flex flex-col gap-2 px-2">
                {isDashboardRoute ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                  >
                    <MdLogout className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 no-underline"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] transition-colors duration-200 no-underline"
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
