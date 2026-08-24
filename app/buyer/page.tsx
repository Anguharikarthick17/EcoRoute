"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdVerified,
  MdLocationOn,
  MdPhone,
  MdWhatsapp,
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
  MdChatBubbleOutline,
  MdNotifications,
  MdAltRoute,
  MdAutoAwesome,
  MdLocalShipping,
  MdTrendingUp,
  MdStorefront,
} from "react-icons/md";
import { EWasteListing } from "@/lib/ewaste-store";
import { useTranslation } from "@/lib/i18n";
import { BuyerChatModal } from "@/components/citizen/BuyerChatModal";

const CATEGORIES = [
  "All",
  "Metal",
  "Copper",
  "Aluminium",
  "Brass",
  "Iron",
  "Appliances",
  "E-Waste",
  "Batteries",
  "Cables",
  "Paper & Cardboard",
  "Plastic",
];

const DISTANCE_FILTERS = [
  { id: "all", label: "All Distances" },
  { id: "2km", label: "Within 2 km", maxKm: 2.0 },
  { id: "5km", label: "Within 5 km", maxKm: 5.0 },
  { id: "10km", label: "Within 10 km", maxKm: 10.0 },
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
  distanceKm?: number;
};

// ── Realistic Fallback Scrap Dataset (Guaranteed immediate rendering) ──────────
const FALLBACK_SCRAP_LISTINGS: ExtendedListing[] = [
  {
    id: "scrap_demo_1",
    deviceName: "Old Washing Machine Scrap",
    brand: "IFB / Bosch",
    category: "Appliances",
    condition: "Non-working / Damaged",
    estimatedAge: "6 years",
    description: "Old top load washing machine with intact heavy copper motor winding, stainless steel drum, and outer metal chassis.",
    imageUrl: "/images/scrap/washing_machine_scrap.png",
    price: "₹1,800",
    weightKg: 45.0,
    sellerName: "Rajesh Kumar",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543210",
    sellerAddress: "Eachanari Road, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641021",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T10:30:00Z",
    distanceKm: 1.4,
  },
  {
    id: "scrap_demo_2",
    deviceName: "Copper Wire Bundle",
    brand: "Finolex / Havells",
    category: "Copper",
    condition: "Scrap for Parts & Metals",
    estimatedAge: "2 years",
    description: "Clean pure electrical copper wire windings, motor coils, and stripped conductors. 99.9% clean copper scrap.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    price: "₹3,200",
    weightKg: 4.5,
    sellerName: "Anbu Chezhian",
    sellerCity: "Salem",
    sellerPhone: "9876543211",
    sellerAddress: "Five Roads Junction, Salem",
    sellerState: "Tamil Nadu",
    sellerPincode: "636004",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T11:15:00Z",
    distanceKm: 2.1,
  },
  {
    id: "scrap_demo_3",
    deviceName: "Aluminium Window Scrap",
    brand: "Jindal / Generic",
    category: "Aluminium",
    condition: "Scrap for Parts & Metals",
    estimatedAge: "4 years",
    description: "Extruded aluminium window frames, sliding channel sections, and clean alloy cutpieces ready for remelting.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    price: "₹1,500",
    weightKg: 9.5,
    sellerName: "Priya Sharma",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543212",
    sellerAddress: "Sidco Industrial Area, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641021",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T12:00:00Z",
    distanceKm: 3.2,
  },
  {
    id: "scrap_demo_4",
    deviceName: "Broken Refrigerator",
    brand: "Whirlpool / LG",
    category: "Appliances",
    condition: "Non-working / Damaged",
    estimatedAge: "7 years",
    description: "Single door refrigerator with copper coil compressor unit, aluminium freezer plate, and steel outer casing.",
    imageUrl: "/images/scrap/refrigerator_scrap.png",
    price: "₹2,500",
    weightKg: 38.0,
    sellerName: "Senthil Nathan",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543213",
    sellerAddress: "Gandhipuram 4th Street, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641012",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T12:30:00Z",
    distanceKm: 4.1,
  },
  {
    id: "scrap_demo_5",
    deviceName: "Old Laptop Scrap",
    brand: "Dell / HP",
    category: "E-Waste",
    condition: "Partially Working",
    estimatedAge: "5 years",
    description: "Laptop unit with cracked display. Contains intact motherboard, RAM, aluminium heat sinks, and battery pack.",
    imageUrl: "/images/scrap/hp_laptop_scrap.png",
    price: "₹1,200",
    weightKg: 2.4,
    sellerName: "Mani Vannan",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543214",
    sellerAddress: "Saibaba Colony, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641011",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T13:00:00Z",
    distanceKm: 2.7,
  },
  {
    id: "scrap_demo_6",
    deviceName: "Mixed Cardboard & Paper Bundles",
    brand: "Packaging Scrap",
    category: "Paper & Cardboard",
    condition: "Scrap for Parts & Metals",
    estimatedAge: "Recent",
    description: "Clean dry stacked corrugated shipping cartons and old newspaper bundles tied with string. Stored indoors.",
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80",
    price: "₹550",
    weightKg: 32.0,
    sellerName: "Karthick A.",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543215",
    sellerAddress: "Sundarapuram Junction, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641024",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T13:15:00Z",
    distanceKm: 1.8,
  },
  {
    id: "scrap_demo_7",
    deviceName: "Brass Utensil Scrap & Valves",
    brand: "Generic Brass Scrap",
    category: "Brass",
    condition: "Scrap for Parts & Metals",
    estimatedAge: "4 years",
    description: "Heavy yellow brass valves, plumbing fittings, taps, and old utensils. High density recyclable alloy.",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    price: "₹1,900",
    weightKg: 4.2,
    sellerName: "Ramesh Babu",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543216",
    sellerAddress: "RS Puram West, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641002",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T13:30:00Z",
    distanceKm: 3.5,
  },
  {
    id: "scrap_demo_8",
    deviceName: "Plastic Container Scrap Lot",
    brand: "HDPE Polymer",
    category: "Plastic",
    condition: "Scrap for Parts & Metals",
    estimatedAge: "Recent",
    description: "Clean empty HDPE chemical/detergent containers, oil cans, and buckets suitable for industrial plastic pelletizing.",
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    price: "₹650",
    weightKg: 18.0,
    sellerName: "Deepak Verma",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543217",
    sellerAddress: "Peelamedu Main Road, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641004",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T14:00:00Z",
    distanceKm: 2.3,
  },
  {
    id: "scrap_demo_9",
    deviceName: "Old Ceiling Fan with Copper Winding",
    brand: "Crompton / Orient",
    category: "Metal",
    condition: "Scrap for Parts & Metals",
    estimatedAge: "6 years",
    description: "2 old ceiling fans with heavy copper stator motor windings, aluminium rotor, and steel blades.",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80",
    price: "₹800",
    weightKg: 6.5,
    sellerName: "Gokul Nath",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543218",
    sellerAddress: "Kuniyamuthur, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641008",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T14:15:00Z",
    distanceKm: 1.1,
  },
  {
    id: "scrap_demo_10",
    deviceName: "E-Waste Cable Bundle & Adapters",
    brand: "Mixed Electronics",
    category: "Cables",
    condition: "Working — Minor Issues",
    estimatedAge: "2 years",
    description: "Heavy bundle of copper power cables, monitor HDMI/VGA cables, laptop chargers, and extension wires.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    price: "₹1,350",
    weightKg: 5.2,
    sellerName: "Venkatesh R.",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543219",
    sellerAddress: "Saravanampatti, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641035",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T14:30:00Z",
    distanceKm: 4.6,
  },
  {
    id: "scrap_demo_11",
    deviceName: "Lead-Acid Inverter Battery Scrap",
    brand: "Exide / Luminous",
    category: "Batteries",
    condition: "Non-working / Damaged",
    estimatedAge: "4 years",
    description: "150Ah dead inverter battery with intact heavy lead plates, terminals, and polymer casing for authorized lead extraction.",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    price: "₹2,400",
    weightKg: 22.0,
    sellerName: "Arun Kumar",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543220",
    sellerAddress: "Singanallur, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641005",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T14:45:00Z",
    distanceKm: 3.8,
  },
  {
    id: "scrap_demo_12",
    deviceName: "Cast Iron Grills & Steel Scrap",
    brand: "Structural Steel",
    category: "Iron",
    condition: "Scrap for Parts & Metals",
    estimatedAge: "8 years",
    description: "Heavy iron window grills, angle rods, pipe cutpieces, and structural steel scrap from home renovation.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    price: "₹1,400",
    weightKg: 35.0,
    sellerName: "Murugan S.",
    sellerCity: "Coimbatore",
    sellerPhone: "9876543221",
    sellerAddress: "Ramanathapuram, Coimbatore",
    sellerState: "Tamil Nadu",
    sellerPincode: "641045",
    sellerRole: "Household / Seller",
    status: "AVAILABLE",
    createdAt: "2026-08-24T15:00:00Z",
    distanceKm: 2.5,
  },
];

export default function BuyerPortalPage() {
  const { t } = useTranslation();
  const [listings, setListings] = useState<ExtendedListing[]>(() => {
    if (typeof window !== "undefined") {
      let custom: any[] = [];
      try {
        custom = JSON.parse(localStorage.getItem("ecoroute_custom_listings") || "[]");
      } catch {}
      return [...custom, ...FALLBACK_SCRAP_LISTINGS];
    }
    return FALLBACK_SCRAP_LISTINGS;
  });
  const [loading, setLoading] = useState(false);
  const [isDemoData, setIsDemoData] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [activeTab, setActiveTab] = useState<"listings" | "route">("listings");
  const [activeItem, setActiveItem] = useState<ExtendedListing | null>(null);
  
  // Checkout & Payment State
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "UPI" | "CARD">("CASH");
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split("T")[0];
  });
  const [pickupTimeSlot, setPickupTimeSlot] = useState("10:00 AM - 01:00 PM");
  const [pickupNotes, setPickupNotes] = useState("I will arrive with exact cash/UPI to collect the scrap item.");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [buyerUser, setBuyerUser] = useState<any>(null);
  
  // Notifications & Messages State
  const [buyerNotifs, setBuyerNotifs] = useState<any[]>([]);
  const [showNotifTray, setShowNotifTray] = useState(false);
  const [activeBuyerChat, setActiveBuyerChat] = useState<any | null>(null);

  const receiptRef = useRef<HTMLDivElement>(null);

  // Load user & notifications
  useEffect(() => {
    const stored = localStorage.getItem("ecoroute_user");
    if (stored) {
      try { setBuyerUser(JSON.parse(stored)); } catch {}
    }

    const loadBuyerNotifs = () => {
      try {
        const stored = localStorage.getItem("ecoroute_buyer_notifications");
        if (stored) {
          const parsed = JSON.parse(stored);
          setBuyerNotifs((prev) => (prev.length !== parsed.length ? parsed : prev));
        } else {
          setBuyerNotifs((prev) => {
            if (prev.length === 0) {
              return [
                {
                  id: "buyer-demo-1",
                  title: "💬 Household Seller wants to message you",
                  message: "Seller sent: \"Scrap washing machine is unplugged and ready for pickup!\"",
                  timestamp: "Just now",
                  sellerName: "Rajesh Kumar",
                  sellerPhone: "+91 98765 43210",
                  itemName: "Old Washing Machine Scrap",
                  itemPrice: "₹1,800",
                  read: false,
                },
              ];
            }
            return prev;
          });
        }
      } catch {}
    };

    loadBuyerNotifs();
    const interval = setInterval(loadBuyerNotifs, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchListings = async () => {
    try {
      let custom: any[] = [];
      if (typeof window !== "undefined") {
        try {
          custom = JSON.parse(localStorage.getItem("ecoroute_custom_listings") || "[]");
        } catch {}
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch("/api/ewaste", { signal: controller.signal });
      clearTimeout(timeoutId);

      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const combined = [...custom, ...json.data];
        const uniqueMap = new Map<string, ExtendedListing>();
        for (let i = 0; i < combined.length; i++) {
          const item = combined[i];
          if (!uniqueMap.has(item.id)) {
            const distances = [1.4, 2.1, 3.2, 4.1, 2.7, 1.8, 3.5, 2.3, 1.1, 4.6, 3.8, 2.5];
            uniqueMap.set(item.id, {
              ...item,
              distanceKm: item.distanceKm || distances[i % distances.length],
            });
          }
        }
        setListings(Array.from(uniqueMap.values()));
        setIsDemoData(false);
      } else {
        const combined = [...custom, ...FALLBACK_SCRAP_LISTINGS];
        const uniqueMap = new Map();
        combined.forEach((it) => uniqueMap.set(it.id, it));
        setListings(Array.from(uniqueMap.values()));
        setIsDemoData(true);
      }
    } catch {
      let custom: any[] = [];
      if (typeof window !== "undefined") {
        try {
          custom = JSON.parse(localStorage.getItem("ecoroute_custom_listings") || "[]");
        } catch {}
      }
      const combined = [...custom, ...FALLBACK_SCRAP_LISTINGS];
      const uniqueMap = new Map();
      combined.forEach((it) => uniqueMap.set(it.id, it));
      setListings(Array.from(uniqueMap.values()));
      setIsDemoData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
    const interval = setInterval(fetchListings, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = listings.filter((item) => {
    const cat = item.category.toLowerCase();
    const target = selectedCategory.toLowerCase();
    const matchCat =
      selectedCategory === "All" ||
      cat.includes(target) ||
      target.includes(cat) ||
      (target === "metal" && (cat.includes("metal") || cat.includes("copper") || cat.includes("aluminium") || cat.includes("brass") || cat.includes("iron")));

    const maxDist = selectedDistance === "2km" ? 2.0 : selectedDistance === "5km" ? 5.0 : selectedDistance === "10km" ? 10.0 : 999;
    const matchDistance = (item.distanceKm || 2.0) <= maxDist;

    const matchSearch =
      !search ||
      item.deviceName.toLowerCase().includes(search.toLowerCase()) ||
      item.sellerCity.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(search.toLowerCase()));

    return matchCat && matchDistance && matchSearch;
  });

  // Handle Payment & Order Intimation
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;

    setIsProcessingPayment(true);

    setTimeout(() => {
      const txnId = `TXN-SCRAP-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        txnId,
        date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        item: activeItem,
        amount: bidAmount || activeItem.price.replace(/[^0-9]/g, ""),
        paymentMethod,
        pickupDate,
        pickupTimeSlot,
        pickupNotes,
        buyerName: buyerUser?.fullName || "Verified Scrap Dealer",
        buyerPhone: buyerUser?.mobile || "+91 98765 43210",
      };

      const newNotif = {
        id: `notif-${Date.now()}`,
        title: "🚚 Scrap Pickup Scheduled by Dealer!",
        message: `Scrap Dealer '${orderData.buyerName}' (${orderData.buyerPhone}) has scheduled doorstep pickup for '${activeItem.deviceName}' at ₹${orderData.amount} via ${paymentMethod}.\n\n📅 Pickup Date: ${pickupDate} (${pickupTimeSlot})\n💬 Note: "${pickupNotes || 'Will arrive to collect item and pay.'}"`,
        timestamp: "Just now",
        type: "reward",
        read: false,
        buyerName: orderData.buyerName,
        buyerPhone: orderData.buyerPhone,
        itemName: activeItem.deviceName,
        itemPrice: `₹${orderData.amount}`,
      };

      try {
        const existing = JSON.parse(localStorage.getItem("ecoroute_notifications") || "[]");
        localStorage.setItem("ecoroute_notifications", JSON.stringify([newNotif, ...existing]));
      } catch {}

      fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotif),
      }).catch(() => {});

      setListings((prev) =>
        prev.map((l) => (l.id === activeItem.id ? ({ ...l, status: "SOLD" } as ExtendedListing) : l))
      );

      setCompletedOrderData(orderData);
      setIsProcessingPayment(false);
      setOrderCompleted(true);
    }, 1200);
  };

  const openWhatsApp = (phone: string, deviceName: string) => {
    const msg = encodeURIComponent(
      `Hi ${activeItem?.sellerName || "Seller"}! I am a verified EcoRoute Scrap Dealer interested in collecting your ${deviceName} for ₹${bidAmount || activeItem?.price}.\nI can arrange pickup on ${pickupDate} (${pickupTimeSlot}) and pay ${paymentMethod === "CASH" ? "Cash" : "via " + paymentMethod}. Please confirm your address.`
    );
    window.open(`https://wa.me/91${phone}?text=${msg}`, "_blank");
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top Header Bar ─────────────────────────────────────────────── */}
      <div className="bg-[#0F172A] text-white py-4 px-5 sm:px-8 shadow border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center font-bold text-lg text-emerald-400">
              {buyerUser?.fullName?.[0] || "D"}
            </div>
            <div>
              <div className="font-extrabold text-sm flex items-center gap-1.5 text-white">
                <MdVerified className="w-4 h-4 text-emerald-400" />
                {buyerUser?.fullName || "Scrap Dealer Partner"}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                EcoRoute Verified Scrap Dealer Network
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Tabs */}
            <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => setActiveTab("listings")}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "listings"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <MdInventory2 className="w-3.5 h-3.5" />
                Nearby Listings
              </button>
              <button
                onClick={() => setActiveTab("route")}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "route"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <MdAltRoute className="w-3.5 h-3.5" />
                AI Optimized Route
              </button>
            </div>

            {/* Messages Popover Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifTray((prev) => !prev)}
                className="relative px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 text-xs font-bold transition cursor-pointer border border-slate-700"
              >
                <MdNotifications className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Alerts</span>
                {buyerNotifs.length > 0 && (
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {buyerNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popover Tray */}
              <AnimatePresence>
                {showNotifTray && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 text-slate-800 overflow-hidden"
                  >
                    <div className="bg-[#0F172A] text-white p-3 px-4 flex items-center justify-between">
                      <span className="text-xs font-extrabold flex items-center gap-1.5">
                        <MdChatBubbleOutline className="w-4 h-4 text-emerald-400" />
                        Seller Messages & Pickup Alerts
                      </span>
                      <button
                        onClick={() => setShowNotifTray(false)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        <MdClose className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto p-3 flex flex-col gap-2">
                      {buyerNotifs.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400">
                          No new messages or notifications.
                        </div>
                      ) : (
                        buyerNotifs.map((n) => (
                          <div
                            key={n.id}
                            className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 flex flex-col gap-1.5 hover:bg-emerald-50 transition"
                          >
                            <span className="text-xs font-bold text-slate-900">
                              {n.title}
                            </span>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {n.message}
                            </p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-slate-400 font-mono">
                                {n.timestamp}
                              </span>
                              <button
                                onClick={() => {
                                  setShowNotifTray(false);
                                  setActiveBuyerChat(n);
                                }}
                                className="px-3 py-1 bg-emerald-700 text-white text-[11px] font-bold rounded-lg hover:bg-emerald-800 flex items-center gap-1 cursor-pointer shadow-xs"
                              >
                                <MdChatBubbleOutline className="w-3.5 h-3.5" />
                                Chat with Seller
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("ecoroute_user");
                window.location.replace("/login");
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer px-2 py-1"
            >
              <MdLogout className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* ── 5 Dealer Dashboard Cards (Section 8 of requirements) ────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
            <span className="text-2xl font-black text-emerald-700">12</span>
            <span className="text-xs font-extrabold text-slate-800">New Listings</span>
            <span className="text-[10px] text-slate-500 font-medium">Within 5 km radius</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
            <span className="text-2xl font-black text-cyan-700">4</span>
            <span className="text-xs font-extrabold text-slate-800">Nearby Pickups</span>
            <span className="text-[10px] text-slate-500 font-medium">Scheduled today</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
            <span className="text-2xl font-black text-blue-700">2</span>
            <span className="text-xs font-extrabold text-slate-800">Active Collections</span>
            <span className="text-[10px] text-slate-500 font-medium">In transit now</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
            <span className="text-2xl font-black text-indigo-700">38</span>
            <span className="text-xs font-extrabold text-slate-800">Completed Collections</span>
            <span className="text-[10px] text-slate-500 font-medium">This month</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
            <span className="text-2xl font-black text-emerald-600">₹58,400</span>
            <span className="text-xs font-extrabold text-slate-800">Purchase Value</span>
            <span className="text-[10px] text-slate-500 font-medium">Estimated scrap inventory</span>
          </div>
        </div>

        {/* ── AI OPTIMIZED ROUTE VIEW (Section 10 of requirements) ────────────────── */}
        {activeTab === "route" ? (
          <div className="flex flex-col gap-6">
            {/* Route Header Card */}
            <div className="bg-gradient-to-r from-[#0F5132] to-[#0F172A] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    ✦ AI Route Optimization (Demo Simulation)
                  </span>
                </div>
                <h2 className="text-xl font-black text-white">
                  Multi-Stop Scrap Collection Route
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  EcoRoute algorithms cluster neighborhood household pickups into the most fuel-efficient sequence.
                </p>
              </div>

              {/* Route Summary Stats */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-center">
                  <p className="text-xs text-slate-300">Total Distance</p>
                  <p className="text-lg font-black text-emerald-300">5.1 km</p>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-center">
                  <p className="text-xs text-slate-300">Travel Time</p>
                  <p className="text-lg font-black text-cyan-300">~24 mins</p>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-center">
                  <p className="text-xs text-slate-300">Pickups</p>
                  <p className="text-lg font-black text-white">3 stops</p>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-center">
                  <p className="text-xs text-slate-300">Distance Saved</p>
                  <p className="text-lg font-black text-emerald-400">3.4 km saved</p>
                </div>
              </div>
            </div>

            {/* Visual Route Flow */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <MdAltRoute className="w-4 h-4 text-emerald-700" />
                Optimized Multi-Pickup Sequence
              </h3>

              <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                {/* Dealer Base */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 text-white shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    <MdStorefront className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-emerald-400">Starting Point</p>
                    <p className="text-sm font-black text-white">Scrap Dealer Shop / Yard Base</p>
                    <p className="text-[11px] text-slate-400">Coimbatore Hub · Departure: 10:00 AM</p>
                  </div>
                </div>

                {/* Down Arrow */}
                <div className="flex items-center justify-center py-0.5">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    ↓ Travel 1.2 km (5 mins)
                  </span>
                </div>

                {/* Stop 1 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-extrabold text-slate-900">Pickup 1 — Old Washing Machine Scrap</p>
                      <span className="text-xs font-extrabold text-emerald-700">₹1,800</span>
                    </div>
                    <p className="text-xs text-slate-600">Seller: Rajesh Kumar · Approx. 45 kg</p>
                    <p className="text-[11px] text-slate-500">📍 Eachanari Road, Coimbatore (1.2 km away)</p>
                  </div>
                </div>

                {/* Down Arrow */}
                <div className="flex items-center justify-center py-0.5">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    ↓ Travel 2.1 km (9 mins)
                  </span>
                </div>

                {/* Stop 2 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-black shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-extrabold text-slate-900">Pickup 2 — Pure Copper Wire Windings</p>
                      <span className="text-xs font-extrabold text-emerald-700">₹3,200</span>
                    </div>
                    <p className="text-xs text-slate-600">Seller: Karthick A. · Approx. 4.5 kg</p>
                    <p className="text-[11px] text-slate-500">📍 Sundarapuram Junction (2.1 km from Stop 1)</p>
                  </div>
                </div>

                {/* Down Arrow */}
                <div className="flex items-center justify-center py-0.5">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    ↓ Travel 1.8 km (8 mins)
                  </span>
                </div>

                {/* Stop 3 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-extrabold text-slate-900">Pickup 3 — Extruded Aluminium Frames</p>
                      <span className="text-xs font-extrabold text-emerald-700">₹2,100</span>
                    </div>
                    <p className="text-xs text-slate-600">Seller: Priya S. · Approx. 12 kg</p>
                    <p className="text-[11px] text-slate-500">📍 Sidco Industrial Zone (1.8 km from Stop 2)</p>
                  </div>
                </div>

                {/* Down Arrow */}
                <div className="flex items-center justify-center py-0.5">
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    ↓ Return 2.0 km to Yard
                  </span>
                </div>

                {/* Return */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 text-white shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    <MdStorefront className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-emerald-400">Route Completed</p>
                    <p className="text-sm font-black text-white">Return to Scrap Yard / Sorting Facility</p>
                    <p className="text-[11px] text-slate-400">Total Scrap Collected: ~61.5 kg · Total Value: ₹7,100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── LISTINGS VIEW ────────────────────────────────────────── */
          <div className="flex flex-col gap-5">
            {/* Search + Distance Filters + Demo Indicator */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <MdSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search scrap material, metal type, appliance, or locality..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-3.5 text-sm font-semibold text-slate-900 rounded-xl border border-slate-300 bg-white focus:border-emerald-600 outline-none shadow-2xs placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* Distance filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
                {DISTANCE_FILTERS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistance(d.id)}
                    className={`px-3.5 py-2 text-xs font-extrabold rounded-xl transition shrink-0 cursor-pointer border ${
                      selectedDistance === d.id
                        ? "bg-emerald-700 text-white border-emerald-700 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {isDemoData && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                    ✦ Demo marketplace data
                  </span>
                )}

                <button
                  onClick={fetchListings}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-extrabold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs shrink-0"
                >
                  <MdRefresh className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Listings Grid */}
            {loading ? (
              <div className="text-center py-16 text-sm font-bold text-slate-500">
                Loading available scrap opportunities...
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center gap-3 text-center">
                <MdInventory2 className="w-14 h-14 text-slate-300" />
                <h3 className="font-extrabold text-slate-800">No scrap listings found in this range</h3>
                <p className="text-xs text-slate-500 max-w-sm">Try broadening your distance filter or changing category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg hover:border-emerald-500/40 transition-all group flex flex-col"
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
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                        <MdCategory className="w-3 h-3 text-emerald-400" />
                        {item.category}
                      </div>

                      <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-xs font-black px-3 py-0.5 rounded-full shadow">
                        {item.price}
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <MdLocationOn className="w-3 h-3 text-cyan-400" />
                        {item.distanceKm || 2.1} km away
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 flex flex-col gap-2.5 flex-1">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
                          {item.deviceName}
                        </h3>
                        {item.brand && item.brand !== "Generic" && (
                          <span className="text-[11px] text-slate-500 font-semibold">Material/Brand: {item.brand}</span>
                        )}
                      </div>

                      {/* Condition & Weight */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${CONDITIONS_COLOR[item.condition] || "bg-slate-100 text-slate-700"}`}>
                          {item.condition}
                        </span>
                        {item.weightKg > 0 && (
                          <span className="flex items-center gap-0.5 text-[11px] text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                            <MdScale className="w-3.5 h-3.5" />
                            {item.weightKg} kg
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">{item.description}</p>
                      )}

                      {/* Seller Info */}
                      <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-xs text-slate-600">
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span className="flex items-center gap-1">
                            <MdPerson className="w-3.5 h-3.5 text-slate-400" />
                            {item.sellerName || "Household Seller"}
                          </span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                            Household
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <MdLocationOn className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item.sellerCity || "Local Area"} ({item.distanceKm || 2.1} km)</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-4 pb-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveItem(item);
                          setBidAmount(item.price.replace(/[^0-9]/g, ""));
                          setOrderCompleted(false);
                          setCompletedOrderData(null);
                        }}
                        className="flex-1 py-2.5 text-xs font-extrabold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <MdLocalShipping className="w-4 h-4" />
                        Request Pickup
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── BUYER CHECKOUT, PICKUP INTIMATION & RECEIPT MODAL ────────────────────── */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#0F5132] text-white">
                <div className="flex items-center gap-2 text-white">
                  <MdLocalShipping className="w-5 h-5 text-emerald-300 shrink-0" />
                  <h3 className="text-sm font-extrabold text-white tracking-wide">
                    {orderCompleted ? "Scrap Purchase & Collection Token" : "Request Scrap Pickup & Offer"}
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
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                      <MdNotificationsActive className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex flex-col text-xs text-emerald-900 gap-1">
                        <span className="font-bold text-sm">🚚 Pickup Request Confirmed!</span>
                        <span>
                          Household seller <strong>{completedOrderData.item.sellerName}</strong> has been notified that you will arrive on <strong>{completedOrderData.pickupDate} ({completedOrderData.pickupTimeSlot})</strong> to collect <strong>{completedOrderData.item.deviceName}</strong> and pay ₹{completedOrderData.amount} via {completedOrderData.paymentMethod}.
                        </span>
                      </div>
                    </div>

                    {/* Official Receipt Box */}
                    <div ref={receiptRef} className="border border-slate-300 rounded-2xl p-5 bg-white shadow-sm flex flex-col gap-4 text-slate-800">
                      <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                        <div className="flex flex-col">
                          <span className="text-base font-black text-emerald-800">EcoRoute Scrap Collection Token</span>
                          <span className="text-[10px] font-bold uppercase text-slate-500">Verified Dealer Collection Token</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-900">{completedOrderData.txnId}</span>
                          <div className="text-[10px] text-slate-400">{completedOrderData.date}</div>
                        </div>
                      </div>

                      {/* Items & Intimation Summary */}
                      <div className="flex flex-col gap-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="font-semibold text-slate-600">Scrap Item:</span>
                          <span className="font-bold text-slate-900">{completedOrderData.item.deviceName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="font-semibold text-slate-600">Payment Mode:</span>
                          <span className="font-bold text-emerald-700">{completedOrderData.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="font-semibold text-slate-600">Scheduled Date:</span>
                          <span className="font-bold text-blue-700">{completedOrderData.pickupDate} ({completedOrderData.pickupTimeSlot})</span>
                        </div>
                        <div className="flex justify-between py-1.5 text-sm font-black bg-slate-50 px-3 rounded-xl mt-1">
                          <span className="text-slate-700">Estimated Scrap Value:</span>
                          <span className="text-emerald-700">₹{completedOrderData.amount}</span>
                        </div>
                      </div>

                      {/* Unlocked Seller Pickup Location & Contact */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <MdLocationOn className="w-4 h-4 text-emerald-700" />
                          Seller Pickup Address & Contact
                        </span>
                        
                        <div className="text-xs text-slate-700 flex flex-col gap-1 pl-5">
                          <div><strong>Seller:</strong> {completedOrderData.item.sellerName}</div>
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
                            className="px-3.5 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5 no-underline shadow-xs"
                          >
                            <MdDirections className="w-4 h-4" /> Open Route Navigation
                          </a>
                          {completedOrderData.item.sellerPhone && (
                            <a
                              href={`tel:${completedOrderData.item.sellerPhone}`}
                              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-800 text-white hover:bg-slate-900 flex items-center gap-1.5 no-underline shadow-xs"
                            >
                              <MdPhone className="w-4 h-4" /> Call Seller
                            </a>
                          )}
                          {(completedOrderData.item.sellerPhone || completedOrderData.item.sellerWhatsapp) && (
                            <button
                              type="button"
                              onClick={() => openWhatsApp(completedOrderData.item.sellerPhone || completedOrderData.item.sellerWhatsapp, completedOrderData.item.deviceName)}
                              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <MdWhatsapp className="w-4 h-4" /> WhatsApp Seller
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handlePrintReceipt}
                        className="px-4 py-2.5 text-xs font-extrabold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                      >
                        <MdPrint className="w-4 h-4" />
                        Print / Download Token
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveItem(null)}
                        className="px-6 py-2.5 text-xs font-extrabold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : isProcessingPayment ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin flex items-center justify-center">
                      <MdLocalShipping className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">Scheduling Pickup with Household...</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Sending notification to {activeItem.sellerName} for {pickupDate}...
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ── CHECKOUT FORM ──────────────────────────────── */
                  <form onSubmit={handleProcessPayment} className="flex flex-col gap-4">
                    <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <img
                        src={activeItem.imageUrl}
                        alt={activeItem.deviceName}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200"; }}
                      />
                      <div className="flex flex-col justify-center gap-1 text-xs min-w-0">
                        <span className="font-extrabold text-slate-900 truncate">{activeItem.deviceName}</span>
                        <span className="text-slate-500">Seller: {activeItem.sellerName} ({activeItem.sellerCity})</span>
                        <span className="font-bold text-emerald-700">Estimated Value: {activeItem.price}</span>
                      </div>
                    </div>

                    {/* Price Offer Input */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700">Offered Purchase Price (₹) *</label>
                      <div className="relative">
                        <MdCurrencyRupee className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="number"
                          required
                          min="1"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="w-full h-10 pl-8 pr-3 text-sm font-bold rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <MdPayment className="w-4 h-4 text-emerald-700" />
                        Payment Mode to Household *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "CASH", label: "Cash on Pickup", icon: MdLocalAtm },
                          { id: "UPI", label: "UPI / GPay / QR", icon: MdQrCodeScanner },
                          { id: "CARD", label: "Bank Transfer", icon: MdCreditCard },
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
                                  ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-xs"
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

                    {/* Pickup Date & Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <MdCalendarMonth className="w-4 h-4 text-blue-600" />
                          Pickup Date *
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full h-10 px-3 text-xs font-bold rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <MdAccessTime className="w-4 h-4 text-amber-600" />
                          Time Slot *
                        </label>
                        <select
                          value={pickupTimeSlot}
                          onChange={(e) => setPickupTimeSlot(e.target.value)}
                          className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:border-emerald-600 outline-none bg-white"
                        >
                          <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (Morning)</option>
                          <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM (Midday)</option>
                          <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (Afternoon)</option>
                          <option value="05:00 PM - 08:00 PM">05:00 PM - 08:00 PM (Evening)</option>
                        </select>
                      </div>
                    </div>

                    {/* Note for Seller */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <MdOutlineMessage className="w-4 h-4 text-emerald-600" />
                        Message / Note for Household
                      </label>
                      <textarea
                        rows={2}
                        value={pickupNotes}
                        onChange={(e) => setPickupNotes(e.target.value)}
                        placeholder="e.g. I will arrive with scale and cash at 10 AM."
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
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
                        className="flex-1 py-2.5 text-xs font-extrabold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <MdCheckCircle className="w-4 h-4" />
                        Confirm & Schedule Pickup
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LIVE CHAT MODAL ─────────────────────── */}
      {activeBuyerChat && (
        <BuyerChatModal
          isOpen={!!activeBuyerChat}
          onClose={() => setActiveBuyerChat(null)}
          notificationId={activeBuyerChat.id}
          buyerName={activeBuyerChat.sellerName || "Household Seller"}
          buyerPhone={activeBuyerChat.sellerPhone || "+91 98765 43210"}
          itemName={activeBuyerChat.itemName || "Scrap Item"}
          itemPrice={activeBuyerChat.itemPrice || "₹1,800"}
          initialMessage={activeBuyerChat.message || "Hello! I am preparing the scrap item for collection."}
        />
      )}
    </div>
  );
}
