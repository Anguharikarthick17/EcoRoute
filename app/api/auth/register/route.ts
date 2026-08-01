import { NextResponse } from "next/server";
import { RegisterSchema, RecyclerRegisterSchema } from "@/lib/zod";
import { hashPassword, signToken } from "@/lib/auth";
import { createUser, createRecycler, findUserByEmail } from "@/lib/user-store";

const TOKEN_NAME = "ecoroute_token";

function setCookieOnResponse(response: NextResponse, token: string): NextResponse {
  response.cookies.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600, // Exactly 1 hour
    path: "/",
  });
  return response;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const roleType = (body.role || "citizen").toLowerCase();

    if (roleType === "recycler") {
      const validated = RecyclerRegisterSchema.parse(body);

      const existingUser = await findUserByEmail(validated.email);
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: "An account with this email address already exists." },
          { status: 400 },
        );
      }

      const passwordHash = await hashPassword(validated.password);

      const newRecycler = await createRecycler({
        shopName: validated.shopName,
        ownerName: validated.ownerName,
        email: validated.email,
        mobile: validated.mobile,
        passwordHash: passwordHash,
        aadhaarNumber: validated.aadhaarNumber,
        aadhaarVerified: validated.aadhaarVerified ?? true,
        shopAddress: validated.shopAddress,
        city: validated.city,
        district: validated.district,
        state: validated.state,
        pincode: validated.pincode,
        latitude: validated.latitude || "",
        longitude: validated.longitude || "",
        businessType: validated.businessType,
        acceptedEWaste: validated.acceptedEWaste,
        documents: {
          shopPhoto: validated.shopPhoto || "uploaded_shop.jpg",
          shopLicense: validated.shopLicense || "uploaded_license.pdf",
          ownerIdProof: validated.ownerIdProof || "uploaded_id.pdf",
        },
      });

      const token = signToken({
        userId: newRecycler.id,
        email: newRecycler.email,
        role: newRecycler.role,
        citizenId: newRecycler.recyclerLicenseNo,
        name: newRecycler.fullName,
      });

      const response = NextResponse.json(
        {
          success: true,
          message: "Verified Recycler account registered successfully.",
          user: {
            id: newRecycler.id,
            fullName: newRecycler.fullName,
            email: newRecycler.email,
            recyclerLicenseNo: newRecycler.recyclerLicenseNo,
            role: newRecycler.role,
            mobile: newRecycler.mobile,
            city: newRecycler.city,
            state: newRecycler.state,
            address: newRecycler.address,
            pin: newRecycler.pin,
            recyclerProfile: newRecycler.recyclerProfile,
          },
        },
        { status: 201 },
      );

      return setCookieOnResponse(response, token);
    }

    // Default Citizen Flow
    const validated = RegisterSchema.parse(body);

    const existingUser = await findUserByEmail(validated.email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "An account with this email address already exists." },
        { status: 400 },
      );
    }

    const passwordHash = await hashPassword(validated.password);
    const pin = validated.pin || validated.pinCode || "";

    const newUser = await createUser({
      fullName: validated.fullName,
      email: validated.email,
      mobile: validated.mobile,
      passwordHash: passwordHash,
      address: validated.address,
      city: validated.city,
      state: validated.state,
      pin: pin,
    });

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      citizenId: newUser.citizenId,
      name: newUser.fullName,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Citizen account registered successfully.",
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          citizenId: newUser.citizenId,
          role: newUser.role,
          mobile: newUser.mobile,
          city: newUser.city,
          state: newUser.state,
          address: newUser.address,
          pin: newUser.pin,
        },
      },
      { status: 201 },
    );

    return setCookieOnResponse(response, token);

  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || "Registration failed" },
      { status: 500 },
    );
  }
}
