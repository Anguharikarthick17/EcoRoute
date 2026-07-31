"use client";

import { useState } from "react";
import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import { FormInput, FormSelect } from "@/components/forms";
import { MdCampaign, MdAdd, MdCalendarToday, MdAnnouncement } from "react-icons/md";

const MOCK_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "National E-Waste Drive 2026 — Double Green Points Campaign",
    category: "Collection Drive",
    date: "Active: 01 Aug - 07 Aug 2026",
    target: "All 28 States & UTs",
    desc: "National drive encouraging citizen doorstep pickups with 2x green reward credits.",
  },
  {
    id: "ann-2",
    title: "Maintenance Notice: CPCB GIS Server Upgrade",
    category: "Maintenance Notice",
    date: "Scheduled: 05 Aug 2026 (02:00 AM - 04:00 AM)",
    target: "All Portal Users",
    desc: "Scheduled maintenance for GIS mapping cluster. Pickups schedule unaffected.",
  },
];

export default function AdminAnnouncementsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Government Circulars & Announcements"
        subtitle="Publish national e-waste campaigns, collection drives, and CPCB system maintenance notices."
        badge="Public Circulars"
        action={
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--color-primary)] text-white text-xs font-bold shadow"
          >
            <MdAdd className="w-4 h-4" />
            Publish New Circular
          </button>
        }
      />

      {showCreate && (
        <DashboardCard title="Publish New Government Circular">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowCreate(false);
              alert("Circular published across all citizen and officer portals!");
            }}
            className="flex flex-col gap-4 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput id="ann-title" label="Circular Title" placeholder="e.g. National E-Waste Week" required />
              <FormSelect
                id="ann-cat"
                label="Category"
                options={[
                  { label: "Collection Drive", value: "Collection Drive" },
                  { label: "Public Campaign", value: "Public Campaign" },
                  { label: "Maintenance Notice", value: "Maintenance Notice" },
                  { label: "Holiday Notice", value: "Holiday Notice" },
                ]}
              />
            </div>
            <FormInput id="ann-desc" label="Circular Text Body" placeholder="Official announcement body..." required />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 rounded border">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded bg-[var(--color-primary)] text-white font-bold">
                Publish Circular
              </button>
            </div>
          </form>
        </DashboardCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_ANNOUNCEMENTS.map((a) => (
          <div key={a.id} className="bg-white border border-[var(--color-border)] rounded-lg p-5 shadow-xs flex flex-col justify-between gap-4 border-l-4 border-l-[var(--color-primary)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-[var(--color-primary)] flex items-center justify-center font-bold shrink-0">
                <MdCampaign className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  {a.category} · {a.target}
                </span>
                <h3 className="font-bold text-sm text-[var(--color-text)] leading-tight">{a.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{a.desc}</p>
                <span className="text-[11px] font-mono text-slate-500 mt-1">{a.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
