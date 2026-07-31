import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    certificates: [
      {
        id: "c-1",
        certificateNo: "CERT-DL-8902",
        issueDate: "27 Jul 2026",
        recycledDevice: "Dell OptiPlex Desktop Tower",
        category: "Desktop Computers",
        weightKg: 18,
        co2SavedKg: 54,
        recyclerName: "GreenTech Clean Recycling Pvt Ltd",
        cpbLicenseNo: "CPCB/EWR/2023/DL-045",
      },
      {
        id: "c-2",
        certificateNo: "CERT-DL-8654",
        issueDate: "20 Jul 2026",
        recycledDevice: "LG CRT Monitor 17-inch",
        category: "Televisions & Displays",
        weightKg: 15,
        co2SavedKg: 45,
        recyclerName: "CPCB Central Facility",
        cpbLicenseNo: "CPCB/GOI/GOVT-001",
      },
    ],
  });
}
