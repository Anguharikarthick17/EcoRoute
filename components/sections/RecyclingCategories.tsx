"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MdSmartphone,
  MdLaptop,
  MdDesktopMac,
  MdTv,
  MdKitchen,
  MdPrint,
  MdCable,
  MdBatteryCharging80,
  MdRouter,
  MdLocalHospital,
} from "react-icons/md";

const CATEGORIES = [
  { id: "cat-mobile", icon: MdSmartphone, label: "Mobile Phones", count: "4,200+ collected" },
  { id: "cat-laptop", icon: MdLaptop, label: "Laptops", count: "2,800+ collected" },
  { id: "cat-desktop", icon: MdDesktopMac, label: "Desktop Computers", count: "1,500+ collected" },
  { id: "cat-tv", icon: MdTv, label: "Televisions", count: "900+ collected" },
  { id: "cat-appliance", icon: MdKitchen, label: "Home Appliances", count: "1,100+ collected" },
  { id: "cat-printer", icon: MdPrint, label: "Printers & Scanners", count: "600+ collected" },
  { id: "cat-cable", icon: MdCable, label: "Cables & Accessories", count: "3,000+ collected" },
  { id: "cat-battery", icon: MdBatteryCharging80, label: "Batteries", count: "5,500+ collected" },
  { id: "cat-network", icon: MdRouter, label: "Networking Devices", count: "800+ collected" },
  { id: "cat-medical", icon: MdLocalHospital, label: "Medical Electronics", count: "300+ collected" },
] as const;

export function RecyclingCategories() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="locate-centre"
      aria-labelledby="categories-heading"
      className="bg-[var(--color-background)] border-b border-[var(--color-border)]"
    >
      <Container className="py-16 lg:py-20">
        <SectionTitle
          title="Accepted Recycling Categories"
          subtitle="EcoRoute accepts all major categories of electronic waste. Not sure if your device qualifies? Use our AI identification tool."
          align="center"
          showRule
          badge="Categories"
        />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                id={cat.id}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.055 }}
                className="flex flex-col items-center text-center gap-3 p-4 bg-white border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                aria-label={`${cat.label}: ${cat.count}`}
              >
                <div
                  className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/8 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text)] leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                    {cat.count}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-xs text-[var(--color-text-muted)]">
          Don&rsquo;t see your device?{" "}
          <a
            href="/services"
            className="text-[var(--color-secondary)] font-medium underline underline-offset-2 hover:text-[var(--color-primary)] transition-colors"
          >
            View all accepted categories
          </a>{" "}
          or contact our helpline at{" "}
          <a
            href="tel:18002007911"
            className="text-[var(--color-secondary)] font-medium underline underline-offset-2 hover:text-[var(--color-primary)] transition-colors"
          >
            1800-200-7911
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
