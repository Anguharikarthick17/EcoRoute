"use client";

import { CitizenSectionHeader, DashboardCard, RewardCard, DataTable } from "@/components/citizen";
import type { RewardBadge, Milestone, LeaderboardEntry } from "@/types/citizen";
import { MdEmojiEvents, MdStar, MdVerified, MdCheckCircle } from "react-icons/md";

const MOCK_BADGES: RewardBadge[] = [
  {
    id: "b-1",
    title: "E-Waste Warrior",
    description: "Recycled over 100 kg of electronic waste responsibly.",
    iconName: "warrior",
    isUnlocked: true,
    unlockedAt: "15 Jul 2026",
    pointsRequired: 100,
    progressPercent: 100,
  },
  {
    id: "b-2",
    title: "Green Pioneer",
    description: "Completed 10 doorstep pickup requests through EcoRoute.",
    iconName: "pioneer",
    isUnlocked: true,
    unlockedAt: "20 Jul 2026",
    pointsRequired: 250,
    progressPercent: 100,
  },
  {
    id: "b-3",
    title: "CPCB Eco Champion",
    description: "Achieve 500 Green Points and earn official MoEFCC recognition.",
    iconName: "champion",
    isUnlocked: false,
    pointsRequired: 500,
    progressPercent: 90, // 450/500
  },
  {
    id: "b-4",
    title: "Zero Waste Hero",
    description: "Recycle items across all 10 electronic waste categories.",
    iconName: "hero",
    isUnlocked: false,
    pointsRequired: 1000,
    progressPercent: 40,
  },
];

const MOCK_MILESTONES: Milestone[] = [
  { id: "m-1", title: "Recycle 5 Laptops", target: "5 Units", current: "5 Units", completed: true, points: 100 },
  { id: "m-2", title: "Offset 200 kg CO₂", target: "200 kg", current: "142 kg", completed: false, points: 150 },
  { id: "m-3", title: "Refer 3 Neighbors", target: "3 Referrals", current: "2 Referrals", completed: false, points: 75 },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Anita Sharma", city: "New Delhi", points: 1250, pickupsDone: 34 },
  { rank: 2, name: "Vikram Malhotra", city: "South Delhi", points: 980, pickupsDone: 28 },
  { rank: 3, name: "Priya Patel", city: "North Delhi", points: 840, pickupsDone: 22 },
  { rank: 12, name: "Rajesh Kumar (You)", city: "New Delhi", points: 450, pickupsDone: 14, isCurrentUser: true },
];

export default function RewardsPage() {
  const leaderboardColumns = [
    {
      header: "Rank",
      accessor: (row: LeaderboardEntry) => (
        <span className={`font-bold font-mono ${row.isCurrentUser ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"}`}>
          #{row.rank}
        </span>
      ),
    },
    {
      header: "Citizen Name",
      accessor: (row: LeaderboardEntry) => (
        <span className={`font-semibold ${row.isCurrentUser ? "text-[var(--color-primary)] font-bold" : "text-[var(--color-text)]"}`}>
          {row.name}
        </span>
      ),
    },
    {
      header: "District",
      accessor: (row: LeaderboardEntry) => (
        <span className="text-xs text-[var(--color-text-muted)]">{row.city}</span>
      ),
    },
    {
      header: "Pickups",
      accessor: (row: LeaderboardEntry) => (
        <span className="font-semibold text-[var(--color-text)]">{row.pickupsDone}</span>
      ),
    },
    {
      header: "Green Points",
      accessor: (row: LeaderboardEntry) => (
        <span className="font-bold text-[var(--color-accent)]">{row.points} pts</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Green Points & Rewards"
        subtitle="Earn government recognition, badges, and civic rewards for responsible e-waste recycling."
        badge="Citizen Rewards"
      />

      {/* Points Balance Hero Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-[var(--color-accent)] rounded-lg p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center shrink-0">
            <MdEmojiEvents className="w-9 h-9 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Total Green Points Balance
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">450</span>
              <span className="text-sm font-semibold text-emerald-100">Points</span>
            </div>
            <p className="text-xs text-white/80 mt-1">
              50 points away from unlocking <strong className="text-white">CPCB Eco Champion</strong> badge!
            </p>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded bg-white text-[var(--color-accent)] font-bold text-xs hover:bg-slate-100 shadow shrink-0">
          Redeem Civic Rewards
        </button>
      </div>

      {/* Badges & Achievements Grid */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          Badges & Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_BADGES.map((b) => (
            <RewardCard key={b.id} badge={b} />
          ))}
        </div>
      </div>

      {/* Milestones & Leaderboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Milestones Card */}
        <DashboardCard title="Environmental Milestones" subtitle="Complete goals to earn extra points">
          <div className="flex flex-col gap-4 text-xs">
            {MOCK_MILESTONES.map((m) => (
              <div key={m.id} className="p-3 bg-slate-50 border rounded flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.completed ? "bg-emerald-100 text-[var(--color-accent)]" : "bg-slate-200 text-slate-500"}`}>
                    <MdCheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text)]">{m.title}</h4>
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                      Progress: {m.current} / {m.target}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-[var(--color-accent)] bg-emerald-50 px-2 py-1 rounded border border-emerald-200 shrink-0">
                  +{m.points} pts
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* District Leaderboard Table */}
        <DashboardCard title="New Delhi District Leaderboard" subtitle="Top citizen contributors">
          <DataTable
            columns={leaderboardColumns}
            data={MOCK_LEADERBOARD}
            keyExtractor={(row) => row.rank}
          />
        </DashboardCard>
      </div>
    </div>
  );
}
