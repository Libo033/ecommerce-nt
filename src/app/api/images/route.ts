import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mySession = req.cookies.get("mySession");
    const secret_key: Uint8Array = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    if (mySession) {
      const { payload } = await jwtVerify(mySession.value, secret_key);
      const res = await fetch(
        `http://localhost:3000/api/auth/is_admin/${payload.uid}`
      );
      const { isAdmin }: { isAdmin: boolean } = await res.json();

      if (isAdmin) {
        return Response.json(
          {
            code: 200,
          },
          { status: 200 }
        );
      } else {
        return Response.json(
          { code: 403, Error: "invalid_token" },
          { status: 403 }
        );
      }
    }

    return Response.json(
      { code: 401, Error: "token_not_found" },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ code: 500, Error: error }, { status: 500 });
    }
  }
}
