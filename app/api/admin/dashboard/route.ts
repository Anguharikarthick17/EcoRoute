import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    stats: {
      totalCitizens: 12850,
      pendingPickups: 34,
      completedPickups: 14280,
      authorizedRecyclers: 350,
      collectionCenters: 42,
      vehicles: 85,
      drivers: 92,
      complaints: 4,
    },
    monthlyCollection: [
      { month: "Jan", tonnes: 120 },
      { month: "Feb", tonnes: 145 },
      { month: "Mar", tonnes: 180 },
      { month: "Apr", tonnes: 210 },
      { month: "May", tonnes: 195 },
      { month: "Jun", tonnes: 240 },
    ],
  });
}
