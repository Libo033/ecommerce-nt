import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    const secret_key = new TextEncoder().encode(process.env.JWT_SECRET);
    const my_session = cookies().get("mySession"); // ERROR NO RECIBE COOKIES

    if (my_session) {
      const data = await jwtVerify(my_session.value, secret_key);
      const uid: string =
        typeof data.payload.uid === "string" ? data.payload.uid : "";

      const isAdmin = await getDoc(doc(db, "users", uid));
      console.log(isAdmin);
    }

    return Response.json({ isAdmin: false }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(
        { error: error.message, isAdmin: false },
        { status: 500 }
      );
    }
  }
}
