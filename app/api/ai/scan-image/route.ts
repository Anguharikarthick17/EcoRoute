import { NextResponse } from "next/server";
import { analyzeScrapImage } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageDataUrl, fileName } = body;

    if (!imageDataUrl) {
      return NextResponse.json(
        { success: false, message: "Missing image data." },
        { status: 400 }
      );
    }

    const result = await analyzeScrapImage(imageDataUrl, fileName);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "AI image scan failed." },
      { status: 500 }
    );
  }
}
