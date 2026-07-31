"use client";

import { useState } from "react";
import { CitizenSectionHeader, CertificateCard, DashboardCard } from "@/components/citizen";
import type { Certificate } from "@/types/citizen";
import { MdClose, MdDownload, MdVerified, MdQrCode2, MdPrint } from "react-icons/md";

const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: "c-1",
    certificateNo: "CERT-DL-8902",
    issueDate: "27 Jul 2026",
    recycledDevice: "Dell OptiPlex Desktop Tower",
    category: "Desktop Computers",
    weightKg: 18,
    co2SavedKg: 54,
    recyclerName: "GreenTech Clean Recycling Pvt Ltd",
    cpbLicenseNo: "CPCB/EWR/2023/DL-045",
  },
  {
    id: "c-2",
    certificateNo: "CERT-DL-8654",
    issueDate: "20 Jul 2026",
    recycledDevice: "LG CRT Monitor 17-inch",
    category: "Televisions & Displays",
    weightKg: 15,
    co2SavedKg: 45,
    recyclerName: "CPCB Central Facility",
    cpbLicenseNo: "CPCB/GOI/GOVT-001",
  },
  {
    id: "c-3",
    certificateNo: "CERT-DL-8410",
    issueDate: "12 Jul 2026",
    recycledDevice: "Samsung Refrigerator Compressor & Circuit",
    category: "Home Appliances",
    weightKg: 45,
    co2SavedKg: 135,
    recyclerName: "EcoRecycle Facility #4",
    cpbLicenseNo: "CPCB/EWR/2024/DL-098",
  },
];

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleDownload = (cert: Certificate) => {
    alert(`Downloading Official CPCB Certificate PDF for ${cert.certificateNo}...`);
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="CPCB Digital Certificates"
        subtitle="Government-issued official certificates verifying 100% safe e-waste recycling and CO₂ offset."
        badge="Official Proof"
      />

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CERTIFICATES.map((cert) => (
          <CertificateCard
            key={cert.id}
            certificate={cert}
            onPreview={(c) => setSelectedCert(c)}
            onDownload={handleDownload}
          />
        ))}
      </div>

      {/* Official Certificate Modal / Preview Frame */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border-4 border-[var(--color-primary)]">
            
            {/* Modal Header */}
            <div className="bg-[var(--color-primary)] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdVerified className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-sm tracking-tight">
                  Official CPCB E-Waste Certificate Preview
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-white/80 hover:text-white"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            {/* Printable Certificate Frame */}
            <div className="p-8 bg-amber-50/20 border-m-8 border-emerald-600 flex flex-col gap-6 text-center">
              
              {/* Emblem & Header */}
              <div className="flex flex-col items-center gap-1 border-b border-slate-200 pb-4">
                <span className="text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase">
                  Central Pollution Control Board · Government of India
                </span>
                <h2 className="text-xl font-extrabold text-[var(--color-primary)] tracking-tight">
                  Certificate of Safe E-Waste Recycling
                </h2>
                <span className="text-xs font-mono text-slate-500">
                  Certificate No: {selectedCert.certificateNo}
                </span>
              </div>

              {/* Certificate Body Text */}
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                This is to certify that citizen <strong className="text-[var(--color-primary)]">Rajesh Kumar</strong> (Citizen ID: DL-2026-8941) has responsibly disposed of <strong className="text-[var(--color-text)]">{selectedCert.recycledDevice}</strong> weighing <strong className="text-[var(--color-text)]">{selectedCert.weightKg} kg</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded border border-slate-200 text-xs text-left">
                <div>
                  <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">CO₂ Equivalent Offset</span>
                  <span className="font-bold text-[var(--color-accent)] text-sm">{selectedCert.co2SavedKg} kg CO₂e</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Issue Date</span>
                  <span className="font-bold text-[var(--color-text)] text-sm">{selectedCert.issueDate}</span>
                </div>
                <div className="col-span-2 border-t pt-2 mt-1">
                  <span className="text-[var(--color-text-muted)] block text-[10px] uppercase">Recycling Partner</span>
                  <span className="font-bold text-[var(--color-text)]">{selectedCert.recyclerName}</span>
                  <span className="text-[10px] text-slate-500 block font-mono">License: {selectedCert.cpbLicenseNo}</span>
                </div>
              </div>

              {/* QR Code & Digital Seal */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <MdQrCode2 className="w-12 h-12 text-slate-800" />
                  <span className="text-[10px] text-slate-500 text-left">Scan to verify on CPCB Portal</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold text-[9px] flex items-center justify-center text-center leading-none p-1">
                    GOVT SEAL
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 mt-1">Authorized Signatory</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded border border-[var(--color-border)] text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <MdPrint className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => handleDownload(selectedCert)}
                  className="px-5 py-2 rounded bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-dark)] flex items-center gap-1.5 shadow"
                >
                  <MdDownload className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
