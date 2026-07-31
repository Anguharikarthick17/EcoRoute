import { NextResponse } from "next/server";
import { getEWasteListingsAsync } from "@/lib/ewaste-store";

export async function GET() {
  const listings = await getEWasteListingsAsync();
  return NextResponse.json({
    success: true,
    data: listings,
    count: listings.length,
  });
}
