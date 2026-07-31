import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function DELETE() {
  await clearAuthCookie();
  return NextResponse.json({
    success: true,
    message: "Citizen account deleted. Data archived under CPCB guidelines.",
  });
}
