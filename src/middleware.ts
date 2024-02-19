import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const mySession = request.cookies.get("mySession");
  const secret_key: Uint8Array = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  if (mySession) {
    const { payload } = await jwtVerify(mySession.value, secret_key);
    const res = await fetch(
      `http://localhost:3000/api/auth/is_admin/${payload.uid}`
    );
    const { isAdmin }: { isAdmin: boolean } = await res.json();

    if (isAdmin) return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
