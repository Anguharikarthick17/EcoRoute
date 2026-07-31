import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestId = searchParams.get("id") || "REQ-2026-8941";

  return NextResponse.json({
    success: true,
    tracking: {
      requestId,
      deviceName: "HP Pavilion Laptop & 2 Mobiles",
      status: "Assigned",
      driverName: "Suresh Verma",
      vehicleNumber: "DL 01 AB 8941",
      driverPhone: "+91 98112 34567",
      estimatedArrival: "Tomorrow at 10:30 AM",
      stages: [
        { title: "Submitted", status: "completed", date: "30 Jul, 09:30 AM" },
        { title: "Approved", status: "completed", date: "30 Jul, 11:15 AM" },
        { title: "Assigned", status: "current", date: "30 Jul, 02:00 PM" },
        { title: "Collected", status: "upcoming" },
        { title: "Delivered", status: "upcoming" },
        { title: "Recycled", status: "upcoming" },
        { title: "Completed", status: "upcoming" },
      ],
    },
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: `Pickup status updated to ${body.status}`,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Status update failed" },
      { status: 400 },
    );
  }
}
