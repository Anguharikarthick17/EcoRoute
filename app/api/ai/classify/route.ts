import { NextResponse } from "next/server";
import { classifyDeviceImage } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await classifyDeviceImage(body.imageUrl || "", body.deviceName);

    return NextResponse.json({
      success: true,
      analysis: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "AI classification failed" },
      { status: 400 },
    );
  }
}
