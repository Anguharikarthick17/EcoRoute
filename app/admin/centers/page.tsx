"use client";

import { useState } from "react";
import { AdminSearchBar, AdminStatusBadge } from "@/components/admin";
import { DataTable, CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import type { AdminCollectionCenterItem } from "@/types/admin";
import { MdLocationOn, MdAdd, MdPhone, MdAccessTime } from "react-icons/md";

const MOCK_CENTERS: AdminCollectionCenterItem[] = [
  {
    id: "CTR-01",
    centerName: "Okhla Central Collection Depot",
    district: "New Delhi Central",
    address: "Plot 14, Okhla Phase III, New Delhi",
    workingHours: "08:00 AM - 08:00 PM",
    contactPerson: "Rajiv Malhotra",
    phone: "+91 11 2638 0011",
    capacityTonnes: 25,
    todayLoadKg: 4200,
    activeDrivers: 6,
    status: "Operational",
  },
  {
    id: "CTR-02",
    centerName: "Mayapuri District Hub",
    district: "West Delhi",
    address: "B-82, Mayapuri Phase II, New Delhi",
    workingHours: "09:00 AM - 06:00 PM",
    contactPerson: "Sunil Dutt",
    phone: "+91 11 2811 0022",
    capacityTonnes: 15,
    todayLoadKg: 3100,
    activeDrivers: 4,
    status: "Operational",
  },
  {
    id: "CTR-03",
    centerName: "Shahdara Regional Facility",
    district: "East Delhi",
    address: "Rathinam Technical Campus, Eachanari, Coimbatore",
    workingHours: "09:00 AM - 05:00 PM",
    contactPerson: "Anand Verma",
    phone: "1800-200-7911",
    capacityTonnes: 30,
    todayLoadKg: 8900,
    activeDrivers: 8,
    status: "Full Capacity",
  },
];

export default function AdminCollectionCentersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_CENTERS.filter(
    (c) =>
      c.centerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Collection Centers & Hubs"
        subtitle="Manage regional e-waste collection depots, daily intake load, and capacity thresholds."
        badge="Infrastructure"
        action={
          <button
            onClick={() => alert("Add Collection Depot Form")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--color-primary)] text-white text-xs font-bold shadow"
          >
            <MdAdd className="w-4 h-4" />
            Add Depot
          </button>
        }
      />

      <AdminSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Depot Name, District..."
      />

      {/* Map View & Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Center Cards List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white border border-[var(--color-border)] rounded-lg p-5 shadow-xs flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-bold shrink-0">
                    <MdLocationOn className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text)] text-sm">{c.centerName}</h3>
                    <span className="text-[11px] text-[var(--color-text-muted)]">{c.district}</span>
                  </div>
                </div>
                <AdminStatusBadge status={c.status} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Today's Load</span>
                  <span className="font-bold text-[var(--color-accent)]">{c.todayLoadKg} kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Capacity</span>
                  <span className="font-bold text-[var(--color-text)]">{c.capacityTonnes} Tonnes</span>
                </div>
                <div className="col-span-2 border-t pt-1 mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-600">Active Drivers: <strong>{c.activeDrivers}</strong></span>
                  <span className="text-slate-600">Contact: <strong>{c.phone}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right 1 Column: Interactive GIS Map Placeholder */}
        <div className="flex flex-col gap-6">
          <DashboardCard title="Regional Depot GIS Map">
            <div className="relative w-full h-72 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 flex items-center justify-center shadow-inner">
              <svg className="absolute inset-0 w-full h-full opacity-40">
                <pattern id="admin-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94A3B8" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#admin-grid)" />
              </svg>
              <div className="relative z-10 text-center p-4 bg-white/90 backdrop-blur rounded border shadow">
                <MdLocationOn className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-1 animate-bounce" />
                <span className="font-bold text-xs text-[var(--color-text)]">GIS Depot Tracker Active</span>
                <span className="text-[10px] text-slate-500 block font-mono">3 Active Hubs Monitored</span>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
