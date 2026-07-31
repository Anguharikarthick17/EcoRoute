"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  MdDashboard,
  MdShield,
  MdLocalShipping,
  MdPeople,
  MdBusiness,
  MdLocationOn,
  MdDirectionsCar,
  MdPersonOutline,
  MdReportProblem,
  MdBarChart,
  MdPictureAsPdf,
  MdSmartToy,
  MdNotifications,
  MdCampaign,
  MdSettings,
  MdLogout,
  MdChevronLeft,
  MdChevronRight,
  MdRecycling,
} from "react-icons/md";

export const ADMIN_NAV_ITEMS = [
  { label: "Admin Dashboard", href: "/admin", icon: MdDashboard },
  { label: "Officer Dashboard", href: "/admin/officer-dashboard", icon: MdShield },
  { label: "Pickup Management", href: "/admin/pickups", icon: MdLocalShipping },
  { label: "User Directory", href: "/admin/users", icon: MdPeople },
  { label: "Recycler Directory", href: "/admin/recyclers", icon: MdBusiness },
  { label: "Collection Centers", href: "/admin/centers", icon: MdLocationOn },
  { label: "Vehicle Fleet", href: "/admin/vehicles", icon: MdDirectionsCar },
  { label: "Driver Management", href: "/admin/drivers", icon: MdPersonOutline },
  { label: "Complaints & Desk", href: "/admin/complaints", icon: MdReportProblem, badge: "4" },
  { label: "Analytics Hub", href: "/admin/analytics", icon: MdBarChart },
  { label: "Reports & Audit", href: "/admin/reports", icon: MdPictureAsPdf },
  { label: "AI Monitoring", href: "/admin/ai-monitoring", icon: MdSmartToy },
  { label: "Notification Center", href: "/admin/notifications", icon: MdNotifications },
  { label: "Announcements", href: "/admin/announcements", icon: MdCampaign },
  { label: "System Settings", href: "/admin/settings", icon: MdSettings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-[var(--color-gov-topbar)] text-white shrink-0 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between z-30",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col">
        
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/40">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 rounded bg-[var(--color-primary)] flex items-center justify-center text-white shrink-0">
                <MdRecycling className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight text-white">EcoRoute Admin</span>
                <span className="text-[9px] text-amber-400 font-mono tracking-wider uppercase mt-0.5">MoEFCC Portal</span>
              </div>
            </Link>
          )}

          {collapsed && (
            <div className="w-8 h-8 rounded bg-[var(--color-primary)] flex items-center justify-center text-white mx-auto">
              <MdRecycling className="w-5 h-5" />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors hidden sm:block"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <MdChevronRight className="w-4 h-4" /> : <MdChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation items list */}
        <nav className="p-2 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-130px)]">
          {!collapsed && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 px-3 my-1">
              Government Control
            </span>
          )}

          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-all duration-150 no-underline",
                  isActive
                    ? "bg-[var(--color-primary)] text-white shadow"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white",
                  collapsed && "justify-center px-2",
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    isActive ? "text-white" : "text-slate-400",
                  )}
                />
                {!collapsed && <span className="truncate flex-1">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Officer Session & Logout */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex flex-col gap-2">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                AK
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-white text-[11px] truncate">Officer A. Kumar</span>
                <span className="text-[9px] text-slate-400 truncate">CPCB Nodal Officer</span>
              </div>
            </div>

            <Link
              href="/login"
              className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
              title="Logout session"
            >
              <MdLogout className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            className="p-2 text-slate-400 hover:text-red-400 transition-colors mx-auto"
            title="Logout"
          >
            <MdLogout className="w-5 h-5" />
          </Link>
        )}
      </div>
    </aside>
  );
}
