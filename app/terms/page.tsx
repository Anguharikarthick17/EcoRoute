import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Terms of Service | EcoRoute Government Portal",
  description: "Terms of Service governing the use of EcoRoute citizen and administration services.",
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-6 max-w-4xl">
        <GovBadge variant="official" label="Legal Terms" />
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Terms of Service</h1>
        <p className="text-xs text-[var(--color-text-muted)] font-mono">Effective Date: 31 July 2026</p>

        <Card className="p-6 flex flex-col gap-4 text-xs text-[var(--color-text)] leading-relaxed">
          <h3 className="text-sm font-bold text-[var(--color-primary)]">1. Acceptance of Terms</h3>
          <p>By scheduling a doorstep e-waste pickup or accessing the EcoRoute Portal, you agree to comply with all rules under the E-Waste Management Rules 2022.</p>

          <h3 className="text-sm font-bold text-[var(--color-primary)]">2. Citizen Responsibilities</h3>
          <p>Citizens must ensure all personal data is deleted from mobile devices and laptops prior to handing over items to certified field agents.</p>
        </Card>
      </Container>
    </div>
  );
}
