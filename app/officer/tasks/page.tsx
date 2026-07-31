"use client";

import { useState } from "react";
import { CitizenSectionHeader, DashboardCard, StatusBadge } from "@/components/citizen";
import { AdminSearchBar } from "@/components/admin";
import { MdShield, MdCheckCircle, MdAssignmentInd, MdLocalShipping } from "react-icons/md";

const MOCK_TASKS = [
  { id: "TSK-01", title: "Approve 4 Pickup Requests", zone: "Okhla Phase III", priority: "High", status: "Pending" },
  { id: "TSK-02", title: "Verify Recycler Capacity Audit", zone: "Green Park Circle", priority: "Normal", status: "Completed" },
  { id: "TSK-03", title: "Dispatch EV Van #DL-01-AB-8941", zone: "Hauz Khas Enclave", priority: "Urgent", status: "In Progress" },
];

export default function OfficerTasksPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_TASKS.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.zone.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <CitizenSectionHeader
        title="Field Officer Duty Tasks"
        subtitle="Manage daily officer task assignments, verification queues, and field inspection logs."
        badge="Duty Roster"
      />

      <AdminSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Task Title, Zone..."
      />

      <div className="flex flex-col gap-3 text-xs">
        {filtered.map((t) => (
          <DashboardCard key={t.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-blue-50 text-[var(--color-primary)] flex items-center justify-center font-bold shrink-0">
                <MdShield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-[var(--color-primary)] text-[11px]">{t.id}</span>
                <span className="font-bold text-[var(--color-text)] text-sm">{t.title}</span>
                <span className="text-[11px] text-[var(--color-text-muted)]">Zone: {t.zone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={t.status} size="sm" />
              <button
                onClick={() => alert(`Marked task ${t.id} as completed`)}
                className="px-3 py-1.5 rounded bg-[var(--color-primary)] text-white font-bold"
              >
                Complete Task
              </button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
