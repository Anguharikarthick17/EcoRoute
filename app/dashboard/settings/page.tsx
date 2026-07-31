"use client";

import { useState } from "react";
import { CitizenSectionHeader, DashboardCard } from "@/components/citizen";
import { FormCheckbox, FormSelect, GovAlertBox } from "@/components/forms";
import {
  MdSettings,
  MdNotifications,
  MdSecurity,
  MdLanguage,
  MdDeleteForever,
  MdSave,
  MdClose,
  MdWarning,
} from "react-icons/md";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifs: false,
    publicProfile: false,
    dataSharing: true,
    language: "en",
    theme: "light",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Portal Settings & Preferences"
        subtitle="Manage notification channels, privacy preferences, language, and security settings."
        badge="Preferences"
      />

      {saved && (
        <GovAlertBox variant="success" title="Settings Saved">
          Your portal preferences have been updated successfully.
        </GovAlertBox>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        
        {/* 1. Language & Regional Settings */}
        <DashboardCard title="1. Language & Accessibility">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <FormSelect
              id="set-lang"
              label="Portal Language"
              value={settings.language}
              onChange={(e) => setSettings((p) => ({ ...p, language: e.target.value }))}
              options={[
                { label: "English", value: "en" },
                { label: "हिंदी (Hindi)", value: "hi" },
                { label: "বাংলা (Bengali)", value: "bn" },
                { label: "मराठी (Marathi)", value: "mr" },
                { label: "தமிழ் (Tamil)", value: "ta" },
                { label: "తెలుగు (Telugu)", value: "te" },
                { label: "ગુજરાતી (Gujarati)", value: "gu" },
                { label: "कन्नड (Kannada)", value: "kn" },
              ]}
            />

            <FormSelect
              id="set-theme"
              label="Interface Theme"
              value={settings.theme}
              onChange={(e) => setSettings((p) => ({ ...p, theme: e.target.value }))}
              options={[
                { label: "Government Standard (Light)", value: "light" },
                { label: "High Contrast (Accessibility)", value: "high-contrast" },
              ]}
            />
          </div>
        </DashboardCard>

        {/* 2. Notification Preferences */}
        <DashboardCard title="2. Notification Preferences">
          <div className="flex flex-col gap-3 text-xs">
            <FormCheckbox
              id="notif-email"
              label="Email Notifications (Pickup updates, certificates & receipts)"
              checked={settings.emailAlerts}
              onChange={(e) => setSettings((p) => ({ ...p, emailAlerts: e.target.checked }))}
            />
            <FormCheckbox
              id="notif-sms"
              label="SMS Alerts (Agent arrival & time-slot reminders)"
              checked={settings.smsAlerts}
              onChange={(e) => setSettings((p) => ({ ...p, smsAlerts: e.target.checked }))}
            />
            <FormCheckbox
              id="notif-push"
              label="Browser Push Notifications (Live pickup status changes)"
              checked={settings.pushNotifs}
              onChange={(e) => setSettings((p) => ({ ...p, pushNotifs: e.target.checked }))}
            />
          </div>
        </DashboardCard>

        {/* 3. Privacy & Data Protection */}
        <DashboardCard title="3. Privacy & Data Protection">
          <div className="flex flex-col gap-3 text-xs">
            <FormCheckbox
              id="priv-data"
              label="Allow CPCB for anonymous regional recycling statistics report generation."
              checked={settings.dataSharing}
              onChange={(e) => setSettings((p) => ({ ...p, dataSharing: e.target.checked }))}
            />
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Your personal data is protected under the Digital Personal Data Protection Act 2023 and is never shared with third-party commercial entities.
            </p>
          </div>
        </DashboardCard>

        {/* Save Bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-semibold shadow"
          >
            <MdSave className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </form>

      {/* 4. Danger Zone */}
      <DashboardCard title="Danger Zone" className="border-red-200 bg-red-50/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <h4 className="font-bold text-[var(--color-danger)] text-sm">
              Deactivate or Delete Citizen Account
            </h4>
            <p className="text-[var(--color-text-muted)] text-[11px] mt-0.5">
              Permanently delete your profile, saved addresses, and active rewards. Certificates will remain archived on CPCB servers.
            </p>
          </div>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 rounded bg-[var(--color-danger)] text-white text-xs font-bold hover:bg-red-800 shrink-0 flex items-center gap-1.5 shadow"
          >
            <MdDeleteForever className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </DashboardCard>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 flex flex-col gap-4 border-2 border-red-500">
            <div className="flex items-center gap-3 text-[var(--color-danger)]">
              <MdWarning className="w-8 h-8 shrink-0" />
              <h3 className="text-lg font-bold">Confirm Account Deletion</h3>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Are you sure you want to delete your EcoRoute account? This action is <strong className="text-slate-900">irreversible</strong>. You will lose your 450 Green Points balance.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border border-slate-300 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  alert("Account deletion request submitted to CPCB Registrar.");
                }}
                className="px-4 py-2 rounded bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
