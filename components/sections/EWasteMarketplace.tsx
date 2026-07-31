"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EWasteListing } from "@/lib/ewaste-store";
import { useTranslation } from "@/lib/i18n";
import {
  MdStorefront,
  MdLocationOn,
  MdLocationCity,
  MdPerson,
  MdShoppingCart,
  MdVerified,
  MdClose,
  MdCheckCircle,
  MdCurrencyRupee,
  MdInventory2,
  MdAddAPhoto,
} from "react-icons/md";
import Link from "next/link";

export function EWasteMarketplace() {
  const { t } = useTranslation();
  const [listings, setListings] = useState<EWasteListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Buy Modal state
  const [activeItem, setActiveItem] = useState<EWasteListing | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerRole, setBuyerRole] = useState("Verified Recycler (Buyer)");
  const [bidAmount, setBidAmount] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const fetchListings = () => {
    fetch("/api/ewaste")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setListings(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchListings();

    // Try prefilling buyer info from localStorage if logged in
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ecoroute_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName) setBuyerName(parsed.fullName);
          if (parsed.role === "RECYCLER") setBuyerRole("Verified Recycler (Buyer)");
          if (parsed.role === "OFFICER" || parsed.role === "ADMIN") setBuyerRole("Government Officer");
        } catch (e) {}
      }
    }
  }, []);

  const categories = ["All", "Laptops & Mobiles", "Mobile Phones", "Computers & Displays", "Home Appliances", "Batteries & Cables"];

  const filteredListings = listings.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(item.category.toLowerCase());
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setActiveItem(null);
    }, 2000);
  };

  return (
    <section id="marketplace" className="bg-slate-50 py-16 border-b border-[var(--color-border)]">
      <Container className="flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <SectionTitle
            title={t("home.marketplace.title")}
            subtitle={t("home.marketplace.subtitle")}
            showRule
            badge="Scrap Bidding Platform"
          />

          <Link
            href="/dashboard/upload"
            className="w-fit px-4 py-2.5 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-xs font-bold shadow transition-all no-underline flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MdAddAPhoto className="w-4 h-4" />
            Upload Your Scrap Photo
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[var(--color-primary)] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Grid — Show ONLY 3 items on homepage */}
        {loading ? (
          <div className="text-center py-12 text-sm font-semibold text-slate-500">
            Loading live scrap listings...
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="bg-white rounded-lg p-10 text-center border border-slate-200 flex flex-col items-center gap-3">
            <MdInventory2 className="w-12 h-12 text-slate-300" />
            <h3 className="text-base font-bold text-slate-800">No scrap items in this category yet</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Be the first citizen to upload e-waste photos and publish items for buyers!
            </p>
            <Link
              href="/dashboard/upload"
              className="mt-2 px-4 py-2 text-xs font-bold rounded bg-[var(--color-primary)] text-white no-underline"
            >
              Upload Scrap Photo Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredListings.slice(0, 3).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:border-[var(--color-primary)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Photo Thumbnail */}
                    <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.deviceName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-[var(--color-primary)]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        <MdVerified className="w-3 h-3" />
                        {item.category}
                      </div>

                      <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow flex items-center gap-0.5">
                        {item.price}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 flex flex-col gap-2.5">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                        {item.deviceName}
                      </h3>

                      {/* Condition badge */}
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-900 border border-amber-200">
                          {item.condition}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 font-mono">
                          {item.weightKg} kg
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Seller details */}
                      <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <MdPerson className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Seller: <strong>{item.sellerName}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <MdLocationCity className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Location: {item.sellerCity}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action Button */}
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveItem(item);
                        setBidAmount(item.price.replace(/[^0-9]/g, ""));
                      }}
                      className="w-full py-2.5 px-3 text-xs font-bold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <MdShoppingCart className="w-4 h-4" />
                      Buy / Bid for E-Waste
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Login to view full 50+ scrap items Callout ── */}
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-xl p-8 text-center flex flex-col items-center gap-4 shadow-lg border border-[var(--color-primary-light)]">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <MdStorefront className="w-6 h-6" />
              </div>

              <div className="flex flex-col gap-1 max-w-xl">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  🔒 50+ More Live Scrap Items Available
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Log in to your <strong>Verified Recycler (Buyer) Portal</strong> or <strong>Citizen Account</strong> to access the full live marketplace dashboard with seller phone numbers, WhatsApp, full addresses, and location maps!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-xs font-bold rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white no-underline shadow transition-all flex items-center gap-2"
                >
                  <MdPerson className="w-4 h-4" />
                  Login to View All 50+ Items
                </Link>
                <Link
                  href="/register?role=recycler"
                  className="px-5 py-2.5 text-xs font-bold rounded bg-white/10 hover:bg-white/20 text-white border border-white/30 no-underline transition-all"
                >
                  Register as Verified Recycler
                </Link>
              </div>
            </div>
          </div>
        )}

      </Container>

      {/* ── Buy / Bid Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden border border-slate-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-[var(--color-primary)] text-white">
                <div className="flex items-center gap-2">
                  <MdStorefront className="w-5 h-5" />
                  <h3 className="text-sm font-bold tracking-tight">Buy / Bid for E-Waste Scrap</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="text-white/80 hover:text-white cursor-pointer"
                >
                  <MdClose className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 flex flex-col gap-4">
                {orderSuccess ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center gap-3">
                    <MdCheckCircle className="w-14 h-14 text-emerald-600" />
                    <h4 className="text-base font-bold text-slate-900">Purchase Request Sent!</h4>
                    <p className="text-xs text-slate-600 max-w-xs">
                      Your purchase request for <strong>{activeItem.deviceName}</strong> has been transmitted to seller {activeItem.sellerName} and CPCB Regional Logistics.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                    {/* Item summary preview */}
                    <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <img
                        src={activeItem.imageUrl}
                        alt={activeItem.deviceName}
                        className="w-16 h-16 object-cover rounded border border-slate-200 shrink-0"
                      />
                      <div className="flex flex-col justify-center gap-0.5 text-xs">
                        <span className="font-bold text-slate-900">{activeItem.deviceName}</span>
                        <span className="text-slate-600">Category: {activeItem.category} ({activeItem.weightKg} kg)</span>
                        <span className="font-bold text-emerald-700">Reserve Asking Price: {activeItem.price}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Buyer Role</label>
                        <select
                          value={buyerRole}
                          onChange={(e) => setBuyerRole(e.target.value)}
                          className="w-full h-9 px-3 text-xs rounded border border-slate-300 bg-white font-medium"
                        >
                          <option value="Verified Recycler (Buyer)">Verified Recycler (Buyer)</option>
                          <option value="Scrap Dealer">Scrap Dealer</option>
                          <option value="Government Officer">Government Procurement Officer</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Buyer Name / Company</label>
                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="e.g. EcoRecycle India Pvt Ltd"
                          className="w-full h-9 px-3 text-xs rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Your Offer / Bid Amount (₹)</label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full h-9 pl-7 pr-3 text-xs font-bold text-emerald-950 rounded border border-slate-300"
                          />
                          <MdCurrencyRupee className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveItem(null)}
                        className="px-4 py-2 text-xs font-semibold rounded border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] cursor-pointer"
                      >
                        Submit Buy Request
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
