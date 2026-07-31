"use client";

import { useState } from "react";
import { AdminSearchBar, AdminStatusBadge } from "@/components/admin";
import { DataTable, CitizenSectionHeader } from "@/components/citizen";
import type { AdminVehicleItem } from "@/types/admin";
import { MdDirectionsCar, MdAdd, MdBatteryChargingFull, MdBuild } from "react-icons/md";

const MOCK_VEHICLES: AdminVehicleItem[] = [
  {
    id: "V-01",
    vehicleNumber: "DL 01 AB 8941",
    type: "EV Van",
    assignedDriver: "Suresh Verma",
    district: "New Delhi Central",
    currentRoute: "Green Park -> Okhla Phase III",
    status: "On Duty",
    batteryFuelPercent: 88,
    lastMaintenance: "15 Jul 2026",
  },
  {
    id: "V-02",
    vehicleNumber: "KA 01 EV 1204",
    type: "EV Van",
    assignedDriver: "Kiran Kumar",
    district: "Bengaluru Urban",
    currentRoute: "Indiranagar -> Whitefield Hub",
    status: "In Transit",
    batteryFuelPercent: 64,
    lastMaintenance: "20 Jun 2026",
  },
  {
    id: "V-03",
    vehicleNumber: "MH 02 CZ 4401",
    type: "Heavy Hauler",
    assignedDriver: "Ramesh Chand",
    district: "Mumbai Suburban",
    currentRoute: "Andheri Depot",
    status: "Idle",
    batteryFuelPercent: 95,
    lastMaintenance: "02 Jul 2026",
  },
  {
    id: "V-04",
    vehicleNumber: "UP 14 EV 9901",
    type: "EV Van",
    assignedDriver: "Unassigned",
    district: "Gautam Buddha Nagar",
    currentRoute: "Noida Sector 63 Garage",
    status: "Under Maintenance",
    batteryFuelPercent: 12,
    lastMaintenance: "29 Jul 2026",
  },
];

export default function AdminVehicleManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_VEHICLES.filter(
    (v) =>
      v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.assignedDriver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.district.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    {
      header: "Vehicle Number & Type",
      accessor: (row: AdminVehicleItem) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0">
            <MdDirectionsCar className="w-4 h-4" />
          </div>
          <div className="flex flex-col font-mono">
            <span className="font-bold text-[var(--color-primary)]">{row.vehicleNumber}</span>
            <span className="text-[10px] text-slate-500">{row.type}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Assigned Driver",
      accessor: (row: AdminVehicleItem) => (
        <span className="font-semibold text-xs text-[var(--color-text)]">{row.assignedDriver}</span>
      ),
    },
    {
      header: "Current Route",
      accessor: (row: AdminVehicleItem) => (
        <span className="text-xs text-[var(--color-text-muted)] truncate max-w-[180px] block font-medium">
          {row.currentRoute}
        </span>
      ),
    },
    {
      header: "Battery / Fuel",
      accessor: (row: AdminVehicleItem) => (
        <div className="flex items-center gap-2 text-xs">
          <MdBatteryChargingFull className="w-4 h-4 text-emerald-600" />
          <span className="font-bold font-mono text-[var(--color-accent)]">{row.batteryFuelPercent}%</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row: AdminVehicleItem) => <AdminStatusBadge status={row.status} />,
    },
    {
      header: "Actions",
      accessor: (row: AdminVehicleItem) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => alert(`Assigning route for ${row.vehicleNumber}`)}
            className="px-2.5 py-1 rounded bg-[var(--color-primary)] text-white text-[11px] font-bold"
          >
            Assign Route
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="EV Fleet & Vehicle Management"
        subtitle="Track EV collection vans, heavy haulers, battery charge levels, and maintenance schedules."
        badge="Fleet Control"
        action={
          <button
            onClick={() => alert("Add Vehicle Form")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--color-primary)] text-white text-xs font-bold shadow"
          >
            <MdAdd className="w-4 h-4" />
            Add Vehicle
          </button>
        }
      />

      <AdminSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Vehicle Number, Driver, District..."
      />

      <DataTable columns={columns} data={filtered} keyExtractor={(r) => r.id} />
    </div>
  );
}
