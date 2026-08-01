"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdClose,
  MdSend,
  MdPhone,
  MdWhatsapp,
  MdCheck,
  MdCheckCircle,
  MdVerified,
  MdChatBubbleOutline,
} from "react-icons/md";
import {
  createOrGetThread,
  sendChatMessage,
  ChatThread,
  ChatMessage,
} from "@/lib/chat-store";

interface BuyerChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerName: string;
  buyerPhone: string;
  itemName: string;
  itemPrice?: string;
  initialMessage?: string;
  notificationId?: string;
}

export function BuyerChatModal({
  isOpen,
  onClose,
  buyerName,
  buyerPhone,
  itemName,
  itemPrice = "₹90",
  initialMessage = "I will arrive with exact cash to collect the item.",
  notificationId = "default",
}: BuyerChatModalProps) {
  const [thread, setThread] = useState<ChatThread | null>(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const threadId = `thread_${notificationId || buyerName.replace(/\s+/g, "_")}`;

  useEffect(() => {
    if (isOpen) {
      const activeThread = createOrGetThread(
        threadId,
        buyerName || "Verified Buyer (Doms)",
        buyerPhone || "+91 98765 43210",
        itemName || "Scrap Item",
        itemPrice,
        initialMessage
      );
      setThread(activeThread);

      // Poll for manual messages from the other party every 2s, updating only if messages change
      const interval = setInterval(() => {
        const latest = getChatThread(threadId);
        if (latest) {
          setThread((prev) => {
            if (
              !prev ||
              prev.messages.length !== latest.messages.length ||
              prev.updatedAt !== latest.updatedAt
            ) {
              return latest;
            }
            return prev;
          });
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isOpen, threadId, buyerName, buyerPhone, itemName, itemPrice, initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages]);

  if (!isOpen || !thread) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (!textToSend) setInputText("");

    const updated = sendChatMessage(
      threadId,
      "seller",
      "You (Seller)",
      text
    );

    if (updated) {
      setThread({ ...updated });
    }
  };

  const quickReplies = [
    "Item is packed and ready!",
    "What time will you arrive?",
    "Please call me 10 mins before arrival.",
    "Address confirmed!",
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col h-[600px] max-h-[90vh]"
        >
          {/* ── HEADER ──────────────────────────────────────────────────────── */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-4 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center font-bold text-emerald-300 text-sm">
                  {buyerName[0] || "B"}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-xs"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <span>{buyerName}</span>
                  <MdVerified className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>{buyerPhone}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${buyerPhone}`}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                title="Call Buyer"
              >
                <MdPhone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${buyerPhone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white transition cursor-pointer"
                title="WhatsApp Intimation"
              >
                <MdWhatsapp className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── CONTEXT BAR ─────────────────────────────────────────────────── */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs shrink-0">
            <span className="font-semibold text-slate-600 line-clamp-1">
              📦 <strong className="text-slate-900">{itemName}</strong>
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
              {itemPrice}
            </span>
          </div>

          {/* ── CHAT MESSAGES THREAD ────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50/50">
            {thread.messages.map((msg) => {
              const isSeller = msg.sender === "seller";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${isSeller ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                    {msg.senderName} • {msg.timestamp}
                  </span>
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isSeller
                        ? "bg-[var(--color-primary)] text-white rounded-tr-xs"
                        : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-2xl text-xs text-slate-400 self-start shadow-xs"
              >
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] font-medium ml-1">{buyerName} is typing...</span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── QUICK REPLIES CHIPS ─────────────────────────────────────────── */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full whitespace-nowrap transition cursor-pointer"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* ── INPUT BAR ───────────────────────────────────────────────────── */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Type a message to ${buyerName}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 h-10 px-4 text-xs rounded-full border border-slate-300 focus:border-[var(--color-primary)] outline-none bg-slate-50 focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm shrink-0"
              >
                <MdSend className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
