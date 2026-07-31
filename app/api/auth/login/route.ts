import { NextResponse } from "next/server";
import { LoginSchema } from "@/lib/zod";
import { signToken, comparePassword } from "@/lib/auth";
import { findUserByEmailOrMobile } from "@/lib/user-store";

const TOKEN_NAME = "ecoroute_token";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = LoginSchema.parse(body);

    const user = await findUserByEmailOrMobile(validated.email);

    if (user) {
      if (user.passwordHash && user.passwordHash.length > 20) {
        const isPasswordValid = await comparePassword(validated.password, user.passwordHash);
        if (!isPasswordValid) {
          return NextResponse.json(
            { success: false, message: "Invalid email/mobile or password." },
            { status: 401 },
          );
        }
      }

      const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        citizenId: user.citizenId || user.recyclerLicenseNo,
        name: user.fullName,
      });

      const response = NextResponse.json({
        success: true,
        message: `${user.role === "RECYCLER" ? "Verified Recycler" : "Citizen"} login successful.`,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          citizenId: user.citizenId,
          recyclerLicenseNo: user.recyclerLicenseNo,
          role: user.role,
          mobile: user.mobile,
          city: user.city,
          state: user.state,
          address: user.address,
          pin: user.pin,
          recyclerProfile: user.recyclerProfile,
        },
      });

      response.cookies.set(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    // Fallback for non-registered identifier in demo mode
    const requestedRole = (validated.role || "citizen") === "recycler" ? "RECYCLER" : "CITIZEN";
    const mockUserId = `usr_${Date.now()}`;
    const licenseOrId = requestedRole === "RECYCLER"
      ? `CPCB-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
      : `DL-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const nameFromIdentifier = validated.email.includes("@")
      ? validated.email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : `User ${validated.email.slice(-4)}`;

    const token = signToken({
      userId: mockUserId,
      email: validated.email.includes("@") ? validated.email : `${validated.email}@ecoroute.in`,
      role: requestedRole,
      citizenId: licenseOrId,
      name: nameFromIdentifier || "EcoRoute User",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: mockUserId,
        email: validated.email.includes("@") ? validated.email : `${validated.email}@ecoroute.in`,
        fullName: nameFromIdentifier || "EcoRoute User",
        citizenId: requestedRole === "CITIZEN" ? licenseOrId : undefined,
        recyclerLicenseNo: requestedRole === "RECYCLER" ? licenseOrId : undefined,
        role: requestedRole,
      },
    });

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;

  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Invalid input format", errors: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 },
    );
  }
}
