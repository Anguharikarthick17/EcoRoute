"use client";

import { useState } from "react";
import { AdminSearchBar, AdminStatusBadge } from "@/components/admin";
import { DataTable, CitizenSectionHeader } from "@/components/citizen";
import type { AdminDriverItem } from "@/types/admin";
import { MdPersonAdd, MdStar, MdPhone, MdAssignmentInd } from "react-icons/md";

const MOCK_DRIVERS: AdminDriverItem[] = [
  {
    id: "DRV-01",
    driverName: "Suresh Verma",
    assignedVehicle: "DL 01 AB 8941",
    phone: "+91 98112 34567",
    district: "New Delhi Central",
    assignedPickupsCount: 6,
    completedToday: 2,
    availability: "On Route",
    rating: 4.9,
  },
  {
    id: "DRV-02",
    driverName: "Kiran Kumar",
    assignedVehicle: "KA 01 EV 1204",
    phone: "+91 98450 11223",
    district: "Bengaluru Urban",
    assignedPickupsCount: 4,
    completedToday: 1,
    availability: "On Route",
    rating: 4.8,
  },
  {
    id: "DRV-03",
    driverName: "Ramesh Chand",
    assignedVehicle: "MH 02 CZ 4401",
    phone: "+91 98210 99887",
    district: "Mumbai Suburban",
    assignedPickupsCount: 0,
    completedToday: 5,
    availability: "Available",
    rating: 4.7,
  },
  {
    id: "DRV-04",
    driverName: "Vijay Solanki",
    assignedVehicle: "GJ 01 EV 8890",
    phone: "+91 98981 77665",
    district: "Ahmedabad",
    assignedPickupsCount: 0,
    completedToday: 0,
    availability: "Off Duty",
    rating: 4.6,
  },
];

export default function AdminDriverManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_DRIVERS.filter(
    (d) =>
      d.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.assignedVehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.district.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    {
      header: "Driver Name & ID",
      accessor: (row: AdminDriverItem) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--color-text)]">{row.driverName}</span>
          <span className="text-[10px] font-mono text-[var(--color-primary)]">{row.id}</span>
        </div>
      ),
    },
    {
      header: "Vehicle Assigned",
      accessor: (row: AdminDriverItem) => (
        <span className="font-mono text-xs font-semibold text-[var(--color-text)]">{row.assignedVehicle}</span>
      ),
    },
    {
      header: "Contact",
      accessor: (row: AdminDriverItem) => (
        <span className="text-xs text-[var(--color-text)] flex items-center gap-1">
          <MdPhone className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          {row.phone}
        </span>
      ),
    },
    {
      header: "Duty Progress",
      accessor: (row: AdminDriverItem) => (
        <div className="flex flex-col text-xs">
          <span className="font-bold text-[var(--color-primary)]">{row.completedToday} / {row.assignedPickupsCount} Completed</span>
          <span className="text-[10px] text-slate-500">Today's Dispatch</span>
        </div>
      ),
    },
    {
      header: "Rating",
      accessor: (row: AdminDriverItem) => (
        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
          <MdStar className="w-4 h-4 fill-current" />
          <span>{row.rating}</span>
        </div>
      ),
    },
    {
      header: "Availability",
      accessor: (row: AdminDriverItem) => <AdminStatusBadge status={row.availability} />,
    },
    {
      header: "Actions",
      accessor: (row: AdminDriverItem) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => alert(`Dispatching task to ${row.driverName}`)}
            className="px-2.5 py-1 rounded bg-[var(--color-primary)] text-white text-[11px] font-bold"
          >
            Assign Task
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Driver & Agent Directory"
        subtitle="Manage certified field pickup agents, daily task allocations, and rating performance."
        badge="Field Personnel"
        action={
          <button
            onClick={() => alert("Add Driver Registration Form")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--color-primary)] text-white text-xs font-bold shadow"
          >
            <MdPersonAdd className="w-4 h-4" />
            Add Field Agent
          </button>
        }
      />

      <AdminSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Driver Name, Vehicle, District..."
      />

      <DataTable columns={columns} data={filtered} keyExtractor={(r) => r.id} />
    </div>
  );
}
