import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/libs/cloudinary";

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
        const body = await req.json();

        const data: UploadApiResponse = await cloudinary.uploader.upload(
          body.url,
          { upload_preset: "05-ecommerce" }
        );

        return Response.json(
          {
            code: 200,
            data,
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
    return Response.json({ code: 500, Error: error }, { status: 500 });
  }
}
