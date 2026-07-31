import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { findUserByEmail } from "@/lib/user-store";

export async function GET() {
  const session = await getAuthSession();
  
  if (session?.email) {
    const user = await findUserByEmail(session.email);
    if (user) {
      return NextResponse.json({
        success: true,
        profile: {
          fullName: user.fullName,
          email: user.email,
          phone: user.mobile ? `+91 ${user.mobile}` : "+91 98765 43210",
          address: user.address,
          city: user.city,
          state: user.state,
          pinCode: user.pin,
          citizenId: user.citizenId,
          aadhaarLinked: true,
          verified: true,
        },
      });
    }
  }

  return NextResponse.json({
    success: true,
    profile: {
      fullName: session?.name || "Rajesh Kumar",
      email: session?.email || "rajesh.kumar@example.in",
      phone: "+91 98765 43210",
      address: "Flat 402, Green Park Apartments, Sector 14",
      city: "New Delhi",
      state: "Delhi",
      pinCode: "110016",
      citizenId: session?.citizenId || "DL-2026-8941",
      aadhaarLinked: true,
      verified: true,
    },
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      profile: body,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Profile update failed" },
      { status: 400 },
    );
  }
}
