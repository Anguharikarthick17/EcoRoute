"use client";

import { useState } from "react";
import { AdminSearchBar, AdminStatusBadge } from "@/components/admin";
import { DataTable, CitizenSectionHeader } from "@/components/citizen";
import type { AdminRecyclerItem } from "@/types/admin";
import { MdBusiness, MdCheck, MdBlock, MdVerified, MdAdd } from "react-icons/md";

const MOCK_RECYCLERS: AdminRecyclerItem[] = [
  {
    id: "REC-DL-098",
    companyName: "EcoRecycle Facility #4",
    licenseNo: "CPCB/EWR/2024/DL-098",
    address: "Okhla Industrial Area Phase III, New Delhi",
    district: "New Delhi Central",
    contactPerson: "Dr. Suresh Varma",
    phone: "+91 11 2638 9012",
    email: "okhla@ecorecycle.gov.in",
    capacityTonnes: 500,
    monthlyLoadTonnes: 320,
    status: "Approved",
    verified: true,
  },
  {
    id: "REC-DL-045",
    companyName: "GreenTech Clean Recycling Pvt Ltd",
    licenseNo: "CPCB/EWR/2023/DL-045",
    address: "Mayapuri Industrial Area Phase II, New Delhi",
    district: "West Delhi",
    contactPerson: "Rajesh Shrivastava",
    phone: "+91 11 2811 4567",
    email: "mayapuri@greentech.org.in",
    capacityTonnes: 350,
    monthlyLoadTonnes: 210,
    status: "Approved",
    verified: true,
  },
  {
    id: "REC-UP-112",
    companyName: "Noida CleanTech E-Waste Hub",
    licenseNo: "CPCB/EWR/2025/UP-112",
    address: "Sector 63, Block B-4, Noida",
    district: "Gautam Buddha Nagar",
    contactPerson: "Alok Saxena",
    phone: "+91 120 456 7890",
    email: "noida@cleantech.org.in",
    capacityTonnes: 400,
    monthlyLoadTonnes: 180,
    status: "Pending Approval",
    verified: false,
  },
];

export default function AdminRecyclerManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_RECYCLERS.filter(
    (r) =>
      r.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.licenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.district.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    {
      header: "License & Company",
      accessor: (row: AdminRecyclerItem) => (
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded bg-[var(--color-primary)] text-white font-bold flex items-center justify-center shrink-0 text-xs">
            <MdBusiness className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[var(--color-text)]">{row.companyName}</span>
            <span className="text-[10px] font-mono text-[var(--color-primary)]">{row.licenseNo}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: (row: AdminRecyclerItem) => (
        <span className="text-xs text-[var(--color-text)]">{row.district}</span>
      ),
    },
    {
      header: "Contact Nodal",
      accessor: (row: AdminRecyclerItem) => (
        <div className="flex flex-col text-xs">
          <span className="font-semibold text-[var(--color-text)]">{row.contactPerson}</span>
          <span className="text-[10px] text-[var(--color-text-muted)]">{row.phone}</span>
        </div>
      ),
    },
    {
      header: "Capacity Load",
      accessor: (row: AdminRecyclerItem) => (
        <div className="flex flex-col text-xs">
          <span className="font-bold text-[var(--color-accent)]">{row.monthlyLoadTonnes} / {row.capacityTonnes} T</span>
          <span className="text-[10px] text-[var(--color-text-muted)] font-mono">Monthly Capacity</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row: AdminRecyclerItem) => <AdminStatusBadge status={row.status} />,
    },
    {
      header: "Actions",
      accessor: (row: AdminRecyclerItem) => (
        <div className="flex items-center gap-1.5">
          {row.status === "Pending Approval" ? (
            <button
              onClick={() => alert(`Approved license ${row.licenseNo}`)}
              className="px-2.5 py-1 rounded bg-[var(--color-accent)] text-white text-[11px] font-bold shadow"
            >
              Approve License
            </button>
          ) : (
            <button
              onClick={() => alert(`Suspending license ${row.licenseNo}`)}
              className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200"
            >
              Suspend
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Authorized Recycler Registry"
        subtitle="Manage CPCB-licensed recycling facilities, capacity quotas, and compliance approvals."
        badge="Recycler Network"
        action={
          <button
            onClick={() => alert("Add Recycler Facility Form")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--color-primary)] text-white text-xs font-bold shadow"
          >
            <MdAdd className="w-4 h-4" />
            Add Recycler Facility
          </button>
        }
      />

      <AdminSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Facility, License No, District..."
      />

      <DataTable columns={columns} data={filtered} keyExtractor={(r) => r.id} />
    </div>
  );
}
