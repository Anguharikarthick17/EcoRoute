"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  MdDashboard,
  MdLocalShipping,
  MdCalendarMonth,
  MdCloudUpload,
  MdSmartToy,
  MdLocationOn,
  MdTrackChanges,
  MdEmojiEvents,
  MdVerified,
  MdNotifications,
  MdPerson,
  MdHelp,
  MdSettings,
  MdLogout,
} from "react-icons/md";

export const CITIZEN_NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: MdDashboard },
  { label: "My Pickup Requests", href: "/dashboard/pickups", icon: MdLocalShipping },
  { label: "Schedule Pickup", href: "/dashboard/schedule-pickup", icon: MdCalendarMonth },
  { label: "Upload E-Waste", href: "/dashboard/upload", icon: MdCloudUpload },
  { label: "AI Device Result", href: "/dashboard/ai-result", icon: MdSmartToy },
  { label: "Recycling Centers", href: "/dashboard/centers", icon: MdLocationOn },
  { label: "Pickup Tracking", href: "/dashboard/tracking", icon: MdTrackChanges },
  { label: "Rewards & Points", href: "/dashboard/rewards", icon: MdEmojiEvents },
  { label: "Certificates", href: "/dashboard/certificates", icon: MdVerified },
  { label: "Notifications", href: "/dashboard/notifications", icon: MdNotifications, badge: "3" },
  { label: "Citizen Profile", href: "/dashboard/profile", icon: MdPerson },
  { label: "Help & Support", href: "/dashboard/help", icon: MdHelp },
  { label: "Settings", href: "/dashboard/settings", icon: MdSettings },
];

export function CitizenSidebar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("Rajesh Kumar");
  const [userInitials, setUserInitials] = useState("RK");

  useEffect(() => {
    const stored = localStorage.getItem("ecoroute_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.sessionExpiresAt && Date.now() > u.sessionExpiresAt) {
          localStorage.removeItem("ecoroute_user");
          window.location.href = "/login?expired=true";
          return;
        }
        if (u.fullName) {
          setUserName(u.fullName);
          const parts = u.fullName.split(" ");
          setUserInitials(parts.map((p: string) => p[0]).join("").toUpperCase().slice(0, 2));
        }
      } catch {}
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("ecoroute_user");
    window.location.href = "/login";
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 rounded-[20px] overflow-hidden" style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.20)" }}>
      <div className="p-4 lg:p-6 lg:sticky lg:top-24 flex flex-col gap-6">

        {/* User Card Mini */}
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white font-bold flex items-center justify-center shrink-0 text-sm">
            {userInitials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white truncate">
              {userName}
            </span>
            <span className="text-[10px] text-white/60 truncate font-mono">
              ID: DL-2026-8941
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav aria-label="Citizen portal sidebar menu" className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 px-3 mb-1">
            Citizen Services
          </span>
          {CITIZEN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-all duration-150 no-underline",
                  isActive
                    ? "bg-[var(--color-primary)] text-white shadow-sm"
                    : "text-white/80 hover:bg-white/15 hover:text-white",
                )}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-white" : "text-cyan-300",
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none shrink-0",
                      isActive
                        ? "bg-white text-[var(--color-primary)]"
                        : "bg-[var(--color-accent)] text-white",
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Sign Out Button in Sidebar */}
          <div className="pt-2 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-bold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-150 cursor-pointer"
              style={{ border: "1px solid rgba(255,100,100,0.25)" }}
            >
              <MdLogout className="w-4 h-4 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
