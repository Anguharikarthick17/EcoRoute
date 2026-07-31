"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MdAdd, MdRemove } from "react-icons/md";

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Is the EcoRoute pickup service free for citizens?",
    answer:
      "Yes, the EcoRoute doorstep e-waste pickup service is completely free of charge for individual citizens and households. There are no collection fees, transportation charges, or processing costs. This service is funded through the Extended Producer Responsibility (EPR) framework mandated by the E-Waste Management Rules, 2022.",
  },
  {
    id: "faq-2",
    question: "What types of electronic devices does EcoRoute accept?",
    answer:
      "EcoRoute accepts a comprehensive range of electronic waste including mobile phones, laptops, desktop computers, televisions, home appliances, printers, cables, batteries, networking devices, and medical electronics. For a complete list, please refer to the Accepted Categories section. If you are unsure, use our AI Device Identification tool to instantly classify your device.",
  },
  {
    id: "faq-3",
    question: "How is my personal data protected when I hand over a device?",
    answer:
      "We strongly advise all citizens to perform a factory reset on devices before handover. Our trained collection agents will remind you of this step. Additionally, EcoRoute's certified recycling partners follow strict data destruction protocols compliant with IS/ISO 27001 standards. A data destruction certificate is available upon request for corporate and institutional contributors.",
  },
  {
    id: "faq-4",
    question: "How long does the pickup process take after I book a request?",
    answer:
      "Once your pickup request is confirmed, our logistics team will schedule a visit within 24 to 48 working hours depending on your location. You will receive an SMS and email notification with the agent's name, contact number, and scheduled time slot. You can also track the status in real time through your EcoRoute portal dashboard.",
  },
] as const;

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white border-b border-[var(--color-border)]"
    >
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: Heading ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle
              title="Frequently Asked Questions"
              subtitle="Quick answers to the most common questions from citizens about EcoRoute's e-waste management services."
              align="left"
              showRule
              badge="FAQ"
            />
            <a
              href="/help"
              className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors no-underline"
              aria-label="View all frequently asked questions"
            >
              View All FAQs →
            </a>
          </motion.div>

          {/* ── Right: Accordion ──────────────────────────── */}
          <div
            className="flex flex-col divide-y divide-[var(--color-border)]"
            role="list"
            aria-label="Frequently asked questions"
          >
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <motion.div
                  key={item.id}
                  role="listitem"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <button
                    type="button"
                    id={`${item.id}-btn`}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)] rounded"
                  >
                    <span className="text-sm font-semibold text-[var(--color-text)] leading-snug pr-2">
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 w-6 h-6 rounded border flex items-center justify-center transition-colors duration-200 ${
                        isOpen
                          ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                          : "bg-white border-[var(--color-border)] text-[var(--color-text-muted)]"
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <MdRemove className="w-4 h-4" />
                      ) : (
                        <MdAdd className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`${item.id}-panel`}
                        role="region"
                        aria-labelledby={`${item.id}-btn`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm text-[var(--color-text-muted)] leading-relaxed border-l-2 border-[var(--color-primary)] pl-4 ml-0.5">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
