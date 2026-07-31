"use client";

import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import { AdminStatCard } from "@/components/admin";
import { MdBarChart, MdTrendingUp, MdCo2, MdForest, MdPeople, MdRecycling } from "react-icons/md";

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="National E-Waste Analytics Hub"
        subtitle="Comprehensive data analytics on nationwide collection trends, district performance, and environmental offsets."
        badge="Analytics & Insights"
      />

      {/* Top Impact Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AdminStatCard
          title="Carbon Reduced"
          value="1,420 Tonnes"
          subtitle="CO₂ Equivalent"
          icon={<MdCo2 className="w-6 h-6" />}
          iconBg="bg-green-50"
          iconColor="text-[var(--color-accent)]"
        />
        <AdminStatCard
          title="Trees Offset"
          value="58,000"
          subtitle="Mature Tree Equiv."
          icon={<MdForest className="w-6 h-6" />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-700"
        />
        <AdminStatCard
          title="Citizen Active"
          value="78.4%"
          subtitle="Participation Rate"
          icon={<MdPeople className="w-6 h-6" />}
          iconBg="bg-blue-50"
          iconColor="text-[var(--color-primary)]"
        />
        <AdminStatCard
          title="Metals Recovered"
          value="182 Tonnes"
          subtitle="Gold, Copper, Al"
          icon={<MdRecycling className="w-6 h-6" />}
          iconBg="bg-amber-50"
          iconColor="text-amber-700"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chart 1: Collection Growth Trend */}
        <DashboardCard title="Annual E-Waste Collection Trend (Tonnes)" subtitle="2025 vs 2026 Comparison">
          <div className="w-full pt-4">
            <svg viewBox="0 0 500 160" className="w-full h-44 overflow-visible">
              <line x1="30" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeDasharray="4 4" />
              <line x1="30" y1="70" x2="480" y2="70" stroke="#E2E8F0" strokeDasharray="4 4" />
              <line x1="30" y1="120" x2="480" y2="120" stroke="#CBD5E1" />

              {/* Area path for 2026 */}
              <path
                d="M 50 110 Q 150 60 250 80 T 450 30 L 450 120 L 50 120 Z"
                fill="#003366"
                opacity="0.15"
              />
              <path
                d="M 50 110 Q 150 60 250 80 T 450 30"
                fill="none"
                stroke="#003366"
                strokeWidth="3"
              />
              <circle cx="450" cy="30" r="5" fill="#003366" />
            </svg>
          </div>
        </DashboardCard>

        {/* Chart 2: Category Breakdown */}
        <DashboardCard title="Category Wise Material Recovery" subtitle="Ferrous, Non-Ferrous & Precious Metals">
          <div className="flex flex-col gap-3 text-xs pt-2">
            {[
              { cat: "Computers & Servers", pct: 42, weight: "596 Tonnes", color: "bg-[var(--color-primary)]" },
              { cat: "Mobile Communication", pct: 28, weight: "397 Tonnes", color: "bg-[var(--color-secondary)]" },
              { cat: "Large Household Appliances", pct: 18, weight: "255 Tonnes", color: "bg-[var(--color-accent)]" },
              { cat: "Consumer Electronics", pct: 12, weight: "172 Tonnes", color: "bg-amber-600" },
            ].map((c) => (
              <div key={c.cat} className="flex flex-col gap-1">
                <div className="flex justify-between font-bold text-[var(--color-text)]">
                  <span>{c.cat}</span>
                  <span className="font-mono text-slate-500">{c.weight} ({c.pct}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
