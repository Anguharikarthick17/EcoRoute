"use client";

import { useState } from "react";
import { AdminSearchBar, AdminStatusBadge } from "@/components/admin";
import { DataTable, CitizenSectionHeader } from "@/components/citizen";
import type { AdminPickupItem } from "@/types/admin";
import { MdCheck, MdAssignmentInd, MdFilterList, MdFileDownload } from "react-icons/md";

const MOCK_ADMIN_PICKUPS: AdminPickupItem[] = [
  {
    requestId: "REQ-2026-8941",
    citizenName: "Rajesh Kumar",
    citizenPhone: "+91 98765 43210",
    deviceSummary: "HP Pavilion Laptop & 2 Mobiles",
    address: "Green Park, Sector 14, New Delhi",
    district: "New Delhi",
    requestDate: "30 Jul 2026",
    pickupDate: "01 Aug 2026",
    assignedDriver: "Suresh Verma",
    assignedVehicle: "DL 01 AB 8941",
    assignedRecycler: "EcoRecycle Facility #4",
    priority: "High",
    status: "Assigned",
    weightKg: 12,
  },
  {
    requestId: "REQ-2026-8940",
    citizenName: "Sunita Reddy",
    citizenPhone: "+91 98111 22334",
    deviceSummary: "Dell Desktop & CRT Monitor",
    address: "Indiranagar 10th Main, Bengaluru",
    district: "Bengaluru Urban",
    requestDate: "30 Jul 2026",
    pickupDate: "02 Aug 2026",
    assignedDriver: "Kiran Kumar",
    assignedVehicle: "KA 01 EV 1204",
    assignedRecycler: "CleanTech E-Waste Hub",
    priority: "Normal",
    status: "Approved",
    weightKg: 24,
  },
  {
    requestId: "REQ-2026-8939",
    citizenName: "Amitabh Shah",
    citizenPhone: "+91 98200 55443",
    deviceSummary: "Samsung Refrigerator Circuit",
    address: "Andheri West, Mumbai",
    district: "Mumbai Suburban",
    requestDate: "29 Jul 2026",
    pickupDate: "01 Aug 2026",
    assignedDriver: "Unassigned",
    assignedVehicle: "Unassigned",
    assignedRecycler: "Maharashtra Recyclers Ltd",
    priority: "Urgent",
    status: "Submitted",
    weightKg: 45,
  },
  {
    requestId: "REQ-2026-8812",
    citizenName: "Priya Patel",
    citizenPhone: "+91 98980 11223",
    deviceSummary: "Canon Laser Printer & Toner",
    address: "C.G. Road, Ahmedabad",
    district: "Ahmedabad",
    requestDate: "24 Jul 2026",
    pickupDate: "27 Jul 2026",
    assignedDriver: "Vijay Solanki",
    assignedVehicle: "GJ 01 EV 8890",
    assignedRecycler: "Gujarat Green Recyclers",
    priority: "Normal",
    status: "Completed",
    weightKg: 18,
  },
];

export default function AdminPickupManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = MOCK_ADMIN_PICKUPS.filter((p) => {
    const matchesSearch =
      p.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const columns = [
    {
      header: "Select",
      accessor: (row: AdminPickupItem) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.requestId)}
          onChange={() => toggleSelect(row.requestId)}
          className="w-4 h-4 rounded border-slate-300 accent-[var(--color-primary)]"
        />
      ),
    },
    {
      header: "Request ID & Date",
      accessor: (row: AdminPickupItem) => (
        <div className="flex flex-col">
          <span className="font-mono font-bold text-[var(--color-primary)]">
            {row.requestId}
          </span>
          <span className="text-[11px] text-[var(--color-text-muted)]">
            {row.requestDate}
          </span>
        </div>
      ),
    },
    {
      header: "Citizen Details",
      accessor: (row: AdminPickupItem) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--color-text)]">
            {row.citizenName}
          </span>
          <span className="text-[11px] text-[var(--color-text-muted)]">
            {row.district} · {row.citizenPhone}
          </span>
        </div>
      ),
    },
    {
      header: "Device Summary",
      accessor: (row: AdminPickupItem) => (
        <span className="text-xs font-medium text-[var(--color-text)] truncate max-w-[160px] block">
          {row.deviceSummary} ({row.weightKg} kg)
        </span>
      ),
    },
    {
      header: "Assigned Driver & Van",
      accessor: (row: AdminPickupItem) => (
        <div className="flex flex-col text-xs">
          <span className="font-semibold text-[var(--color-text)]">
            {row.assignedDriver}
          </span>
          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
            {row.assignedVehicle}
          </span>
        </div>
      ),
    },
    {
      header: "Priority",
      accessor: (row: AdminPickupItem) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            row.priority === "Urgent"
              ? "bg-red-100 text-red-800"
              : row.priority === "High"
                ? "bg-amber-100 text-amber-900"
                : "bg-slate-100 text-slate-700"
          }`}
        >
          {row.priority}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (row: AdminPickupItem) => (
        <AdminStatusBadge status={row.status} />
      ),
    },
    {
      header: "Actions",
      accessor: (row: AdminPickupItem) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => alert(`Approving request ${row.requestId}`)}
            className="px-2 py-1 rounded bg-[var(--color-primary)] text-white text-[11px] font-bold hover:bg-[var(--color-primary-dark)]"
          >
            Approve
          </button>
          <button
            onClick={() => alert(`Assigning driver for ${row.requestId}`)}
            className="px-2 py-1 rounded bg-slate-100 text-[var(--color-text)] text-[11px] font-semibold hover:bg-slate-200"
          >
            Dispatch
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Nationwide Pickup Management"
        subtitle="Review, approve, and dispatch doorstep collection requests across all districts."
        badge="Operations"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Exporting ${selectedIds.length} items to CSV`)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[var(--color-border)] text-xs font-semibold bg-white hover:bg-slate-50"
            >
              <MdFileDownload className="w-4 h-4" />
              Export Selected ({selectedIds.length})
            </button>
          </div>
        }
      />

      {/* Bulk Action Bar if selected */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center justify-between gap-4 text-xs">
          <span className="font-bold text-[var(--color-primary)]">
            {selectedIds.length} Requests Selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Bulk approving ${selectedIds.length} requests`)}
              className="px-3 py-1.5 rounded bg-[var(--color-accent)] text-white font-bold"
            >
              Bulk Approve Selected
            </button>
            <button
              onClick={() => alert(`Bulk assigning driver for ${selectedIds.length} requests`)}
              className="px-3 py-1.5 rounded bg-[var(--color-primary)] text-white font-bold"
            >
              Assign Fleet Driver
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <AdminSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Request ID, Citizen Name, District..."
        filters={
          <div className="flex items-center gap-2">
            <MdFilterList className="w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded border border-[var(--color-border)] text-xs bg-white"
            >
              {["All", "Submitted", "Approved", "Assigned", "Collected", "Completed"].map(
                (st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ),
              )}
            </select>
          </div>
        }
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        keyExtractor={(row) => row.requestId}
      />
    </div>
  );
}
