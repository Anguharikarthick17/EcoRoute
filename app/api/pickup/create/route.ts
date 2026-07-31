import { NextResponse } from "next/server";
import { CreatePickupSchema } from "@/lib/zod";
import { getAuthSession } from "@/lib/auth";
import { sendPickupConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    const body = await request.json();
    const validated = CreatePickupSchema.parse(body);

    const requestId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    if (session?.email) {
      await sendPickupConfirmationEmail(
        session.email,
        requestId,
        validated.pickupDate,
        validated.timeSlot,
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Doorstep pickup request scheduled successfully.",
        pickup: {
          id: `pk_${Date.now()}`,
          requestId,
          ...validated,
          status: "Submitted",
          priority: "Normal",
          rewardPoints: 50,
          hazardLevel: "Low",
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Pickup scheduling failed" },
      { status: 400 },
    );
  }
}
