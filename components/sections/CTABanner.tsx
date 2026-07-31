"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useTranslation } from "@/lib/i18n";
import { MdArrowForward, MdLocationOn, MdRecycling } from "react-icons/md";

export function CTABanner() {
  const { t } = useTranslation();

  return (
    <section
      aria-label="Call to action"
      className="bg-[var(--color-primary)] text-white relative overflow-hidden"
    >
      <div className="gov-stripe" aria-hidden="true" />

      <Container className="py-16 lg:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <MdRecycling className="w-8 h-8" aria-hidden="true" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {t("cta.title")}
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            {t("cta.subtitle")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/pickup"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] transition-colors duration-200 no-underline shadow-md"
            >
              {t("cta.pickup")}
              <MdArrowForward className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/locate"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-colors duration-200 no-underline"
            >
              <MdLocationOn className="w-4 h-4" aria-hidden="true" />
              {t("cta.locate")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
