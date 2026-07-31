"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CitizenSectionHeader, DashboardCard, Timeline, StatusBadge } from "@/components/citizen";
import { FormInput, GovAlertBox } from "@/components/forms";
import {
  MdTrackChanges,
  MdSearch,
  MdLocalShipping,
  MdPerson,
  MdPhone,
  MdVerified,
  MdHelpOutline,
} from "react-icons/md";

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams?.get("id") || "REQ-2026-8941";
  const [trackingId, setTrackingId] = useState(initialId);

  return (
    <div className="flex flex-col gap-6">
      {/* Tracking Input Bar */}
      <div className="bg-slate-50 p-4 border border-[var(--color-border)] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-96">
          <FormInput
            id="track-input"
            label=""
            placeholder="Enter Request ID (e.g. REQ-2026-8941)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            prefix={<MdTrackChanges className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2.5 rounded bg-[var(--color-primary)] text-white font-semibold text-xs hover:bg-[var(--color-primary-dark)] shadow flex items-center justify-center gap-2"
        >
          <MdSearch className="w-4 h-4" />
          Track Request
        </button>
      </div>

      {/* Live Status Header Hero */}
      <div className="bg-white border border-[var(--color-border)] rounded-lg p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-l-[var(--color-primary)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center shrink-0">
            <MdLocalShipping className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                {trackingId}
              </h2>
              <StatusBadge status="Assigned" size="md" />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              HP Pavilion Laptop & 2 Mobiles · Scheduled for <strong className="text-[var(--color-text)]">01 Aug 2026 (10:00 AM)</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0 text-xs">
          <span className="text-[var(--color-text-muted)]">Estimated Agent Arrival</span>
          <span className="text-lg font-bold text-[var(--color-accent)]">
            Tomorrow at 10:30 AM
          </span>
        </div>
      </div>

      {/* Main Grid: 7-Stage Timeline & Driver Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Columns: Full 7-stage Timeline */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <DashboardCard
            title="Custody Chain & Process Stages"
            subtitle="7-Stage CPCB Compliant E-Waste Lifecycle"
          >
            <Timeline
              steps={[
                {
                  title: "1. Request Submitted",
                  description: "Digital request created by citizen on EcoRoute Portal.",
                  date: "30 Jul 2026, 09:30 AM",
                  status: "completed",
                },
                {
                  title: "2. CPCB Verification & Approval",
                  description: "Regional officer verified device details and hazard classification.",
                  date: "30 Jul 2026, 11:15 AM",
                  status: "completed",
                },
                {
                  title: "3. Agent & Facility Assignment",
                  description: "Assigned to EcoRecycle Partner #4 and Driver Suresh Verma.",
                  date: "30 Jul 2026, 02:00 PM",
                  status: "current",
                },
                {
                  title: "4. Doorstep Collection",
                  description: "Agent inspects device, weighs item, and issues digital receipt.",
                  status: "upcoming",
                },
                {
                  title: "5. Transport & Facility Arrival",
                  description: "Secure transit to CPCB authorized recycling center.",
                  status: "upcoming",
                },
                {
                  title: "6. Component Processing & Extraction",
                  description: "Dismantling, hazardous material containment, and material recovery.",
                  status: "upcoming",
                },
                {
                  title: "7. Certificate & Green Points Issuance",
                  description: "Final digital CPCB certificate generated and credited to citizen profile.",
                  status: "upcoming",
                },
              ]}
            />
          </DashboardCard>
        </div>

        {/* Right 1 Column: Driver Details & Emergency Support */}
        <div className="flex flex-col gap-6">
          <DashboardCard title="Assigned Agent Details">
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white font-bold flex items-center justify-center shrink-0">
                  SV
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text)] text-sm">
                    Suresh Verma
                  </h4>
                  <p className="text-[var(--color-text-muted)] text-[11px]">
                    Certified Field Agent · EcoRecycle #4
                  </p>
                  <span className="text-[10px] font-semibold text-[var(--color-accent)]">
                    ★ 4.9 Rating (210+ Pickups Completed)
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border rounded flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Vehicle Number:</span>
                  <span className="font-mono font-bold text-[var(--color-text)]">DL 01 AB 8941</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Vehicle Type:</span>
                  <span className="font-semibold text-[var(--color-accent)]">EV Clean Van</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Contact Number:</span>
                  <span className="font-semibold text-[var(--color-secondary)]">+91 98112 34567</span>
                </div>
              </div>
            </div>
          </DashboardCard>

          <GovAlertBox variant="warning" title="Helpline Support">
            Need to reschedule or cancel? Contact EcoRoute Toll Free Helpline at{" "}
            <strong className="text-[var(--color-text)]">1800-200-7911</strong> or chat with support.
          </GovAlertBox>
        </div>
      </div>
    </div>
  );
}

export default function PickupTrackingPage() {
  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Real-Time Pickup Tracking"
        subtitle="Track live status and custody chain of your scheduled e-waste collection request."
        badge="Live GIS Tracking"
      />
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading tracking details...</div>}>
        <TrackingContent />
      </Suspense>
    </div>
  );
}
