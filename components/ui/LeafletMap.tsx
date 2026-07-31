"use client";

import { useEffect, useState } from "react";
import {
  MdLocationOn,
  MdMyLocation,
  MdVerified,
  MdDirections,
  MdPhone,
  MdSearch,
} from "react-icons/md";

interface Center {
  id: string;
  name: string;
  reg: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  rating: number;
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  latitude?: number;
  longitude?: number;
  userAddress?: string;
  centers?: Center[];
  onSelectCenter?: (center: Center) => void;
  className?: string;
}

export function LeafletMap({
  latitude: initialLat = 28.6139,
  longitude: initialLng = 77.209,
  userAddress: initialAddress = "New Delhi, India",
  centers = [],
  onSelectCenter,
  className = "h-[450px] w-full",
}: LeafletMapProps) {
  const [lat, setLat] = useState(initialLat);
  const [lng, setLng] = useState(initialLng);
  const [address, setAddress] = useState(initialAddress);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

  // Auto-detect browser location on initial load if allowed
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          setLat(userLat);
          setLng(userLng);
          setLocationStatus(`✓ Live GPS Detected (${userLat.toFixed(4)}, ${userLng.toFixed(4)})`);

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${userLat}&lon=${userLng}&format=json`
            );
            const data = await res.json();
            if (data && data.display_name) {
              const shortAddr = data.display_name.split(",").slice(0, 3).join(",");
              setAddress(shortAddr);
            }
          } catch (e) {}
        },
        () => {
          setLocationStatus("Default location loaded (New Delhi)");
        },
        { timeout: 8000 }
      );
    }
  }, []);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationStatus("Acquiring GPS coordinates...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        setLat(userLat);
        setLng(userLng);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${userLat}&lon=${userLng}&format=json`
          );
          const data = await res.json();
          if (data && data.display_name) {
            const shortAddr = data.display_name.split(",").slice(0, 3).join(",");
            setAddress(shortAddr);
          }
        } catch (e) {}

        setIsLocating(false);
        setLocationStatus(`✓ Current location updated successfully!`);
      },
      (err) => {
        setIsLocating(false);
        setLocationStatus("Could not detect GPS location. Please check browser permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Embed live interactive OpenStreetMap view centered on detected GPS coordinates
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.04}%2C${lat - 0.04}%2C${lng + 0.04}%2C${lat + 0.04}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-300 bg-slate-900 flex flex-col justify-between shadow-md ${className}`}>
      
      {/* ── Top Bar Controls ──────────────────────────────────── */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-700 text-white shadow-lg">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="px-3 py-1.5 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60"
          >
            <MdMyLocation className={`w-4 h-4 ${isLocating ? "animate-spin" : ""}`} />
            {isLocating ? "Detecting GPS..." : "Use My Current Location"}
          </button>

          {locationStatus && (
            <span className="text-[11px] text-emerald-400 font-medium hidden sm:inline-block">
              {locationStatus}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-300 font-mono">
          <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Lat: {lat.toFixed(4)}
          </span>
          <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Lng: {lng.toFixed(4)}
          </span>
        </div>
      </div>

      {/* ── Interactive OpenStreetMap Iframe ──────────────────── */}
      <div className="relative w-full h-full min-h-[380px]">
        <iframe
          title="Live GIS OpenStreetMap"
          src={osmEmbedUrl}
          className="w-full h-full border-0 filter brightness-95 contrast-105"
        />

        {/* Floating User Location Badge at Bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur p-3 rounded-lg border border-slate-200 shadow-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
              <MdLocationOn className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                Your Current Location
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              </span>
              <span className="text-slate-600 truncate max-w-xs">{address}</span>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/e-waste+recycling+centre/@${lat},${lng},14z`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold no-underline flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
          >
            <MdDirections className="w-4 h-4" />
            Navigate on Google Maps
          </a>
        </div>
      </div>

    </div>
  );
}
