import { NextResponse } from "next/server";
import { ResetPasswordSchema } from "@/lib/zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ResetPasswordSchema.parse(body);

    return NextResponse.json({
      success: true,
      message: "Password reset successful. You may now login with your new password.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired reset token" },
      { status: 400 },
    );
  }
}
