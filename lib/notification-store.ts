import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "pickup" | "reward" | "notice" | "reminder" | "system";
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  buyerName?: string;
  buyerPhone?: string;
  itemName?: string;
  itemPrice?: string;
}

const DEFAULT_NOTIFICATIONS: SystemNotification[] = [
  {
    id: "notif-order-demo",
    title: "🚚 Scrap Order & Pickup Scheduled!",
    message: `Buyer 'Doms' (+91 98765 43210) has ordered your 'Extruded Aluminium & Metal Sheet Scrap' for ₹90 via CASH.\n\n📅 Scheduled Pickup Date: 2026-08-02 (10:00 AM - 01:00 PM)\n💬 Buyer Message: "I will arrive with exact cash to collect the item."`,
    timestamp: "Just now",
    type: "reward",
    read: false,
    buyerName: "Doms",
    buyerPhone: "+91 98765 43210",
    itemName: "Extruded Aluminium & Metal Sheet Scrap",
    itemPrice: "₹90",
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
];

const globalStore = globalThis as unknown as {
  notificationsStore?: SystemNotification[];
};

if (!globalStore.notificationsStore) {
  globalStore.notificationsStore = [...DEFAULT_NOTIFICATIONS];
}

export function getNotificationsStore(): SystemNotification[] {
  return globalStore.notificationsStore || [...DEFAULT_NOTIFICATIONS];
}

export async function addNotification(notif: SystemNotification): Promise<SystemNotification[]> {
  if (!globalStore.notificationsStore) {
    globalStore.notificationsStore = [...DEFAULT_NOTIFICATIONS];
  }

  // Insert at front of array to appear at top of activity stream
  const existingIds = new Set(globalStore.notificationsStore.map((n) => n.id));
  if (!existingIds.has(notif.id)) {
    globalStore.notificationsStore = [notif, ...globalStore.notificationsStore];
  }

  // Sync to Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("notifications").insert({
        id: notif.id,
        title: notif.title,
        message: notif.message,
        type: notif.type,
        read: notif.read,
        created_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("Failed to sync notification to Supabase:", e);
    }
  }

  return globalStore.notificationsStore;
}

export function markNotificationRead(id: string): SystemNotification[] {
  if (!globalStore.notificationsStore) return [];
  globalStore.notificationsStore = globalStore.notificationsStore.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  return globalStore.notificationsStore;
}

export function markAllNotificationsRead(): SystemNotification[] {
  if (!globalStore.notificationsStore) return [];
  globalStore.notificationsStore = globalStore.notificationsStore.map((n) => ({
    ...n,
    read: true,
  }));
  return globalStore.notificationsStore;
}
