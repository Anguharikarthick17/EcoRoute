import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Government Disclaimer | EcoRoute Portal",
  description: "Official legal disclaimer for EcoRoute website content and services.",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-6 max-w-4xl">
        <GovBadge variant="official" label="Legal Disclaimer" />
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Government Disclaimer</h1>
        <Card className="p-6 flex flex-col gap-3 text-xs text-[var(--color-text)] leading-relaxed">
          <p>Content on this portal is published and maintained by the Central Pollution Control Board (CPCB), Ministry of Environment, Forest & Climate Change. While every effort is made to ensure accuracy, the official circulars published in the Gazette of India take precedence.</p>
        </Card>
      </Container>
    </div>
  );
}
