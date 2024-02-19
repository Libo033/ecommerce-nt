import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (true) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
