import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    pickups: [
      {
        id: "REQ-2026-8941",
        deviceName: "HP Pavilion Laptop & 2 Phones",
        category: "Laptops & Mobiles",
        requestDate: "30 Jul 2026",
        pickupDate: "01 Aug 2026",
        timeSlot: "10:00 AM - 01:00 PM",
        status: "Assigned",
        centerName: "EcoRecycle Facility #4",
        address: "Flat 402, Green Park Apartments, Sector 14, New Delhi",
        estimatedWeight: "12 kg",
      },
      {
        id: "REQ-2026-8812",
        deviceName: "Dell OptiPlex Desktop Tower",
        category: "Desktop Computers",
        requestDate: "24 Jul 2026",
        pickupDate: "27 Jul 2026",
        timeSlot: "02:00 PM - 05:00 PM",
        status: "Completed",
        centerName: "GreenTech Clean Recycling",
        address: "Flat 402, Green Park Apartments, Sector 14, New Delhi",
        certificateId: "CERT-DL-8902",
        rewardPoints: 50,
        estimatedWeight: "18 kg",
      },
    ],
  });
}
