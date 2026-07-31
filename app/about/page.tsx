import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import {
  MdRecycling,
  MdShield,
  MdVerified,
  MdEco,
  MdArrowForward,
  MdGavel,
  MdPsychology,
  MdPeople,
  MdCheckCircle,
} from "react-icons/md";

export const metadata: Metadata = {
  title: "About EcoRoute | Government AI E-Waste Platform",
  description: "Learn about EcoRoute — India's official AI-powered e-waste management portal by MoEFCC & CPCB.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <GovBadge variant="official" label="Ministry of Environment, Forest & Climate Change" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            About EcoRoute National Platform
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            EcoRoute is India's national AI-powered digital service connecting 1.4 billion citizens, CPCB-authorized recyclers, electronic producers (EPR), and government enforcement officers for 100% compliant e-waste management.
          </p>
        </div>

        {/* Impact Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border p-5 rounded-lg text-center flex flex-col gap-1 shadow-xs">
            <span className="text-2xl font-extrabold text-[var(--color-primary)]">12,500+</span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">Doorstep Pickups Completed</span>
          </div>
          <div className="bg-white border p-5 rounded-lg text-center flex flex-col gap-1 shadow-xs">
            <span className="text-2xl font-extrabold text-[var(--color-accent)]">28.4 Tons</span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">E-Waste Safely Recycled</span>
          </div>
          <div className="bg-white border p-5 rounded-lg text-center flex flex-col gap-1 shadow-xs">
            <span className="text-2xl font-extrabold text-blue-700">350+</span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">CPCB Licensed Recyclers</span>
          </div>
          <div className="bg-white border p-5 rounded-lg text-center flex flex-col gap-1 shadow-xs">
            <span className="text-2xl font-extrabold text-amber-700">98.2%</span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">AI Classification Accuracy</span>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col gap-3 p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[var(--color-primary)] flex items-center justify-center text-2xl font-bold">
              <MdRecycling className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)]">Zero Landfill Directive</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Enforcing Schedule II of E-Waste Management Rules 2022 to divert 100% of hazardous electronics away from urban landfills into certified material extraction plants.
            </p>
          </Card>

          <Card className="flex flex-col gap-3 p-6">
            <div className="w-12 h-12 rounded-lg bg-green-50 text-[var(--color-accent)] flex items-center justify-center text-2xl font-bold">
              <MdVerified className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)]">CPCB Verified Recyclers</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Over 350+ state-of-the-art recycling facilities audited and licensed under Extended Producer Responsibility (EPR) compliance standards.
            </p>
          </Card>

          <Card className="flex flex-col gap-3 p-6">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-2xl font-bold">
              <MdShield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)]">AI Vision Technology</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Proprietary computer vision models automatically detect device category, hazardous component risk, and estimated recovery value from citizen uploaded photos.
            </p>
          </Card>
        </div>

        {/* Detailed Statutory Mandate */}
        <Card className="p-8 bg-white flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="w-10 h-10 rounded bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
              <MdGavel className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-primary)]">Statutory Mandate & E-Waste Rules 2022</h2>
              <span className="text-xs text-[var(--color-text-muted)]">Gazette Notification No. G.S.R. 811(E) · Ministry of Environment, Forest & Climate Change</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[var(--color-text)]">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                <MdCheckCircle className="text-[var(--color-accent)]" /> EPR Credit Certificates
              </h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Producers of Electrical and Electronic Equipment (EEE) are mandated to collect and recycle e-waste through EPR certificates generated digitally via EcoRoute.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                <MdCheckCircle className="text-[var(--color-accent)]" /> Formalization of Unorganized Sector
              </h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                EcoRoute integrates informal waste pickers into certified collection channels with health safety training and guaranteed fair remuneration.
              </p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-8 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-xl font-bold">Ready to Dispose of E-Waste Responsibly?</h2>
            <p className="text-xs text-white/80">Schedule a free doorstep pickup or locate your nearest CPCB collection center today.</p>
          </div>
          <Link
            href="/pickup"
            className="px-6 py-3 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-bold text-xs no-underline shadow flex items-center gap-2 shrink-0"
          >
            Book Free Pickup
            <MdArrowForward className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
