import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { CitizenSidebar } from "@/components/citizen/CitizenSidebar";
import { DashboardVideoWrapper } from "@/components/citizen/DashboardVideoWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s | Citizen Portal | EcoRoute",
    default: "Citizen Portal | EcoRoute",
  },
  description:
    "Official Citizen Portal for EcoRoute — Manage e-waste pickups, track recycling progress, view green rewards, and download CPCB certificates.",
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-140px)] border-b border-white/10">
      <Container className="py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <CitizenSidebar />
          <DashboardVideoWrapper>
            {children}
          </DashboardVideoWrapper>
        </div>
      </Container>
    </div>
  );
}
