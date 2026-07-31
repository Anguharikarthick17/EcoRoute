"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MdWarningAmber,
  MdInventory,
  MdGavel,
  MdChecklist,
  MdArrowForward,
} from "react-icons/md";

const AWARENESS_CARDS = [
  {
    id: "aw-1",
    icon: MdWarningAmber,
    title: "Why E-Waste Matters",
    summary:
      "India generates over 3.2 million metric tonnes of e-waste annually, making it the third-largest producer globally. Improper disposal contaminates soil and water, posing serious health risks.",
    href: "/awareness/why-ewaste-matters",
    tags: ["Environment", "Health", "Policy"],
    color: "text-[var(--color-warning)]",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    id: "aw-2",
    icon: MdInventory,
    title: "How to Prepare Your Devices",
    summary:
      "Before handing over devices, back up your data, perform a factory reset, and remove SIM/memory cards. Our guide walks you through each device category step-by-step.",
    href: "/awareness/prepare-devices",
    tags: ["Data Security", "Guide", "Privacy"],
    color: "text-[var(--color-secondary)]",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: "aw-3",
    icon: MdGavel,
    title: "Government Guidelines",
    summary:
      "The E-Waste Management Rules, 2022 mandate producers, consumers and recyclers to follow specific protocols. Learn your rights and obligations under the extended producer responsibility framework.",
    href: "/awareness/government-guidelines",
    tags: ["EPR", "Compliance", "Legal"],
    color: "text-[var(--color-primary)]",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    id: "aw-4",
    icon: MdChecklist,
    title: "Responsible Disposal Tips",
    summary:
      "Simple, actionable steps every citizen can follow: avoid bin disposal, choose authorised centres, demand recycling certificates, and report illegal dumping via the EcoRoute app.",
    href: "/awareness/disposal-tips",
    tags: ["Action", "Citizens", "Tips"],
    color: "text-[var(--color-accent)]",
    bg: "bg-green-50",
    border: "border-green-200",
  },
] as const;

export function AwarenessSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="awareness"
      aria-labelledby="awareness-heading"
      className="bg-[var(--color-background)] border-b border-[var(--color-border)]"
    >
      <Container className="py-16 lg:py-20">
        <SectionTitle
          title="Citizen Awareness"
          subtitle="Informed citizens are the cornerstone of responsible e-waste management. Explore our awareness resources and make a difference."
          align="center"
          showRule
          badge="Awareness"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {AWARENESS_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.id}
                id={card.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="group bg-white border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                aria-labelledby={`${card.id}-title`}
              >
                {/* Top accent */}
                <div className={`h-1 ${card.bg} border-b ${card.border}`} aria-hidden="true" />

                <div className="p-5 flex flex-col gap-4">
                  {/* Icon + Tags */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${card.bg} border ${card.border} flex items-center justify-center shrink-0`}
                      aria-hidden="true"
                    >
                      <Icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-muted)] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3
                      id={`${card.id}-title`}
                      className="text-sm font-bold text-[var(--color-text)] leading-snug"
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {card.summary}
                    </p>
                  </div>

                  {/* Link */}
                  <Link
                    href={card.href}
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${card.color} hover:underline underline-offset-2 transition-colors no-underline group-hover:gap-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)] rounded`}
                    aria-label={`Read more about ${card.title}`}
                  >
                    Read More
                    <MdArrowForward className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
