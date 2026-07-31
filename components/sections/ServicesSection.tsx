"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MdLocalShipping,
  MdSmartToy,
  MdLocationOn,
  MdTrackChanges,
  MdBarChart,
  MdVerified,
} from "react-icons/md";

const SERVICES = [
  {
    id: "svc-1",
    icon: MdLocalShipping,
    title: "Doorstep Pickup",
    description:
      "Schedule a free doorstep collection of your e-waste. Our trained personnel will arrive at your location on the selected date and time.",
    color: "text-blue-700",
    bg: "bg-blue-50 border border-blue-100",
  },
  {
    id: "svc-2",
    icon: MdSmartToy,
    title: "AI Device Identification",
    description:
      "Upload a photo of your electronic device and our AI engine instantly classifies it, estimates recyclability, and suggests the correct disposal category.",
    color: "text-sky-700",
    bg: "bg-sky-50 border border-sky-100",
  },
  {
    id: "svc-3",
    icon: MdLocationOn,
    title: "Nearby Recycling Centres",
    description:
      "Locate CPCB-authorized e-waste collection and recycling centres near you using our integrated map. Filter by device type and availability.",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border border-emerald-100",
  },
  {
    id: "svc-4",
    icon: MdTrackChanges,
    title: "Pickup Tracking",
    description:
      "Track your e-waste pickup request in real time — from collection to processing and safe recycling. Receive SMS and email notifications at each step.",
    color: "text-indigo-700",
    bg: "bg-indigo-50 border border-indigo-100",
  },
  {
    id: "svc-5",
    icon: MdBarChart,
    title: "Government Analytics",
    description:
      "Comprehensive dashboards for government authorities to monitor e-waste volumes, recycler performance, regional trends, and compliance metrics.",
    color: "text-purple-700",
    bg: "bg-purple-50 border border-purple-100",
  },
  {
    id: "svc-6",
    icon: MdVerified,
    title: "Digital Recycling Certificate",
    description:
      "Receive a government-issued digital certificate confirming your e-waste was safely recycled. Valid for CSR compliance and environmental reporting.",
    color: "text-teal-700",
    bg: "bg-teal-50 border border-teal-100",
  },
] as const;

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="services"
      aria-labelledby="services-heading"
      className="bg-white border-b border-[var(--color-border)]"
    >
      <Container className="py-16 lg:py-20">
        <SectionTitle
          id="services-heading"
          title="Our Services"
          subtitle="A comprehensive suite of government-backed digital services for responsible e-waste management — accessible to every citizen."
          align="center"
          showRule
          badge="Services"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.article
                key={svc.id}
                id={svc.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group flex flex-col gap-4 p-6 bg-white border border-[var(--color-border)] rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                aria-labelledby={`${svc.id}-title`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${svc.bg}`}
                  aria-hidden="true"
                >
                  <Icon className={`w-6 h-6 ${svc.color}`} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3
                    id={`${svc.id}-title`}
                    className="text-base font-bold text-[var(--color-text)]"
                  >
                    {svc.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
