"use client";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MdAutoAwesome,
  MdCurrencyRupee,
  MdStorefront,
  MdLocalShipping,
  MdAltRoute,
  MdRecycling,
} from "react-icons/md";

const FEATURES = [
  {
    icon: MdAutoAwesome,
    title: "AI-Powered Identification",
    description: "Identify scrap materials, metals, electronics, and appliances in seconds using computer vision.",
    color: "emerald",
  },
  {
    icon: MdCurrencyRupee,
    title: "Better Price Discovery",
    description: "Get an accurate approximate market value based on live scrap rates before you sell.",
    color: "cyan",
  },
  {
    icon: MdStorefront,
    title: "Nearby Dealers",
    description: "Connect directly with verified local scrap shops in your locality without middlemen.",
    color: "amber",
  },
  {
    icon: MdLocalShipping,
    title: "Convenient Pickup",
    description: "Schedule hassle-free doorstep collection without having to transport heavy scrap yourself.",
    color: "indigo",
  },
  {
    icon: MdAltRoute,
    title: "Smart Route Optimization",
    description: "Empower dealers to cluster and collect multiple neighborhood pickups with minimal travel time.",
    color: "teal",
  },
  {
    icon: MdRecycling,
    title: "More Recycling Impact",
    description: "Keep metals, paper, plastics, and electronics out of dumping yards and in the circular loop.",
    color: "sky",
  },
];

export function WhyChoose() {
  return (
    <section
      id="why-choose"
      aria-labelledby="why-heading"
      className="bg-white border-b border-slate-200/80 py-16 lg:py-24"
    >
      <Container>
        <SectionTitle
          title="Why EcoRoute?"
          subtitle="A modern platform designed to solve real everyday challenges for households and local scrap shops."
          align="center"
          showRule
          badge="Platform Benefits"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500/40 hover:shadow-lg transition-all duration-250 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
