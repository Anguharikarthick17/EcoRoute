"use client";

import Link from "next/link";
import {
  AdminStatCard,
  AdminStatusBadge,
} from "@/components/admin";
import { DashboardCard, DataTable } from "@/components/citizen";
import {
  MdPeople,
  MdHourglassEmpty,
  MdCheckCircle,
  MdBusiness,
  MdLocationOn,
  MdDirectionsCar,
  MdPersonOutline,
  MdReportProblem,
  MdArrowForward,
  MdCampaign,
  MdTrendingUp,
} from "react-icons/md";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-lg p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-fit px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 font-mono">
              Central Executive Portal
            </span>
            <span className="text-xs text-white/70">CPCB Headquarters · New Delhi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            National E-Waste Operations Center
          </h1>
          <p className="text-sm text-white/80 max-w-2xl">
            Real-time monitoring of citizen requests, fleet dispatch, authorized recyclers, and AI image classification systems across India.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/reports"
            className="px-4 py-2.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow no-underline"
          >
            Export National Report
          </Link>
          <Link
            href="/admin/announcements"
            className="px-4 py-2.5 rounded bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs no-underline"
          >
            Issue Directive
          </Link>
        </div>
      </div>

      {/* 8 Executive Stat Cards Grid */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          National Executive Metrics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <AdminStatCard
            title="Citizens"
            value="12,850"
            subtitle="Active Profiles"
            icon={<MdPeople className="w-5 h-5" />}
          />
          <AdminStatCard
            title="Pending"
            value="34"
            subtitle="Awaiting Dispatch"
            icon={<MdHourglassEmpty className="w-5 h-5" />}
            iconBg="bg-amber-50"
            iconColor="text-amber-700"
          />
          <AdminStatCard
            title="Completed"
            value="14,280"
            subtitle="Recycled Pickups"
            icon={<MdCheckCircle className="w-5 h-5" />}
            iconBg="bg-green-50"
            iconColor="text-[var(--color-accent)]"
          />
          <AdminStatCard
            title="Recyclers"
            value="350"
            subtitle="Licensed Facilities"
            icon={<MdBusiness className="w-5 h-5" />}
            iconBg="bg-blue-50"
            iconColor="text-[var(--color-secondary)]"
          />
          <AdminStatCard
            title="Centers"
            value="42"
            subtitle="Collection Points"
            icon={<MdLocationOn className="w-5 h-5" />}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-700"
          />
          <AdminStatCard
            title="Vehicles"
            value="85"
            subtitle="EV Clean Fleet"
            icon={<MdDirectionsCar className="w-5 h-5" />}
            iconBg="bg-teal-50"
            iconColor="text-teal-700"
          />
          <AdminStatCard
            title="Drivers"
            value="92"
            subtitle="Active Personnel"
            icon={<MdPersonOutline className="w-5 h-5" />}
            iconBg="bg-slate-100"
            iconColor="text-slate-700"
          />
          <AdminStatCard
            title="Complaints"
            value="4"
            subtitle="Open Grievances"
            icon={<MdReportProblem className="w-5 h-5" />}
            iconBg="bg-red-50"
            iconColor="text-[var(--color-danger)]"
          />
        </div>
      </div>

      {/* SVG Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 2 Columns: Monthly Pickups Bar Chart & District Wise Distribution */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <DashboardCard
            title="Monthly Nationwide E-Waste Pickups (Metric Tonnes)"
            subtitle="Aggregate volume collected and processed under CPCB EPR Framework"
            action={
              <span className="text-xs font-bold text-[var(--color-accent)] bg-green-50 border border-green-200 px-2.5 py-1 rounded">
                +14.2% Growth YoY
              </span>
            }
          >
            <div className="w-full pt-4">
              <svg viewBox="0 0 500 180" className="w-full h-48 overflow-visible">
                <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="100" x2="480" y2="100" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="140" x2="480" y2="140" stroke="#CBD5E1" />

                <text x="30" y="24" textAnchor="end" fill="#64748B" fontSize="10">250T</text>
                <text x="30" y="64" textAnchor="end" fill="#64748B" fontSize="10">150T</text>
                <text x="30" y="104" textAnchor="end" fill="#64748B" fontSize="10">50T</text>
                <text x="30" y="144" textAnchor="end" fill="#64748B" fontSize="10">0T</text>

                {[
                  { month: "Jan", val: 120, height: 60, x: 60 },
                  { month: "Feb", val: 145, height: 72, x: 130 },
                  { month: "Mar", val: 180, height: 90, x: 200 },
                  { month: "Apr", val: 210, height: 105, x: 270 },
                  { month: "May", val: 195, height: 98, x: 340 },
                  { month: "Jun", val: 240, height: 120, x: 410 },
                ].map((b) => (
                  <g key={b.month} className="group cursor-pointer">
                    <rect
                      x={b.x}
                      y={140 - b.height}
                      width="40"
                      height={b.height}
                      rx="3"
                      fill="#003366"
                      className="hover:fill-[#005B96] transition-colors"
                    />
                    <text
                      x={b.x + 20}
                      y={132 - b.height}
                      textAnchor="middle"
                      fill="#1E293B"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {b.val}T
                    </text>
                    <text
                      x={b.x + 20}
                      y="160"
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize="11"
                    >
                      {b.month}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </DashboardCard>

          {/* District Wise Collection & Recycling Success Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DashboardCard title="Top Performing Districts" subtitle="Collection efficiency ranking">
              <div className="flex flex-col gap-3 text-xs">
                {[
                  { dist: "New Delhi Central", pct: 92, weight: "420 Tonnes" },
                  { dist: "Bengaluru Urban", pct: 88, weight: "380 Tonnes" },
                  { dist: "Mumbai Suburban", pct: 84, weight: "350 Tonnes" },
                  { dist: "Chennai South", pct: 79, weight: "290 Tonnes" },
                ].map((d, i) => (
                  <div key={d.dist} className="flex flex-col gap-1">
                    <div className="flex justify-between font-semibold text-[var(--color-text)]">
                      <span>#{i + 1} {d.dist}</span>
                      <span className="font-mono text-[var(--color-text-muted)]">{d.weight}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[var(--color-primary)] rounded-full" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Recycling Success Rate" subtitle="Compliance audit">
              <div className="flex flex-col items-center text-center gap-3 py-2">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-500 border-t-emerald-200 flex items-center justify-center font-extrabold text-2xl text-[var(--color-accent)] shadow-xs">
                  95.8%
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  95.8% of collected e-waste safely recycled into raw manufacturing materials without landfill leakage.
                </p>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* 1 Column: Government Alerts & Live Requests Table */}
        <div className="flex flex-col gap-6">
          <DashboardCard title="Government System Directives" subtitle="CPCB Nodal Alerts">
            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                <MdReportProblem className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-red-900">Priority Audit Notice</span>
                  <p className="text-red-800 text-[11px] mt-0.5">
                    Unverified recycler flagged in Noida Sector 63. Inspection team dispatched.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded flex items-start gap-2">
                <MdCampaign className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-[var(--color-primary)]">AI Model Update Deployed</span>
                  <p className="text-[var(--color-text-muted)] text-[11px] mt-0.5">
                    Vision AI Model v2.4 active. Accuracy increased to 98.2%.
                  </p>
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Live Request Dispatch"
            action={
              <Link href="/admin/pickups" className="text-xs font-semibold text-[var(--color-secondary)] hover:underline">
                View All →
              </Link>
            }
          >
            <div className="flex flex-col gap-3 text-xs">
              {[
                { id: "REQ-2026-8941", citizen: "Rajesh Kumar", dist: "New Delhi", status: "Assigned" },
                { id: "REQ-2026-8940", citizen: "Sunita Reddy", dist: "Bengaluru", status: "Approved" },
                { id: "REQ-2026-8939", citizen: "Amitabh Shah", dist: "Mumbai", status: "Submitted" },
              ].map((r) => (
                <div key={r.id} className="p-2.5 bg-slate-50 border rounded flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-[var(--color-primary)]">{r.id}</span>
                    <span className="text-[11px] text-[var(--color-text)] font-medium">{r.citizen} ({r.dist})</span>
                  </div>
                  <AdminStatusBadge status={r.status} size="sm" />
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
