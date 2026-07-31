import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: `Pickup status updated to ${body.status} by Officer`,
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Status update failed" }, { status: 400 });
  }
}
