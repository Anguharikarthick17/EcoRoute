import { cn } from "@/lib/utils";

interface AdminStatusBadgeProps {
  status: string;
  size?: "sm" | "md";
  className?: string;
}

const BADGE_MAP: Record<string, { bg: string; text: string; border: string }> = {
  // Common statuses
  Active: { bg: "bg-emerald-50", text: "text-[var(--color-accent)]", border: "border-emerald-200" },
  Approved: { bg: "bg-green-50", text: "text-[var(--color-accent)]", border: "border-green-200" },
  Operational: { bg: "bg-emerald-50", text: "text-[var(--color-accent)]", border: "border-emerald-200" },
  Completed: { bg: "bg-green-50", text: "text-[var(--color-accent)]", border: "border-green-200" },
  "On Duty": { bg: "bg-emerald-50", text: "text-[var(--color-accent)]", border: "border-emerald-200" },
  Available: { bg: "bg-emerald-50", text: "text-[var(--color-accent)]", border: "border-emerald-200" },

  // Warnings / In progress
  Pending: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  "In Progress": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  "On Route": { bg: "bg-blue-50", text: "text-[var(--color-primary)]", border: "border-blue-200" },
  Assigned: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  "In Transit": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },

  // Negative / Danger
  Suspended: { bg: "bg-red-50", text: "text-[var(--color-danger)]", border: "border-red-200" },
  Cancelled: { bg: "bg-red-50", text: "text-[var(--color-danger)]", border: "border-red-200" },
  Escalated: { bg: "bg-red-50", text: "text-[var(--color-danger)]", border: "border-red-200" },
  Urgent: { bg: "bg-red-50", text: "text-[var(--color-danger)]", border: "border-red-200" },
  Critical: { bg: "bg-red-100", text: "text-red-900 font-extrabold", border: "border-red-300" },
};

const DEFAULT_STYLE = { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" };

export function AdminStatusBadge({ status, size = "md", className }: AdminStatusBadgeProps) {
  const style = BADGE_MAP[status] || DEFAULT_STYLE;
  const sz = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-bold rounded-full border shrink-0",
        style.bg,
        style.text,
        style.border,
        sz,
        className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full bg-current shrink-0")} aria-hidden="true" />
      {status}
    </span>
  );
}
