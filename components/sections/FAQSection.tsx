"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MdAdd, MdRemove } from "react-icons/md";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "How does the EcoRoute AI Scrap Vision price estimate work?",
    answer:
      "When you upload or snap a photo of your scrap items (metals, electronics, appliances, paper, etc.), EcoRoute's vision model detects the material category, estimates weight, and provides a realistic market price range based on live regional scrap commodity rates. Final weight is confirmed during dealer physical pickup.",
  },
  {
    id: "faq-2",
    question: "Is there any cost for households to list scrap on EcoRoute?",
    answer:
      "Listing your scrap and receiving dealer pickup requests on EcoRoute is 100% free for households. Dealers pay you directly via Cash or UPI on pickup.",
  },
  {
    id: "faq-3",
    question: "Who are the scrap dealers on EcoRoute?",
    answer:
      "EcoRoute partners with verified local scrap shops, kabadiwalas, and authorized recyclers operating in your city and neighborhood. Dealers can view nearby listings, propose offers, and arrange scheduled doorstep collection.",
  },
  {
    id: "faq-4",
    question: "What types of recyclable scrap can I sell?",
    answer:
      "You can sell almost any recyclable scrap, including Copper wire and armature windings, Aluminium sheets and heatsinks, Brass fittings, Iron grills and rods, Old appliances (washing machines, fridges, ACs), E-waste (laptops, phones, monitors), Batteries, Paper, Cardboard boxes, and Plastic containers.",
  },
  {
    id: "faq-5",
    question: "How do scrap dealers benefit from AI Route Optimization?",
    answer:
      "Dealers accepting multiple pickups in a neighborhood can view an AI-optimized cluster route that sequences stops in shortest distance order, saving fuel and travel time.",
  },
] as const;

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white border-b border-slate-200/80 py-16 lg:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: Heading ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle
              title="Frequently Asked Questions"
              subtitle="Quick answers to common questions about selling scrap, AI identification, dealer pickups, and payments."
              align="left"
              showRule
              badge="FAQ"
            />
            <Link
              href="/dashboard/help"
              className="inline-flex items-center gap-1.5 mt-6 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors no-underline"
            >
              Have more questions? Visit Help Center →
            </Link>
          </motion.div>

          {/* ── Right: Accordion ──────────────────────────── */}
          <div
            className="flex flex-col divide-y divide-slate-200"
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
                    className="w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 rounded-lg cursor-pointer"
                  >
                    <span className="text-sm font-extrabold text-slate-900 leading-snug pr-2">
                      {item.question}
                    </span>
                    <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                      {isOpen ? (
                        <MdRemove className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                      ) : (
                        <MdAdd className="w-4 h-4 text-slate-600" aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${item.id}-panel`}
                        role="region"
                        aria-labelledby={`${item.id}-btn`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-xs text-slate-600 leading-relaxed max-w-2xl">
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
