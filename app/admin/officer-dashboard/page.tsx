"use client";

import Link from "next/link";
import { AdminStatCard, AdminStatusBadge } from "@/components/admin";
import { DashboardCard, DataTable } from "@/components/citizen";
import {
  MdShield,
  MdCheckCircle,
  MdHourglassEmpty,
  MdLocalShipping,
  MdDirectionsCar,
  MdAssignmentInd,
  MdMap,
  MdCheck,
} from "react-icons/md";

export default function OfficerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Officer Header */}
      <div className="bg-white border border-[var(--color-border)] rounded-lg p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-[var(--color-primary)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center font-bold text-xl shrink-0">
            <MdShield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[var(--color-text)]">
                Field Officer Terminal — New Delhi Central
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-[var(--color-accent)] border border-emerald-200">
                Shift Active
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Officer Code: <span className="font-mono font-bold">OFF-DL-402</span> · Duty Zone: Okhla & Green Park Circle
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded bg-[var(--color-primary)] text-white font-semibold text-xs hover:bg-[var(--color-primary-dark)]">
            + Quick Dispatch
          </button>
        </div>
      </div>

      {/* Officer Quick Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <AdminStatCard
          title="Today's Pickups"
          value="18"
          subtitle="Scheduled Total"
          icon={<MdLocalShipping className="w-5 h-5" />}
        />
        <AdminStatCard
          title="Assigned"
          value="12"
          subtitle="Drivers Active"
          icon={<MdAssignmentInd className="w-5 h-5" />}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-700"
        />
        <AdminStatCard
          title="Completed"
          value="6"
          subtitle="Verified Received"
          icon={<MdCheckCircle className="w-5 h-5" />}
          iconBg="bg-green-50"
          iconColor="text-[var(--color-accent)]"
        />
        <AdminStatCard
          title="Pending"
          value="4"
          subtitle="Awaiting Approval"
          icon={<MdHourglassEmpty className="w-5 h-5" />}
          iconBg="bg-amber-50"
          iconColor="text-amber-700"
        />
        <AdminStatCard
          title="Facility Load"
          value="4.2 T"
          subtitle="EcoRecycle #4"
          icon={<MdShield className="w-5 h-5" />}
          iconBg="bg-teal-50"
          iconColor="text-teal-700"
        />
        <AdminStatCard
          title="Fleet Status"
          value="8 EV"
          subtitle="100% Operational"
          icon={<MdDirectionsCar className="w-5 h-5" />}
          iconBg="bg-emerald-50"
          iconColor="text-[var(--color-accent)]"
        />
      </div>

      {/* Officer Quick Action Bar */}
      <DashboardCard title="Field Operations Quick Actions">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-left flex flex-col gap-2 hover:bg-blue-100/70 transition-colors">
            <MdCheck className="w-6 h-6 text-[var(--color-primary)]" />
            <div>
              <h4 className="text-xs font-bold text-[var(--color-primary)]">Approve Pickups</h4>
              <p className="text-[11px] text-[var(--color-text-muted)]">Validate 4 pending requests</p>
            </div>
          </button>

          <button className="p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-left flex flex-col gap-2 hover:bg-indigo-100/70 transition-colors">
            <MdAssignmentInd className="w-6 h-6 text-indigo-700" />
            <div>
              <h4 className="text-xs font-bold text-indigo-900">Assign Driver</h4>
              <p className="text-[11px] text-[var(--color-text-muted)]">Dispatch driver & van</p>
            </div>
          </button>

          <button className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-left flex flex-col gap-2 hover:bg-emerald-100/70 transition-colors">
            <MdMap className="w-6 h-6 text-[var(--color-accent)]" />
            <div>
              <h4 className="text-xs font-bold text-[var(--color-accent)]">View GIS Map</h4>
              <p className="text-[11px] text-[var(--color-text-muted)]">Track active EV vans</p>
            </div>
          </button>

          <button className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-left flex flex-col gap-2 hover:bg-amber-100/70 transition-colors">
            <MdHourglassEmpty className="w-6 h-6 text-amber-700" />
            <div>
              <h4 className="text-xs font-bold text-amber-900">Update Status</h4>
              <p className="text-[11px] text-[var(--color-text-muted)]">Log facility arrival</p>
            </div>
          </button>
        </div>
      </DashboardCard>

      {/* Duty Queue Table */}
      <DashboardCard title="Today's Officer Duty Queue (Zone 4)">
        <div className="flex flex-col gap-3 text-xs">
          {[
            { id: "REQ-2026-8941", citizen: "Rajesh Kumar", addr: "Green Park, Sector 14", driver: "Suresh Verma", status: "Assigned" },
            { id: "REQ-2026-8940", citizen: "Meena Gupta", addr: "Hauz Khas Enclave", driver: "Ramesh Chand", status: "Collected" },
            { id: "REQ-2026-8939", citizen: "Pankaj Sharma", addr: "Malviya Nagar", driver: "Unassigned", status: "Approved" },
          ].map((item) => (
            <div key={item.id} className="p-3 bg-slate-50 border rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="font-mono font-bold text-[var(--color-primary)]">{item.id}</span>
                <span className="font-semibold text-[var(--color-text)]">{item.citizen} ({item.addr})</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-600">Driver: <strong>{item.driver}</strong></span>
                <AdminStatusBadge status={item.status} size="sm" />
                <button className="px-3 py-1 rounded bg-[var(--color-primary)] text-white text-[11px] font-bold">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
