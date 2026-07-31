import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    users: [
      {
        citizenId: "DL-2026-8941",
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@example.in",
        district: "New Delhi Central",
        registeredDate: "12 Jan 2026",
        totalPickups: 16,
        status: "Active",
      },
    ],
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: "User status updated.", user: body });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ success: true, message: "User deleted from registry." });
}
