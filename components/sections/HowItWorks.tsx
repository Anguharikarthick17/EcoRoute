"use client";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useTranslation } from "@/lib/i18n";
import {
  MdPhotoCamera,
  MdSmartToy,
  MdSchedule,
  MdLocalShipping,
  MdRecycling,
} from "react-icons/md";

export function HowItWorks() {
  const { t } = useTranslation();

  const STEPS = [
    {
      number: "01",
      icon: MdPhotoCamera,
      title: t("how.step1.title"),
      description: t("how.step1.desc"),
      id: "step-upload",
    },
    {
      number: "02",
      icon: MdSmartToy,
      title: t("how.step2.title"),
      description: t("how.step2.desc"),
      id: "step-ai",
    },
    {
      number: "03",
      icon: MdSchedule,
      title: t("how.step3.title"),
      description: t("how.step3.desc"),
      id: "step-schedule",
    },
    {
      number: "04",
      icon: MdLocalShipping,
      title: t("how.step4.title"),
      description: t("how.step4.desc"),
      id: "step-collect",
    },
    {
      number: "05",
      icon: MdRecycling,
      title: t("how.step5.title"),
      description: t("how.step5.desc"),
      id: "step-recycle",
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-[var(--color-background)] border-b border-[var(--color-border)]"
    >
      <Container className="py-16 lg:py-20">
        <SectionTitle
          title={t("how.title")}
          subtitle={t("how.subtitle")}
          align="center"
          showRule
          badge="Process"
        />

        <div className="mt-14 relative">
          <div
            className="hidden lg:block absolute top-[52px] left-[calc(10%+32px)] right-[calc(10%+32px)] h-0.5 bg-[var(--color-border)]"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.id}
                  id={step.id}
                  className="flex flex-col items-center text-center gap-4 lg:px-2"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] shadow-sm relative z-10">
                      <Icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <span className="mt-1 text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[var(--color-border)] shadow-xs">
                      Step {step.number}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-bold text-[var(--color-text)]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
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
