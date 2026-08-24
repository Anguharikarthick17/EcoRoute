"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { useCountUp } from "@/hooks/useCountUp";

function StatCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  duration = 1800,
  delay = 0,
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
        className="text-4xl sm:text-5xl font-black text-white leading-none"
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
      <p className="text-sm font-bold text-slate-200 mt-2">{label}</p>
      {sublabel && (
        <p className="text-xs text-emerald-400 font-medium">{sublabel}</p>
      )}
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="impact-stats"
      aria-labelledby="stats-heading"
      className="bg-[#0F172A] text-white py-16 lg:py-24 border-b border-slate-800"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            Marketplace Activity
          </span>
          <h2
            id="stats-heading"
            className="text-3xl sm:text-4xl font-black text-white"
          >
            Local Scrap Marketplace Impact
          </h2>
          <div className="h-0.5 w-16 bg-emerald-500 mx-auto mt-4 rounded-full" aria-hidden="true" />
          <p className="text-sm text-slate-300 mt-4 max-w-lg mx-auto">
            Empowering households and local scrap shops with AI valuation and seamless collection.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          role="list"
          aria-label="Marketplace statistics"
        >
          <div role="listitem">
            <StatCounter
              end={12500}
              suffix="+"
              label="Completed Pickups"
              sublabel="Direct from households"
              isInView={isInView}
              delay={0}
            />
          </div>
          <div role="listitem">
            <StatCounter
              end={45}
              prefix="₹"
              suffix=" Lakh+"
              label="Paid to Sellers"
              sublabel="Direct cash & UPI"
              isInView={isInView}
              delay={0.1}
            />
          </div>
          <div role="listitem">
            <StatCounter
              end={350}
              suffix="+"
              label="Active Scrap Dealers"
              sublabel="Verified local shops"
              isInView={isInView}
              delay={0.2}
            />
          </div>
          <div role="listitem">
            <StatCounter
              end={28}
              suffix=" Tonnes"
              label="Recycled Scrap"
              sublabel="Diverted from landfills"
              isInView={isInView}
              delay={0.3}
            />
          </div>
        </div>

        {/* Highlight footer */}
        <div className="border-t border-slate-800 mt-14 pt-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: "4.9★", label: "Household Rating" },
              { value: "< 24 hrs", label: "Avg. Dealer Response" },
              { value: "100%", label: "Free for Sellers" },
              { value: "13+", label: "Scrap Categories" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <p className="text-lg font-black text-emerald-400">{item.value}</p>
                <p className="text-xs text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
