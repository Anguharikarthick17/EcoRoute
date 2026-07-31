import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Missing verification token" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Email verified successfully.",
  });
}

export async function POST(request: Request) {
  return GET(request);
}
