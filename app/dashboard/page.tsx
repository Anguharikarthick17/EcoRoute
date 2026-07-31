"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  StatCard,
  DashboardCard,
  CitizenSectionHeader,
  StatusBadge,
} from "@/components/citizen";
import {
  MdLocalShipping,
  MdCheckCircle,
  MdHourglassEmpty,
  MdEmojiEvents,
  MdVerified,
  MdCalendarMonth,
  MdCloudUpload,
  MdLocationOn,
  MdTrackChanges,
  MdCampaign,
  MdArrowForward,
} from "react-icons/md";

import { useState, useEffect } from "react";

export default function UserDashboardPage() {
  const [userProfile, setUserProfile] = useState({
    fullName: "Rajesh Kumar",
    citizenId: "DL-2026-8941",
    city: "New Delhi",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ecoroute_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName || parsed.name) {
            setUserProfile((prev) => ({
              ...prev,
              fullName: parsed.fullName || parsed.name,
              citizenId: parsed.citizenId || prev.citizenId,
              city: parsed.city || prev.city,
            }));
          }
        } catch (e) {}
      }
    }

    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profile) {
          setUserProfile({
            fullName: data.profile.fullName || "Rajesh Kumar",
            citizenId: data.profile.citizenId || "DL-2026-8941",
            city: data.profile.city || "New Delhi",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* ── Welcome Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <MdVerified className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="w-fit px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white">
              Official Citizen Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {userProfile.fullName}
            </h1>
            <p className="text-sm text-white/80 max-w-xl">
              Citizen ID: <span className="font-mono font-semibold">{userProfile.citizenId}</span> · 
              {userProfile.city} District. You have saved <strong className="text-white font-bold">142 kg CO₂</strong> to date!
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/schedule-pickup"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-xs font-semibold shadow transition-all no-underline"
            >
              <MdCalendarMonth className="w-4 h-4" />
              Schedule Pickup
            </Link>
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-white text-[var(--color-primary)] hover:bg-slate-100 text-xs font-semibold shadow transition-all no-underline"
            >
              <MdCloudUpload className="w-4 h-4" />
              Upload E-Waste
            </Link>
          </div>
        </div>
      </div>

      {/* ── Quick Statistics Row ───────────────────────────── */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          Overview Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Pending Requests"
            value="2"
            subtitle="Scheduled for this week"
            icon={<MdHourglassEmpty className="w-6 h-6" />}
            iconBg="bg-amber-50"
            iconColor="text-amber-700"
          />
          <StatCard
            title="Upcoming Pickup"
            value="1"
            subtitle="Tomorrow, 10:00 AM"
            icon={<MdLocalShipping className="w-6 h-6" />}
            iconBg="bg-blue-50"
            iconColor="text-[var(--color-primary)]"
          />
          <StatCard
            title="Completed"
            value="14"
            subtitle="Successfully recycled"
            icon={<MdCheckCircle className="w-6 h-6" />}
            iconBg="bg-green-50"
            iconColor="text-[var(--color-accent)]"
          />
          <StatCard
            title="Green Points"
            value="450"
            subtitle="Rank #12 in District"
            icon={<MdEmojiEvents className="w-6 h-6" />}
            iconBg="bg-emerald-50"
            iconColor="text-[var(--color-accent)]"
          />
          <StatCard
            title="Certificates"
            value="8"
            subtitle="CPCB Verified"
            icon={<MdVerified className="w-6 h-6" />}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-700"
          />
        </div>
      </div>

      {/* ── Quick Action Cards ────────────────────────────── */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Book Pickup",
              desc: "Schedule doorstep collection",
              icon: MdCalendarMonth,
              href: "/dashboard/schedule-pickup",
              color: "text-blue-600 bg-blue-50",
            },
            {
              title: "Upload Device",
              desc: "AI device identification",
              icon: MdCloudUpload,
              href: "/dashboard/upload",
              color: "text-emerald-600 bg-emerald-50",
            },
            {
              title: "Locate Centers",
              desc: "Find nearest CPCB facility",
              icon: MdLocationOn,
              href: "/dashboard/centers",
              color: "text-amber-600 bg-amber-50",
            },
            {
              title: "Track Pickup",
              desc: "Live request status",
              icon: MdTrackChanges,
              href: "/dashboard/tracking",
              color: "text-purple-600 bg-purple-50",
            },
            {
              title: "View Certificates",
              desc: "Download CPCB proof",
              icon: MdVerified,
              href: "/dashboard/certificates",
              color: "text-indigo-600 bg-indigo-50",
            },
          ].map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.title}
                href={act.href}
                className="bg-white border border-[var(--color-border)] rounded-lg p-4 shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all duration-200 flex flex-col gap-3 group no-underline"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${act.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                    {act.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Main Content Grid: Charts & Timeline ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left 2 Columns: Charts & Analytics ─────────── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Monthly Recycling Bar Chart */}
          <DashboardCard
            title="Monthly Recycling Volume (kg)"
            subtitle="Your e-waste contributions over the past 6 months"
            action={
              <span className="text-xs font-bold text-[var(--color-accent)] bg-green-50 border border-green-200 px-2.5 py-1 rounded">
                Total: 142 kg
              </span>
            }
          >
            {/* Pure SVG Bar Chart */}
            <div className="w-full pt-4">
              <svg viewBox="0 0 500 180" className="w-full h-44 overflow-visible">
                {/* Grid lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="100" x2="480" y2="100" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="140" x2="480" y2="140" stroke="#CBD5E1" />

                {/* Y Axis labels */}
                <text x="30" y="24" textAnchor="end" fill="#64748B" fontSize="10">40kg</text>
                <text x="30" y="64" textAnchor="end" fill="#64748B" fontSize="10">25kg</text>
                <text x="30" y="104" textAnchor="end" fill="#64748B" fontSize="10">10kg</text>
                <text x="30" y="144" textAnchor="end" fill="#64748B" fontSize="10">0kg</text>

                {/* Bars */}
                {[
                  { month: "Feb", val: 12, height: 40, x: 70 },
                  { month: "Mar", val: 18, height: 60, x: 140 },
                  { month: "Apr", val: 24, height: 80, x: 210 },
                  { month: "May", val: 32, height: 105, x: 280 },
                  { month: "Jun", val: 21, height: 70, x: 350 },
                  { month: "Jul", val: 35, height: 115, x: 420 },
                ].map((bar) => (
                  <g key={bar.month} className="group cursor-pointer">
                    {/* Bar */}
                    <rect
                      x={bar.x}
                      y={140 - bar.height}
                      width="36"
                      height={bar.height}
                      rx="3"
                      fill="#003366"
                      className="hover:fill-[#005B96] transition-colors"
                    />
                    {/* Value label on top */}
                    <text
                      x={bar.x + 18}
                      y={132 - bar.height}
                      textAnchor="middle"
                      fill="#1E293B"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {bar.val}kg
                    </text>
                    {/* Month X label */}
                    <text
                      x={bar.x + 18}
                      y="160"
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize="11"
                    >
                      {bar.month}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </DashboardCard>

          {/* Category Distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DashboardCard title="Recycling Categories" subtitle="By total weight collected">
              <div className="flex flex-col gap-3">
                {[
                  { name: "Laptops & Computers", pct: 45, weight: "64 kg", color: "bg-[var(--color-primary)]" },
                  { name: "Mobile Phones", pct: 25, weight: "35 kg", color: "bg-[var(--color-secondary)]" },
                  { name: "Home Appliances", pct: 18, weight: "26 kg", color: "bg-[var(--color-accent)]" },
                  { name: "Cables & Batteries", pct: 12, weight: "17 kg", color: "bg-amber-600" },
                ].map((cat) => (
                  <div key={cat.name} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--color-text)]">{cat.name}</span>
                      <span className="font-mono text-[var(--color-text-muted)]">{cat.weight} ({cat.pct}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cat.color}`}
                        style={{ width: `${cat.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Impact Counter" subtitle="Environmental contribution">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                  <span className="text-2xl font-bold text-[var(--color-accent)] block">142 kg</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">CO₂ Offset</span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <span className="text-2xl font-bold text-[var(--color-primary)] block">6 Trees</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Tree Equivalent</span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <span className="text-2xl font-bold text-amber-700 block">4.2 kg</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Precious Metals</span>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
                  <span className="text-2xl font-bold text-purple-700 block">100%</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">CPCB Safe</span>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* ── Right 1 Column: Timeline & Notices ─────────── */}
        <div className="flex flex-col gap-6">

          {/* Recent Activity Timeline */}
          <DashboardCard
            title="Recent Activity"
            subtitle="Latest updates on your requests"
            action={
              <Link
                href="/dashboard/pickups"
                className="text-xs font-semibold text-[var(--color-secondary)] hover:underline"
              >
                View All
              </Link>
            }
          >
            <div className="flex flex-col gap-4 text-xs">
              {[
                {
                  id: "1",
                  title: "Pickup Scheduled",
                  desc: "Request #REQ-2026-8941 assigned to EcoRecycle Facility",
                  time: "Today, 09:30 AM",
                  status: "Assigned",
                },
                {
                  id: "2",
                  title: "Certificate Issued",
                  desc: "Certificate #CERT-DL-8902 issued for 12kg e-waste",
                  time: "Yesterday, 04:15 PM",
                  status: "Completed",
                },
                {
                  id: "3",
                  title: "+50 Green Points Earned",
                  desc: "Rewarded for successful laptop recycling",
                  time: "28 Jul 2026",
                  status: "Recycled",
                },
                {
                  id: "4",
                  title: "Device AI Scanned",
                  desc: "HP Pavilion Laptop identified with 96.8% confidence",
                  time: "27 Jul 2026",
                  status: "Approved",
                },
              ].map((act) => (
                <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-[var(--color-border-light)] last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[var(--color-text)]">{act.title}</span>
                      <StatusBadge status={act.status} size="sm" />
                    </div>
                    <p className="text-[var(--color-text-muted)] text-[11px] leading-normal">{act.desc}</p>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-mono">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Government Notices */}
          <DashboardCard title="Government Notices" subtitle="CPCB Circulars & Drives">
            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded flex items-start gap-2">
                <MdCampaign className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-amber-900">National E-Waste Week 2026</span>
                  <p className="text-amber-800 text-[11px]">
                    Earn 2x Green Points on all pickups booked between 1st - 7th August!
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded flex items-start gap-2">
                <MdVerified className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-[var(--color-primary)]">CPCB Guidelines Update</span>
                  <p className="text-[var(--color-text-muted)] text-[11px]">
                    New safety norms for battery disposal enforced under E-Waste Rules 2022.
                  </p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
