"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MdPhotoCamera,
  MdCloudUpload,
  MdDelete,
  MdCheckCircle,
  MdPhone,
  MdPerson,
  MdEmail,
  MdMyLocation,
  MdWarning,
  MdArrowForward,
  MdStorefront,
  MdCurrencyRupee,
  MdFlip,
  MdAdd,
  MdExpandMore,
  MdExpandLess,
  MdInventory2,
  MdAutoAwesome,
  MdPsychology,
  MdVerifiedUser,
  MdClose,
  MdCameraswitch,
  MdCenterFocusWeak,
} from "react-icons/md";

// ── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Laptops & Computers",
  "Mobile Phones & Tablets",
  "Smartwatches & Wearables",
  "Bluetooth Earbuds & Audio",
  "Electrical Switches & Sockets",
  "Copper Wire & Windings",
  "Metals & Aluminium Scrap",
  "Printed Circuit Boards (PCBs)",
  "Brass, Lead & Heavy Metals",
  "Industrial Electrical Motors",
  "TVs & Monitors",
  "Refrigerators & ACs",
  "Washing Machines",
  "Printers & Scanners",
  "Cameras & Electronics",
  "Batteries & Power Banks",
  "Cables & Accessories",
  "Plastic & Polymer Shells",
  "Other Electronics & Scrap",
];

// ── Base scrap prices per category (₹) — Working Perfect condition ────────────
const CATEGORY_PRICES: Record<string, number> = {
  "Laptops & Computers":           1800,
  "Mobile Phones & Tablets":        950,
  "Smartwatches & Wearables":       550,
  "Bluetooth Earbuds & Audio":      400,
  "Electrical Switches & Sockets":  250,
  "Copper Wire & Windings":         750,
  "Metals & Aluminium Scrap":       450,
  "Printed Circuit Boards (PCBs)":  1100,
  "Brass, Lead & Heavy Metals":     650,
  "Industrial Electrical Motors":   1600,
  "TVs & Monitors":                 1200,
  "Refrigerators & ACs":            2500,
  "Washing Machines":               1500,
  "Printers & Scanners":             600,
  "Cameras & Electronics":           800,
  "Batteries & Power Banks":         300,
  "Cables & Accessories":            250,
  "Plastic & Polymer Shells":        200,
  "Other Electronics & Scrap":       400,
};

// ── Condition multipliers ─────────────────────────────────────────────────────
const CONDITION_MULTIPLIER: Record<string, number> = {
  "Working — Perfect Condition": 1.00,
  "Working — Minor Issues":      0.75,
  "Partially Working":           0.55,
  "Non-working / Damaged":       0.35,
  "Scrap for Parts & Metals":    0.20,
};

const CONDITIONS = Object.keys(CONDITION_MULTIPLIER);

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const computePrice = (category: string, condition: string) =>
  String(Math.round((CATEGORY_PRICES[category] ?? 400) * (CONDITION_MULTIPLIER[condition] ?? 1)));

// ── Types ─────────────────────────────────────────────────────────────────────
interface ScrapItem {
  id: string;
  imageDataUrl: string | null;
  deviceName: string;
  brand: string;
  category: string;
  condition: string;
  askingPrice: string;
  priceAutoFilled: boolean;
  estimatedWeight: string;
  estimatedAge: string;
  quantity: string;
  description: string;
  collapsed: boolean;

  // AI Scanner attributes
  isScanningAI?: boolean;
  aiVerified?: boolean;
  aiAuthenticityScore?: number;
  aiBadges?: string[];
  aiError?: string;
  aiAutoFilled?: boolean;
}

interface ContactForm {
  sellerName: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  acceptTerms: boolean;
}

const makeItem = (): ScrapItem => ({
  id: Math.random().toString(36).slice(2),
  imageDataUrl: null,
  deviceName: "",
  brand: "",
  category: "Mobile Phones & Tablets",
  condition: "Non-working / Damaged",
  askingPrice: computePrice("Mobile Phones & Tablets", "Non-working / Damaged"),
  priceAutoFilled: true,
  estimatedWeight: "",
  estimatedAge: "",
  quantity: "1",
  description: "",
  collapsed: false,
});

// High contrast input styling helper
const inputBaseStyle = "w-full h-11 px-3.5 bg-white text-slate-900 font-semibold text-sm rounded-xl border border-slate-300 placeholder:text-slate-400 placeholder:font-normal focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all shadow-xs";

// ─────────────────────────────────────────────────────────────────────────────
export default function SellScrapPage() {
  const router = useRouter();

  const [items, setItems] = useState<ScrapItem[]>([makeItem()]);
  const [contact, setContact] = useState<ContactForm>({
    sellerName: "", phone: "", email: "", whatsapp: "",
    address: "", city: "", state: "Tamil Nadu",
    pincode: "", latitude: "", longitude: "", acceptTerms: false,
  });

  const [isLocating, setIsLocating] = useState(false);
  const [locationMsg, setLocationMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Live Camera Modal State ─────────────────────────────────────────────────
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [activeCameraItemId, setActiveCameraItemId] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Pre-fill contact from stored user (leaving mobile empty if default dummy)
  useEffect(() => {
    const stored = localStorage.getItem("ecoroute_user");
    if (!stored) return;
    try {
      const u = JSON.parse(stored);
      const userPhone = (u.mobile && u.mobile !== "9876543210") ? u.mobile : "";
      setContact((p) => ({
        ...p,
        sellerName: u.fullName || p.sellerName,
        email: u.email || p.email,
        phone: userPhone,
        whatsapp: userPhone,
        city: u.city || p.city,
        state: u.state || "Tamil Nadu",
      }));
    } catch {}
  }, []);

  // ── Camera Viewfinder Controller ───────────────────────────────────────────
  const startCameraStream = useCallback(async (facing: "environment" | "user" = "environment") => {
    setCameraError(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError("Camera access denied or webcam not available. Please allow camera permissions or upload an image.");
    }
  }, []);

  const openCameraModal = (itemId: string) => {
    setActiveCameraItemId(itemId);
    setCameraModalOpen(true);
    setCameraFacing("environment");
    setTimeout(() => {
      startCameraStream("environment");
    }, 150);
  };

  const closeCameraModal = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraModalOpen(false);
    setActiveCameraItemId(null);
  }, []);

  const switchCamera = () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(nextFacing);
    startCameraStream(nextFacing);
  };

  const capturePhotoFromCamera = () => {
    const video = videoRef.current;
    if (!video || !activeCameraItemId) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      
      // Convert to File and trigger AI scan
      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `live_e_waste_scan_${Date.now()}.jpg`, { type: "image/jpeg" });
          handleImageFile(activeCameraItemId, file);
        });
    }
    closeCameraModal();
  };

  // ── Item helpers ────────────────────────────────────────────────────────────
  const updateItem = (id: string, patch: Partial<ScrapItem>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const addItem = () =>
    setItems((prev) => [...prev, makeItem()]);

  const toggleCollapse = (id: string) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, collapsed: !it.collapsed } : it))
    );

  // ── AI Image Scanner Integration ───────────────────────────────────────────
  const handleImageFile = async (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result as string;
      updateItem(id, {
        imageDataUrl: dataUrl,
        isScanningAI: true,
        aiError: undefined,
      });

      try {
        const res = await fetch("/api/ai/scan-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageDataUrl: dataUrl, fileName: file.name }),
        });
        const json = await res.json();

        if (res.ok && json.success && json.data) {
          const scan = json.data;
          if (scan.isRealScrap) {
            updateItem(id, {
              isScanningAI: false,
              aiVerified: true,
              aiAuthenticityScore: scan.authenticityScore,
              aiBadges: scan.aiBadges || [],
              deviceName: scan.deviceName || undefined,
              brand: scan.brand || undefined,
              category: scan.category || "Mobile Phones & Tablets",
              condition: scan.condition || "Non-working / Damaged",
              askingPrice: scan.askingPrice,
              priceAutoFilled: true,
              estimatedWeight: scan.estimatedWeight,
              estimatedAge: scan.estimatedAge,
              description: scan.description,
              aiAutoFilled: true,
            });
          } else {
            updateItem(id, {
              isScanningAI: false,
              aiVerified: false,
              aiError: scan.reasonIfFake || "Photo does not appear to be an e-waste or scrap item.",
            });
          }
        } else {
          updateItem(id, {
            isScanningAI: false,
            aiVerified: false,
            aiError: "AI image scan completed with manual input fallback.",
          });
        }
      } catch {
        updateItem(id, { isScanningAI: false });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (id: string, category: string, condition: string) => {
    const price = computePrice(category, condition);
    updateItem(id, { category, askingPrice: price, priceAutoFilled: true });
  };

  const handleConditionChange = (id: string, category: string, condition: string) => {
    const price = computePrice(category, condition);
    updateItem(id, { condition, askingPrice: price, priceAutoFilled: true });
  };

  // ── GPS ──────────────────────────────────────────────────────────────────────
  const detectLocation = () => {
    if (!navigator.geolocation) { setLocationMsg("Geolocation not supported."); return; }
    setIsLocating(true);
    setLocationMsg("Detecting your live location...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setContact((p) => ({ ...p, latitude: latitude.toFixed(6), longitude: longitude.toFixed(6) }));
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const geo = await res.json();
          const addr = geo.address || {};
          setContact((p) => ({
            ...p,
            city: addr.city || addr.town || addr.village || p.city,
            pincode: addr.postcode || p.pincode,
            address: geo.display_name?.split(",").slice(0, 3).join(", ") || p.address,
          }));
          setLocationMsg(`✓ Location detected: ${addr.city || addr.town || "your area"}`);
        } catch {
          setLocationMsg(`✓ GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        setIsLocating(false);
      },
      () => { setLocationMsg("Could not get location. Please enter manually."); setIsLocating(false); },
      { timeout: 10000 }
    );
  };

  // ── Validation ───────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    items.forEach((it, i) => {
      if (!it.deviceName.trim()) e[`name_${i}`] = `Item ${i + 1}: Device name required.`;
      if (!it.askingPrice || isNaN(Number(it.askingPrice))) e[`price_${i}`] = `Item ${i + 1}: Valid price required.`;
    });
    if (!contact.sellerName.trim()) e.sellerName = "Your name is required.";
    if (!/^[6-9]\d{9}$/.test(contact.phone)) e.phone = "Enter a valid 10-digit mobile number.";
    if (!contact.city.trim()) e.city = "City is required.";
    if (!/^\d{6}$/.test(contact.pincode)) e.pincode = "Enter valid 6-digit PIN code.";
    if (!contact.acceptTerms) e.acceptTerms = "You must accept the terms.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      for (const it of items) {
        const payload = {
          deviceName: it.deviceName,
          brand: it.brand,
          category: it.category,
          condition: it.condition,
          estimatedAge: it.estimatedAge,
          description: it.description,
          askingPrice: it.askingPrice,
          price: `₹${it.askingPrice}`,
          estimatedWeight: it.estimatedWeight,
          city: contact.city,
          sellerName: contact.sellerName,
          sellerPhone: contact.phone,
          sellerEmail: contact.email,
          sellerWhatsapp: contact.whatsapp,
          sellerAddress: contact.address,
          sellerState: contact.state,
          sellerPincode: contact.pincode,
          latitude: contact.latitude,
          longitude: contact.longitude,
          imageUrl: it.imageDataUrl || undefined,
        };
        const res = await fetch("/api/ewaste/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          alert(`Failed to publish "${it.deviceName}": ${data.message}`);
          setIsSubmitting(false);
          return;
        }
      }
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Error publishing listings.");
    }
    setIsSubmitting(false);
  };

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-5 text-center bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-slate-200 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <MdCheckCircle className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          {items.length} Item{items.length > 1 ? "s" : ""} AI-Verified & Listed Successfully!
        </h2>
        <p className="text-sm text-slate-600 max-w-md font-medium leading-relaxed">
          Your scrap items have been scanned by AI and published to the EcoRoute Live Marketplace.
          Verified Recyclers and Government Officers can now view and contact you.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => { setSubmitted(false); setItems([makeItem()]); }}
            className="px-5 py-2.5 text-sm font-extrabold rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 cursor-pointer shadow-xs"
          >
            List More Items
          </button>
          <button
            onClick={() => router.push("/#marketplace")}
            className="px-6 py-2.5 text-sm font-extrabold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] cursor-pointer flex items-center gap-2 shadow-md"
          >
            <MdStorefront className="w-4 h-4" />
            View Marketplace
          </button>
        </div>
      </div>
    );
  }

  // ── Main Dashboard Upload View ───────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-8 relative">

      {/* ── LIVE CAMERA VIEWFINDER MODAL ─────────────────────────────────────── */}
      {cameraModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-4 sm:p-5 flex flex-col items-center gap-4 shadow-2xl text-white relative animate-in fade-in zoom-in-95 duration-200">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between pb-1 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-extrabold tracking-wide uppercase text-slate-200">
                  LIVE AI SCANNER
                </span>
              </div>
              <button
                onClick={closeCameraModal}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Viewfinder */}
            <div className="relative w-full aspect-[4/3] max-h-[300px] bg-slate-950 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-xl flex items-center justify-center">
              {cameraError ? (
                <div className="p-4 text-center text-white flex flex-col items-center gap-2">
                  <MdWarning className="w-8 h-8 text-amber-400" />
                  <p className="text-[11px] text-amber-200">{cameraError}</p>
                  <button
                    onClick={closeCameraModal}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                  >
                    Close & Use Upload Option
                  </button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* Target Frame / Crosshair */}
                  <div className="absolute inset-4 border-2 border-dashed border-white/60 rounded-xl pointer-events-none flex flex-col items-center justify-between p-2">
                    <div className="flex justify-between w-full text-white/80 text-[9px] uppercase font-mono">
                      <span>✦ Align Item</span>
                      <span>AI Active</span>
                    </div>
                    <MdCenterFocusWeak className="w-10 h-10 text-white/80 animate-pulse" />
                    <div className="text-white/90 text-[10px] font-semibold bg-black/70 px-2.5 py-0.5 rounded-full">
                      Align item inside frame & tap Shutter
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Controls (Positioned directly under screen, no scrolling needed) */}
            <div className="w-full flex items-center justify-center gap-6 pt-1">
              {/* Flip camera */}
              <button
                onClick={switchCamera}
                type="button"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer flex items-center justify-center shadow"
                title="Switch Front/Back Camera"
              >
                <MdCameraswitch className="w-5 h-5" />
              </button>

              {/* Shutter Button */}
              <button
                onClick={capturePhotoFromCamera}
                type="button"
                disabled={!!cameraError}
                className="w-16 h-16 rounded-full border-4 border-white bg-red-600 hover:bg-red-500 active:scale-95 transition shadow-2xl flex items-center justify-center cursor-pointer disabled:opacity-50"
                title="Capture Photo"
              >
                <div className="w-12 h-12 rounded-full border-2 border-white/60 bg-red-600 flex items-center justify-center">
                  <MdPhotoCamera className="w-6 h-6 text-white" />
                </div>
              </button>

              {/* Cancel */}
              <button
                onClick={closeCameraModal}
                type="button"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer flex items-center justify-center shadow"
                title="Close Scanner"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-indigo-100 text-indigo-800 flex items-center gap-1.5 shadow-2xs">
            <MdAutoAwesome className="w-3.5 h-3.5 text-indigo-600" /> AI Vision Scanner Enabled
          </span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sell Your Scrap / E-Waste</h1>
        <p className="text-sm font-medium text-slate-600 mt-1">
          Take a photo using camera or upload — EcoRoute Vision AI will verify authenticity, identify the device, and auto-populate all scrap details and price!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        {/* ── STEP 1: Scrap Items Card ────────────────────────────────────────── */}
        <section className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-lg flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-black flex items-center justify-center shadow-xs">1</span>
              Scrap Items
              <span className="ml-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">{items.length}</span>
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-extrabold hover:bg-[var(--color-primary)]/20 transition cursor-pointer border border-[var(--color-primary)]/20 shadow-2xs"
            >
              <MdAdd className="w-4 h-4" />
              Add Another Item
            </button>
          </div>

          {/* Item cards list */}
          <div className="flex flex-col gap-4">
            {items.map((item, idx) => (
              <ItemCard
                key={item.id}
                item={item}
                index={idx}
                totalItems={items.length}
                errors={errors}
                onUpdate={(patch) => updateItem(item.id, patch)}
                onRemove={() => removeItem(item.id)}
                onToggle={() => toggleCollapse(item.id)}
                onImageFile={(file) => handleImageFile(item.id, file)}
                onOpenCameraModal={() => openCameraModal(item.id)}
                onCategoryChange={(cat) => handleCategoryChange(item.id, cat, item.condition)}
                onConditionChange={(cond) => handleConditionChange(item.id, item.category, cond)}
              />
            ))}
          </div>

          {/* Add item button (bottom) */}
          <button
            type="button"
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-[var(--color-primary)]/40 text-[var(--color-primary)] text-sm font-extrabold hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition cursor-pointer"
          >
            <MdAdd className="w-5 h-5" />
            Add Another Scrap Item
          </button>
        </section>

        {/* ── STEP 2: Contact Details Card ────────────────────────────────────── */}
        <section className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-lg flex flex-col gap-5">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <span className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-black flex items-center justify-center shadow-xs">2</span>
            Your Contact Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldWrap label="Full Name" required error={errors.sellerName}>
              <div className="relative">
                <MdPerson className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={contact.sellerName}
                  onChange={(e) => setContact((p) => ({ ...p, sellerName: e.target.value }))}
                  placeholder="Your full name"
                  className={`${inputBaseStyle} pl-10 ${errors.sellerName ? "border-red-500 bg-red-50/20" : ""}`}
                />
              </div>
            </FieldWrap>

            <FieldWrap label="Mobile Number" required error={errors.phone}>
              <div className="relative">
                <MdPhone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="tel"
                  value={contact.phone}
                  maxLength={10}
                  onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="10-digit mobile"
                  className={`${inputBaseStyle} pl-10 ${errors.phone ? "border-red-500 bg-red-50/20" : ""}`}
                />
              </div>
            </FieldWrap>

            <FieldWrap label="Email Address">
              <div className="relative">
                <MdEmail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                  placeholder="yourname@example.com"
                  className={`${inputBaseStyle} pl-10`}
                />
              </div>
            </FieldWrap>

            <FieldWrap label="WhatsApp Number">
              <div className="relative">
                <MdPhone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="tel"
                  value={contact.whatsapp}
                  maxLength={10}
                  onChange={(e) => setContact((p) => ({ ...p, whatsapp: e.target.value }))}
                  placeholder="WhatsApp (if different)"
                  className={`${inputBaseStyle} pl-10`}
                />
              </div>
            </FieldWrap>
          </div>
        </section>

        {/* ── STEP 3: Pickup Location Card ────────────────────────────────────── */}
        <section className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-lg flex flex-col gap-5">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <span className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-black flex items-center justify-center shadow-xs">3</span>
            Pickup Location
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={detectLocation}
              disabled={isLocating}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-primary)] text-white text-xs font-extrabold hover:bg-[var(--color-primary-dark)] transition cursor-pointer disabled:opacity-60 w-fit shadow-md"
            >
              <MdMyLocation className="w-4 h-4" />
              {isLocating ? "Detecting Live Location..." : "Detect My Live Location"}
            </button>
            {locationMsg && (
              <span className={`text-xs font-extrabold ${locationMsg.startsWith("✓") ? "text-emerald-700" : "text-amber-700"}`}>
                {locationMsg}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <FieldWrap label="Street Address / Area">
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) => setContact((p) => ({ ...p, address: e.target.value }))}
                  placeholder="House no, Street, Locality"
                  className={inputBaseStyle}
                />
              </FieldWrap>
            </div>

            <FieldWrap label="City" required error={errors.city}>
              <input
                type="text"
                value={contact.city}
                onChange={(e) => setContact((p) => ({ ...p, city: e.target.value }))}
                placeholder="e.g. Chennai, Mumbai"
                className={`${inputBaseStyle} ${errors.city ? "border-red-500 bg-red-50/20" : ""}`}
              />
            </FieldWrap>

            <FieldWrap label="PIN Code" required error={errors.pincode}>
              <input
                type="text"
                value={contact.pincode}
                maxLength={6}
                onChange={(e) => setContact((p) => ({ ...p, pincode: e.target.value }))}
                placeholder="6-digit PIN"
                className={`${inputBaseStyle} ${errors.pincode ? "border-red-500 bg-red-50/20" : ""}`}
              />
            </FieldWrap>

            <FieldWrap label="State">
              <select
                value={contact.state}
                onChange={(e) => setContact((p) => ({ ...p, state: e.target.value }))}
                className={inputBaseStyle}
              >
                {STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </FieldWrap>

            {contact.latitude && (
              <FieldWrap label="GPS Coordinates">
                <input
                  readOnly
                  value={`${contact.latitude}, ${contact.longitude}`}
                  className="w-full h-11 px-3.5 text-xs font-mono font-bold rounded-xl border border-emerald-400 bg-emerald-50 text-emerald-900"
                />
              </FieldWrap>
            )}
          </div>
        </section>

        {/* ── Terms + Submit Footer Bar ────────────────────────────────────────── */}
        <section className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-lg flex flex-col gap-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={contact.acceptTerms}
              onChange={(e) => setContact((p) => ({ ...p, acceptTerms: e.target.checked }))}
              className="mt-1 w-4 h-4 accent-[var(--color-primary)] rounded cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-800 leading-relaxed">
              I confirm I am the lawful owner of these scrap items and authorize their listing on the EcoRoute E-Waste Marketplace under <strong className="text-[var(--color-primary)]">E-Waste (Management) Rules, 2022</strong>.
            </span>
          </label>
          {errors.acceptTerms && <p className="text-xs font-bold text-red-600">{errors.acceptTerms}</p>}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
              <MdInventory2 className="w-4 h-4 text-slate-500" />
              {items.length} item{items.length > 1 ? "s" : ""} ready to publish
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="px-5 py-3 text-sm font-extrabold rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition shadow-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3 text-sm font-extrabold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition cursor-pointer disabled:opacity-60 flex items-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <span>Publishing {items.length} item{items.length > 1 ? "s" : ""}...</span>
                ) : (
                  <>
                    <MdCloudUpload className="w-5 h-5" />
                    Publish {items.length} Item{items.length > 1 ? "s" : ""} to Marketplace
                    <MdArrowForward className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

// ── Reusable FieldWrap ────────────────────────────────────────────────────────
function FieldWrap({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-0.5"><MdWarning className="w-3.5 h-3.5" />{error}</p>}
    </div>
  );
}

// ── Item Card Component ───────────────────────────────────────────────────────
function ItemCard({
  item, index, totalItems, errors, onUpdate, onRemove, onToggle,
  onImageFile, onOpenCameraModal, onCategoryChange, onConditionChange,
}: {
  item: ScrapItem;
  index: number;
  totalItems: number;
  errors: Record<string, string>;
  onUpdate: (patch: Partial<ScrapItem>) => void;
  onRemove: () => void;
  onToggle: () => void;
  onImageFile: (file: File) => void;
  onOpenCameraModal: () => void;
  onCategoryChange: (cat: string) => void;
  onConditionChange: (cond: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) onImageFile(file);
  };

  const nameError = errors[`name_${index}`];
  const priceError = errors[`price_${index}`];

  return (
    <div className={`rounded-2xl border-2 ${nameError || priceError ? "border-red-300" : "border-slate-200/80"} overflow-hidden bg-white shadow-md`}>
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-4 bg-slate-50/80 border-b border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
            {index + 1}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-slate-900 leading-tight flex items-center gap-2">
              {item.deviceName || `Item ${index + 1}`}
              {item.aiVerified && (
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 flex items-center gap-1 shadow-2xs">
                  <MdAutoAwesome className="w-3 h-3 text-indigo-600" /> AI Verified
                </span>
              )}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-0.5">
              {item.category} · {item.condition} · ₹{item.askingPrice}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {item.imageDataUrl && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">📷 Photo</span>
          )}
          {totalItems > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition cursor-pointer"
              title="Remove item"
            >
              <MdDelete className="w-5 h-5" />
            </button>
          )}
          {item.collapsed ? <MdExpandMore className="w-5 h-5 text-slate-500" /> : <MdExpandLess className="w-5 h-5 text-slate-500" />}
        </div>
      </div>

      {/* Card body */}
      {!item.collapsed && (
        <div className="p-5 flex flex-col gap-5">

          {/* AI Banner Verification Status */}
          {item.isScanningAI && (
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center gap-3 animate-pulse shadow-2xs">
              <MdPsychology className="w-6 h-6 text-indigo-600 animate-spin" />
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-indigo-950 flex items-center gap-1">
                  ⚡ EcoRoute Vision AI Scanning & Verifying Photo...
                </span>
                <span className="text-[11px] font-medium text-indigo-800">
                  Checking authenticity score, identifying device model, category, scrap metals & value...
                </span>
              </div>
            </div>
          )}

          {item.aiVerified && !item.isScanningAI && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col gap-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <MdVerifiedUser className="w-4 h-4 text-emerald-600" />
                  ⚡ AI Authentic Scrap Verified — {item.aiAuthenticityScore?.toFixed(1)}% Confidence
                </span>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-200/70 px-2.5 py-0.5 rounded-full">
                  Real E-Waste Photo
                </span>
              </div>
              {item.aiBadges && item.aiBadges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.aiBadges.map((badge, bIdx) => (
                    <span key={bIdx} className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-900 shadow-2xs">
                      ✦ {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {item.aiError && !item.isScanningAI && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-amber-950 text-xs font-semibold">
              <MdWarning className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{item.aiError}</span>
            </div>
          )}

          {/* Photo Container */}
          {item.imageDataUrl ? (
            <div className="relative w-full max-w-xs h-44 rounded-xl overflow-hidden border-2 border-[var(--color-primary)] group shadow-md">
              <img src={item.imageDataUrl} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button type="button" onClick={() => onUpdate({ imageDataUrl: null, aiVerified: false, aiBadges: [] })}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow">
                  <MdDelete className="w-4 h-4" /> Remove
                </button>
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold flex items-center gap-1 cursor-pointer shadow">
                  <MdFlip className="w-4 h-4" /> Replace
                </button>
              </div>
              <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                <MdCheckCircle className="w-3.5 h-3.5" /> Photo Uploaded
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              {/* LIVE CAMERA BUTTON */}
              <button
                type="button"
                onClick={onOpenCameraModal}
                className="flex-1 flex flex-col items-center justify-center gap-1.5 h-36 rounded-xl border-2 border-dashed border-[var(--color-primary)] hover:bg-blue-50/70 cursor-pointer transition text-center p-3 bg-blue-50/30 shadow-2xs"
              >
                <MdPhotoCamera className="w-9 h-9 text-[var(--color-primary)]" />
                <span className="text-xs font-extrabold text-[var(--color-primary)]">Take Photo & AI Scan</span>
                <span className="text-[11px] text-slate-600 font-bold">Open Live Camera Stream</span>
              </button>

              {/* UPLOAD FROM GALLERY BUTTON */}
              <label
                className="flex-1 flex flex-col items-center justify-center gap-1.5 h-36 rounded-xl border-2 border-dashed border-slate-300 hover:border-[var(--color-primary)] hover:bg-blue-50/30 cursor-pointer transition text-center p-3 bg-slate-50/40 shadow-2xs"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && onImageFile(e.target.files[0])}
                />
                <MdCloudUpload className="w-9 h-9 text-slate-500" />
                <span className="text-xs font-extrabold text-slate-800">Upload from Gallery</span>
                <span className="text-[11px] text-slate-500 font-semibold">Select file / photo</span>
              </label>
            </div>
          )}

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Device Name */}
            <div className="sm:col-span-2">
              <FieldWrap label="Device / Scrap Name" required error={nameError}>
                <div className="relative">
                  <input
                    type="text"
                    value={item.deviceName}
                    onChange={(e) => onUpdate({ deviceName: e.target.value })}
                    placeholder="e.g. HP Laptop, Samsung TV..."
                    className={`${inputBaseStyle} ${
                      nameError ? "border-red-500 bg-red-50/20" : item.aiAutoFilled ? "border-indigo-400 bg-indigo-50/50" : ""
                    }`}
                  />
                  {item.aiAutoFilled && item.deviceName && (
                    <span className="absolute right-3 top-3 text-[10px] font-extrabold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <MdAutoAwesome className="w-3.5 h-3.5 text-indigo-600" /> AI Filled
                    </span>
                  )}
                </div>
              </FieldWrap>
            </div>

            {/* Brand */}
            <FieldWrap label="Brand / Manufacturer">
              <div className="relative">
                <input
                  type="text"
                  value={item.brand}
                  onChange={(e) => onUpdate({ brand: e.target.value })}
                  placeholder="e.g. Samsung, HP, LG"
                  className={`${inputBaseStyle} ${
                    item.aiAutoFilled && item.brand ? "border-indigo-400 bg-indigo-50/50" : ""
                  }`}
                />
                {item.aiAutoFilled && item.brand && (
                  <span className="absolute right-3 top-3 text-[10px] font-extrabold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <MdAutoAwesome className="w-3.5 h-3.5 text-indigo-600" /> AI Filled
                  </span>
                )}
              </div>
            </FieldWrap>

            {/* Category */}
            <FieldWrap label="Category" required>
              <select
                value={item.category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={`${inputBaseStyle} ${item.aiAutoFilled ? "border-indigo-400 bg-indigo-50/50" : ""}`}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </FieldWrap>

            {/* Condition */}
            <FieldWrap label="Condition" required>
              <select
                value={item.condition}
                onChange={(e) => onConditionChange(e.target.value)}
                className={`${inputBaseStyle} ${item.aiAutoFilled ? "border-indigo-400 bg-indigo-50/50" : ""}`}
              >
                {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
              <p className="text-[11px] font-medium text-slate-500">Condition adjusts price automatically</p>
            </FieldWrap>

            {/* Asking Price */}
            <FieldWrap label="Asking Price (₹)" required error={priceError}>
              <div className="flex items-center justify-between mb-0.5">
                {item.priceAutoFilled && (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <MdAutoAwesome className="w-3 h-3 text-emerald-600" /> AI Valuated Price
                  </span>
                )}
              </div>
              <div className="relative">
                <MdCurrencyRupee className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="number"
                  min="0"
                  value={item.askingPrice}
                  onChange={(e) => onUpdate({ askingPrice: e.target.value, priceAutoFilled: false })}
                  placeholder="e.g. 1500"
                  className={`${inputBaseStyle} pl-10 ${
                    priceError ? "border-red-500 bg-red-50/20" : item.priceAutoFilled ? "border-emerald-400 bg-emerald-50/60" : ""
                  }`}
                />
              </div>
              {item.priceAutoFilled && (
                <p className="text-[11px] font-bold text-emerald-700 mt-1">
                  ₹{computePrice(item.category, item.condition)} = Base ₹{CATEGORY_PRICES[item.category] ?? 400} × {Math.round((CONDITION_MULTIPLIER[item.condition] ?? 1) * 100)}%
                </p>
              )}
            </FieldWrap>

            {/* Weight */}
            <FieldWrap label="Estimated Weight (kg)">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={item.estimatedWeight}
                  onChange={(e) => onUpdate({ estimatedWeight: e.target.value })}
                  placeholder="e.g. 2.5"
                  className={`${inputBaseStyle} ${
                    item.aiAutoFilled && item.estimatedWeight ? "border-indigo-400 bg-indigo-50/50" : ""
                  }`}
                />
                {item.aiAutoFilled && item.estimatedWeight && (
                  <span className="absolute right-3 top-3 text-[10px] font-extrabold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md">
                    AI Weight
                  </span>
                )}
              </div>
            </FieldWrap>

            {/* Age */}
            <FieldWrap label="Approximate Age">
              <input
                type="text"
                value={item.estimatedAge}
                onChange={(e) => onUpdate({ estimatedAge: e.target.value })}
                placeholder="e.g. 4 years, 6 months"
                className={inputBaseStyle}
              />
            </FieldWrap>

            {/* Quantity */}
            <FieldWrap label="Quantity / Units">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => onUpdate({ quantity: e.target.value })}
                placeholder="1"
                className={inputBaseStyle}
              />
            </FieldWrap>

            {/* Description */}
            <div className="sm:col-span-2">
              <FieldWrap label="Description / AI Inspection Notes">
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Describe the issue, intact parts, battery status, etc."
                  className={`w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold text-sm rounded-xl border ${
                    item.aiAutoFilled && item.description ? "border-indigo-400 bg-indigo-50/50" : "border-slate-300"
                  } focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none resize-none transition-all shadow-xs placeholder:text-slate-400 placeholder:font-normal`}
                />
              </FieldWrap>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
