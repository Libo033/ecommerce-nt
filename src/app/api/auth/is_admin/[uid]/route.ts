import { db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const uid: string = params.uid;

    if (uid) {
      const isAdmin = await getDoc(doc(db, "users", uid));

      if (isAdmin.data()?.role === "admin")
        return Response.json({ isAdmin: true }, { status: 200 });
    }

    return Response.json({ isAdmin: false }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error, isAdmin: false }, { status: 500 });
    }
  }
}
