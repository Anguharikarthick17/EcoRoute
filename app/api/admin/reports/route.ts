import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    reports: [
      {
        id: "rep-1",
        title: "Daily Operations & Dispatch Summary",
        category: "Daily Summary",
        period: "30 July 2026",
        generatedDate: "31 Jul 2026, 06:00 AM",
        fileSize: "1.8 MB",
      },
    ],
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: "Report generated.", report: body }, { status: 201 });
}
