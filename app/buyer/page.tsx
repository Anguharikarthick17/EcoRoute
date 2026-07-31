"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdVerified,
  MdLocationOn,
  MdPhone,
  MdWhatsapp,
  MdEmail,
  MdShoppingCart,
  MdClose,
  MdCheckCircle,
  MdCurrencyRupee,
  MdSearch,
  MdInventory2,
  MdPerson,
  MdRefresh,
  MdLogout,
  MdScale,
  MdCategory,
  MdPayment,
  MdCreditCard,
  MdQrCodeScanner,
  MdPrint,
  MdDirections,
  MdNotificationsActive,
  MdLocalAtm,
  MdCalendarMonth,
  MdAccessTime,
  MdOutlineMessage,
} from "react-icons/md";
import { EWasteListing } from "@/lib/ewaste-store";

const CATEGORIES = [
  "All",
  "Laptops & Computers",
  "Mobile Phones & Tablets",
  "TVs & Monitors",
  "Refrigerators & ACs",
  "Washing Machines",
  "Home Appliances",
  "Batteries & Cables",
  "Other Electronics",
];

const CONDITIONS_COLOR: Record<string, string> = {
  "Working — Perfect Condition": "bg-emerald-100 text-emerald-800",
  "Working — Minor Issues": "bg-blue-100 text-blue-800",
  "Partially Working": "bg-amber-100 text-amber-800",
  "Non-working / Damaged": "bg-red-100 text-red-800",
  "Scrap for Parts & Metals": "bg-slate-100 text-slate-700",
};

type ExtendedListing = EWasteListing & {
  sellerPhone?: string;
  sellerEmail?: string;
  sellerWhatsapp?: string;
  sellerAddress?: string;
  sellerState?: string;
  sellerPincode?: string;
  latitude?: string;
  longitude?: string;
};

export default function BuyerPortalPage() {
  const [listings, setListings] = useState<ExtendedListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItem, setActiveItem] = useState<ExtendedListing | null>(null);
  
  // Checkout & Payment State
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "UPI" | "CARD">("CASH");
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split("T")[0];
  });
  const [pickupTimeSlot, setPickupTimeSlot] = useState("10:00 AM - 01:00 PM");
  const [pickupNotes, setPickupNotes] = useState("I will arrive with exact cash to collect the item.");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [buyerUser, setBuyerUser] = useState<any>(null);
  
  const receiptRef = useRef<HTMLDivElement>(null);

  // Load buyer user info
  useEffect(() => {
    const stored = localStorage.getItem("ecoroute_user");
    if (stored) {
      try { setBuyerUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const fetchListings = () => {
    setLoading(true);
    fetch("/api/ewaste")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setListings(d.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchListings(); }, []);

  const filtered = listings.filter((item) => {
    const matchCat =
      selectedCategory === "All" ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase().replace(" & ", " ")) ||
      selectedCategory.toLowerCase().includes(item.category.toLowerCase().replace(" & ", " "));
    const matchSearch =
      !search ||
      item.deviceName.toLowerCase().includes(search.toLowerCase()) ||
      item.sellerCity.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Handle Payment & Order Intimation
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;

    setIsProcessingPayment(true);

    setTimeout(() => {
      const txnId = `TXN-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        txnId,
        date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        item: activeItem,
        amount: bidAmount || activeItem.price.replace(/[^0-9]/g, ""),
        paymentMethod,
        pickupDate,
        pickupTimeSlot,
        pickupNotes,
        buyerName: buyerUser?.fullName || "Verified Recycler (Doms)",
        buyerPhone: buyerUser?.mobile || "+91 98765 43210",
      };

      // Push intimation notification to seller store/localStorage
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: "🚚 Scrap Order & Pickup Scheduled!",
        message: `Buyer '${orderData.buyerName}' (${orderData.buyerPhone}) has ordered your '${activeItem.deviceName}' for ₹${orderData.amount} via ${paymentMethod}.\n\n📅 Scheduled Pickup Date: ${pickupDate} (${pickupTimeSlot})\n💬 Buyer Message: "${pickupNotes || 'Will arrive to collect item and pay.'}"`,
        timestamp: "Just now",
        type: "reward",
        read: false,
      };

      try {
        const existing = JSON.parse(localStorage.getItem("ecoroute_notifications") || "[]");
        localStorage.setItem("ecoroute_notifications", JSON.stringify([newNotif, ...existing]));
      } catch {}

      // Update listing status locally
      setListings((prev) =>
        prev.map((l) => (l.id === activeItem.id ? ({ ...l, status: "SOLD" } as ExtendedListing) : l))
      );

      setCompletedOrderData(orderData);
      setIsProcessingPayment(false);
      setOrderCompleted(true);
    }, 1500);
  };

  const openWhatsApp = (phone: string, deviceName: string) => {
    const msg = encodeURIComponent(
      `Hi ${activeItem?.sellerName || "Seller"}! I have ordered your ${deviceName} on EcoRoute for ₹${bidAmount || activeItem?.price}.\nI will be coming on ${pickupDate} (${pickupTimeSlot}) to collect the item and pay ${paymentMethod === "CASH" ? "Cash" : "via " + paymentMethod}. Please confirm your pickup address.`
    );
    window.open(`https://wa.me/91${phone}?text=${msg}`, "_blank");
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <div className="bg-[var(--color-primary)] text-white py-4 px-6 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              {buyerUser?.fullName?.[0] || "R"}
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-1.5">
                <MdVerified className="w-4 h-4 text-cyan-300" />
                {buyerUser?.fullName || "Verified Recycler"}
              </div>
              <div className="text-xs text-white/70">
                {buyerUser?.recyclerLicenseNo || buyerUser?.recyclerProfile?.shopName || "CPCB Authorized Buyer"}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
            <span className="text-xs font-semibold text-white/80">Verified Recycler (Buyer) Portal</span>
            <MdVerified className="w-4 h-4 text-cyan-300" />
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("ecoroute_user");
              window.location.replace("/login");
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white transition cursor-pointer"
          >
            <MdLogout className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* ── Stats Row ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Available Items", value: listings.filter(l => l.status === "AVAILABLE").length, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
            { label: "Total Listings", value: listings.length, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
            { label: "Categories", value: new Set(listings.map(l => l.category)).size, color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
            { label: "Cities", value: new Set(listings.map(l => l.sellerCity)).size, color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border rounded-xl p-4 flex flex-col gap-1`}>
              <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
              <span className="text-xs font-semibold text-slate-600">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Search + Filters ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MdSearch className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by device, brand, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-sm rounded-xl border border-slate-300 bg-white focus:border-[var(--color-primary)] outline-none shadow-sm"
            />
          </div>
          <button
            onClick={fetchListings}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm"
          >
            <MdRefresh className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[var(--color-primary)] text-white shadow"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Listings Grid ─────────────────────────────────────────── */}
        {loading ? (
          <div className="text-center py-16 text-sm font-semibold text-slate-500">
            Loading available scrap listings...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center gap-3 text-center">
            <MdInventory2 className="w-14 h-14 text-slate-300" />
            <h3 className="font-bold text-slate-700">No listings found</h3>
            <p className="text-sm text-slate-500 max-w-sm">No scrap items match your search. Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[var(--color-primary)]/40 transition-all group flex flex-col"
              >
                {/* Photo */}
                <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.deviceName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600";
                    }}
                  />
                  {/* Category badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-[var(--color-primary)]/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                    <MdCategory className="w-3 h-3" />
                    {item.category}
                  </div>
                  {/* Price badge */}
                  <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-sm font-bold px-3 py-0.5 rounded-full shadow">
                    {item.price}
                  </div>
                  {/* Status */}
                  {item.status !== "AVAILABLE" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {item.status === "SOLD" ? "✓ PURCHASED & UNLOCKED" : item.status === "GOV_RESERVED" ? "Gov Reserved" : item.status}
                      </span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition line-clamp-1">
                      {item.deviceName}
                    </h3>
                    {item.brand && item.brand !== "Generic" && (
                      <span className="text-xs text-slate-500 font-medium">Brand: {item.brand}</span>
                    )}
                  </div>

                  {/* Condition */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${CONDITIONS_COLOR[item.condition] || "bg-slate-100 text-slate-700"}`}>
                      {item.condition}
                    </span>
                    {item.weightKg > 0 && (
                      <span className="flex items-center gap-0.5 text-[11px] text-slate-500 font-medium">
                        <MdScale className="w-3 h-3" />
                        {item.weightKg} kg
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.description}</p>
                  )}

                  {/* Seller & Location */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <MdPerson className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      Seller: {item.sellerName}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MdLocationOn className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                      <span className="font-medium">{item.sellerCity}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 pb-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveItem(item);
                      setBidAmount(item.price.replace(/[^0-9]/g, ""));
                      setOrderCompleted(false);
                      setCompletedOrderData(null);
                    }}
                    className="w-full py-2.5 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <MdShoppingCart className="w-4 h-4" />
                    Buy / Intimate Pickup & Cash
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── BUYER CHECKOUT, PICKUP INTIMATION & RECEIPT MODAL ────────────────────── */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[var(--color-primary)] text-white">
                <div className="flex items-center gap-2 text-white">
                  <MdShoppingCart className="w-5 h-5 text-white shrink-0" />
                  <h3 className="text-base font-extrabold text-white tracking-wide">
                    {orderCompleted ? "Official Purchase & Pickup Receipt" : "Scrap Order & Pickup Intimation"}
                  </h3>
                </div>
                <button onClick={() => setActiveItem(null)} className="text-white/80 hover:text-white cursor-pointer transition p-1 rounded-full hover:bg-white/10">
                  <MdClose className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-5">
                {orderCompleted && completedOrderData ? (
                  /* ── BILL RECEIPT & UNLOCKED LOCATION VIEW ────────────────── */
                  <div className="flex flex-col gap-5">
                    {/* Notification Alert */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                      <MdNotificationsActive className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex flex-col text-xs text-emerald-900 gap-1">
                        <span className="font-bold text-sm">🚚 Pickup Intimation & Order Sent to Seller!</span>
                        <span>
                          Seller <strong>{completedOrderData.item.sellerName}</strong> has been intimated that you will arrive on <strong>{completedOrderData.pickupDate} ({completedOrderData.pickupTimeSlot})</strong> to collect <strong>{completedOrderData.item.deviceName}</strong> and pay ₹{completedOrderData.amount} via {completedOrderData.paymentMethod}.
                        </span>
                      </div>
                    </div>

                    {/* Official Bill Receipt Box */}
                    <div ref={receiptRef} className="border-2 border-slate-300 rounded-xl p-5 bg-white shadow-sm flex flex-col gap-4 text-slate-800">
                      {/* Receipt Header */}
                      <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-[var(--color-primary)]">EcoRoute E-Waste Order Invoice</span>
                          <span className="text-[10px] font-semibold uppercase text-slate-500">Official Purchase & Doorstep Collection Token</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-900">{completedOrderData.txnId}</span>
                          <div className="text-[10px] text-slate-400">{completedOrderData.date}</div>
                        </div>
                      </div>

                      {/* Items & Intimation Summary */}
                      <div className="flex flex-col gap-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="font-semibold text-slate-600">Item Name:</span>
                          <span className="font-bold text-slate-900">{completedOrderData.item.deviceName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="font-semibold text-slate-600">Payment Mode:</span>
                          <span className="font-bold text-emerald-700">{completedOrderData.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="font-semibold text-slate-600">Scheduled Pickup Date:</span>
                          <span className="font-bold text-blue-700">{completedOrderData.pickupDate} ({completedOrderData.pickupTimeSlot})</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="font-semibold text-slate-600">Note for Seller:</span>
                          <span className="font-medium text-slate-800 italic">"{completedOrderData.pickupNotes || 'Will arrive to collect item.'}"</span>
                        </div>
                        <div className="flex justify-between py-1.5 text-sm font-bold bg-slate-50 px-2 rounded-lg mt-1">
                          <span className="text-slate-700">Total Agreed Scrap Value:</span>
                          <span className="text-emerald-700">₹{completedOrderData.amount}</span>
                        </div>
                      </div>

                      {/* Unlocked Seller Pickup Location & Contact */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <MdLocationOn className="w-4 h-4 text-red-600" />
                          Unlocked Seller Pickup Address
                        </span>
                        
                        <div className="text-xs text-slate-700 flex flex-col gap-1 pl-5">
                          <div><strong>Seller Name:</strong> {completedOrderData.item.sellerName}</div>
                          <div>
                            <strong>Full Address:</strong>{" "}
                            {completedOrderData.item.sellerAddress || completedOrderData.item.sellerCity || "Main Street"}
                            {completedOrderData.item.sellerState ? `, ${completedOrderData.item.sellerState}` : ""}
                            {completedOrderData.item.sellerPincode ? ` - ${completedOrderData.item.sellerPincode}` : ""}
                          </div>
                          {completedOrderData.item.sellerPhone && (
                            <div><strong>Phone:</strong> +91 {completedOrderData.item.sellerPhone}</div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(
                              completedOrderData.item.sellerAddress || `${completedOrderData.item.sellerName} ${completedOrderData.item.sellerCity}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5 no-underline"
                          >
                            <MdDirections className="w-4 h-4" /> Open Maps Navigation
                          </a>
                          {completedOrderData.item.sellerPhone && (
                            <a
                              href={`tel:${completedOrderData.item.sellerPhone}`}
                              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-white hover:bg-slate-900 flex items-center gap-1.5 no-underline"
                            >
                              <MdPhone className="w-4 h-4" /> Call Seller
                            </a>
                          )}
                          {(completedOrderData.item.sellerPhone || completedOrderData.item.sellerWhatsapp) && (
                            <button
                              type="button"
                              onClick={() => openWhatsApp(completedOrderData.item.sellerPhone || completedOrderData.item.sellerWhatsapp, completedOrderData.item.deviceName)}
                              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5 cursor-pointer"
                            >
                              <MdWhatsapp className="w-4 h-4" /> WhatsApp Intimation
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Compliance Footer */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                        <span>Certified CPCB E-Waste Recycling Token</span>
                        <span className="text-emerald-700 font-bold">✓ Intimation SMS Sent</span>
                      </div>
                    </div>

                    {/* Modal Bottom Controls */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handlePrintReceipt}
                        className="px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                      >
                        <MdPrint className="w-4 h-4" />
                        Print / Download Token
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveItem(null)}
                        className="px-6 py-2.5 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : isProcessingPayment ? (
                  /* ── LOADER ────────────────────────────────────────── */
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-[var(--color-primary)] border-t-transparent animate-spin flex items-center justify-center">
                      <MdPayment className="w-8 h-8 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Sending Pickup Intimation to Seller...</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Notifying {activeItem.sellerName} of collection date {pickupDate} ({paymentMethod})...
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ── CHECKOUT & PICKUP INTIMATION FORM ──────────────────────────────── */
                  <form onSubmit={handleProcessPayment} className="flex flex-col gap-4">
                    {/* Item Preview Card */}
                    <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <img
                        src={activeItem.imageUrl}
                        alt={activeItem.deviceName}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200"; }}
                      />
                      <div className="flex flex-col justify-center gap-1 text-xs min-w-0">
                        <span className="font-bold text-slate-900 truncate">{activeItem.deviceName}</span>
                        <span className="text-slate-500">Seller: {activeItem.sellerName} ({activeItem.sellerCity})</span>
                        <span className="font-bold text-emerald-700">Asking Price: {activeItem.price}</span>
                      </div>
                    </div>

                    {/* Price Amount Input */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700">Agreed Purchase Price (₹) *</label>
                      <div className="relative">
                        <MdCurrencyRupee className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="number"
                          required
                          min="1"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="w-full h-10 pl-8 pr-3 text-sm font-bold rounded-xl border border-slate-300 focus:border-[var(--color-primary)] outline-none"
                        />
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <MdPayment className="w-4 h-4 text-[var(--color-primary)]" />
                        Payment Method *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "CASH", label: "Cash on Pickup", icon: MdLocalAtm },
                          { id: "UPI", label: "UPI / GPay / QR", icon: MdQrCodeScanner },
                          { id: "CARD", label: "Card / NetBank", icon: MdCreditCard },
                        ].map((pm) => {
                          const Icon = pm.icon;
                          const selected = paymentMethod === pm.id;
                          return (
                            <button
                              key={pm.id}
                              type="button"
                              onClick={() => setPaymentMethod(pm.id as any)}
                              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer text-center ${
                                selected
                                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold shadow-xs"
                                  : "border-slate-200 hover:bg-slate-50 text-slate-600"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              <span className="text-[11px] leading-tight">{pm.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pickup Collection Date & Time Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <MdCalendarMonth className="w-4 h-4 text-blue-600" />
                          Collection Date *
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full h-10 px-3 text-xs font-bold rounded-xl border border-slate-300 focus:border-[var(--color-primary)] outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <MdAccessTime className="w-4 h-4 text-amber-600" />
                          Preferred Time Slot *
                        </label>
                        <select
                          value={pickupTimeSlot}
                          onChange={(e) => setPickupTimeSlot(e.target.value)}
                          className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:border-[var(--color-primary)] outline-none bg-white"
                        >
                          <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (Morning)</option>
                          <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM (Midday)</option>
                          <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (Afternoon)</option>
                          <option value="05:00 PM - 08:00 PM">05:00 PM - 08:00 PM (Evening)</option>
                        </select>
                      </div>
                    </div>

                    {/* Note / Message for Seller */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <MdOutlineMessage className="w-4 h-4 text-emerald-600" />
                        Message / Intimation Note for Seller
                      </label>
                      <textarea
                        rows={2}
                        value={pickupNotes}
                        onChange={(e) => setPickupNotes(e.target.value)}
                        placeholder="e.g. I will arrive with cash at 10 AM. Please keep scrap item ready."
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-[var(--color-primary)] outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveItem(null)}
                        className="flex-1 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] flex items-center justify-center gap-1.5 cursor-pointer shadow"
                      >
                        <MdCheckCircle className="w-4 h-4" />
                        Confirm & Send Intimation to Seller
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
