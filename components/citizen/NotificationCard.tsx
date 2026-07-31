import type { CitizenNotification } from "@/types/citizen";
import { cn } from "@/lib/utils";
import {
  MdNotifications,
  MdLocalShipping,
  MdEmojiEvents,
  MdAccessTime,
  MdCampaign,
  MdArrowForward,
} from "react-icons/md";
import Link from "next/link";

interface NotificationCardProps {
  notification: CitizenNotification;
  onMarkRead?: (id: string) => void;
}

const TYPE_CONFIG = {
  pickup: {
    icon: MdLocalShipping,
    bg: "bg-blue-50",
    color: "text-[var(--color-primary)]",
    label: "Pickup Update",
  },
  notice: {
    icon: MdCampaign,
    bg: "bg-amber-50",
    color: "text-amber-700",
    label: "Government Notice",
  },
  reward: {
    icon: MdEmojiEvents,
    bg: "bg-emerald-50",
    color: "text-[var(--color-accent)]",
    label: "Green Points",
  },
  reminder: {
    icon: MdAccessTime,
    bg: "bg-purple-50",
    color: "text-purple-700",
    label: "Reminder",
  },
  system: {
    icon: MdNotifications,
    bg: "bg-slate-100",
    color: "text-slate-700",
    label: "System Alert",
  },
};

export function NotificationCard({
  notification,
  onMarkRead,
}: NotificationCardProps) {
  const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.system;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "p-4 rounded-lg border transition-all duration-200 flex items-start gap-4",
        notification.read
          ? "bg-white border-[var(--color-border)] opacity-85"
          : "bg-blue-50/30 border-blue-200 shadow-sm",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5",
          config.bg,
          config.color,
        )}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
              config.bg,
              config.color,
            )}
          >
            {config.label}
          </span>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {notification.timestamp}
          </span>
        </div>

        <h4 className="text-sm font-bold text-[var(--color-text)] mt-1">
          {notification.title}
        </h4>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">
          {notification.message}
        </p>

        {notification.actionUrl && (
          <div className="mt-2">
            <Link
              href={notification.actionUrl}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-secondary)] hover:underline"
            >
              {notification.actionLabel || "View Details"}
              <MdArrowForward className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {!notification.read && onMarkRead && (
        <button
          onClick={() => onMarkRead(notification.id)}
          className="text-xs font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] shrink-0 pt-1"
          title="Mark as read"
        >
          Mark Read
        </button>
      )}
    </div>
  );
}
