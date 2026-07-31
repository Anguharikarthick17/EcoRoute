import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: "Pickup request updated successfully.",
      pickup: body,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 400 },
    );
  }
}
