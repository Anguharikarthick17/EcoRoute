import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import { MdBusiness, MdArrowForward } from "react-icons/md";

export const metadata: Metadata = {
  title: "Producer EPR Registration | EcoRoute",
  description: "Extended Producer Responsibility registration and compliance portal for electronic manufacturers.",
};

export default function ProducerServicePage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-8 max-w-4xl">
        <div className="flex flex-col gap-3">
          <GovBadge variant="official" label="EPR Portal" />
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            Extended Producer Responsibility (EPR) Registration
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Under Schedule III of the E-Waste Management Rules 2022, all manufacturers, importers, and brand owners of electrical and electronic equipment must register with CPCB and meet annual recycling targets.
          </p>
        </div>

        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[var(--color-text)]">Producer Registration Checklist</h3>
          <ul className="flex flex-col gap-2 text-xs text-[var(--color-text-muted)] list-disc pl-5">
            <li>GST Registration Certificate & Corporate Identification Number (CIN).</li>
            <li>List of Electronic & Electrical Equipment (EEE) categories manufactured or imported.</li>
            <li>Estimated annual sales volume and target collection credit commitments.</li>
            <li>MoEFCC Environmental Compliance declaration.</li>
          </ul>

          <div className="pt-4 border-t border-[var(--color-border-light)] flex justify-end">
            <Link
              href="/register"
              className="px-5 py-2.5 rounded bg-[var(--color-primary)] text-white font-bold text-xs no-underline flex items-center gap-2"
            >
              Proceed to Producer Registration
              <MdArrowForward className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
