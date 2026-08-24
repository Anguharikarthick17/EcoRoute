import Link from "next/link";
import { PLATFORM_INFO, FOOTER_SECTIONS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MdRecycling, MdEmail, MdLocationOn, MdAutoAwesome } from "react-icons/md";
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

const socialIconMap: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
};

/**
 * Footer — Clean modern scrap marketplace footer.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      role="contentinfo"
      className="bg-[#0F172A] text-white border-t border-slate-800"
    >
      {/* ── Modern marketplace accent line ────────────────────── */}
      <div className="marketplace-stripe" aria-hidden="true" />

      {/* ── Main footer body ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Column 1: About EcoRoute ─────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 w-fit no-underline group"
              aria-label="EcoRoute — Go to homepage"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-sm"
                aria-hidden="true"
              >
                <MdRecycling className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-black text-white leading-tight flex items-center gap-1">
                  EcoRoute <span className="text-emerald-400 text-sm">♻️</span>
                </p>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Scrap Marketplace
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
              EcoRoute connects households with nearby scrap dealers. Get instant AI price estimation, transparent valuation, and convenient doorstep pickup.
            </p>

            {/* Contact details */}
            <address className="not-italic flex flex-col gap-2.5 text-xs text-slate-300">
              <a
                href="mailto:support@ecoroute.market"
                className="flex items-start gap-2.5 hover:text-emerald-400 transition-colors no-underline"
              >
                <MdEmail className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>support@ecoroute.market</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MdLocationOn className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Coimbatore, Tamil Nadu · Serving Local Communities</span>
              </div>
            </address>

            {/* Social media */}
            <div className="flex items-center gap-2.5 flex-wrap" role="list" aria-label="Social media links">
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
                      "w-8 h-8 rounded-lg",
                      "bg-slate-800 hover:bg-emerald-700",
                      "text-slate-300 hover:text-white",
                      "transition-all duration-150 no-underline",
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
              <h2 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
                {section.heading}
              </h2>
              <ul role="list" className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xs text-slate-300 hover:text-white hover:translate-x-0.5",
                        "transition-all duration-150 no-underline",
                        "inline-flex items-center gap-1.5",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom copyright bar ──────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} EcoRoute Technologies. Turn Your Scrap Into Value.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>·</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <MdAutoAwesome className="w-3.5 h-3.5" /> AI Scrap Vision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
