"use client";

import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import type { AdminReportItem } from "@/types/admin";
import { MdPictureAsPdf, MdDownload, MdPrint, MdTableChart } from "react-icons/md";

const MOCK_REPORTS: AdminReportItem[] = [
  {
    id: "rep-1",
    title: "Daily Operations & Dispatch Summary",
    category: "Daily Summary",
    period: "30 July 2026",
    generatedDate: "31 Jul 2026, 06:00 AM",
    fileSize: "1.8 MB",
  },
  {
    id: "rep-2",
    title: "Weekly District Collection Audit",
    category: "Compliance",
    period: "21 - 27 July 2026",
    generatedDate: "28 Jul 2026",
    fileSize: "4.2 MB",
  },
  {
    id: "rep-3",
    title: "Monthly National E-Waste Progress Report",
    category: "Monthly Audit",
    period: "June 2026",
    generatedDate: "01 Jul 2026",
    fileSize: "8.5 MB",
  },
  {
    id: "rep-4",
    title: "Annual Environmental & Carbon Footprint Audit 2025-26",
    category: "Environmental Impact",
    period: "FY 2025-26",
    generatedDate: "15 Apr 2026",
    fileSize: "14.2 MB",
  },
];

export default function AdminReportsPage() {
  const handleDownloadPDF = (rep: AdminReportItem) => {
    alert(`Downloading PDF report: ${rep.title}`);
  };

  const handleExportExcel = (rep: AdminReportItem) => {
    alert(`Exporting Excel sheet for: ${rep.title}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Reports & Audit Center"
        subtitle="Generate and export CPCB official compliance reports, daily dispatch summaries, and environmental audits."
        badge="Official Audits"
      />

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_REPORTS.map((rep) => (
          <div key={rep.id} className="bg-white border border-[var(--color-border)] rounded-lg p-5 shadow-xs flex flex-col justify-between gap-4 border-l-4 border-l-[var(--color-primary)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded bg-red-50 text-red-700 flex items-center justify-center font-bold shrink-0">
                <MdPictureAsPdf className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  {rep.category} · {rep.period}
                </span>
                <h3 className="font-bold text-sm text-[var(--color-text)] leading-tight">
                  {rep.title}
                </h3>
                <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  Generated: {rep.generatedDate} ({rep.fileSize})
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--color-border-light)] text-xs">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--color-border)] text-slate-700 hover:bg-slate-50 font-semibold"
              >
                <MdPrint className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={() => handleExportExcel(rep)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-50 text-[var(--color-accent)] border border-emerald-200 hover:bg-emerald-100 font-semibold"
              >
                <MdTableChart className="w-4 h-4" />
                Excel
              </button>
              <button
                onClick={() => handleDownloadPDF(rep)}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] font-semibold shadow"
              >
                <MdDownload className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
