"use client";

import { useState } from "react";
import { CitizenSectionHeader, ProfileCard, DashboardCard } from "@/components/citizen";
import { FormInput, PasswordInput, FormSelect, GovAlertBox } from "@/components/forms";
import { MdCheckCircle, MdEdit, MdLock, MdSave, MdClose, MdVerifiedUser } from "react-icons/md";

const MOCK_USER = {
  fullName: "Rajesh Kumar",
  email: "rajesh.kumar@example.in",
  phone: "+91 98765 43210",
  address: "Flat 402, Green Park Apartments, Sector 14",
  city: "New Delhi",
  state: "Delhi",
  pinCode: "110016",
  citizenId: "DL-2026-8941",
  verified: true,
  aadhaarLinked: true,
};

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [user, setUser] = useState(MOCK_USER);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState({ ...MOCK_USER });
  const [passForm, setPassForm] = useState({ current: "", newPass: "", confirm: "" });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...editForm });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="flex flex-col gap-6">
      <CitizenSectionHeader
        title="Citizen Profile"
        subtitle="Manage your personal information, address, and security settings."
        badge="Account"
      />

      {savedSuccess && (
        <GovAlertBox variant="success" title="Success">
          Your profile details have been updated successfully and synced with your citizen records.
        </GovAlertBox>
      )}

      {/* Profile Overview Card */}
      <ProfileCard
        user={user}
        onEditProfile={() => setIsEditing(true)}
        onChangePassword={() => setIsChangingPass(true)}
      />

      {/* ── Edit Profile Modal / Form ──────────────────────── */}
      {isEditing && (
        <DashboardCard
          title="Edit Profile Information"
          subtitle="Update your contact and address details"
          action={
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <MdClose className="w-5 h-5" />
            </button>
          }
        >
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                id="prof-name"
                label="Full Name"
                value={editForm.fullName}
                onChange={(e) => setEditForm((p) => ({ ...p, fullName: e.target.value }))}
                required
              />
              <FormInput
                id="prof-email"
                label="Email Address"
                value={editForm.email}
                onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <FormInput
                id="prof-phone"
                label="Phone Number"
                value={editForm.phone}
                onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))}
                required
              />
              <FormInput
                id="prof-address"
                label="Street Address"
                value={editForm.address}
                onChange={(e) => setEditForm((p) => ({ ...p, address: e.target.value }))}
                required
              />
              <FormInput
                id="prof-city"
                label="City / District"
                value={editForm.city}
                onChange={(e) => setEditForm((p) => ({ ...p, city: e.target.value }))}
                required
              />
              <FormInput
                id="prof-pin"
                label="PIN Code"
                value={editForm.pinCode}
                onChange={(e) => setEditForm((p) => ({ ...p, pinCode: e.target.value }))}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[var(--color-border-light)]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold rounded border border-[var(--color-border)] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow"
              >
                <MdSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </DashboardCard>
      )}

      {/* ── Change Password Modal / Form ───────────────────── */}
      {isChangingPass && (
        <DashboardCard
          title="Change Password"
          subtitle="Ensure your account uses a strong password"
          action={
            <button
              onClick={() => setIsChangingPass(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <MdClose className="w-5 h-5" />
            </button>
          }
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsChangingPass(false);
              setSavedSuccess(true);
            }}
            className="flex flex-col gap-4 max-w-md"
          >
            <PasswordInput
              id="curr-pass"
              label="Current Password"
              placeholder="Enter current password"
              value={passForm.current}
              onChange={(e) => setPassForm((p) => ({ ...p, current: e.target.value }))}
              required
            />
            <PasswordInput
              id="new-pass"
              label="New Password"
              placeholder="Min. 8 characters"
              showStrengthMeter
              value={passForm.newPass}
              onChange={(e) => setPassForm((p) => ({ ...p, newPass: e.target.value }))}
              required
            />
            <PasswordInput
              id="confirm-new-pass"
              label="Confirm New Password"
              placeholder="Re-enter new password"
              value={passForm.confirm}
              onChange={(e) => setPassForm((p) => ({ ...p, confirm: e.target.value }))}
              required
            />

            <div className="flex justify-end gap-3 pt-3 border-t border-[var(--color-border-light)]">
              <button
                type="button"
                onClick={() => setIsChangingPass(false)}
                className="px-4 py-2 text-xs font-semibold rounded border border-[var(--color-border)] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow"
              >
                <MdLock className="w-4 h-4" />
                Update Password
              </button>
            </div>
          </form>
        </DashboardCard>
      )}

      {/* Additional Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Verification Status" subtitle="Aadhaar & Identity Linkage">
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2">
                <MdVerifiedUser className="w-5 h-5 text-[var(--color-accent)]" />
                <span className="font-bold text-[var(--color-text)]">Aadhaar Linked</span>
              </div>
              <span className="text-[10px] font-bold text-[var(--color-accent)] uppercase">XXXX-XXXX-8941</span>
            </div>
            <p className="text-[var(--color-text-muted)] text-[11px] leading-relaxed">
              Your identity is verified under the Digital India E-Governance Framework.
              This allows instant issuance of CPCB Digital Certificates.
            </p>
          </div>
        </DashboardCard>

        <DashboardCard title="E-Waste Disposal Summary" subtitle="Lifetime stats">
          <div className="grid grid-cols-2 gap-3 text-xs text-center">
            <div className="p-3 bg-slate-50 border rounded">
              <span className="text-xl font-bold text-[var(--color-primary)] block">16</span>
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase">Total Requests</span>
            </div>
            <div className="p-3 bg-slate-50 border rounded">
              <span className="text-xl font-bold text-[var(--color-accent)] block">142 kg</span>
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase">Total Recycled</span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
