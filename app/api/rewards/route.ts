import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    rewards: {
      totalPoints: 450,
      badges: [
        {
          id: "b-1",
          title: "E-Waste Warrior",
          description: "Recycled over 100 kg of electronic waste responsibly.",
          iconName: "warrior",
          isUnlocked: true,
          unlockedAt: "15 Jul 2026",
          pointsRequired: 100,
          progressPercent: 100,
        },
        {
          id: "b-3",
          title: "CPCB Eco Champion",
          description: "Achieve 500 Green Points and earn official MoEFCC recognition.",
          iconName: "champion",
          isUnlocked: false,
          pointsRequired: 500,
          progressPercent: 90,
        },
      ],
      milestones: [
        { id: "m-1", title: "Recycle 5 Laptops", target: "5 Units", current: "5 Units", completed: true, points: 100 },
      ],
    },
  });
}
