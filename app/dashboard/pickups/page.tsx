"use client";

import { useState } from "react";
import Link from "next/link";
import { CitizenSectionHeader, DataTable, StatusBadge } from "@/components/citizen";
import { FormInput } from "@/components/forms";
import type { PickupRequest, PickupStatus } from "@/types/citizen";
import { MdSearch, MdFilterList, MdAdd, MdVisibility, MdTrackChanges } from "react-icons/md";

const MOCK_PICKUPS: PickupRequest[] = [
  {
    id: "REQ-2026-8941",
    deviceName: "HP Pavilion Laptop & 2 Phones",
    category: "Laptops & Mobiles",
    requestDate: "30 Jul 2026",
    pickupDate: "01 Aug 2026",
    timeSlot: "10:00 AM - 01:00 PM",
    status: "Assigned",
    centerName: "EcoRecycle Facility #4",
    centerAddress: "Okhla Industrial Area Phase III, New Delhi",
    address: "Flat 402, Green Park Apartments, Sector 14, New Delhi",
    city: "New Delhi",
    pinCode: "110016",
    estimatedWeight: "12 kg",
  },
  {
    id: "REQ-2026-8812",
    deviceName: "Dell OptiPlex Desktop Tower",
    category: "Desktop Computers",
    requestDate: "24 Jul 2026",
    pickupDate: "27 Jul 2026",
    timeSlot: "02:00 PM - 05:00 PM",
    status: "Completed",
    centerName: "GreenTech Clean Recycling",
    centerAddress: "Mayapuri Industrial Area, Phase II, New Delhi",
    address: "Flat 402, Green Park Apartments, Sector 14, New Delhi",
    city: "New Delhi",
    pinCode: "110016",
    certificateId: "CERT-DL-8902",
    rewardPoints: 50,
    estimatedWeight: "18 kg",
  },
  {
    id: "REQ-2026-8740",
    deviceName: "LG CRT Monitor 17-inch",
    category: "Televisions & Displays",
    requestDate: "18 Jul 2026",
    pickupDate: "20 Jul 2026",
    timeSlot: "10:00 AM - 01:00 PM",
    status: "Recycled",
    centerName: "CPCB Central Facility",
    centerAddress: "East Arjun Nagar, Shahdara, Delhi",
    address: "Flat 402, Green Park Apartments, Sector 14, New Delhi",
    city: "New Delhi",
    pinCode: "110016",
    certificateId: "CERT-DL-8654",
    rewardPoints: 40,
    estimatedWeight: "15 kg",
  },
  {
    id: "REQ-2026-8601",
    deviceName: "Samsung Refrigerator Compressor & Circuit",
    category: "Home Appliances",
    requestDate: "10 Jul 2026",
    pickupDate: "12 Jul 2026",
    timeSlot: "02:00 PM - 05:00 PM",
    status: "Completed",
    centerName: "EcoRecycle Facility #4",
    centerAddress: "Okhla Industrial Area Phase III, New Delhi",
    address: "Flat 402, Green Park Apartments, Sector 14, New Delhi",
    city: "New Delhi",
    pinCode: "110016",
    certificateId: "CERT-DL-8410",
    rewardPoints: 80,
    estimatedWeight: "45 kg",
  },
  {
    id: "REQ-2026-8422",
    deviceName: "Canon InkJet Printer iPs20",
    category: "Printers & Scanners",
    requestDate: "02 Jul 2026",
    pickupDate: "04 Jul 2026",
    timeSlot: "10:00 AM - 01:00 PM",
    status: "Cancelled",
    centerName: "GreenTech Clean Recycling",
    centerAddress: "Mayapuri Industrial Area, Phase II, New Delhi",
    address: "Flat 402, Green Park Apartments, Sector 14, New Delhi",
    city: "New Delhi",
    pinCode: "110016",
    estimatedWeight: "8 kg",
  },
];

export default function MyPickupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredData = MOCK_PICKUPS.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.centerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: "Request ID",
      accessor: (row: PickupRequest) => (
        <span className="font-mono font-bold text-[var(--color-primary)]">
          {row.id}
        </span>
      ),
    },
    {
      header: "Device Name",
      accessor: (row: PickupRequest) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--color-text)]">
            {row.deviceName}
          </span>
          <span className="text-[11px] text-[var(--color-text-muted)]">
            {row.category} ({row.estimatedWeight})
          </span>
        </div>
      ),
    },
    {
      header: "Pickup Date",
      accessor: (row: PickupRequest) => (
        <div className="flex flex-col">
          <span className="font-medium text-[var(--color-text)]">
            {row.pickupDate}
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)]">
            {row.timeSlot}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row: PickupRequest) => <StatusBadge status={row.status} />,
    },
    {
      header: "Assigned Facility",
      accessor: (row: PickupRequest) => (
        <span className="text-xs text-[var(--color-text-muted)] truncate max-w-[160px] block">
          {row.centerName}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row: PickupRequest) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/pickups/${row.id}`}
            className="p-1.5 rounded bg-slate-100 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            title="View Details"
          >
            <MdVisibility className="w-4 h-4" />
          </Link>
          <Link
            href={`/dashboard/tracking?id=${row.id}`}
            className="p-1.5 rounded bg-blue-50 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-colors"
            title="Track Live Status"
          >
            <MdTrackChanges className="w-4 h-4" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="My Pickup Requests"
        subtitle="Track and manage all your scheduled e-waste doorstep collection requests."
        badge="Requests"
        action={
          <Link
            href="/dashboard/schedule-pickup"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-xs font-semibold shadow no-underline"
          >
            <MdAdd className="w-4 h-4" />
            New Pickup Request
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 border border-[var(--color-border)] rounded-lg">
        <div className="w-full sm:w-72">
          <FormInput
            id="pickup-search"
            label=""
            placeholder="Search by ID, device, center..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<MdSearch className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <MdFilterList className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="text-xs font-bold text-[var(--color-text-muted)]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded border border-[var(--color-border)] text-xs bg-white focus:outline-none"
          >
            {["All", "Submitted", "Assigned", "Collected", "Recycled", "Completed", "Cancelled"].map(
              (st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        keyExtractor={(row) => row.id}
      />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pt-2">
        <span>Showing {filteredData.length} of {MOCK_PICKUPS.length} requests</span>
        <div className="flex items-center gap-1">
          <button disabled className="px-3 py-1 rounded border bg-slate-100 opacity-50 cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1 rounded border bg-[var(--color-primary)] text-white font-bold">
            1
          </button>
          <button disabled className="px-3 py-1 rounded border bg-slate-100 opacity-50 cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
