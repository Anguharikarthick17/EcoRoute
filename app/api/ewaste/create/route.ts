import { NextResponse } from "next/server";
import { addEWasteListingAsync } from "@/lib/ewaste-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const deviceName = body.deviceName || "Electronic Scrap Item";
    const brand = body.brand || "Generic";
    const category = body.category || "Mobile Phones & Tablets";
    const condition = body.condition || "Non-working / Damaged";
    const estimatedAge = body.estimatedAge || "3 years";
    const description = body.description || "Uploaded by citizen via EcoRoute portal.";
    const imageUrl =
      body.imageUrl ||
      body.imageDataUrl ||
      body.imageBuffer ||
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600";
    const price = body.price || (body.askingPrice ? `₹${body.askingPrice}` : "₹1,500");
    const weightKg = parseFloat(body.estimatedWeight || body.weightKg || "2.5");
    const sellerName = body.sellerName || "Citizen Disposer";
    const sellerCity = body.city || body.sellerCity || "New Delhi";

    const listing = await addEWasteListingAsync({
      deviceName,
      brand,
      category,
      condition,
      estimatedAge,
      description,
      imageUrl,
      price,
      weightKg: isNaN(weightKg) ? 2.5 : weightKg,
      sellerName,
      sellerCity,
      sellerRole: "Citizen",
      // Extended seller contact & location fields
      ...(body.sellerPhone && { sellerPhone: body.sellerPhone }),
      ...(body.sellerEmail && { sellerEmail: body.sellerEmail }),
      ...(body.sellerWhatsapp && { sellerWhatsapp: body.sellerWhatsapp }),
      ...(body.sellerAddress && { sellerAddress: body.sellerAddress }),
      ...(body.sellerState && { sellerState: body.sellerState }),
      ...(body.sellerPincode && { sellerPincode: body.sellerPincode }),
      ...(body.latitude && { latitude: body.latitude }),
      ...(body.longitude && { longitude: body.longitude }),
    } as any);

    return NextResponse.json(
      {
        success: true,
        message: "E-Waste scrap item published to Live Marketplace successfully!",
        data: listing,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "E-Waste publication failed" },
      { status: 400 },
    );
  }
}
