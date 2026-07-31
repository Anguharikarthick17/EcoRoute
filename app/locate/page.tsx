"use client";
// Note: metadata cannot be exported from client components — title is set via head tags

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import { LeafletMap } from "@/components/ui/LeafletMap";
import {
  MdLocationOn,
  MdPhone,
  MdAccessTime,
  MdStar,
  MdSearch,
  MdMyLocation,
  MdVerified,
  MdDirections,
  MdFilterList,
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
  distanceKm: number;
  lat: number;
  lng: number;
  acceptedTypes: string[];
}

const ALL_CENTERS: Center[] = [
  {
    id: "c-1",
    name: "EcoRecycle CPCB Facility #4",
    reg: "CPCB/EWR/2024/DL-098",
    address: "Plot 14, Okhla Industrial Area Phase III, New Delhi",
    city: "New Delhi",
    phone: "+91 11 2638 9012",
    hours: "09:00 AM - 06:00 PM",
    rating: 4.8,
    distanceKm: 3.2,
    lat: 28.5355,
    lng: 77.2639,
    acceptedTypes: ["Laptops", "Mobile Phones", "Batteries", "TVs"],
  },
  {
    id: "c-2",
    name: "GreenTech Clean Recycling Pvt Ltd",
    reg: "CPCB/EWR/2023/DL-045",
    address: "B-82, Mayapuri Industrial Area Phase II, New Delhi",
    city: "New Delhi",
    phone: "+91 11 2811 4567",
    hours: "09:30 AM - 06:30 PM",
    rating: 4.6,
    distanceKm: 5.8,
    lat: 28.628,
    lng: 77.118,
    acceptedTypes: ["Refrigerators", "Washing Machines", "Computers"],
  },
  {
    id: "c-3",
    name: "Tamil Nadu E-Waste Recyclers",
    reg: "CPCB/EWR/2024/TN-112",
    address: "Guindy Industrial Estate, Chennai",
    city: "Chennai",
    phone: "+91 44 2250 8900",
    hours: "09:00 AM - 07:00 PM",
    rating: 4.9,
    distanceKm: 4.1,
    lat: 13.0067,
    lng: 80.202,
    acceptedTypes: ["Mobiles", "Laptops", "Printers", "Circuit Boards"],
  },
  {
    id: "c-4",
    name: "Salem Green Scrap Collection Point",
    reg: "CPCB/EWR/2025/TN-204",
    address: "Five Roads Junction, Salem",
    city: "Salem",
    phone: "+91 427 244 5678",
    hours: "08:30 AM - 06:00 PM",
    rating: 4.7,
    distanceKm: 2.5,
    lat: 11.6643,
    lng: 78.146,
    acceptedTypes: ["Home Appliances", "Mobiles", "Batteries"],
  },
  {
    id: "c-5",
    name: "Karnataka E-Recycle Hub",
    reg: "CPCB/EWR/2024/KA-088",
    address: "Peenya Industrial Area 2nd Stage, Bengaluru",
    city: "Bengaluru",
    phone: "+91 80 2839 1234",
    hours: "09:00 AM - 06:00 PM",
    rating: 4.8,
    distanceKm: 6.2,
    lat: 13.0313,
    lng: 77.5256,
    acceptedTypes: ["Laptops", "Servers", "Monitors", "Mobiles"],
  },
];

export default function LocatePage() {
  const [userLat, setUserLat] = useState(28.6139);
  const [userLng, setUserLng] = useState(77.209);
  const [searchCity, setSearchCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCenter, setActiveCenter] = useState<Center | null>(ALL_CENTERS[0]);

  // Haversine formula to calculate live distance from user position
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  };

  // Detect location on load
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
        },
        () => {},
        { timeout: 5000 }
      );
    }
  }, []);

  const filteredCenters = ALL_CENTERS.filter((c) => {
    const matchCity = !searchCity || c.city.toLowerCase().includes(searchCity.toLowerCase()) || c.address.toLowerCase().includes(searchCity.toLowerCase());
    const matchType = selectedCategory === "All" || c.acceptedTypes.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchCity && matchType;
  }).map((c) => ({
    ...c,
    distanceKm: calculateDistance(userLat, userLng, c.lat, c.lng),
  })).sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="bg-[var(--color-background)] py-10 lg:py-14">
      <Container className="flex flex-col gap-8 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <GovBadge variant="official" label="GIS Collection Network" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Locate CPCB Authorized Collection Centres
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            Find licensed e-waste collection drop-off points near your live GPS location or city.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <MdSearch className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search by City, District or PIN code (e.g. New Delhi, Salem, Chennai)..."
              className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-[var(--color-primary)] outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 px-3 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 outline-none"
            >
              <option value="All">All Accepted E-Waste Types</option>
              <option value="Laptops">Laptops & Computers</option>
              <option value="Mobile">Mobile Phones</option>
              <option value="Batteries">Batteries & Chargers</option>
              <option value="Appliances">Home Appliances</option>
            </select>

            <button
              type="button"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    setUserLat(pos.coords.latitude);
                    setUserLng(pos.coords.longitude);
                  });
                }
              }}
              className="h-10 px-4 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-[var(--color-primary-dark)]"
            >
              <MdMyLocation className="w-4 h-4" />
              Live Location
            </button>
          </div>
        </div>

        {/* Map & List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Map Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <LeafletMap
              latitude={userLat}
              longitude={userLng}
              className="h-[460px] w-full"
            />
          </div>

          {/* Right Facilities Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-1">
                <MdVerified className="w-4 h-4 text-emerald-600" />
                Nearest Facilities ({filteredCenters.length})
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Sorted by proximity</span>
            </div>

            {filteredCenters.length === 0 ? (
              <div className="bg-white p-6 rounded-lg text-center border border-slate-200 text-xs text-slate-500">
                No collection centres found for this search filter.
              </div>
            ) : (
              filteredCenters.map((c) => (
                <Card
                  key={c.id}
                  onClick={() => setActiveCenter(c)}
                  className={`p-4 flex flex-col gap-2.5 cursor-pointer transition-all ${
                    activeCenter?.id === c.id
                      ? "border-2 border-[var(--color-primary)] bg-blue-50/20 shadow-md"
                      : "hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-1">
                      {c.name}
                    </h4>
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs shrink-0">
                      {c.distanceKm} km away
                    </span>
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)] flex items-start gap-1">
                    <MdLocationOn className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                    {c.address}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap text-[10px]">
                    {c.acceptedTypes.map((type) => (
                      <span key={type} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-100 mt-1">
                    <span className="font-mono text-[10px] text-slate-500">{c.reg}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-amber-600 flex items-center gap-1">
                        <MdStar className="w-3.5 h-3.5" /> {c.rating}
                      </span>
                      <a
                        href={`https://maps.google.com/?q=${c.lat},${c.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] font-bold flex items-center gap-0.5 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MdDirections className="w-3.5 h-3.5" /> Directions
                      </a>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

        </div>
      </Container>
    </div>
  );
}
