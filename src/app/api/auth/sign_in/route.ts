import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const secret_key: string | undefined = process.env.JWT_SECRET;
    const res: { uid: string } = await req.json();

    if (secret_key === undefined)
      throw new Error("Error en el secreto de la app.");

    const my_token: string = jwt.sign(
      {
        uid: res.uid,
      },
      secret_key
    );

    cookies().set("mySession", my_token, {
      httpOnly: true,
      sameSite: "strict",
      expires: Date.now() + 86400000 * 30, // 30 dias
    });

    return Response.json({ status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
}
