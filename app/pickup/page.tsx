"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import { FormInput, FormSelect, FormCheckbox, GovAlertBox } from "@/components/forms";
import { MdLocalShipping, MdShield, MdVerified, MdCheckCircle } from "react-icons/md";

export default function PublicPickupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRequestId(id);
    setSubmitted(true);
  };

  return (
    <div className="bg-[var(--color-background)] py-10 lg:py-14">
      <Container className="flex flex-col gap-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <GovBadge variant="official" label="Digital India Doorstep Service" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Schedule Doorstep E-Waste Pickup
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-2xl">
            Book a free doorstep collection with CPCB-certified field agents. Available across all major metro cities and district hubs.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
            <MdLocalShipping className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-[var(--color-primary)]">Free Doorstep Pickup</h4>
              <p className="text-[11px] text-slate-600">Zero charges for citizen home collection.</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <MdVerified className="w-8 h-8 text-[var(--color-accent)] shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-[var(--color-accent)]">CPCB Verified Recyclers</h4>
              <p className="text-[11px] text-slate-600">Safe material extraction guarantee.</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
            <MdShield className="w-8 h-8 text-amber-700 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-amber-900">Green Points & Certificate</h4>
              <p className="text-[11px] text-amber-800">Earn rewards & official certificate.</p>
            </div>
          </div>
        </div>

        {/* Pickup Form Card */}
        <Card className="p-6 sm:p-8 bg-white shadow-md">
          {submitted ? (
            <GovAlertBox variant="success" title={`Pickup Scheduled Successfully! Reference: ${requestId}`}>
              Your doorstep pickup has been registered under CPCB reference <strong>{requestId}</strong>. A certified field officer has been dispatched for your selected time slot.
            </GovAlertBox>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs">
              <h2 className="text-lg font-bold text-[var(--color-primary)] border-b pb-3">
                Doorstep Pickup Application
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput id="pk-device" label="Device Name & Model" placeholder="e.g. HP Pavilion Laptop, 2 Smartphones" required />
                <FormSelect
                  id="pk-cat"
                  label="E-Waste Category"
                  options={[
                    { label: "Laptops & Computers", value: "Laptops & Computers" },
                    { label: "Smartphones & Tablets", value: "Smartphones & Tablets" },
                    { label: "Home Appliances & ACs", value: "Home Appliances & ACs" },
                    { label: "Batteries & Chargers", value: "Batteries & Chargers" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput id="pk-date" label="Preferred Pickup Date" type="date" required />
                <FormSelect
                  id="pk-time"
                  label="Time Slot"
                  options={[
                    { label: "Morning (09:00 AM - 12:00 PM)", value: "Morning" },
                    { label: "Afternoon (12:00 PM - 03:00 PM)", value: "Afternoon" },
                    { label: "Evening (03:00 PM - 06:00 PM)", value: "Evening" },
                  ]}
                />
              </div>

              <FormInput id="pk-address" label="Full Pickup Address" placeholder="House/Flat No, Building, Street, Landmark" required />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput id="pk-city" label="City / District" placeholder="New Delhi" required />
                <FormInput id="pk-state" label="State" placeholder="Delhi" required />
                <FormInput id="pk-pin" label="PIN Code" placeholder="110016" required />
              </div>

              <FormCheckbox id="pk-consent" label="I confirm that all personal data has been erased from the device and agree to CPCB recycling rules." required />

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-8 py-3 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-bold text-sm shadow flex items-center gap-2"
                >
                  <MdCheckCircle className="w-5 h-5" />
                  Confirm Pickup Booking
                </button>
              </div>
            </form>
          )}
        </Card>
      </Container>
    </div>
  );
}
