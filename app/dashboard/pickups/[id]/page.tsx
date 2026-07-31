"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CitizenSectionHeader, DashboardCard, StatusBadge, Timeline } from "@/components/citizen";
import { GovAlertBox } from "@/components/forms";
import {
  MdArrowBack,
  MdLocalShipping,
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdDownload,
  MdVerified,
  MdPrint,
} from "react-icons/md";

export default function PickupDetailsPage() {
  const params = useParams();
  const requestId = (params?.id as string) || "REQ-2026-8941";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/dashboard/pickups"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
        >
          <MdArrowBack className="w-4 h-4" />
          Back to All Pickups
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-border)] text-xs font-semibold hover:bg-slate-50"
          >
            <MdPrint className="w-4 h-4" />
            Print Receipt
          </button>
          <Link
            href={`/dashboard/tracking?id=${requestId}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-dark)]"
          >
            <MdLocalShipping className="w-4 h-4" />
            Track Live
          </Link>
        </div>
      </div>

      <CitizenSectionHeader
        title={`Request ${requestId}`}
        subtitle="Full official record of e-waste collection and processing."
        badge="Detail View"
        action={<StatusBadge status="Assigned" size="lg" />}
      />

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Columns: Request Info & Recycler info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Request Information Card */}
          <DashboardCard title="Device & Pickup Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border rounded">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
                  Device Description
                </span>
                <span className="font-bold text-[var(--color-text)] text-sm mt-0.5 block">
                  HP Pavilion Laptop & 2 Mobile Phones
                </span>
              </div>
              <div className="p-3 bg-slate-50 border rounded">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
                  Category & Estimated Weight
                </span>
                <span className="font-semibold text-[var(--color-text)] mt-0.5 block">
                  Laptops & Mobiles (~12 kg)
                </span>
              </div>
              <div className="p-3 bg-slate-50 border rounded">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
                  Scheduled Date & Time
                </span>
                <span className="font-semibold text-[var(--color-primary)] mt-0.5 block">
                  01 August 2026 (10:00 AM - 01:00 PM)
                </span>
              </div>
              <div className="p-3 bg-slate-50 border rounded">
                <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
                  Submission Date
                </span>
                <span className="font-semibold text-[var(--color-text)] mt-0.5 block">
                  30 July 2026, 09:30 AM
                </span>
              </div>

              <div className="sm:col-span-2 p-3 bg-slate-50 border rounded flex items-start gap-2">
                <MdLocationOn className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
                    Pickup Address
                  </span>
                  <span className="font-semibold text-[var(--color-text)] mt-0.5 block">
                    Flat 402, Green Park Apartments, Sector 14, New Delhi - 110016
                  </span>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Assigned Recycler & Driver Information */}
          <DashboardCard title="Assigned Recycling Partner & Field Agent">
            <div className="flex flex-col gap-4 text-xs">
              <div className="p-4 bg-blue-50/50 border border-blue-200/60 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-lg">
                    ER
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[var(--color-primary)]">
                      CPCB Licensed Facility
                    </span>
                    <h4 className="text-sm font-bold text-[var(--color-text)]">
                      EcoRecycle Facility #4
                    </h4>
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                      Reg. No: CPCB/EWR/2024/DL-098 · Okhla Phase III, New Delhi
                    </p>
                  </div>
                </div>

                <span className="w-fit px-2.5 py-1 rounded bg-green-50 text-[var(--color-accent)] font-bold text-[10px] border border-green-200">
                  Verified Recycler
                </span>
              </div>

              {/* Collector Driver Placeholder */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold block">
                    Field Agent / Driver
                  </span>
                  <span className="font-bold text-[var(--color-text)] text-sm mt-0.5 block flex items-center gap-1">
                    <MdPerson className="w-4 h-4 text-[var(--color-primary)]" />
                    Suresh Verma
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold block">
                    Collection Vehicle
                  </span>
                  <span className="font-semibold text-[var(--color-text)] mt-0.5 block font-mono">
                    DL 01 AB 8941 (Electric Van)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold block">
                    Agent Contact
                  </span>
                  <span className="font-semibold text-[var(--color-secondary)] mt-0.5 block flex items-center gap-1">
                    <MdPhone className="w-4 h-4" />
                    +91 98112 34567
                  </span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Right 1 Column: Timeline Progress */}
        <div className="flex flex-col gap-6">
          <DashboardCard title="Pickup Progress Timeline">
            <Timeline
              steps={[
                {
                  title: "Submitted",
                  description: "Request received by EcoRoute Portal",
                  date: "30 Jul, 09:30 AM",
                  status: "completed",
                },
                {
                  title: "Approved",
                  description: "Validated by CPCB Regional Officer",
                  date: "30 Jul, 11:15 AM",
                  status: "completed",
                },
                {
                  title: "Assigned",
                  description: "Assigned to EcoRecycle Agent Suresh Verma",
                  date: "30 Jul, 02:00 PM",
                  status: "current",
                },
                {
                  title: "Collected",
                  description: "Doorstep pickup and digital receipt",
                  status: "upcoming",
                },
                {
                  title: "Delivered",
                  description: "Arrived at recycling facility",
                  status: "upcoming",
                },
                {
                  title: "Recycled",
                  description: "Safe processing and component recovery",
                  status: "upcoming",
                },
                {
                  title: "Completed",
                  description: "Certificate & Green Points issued",
                  status: "upcoming",
                },
              ]}
            />
          </DashboardCard>

          <GovAlertBox variant="info" title="Official Notice">
            Keep your device disconnected and backed up prior to agent arrival.
            Our field agent will verify device category before issuing your receipt.
          </GovAlertBox>
        </div>
      </div>
    </div>
  );
}
