import clientPromise from "@/libs/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { JWTPayload, JWTVerifyResult, jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("ecommerce");
    const categoria = await db
      .collection("categorias")
      .findOne({ _id: new ObjectId(params.id) });

    return Response.json({ code: 200, categoria }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ code: 500, Error: error }, { status: 500 });
    }
  }
}

export async function PUT(
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
        const client: MongoClient = await clientPromise;
        const db: Db = client.db("ecommerce");
        const data = await req.json();

        const modified_category = await db
          .collection("categorias")
          .findOneAndUpdate(
            { _id: new ObjectId(params.id) },
            { $set: { nombre: data.nombre } }
          );

        return Response.json(
          {
            code: 200,
            modified: modified_category,
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

export async function DELETE(
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
        const client: MongoClient = await clientPromise;
        const db: Db = client.db("ecommerce");

        const deleted_category = await db
          .collection("categorias")
          .deleteOne({ _id: new ObjectId(params.id) });

        return Response.json(
          {
            code: 200,
            deleted: deleted_category.acknowledged,
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
