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
  MdPerson,
  MdVerified,
  MdClose,
  MdCheckCircle,
  MdCurrencyRupee,
  MdInventory2,
  MdAddAPhoto,
  MdLocalShipping,
  MdAccessTime,
  MdScale,
} from "react-icons/md";
import Link from "next/link";

export function EWasteMarketplace() {
  const { t } = useTranslation();
  const [listings, setListings] = useState<EWasteListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Request Pickup Modal state
  const [activeItem, setActiveItem] = useState<EWasteListing | null>(null);
  const [dealerName, setDealerName] = useState("");
  const [dealerPhone, setDealerPhone] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const fetchListings = () => {
    fetch("/api/ewaste")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          let custom: any[] = [];
          try {
            custom = JSON.parse(localStorage.getItem("ecoroute_custom_listings") || "[]");
          } catch {}
          const combined = [...custom, ...data.data];
          const uniqueMap = new Map();
          for (const item of combined) {
            if (!uniqueMap.has(item.id)) {
              uniqueMap.set(item.id, item);
            }
          }
          setListings(Array.from(uniqueMap.values()));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchListings();
    const interval = setInterval(fetchListings, 4000);
    window.addEventListener("storage", fetchListings);

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ecoroute_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName) setDealerName(parsed.fullName);
          if (parsed.phone) setDealerPhone(parsed.phone);
        } catch (e) {}
      }
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", fetchListings);
    };
  }, []);

  const categories = [
    "All",
    "Metal",
    "Copper",
    "Aluminium",
    "Appliances",
    "E-Waste",
    "Batteries",
    "Cables",
  ];

  const filteredListings = listings.filter((item) => {
    if (selectedCategory === "All") return true;
    const cat = item.category.toLowerCase();
    const target = selectedCategory.toLowerCase();
    return cat.includes(target) || (target === "cables" && cat.includes("cable")) || (target === "metal" && (cat.includes("metal") || cat.includes("iron") || cat.includes("brass")));
  });

  const handleRequestPickup = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setActiveItem(null);
    }, 2200);
  };

  return (
    <section id="marketplace" className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200/80">
      <Container className="flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <SectionTitle
            title="Nearby Scrap Listings"
            subtitle="Discover recyclable scrap listed by households and sellers in your local area. Request doorstep pickup."
            showRule
            badge="Live Marketplace"
          />

          <Link
            href="/dashboard/upload"
            className="w-fit px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm hover:shadow transition-all no-underline flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MdAddAPhoto className="w-4 h-4" />
            Sell Your Scrap
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
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-16 text-sm font-semibold text-slate-500">
            Loading nearby scrap listings...
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 flex flex-col items-center gap-3">
            <MdInventory2 className="w-12 h-12 text-slate-300" />
            <h3 className="text-base font-extrabold text-slate-800">No scrap listings in this category yet</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Be the first household to upload scrap photos and get instant dealer pickup!
            </p>
            <Link
              href="/dashboard/upload"
              className="mt-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-700 text-white no-underline hover:bg-emerald-800 transition"
            >
              Upload Scrap Photo Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredListings.slice(0, 3).map((item, idx) => {
                const distances = ["1.4 km", "2.1 km", "3.8 km", "0.9 km", "2.7 km"];
                const distance = distances[idx % distances.length];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-500/50 transition-all duration-250 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.deviceName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                          <MdVerified className="w-3.5 h-3.5 text-emerald-400" />
                          {item.category}
                        </div>

                        <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-xs flex items-center gap-0.5">
                          {item.price}
                        </div>

                        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <MdLocationOn className="w-3 h-3 text-cyan-400" />
                          {distance} away
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="p-5 flex flex-col gap-3">
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {item.deviceName}
                        </h3>

                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-wrap text-[11px]">
                          <span className="px-2.5 py-0.5 rounded-md font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                            {item.condition}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 font-mono">
                            <MdScale className="w-3 h-3" />
                            {item.weightKg} kg
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        {/* Location & Seller */}
                        <div className="pt-3 border-t border-slate-100 flex flex-col gap-1 text-xs text-slate-600">
                          <div className="flex items-center justify-between font-medium">
                            <span className="text-slate-500">Seller: <strong className="text-slate-800">Household</strong></span>
                            <span className="text-slate-500 flex items-center gap-1">
                              <MdAccessTime className="w-3.5 h-3.5 text-slate-400" /> Posted Today
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-700 font-semibold mt-0.5">
                            <MdLocationOn className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{item.sellerCity || "Local Area"} ({distance})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-5 pt-0 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveItem(item);
                          setProposedPrice(item.price.replace(/[^0-9]/g, ""));
                        }}
                        className="flex-1 py-2.5 px-4 text-xs font-extrabold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <MdLocalShipping className="w-4 h-4" />
                        Request Pickup
                      </button>
                      <Link
                        href="/buyer"
                        className="py-2.5 px-3.5 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all flex items-center justify-center no-underline"
                      >
                        Details
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Marketplace Explore Callout ── */}
            <div className="bg-gradient-to-br from-[#0F5132] via-[#115E38] to-[#0F172A] text-white rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center gap-4 shadow-xl border border-emerald-600/30">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
                <MdStorefront className="w-7 h-7 text-emerald-300" />
              </div>

              <div className="flex flex-col gap-2 max-w-2xl">
                <h3 className="text-2xl font-black tracking-tight text-white">
                  Discover All Nearby Scrap Listings & Smart Routes
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Join hundreds of verified scrap dealers using EcoRoute to discover nearby scrap opportunities, coordinate doorstep collections, and generate AI-optimized collection routes.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/buyer"
                  className="px-6 py-3 text-xs font-extrabold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 no-underline shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <MdStorefront className="w-4 h-4" />
                  Explore Scrap Dealer Portal
                </Link>
                <Link
                  href="/register?role=recycler"
                  className="px-6 py-3 text-xs font-extrabold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 no-underline transition-all"
                >
                  Register as Scrap Dealer
                </Link>
              </div>
            </div>
          </div>
        )}

      </Container>

      {/* ── Request Pickup Modal ───────────────────────────────── */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#0F5132] text-white">
                <div className="flex items-center gap-2">
                  <MdLocalShipping className="w-5 h-5 text-emerald-300" />
                  <h3 className="text-sm font-extrabold tracking-tight">Request Scrap Doorstep Pickup</h3>
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
              <div className="p-6">
                {orderSuccess ? (
                  <div className="text-center py-8 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <MdCheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-black text-slate-900">Pickup Request Sent!</h4>
                    <p className="text-xs text-slate-600 max-w-xs">
                      The household seller has been notified with your offer and pickup schedule.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRequestPickup} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <img
                        src={activeItem.imageUrl}
                        alt={activeItem.deviceName}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                      />
                      <div className="flex flex-col min-w-0">
                        <p className="text-xs font-extrabold text-slate-900 truncate">
                          {activeItem.deviceName}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {activeItem.category} · {activeItem.weightKg} kg
                        </p>
                        <p className="text-xs font-black text-emerald-700 mt-0.5">
                          Estimated Value: {activeItem.price}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Scrap Dealer Name / Shop
                      </label>
                      <input
                        type="text"
                        required
                        value={dealerName}
                        onChange={(e) => setDealerName(e.target.value)}
                        placeholder="e.g. Sri Balaji Metal Recyclers"
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Dealer Mobile
                        </label>
                        <input
                          type="tel"
                          required
                          value={dealerPhone}
                          onChange={(e) => setDealerPhone(e.target.value)}
                          placeholder="10-digit number"
                          className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Offered Price (₹)
                        </label>
                        <input
                          type="number"
                          required
                          value={proposedPrice}
                          onChange={(e) => setProposedPrice(e.target.value)}
                          placeholder="Amount in ₹"
                          className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-600 focus:outline-none font-bold"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      ℹ️ <strong>Note:</strong> Final weight and price will be verified during doorstep physical collection. Payment is made directly to the seller via Cash or UPI.
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveItem(null)}
                        className="px-4 py-2 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-extrabold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer shadow-sm"
                      >
                        Send Pickup Request
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
