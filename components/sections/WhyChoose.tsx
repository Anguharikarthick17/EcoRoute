"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MdClose,
  MdCheck,
  MdWarning,
  MdVerified,
} from "react-icons/md";

const TRADITIONAL_PROBLEMS = [
  "Illegal dumping in landfills and water bodies",
  "No tracking or accountability mechanism",
  "Unsafe dismantling by unregulated vendors",
  "Toxic chemical exposure for informal workers",
  "No documentation or disposal proof",
  "Severe environmental and health hazards",
];

const ECOROUTE_BENEFITS = [
  "100% safe, certified recycling of all materials",
  "Real-time pickup tracking with notifications",
  "Trained personnel and CPCB-licensed facilities",
  "Full digital audit trail for every device",
  "Government-issued recycling certificate",
  "Measurable reduction in environmental footprint",
];

export function WhyChoose() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="why-heading"
      className="bg-white border-b border-[var(--color-border)]"
    >
      <Container className="py-16 lg:py-20">
        <SectionTitle
          title="Why Choose EcoRoute?"
          subtitle="See the difference between traditional unregulated disposal and the EcoRoute government-approved approach."
          align="center"
          showRule
          badge="Comparison"
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* ── Left: Traditional Disposal ────────────────── */}
          <div className="border border-red-200 rounded-lg overflow-hidden bg-white shadow-xs">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-red-50 border-b border-red-200">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <MdWarning className="w-5 h-5 text-red-700" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-red-950">
                  Traditional Disposal
                </h3>
                <p className="text-xs font-semibold text-red-800 mt-0.5">
                  Unregulated · Unsafe · No Accountability
                </p>
              </div>
            </div>

            {/* Problems list */}
            <ul className="p-5 flex flex-col gap-3" role="list" aria-label="Problems with traditional disposal">
              {TRADITIONAL_PROBLEMS.map((problem, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-3 text-sm font-medium text-slate-800"
                >
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <MdClose className="w-3.5 h-3.5 text-red-700" aria-hidden="true" />
                  </span>
                  {problem}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── Right: EcoRoute ───────────────────────────── */}
          <div className="border border-emerald-200 rounded-lg overflow-hidden bg-white shadow-xs">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-emerald-50 border-b border-emerald-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <MdVerified className="w-5 h-5 text-emerald-700" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-950">
                  EcoRoute — Government Platform
                </h3>
                <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                  Certified · Safe · Accountable
                </p>
              </div>
            </div>

            {/* Benefits list */}
            <ul className="p-5 flex flex-col gap-3" role="list" aria-label="Benefits of using EcoRoute">
              {ECOROUTE_BENEFITS.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-3 text-sm font-medium text-slate-900"
                >
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <MdCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                  </span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
