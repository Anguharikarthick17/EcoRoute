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
  MdScale,
  MdInfo,
} from "react-icons/md";

// ── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Metal & Iron Scrap",
  "Aluminium Scrap",
  "Copper Wire & Windings",
  "Brass & Heavy Alloys",
  "Paper & Cardboard Scrap",
  "Plastic & Polymer Scrap",
  "Appliances (Washing Machine, Fridge, AC)",
  "Laptops & Computers",
  "Mobile Phones & Tablets",
  "Batteries & Power Banks",
  "Cables & Accessories",
  "Smartwatches & Wearables",
  "Bluetooth Earbuds & Audio",
  "Electrical Switches & Sockets",
  "TVs & Monitors",
  "Printers & Scanners",
  "Other Recyclable Scrap",
];

// ── Base scrap prices per category (₹) ──────────────────────────────────────
const CATEGORY_PRICES: Record<string, number> = {
  "Metal & Iron Scrap":            500,
  "Aluminium Scrap":               750,
  "Copper Wire & Windings":        1200,
  "Brass & Heavy Alloys":          900,
  "Paper & Cardboard Scrap":       250,
  "Plastic & Polymer Scrap":       300,
  "Appliances (Washing Machine, Fridge, AC)": 2000,
  "Laptops & Computers":           1800,
  "Mobile Phones & Tablets":        950,
  "Batteries & Power Banks":        500,
  "Cables & Accessories":           350,
  "Smartwatches & Wearables":       550,
  "Bluetooth Earbuds & Audio":      400,
  "Electrical Switches & Sockets":  250,
  "TVs & Monitors":                 1200,
  "Printers & Scanners":            600,
  "Other Recyclable Scrap":         400,
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
  "Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana",
  "Maharashtra", "Delhi", "Gujarat", "Haryana", "Rajasthan", "West Bengal",
  "Uttar Pradesh", "Madhya Pradesh", "Bihar", "Punjab", "Odisha",
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
  material: string;
  condition: string;
  askingPrice: string;
  priceRange: string;
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
  disclaimer?: string;
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
  category: "Metal & Iron Scrap",
  material: "Recyclable Metal / Mixed Scrap",
  condition: "Scrap for Parts & Metals",
  askingPrice: computePrice("Metal & Iron Scrap", "Scrap for Parts & Metals"),
  priceRange: "₹400 – ₹700",
  priceAutoFilled: true,
  estimatedWeight: "5.0",
  estimatedAge: "",
  quantity: "1",
  description: "",
  collapsed: false,
});

const inputBaseStyle = "w-full h-11 px-3.5 bg-white text-slate-900 font-semibold text-sm rounded-xl border border-slate-300 placeholder:text-slate-400 placeholder:font-normal focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all shadow-2xs";

export default function SellScrapPage() {
  const router = useRouter();

  const [items, setItems] = useState<ScrapItem[]>([makeItem()]);
  const [contact, setContact] = useState<ContactForm>({
    sellerName: "", phone: "", email: "", whatsapp: "",
    address: "", city: "Coimbatore", state: "Tamil Nadu",
    pincode: "641021", latitude: "10.932920", longitude: "76.977080", acceptTerms: false,
  });

  const [isLocating, setIsLocating] = useState(false);
  const [locationMsg, setLocationMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Live Camera Modal State
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [activeCameraItemId, setActiveCameraItemId] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Pre-fill contact from stored user
  useEffect(() => {
    const stored = localStorage.getItem("ecoroute_user");
    if (!stored) return;
    try {
      const u = JSON.parse(stored);
      const userPhone = u.mobile ? u.mobile.replace(/\D/g, "").slice(0, 10) : "9876543210";
      setContact((p) => ({
        ...p,
        sellerName: u.fullName || p.sellerName || "Household Seller",
        email: u.email || p.email,
        phone: userPhone,
        whatsapp: userPhone,
        city: u.city || p.city || "Coimbatore",
        state: u.state || "Tamil Nadu",
      }));
    } catch {}
  }, []);

  // Camera Controller
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
      
      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `live_scrap_scan_${Date.now()}.jpg`, { type: "image/jpeg" });
          handleImageFile(activeCameraItemId, file);
        });
    }
    closeCameraModal();
  };

  // Item helpers
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

  // AI Scrap Vision Integration
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
              category: scan.category || "Metal & Iron Scrap",
              material: scan.material || "Recyclable Metal",
              condition: scan.condition || "Scrap for Parts & Metals",
              askingPrice: scan.askingPrice,
              priceRange: scan.priceRange || `₹${scan.askingPrice}`,
              priceAutoFilled: true,
              estimatedWeight: scan.estimatedWeight,
              estimatedAge: scan.estimatedAge,
              description: scan.description,
              disclaimer: scan.disclaimer || "AI estimates are approximate. Final price and weight are confirmed by the dealer during pickup.",
              aiAutoFilled: true,
            });
          } else {
            updateItem(id, {
              isScanningAI: false,
              aiVerified: false,
              aiError: scan.reasonIfFake || "Photo does not appear to be a recyclable scrap item. Please upload a clear photo.",
            });
          }
        } else {
          updateItem(id, {
            isScanningAI: false,
            aiVerified: false,
            aiError: "AI scan completed with manual input fallback.",
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

  // GPS Location
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
          const detectedState = addr.state || "Tamil Nadu";
          setContact((p) => ({
            ...p,
            city: addr.city || addr.town || addr.village || addr.suburb || "Coimbatore",
            pincode: addr.postcode || p.pincode || "641021",
            state: detectedState,
            address: geo.display_name?.split(",").slice(0, 3).join(", ") || p.address,
          }));
          setLocationMsg(`✓ Location detected: ${addr.city || addr.town || addr.suburb || "Coimbatore"}, ${detectedState}`);
        } catch {
          setContact((p) => ({ ...p, state: "Tamil Nadu" }));
          setLocationMsg(`✓ GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Tamil Nadu)`);
        }
        setIsLocating(false);
      },
      () => {
        setContact((p) => ({ ...p, state: "Tamil Nadu", city: p.city || "Coimbatore", pincode: p.pincode || "641021" }));
        setLocationMsg("Could not get location. Selected Tamil Nadu.");
        setIsLocating(false);
      },
      { timeout: 10000 }
    );
  };

  // Validation
  const validate = () => {
    items.forEach((it) => {
      if (!it.deviceName || !it.deviceName.trim()) {
        it.deviceName = `Recyclable Scrap ${it.category || "Item"}`;
      }
      const rawPrice = String(it.askingPrice || "").replace(/[^0-9]/g, "");
      if (!rawPrice || isNaN(Number(rawPrice))) {
        it.askingPrice = "750";
      } else {
        it.askingPrice = rawPrice;
      }
    });

    const cleanPhone = (contact.phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      contact.phone = "9876543210";
    }

    if (!contact.sellerName || !contact.sellerName.trim()) {
      contact.sellerName = "Household Seller";
    }

    if (!contact.city || !contact.city.trim()) {
      contact.city = "Coimbatore";
    }

    const cleanPin = (contact.pincode || "").replace(/\D/g, "");
    if (!cleanPin || cleanPin.length < 6) {
      contact.pincode = "641021";
    }

    contact.acceptTerms = true;
    setErrors({});
    return true;
  };

  // Image compressor
  const compressImageIfNeeded = async (dataUrl: string | null): Promise<string | undefined> => {
    if (!dataUrl) return undefined;
    if (!dataUrl.startsWith("data:image")) return dataUrl;

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const maxDim = 600;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validate();
    setIsSubmitting(true);

    try {
      for (const it of items) {
        let compressedImg: string | undefined = undefined;
        if (it.imageDataUrl) {
          compressedImg = await compressImageIfNeeded(it.imageDataUrl);
        }

        const rawPrice = String(it.askingPrice || "").replace(/[^0-9]/g, "") || "750";
        const payload = {
          id: `scrap_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          deviceName: it.deviceName || `Scrap ${it.category || "Item"}`,
          brand: it.brand || "Recyclable",
          category: it.category || "Metal & Iron Scrap",
          condition: it.condition || "Scrap for Parts & Metals",
          estimatedAge: it.estimatedAge || "2 years",
          description: it.description || "Recyclable scrap item for nearby dealer collection.",
          askingPrice: rawPrice,
          price: `₹${rawPrice}`,
          estimatedWeight: it.estimatedWeight || "5.0",
          weightKg: parseFloat(it.estimatedWeight || "5.0") || 5.0,
          city: contact.city || "Coimbatore",
          sellerCity: contact.city || "Coimbatore",
          sellerName: contact.sellerName || "Household Seller",
          sellerPhone: contact.phone || "9876543210",
          sellerEmail: contact.email || "",
          sellerWhatsapp: contact.whatsapp || contact.phone || "9876543210",
          sellerAddress: contact.address || "Eachanari Road, Coimbatore",
          sellerState: contact.state || "Tamil Nadu",
          sellerPincode: contact.pincode || "641021",
          latitude: contact.latitude || "10.932920",
          longitude: contact.longitude || "76.977080",
          imageUrl: compressedImg || it.imageDataUrl || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
          sellerRole: "Household / Seller",
          status: "AVAILABLE",
          createdAt: new Date().toISOString(),
        };

        // Try API push
        try {
          const res = await fetch("/api/ewaste/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const data = await res.json().catch(() => ({}));
          if (data.success && data.data) {
            payload.id = data.data.id;
          }
        } catch (apiErr) {
          console.warn("API upload fallback:", apiErr);
        }

        // Guaranteed local storage save & broadcast
        try {
          const existingCustom = JSON.parse(localStorage.getItem("ecoroute_custom_listings") || "[]");
          const updatedCustom = [payload, ...existingCustom.filter((x: any) => x.id !== payload.id)];
          localStorage.setItem("ecoroute_custom_listings", JSON.stringify(updatedCustom));
          window.dispatchEvent(new Event("storage"));
        } catch {}
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Submit handler error:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-5 text-center bg-white rounded-2xl p-8 border border-slate-200 shadow-xl max-w-2xl mx-auto my-8">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <MdCheckCircle className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          {items.length} Scrap Item{items.length > 1 ? "s" : ""} AI-Verified & Published!
        </h2>
        <p className="text-sm text-slate-600 max-w-md font-medium leading-relaxed">
          Your scrap listing is now live on the EcoRoute Marketplace. Nearby verified scrap dealers have been notified and can request doorstep pickup!
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => { setSubmitted(false); setItems([makeItem()]); }}
            className="px-5 py-2.5 text-xs font-extrabold rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 cursor-pointer shadow-xs"
          >
            Sell More Scrap
          </button>
          <button
            onClick={() => router.push("/#marketplace")}
            className="px-6 py-2.5 text-xs font-extrabold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 cursor-pointer flex items-center gap-2 shadow-md"
          >
            <MdStorefront className="w-4 h-4" />
            View Live Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 relative max-w-5xl mx-auto">

      {/* ── LIVE CAMERA MODAL ─────────────────────────────────────── */}
      {cameraModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-5 flex flex-col items-center gap-4 shadow-2xl text-white relative animate-in fade-in zoom-in-95 duration-200">
            <div className="w-full flex items-center justify-between pb-1 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-extrabold tracking-wide uppercase text-slate-200">
                  AI SCRAP VISION CAMERA
                </span>
              </div>
              <button
                onClick={closeCameraModal}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-[4/3] max-h-[300px] bg-slate-950 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xl flex items-center justify-center">
              {cameraError ? (
                <div className="p-4 text-center text-white flex flex-col items-center gap-2">
                  <MdWarning className="w-8 h-8 text-amber-400" />
                  <p className="text-[11px] text-amber-200">{cameraError}</p>
                  <button
                    onClick={closeCameraModal}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                  >
                    Close & Upload Photo
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
                  <div className="absolute inset-4 border-2 border-dashed border-emerald-400/80 rounded-xl pointer-events-none flex flex-col items-center justify-between p-2">
                    <div className="flex justify-between w-full text-emerald-300 text-[9px] uppercase font-mono font-bold">
                      <span>✦ Align Scrap Item</span>
                      <span>AI Active</span>
                    </div>
                    <MdCenterFocusWeak className="w-10 h-10 text-emerald-400 animate-pulse" />
                    <div className="text-white text-[10px] font-bold bg-black/70 px-3 py-0.5 rounded-full">
                      Point at scrap metal, appliance or e-waste & tap Shutter
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="w-full flex items-center justify-center gap-6 pt-1">
              <button
                onClick={switchCamera}
                type="button"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer flex items-center justify-center shadow"
                title="Switch Camera"
              >
                <MdCameraswitch className="w-5 h-5" />
              </button>

              <button
                onClick={capturePhotoFromCamera}
                type="button"
                disabled={!!cameraError}
                className="w-16 h-16 rounded-full border-4 border-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition shadow-2xl flex items-center justify-center cursor-pointer disabled:opacity-50"
                title="Capture Photo"
              >
                <div className="w-12 h-12 rounded-full border-2 border-white/60 bg-emerald-600 flex items-center justify-center">
                  <MdPhotoCamera className="w-6 h-6 text-white" />
                </div>
              </button>

              <button
                onClick={closeCameraModal}
                type="button"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer flex items-center justify-center shadow"
                title="Cancel"
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
          <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5 shadow-2xs">
            <MdAutoAwesome className="w-3.5 h-3.5 text-emerald-700" /> AI Scrap Vision Enabled
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Sell Your Scrap — Instant AI Valuation & Pickup
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 max-w-2xl">
          Take a photo or upload an image. EcoRoute AI Scrap Vision identifies materials, estimates market value, and connects you with nearby verified dealers for doorstep collection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        {/* ── STEP 1: Scrap Items Card ────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white text-xs font-black flex items-center justify-center shadow-xs">1</span>
              Scrap Items & Photos
              <span className="ml-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">{items.length}</span>
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-extrabold hover:bg-emerald-100 transition cursor-pointer border border-emerald-200"
            >
              <MdAdd className="w-4 h-4" />
              Add Another Scrap Item
            </button>
          </div>

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

          <button
            type="button"
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-emerald-500/40 text-emerald-700 text-xs font-extrabold hover:border-emerald-600 hover:bg-emerald-50/50 transition cursor-pointer"
          >
            <MdAdd className="w-4 h-4" />
            Add Another Scrap Item
          </button>
        </section>

        {/* ── STEP 2: Contact & Pickup Details Card ─────────────────────────────── */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col gap-5">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white text-xs font-black flex items-center justify-center shadow-xs">2</span>
            Household Pickup Address & Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldWrap label="Household / Contact Name" required error={errors.sellerName}>
              <div className="relative">
                <MdPerson className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={contact.sellerName}
                  onChange={(e) => setContact((p) => ({ ...p, sellerName: e.target.value }))}
                  placeholder="e.g. Rajesh Kumar"
                  className={`${inputBaseStyle} pl-10`}
                />
              </div>
            </FieldWrap>

            <FieldWrap label="Mobile Number (for Dealer Coordination)" required error={errors.phone}>
              <div className="relative">
                <MdPhone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="tel"
                  value={contact.phone}
                  maxLength={10}
                  onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value, whatsapp: e.target.value }))}
                  placeholder="10-digit mobile"
                  className={`${inputBaseStyle} pl-10`}
                />
              </div>
            </FieldWrap>

            <div className="sm:col-span-2">
              <FieldWrap label="Doorstep Pickup Address" required>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contact.address}
                    onChange={(e) => setContact((p) => ({ ...p, address: e.target.value }))}
                    placeholder="House/flat no, street, landmark..."
                    className={inputBaseStyle}
                  />
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={isLocating}
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-extrabold hover:bg-emerald-100 transition flex items-center gap-1.5 shrink-0 border border-emerald-200 cursor-pointer disabled:opacity-50"
                  >
                    <MdMyLocation className="w-4 h-4 text-emerald-700" />
                    {isLocating ? "Locating..." : "Auto-Detect GPS"}
                  </button>
                </div>
                {locationMsg && <p className="text-xs text-emerald-700 font-bold mt-1">{locationMsg}</p>}
              </FieldWrap>
            </div>

            <FieldWrap label="City / Locality" required>
              <input
                type="text"
                value={contact.city}
                onChange={(e) => setContact((p) => ({ ...p, city: e.target.value }))}
                placeholder="e.g. Coimbatore, Chennai"
                className={inputBaseStyle}
              />
            </FieldWrap>

            <FieldWrap label="PIN Code" required>
              <input
                type="text"
                value={contact.pincode}
                maxLength={6}
                onChange={(e) => setContact((p) => ({ ...p, pincode: e.target.value }))}
                placeholder="6-digit PIN"
                className={inputBaseStyle}
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
          </div>
        </section>

        {/* ── STEP 3: Publish Listing ────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col gap-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={contact.acceptTerms}
              onChange={(e) => setContact((p) => ({ ...p, acceptTerms: e.target.checked }))}
              className="mt-1 w-4 h-4 accent-emerald-700 rounded cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700 leading-relaxed">
              I authorize EcoRoute to broadcast this scrap listing to nearby verified scrap dealers for doorstep pickup and valuation.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
              <MdInventory2 className="w-4 h-4 text-emerald-700" />
              {items.length} scrap item{items.length > 1 ? "s" : ""} ready to publish
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="px-5 py-3 text-xs font-extrabold rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3 text-xs font-extrabold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition cursor-pointer disabled:opacity-60 flex items-center gap-2 shadow-md"
              >
                {isSubmitting ? (
                  <span>Publishing {items.length} scrap item{items.length > 1 ? "s" : ""}...</span>
                ) : (
                  <>
                    <MdCloudUpload className="w-5 h-5" />
                    Publish Scrap Listing for Nearby Dealers
                    <MdArrowForward className="w-4 h-4" />
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

function FieldWrap({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-extrabold text-slate-900 tracking-tight">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-0.5"><MdWarning className="w-3.5 h-3.5" />{error}</p>}
    </div>
  );
}

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

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
      {/* Card Header */}
      <div
        className="flex items-center justify-between px-5 py-4 bg-slate-50/80 border-b border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
            {index + 1}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-slate-900 leading-tight flex items-center gap-2">
              {item.deviceName || `Scrap Item ${index + 1}`}
              {item.aiVerified && (
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 shadow-2xs">
                  <MdAutoAwesome className="w-3 h-3 text-emerald-600" /> AI Identified
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
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">📷 Photo Added</span>
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

      {/* Card Body */}
      {!item.collapsed && (
        <div className="p-5 flex flex-col gap-5">

          {/* AI Scanning State */}
          {item.isScanningAI && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 animate-pulse shadow-2xs">
              <MdPsychology className="w-6 h-6 text-emerald-700 animate-spin" />
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1">
                  ⚡ EcoRoute AI Scrap Vision Scanning Photo...
                </span>
                <span className="text-[11px] font-medium text-emerald-800">
                  Detecting material category, estimating weight, and calculating market scrap value...
                </span>
              </div>
            </div>
          )}

          {/* AI Verified Result Card with Price Range & Disclaimer */}
          {item.aiVerified && !item.isScanningAI && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-200 flex flex-col gap-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <MdVerifiedUser className="w-4 h-4 text-emerald-600" />
                  ✦ AI Scrap Vision Verified — {item.aiAuthenticityScore?.toFixed(1)}% Confidence
                </span>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-white border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  Approx. Value: {item.priceRange || `₹${item.askingPrice}`}
                </span>
              </div>

              {/* Detected Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2 bg-white rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-500 font-medium">Material Detected</span>
                  <p className="font-extrabold text-slate-900 truncate">{item.material || "Recyclable Metal"}</p>
                </div>
                <div className="p-2 bg-white rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-500 font-medium">Est. Weight</span>
                  <p className="font-extrabold text-slate-900 flex items-center gap-1 font-mono">
                    <MdScale className="w-3.5 h-3.5 text-emerald-600" /> {item.estimatedWeight} kg
                  </p>
                </div>
                <div className="p-2 bg-white rounded-xl border border-emerald-100 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 font-medium">Market Estimate</span>
                  <p className="font-black text-emerald-700">{item.priceRange || `₹${item.askingPrice}`}</p>
                </div>
              </div>

              {/* Badges */}
              {item.aiBadges && item.aiBadges.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.aiBadges.map((badge, bIdx) => (
                    <span key={bIdx} className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-900">
                      ✦ {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Mandatory Disclaimer */}
              <div className="flex items-start gap-1.5 text-[11px] text-slate-600 bg-white/70 p-2.5 rounded-xl border border-emerald-200/60">
                <MdInfo className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="italic font-medium">
                  {item.disclaimer || "AI estimates are approximate. Final price and weight are confirmed by the dealer during pickup."}
                </span>
              </div>
            </div>
          )}

          {item.aiError && !item.isScanningAI && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-amber-950 text-xs font-semibold">
              <MdWarning className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{item.aiError}</span>
            </div>
          )}

          {/* Photo Capture / Upload Buttons */}
          {item.imageDataUrl ? (
            <div className="relative w-full max-w-xs h-44 rounded-xl overflow-hidden border-2 border-emerald-600 group shadow-md">
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
                <MdCheckCircle className="w-3.5 h-3.5" /> Scrap Photo Attached
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onOpenCameraModal}
                className="flex-1 flex flex-col items-center justify-center gap-1.5 h-32 rounded-xl border-2 border-dashed border-emerald-500/60 hover:bg-emerald-50/70 cursor-pointer transition text-center p-3 bg-emerald-50/30 shadow-2xs"
              >
                <MdPhotoCamera className="w-8 h-8 text-emerald-700" />
                <span className="text-xs font-extrabold text-emerald-800">Live Camera AI Scrap Scan</span>
                <span className="text-[10px] text-slate-500 font-medium">Capture photo of scrap metal or appliance</span>
              </button>

              <label
                className="flex-1 flex flex-col items-center justify-center gap-1.5 h-32 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-600 hover:bg-emerald-50/30 cursor-pointer transition text-center p-3 bg-slate-50/40 shadow-2xs"
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
                <MdCloudUpload className="w-8 h-8 text-slate-500" />
                <span className="text-xs font-extrabold text-slate-800">Upload Scrap Photo</span>
                <span className="text-[10px] text-slate-500 font-medium">Select image file from device</span>
              </label>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FieldWrap label="Scrap Description / Item Name" required>
                <div className="relative">
                  <input
                    type="text"
                    value={item.deviceName}
                    onChange={(e) => onUpdate({ deviceName: e.target.value })}
                    placeholder="e.g. Pure Copper Wire Winding, Old Washing Machine..."
                    className={`${inputBaseStyle} ${item.aiAutoFilled ? "border-emerald-400 bg-emerald-50/40" : ""}`}
                  />
                  {item.aiAutoFilled && item.deviceName && (
                    <span className="absolute right-3 top-3 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <MdAutoAwesome className="w-3.5 h-3.5 text-emerald-600" /> AI Filled
                    </span>
                  )}
                </div>
              </FieldWrap>
            </div>

            <FieldWrap label="Category" required>
              <select
                value={item.category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={`${inputBaseStyle} ${item.aiAutoFilled ? "border-emerald-400 bg-emerald-50/40" : ""}`}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </FieldWrap>

            <FieldWrap label="Condition / Scrap Grade" required>
              <select
                value={item.condition}
                onChange={(e) => onConditionChange(e.target.value)}
                className={`${inputBaseStyle} ${item.aiAutoFilled ? "border-emerald-400 bg-emerald-50/40" : ""}`}
              >
                {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </FieldWrap>

            <FieldWrap label="Estimated Weight (kg)">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={item.estimatedWeight}
                  onChange={(e) => onUpdate({ estimatedWeight: e.target.value })}
                  placeholder="e.g. 5.0"
                  className={`${inputBaseStyle} ${item.aiAutoFilled && item.estimatedWeight ? "border-emerald-400 bg-emerald-50/40" : ""}`}
                />
                {item.aiAutoFilled && item.estimatedWeight && (
                  <span className="absolute right-3 top-3 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    AI Weight
                  </span>
                )}
              </div>
            </FieldWrap>

            <FieldWrap label="Expected Scrap Price (₹)" required>
              <div className="relative">
                <MdCurrencyRupee className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="number"
                  min="0"
                  value={item.askingPrice}
                  onChange={(e) => onUpdate({ askingPrice: e.target.value, priceAutoFilled: false })}
                  placeholder="e.g. 750"
                  className={`${inputBaseStyle} pl-10 ${item.priceAutoFilled ? "border-emerald-400 bg-emerald-50/50" : ""}`}
                />
              </div>
            </FieldWrap>

            <div className="sm:col-span-2">
              <FieldWrap label="AI Inspection / Condition Notes">
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Describe metal purity, intact motor, cables, rust level..."
                  className={`w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold text-xs rounded-xl border ${
                    item.aiAutoFilled && item.description ? "border-emerald-400 bg-emerald-50/40" : "border-slate-300"
                  } focus:border-emerald-600 outline-none resize-none transition-all shadow-2xs`}
                />
              </FieldWrap>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
