import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: {
    template: "%s | Recycler Buyer Portal | EcoRoute",
    default: "Recycler Buyer Portal | EcoRoute",
  },
  description:
    "Verified Recycler Buyer Portal — Browse available e-waste scrap listings, view seller contact details and location, and place purchase requests.",
};

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[var(--color-background)] min-h-[calc(100vh-140px)]">
      {children}
    </div>
  );
}
