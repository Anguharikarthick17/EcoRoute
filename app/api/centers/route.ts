import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Delhi";

  return NextResponse.json({
    success: true,
    centers: [
      {
        id: "center-1",
        name: "EcoRecycle Facility #4",
        registrationNo: "CPCB/EWR/2024/DL-098",
        address: "Plot 14, Okhla Industrial Area Phase III",
        city: "New Delhi",
        state: "Delhi",
        pinCode: "110020",
        phone: "+91 11 2638 9012",
        email: "okhla@ecorecycle.gov.in",
        workingHours: "09:00 AM - 06:00 PM (Mon-Sat)",
        rating: 4.8,
        reviewCount: 142,
        distanceKm: 3.2,
        acceptedCategories: ["Laptops", "Mobiles", "Batteries", "Appliances"],
        isOpenNow: true,
        latitude: 28.5355,
        longitude: 77.2639,
      },
      {
        id: "center-2",
        name: "GreenTech Clean Recycling Pvt Ltd",
        registrationNo: "CPCB/EWR/2023/DL-045",
        address: "B-82, Mayapuri Industrial Area Phase II",
        city: "New Delhi",
        state: "Delhi",
        pinCode: "110064",
        phone: "+91 11 2811 4567",
        email: "mayapuri@greentech.org.in",
        workingHours: "09:30 AM - 06:30 PM (Mon-Sat)",
        rating: 4.6,
        reviewCount: 98,
        distanceKm: 5.8,
        acceptedCategories: ["Desktops", "Printers", "TVs", "Cables"],
        isOpenNow: true,
        latitude: 28.628,
        longitude: 77.118,
      },
    ],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        success: true,
        message: "Recycling center registered successfully.",
        center: { id: `ctr_${Date.now()}`, ...body },
      },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Center creation failed" },
      { status: 400 },
    );
  }
}
