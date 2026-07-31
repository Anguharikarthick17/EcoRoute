import { cn } from "@/lib/utils";
import { MdPerson, MdVerified, MdEdit, MdLock } from "react-icons/md";

interface ProfileCardProps {
  user: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    citizenId: string;
    verified: boolean;
  };
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  className?: string;
}

export function ProfileCard({
  user,
  onEditProfile,
  onChangePassword,
  className,
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[var(--color-border)] rounded-lg p-6 shadow-sm flex flex-col gap-6",
        className,
      )}
    >
      {/* Header Avatar & Basic Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-[var(--color-border-light)] text-center sm:text-left">
        <div className="relative w-20 h-20 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-3xl shrink-0 shadow-md">
          {user.fullName.charAt(0)}
          {user.verified && (
            <span
              className="absolute bottom-0 right-0 bg-[var(--color-accent)] text-white p-1 rounded-full border-2 border-white"
              title="Verified Citizen Account"
            >
              <MdVerified className="w-4 h-4" />
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-[var(--color-text)]">
              {user.fullName}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-[var(--color-accent)] border border-emerald-200">
              Verified Citizen
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] font-mono">
            Citizen ID: {user.citizenId}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {user.email} · {user.phone}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onEditProfile && (
            <button
              onClick={onEditProfile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors text-xs font-semibold"
            >
              <MdEdit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
          {onChangePassword && (
            <button
              onClick={onChangePassword}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-text)] hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <MdLock className="w-4 h-4 text-slate-500" />
              Change Password
            </button>
          )}
        </div>
      </div>

      {/* Address Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-50 p-3 rounded border border-slate-100">
          <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
            Street Address
          </span>
          <span className="font-semibold text-[var(--color-text)] mt-0.5 block">
            {user.address}
          </span>
        </div>
        <div className="bg-slate-50 p-3 rounded border border-slate-100">
          <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
            City / Town
          </span>
          <span className="font-semibold text-[var(--color-text)] mt-0.5 block">
            {user.city}
          </span>
        </div>
        <div className="bg-slate-50 p-3 rounded border border-slate-100">
          <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
            State / UT
          </span>
          <span className="font-semibold text-[var(--color-text)] mt-0.5 block">
            {user.state}
          </span>
        </div>
        <div className="bg-slate-50 p-3 rounded border border-slate-100">
          <span className="text-[var(--color-text-muted)] block text-[10px] uppercase font-semibold">
            PIN Code
          </span>
          <span className="font-semibold text-[var(--color-text)] font-mono mt-0.5 block">
            {user.pinCode}
          </span>
        </div>
      </div>
    </div>
  );
}
