import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    pickups: [
      {
        requestId: "REQ-2026-8941",
        citizenName: "Rajesh Kumar",
        citizenPhone: "+91 98765 43210",
        deviceSummary: "HP Pavilion Laptop & 2 Mobiles",
        address: "Green Park, Sector 14, New Delhi",
        district: "New Delhi",
        requestDate: "30 Jul 2026",
        pickupDate: "01 Aug 2026",
        assignedDriver: "Suresh Verma",
        assignedVehicle: "DL 01 AB 8941",
        assignedRecycler: "EcoRecycle Facility #4",
        priority: "High",
        status: "Assigned",
        weightKg: 12,
      },
    ],
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: "Pickup updated by Admin.", pickup: body });
}
