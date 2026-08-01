export interface ChatMessage {
  id: string;
  sender: "seller" | "buyer";
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  threadId: string;
  buyerName: string;
  buyerPhone: string;
  itemName: string;
  itemPrice: string;
  messages: ChatMessage[];
  updatedAt: string;
}

const STORAGE_KEY = "ecoroute_chat_threads";

export function getChatThreads(): Record<string, ChatThread> {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function getChatThread(threadId: string): ChatThread | null {
  const threads = getChatThreads();
  return threads[threadId] || null;
}

export function saveChatThread(thread: ChatThread) {
  if (typeof window === "undefined") return;
  try {
    const threads = getChatThreads();
    threads[thread.threadId] = thread;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  } catch (e) {
    console.error("Error saving chat thread", e);
  }
}

export function createOrGetThread(
  threadId: string,
  buyerName: string,
  buyerPhone: string,
  itemName: string,
  itemPrice: string,
  initialBuyerMessage?: string
): ChatThread {
  const existing = getChatThread(threadId);
  if (existing) return existing;

  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const initialMessages: ChatMessage[] = [
    {
      id: `msg-0`,
      sender: "buyer",
      senderName: buyerName,
      text: `Hello! I have placed an order for your '${itemName}' (${itemPrice}).`,
      timestamp: now,
    },
  ];

  if (initialBuyerMessage) {
    initialMessages.push({
      id: `msg-1`,
      sender: "buyer",
      senderName: buyerName,
      text: initialBuyerMessage,
      timestamp: now,
    });
  }

  const newThread: ChatThread = {
    threadId,
    buyerName,
    buyerPhone,
    itemName,
    itemPrice,
    messages: initialMessages,
    updatedAt: new Date().toISOString(),
  };

  saveChatThread(newThread);
  return newThread;
}

// Simulated auto-reply responses from buyers for realistic demo interaction
const AUTO_REPLIES = [
  "Thank you for the update! I will be there as scheduled.",
  "Got it! Please keep the item packed and accessible.",
  "Yes, I will bring exact cash for the pickup.",
  "Perfect, see you soon!",
  "Great! I am on my way to collect the scrap item.",
];

export function sendChatMessage(
  threadId: string,
  sender: "seller" | "buyer",
  senderName: string,
  text: string,
  onAutoReply?: (replyMsg: ChatMessage) => void
): ChatThread | null {
  const thread = getChatThread(threadId);
  if (!thread) return null;

  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const newMsg: ChatMessage = {
    id: `msg-${Date.now()}`,
    sender,
    senderName,
    text,
    timestamp: timeStr,
  };

  thread.messages.push(newMsg);
  thread.updatedAt = new Date().toISOString();
  saveChatThread(thread);

  // If seller sent a message, create notification for buyer!
  if (sender === "seller" && typeof window !== "undefined") {
    try {
      const buyerNotifs = JSON.parse(localStorage.getItem("ecoroute_buyer_notifications") || "[]");
      const notif = {
        id: `buyer-notif-${Date.now()}`,
        title: `💬 New Message from Seller (${senderName})`,
        message: `Seller sent: "${text}" regarding item '${thread.itemName}'`,
        timestamp: timeStr,
        threadId,
        read: false,
      };
      localStorage.setItem("ecoroute_buyer_notifications", JSON.stringify([notif, ...buyerNotifs]));
    } catch {}
  }

  // If buyer sent a message, create notification for seller!
  if (sender === "buyer" && typeof window !== "undefined") {
    try {
      const sellerNotifs = JSON.parse(localStorage.getItem("ecoroute_notifications") || "[]");
      const notif = {
        id: `seller-notif-${Date.now()}`,
        title: `💬 Buyer Message from ${senderName}`,
        message: `Buyer '${senderName}' sent: "${text}" regarding '${thread.itemName}'`,
        timestamp: timeStr,
        type: "reward",
        read: false,
      };
      localStorage.setItem("ecoroute_notifications", JSON.stringify([notif, ...sellerNotifs]));
    } catch {}
  }

  return thread;
}
