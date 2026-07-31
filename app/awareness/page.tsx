import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import { MdCampaign, MdEco, MdSchool, MdArrowForward } from "react-icons/md";

export const metadata: Metadata = {
  title: "E-Waste Awareness Hub | EcoRoute Portal",
  description: "Public educational awareness campaigns on electronic waste hazards and CPCB recycling guidelines.",
};

export default function AwarenessPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-10 max-w-5xl">
        <div className="flex flex-col items-center text-center gap-4">
          <GovBadge variant="official" label="Public Awareness Campaign" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
            National E-Waste Awareness Hub
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            Learn about the health hazards of informal e-waste burning and how responsible recycling protects India's soil, water, and climate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded bg-red-50 text-red-700 flex items-center justify-center text-xl font-bold">
              ⚡
            </div>
            <h3 className="text-base font-bold text-[var(--color-text)]">Lead & Cadmium Risk</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Old CRT monitors and batteries leach toxic heavy metals into groundwater if disposed of in municipal trash bins.
            </p>
          </Card>

          <Card className="p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded bg-green-50 text-[var(--color-accent)] flex items-center justify-center text-xl font-bold">
              🌱
            </div>
            <h3 className="text-base font-bold text-[var(--color-text)]">Urban Mining Benefits</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Recycling 1 million laptops recovers gold and copper equivalent to mining 120 tonnes of raw virgin ore.
            </p>
          </Card>

          <Card className="p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-[var(--color-primary)] flex items-center justify-center text-xl font-bold">
              📜
            </div>
            <h3 className="text-base font-bold text-[var(--color-text)]">E-Waste Rules 2022</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Governed by the Central Pollution Control Board (CPCB) with mandatory EPR quotas for all electronic brands.
            </p>
          </Card>
        </div>

        <div className="bg-white border p-6 rounded-lg shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-[var(--color-text)]">Earn Green Points by Recycling Today</h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Get CPCB verified certificates and civic rewards for your recycled devices.</p>
          </div>
          <Link
            href="/pickup"
            className="px-5 py-2.5 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-bold text-xs no-underline shrink-0"
          >
            Book Free Pickup
          </Link>
        </div>
      </Container>
    </div>
  );
}
