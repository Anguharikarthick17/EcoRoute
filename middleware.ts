import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware is kept minimal — auth checking is handled client-side
// to avoid cookie timing issues with the App Router
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
