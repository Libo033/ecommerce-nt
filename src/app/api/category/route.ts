import clientPromise from "@/libs/mongodb";
import { Db, MongoClient } from "mongodb";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { JWTPayload, JWTVerifyResult, jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function GET(req: Request) {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("ecommerce");
    const categorias = await db.collection("categorias").find().toArray();

    return Response.json({ code: 200, categorias }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ code: 500, Error: error }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
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
        const client: MongoClient = await clientPromise;
        const db: Db = client.db("ecommerce");
        const data = await req.json();

        const new_category = {
          nombre: data.nombre,
        };

        const created_category = await db
          .collection("categorias")
          .insertOne(new_category);

        return Response.json(
          {
            code: 201,
            created: created_category.acknowledged,
            id: created_category.insertedId,
          },
          { status: 201 }
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

/*
export async function POST(req: Request) {
  // CREATE NOTE
  try {
    const client: MongoClient = await clientPromise;
    const mySession: RequestCookie | undefined = cookies().get("mySession");
    let secret_key: Uint8Array = new TextEncoder().encode(
      process.env.JWT_SECRET
    );
    const data = await req.json();

    if (mySession === undefined) {
      return Response.json({ Error: "Account doesn't exist" }, { status: 401 });
    }

    const value: JWTVerifyResult<JWTPayload> = await jwtVerify(
      mySession.value,
      secret_key
    );

    if (typeof value.payload.uid !== "string") {
      throw new Error();
    }

    const db: Db = client.db(value.payload.uid);

    const new_note = {
      title: data.title,
      content: data.content,
      create_date: new Date().toLocaleString(),
      expire_date: data.expire_date,
    };

    const new_note_created = await db.collection("notes").insertOne(new_note);

    return Response.json(
      { created: new_note_created.acknowledged },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ Error: error.message }, { status: 500 });
    }
  }
}
*/
