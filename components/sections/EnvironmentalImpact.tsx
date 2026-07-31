"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MdCo2,
  MdForest,
  MdRecycling,
  MdWaterDrop,
} from "react-icons/md";

const IMPACTS = [
  {
    id: "env-carbon",
    icon: MdCo2,
    metric: "142 Tonnes",
    label: "Carbon Emissions Prevented",
    description:
      "Responsible recycling prevents toxic gases from entering the atmosphere through illegal burning or landfill degradation.",
    color: "text-[var(--color-primary)]",
    bg: "bg-[var(--color-primary)]/8",
    border: "border-[var(--color-primary)]/15",
  },
  {
    id: "env-trees",
    icon: MdForest,
    metric: "5,800 Trees",
    label: "Equivalent Trees Saved",
    description:
      "The carbon offset from EcoRoute's operations is equivalent to planting over 5,800 mature trees, based on standard forest carbon sequestration metrics.",
    color: "text-[var(--color-accent)]",
    bg: "bg-[var(--color-accent)]/8",
    border: "border-[var(--color-accent)]/15",
  },
  {
    id: "env-resources",
    icon: MdRecycling,
    metric: "18 Tonnes",
    label: "Raw Materials Recovered",
    description:
      "Gold, silver, copper, aluminium, and rare-earth metals recovered from e-waste and re-entered into the manufacturing supply chain.",
    color: "text-[var(--color-secondary)]",
    bg: "bg-[var(--color-secondary)]/8",
    border: "border-[var(--color-secondary)]/15",
  },
  {
    id: "env-pollution",
    icon: MdWaterDrop,
    metric: "96%",
    label: "Hazardous Material Secured",
    description:
      "Lead, mercury, cadmium and other hazardous substances safely extracted and contained, preventing soil and groundwater contamination.",
    color: "text-[var(--color-accent)]",
    bg: "bg-[var(--color-accent)]/8",
    border: "border-[var(--color-accent)]/15",
  },
] as const;

export function EnvironmentalImpact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="environmental-impact"
      aria-labelledby="env-heading"
      className="bg-white border-b border-[var(--color-border)]"
    >
      <Container className="py-16 lg:py-20">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionTitle
            title="Environmental Impact"
            subtitle="EcoRoute's operations contribute measurable environmental benefits across India."
            align="left"
            showRule
            badge="Environment"
          />
          <div className="flex flex-col gap-1 shrink-0">
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
              Data Period
            </p>
            <p className="text-sm font-semibold text-[var(--color-text)]">
              April 2025 – March 2026
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Source: CPCB Annual Report 2025-26
            </p>
          </div>
        </div>

        {/* Impact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {IMPACTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`flex gap-5 p-6 border rounded-lg ${item.border} bg-white`}
              >
                {/* Icon */}
                <div
                  className={`shrink-0 w-14 h-14 rounded-lg ${item.bg} flex items-center justify-center`}
                  aria-hidden="true"
                >
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  <p className={`text-2xl font-bold ${item.color} leading-tight`}>
                    {item.metric}
                  </p>
                  <h3 className="text-sm font-bold text-[var(--color-text)]">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Government note */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg flex items-start gap-3"
        >
          <span className="shrink-0 text-lg" aria-hidden="true">📋</span>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong className="text-[var(--color-text)]">Data Transparency:</strong>{" "}
            All environmental impact metrics are independently verified and reported to the Central Pollution Control Board under the E-Waste Management Rules, 2022. Full reports are available under the{" "}
            <a href="/rti" className="text-[var(--color-secondary)] underline hover:text-[var(--color-primary)] transition-colors">
              Right to Information Act
            </a>
            .
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
