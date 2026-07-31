"use client";

import { useState, useEffect } from "react";
import { CitizenSectionHeader, NotificationCard } from "@/components/citizen";
import type { CitizenNotification } from "@/types/citizen";
import { MdDoneAll, MdFilterList, MdDeleteSweep } from "react-icons/md";

const MOCK_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: "notif-1",
    title: "Pickup Agent Assigned",
    message: "Agent Suresh Verma (DL 01 AB 8941) assigned for tomorrow's pickup at 10:00 AM.",
    timestamp: "Today, 09:30 AM",
    type: "pickup",
    read: false,
    actionUrl: "/dashboard/pickups/REQ-2026-8941",
    actionLabel: "View Request",
  },
  {
    id: "notif-2",
    title: "+50 Green Points Credited",
    message: "Your account was credited 50 points for successful laptop recycling.",
    timestamp: "Yesterday, 04:15 PM",
    type: "reward",
    read: false,
    actionUrl: "/dashboard/rewards",
    actionLabel: "Check Rewards",
  },
  {
    id: "notif-3",
    title: "Digital Certificate Ready",
    message: "Certificate #CERT-DL-8902 is available for download.",
    timestamp: "28 Jul 2026",
    type: "pickup",
    read: true,
    actionUrl: "/dashboard/certificates",
    actionLabel: "Download Certificate",
  },
  {
    id: "notif-4",
    title: "CPCB Circular: National E-Waste Week",
    message: "Earn 2x points on all e-waste pickups scheduled from 1st - 7th August.",
    timestamp: "25 Jul 2026",
    type: "notice",
    read: true,
    actionUrl: "/dashboard/schedule-pickup",
    actionLabel: "Book Now",
  },
];

export default function NotificationsPage() {
  const [items, setItems] = useState<CitizenNotification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>("all");

  // Load dynamic notifications stored when buyers order scrap
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ecoroute_notifications");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge dynamic notifications with mock ones, preventing duplicates
          const mockIds = new Set(MOCK_NOTIFICATIONS.map((n) => n.id));
          const customOnly = parsed.filter((n: any) => !mockIds.has(n.id));
          setItems([...customOnly, ...MOCK_NOTIFICATIONS]);
        }
      }
    } catch {}
  }, []);

  const handleMarkRead = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      try {
        localStorage.setItem("ecoroute_notifications", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleMarkAllRead = () => {
    setItems((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      try {
        localStorage.setItem("ecoroute_notifications", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearNotifications = () => {
    setItems(MOCK_NOTIFICATIONS);
    try {
      localStorage.removeItem("ecoroute_notifications");
    } catch {}
  };

  const filteredItems = items.filter((item) => {
    if (filter === "unread") return !item.read;
    if (filter === "pickup") return item.type === "pickup";
    if (filter === "reward") return item.type === "reward";
    if (filter === "notice") return item.type === "notice";
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Notifications Hub"
        subtitle="Stay updated on buyer orders, pickup schedules, reward points, and CPCB circulars."
        badge="Activity Stream"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-border)] text-xs font-semibold hover:bg-slate-50 cursor-pointer"
            >
              <MdDoneAll className="w-4 h-4 text-[var(--color-accent)]" />
              Mark All as Read
            </button>
          </div>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3 overflow-x-auto text-xs">
        <span className="font-bold text-[var(--color-text-muted)] shrink-0 flex items-center gap-1">
          <MdFilterList className="w-4 h-4" /> Filter:
        </span>
        {[
          { id: "all", label: `All Notifications (${items.length})` },
          { id: "unread", label: `Unread (${items.filter(n => !n.read).length})` },
          { id: "pickup", label: "Pickups & Orders" },
          { id: "reward", label: "Rewards" },
          { id: "notice", label: "CPCB Notices" },
        ].map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-slate-100 text-[var(--color-text-muted)] hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Notification Items List */}
      <div className="flex flex-col gap-3">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center text-xs text-[var(--color-text-muted)] bg-slate-50 border rounded-lg">
            No notifications found in this view.
          </div>
        ) : (
          filteredItems.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onMarkRead={handleMarkRead}
            />
          ))
        )}
      </div>
    </div>
  );
}
