"use client";

import { useState } from "react";
import { CitizenSectionHeader, DashboardCard, RewardCard } from "@/components/citizen";
import type { RewardBadge, Milestone } from "@/types/citizen";
import {
  MdEmojiEvents,
  MdCheckCircle,
  MdAccountBalanceWallet,
  MdElectricBolt,
  MdWaterDrop,
  MdCardGiftcard,
  MdLocalOffer,
  MdPayments,
  MdQrCodeScanner,
  MdSwapHoriz,
  MdVerified,
  MdClose,
} from "react-icons/md";

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

interface RedemptionOption {
  id: string;
  title: string;
  category: "CASH" | "EB_BILL" | "WATER_BILL" | "GIFT_CARD" | "RETAIL_DISCOUNT";
  description: string;
  pointsCost: number;
  cashEquivalent: string;
  icon: any;
  badgeText: string;
  bgGradient: string;
}

const REDEMPTION_OPTIONS: RedemptionOption[] = [
  {
    id: "red-1",
    title: "Instant Cash Transfer (UPI / Bank)",
    category: "CASH",
    description: "Direct cash transfer into your linked Bank Account or GPay / PhonePe UPI ID.",
    pointsCost: 200,
    cashEquivalent: "₹200 Instant Cash",
    icon: MdPayments,
    badgeText: "Direct Bank Payout",
    bgGradient: "from-emerald-600 to-teal-700",
  },
  {
    id: "red-2",
    title: "Electricity (EB) Bill Rebate",
    category: "EB_BILL",
    description: "Direct discount on your TNEB / BESCOM / BSES Electricity Consumer Bill.",
    pointsCost: 150,
    cashEquivalent: "₹150 Off Next EB Bill",
    icon: MdElectricBolt,
    badgeText: "Govt Utility Discount",
    bgGradient: "from-amber-600 to-yellow-700",
  },
  {
    id: "red-3",
    title: "Municipal Water Bill Waiver",
    category: "WATER_BILL",
    description: "Redeem points to reduce monthly Metro Water & Sanitation utility charges.",
    pointsCost: 100,
    cashEquivalent: "₹100 Water Bill Voucher",
    icon: MdWaterDrop,
    badgeText: "Civic Bill Credit",
    bgGradient: "from-blue-600 to-cyan-700",
  },
  {
    id: "red-4",
    title: "Amazon / Flipkart Gift Voucher",
    category: "GIFT_CARD",
    description: "Receive an instant ₹250 digital e-gift voucher code delivered to your registered mobile.",
    pointsCost: 250,
    cashEquivalent: "₹250 Shopping Voucher",
    icon: MdCardGiftcard,
    badgeText: "Instant Digital Voucher",
    bgGradient: "from-purple-600 to-indigo-700",
  },
  {
    id: "red-5",
    title: "Supermarket & Groceries Discount",
    category: "RETAIL_DISCOUNT",
    description: "Flat 15% extra discount coupon code at DMart, Reliance Smart, or BigBasket.",
    pointsCost: 120,
    cashEquivalent: "15% Groceries Voucher",
    icon: MdLocalOffer,
    badgeText: "Store Coupon",
    bgGradient: "from-rose-600 to-pink-700",
  },
  {
    id: "red-6",
    title: "LPG Gas Cylinder Booking Subsidy",
    category: "EB_BILL",
    description: "Redeem green coins for instant ₹100 cashback on Indane, HP, or Bharat LPG refills.",
    pointsCost: 100,
    cashEquivalent: "₹100 LPG Rebate",
    icon: MdAccountBalanceWallet,
    badgeText: "Fuel & Gas Subsidy",
    bgGradient: "from-orange-600 to-amber-700",
  },
];

export default function RewardsPage() {
  const [balance, setBalance] = useState(450);
  const [selectedOption, setSelectedOption] = useState<RedemptionOption | null>(null);
  const [upiOrBillNo, setUpiOrBillNo] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successModal, setSuccessModal] = useState<any>(null);
  const [redemptionHistory, setRedemptionHistory] = useState<any[]>([]);

  const handleRedeemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;

    if (balance < selectedOption.pointsCost) {
      alert("Insufficient Green Points balance for this redemption option!");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const refNo = `ECO-RED-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBal = balance - selectedOption.pointsCost;
      setBalance(newBal);

      const record = {
        id: refNo,
        title: selectedOption.title,
        points: selectedOption.pointsCost,
        cashValue: selectedOption.cashEquivalent,
        accountDetails: upiOrBillNo,
        date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      };

      setRedemptionHistory((prev) => [record, ...prev]);
      setSuccessModal(record);
      setIsProcessing(false);
      setSelectedOption(null);
      setUpiOrBillNo("");
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Green Coins & Cash Redemption Hub"
        subtitle="Turn your e-waste recycling points into real cash, electricity (EB) bill discounts, water bill waivers, and digital gift vouchers!"
        badge="Coins & Bill Savings"
      />

      {/* Points Balance Hero Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-[var(--color-primary)] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-emerald-500/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/15 border-2 border-white/30 flex items-center justify-center shrink-0 shadow-inner">
            <MdEmojiEvents className="w-10 h-10 text-amber-300 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
              <MdAccountBalanceWallet className="w-4 h-4 text-emerald-300" />
              Total Green Coins Balance
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">{balance}</span>
              <span className="text-sm font-bold text-emerald-100">Green Coins</span>
              <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full text-white font-semibold">
                ≈ ₹{balance} Cash Value
              </span>
            </div>
            <p className="text-xs text-white/80 mt-1.5">
              1 Green Coin = ₹1 Value on Electricity / Water Bills & Cash Payouts!
            </p>
          </div>
        </div>

        <a
          href="#redeem-options"
          className="px-6 py-3 rounded-xl bg-white text-emerald-900 font-extrabold text-xs hover:bg-slate-100 shadow-lg shrink-0 flex items-center justify-center gap-2 no-underline transition hover:scale-105"
        >
          <MdSwapHoriz className="w-5 h-5 text-emerald-700" />
          Redeem Coins Now
        </a>
      </div>

      {/* ── COIN REDEMPTION OPTIONS (CASH, EB BILL, WATER BILL, GIFT CARDS) ───── */}
      <div id="redeem-options" className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MdSwapHoriz className="w-5 h-5 text-emerald-600" />
              Redeem Coins for Cash & Utility Bill Discounts
            </h2>
            <p className="text-xs text-slate-500">
              Select how you want to claim your green rewards:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REDEMPTION_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const canAfford = balance >= opt.pointsCost;

            return (
              <div
                key={opt.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 group relative overflow-hidden"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {opt.badgeText}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {opt.pointsCost} Coins
                  </span>
                </div>

                {/* Content */}
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${opt.bgGradient} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      {opt.title}
                    </h3>
                    <span className="text-xs font-extrabold text-emerald-700">
                      {opt.cashEquivalent}
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => setSelectedOption(opt)}
                  disabled={!canAfford}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-sm ${
                    canAfford
                      ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                      : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  }`}
                >
                  <MdSwapHoriz className="w-4 h-4" />
                  {canAfford ? `Redeem (${opt.pointsCost} Coins)` : `Need ${opt.pointsCost - balance} More Coins`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── REDEMPTION HISTORY (IF ANY) ─────────────────────────────────── */}
      {redemptionHistory.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MdCheckCircle className="w-5 h-5 text-emerald-600" />
            Your Recent Coin Redemptions
          </h3>
          <div className="flex flex-col gap-3">
            {redemptionHistory.map((h) => (
              <div key={h.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">{h.title} ({h.cashValue})</span>
                  <span className="text-slate-500">Ref: {h.id} · Linked ID/No: {h.accountDetails || "Auto-processed"}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    - {h.points} Coins Redeemed
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{h.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges & Milestones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Badges */}
        <DashboardCard title="Badges & Achievements" subtitle="Earn badges by recycling responsibly">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_BADGES.map((b) => (
              <RewardCard key={b.id} badge={b} />
            ))}
          </div>
        </DashboardCard>

        {/* Milestones Card */}
        <DashboardCard title="Environmental Milestones" subtitle="Complete goals to earn extra green coins">
          <div className="flex flex-col gap-4 text-xs">
            {MOCK_MILESTONES.map((m) => (
              <div key={m.id} className="p-3.5 bg-slate-50 border rounded-xl flex items-center justify-between gap-3">
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

                <span className="font-bold text-[var(--color-accent)] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                  +{m.points} Coins
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* ── REDEMPTION MODAL FORM ────────────────────────────────────────── */}
      {selectedOption && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className={`p-5 text-white flex items-center justify-between bg-gradient-to-r ${selectedOption.bgGradient}`}>
              <div className="flex items-center gap-2">
                <selectedOption.icon className="w-6 h-6" />
                <h3 className="text-sm font-bold">{selectedOption.title}</h3>
              </div>
              <button onClick={() => setSelectedOption(null)} className="text-white/80 hover:text-white cursor-pointer">
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleRedeemSubmit} className="p-6 flex flex-col gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-slate-500">Coins Deducted:</span>
                  <span className="font-extrabold text-emerald-700 text-sm">{selectedOption.pointsCost} Green Coins</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-slate-500">You Receive:</span>
                  <span className="font-extrabold text-slate-900 text-sm">{selectedOption.cashEquivalent}</span>
                </div>
              </div>

              {/* Input for UPI or Bill Consumer Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">
                  {selectedOption.category === "CASH"
                    ? "Enter UPI ID / GPay / PhonePe Number *"
                    : selectedOption.category === "EB_BILL"
                    ? "Enter Electricity Consumer Number (EB Bill No) *"
                    : selectedOption.category === "WATER_BILL"
                    ? "Enter Water Connection Consumer ID *"
                    : "Enter Mobile Number for Voucher Delivery *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    selectedOption.category === "CASH"
                      ? "e.g. 9876543210@upi or name@okicici"
                      : selectedOption.category === "EB_BILL"
                      ? "e.g. 04-219-005-1234 (Consumer No)"
                      : selectedOption.category === "WATER_BILL"
                      ? "e.g. WTR-641021-99"
                      : "e.g. +91 98765 43210"
                  }
                  value={upiOrBillNo}
                  onChange={(e) => setUpiOrBillNo(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:border-[var(--color-primary)] outline-none text-xs font-semibold"
                />
              </div>

              <div className="bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200 text-[11px] leading-relaxed flex items-center gap-2">
                <MdVerified className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Government-verified instant payout. Instant receipt will be generated.</span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOption(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-dark)] flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  {isProcessing ? (
                    "Processing Payout..."
                  ) : (
                    <>
                      <MdCheckCircle className="w-4 h-4" />
                      Confirm Redemption
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SUCCESS MODAL ──────────────────────────────────────────────── */}
      {successModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col items-center text-center gap-4 border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MdCheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Redemption Successful!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Ref ID: <strong>{successModal.id}</strong>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 w-full flex flex-col gap-1 text-xs">
              <span className="font-bold text-slate-800">{successModal.title}</span>
              <span className="font-extrabold text-emerald-700">{successModal.cashValue}</span>
              <span className="text-[11px] text-slate-500">Processed to: {successModal.accountDetails}</span>
            </div>

            <button
              onClick={() => setSuccessModal(null)}
              className="w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-bold text-xs cursor-pointer shadow"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
