import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import { MdVerified, MdArrowForward } from "react-icons/md";

export const metadata: Metadata = {
  title: "Collector & Recycler Licensing | EcoRoute",
  description: "CPCB certification and licensing portal for e-waste recycling facilities.",
};

export default function CollectorServicePage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-8 max-w-4xl">
        <div className="flex flex-col gap-3">
          <GovBadge variant="official" label="Recycler Portal" />
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            Collector & Recycler Certification Portal
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Apply for CPCB certification, submit capacity audit reports, and connect to EcoRoute's automated citizen doorstep collection network.
          </p>
        </div>

        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[var(--color-text)]">Facility Requirements</h3>
          <ul className="flex flex-col gap-2 text-xs text-[var(--color-text-muted)] list-disc pl-5">
            <li>State Pollution Control Board (SPCB) Consent to Operate (CTO).</li>
            <li>Hazardous Waste Containment & Storage Infrastructure.</li>
            <li>Capacity Allocation: Minimum 100 Metric Tonnes per annum.</li>
            <li>Real-time digital weight scale & QR audit integration.</li>
          </ul>

          <div className="pt-4 border-t border-[var(--color-border-light)] flex justify-end">
            <Link
              href="/register"
              className="px-5 py-2.5 rounded bg-[var(--color-primary)] text-white font-bold text-xs no-underline flex items-center gap-2"
            >
              Submit Facility Application
              <MdArrowForward className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
