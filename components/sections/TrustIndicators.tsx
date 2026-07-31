"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useTranslation } from "@/lib/i18n";
import {
  MdVerified,
  MdSmartToy,
  MdHub,
  MdPeople,
  MdNaturePeople,
} from "react-icons/md";

export function TrustIndicators() {
  const { t } = useTranslation();

  const TRUST_ITEMS = [
    {
      id: "ti-1",
      icon: MdVerified,
      label: t("trust.1.title"),
      sub: t("trust.1.sub"),
      color: "text-blue-950",
      iconColor: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      id: "ti-2",
      icon: MdSmartToy,
      label: t("trust.2.title"),
      sub: t("trust.2.sub"),
      color: "text-slate-950",
      iconColor: "text-sky-700",
      bg: "bg-sky-50",
      border: "border-sky-200",
    },
    {
      id: "ti-3",
      icon: MdHub,
      label: t("trust.3.title"),
      sub: t("trust.3.sub"),
      color: "text-emerald-950",
      iconColor: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      id: "ti-4",
      icon: MdPeople,
      label: t("trust.4.title"),
      sub: t("trust.4.sub"),
      color: "text-indigo-950",
      iconColor: "text-indigo-700",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
    },
    {
      id: "ti-5",
      icon: MdNaturePeople,
      label: t("trust.5.title"),
      sub: t("trust.5.sub"),
      color: "text-teal-950",
      iconColor: "text-teal-700",
      bg: "bg-teal-50",
      border: "border-teal-200",
    },
  ];

  return (
    <section
      id="trust"
      aria-label="Official trust indicators"
      className="bg-[var(--color-background)] border-b border-[var(--color-border)]"
    >
      <Container className="py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-md border ${item.bg} ${item.border} min-w-fit shadow-xs`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${item.iconColor}`} aria-hidden="true" />
                <div>
                  <p className={`text-xs font-bold ${item.color} leading-tight`}>
                    {item.label}
                  </p>
                  <p className="text-[11px] font-medium text-slate-700 mt-0.5">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
