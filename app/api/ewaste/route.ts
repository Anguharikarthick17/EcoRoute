import { NextResponse } from "next/server";
import { getEWasteListingsAsync, deleteEWasteListingAsync, deleteEWasteListingsByKeyword } from "@/lib/ewaste-store";

export async function GET() {
  const listings = await getEWasteListingsAsync();
  return NextResponse.json({
    success: true,
    data: listings,
    count: listings.length,
  });
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const keyword = url.searchParams.get("keyword");

    if (id) {
      const deleted = await deleteEWasteListingAsync(id);
      return NextResponse.json({ success: true, deletedCount: deleted ? 1 : 0 });
    }

    if (keyword) {
      const count = deleteEWasteListingsByKeyword(keyword);
      return NextResponse.json({ success: true, deletedCount: count });
    }

    return NextResponse.json({ success: false, error: "Missing id or keyword parameter" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Delete failed" }, { status: 500 });
  }
}
