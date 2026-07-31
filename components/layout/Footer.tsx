import Link from "next/link";
import { GOV_INFO, FOOTER_SECTIONS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MdRecycling, MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

// Map icon names to actual components
const socialIconMap: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
};

/**
 * Footer — Professional Government of India standard footer.
 *
 * Sections:
 * - About EcoRoute with helpline, email, address
 * - Quick Links
 * - Citizen Services
 * - Policies & Help
 * - Social media icons
 * - Government copyright bar
 */
export function Footer() {
  return (
    <footer
      id="contact"
      role="contentinfo"
      className="bg-[var(--color-primary)] text-white"
    >
      {/* ── Tricolour top stripe ─────────────────────────────── */}
      <div className="gov-stripe" aria-hidden="true" />

      {/* ── Main footer body ──────────────────────────────────── */}
      <div className="container-gov py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Column 1: About EcoRoute ─────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 w-fit no-underline"
              aria-label="EcoRoute — Go to homepage"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded bg-white/15 border border-white/25"
                aria-hidden="true"
              >
                <MdRecycling className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-tight">EcoRoute</p>
                <p className="text-[10px] text-white/60 uppercase tracking-wider">
                  E-Waste Management
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-sm text-white/75 leading-relaxed max-w-xs">
              India's AI-powered platform for responsible e-waste management.
              Connecting citizens, collectors, and recyclers under a unified
              government digital service.
            </p>

            {/* Contact details */}
            <address className="not-italic flex flex-col gap-2.5 text-sm text-white/75">
              <a
                href={`tel:${GOV_INFO.helpline.replace(/-/g, "")}`}
                className="flex items-start gap-2.5 hover:text-white transition-colors no-underline"
                aria-label={`Helpline: ${GOV_INFO.helpline}`}
              >
                <MdPhone className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-white">
                    {GOV_INFO.helpline}
                  </strong>{" "}
                  (Toll Free)
                </span>
              </a>
              <a
                href={`mailto:${GOV_INFO.email}`}
                className="flex items-start gap-2.5 hover:text-white transition-colors no-underline"
                aria-label={`Email: ${GOV_INFO.email}`}
              >
                <MdEmail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{GOV_INFO.email}</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MdLocationOn className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{GOV_INFO.address}</span>
              </div>
            </address>

            {/* Social media */}
            <div className="flex items-center gap-2 flex-wrap" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`${social.label} (opens in new tab)`}
                    className={cn(
                      "flex items-center justify-center",
                      "w-8 h-8 rounded",
                      "bg-white/10 hover:bg-white/20",
                      "text-white/80 hover:text-white",
                      "transition-colors duration-150 no-underline",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                    )}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Columns 2-4: Link sections ───────────────────── */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {section.heading}
              </h2>
              <ul role="list" className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "text-sm text-white/70 hover:text-white",
                        "transition-colors duration-150 no-underline",
                        "flex items-center gap-1.5",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                        "rounded",
                      )}
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-white/30 shrink-0"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="border-t border-white/15" aria-hidden="true" />

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="container-gov py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          {/* Copyright */}
          <p>{GOV_INFO.copyright}</p>

          {/* Gov logos row */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-white/40">Powered by</span>
            <Link
              href="https://www.digitalindia.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors no-underline font-medium"
              aria-label="Digital India (opens in new tab)"
            >
              Digital India
            </Link>
            <span className="text-white/30" aria-hidden="true">|</span>
            <Link
              href="https://www.mygov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors no-underline font-medium"
              aria-label="MyGov (opens in new tab)"
            >
              MyGov
            </Link>
          </div>

          {/* Version */}
          <p className="text-white/35">v{GOV_INFO.version}</p>
        </div>
      </div>
    </footer>
  );
}
