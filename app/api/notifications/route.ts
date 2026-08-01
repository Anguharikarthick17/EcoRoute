import { NextResponse } from "next/server";
import {
  getNotificationsStore,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/notification-store";

export async function GET() {
  const notifications = getNotificationsStore();
  return NextResponse.json({
    success: true,
    notifications,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newNotif = {
      id: body.id || `notif-${Date.now()}`,
      title: body.title || "🚚 Scrap Order & Pickup Scheduled!",
      message: body.message || "Buyer has placed an order for your scrap item.",
      timestamp: body.timestamp || "Just now",
      type: body.type || "reward",
      read: false,
      buyerName: body.buyerName,
      buyerPhone: body.buyerPhone,
      itemName: body.itemName,
      itemPrice: body.itemPrice,
    };

    const updatedList = await addNotification(newNotif);

    return NextResponse.json({
      success: true,
      message: "Notification pushed globally across devices.",
      notifications: updatedList,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to push notification" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    let updatedList;
    if (body.id) {
      updatedList = markNotificationRead(body.id);
    } else {
      updatedList = markAllNotificationsRead();
    }

    return NextResponse.json({
      success: true,
      notifications: updatedList,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Update failed" },
      { status: 400 }
    );
  }
}
