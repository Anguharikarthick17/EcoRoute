import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    officer: {
      code: "OFF-DL-402",
      name: "Anil Kumar, IAS",
      dutyZone: "Okhla & Green Park Circle",
    },
    todayStats: {
      todaysPickups: 18,
      assigned: 12,
      completed: 6,
      pending: 4,
    },
  });
}
