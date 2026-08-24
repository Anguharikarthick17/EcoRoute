"use client";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MdCable,
  MdBatteryCharging80,
  MdKitchen,
  MdLayers,
  MdDescription,
  MdAutoAwesome,
  MdTv,
  MdSettingsSuggest,
  MdHandyman,
  MdDeleteOutline,
  MdElectricBolt,
} from "react-icons/md";
import { FaBoxesStacked } from "react-icons/fa6";
import { GiMetalBar, GiAnvil } from "react-icons/gi";
import Link from "next/link";

const CATEGORIES = [
  { id: "cat-copper", icon: MdElectricBolt, label: "Copper Scrap", desc: "Windings, coils & pure copper wires", rate: "₹700 – ₹780/kg" },
  { id: "cat-aluminium", icon: GiMetalBar, label: "Aluminium", desc: "Heatsinks, frames, sheets & cans", rate: "₹160 – ₹200/kg" },
  { id: "cat-brass", icon: MdHandyman, label: "Brass Scrap", desc: "Fittings, valves, utensils & taps", rate: "₹420 – ₹490/kg" },
  { id: "cat-iron", icon: GiAnvil, label: "Iron & Steel", desc: "Grills, rods, heavy structural scrap", rate: "₹32 – ₹40/kg" },
  { id: "cat-appliances", icon: MdKitchen, label: "Appliances", desc: "Washing machines, fridges & ACs", rate: "₹1,200 – ₹3,500/unit" },
  { id: "cat-ewaste", icon: MdTv, label: "E-Waste", desc: "Laptops, mobiles, TVs & monitors", rate: "₹350 – ₹2,500/unit" },
  { id: "cat-cables", icon: MdCable, label: "Cables & Wires", desc: "Power cables, adapters & wiring", rate: "₹180 – ₹300/kg" },
  { id: "cat-batteries", icon: MdBatteryCharging80, label: "Batteries", desc: "Lead acid, inverter & UPS cells", rate: "₹75 – ₹110/kg" },
  { id: "cat-paper", icon: MdDescription, label: "Paper Scrap", desc: "Newspapers, books & office paper", rate: "₹14 – ₹18/kg" },
  { id: "cat-cardboard", icon: FaBoxesStacked, label: "Cardboard", desc: "Corrugated shipping boxes & cartons", rate: "₹9 – ₹13/kg" },
  { id: "cat-plastic", icon: MdDeleteOutline, label: "Plastic Scrap", desc: "HDPE containers, drums & shells", rate: "₹18 – ₹35/kg" },
  { id: "cat-other", icon: MdLayers, label: "Other Scrap", desc: "Mixed recyclable scrap items", rate: "Market Valued" },
] as const;

export function RecyclingCategories() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="bg-white border-b border-slate-200/80 py-16 lg:py-24"
    >
      <Container>
        <SectionTitle
          title="Supported Recyclable Scrap Categories"
          subtitle="EcoRoute AI recognizes all standard household and commercial scrap materials with transparent pricing."
          align="center"
          showRule
          badge="Materials Accepted"
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="flex flex-col p-4 sm:p-5 bg-slate-50/70 border border-slate-200 rounded-2xl hover:border-emerald-500/40 hover:bg-white hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                    {cat.rate}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                  {cat.label}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-slate-500">
            Have scrap that is not listed here? Upload a photo to let{" "}
            <Link href="/dashboard/upload" className="text-emerald-700 font-extrabold hover:underline">
              EcoRoute AI Scrap Vision
            </Link>{" "}
            identify and value it automatically.
          </p>
        </div>
      </Container>
    </section>
  );
}
