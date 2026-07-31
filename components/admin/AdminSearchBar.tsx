import { ReactNode } from "react";
import { MdSearch, MdFilterList } from "react-icons/md";
import { cn } from "@/lib/utils";

interface AdminSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  filters?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function AdminSearchBar({
  searchTerm,
  onSearchChange,
  placeholder = "Search directory...",
  filters,
  actions,
  className,
}: AdminSearchBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 border border-[var(--color-border)] rounded-lg shadow-xs",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-3 w-full">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-10 pl-9 pr-3 rounded border border-[var(--color-border)] text-xs text-[var(--color-text)] bg-white outline-none focus:border-[var(--color-primary)]"
          />
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {filters && <div className="flex items-center gap-2">{filters}</div>}
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
