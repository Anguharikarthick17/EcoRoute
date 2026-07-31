import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import { MdReportProblem, MdArrowForward } from "react-icons/md";

export const metadata: Metadata = {
  title: "Report Illegal E-Waste Dumping | EcoRoute",
  description: "Public grievance portal to report unorganized e-waste burning or illegal dumping.",
};

export default function ReportDumpingPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-8 max-w-4xl">
        <div className="flex flex-col gap-3">
          <GovBadge variant="official" label="CPGRAMS Portal" />
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            Report Illegal E-Waste Burning & Dumping
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Protect your community. Report illegal acid leaching, open wire burning, or toxic e-waste dumping directly to CPCB Nodal Officers.
          </p>
        </div>

        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[var(--color-text)]">Submit Grievance Report</h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            Grievances are tracked under CPGRAMS and forwarded to SPCB enforcement officers within 24 hours.
          </p>

          <div className="pt-4 border-t border-[var(--color-border-light)] flex justify-end">
            <Link
              href="/dashboard/help"
              className="px-5 py-2.5 rounded bg-[var(--color-danger)] text-white font-bold text-xs no-underline flex items-center gap-2"
            >
              Lodge Public Complaint
              <MdArrowForward className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
