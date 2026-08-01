"use client";

import { useState, useEffect } from "react";
import { CitizenSectionHeader, NotificationCard } from "@/components/citizen";
import { BuyerChatModal } from "@/components/citizen/BuyerChatModal";
import type { CitizenNotification } from "@/types/citizen";
import { MdDoneAll, MdFilterList, MdDeleteSweep } from "react-icons/md";

const MOCK_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: "notif-order-demo",
    title: "🚚 Scrap Order & Pickup Scheduled!",
    message: `Buyer 'Doms' (+91 98765 43210) has ordered your 'Extruded Aluminium & Metal Sheet Scrap' for ₹90 via CASH.\n\n📅 Scheduled Pickup Date: 2026-08-02 (10:00 AM - 01:00 PM)\n💬 Buyer Message: "I will arrive with exact cash to collect the item."`,
    timestamp: "Just now",
    type: "reward",
    read: false,
  },
  {
    id: "notif-1",
    title: "Pickup Agent Assigned",
    message: "Agent Suresh Verma (+91 98765 43210) assigned for tomorrow's pickup at 10:00 AM.",
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
  const [activeChatNotif, setActiveChatNotif] = useState<CitizenNotification | null>(null);

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

  const handleOpenChat = (notif: CitizenNotification) => {
    handleMarkRead(notif.id);
    setActiveChatNotif(notif);
  };

  const parseChatDetails = (n: CitizenNotification) => {
    const nameMatch = n.message.match(/Buyer\s*'([^']+)'/i) || n.message.match(/Buyer\s*([A-Za-z0-9\s]+)/i);
    const phoneMatch = n.message.match(/\(\+?[0-9\s-]+\)/) || n.message.match(/\+91\s*[0-9\s]+/);
    const itemMatch = n.message.match(/ordered your '([^']+)'/i) || n.message.match(/for your '([^']+)'/i);
    const priceMatch = n.message.match(/for\s*(₹[0-9,]+)/i);
    const noteMatch = n.message.match(/Buyer Message:\s*"([^"]+)"/i);

    return {
      buyerName: nameMatch ? nameMatch[1] : "Verified Recycler (Doms)",
      buyerPhone: phoneMatch ? phoneMatch[0].replace(/[()]/g, "").trim() : "+91 98765 43210",
      itemName: itemMatch ? itemMatch[1] : "Extruded Aluminium & Metal Sheet Scrap",
      itemPrice: priceMatch ? priceMatch[1] : "₹90",
      initialMessage: noteMatch ? noteMatch[1] : "I will arrive with exact cash to collect the item.",
    };
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
            <div key={n.id} onClick={() => handleOpenChat(n)} className="cursor-pointer">
              <NotificationCard
                notification={n}
                onMarkRead={handleMarkRead}
                onOpenChat={handleOpenChat}
              />
            </div>
          ))
        )}
      </div>

      {/* ── LIVE CHAT MESSAGING MODAL ────────────────────────────────────── */}
      {activeChatNotif && (
        <BuyerChatModal
          isOpen={!!activeChatNotif}
          onClose={() => setActiveChatNotif(null)}
          notificationId={activeChatNotif.id}
          {...parseChatDetails(activeChatNotif)}
        />
      )}
    </div>
  );
}
