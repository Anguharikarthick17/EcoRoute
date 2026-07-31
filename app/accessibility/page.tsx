import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Accessibility Statement | EcoRoute Government Portal",
  description: "GIGW Guidelines for Indian Government Websites accessibility compliance statement.",
};

export default function AccessibilityPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-6 max-w-4xl">
        <GovBadge variant="official" label="GIGW Compliant" />
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Accessibility Statement</h1>
        <Card className="p-6 flex flex-col gap-3 text-xs text-[var(--color-text)] leading-relaxed">
          <p>EcoRoute is designed in accordance with the Guidelines for Indian Government Websites (GIGW 3.0) and WCAG 2.1 Level AA standards to ensure equal access for all citizens, including persons with visual, hearing, or physical disabilities.</p>
        </Card>
      </Container>
    </div>
  );
}
