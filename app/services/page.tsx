import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import {
  MdLocalShipping,
  MdBusiness,
  MdVerified,
  MdReportProblem,
  MdTrackChanges,
  MdFileDownload,
  MdArrowForward,
} from "react-icons/md";

export const metadata: Metadata = {
  title: "Government E-Waste Services | EcoRoute",
  description: "Explore official citizen, producer EPR, and recycler services provided by EcoRoute.",
};

const SERVICES = [
  {
    title: "Doorstep E-Waste Pickup",
    desc: "Schedule free doorstep collection for laptops, smartphones, home appliances, and batteries.",
    href: "/pickup",
    icon: MdLocalShipping,
    badge: "Citizens",
  },
  {
    title: "Producer EPR Registration",
    desc: "Register under Extended Producer Responsibility (EPR) targets with automated compliance reporting.",
    href: "/services/producer",
    icon: MdBusiness,
    badge: "Producers",
  },
  {
    title: "Collector & Recycler Licensing",
    desc: "Apply for CPCB certification, audit logs, and regional collection capacity allocations.",
    href: "/services/collector",
    icon: MdVerified,
    badge: "Recyclers",
  },
  {
    title: "Track Collection Request",
    desc: "Real-time 7-stage GIS tracking of e-waste custody chain from collection to raw material extraction.",
    href: "/services/track",
    icon: MdTrackChanges,
    badge: "Tracking",
  },
  {
    title: "CPCB Digital Certificates",
    desc: "Download government-verified electronic waste safe disposal certificates with QR code proof.",
    href: "/services/certificate",
    icon: MdVerified,
    badge: "Certificates",
  },
  {
    title: "Report Illegal Dumping",
    desc: "Lodge public grievances regarding unorganized e-waste burning or illegal landfill dumping.",
    href: "/services/report",
    icon: MdReportProblem,
    badge: "Grievances",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <GovBadge variant="official" label="Digital India Services" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Government Digital Services
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            Official electronic waste management services for citizens, electronic producers, authorized recyclers, and government officers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="flex flex-col justify-between p-6 gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-text)]">{s.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{s.desc}</p>
                </div>

                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors no-underline pt-3 border-t border-[var(--color-border-light)]"
                >
                  Access Service
                  <MdArrowForward className="w-4 h-4" />
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
