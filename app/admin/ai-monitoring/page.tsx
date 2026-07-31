"use client";

import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import { AdminStatCard } from "@/components/admin";
import { MdSmartToy, MdCheckCircle, MdPsychology, MdWarning, MdBuild } from "react-icons/md";

export default function AdminAIMonitoringPage() {
  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="AI Model & Vision System Health"
        subtitle="Real-time performance monitoring of EcoRoute AI image recognition and component classification engine."
        badge="AI Neural Engine v2.4"
      />

      {/* AI Key Performance Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <AdminStatCard
          title="Total AI Scans"
          value="18,420"
          subtitle="Processed Images"
          icon={<MdSmartToy className="w-5 h-5" />}
        />
        <AdminStatCard
          title="Accuracy"
          value="98.2%"
          subtitle="CPCB Benchmark"
          icon={<MdCheckCircle className="w-5 h-5" />}
          iconBg="bg-green-50"
          iconColor="text-[var(--color-accent)]"
        />
        <AdminStatCard
          title="Avg Confidence"
          value="96.4%"
          subtitle="High Certainty"
          icon={<MdPsychology className="w-5 h-5" />}
          iconBg="bg-blue-50"
          iconColor="text-[var(--color-primary)]"
        />
        <AdminStatCard
          title="Manual Review"
          value="1.8%"
          subtitle="Officer Override"
          icon={<MdWarning className="w-5 h-5" />}
          iconBg="bg-amber-50"
          iconColor="text-amber-700"
        />
        <AdminStatCard
          title="Rejected"
          value="42"
          subtitle="Blurry / Invalid"
          icon={<MdWarning className="w-5 h-5" />}
          iconBg="bg-red-50"
          iconColor="text-[var(--color-danger)]"
        />
        <AdminStatCard
          title="Queue Load"
          value="0.12s"
          subtitle="Avg Latency"
          icon={<MdBuild className="w-5 h-5" />}
          iconBg="bg-purple-50"
          iconColor="text-purple-700"
        />
      </div>

      {/* Main Grid: Health Monitor & Category Precision */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Columns: Category Precision & Verification Queue */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <DashboardCard title="Classification Model Accuracy by Category">
            <div className="flex flex-col gap-3 text-xs">
              {[
                { cat: "Laptops & Notebooks", acc: 99.1, samples: "6,200 Scans" },
                { cat: "Smartphones & Tablets", acc: 98.6, samples: "5,400 Scans" },
                { cat: "CRT & LCD Television", acc: 97.4, samples: "2,100 Scans" },
                { cat: "Home Refrigerators & ACs", acc: 96.8, samples: "1,800 Scans" },
                { cat: "Printed Circuit Boards (PCB)", acc: 95.2, samples: "2,920 Scans" },
              ].map((item) => (
                <div key={item.cat} className="flex flex-col gap-1">
                  <div className="flex justify-between font-semibold text-[var(--color-text)]">
                    <span>{item.cat} ({item.samples})</span>
                    <span className="font-mono font-bold text-[var(--color-accent)]">{item.acc}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${item.acc}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Right 1 Column: Model Status Card */}
        <div className="flex flex-col gap-6">
          <DashboardCard title="AI Neural Infrastructure Status">
            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-green-50 border border-green-200 rounded flex items-center justify-between">
                <span className="font-bold text-[var(--color-accent)]">TensorFlow Inference Server</span>
                <span className="text-[10px] font-bold uppercase text-[var(--color-accent)]">Healthy</span>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded flex items-center justify-between">
                <span className="font-bold text-[var(--color-accent)]">Vision Model v2.4 (Active)</span>
                <span className="text-[10px] font-bold uppercase text-[var(--color-accent)]">Optimal</span>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
                <span className="font-bold text-[var(--color-primary)]">Training Cluster Pipeline</span>
                <span className="text-[10px] font-bold uppercase text-[var(--color-primary)]">Idle</span>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
