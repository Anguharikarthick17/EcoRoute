import type { Certificate } from "@/types/citizen";
import { cn } from "@/lib/utils";
import { MdVerified, MdDownload, MdVisibility } from "react-icons/md";

interface CertificateCardProps {
  certificate: Certificate;
  onPreview?: (cert: Certificate) => void;
  onDownload?: (cert: Certificate) => void;
}

export function CertificateCard({
  certificate,
  onPreview,
  onDownload,
}: CertificateCardProps) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4 border-l-4 border-l-[var(--color-accent)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-[var(--color-accent)] flex items-center justify-center shrink-0">
            <MdVerified className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
              CPCB Certified
            </span>
            <h4 className="text-sm font-bold text-[var(--color-text)] leading-tight">
              {certificate.recycledDevice}
            </h4>
          </div>
        </div>
        <span className="text-[11px] font-mono text-[var(--color-text-muted)] bg-slate-100 px-2 py-0.5 rounded">
          {certificate.certificateNo}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-100">
        <div>
          <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">
            Recycled Weight
          </span>
          <span className="font-semibold text-[var(--color-text)]">
            {certificate.weightKg} kg
          </span>
        </div>
        <div>
          <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">
            CO₂ Avoided
          </span>
          <span className="font-semibold text-[var(--color-accent)]">
            {certificate.co2SavedKg} kg CO₂e
          </span>
        </div>
        <div className="col-span-2 border-t border-slate-200 pt-2 mt-1">
          <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">
            Authorized Facility
          </span>
          <span className="font-medium text-[var(--color-text)] truncate block">
            {certificate.recyclerName}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--color-border-light)] text-xs">
        <span className="text-[var(--color-text-muted)]">
          Issued: {certificate.issueDate}
        </span>

        <div className="flex items-center gap-2">
          {onPreview && (
            <button
              onClick={() => onPreview(certificate)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-[var(--color-text)] hover:bg-slate-200 transition-colors font-medium"
            >
              <MdVisibility className="w-3.5 h-3.5" />
              Preview
            </button>
          )}
          {onDownload && (
            <button
              onClick={() => onDownload(certificate)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors font-medium"
            >
              <MdDownload className="w-3.5 h-3.5" />
              PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
