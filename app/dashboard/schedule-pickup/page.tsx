"use client";

import { useState } from "react";
import Link from "next/link";
import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import { FormInput, FormSelect, FormCheckbox, GovAlertBox } from "@/components/forms";
import { MdCalendarMonth, MdAccessTime, MdLocationOn, MdCheckCircle, MdArrowForward, MdClose } from "react-icons/md";

const TIME_SLOTS = [
  { id: "slot-1", label: "09:00 AM - 12:00 PM", period: "Morning" },
  { id: "slot-2", label: "12:00 PM - 03:00 PM", period: "Afternoon" },
  { id: "slot-3", label: "03:00 PM - 06:00 PM", period: "Evening" },
];

export default function SchedulePickupPage() {
  const [stepSubmitted, setStepSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("slot-1");
  const [selectedDate, setSelectedDate] = useState("2026-08-03");

  const [formData, setFormData] = useState({
    deviceCategory: "Laptops & Mobiles",
    estimatedQuantity: "2 Devices (~5 kg)",
    address: "Flat 402, Green Park Apartments, Sector 14",
    city: "New Delhi",
    pinCode: "110016",
    instructions: "Ring doorbell twice. Devices packed in box.",
    contactMethod: "SMS & Call",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStepSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Schedule Doorstep Pickup"
        subtitle="Book a free government-authorized e-waste collection slot at your doorstep."
        badge="Booking Service"
      />

      {stepSubmitted ? (
        <DashboardCard className="border-green-200 bg-green-50/20">
          <div className="flex flex-col items-center text-center gap-6 py-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-3xl shadow-md">
              <MdCheckCircle className="w-10 h-10" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
                Booking Confirmed
              </span>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                Pickup Request #REQ-2026-9012
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Your doorstep pickup has been scheduled for{" "}
                <strong className="text-[var(--color-text)]">{selectedDate}</strong> during the{" "}
                <strong className="text-[var(--color-text)]">09:00 AM - 12:00 PM</strong> slot.
              </p>
            </div>

            <GovAlertBox variant="success" title="Next Steps" className="text-left w-full">
              An EcoRoute agent will be assigned 24 hours before your slot.
              You will receive SMS notifications at <strong className="text-[var(--color-text)]">+91 98765 43210</strong>.
            </GovAlertBox>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <Link
                href="/dashboard/pickups"
                className="px-5 py-2.5 rounded bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-dark)] no-underline shadow"
              >
                View My Requests
              </Link>
              <Link
                href="/dashboard"
                className="px-5 py-2.5 rounded border border-[var(--color-border)] text-xs font-semibold hover:bg-slate-100 no-underline"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </DashboardCard>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left 2 Columns: Form Controls */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Device Category & Address */}
              <DashboardCard title="1. Category & Location Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormSelect
                    id="pickup-cat"
                    label="E-Waste Category"
                    value={formData.deviceCategory}
                    onChange={(e) => setFormData((p) => ({ ...p, deviceCategory: e.target.value }))}
                    options={[
                      { label: "Mobile Phones & Accessories", value: "Mobile Phones & Accessories" },
                      { label: "Laptops & Computers", value: "Laptops & Mobiles" },
                      { label: "Home Appliances & TV", value: "Home Appliances" },
                      { label: "Printers & Cables", value: "Printers & Cables" },
                      { label: "Mixed Electronics", value: "Mixed Electronics" },
                    ]}
                    required
                  />

                  <FormInput
                    id="pickup-qty"
                    label="Estimated Quantity / Weight"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData((p) => ({ ...p, estimatedQuantity: e.target.value }))}
                    placeholder="e.g. 1 Laptop, 2 Phones (~5 kg)"
                    required
                  />

                  <div className="sm:col-span-2">
                    <FormInput
                      id="pickup-addr"
                      label="Pickup Address"
                      value={formData.address}
                      onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                      prefix={<MdLocationOn className="w-4 h-4 text-slate-400" />}
                      required
                    />
                  </div>

                  <FormInput
                    id="pickup-city"
                    label="City / District"
                    value={formData.city}
                    onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                    required
                  />

                  <FormInput
                    id="pickup-pin"
                    label="PIN Code"
                    value={formData.pinCode}
                    onChange={(e) => setFormData((p) => ({ ...p, pinCode: e.target.value }))}
                    required
                  />
                </div>
              </DashboardCard>

              {/* Date & Time Slot Selection */}
              <DashboardCard title="2. Select Pickup Date & Time Slot">
                <div className="flex flex-col gap-5">
                  
                  {/* Calendar / Date Picker UI */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[var(--color-text)]">
                      Preferred Date
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min="2026-08-01"
                        max="2026-08-31"
                        className="h-10 px-3 border border-[var(--color-border)] rounded text-xs text-[var(--color-text)] bg-white font-medium outline-none focus:border-[var(--color-primary)]"
                        required
                      />
                      <span className="text-xs text-[var(--color-text-muted)]">
                        Available slots for Delhi/NCR region
                      </span>
                    </div>
                  </div>

                  {/* Time Slot Grid */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[var(--color-text)]">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`p-3 rounded border text-left flex flex-col gap-1 transition-all ${
                              isSelected
                                ? "bg-blue-50 border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20"
                                : "bg-white border-[var(--color-border)] hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold text-[var(--color-primary)]">
                              {slot.period}
                            </span>
                            <span className="text-xs font-bold text-[var(--color-text)]">
                              {slot.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Instructions & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[var(--color-border-light)]">
                    <FormInput
                      id="pickup-notes"
                      label="Special Instructions (Optional)"
                      value={formData.instructions}
                      onChange={(e) => setFormData((p) => ({ ...p, instructions: e.target.value }))}
                      placeholder="e.g. Ring doorbell, box packed..."
                    />

                    <FormSelect
                      id="pickup-contact"
                      label="Preferred Contact Channel"
                      value={formData.contactMethod}
                      onChange={(e) => setFormData((p) => ({ ...p, contactMethod: e.target.value }))}
                      options={[
                        { label: "SMS & Call", value: "SMS & Call" },
                        { label: "WhatsApp & Email", value: "WhatsApp & Email" },
                        { label: "Phone Call Only", value: "Phone Call Only" },
                      ]}
                    />
                  </div>
                </div>
              </DashboardCard>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-4">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:bg-slate-50 no-underline"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-xs font-semibold shadow transition-all"
                >
                  Confirm Doorstep Pickup
                  <MdArrowForward className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 1 Column: Guidelines & Policy */}
            <div className="flex flex-col gap-6">
              <GovAlertBox variant="info" title="Government Guarantee">
                100% Free Doorstep Collection under CPCB E-Waste Management Rules 2022.
                No hidden fees or charges for individual citizens.
              </GovAlertBox>

              <DashboardCard title="Pickup Guidelines">
                <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-muted)] list-disc pl-4">
                  <li>Please back up all personal data from devices before handing over.</li>
                  <li>Perform a factory reset on smartphones, tablets and laptops.</li>
                  <li>Remove SIM cards, SD cards, and external battery packs.</li>
                  <li>Our certified collector agent will issue a digital receipt upon verification.</li>
                </ul>
              </DashboardCard>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
