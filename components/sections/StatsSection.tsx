"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { useCountUp } from "@/hooks/useCountUp";
import { useTranslation } from "@/lib/i18n";

// ── Individual Stat Counter ───────────────────────────────────
function StatCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  duration = 1800,
  delay = 0,
  isInView,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  duration?: number;
  delay?: number;
  isInView: boolean;
}) {
  const { ref, count } = useCountUp({ end, duration });

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="flex flex-col items-center text-center gap-1"
    >
      <p
        className="text-4xl sm:text-5xl font-bold text-white leading-none"
        aria-live="polite"
        aria-atomic="true"
      >
        <span aria-hidden="true">
          {prefix}
          <span ref={ref}>{count.toLocaleString("en-IN")}</span>
          {suffix}
        </span>
        <span className="sr-only">
          {prefix}{end.toLocaleString("en-IN")}{suffix}
        </span>
      </p>
      <p className="text-sm font-semibold text-white/90 mt-1">{label}</p>
      {sublabel && (
        <p className="text-xs text-white/60">{sublabel}</p>
      )}
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      id="impact-stats"
      aria-labelledby="stats-heading"
      className="bg-[var(--color-primary)] border-b border-[var(--color-primary-dark)]"
    >
      <div className="gov-stripe" aria-hidden="true" />

      <Container className="py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white/80 mb-3">
            National Impact
          </span>
          <h2
            id="stats-heading"
            className="text-2xl sm:text-3xl font-bold text-white"
          >
            {t("stats.title")}
          </h2>
          <div className="h-0.5 w-16 bg-[var(--color-accent)] mx-auto mt-4 rounded-full" aria-hidden="true" />
          <p className="text-sm text-white/70 mt-4 max-w-lg mx-auto">
            {t("stats.subtitle")}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
          role="list"
          aria-label="Impact statistics"
        >
          <div role="listitem">
            <StatCounter
              end={12500}
              suffix="+"
              label="Successful Pickups"
              sublabel="Across 28 states"
              isInView={isInView}
              delay={0}
            />
          </div>
          <div role="listitem">
            <StatCounter
              end={350}
              suffix="+"
              label="Collection Centres"
              sublabel="CPCB Authorized"
              isInView={isInView}
              delay={0.1}
            />
          </div>
          <div role="listitem">
            <StatCounter
              end={95}
              suffix="%"
              label="Safe Recycling Rate"
              sublabel="Industry-leading standard"
              isInView={isInView}
              delay={0.2}
            />
          </div>
          <div role="listitem">
            <StatCounter
              end={28}
              suffix=" T"
              label="E-Waste Recycled"
              sublabel="Metric tons this year"
              isInView={isInView}
              delay={0.3}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/15 mt-14 pt-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: "8", label: "States Active" },
              { value: "4.8★", label: "Citizen Rating" },
              { value: "48 hrs", label: "Avg. Pickup Time" },
              { value: "₹0", label: "Cost to Citizens" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <p className="text-lg font-bold text-white">{item.value}</p>
                <p className="text-xs text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
