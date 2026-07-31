"use client";

import { useState } from "react";
import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import { FormInput, FormSelect, GovAlertBox } from "@/components/forms";
import {
  MdHelp,
  MdPhone,
  MdEmail,
  MdFileDownload,
  MdAdd,
  MdRemove,
  MdSend,
  MdCheckCircle,
} from "react-icons/md";

const FAQS = [
  {
    q: "How does the free doorstep pickup service work?",
    a: "Select your e-waste items, pick a date and time slot, and our CPCB certified agent will arrive at your address for free collection.",
  },
  {
    q: "What should I do before handing over a laptop or mobile phone?",
    a: "Perform a factory reset, back up your photos/files, and remove SIM cards, memory cards, and phone covers.",
  },
  {
    q: "How are Green Points calculated and redeemed?",
    a: "Green Points are awarded based on item category and weight. You can redeem points for civic utility rebates and green badges.",
  },
  {
    q: "Is my e-waste guaranteed to be safely recycled?",
    a: "Yes. All materials are processed strictly under the E-Waste Management Rules 2022 by licensed recyclers with digital audit trails.",
  },
];

export default function HelpSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const [ticket, setTicket] = useState({
    subject: "",
    category: "Pickup Delay",
    description: "",
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Help & Support Desk"
        subtitle="Get assistance, raise complaints, access user guides, or contact government helplines."
        badge="Citizen Support"
      />

      {/* Emergency Helpline Banner */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0">
            <MdPhone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
              CPCB National Helpline (Toll-Free)
            </span>
            <h2 className="text-xl font-bold tracking-tight">1800-200-7911</h2>
            <p className="text-xs text-white/80">Available Monday to Saturday, 09:00 AM - 06:00 PM</p>
          </div>
        </div>

        <a
          href="tel:18002007911"
          className="px-5 py-2.5 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-xs font-semibold shadow no-underline shrink-0"
        >
          Call Toll-Free Now
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Columns: FAQ Accordion & Complaint Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* FAQ Accordion */}
          <DashboardCard title="Frequently Asked Questions">
            <div className="flex flex-col divide-y divide-[var(--color-border-light)] text-xs">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-3.5">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-3 text-left font-bold text-[var(--color-text)] hover:text-[var(--color-primary)]"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <MdRemove className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                      ) : (
                        <MdAdd className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="text-[var(--color-text-muted)] leading-relaxed mt-2 pl-2 border-l-2 border-[var(--color-primary)]">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </DashboardCard>

          {/* Raise Complaint / Ticket Form */}
          <DashboardCard title="Raise Support Ticket / Grievance">
            {ticketSubmitted ? (
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg flex flex-col items-center text-center gap-3 text-xs">
                <MdCheckCircle className="w-10 h-10 text-[var(--color-accent)]" />
                <h4 className="font-bold text-sm text-[var(--color-text)]">
                  Grievance Registered #TKT-2026-4412
                </h4>
                <p className="text-[var(--color-text-muted)]">
                  Your ticket has been forwarded to the CPCB Nodal Officer. Expected resolution within 24 hours.
                </p>
                <button
                  onClick={() => setTicketSubmitted(false)}
                  className="px-4 py-2 rounded bg-[var(--color-primary)] text-white font-semibold"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    id="tkt-subject"
                    label="Subject / Topic"
                    value={ticket.subject}
                    onChange={(e) => setTicket((p) => ({ ...p, subject: e.target.value }))}
                    placeholder="Brief description..."
                    required
                  />
                  <FormSelect
                    id="tkt-cat"
                    label="Category"
                    value={ticket.category}
                    onChange={(e) => setTicket((p) => ({ ...p, category: e.target.value }))}
                    options={[
                      { label: "Pickup Delay", value: "Pickup Delay" },
                      { label: "Certificate Issue", value: "Certificate Issue" },
                      { label: "Green Points Discrepancy", value: "Green Points Discrepancy" },
                      { label: "General Query", value: "General Query" },
                    ]}
                  />
                </div>

                <FormInput
                  id="tkt-desc"
                  label="Detailed Explanation"
                  value={ticket.description}
                  onChange={(e) => setTicket((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Provide details, request ID if applicable..."
                  required
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-dark)] shadow"
                  >
                    <MdSend className="w-4 h-4" />
                    Submit Ticket
                  </button>
                </div>
              </form>
            )}
          </DashboardCard>
        </div>

        {/* Right 1 Column: Resources & Downloads */}
        <div className="flex flex-col gap-6">
          <DashboardCard title="User Guides & Manuals">
            <div className="flex flex-col gap-3 text-xs">
              {[
                { name: "Citizen E-Waste Disposal Manual 2026", size: "2.4 MB (PDF)" },
                { name: "Device Data Wipe Guidelines", size: "1.1 MB (PDF)" },
                { name: "CPCB E-Waste Rules Overview", size: "3.8 MB (PDF)" },
              ].map((guide) => (
                <div key={guide.name} className="p-3 bg-slate-50 border rounded flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-[var(--color-text)]">{guide.name}</h4>
                    <span className="text-[10px] text-slate-500">{guide.size}</span>
                  </div>
                  <button className="p-1.5 rounded bg-blue-50 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors shrink-0">
                    <MdFileDownload className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </DashboardCard>

          <GovAlertBox variant="security" title="RTI & Transparency">
            Grievances filed on EcoRoute are monitored under the Centralized Public Grievance Redress and Monitoring System (CPGRAMS).
          </GovAlertBox>
        </div>
      </div>
    </div>
  );
}
