"use client";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MdCameraAlt,
  MdAutoAwesome,
  MdCurrencyRupee,
  MdStorefront,
  MdLocalShipping,
} from "react-icons/md";

export function HowItWorks() {
  const STEPS = [
    {
      number: "01",
      icon: MdCameraAlt,
      title: "1. Upload Your Scrap",
      description: "Take a photo or upload an image of your recyclable scrap items.",
      id: "step-upload",
    },
    {
      number: "02",
      icon: MdAutoAwesome,
      title: "2. AI Identifies It",
      description: "EcoRoute AI vision analyzes the material, weight, and category.",
      id: "step-ai",
    },
    {
      number: "03",
      icon: MdCurrencyRupee,
      title: "3. Get an Estimate",
      description: "Receive an instant approximate market value and weight range.",
      id: "step-estimate",
    },
    {
      number: "04",
      icon: MdStorefront,
      title: "4. Connect With a Dealer",
      description: "Nearby scrap shops discover your listing and request collection.",
      id: "step-dealer",
    },
    {
      number: "05",
      icon: MdLocalShipping,
      title: "5. Schedule Pickup",
      description: "The dealer collects the scrap directly from your doorstep.",
      id: "step-pickup",
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-slate-50 border-b border-slate-200/80 py-16 lg:py-24"
    >
      <Container>
        <SectionTitle
          title="How EcoRoute Works"
          subtitle="A simple 5-step journey connecting households with nearby scrap dealers — from image scan to doorstep pickup."
          align="center"
          showRule
          badge="Workflow"
        />

        <div className="mt-16 relative">
          {/* Connector line for desktop */}
          <div
            className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-200"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.id}
                  id={step.id}
                  className="flex flex-col items-center text-center gap-4 lg:px-2 group"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-18 h-18 rounded-2xl bg-white border-2 border-emerald-500/30 flex items-center justify-center text-emerald-700 shadow-md group-hover:scale-105 group-hover:border-emerald-600 transition-all duration-200 relative z-10">
                      <Icon className="w-8 h-8" aria-hidden="true" />
                    </div>
                    <span className="mt-2 text-[10px] font-black text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                      Step {step.number}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-1">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-[220px]">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
