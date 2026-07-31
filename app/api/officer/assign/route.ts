import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: `Driver ${body.driverName || "assigned"} dispatched for request ${body.requestId}`,
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Assignment failed" }, { status: 400 });
  }
}
