"use client";

import { Container } from "@/components/ui/Container";
import {
  MdAutoAwesome,
  MdStorefront,
  MdCurrencyRupee,
  MdLocalShipping,
  MdRecycling,
} from "react-icons/md";

export function TrustIndicators() {
  const TRUST_ITEMS = [
    {
      id: "ti-1",
      icon: MdAutoAwesome,
      label: "AI Scrap Vision",
      sub: "Instant material & price estimate",
      iconColor: "text-emerald-600",
      bg: "bg-emerald-50/70",
      border: "border-emerald-100",
    },
    {
      id: "ti-2",
      icon: MdStorefront,
      label: "Verified Local Dealers",
      sub: "Direct connection with trusted shops",
      iconColor: "text-cyan-600",
      bg: "bg-cyan-50/70",
      border: "border-cyan-100",
    },
    {
      id: "ti-3",
      icon: MdCurrencyRupee,
      label: "Fair Price Discovery",
      sub: "Transparent market scrap rates",
      iconColor: "text-amber-600",
      bg: "bg-amber-50/70",
      border: "border-amber-100",
    },
    {
      id: "ti-4",
      icon: MdLocalShipping,
      label: "Doorstep Pickup",
      sub: "Convenient home collection",
      iconColor: "text-indigo-600",
      bg: "bg-indigo-50/70",
      border: "border-indigo-100",
    },
    {
      id: "ti-5",
      icon: MdRecycling,
      label: "Circular Economy",
      sub: "100% recyclable recovery",
      iconColor: "text-teal-600",
      bg: "bg-teal-50/70",
      border: "border-teal-100",
    },
  ];

  return (
    <section
      id="trust"
      aria-label="Platform Highlights"
      className="bg-white border-b border-slate-200/80 py-6"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${item.bg} ${item.border} shadow-2xs hover:shadow-xs transition-shadow duration-200`}
              >
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon className={`w-5 h-5 ${item.iconColor}`} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-900 leading-tight truncate">
                    {item.label}
                  </p>
                  <p className="text-[10px] font-medium text-slate-600 mt-0.5 leading-tight line-clamp-1">
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
