"use client";

import { useState } from "react";
import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import { FormInput, FormSelect, FormCheckbox, GovAlertBox } from "@/components/forms";
import { MdSettings, MdSave, MdSecurity, MdTune, MdCheckCircle } from "react-icons/md";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Government System Settings & Rules"
        subtitle="Configure CPCB regional parameters, EPR quotas, dispatch rules, and security controls."
        badge="System Configuration"
      />

      {saved && (
        <GovAlertBox variant="success" title="System Configuration Updated">
          New EPR rules and dispatch parameters synced with all regional servers.
        </GovAlertBox>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        
        {/* General & Ministry Settings */}
        <DashboardCard title="1. Ministry & Portal Configuration">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <FormInput id="adm-portal" label="Portal Title" value="EcoRoute Government Portal" readOnly />
            <FormInput id="adm-ministry" label="Governing Ministry" value="MoEFCC & Central Pollution Control Board" readOnly />
            <FormInput id="adm-helpline" label="Toll-Free Helpline" value="1800-200-7911" required />
            <FormInput id="adm-email" label="Nodal Officer Email" value="nodal.director@cpcb.gov.in" required />
          </div>
        </DashboardCard>

        {/* Collection & EPR Quotas */}
        <DashboardCard title="2. Collection Rules & EPR Quotas">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <FormInput id="adm-quota" label="Default Daily District Pickup Limit" value="100 Requests" required />
            <FormInput id="adm-sla" label="Pickup SLA Window (Hours)" value="48 Hours" required />
            <FormSelect
              id="adm-auto"
              label="Automatic Driver Dispatch Engine"
              options={[
                { label: "Enabled (AI Distance Optimization)", value: "enabled" },
                { label: "Disabled (Manual Officer Dispatch)", value: "disabled" },
              ]}
            />
          </div>
        </DashboardCard>

        {/* Save Bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold shadow"
          >
            <MdSave className="w-4 h-4" />
            Save Admin System Settings
          </button>
        </div>
      </form>
    </div>
  );
}
