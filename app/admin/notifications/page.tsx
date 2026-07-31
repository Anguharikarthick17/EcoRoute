"use client";

import { useState } from "react";
import { CitizenSectionHeader } from "@/components/citizen";
import { MdNotifications, MdReportProblem, MdCheckCircle, MdCampaign, MdDoneAll } from "react-icons/md";

const MOCK_ADMIN_NOTIFS = [
  {
    id: "an-1",
    title: "Unverified Recycler Flagged in Noida Sector 63",
    desc: "CPCB Audit System detected unauthorized collection capacity surge. Officer inspection required.",
    type: "Emergency Notice",
    time: "10 mins ago",
    read: false,
    color: "bg-red-50 border-red-200 text-red-800",
  },
  {
    id: "an-2",
    title: "New District Registration Milestone: New Delhi Central",
    desc: "District reached 14,000+ completed pickups with 95.8% recycling compliance.",
    type: "System Update",
    time: "2 hours ago",
    read: false,
    color: "bg-green-50 border-green-200 text-green-800",
  },
  {
    id: "an-3",
    title: "Citizen Illegal Dumping Grievance #TKT-2026-4320 Escalated",
    desc: "Reported in Kanpur Industrial Area. Forwarded to State Pollution Control Board.",
    type: "Citizen Report",
    time: "Yesterday",
    read: true,
    color: "bg-amber-50 border-amber-200 text-amber-900",
  },
];

export default function AdminNotificationsPage() {
  const [items, setItems] = useState(MOCK_ADMIN_NOTIFS);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Government Executive Notification Desk"
        subtitle="Real-time alerts regarding system compliance, emergency alerts, and CPCB audit logs."
        badge="Nodal Alerts"
        action={
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-border)] text-xs font-semibold hover:bg-slate-100 bg-white"
          >
            <MdDoneAll className="w-4 h-4 text-[var(--color-accent)]" />
            Mark All Read
          </button>
        }
      />

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border ${item.color} flex items-start justify-between gap-4 transition-all`}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                <MdNotifications className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/70">
                    {item.type}
                  </span>
                  <span className="text-[11px] opacity-75 font-mono">{item.time}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
