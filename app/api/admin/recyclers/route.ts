import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    recyclers: [
      {
        id: "REC-DL-098",
        companyName: "EcoRecycle Facility #4",
        licenseNo: "CPCB/EWR/2024/DL-098",
        address: "Okhla Industrial Area Phase III, New Delhi",
        district: "New Delhi Central",
        contactPerson: "Dr. Suresh Varma",
        phone: "+91 11 2638 9012",
        email: "okhla@ecorecycle.gov.in",
        capacityTonnes: 500,
        monthlyLoadTonnes: 320,
        status: "Approved",
        verified: true,
      },
    ],
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: "Recycler registered.", recycler: body }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: "Recycler updated.", recycler: body });
}
