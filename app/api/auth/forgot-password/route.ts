import { NextResponse } from "next/server";
import { ForgotPasswordSchema } from "@/lib/zod";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ForgotPasswordSchema.parse(body);

    const resetToken = `rst_${Date.now()}`;
    await sendPasswordResetEmail(validated.email, resetToken);

    return NextResponse.json({
      success: true,
      message: "If an account exists, a password reset email has been sent.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Invalid email request" },
      { status: 400 },
    );
  }
}
