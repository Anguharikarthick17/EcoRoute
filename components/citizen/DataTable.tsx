"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  emptyState?: ReactNode;
  className?: string;
  onRowClick?: (row: T) => void;
}

/**
 * DataTable — Government-styled responsive data table.
 */
export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyState,
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto border border-[var(--color-border)] rounded-lg bg-white shadow-sm",
        className,
      )}
    >
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-[var(--color-border)] text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
            {columns.map((col, index) => (
              <th
                key={index}
                className={cn("py-3.5 px-4 font-semibold whitespace-nowrap", col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border-light)] text-[var(--color-text)]">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 px-4 text-center text-[var(--color-text-muted)]"
              >
                {emptyState || "No records found."}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                onClick={() => onRowClick && onRowClick(row)}
                className={cn(
                  "hover:bg-slate-50/80 transition-colors duration-150",
                  onRowClick && "cursor-pointer",
                )}
              >
                {columns.map((col, cIdx) => {
                  const content =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as ReactNode);
                  return (
                    <td
                      key={cIdx}
                      className={cn("py-3.5 px-4 align-middle", col.className)}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
