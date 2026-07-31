import type { RewardBadge } from "@/types/citizen";
import { cn } from "@/lib/utils";
import { MdEmojiEvents, MdLock } from "react-icons/md";

interface RewardCardProps {
  badge: RewardBadge;
}

export function RewardCard({ badge }: RewardCardProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-lg border flex flex-col justify-between gap-4 transition-all duration-200",
        badge.isUnlocked
          ? "bg-white border-green-200 shadow-sm hover:shadow-md"
          : "bg-slate-50 border-[var(--color-border)] opacity-75",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl shadow-inner",
            badge.isUnlocked
              ? "bg-emerald-100 text-[var(--color-accent)] border border-emerald-200"
              : "bg-slate-200 text-slate-500",
          )}
        >
          {badge.isUnlocked ? (
            <MdEmojiEvents className="w-7 h-7 text-[var(--color-accent)]" />
          ) : (
            <MdLock className="w-6 h-6 text-slate-400" />
          )}
        </div>

        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
            badge.isUnlocked
              ? "bg-emerald-50 text-[var(--color-accent)] border border-emerald-200"
              : "bg-slate-200 text-slate-600",
          )}
        >
          {badge.isUnlocked ? "Unlocked" : `${badge.pointsRequired} pts`}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold text-[var(--color-text)]">
          {badge.title}
        </h4>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          {badge.description}
        </p>
      </div>

      {/* Progress bar if locked */}
      {!badge.isUnlocked && (
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
            <span>Progress</span>
            <span>{badge.progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-[var(--color-secondary)] rounded-full transition-all duration-300"
              style={{ width: `${badge.progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
