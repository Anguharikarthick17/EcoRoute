"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdSearch,
  MdNotifications,
  MdCampaign,
  MdShield,
  MdVerified,
  MdArrowDropDown,
} from "react-icons/md";

export function AdminTopNav() {
  const pathname = usePathname();

  // Generate breadcrumb text
  const currentPath = pathname.split("/").pop() || "dashboard";
  const formattedBreadcrumb =
    currentPath === "admin"
      ? "Executive Dashboard"
      : currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace("-", " ");

  return (
    <header className="h-16 bg-white border-b border-[var(--color-border)] px-6 flex items-center justify-between gap-4 shrink-0 shadow-xs z-20">
      
      {/* Left Breadcrumb & Portal Identifier */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-[var(--color-primary)] border border-blue-200">
            Government Portal
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-[var(--color-text)]">
            {formattedBreadcrumb}
          </span>
        </div>
      </div>

      {/* Right Search, Alerts, & Officer Profile */}
      <div className="flex items-center gap-4">
        
        {/* Quick Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 w-64 text-xs">
          <MdSearch className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search Citizen ID, Vehicle, Recycler..."
            className="bg-transparent border-none outline-none text-xs text-[var(--color-text)] w-full placeholder:text-slate-400"
          />
        </div>

        {/* Notifications Alert Bell */}
        <Link
          href="/admin/notifications"
          className="relative p-2 text-slate-600 hover:text-[var(--color-primary)] transition-colors rounded-full hover:bg-slate-100"
          title="Notifications"
        >
          <MdNotifications className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600" />
        </Link>

        {/* Officer Profile Badge */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
            AK
          </div>
          <div className="hidden sm:flex flex-col text-xs leading-none">
            <span className="font-bold text-[var(--color-text)]">Anil Kumar, IAS</span>
            <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5">CPCB Nodal Director</span>
          </div>
          <MdArrowDropDown className="w-4 h-4 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
