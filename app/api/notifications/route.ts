import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    notifications: [
      {
        id: "notif-1",
        title: "Pickup Agent Assigned",
        message: "Agent Suresh Verma (DL 01 AB 8941) assigned for tomorrow's pickup at 10:00 AM.",
        timestamp: "Today, 09:30 AM",
        type: "pickup",
        read: false,
        actionUrl: "/dashboard/pickups/REQ-2026-8941",
        actionLabel: "View Request",
      },
      {
        id: "notif-2",
        title: "+50 Green Points Credited",
        message: "Your account was credited 50 points for successful laptop recycling.",
        timestamp: "Yesterday, 04:15 PM",
        type: "reward",
        read: false,
        actionUrl: "/dashboard/rewards",
        actionLabel: "Check Rewards",
      },
    ],
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: body.id ? `Notification ${body.id} marked as read.` : "All notifications marked as read.",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 400 },
    );
  }
}
