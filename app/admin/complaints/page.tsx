"use client";

import { useState } from "react";
import { AdminSearchBar, AdminStatusBadge } from "@/components/admin";
import { DataTable, CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import type { AdminComplaintItem } from "@/types/admin";
import { MdReportProblem, MdFilterList, MdCheckCircle } from "react-icons/md";

const MOCK_COMPLAINTS: AdminComplaintItem[] = [
  {
    complaintId: "TKT-2026-4412",
    citizenName: "Rajesh Kumar",
    category: "Pickup Delay",
    priority: "High",
    assignedOfficer: "Anil Kumar, IAS",
    dateFiled: "30 Jul 2026",
    status: "In Progress",
    description: "Agent arrived 30 minutes past scheduled time window.",
  },
  {
    complaintId: "TKT-2026-4390",
    citizenName: "Meena Gupta",
    category: "Certificate Error",
    priority: "Normal",
    assignedOfficer: "Sushma Swaraj",
    dateFiled: "28 Jul 2026",
    status: "Resolved",
    description: "Weight misspelled on CPCB Certificate PDF.",
  },
  {
    complaintId: "TKT-2026-4320",
    citizenName: "Vikas Dubey",
    category: "Illegal Dumping",
    priority: "Critical",
    assignedOfficer: "Anil Kumar, IAS",
    dateFiled: "25 Jul 2026",
    status: "Escalated",
    description: "Illegal burning of circuit boards reported in Kanpur Industrial Area.",
  },
];

export default function AdminComplaintManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = MOCK_COMPLAINTS.filter((c) => {
    const matchesSearch =
      c.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: "Ticket ID & Date",
      accessor: (row: AdminComplaintItem) => (
        <div className="flex flex-col font-mono">
          <span className="font-bold text-[var(--color-primary)]">{row.complaintId}</span>
          <span className="text-[10px] text-slate-500">{row.dateFiled}</span>
        </div>
      ),
    },
    {
      header: "Citizen",
      accessor: (row: AdminComplaintItem) => (
        <span className="font-bold text-xs text-[var(--color-text)]">{row.citizenName}</span>
      ),
    },
    {
      header: "Category & Description",
      accessor: (row: AdminComplaintItem) => (
        <div className="flex flex-col text-xs">
          <span className="font-semibold text-[var(--color-text)]">{row.category}</span>
          <span className="text-[11px] text-[var(--color-text-muted)] truncate max-w-[200px] block">
            {row.description}
          </span>
        </div>
      ),
    },
    {
      header: "Priority",
      accessor: (row: AdminComplaintItem) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            row.priority === "Critical"
              ? "bg-red-100 text-red-900 font-extrabold"
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
      header: "Assigned Officer",
      accessor: (row: AdminComplaintItem) => (
        <span className="text-xs text-[var(--color-text)]">{row.assignedOfficer}</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: AdminComplaintItem) => <AdminStatusBadge status={row.status} />,
    },
    {
      header: "Actions",
      accessor: (row: AdminComplaintItem) => (
        <button
          onClick={() => alert(`Resolving ticket ${row.complaintId}`)}
          className="px-2.5 py-1 rounded bg-[var(--color-primary)] text-white text-[11px] font-bold"
        >
          Resolve
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Grievance Redressal & Complaint Desk"
        subtitle="Public grievance monitoring integrated with CPGRAMS government portal."
        badge="CPGRAMS Desk"
      />

      <AdminSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Ticket ID, Citizen, Category..."
        filters={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded border border-[var(--color-border)] text-xs bg-white"
          >
            {["All", "Open", "In Progress", "Escalated", "Resolved"].map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        }
      />

      <DataTable columns={columns} data={filtered} keyExtractor={(r) => r.complaintId} />
    </div>
  );
}
