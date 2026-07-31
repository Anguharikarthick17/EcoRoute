"use client";

import { useState } from "react";
import { AdminSearchBar, AdminStatusBadge } from "@/components/admin";
import { DataTable, CitizenSectionHeader } from "@/components/citizen";
import type { AdminCitizenItem } from "@/types/admin";
import { MdPersonAdd, MdBlock, MdDelete, MdEdit, MdVerifiedUser } from "react-icons/md";

const MOCK_CITIZENS: AdminCitizenItem[] = [
  {
    citizenId: "DL-2026-8941",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.in",
    district: "New Delhi Central",
    registeredDate: "12 Jan 2026",
    totalPickups: 16,
    status: "Active",
  },
  {
    citizenId: "KA-2026-1204",
    name: "Sunita Reddy",
    phone: "+91 98111 22334",
    email: "sunita.r@example.in",
    district: "Bengaluru Urban",
    registeredDate: "05 Feb 2026",
    totalPickups: 8,
    status: "Active",
  },
  {
    citizenId: "MH-2026-4401",
    name: "Amitabh Shah",
    phone: "+91 98200 55443",
    email: "amitabh@example.in",
    district: "Mumbai Suburban",
    registeredDate: "18 Mar 2026",
    totalPickups: 3,
    status: "Pending Verification",
  },
  {
    citizenId: "GJ-2026-9021",
    name: "Priya Patel",
    phone: "+91 98980 11223",
    email: "priya.patel@example.in",
    district: "Ahmedabad",
    registeredDate: "02 Apr 2026",
    totalPickups: 12,
    status: "Active",
  },
  {
    citizenId: "UP-2026-0045",
    name: "Vikas Dubey",
    phone: "+91 94150 99887",
    email: "vikas.d@example.in",
    district: "Kanpur Nagar",
    registeredDate: "10 May 2026",
    totalPickups: 0,
    status: "Suspended",
  },
];

export default function AdminUserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredData = MOCK_CITIZENS.filter((c) => {
    const matchesSearch =
      c.citizenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: "Citizen ID",
      accessor: (row: AdminCitizenItem) => (
        <div className="flex items-center gap-1.5 font-mono font-bold text-[var(--color-primary)]">
          <MdVerifiedUser className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
          {row.citizenId}
        </div>
      ),
    },
    {
      header: "Citizen Name",
      accessor: (row: AdminCitizenItem) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--color-text)]">{row.name}</span>
          <span className="text-[11px] text-[var(--color-text-muted)]">{row.email}</span>
        </div>
      ),
    },
    {
      header: "Phone Number",
      accessor: (row: AdminCitizenItem) => (
        <span className="font-mono text-xs text-[var(--color-text)]">{row.phone}</span>
      ),
    },
    {
      header: "District",
      accessor: (row: AdminCitizenItem) => (
        <span className="text-xs text-[var(--color-text)]">{row.district}</span>
      ),
    },
    {
      header: "Pickups",
      accessor: (row: AdminCitizenItem) => (
        <span className="font-bold text-[var(--color-primary)]">{row.totalPickups}</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: AdminCitizenItem) => <AdminStatusBadge status={row.status} />,
    },
    {
      header: "Actions",
      accessor: (row: AdminCitizenItem) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => alert(`Editing user ${row.citizenId}`)}
            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
            title="Edit User"
          >
            <MdEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert(`Suspending user ${row.citizenId}`)}
            className="p-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800"
            title="Suspend Account"
          >
            <MdBlock className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert(`Deleting user ${row.citizenId}`)}
            className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-700"
            title="Delete Account"
          >
            <MdDelete className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Citizen Directory & User Management"
        subtitle="Manage registered citizen profiles, Aadhaar identity verification, and access controls."
        badge="Citizen Registry"
        action={
          <button
            onClick={() => alert("Manual Citizen Registration Modal")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--color-primary)] text-white text-xs font-bold shadow"
          >
            <MdPersonAdd className="w-4 h-4" />
            Register New Citizen
          </button>
        }
      />

      <AdminSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Citizen ID, Name, Email, District..."
        filters={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded border border-[var(--color-border)] text-xs bg-white"
          >
            {["All", "Active", "Pending Verification", "Suspended"].map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        }
      />

      <DataTable columns={columns} data={filteredData} keyExtractor={(r) => r.citizenId} />
    </div>
  );
}
