"use client";

import { useState } from "react";
import Link from "next/link";
import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import { FormInput } from "@/components/forms";
import type { RecyclingCenter } from "@/types/citizen";
import {
  MdLocationOn,
  MdSearch,
  MdPhone,
  MdAccessTime,
  MdStar,
  MdDirections,
  MdCalendarMonth,
  MdFilterList,
  MdVerified,
} from "react-icons/md";

const MOCK_CENTERS: RecyclingCenter[] = [
  {
    id: "center-1",
    name: "EcoRecycle Facility #4",
    registrationNo: "CPCB/EWR/2024/DL-098",
    address: "Plot 14, Okhla Industrial Area Phase III",
    city: "New Delhi",
    state: "Delhi",
    pinCode: "110020",
    phone: "+91 11 2638 9012",
    email: "okhla@ecorecycle.gov.in",
    workingHours: "09:00 AM - 06:00 PM (Mon-Sat)",
    rating: 4.8,
    reviewCount: 142,
    distanceKm: 3.2,
    acceptedCategories: ["Laptops", "Mobiles", "Batteries", "Appliances"],
    isOpenNow: true,
    latitude: 28.5355,
    longitude: 77.2639,
  },
  {
    id: "center-2",
    name: "GreenTech Clean Recycling Pvt Ltd",
    registrationNo: "CPCB/EWR/2023/DL-045",
    address: "B-82, Mayapuri Industrial Area Phase II",
    city: "New Delhi",
    state: "Delhi",
    pinCode: "110064",
    phone: "+91 11 2811 4567",
    email: "mayapuri@greentech.org.in",
    workingHours: "09:30 AM - 06:30 PM (Mon-Sat)",
    rating: 4.6,
    reviewCount: 98,
    distanceKm: 5.8,
    acceptedCategories: ["Desktops", "Printers", "TVs", "Cables"],
    isOpenNow: true,
    latitude: 28.628,
    longitude: 77.118,
  },
  {
    id: "center-3",
    name: "CPCB Central E-Waste Collection Point",
    registrationNo: "CPCB/GOI/GOVT-001",
    address: "Rathinam Technical Campus, Eachanari, Coimbatore",
    city: "Delhi",
    state: "Delhi",
    pinCode: "110032",
    phone: "1800-200-7911",
    email: "central@cpcb.gov.in",
    workingHours: "09:00 AM - 05:30 PM (Mon-Fri)",
    rating: 4.9,
    reviewCount: 310,
    distanceKm: 8.4,
    acceptedCategories: ["All E-Waste Categories", "Hazardous Waste"],
    isOpenNow: true,
    latitude: 28.654,
    longitude: 77.294,
  },
  {
    id: "center-4",
    name: "Noida CleanTech E-Waste Hub",
    registrationNo: "CPCB/EWR/2025/UP-112",
    address: "Sector 63, Block B-4, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    pinCode: "201301",
    phone: "+91 120 456 7890",
    email: "noida@cleantech.org.in",
    workingHours: "10:00 AM - 07:00 PM (Mon-Sat)",
    rating: 4.5,
    reviewCount: 76,
    distanceKm: 12.1,
    acceptedCategories: ["Mobiles", "Laptops", "Home Appliances"],
    isOpenNow: false,
    latitude: 28.625,
    longitude: 77.378,
  },
];

export default function RecyclingCentersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter>(MOCK_CENTERS[0]);

  const filteredCenters = MOCK_CENTERS.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.pinCode.includes(searchTerm)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Authorized Recycling Centers"
        subtitle="Locate government-certified CPCB e-waste collection points near your location."
        badge="Recycler Network"
      />

      {/* Search Bar & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 border border-[var(--color-border)] rounded-lg">
        <div className="w-full sm:w-80">
          <FormInput
            id="center-search"
            label=""
            placeholder="Search by City, PIN code, or facility name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<MdSearch className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-[var(--color-text-muted)] flex items-center gap-1">
            <MdFilterList className="w-4 h-4" /> Filter:
          </span>
          <span className="px-3 py-1.5 rounded-full bg-blue-50 text-[var(--color-primary)] font-semibold border border-blue-200">
            Delhi / NCR Region ({filteredCenters.length} centers)
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Map Placeholder & Center Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Columns: Center Cards List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {filteredCenters.map((center) => {
            const isSelected = selectedCenter.id === center.id;
            return (
              <div
                key={center.id}
                onClick={() => setSelectedCenter(center)}
                className={`bg-white border rounded-lg p-5 shadow-sm transition-all duration-200 cursor-pointer flex flex-col gap-4 ${
                  isSelected
                    ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/15 shadow-md"
                    : "border-[var(--color-border)] hover:border-slate-400"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                      <MdLocationOn className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[var(--color-text)]">
                          {center.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-[var(--color-accent)] border border-emerald-200 flex items-center gap-1">
                          <MdVerified className="w-3 h-3" /> CPCB Authorized
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] font-mono">
                        Reg: {center.registrationNo}
                      </p>
                      <p className="text-xs text-[var(--color-text)] font-medium mt-1">
                        {center.address}, {center.city} - {center.pinCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 text-xs">
                    <span className="font-bold text-[var(--color-primary)] text-sm">
                      {center.distanceKm} km
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mt-0.5">
                      <MdStar className="w-4 h-4 fill-current" />
                      <span>{center.rating}</span>
                      <span className="text-[var(--color-text-muted)] font-normal">
                        ({center.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                    <MdPhone className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span className="font-medium text-[var(--color-text)]">{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                    <MdAccessTime className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span className="font-medium text-[var(--color-text)]">{center.workingHours}</span>
                  </div>
                </div>

                {/* Accepted Categories Chips */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase mr-1">
                    Accepts:
                  </span>
                  {center.acceptedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[var(--color-text)] text-[10px] font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--color-border-light)] text-xs">
                  <a
                    href={`https://maps.google.com/?q=${center.latitude},${center.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:bg-slate-50 no-underline"
                  >
                    <MdDirections className="w-4 h-4 text-[var(--color-primary)]" />
                    Directions
                  </a>
                  <Link
                    href="/dashboard/schedule-pickup"
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold no-underline shadow"
                  >
                    <MdCalendarMonth className="w-4 h-4" />
                    Book Pickup Here
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Column: Interactive SVG Map Placeholder */}
        <div className="flex flex-col gap-6">
          <DashboardCard title="Recycling Center Map View" subtitle="Delhi / NCR District map">
            <div className="relative w-full h-80 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 flex flex-col justify-between p-4 shadow-inner">
              {/* SVG Grid Map Visual */}
              <svg className="absolute inset-0 w-full h-full opacity-40">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#94A3B8" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Simulated Roads */}
                <path d="M 0 100 Q 150 120 300 80 T 500 200" stroke="#003366" strokeWidth="3" fill="none" opacity="0.6" />
                <path d="M 120 0 Q 180 150 150 300" stroke="#005B96" strokeWidth="2" fill="none" opacity="0.6" />
              </svg>

              {/* Pins */}
              <div className="relative z-10 flex flex-col gap-2">
                <span className="w-fit bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
                  Interactive CPCB GIS Map
                </span>
              </div>

              {/* Active Selected Center Badge on Map */}
              <div className="relative z-10 bg-white/95 backdrop-blur p-3 rounded-lg border border-slate-300 shadow-md flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase">
                  Selected Center:
                </span>
                <span className="text-xs font-bold text-[var(--color-text)]">
                  {selectedCenter.name}
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)]">
                  {selectedCenter.address} ({selectedCenter.distanceKm} km away)
                </span>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
