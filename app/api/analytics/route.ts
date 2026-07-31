import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    analytics: {
      carbonReducedTonnes: 1420,
      treesOffset: 58000,
      participationRatePercent: 78.4,
      metalsRecoveredTonnes: 182,
      categoryRecovery: [
        { category: "Computers & Servers", percentage: 42, weightTonnes: 596 },
        { category: "Mobile Communication", percentage: 28, weightTonnes: 397 },
        { category: "Large Household Appliances", percentage: 18, weightTonnes: 255 },
        { category: "Consumer Electronics", percentage: 12, weightTonnes: 172 },
      ],
    },
  });
}
