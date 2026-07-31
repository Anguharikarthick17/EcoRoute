import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopNav } from "@/components/admin/AdminTopNav";

export const metadata: Metadata = {
  title: {
    template: "%s | Government Admin Portal | EcoRoute",
    default: "Government Administration Portal | EcoRoute",
  },
  description:
    "Official CPCB Government Administration Control Portal for EcoRoute — Monitor nationwide e-waste collection, manage fleet, recyclers, and AI vision systems.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900">
      <AdminSidebar />
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        <AdminTopNav />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
