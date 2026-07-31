import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacy Policy | EcoRoute Government Portal",
  description: "Digital Personal Data Protection Act 2023 compliance statement for EcoRoute.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-6 max-w-4xl">
        <GovBadge variant="official" label="Data Protection" />
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Privacy Policy & Data Protection Notice</h1>
        <p className="text-xs text-[var(--color-text-muted)] font-mono">Last Updated: 31 July 2026 · Compliant with Digital Personal Data Protection (DPDP) Act 2023</p>

        <Card className="p-6 flex flex-col gap-4 text-xs text-[var(--color-text)] leading-relaxed">
          <h3 className="text-sm font-bold text-[var(--color-primary)]">1. Data Collection & Purpose</h3>
          <p>
            The Ministry of Environment, Forest & Climate Change (MoEFCC) collects citizen contact details and device metadata solely to facilitate doorstep electronic waste collection, EPR compliance auditing, and CPCB digital certificate issuance.
          </p>

          <h3 className="text-sm font-bold text-[var(--color-primary)]">2. Third-Party Data Sharing</h3>
          <p>
            Citizen data is strictly shared with CPCB-authorized logistics field agents and licensed recycling facilities assigned to your doorstep pickup request. Personal data is never commercialized.
          </p>

          <h3 className="text-sm font-bold text-[var(--color-primary)]">3. Data Retention & Security</h3>
          <p>
            All communications are encrypted using 256-bit SSL under ISO 27001 certified government infrastructure. Citizens may request profile deactivation at any time.
          </p>
        </Card>
      </Container>
    </div>
  );
}
