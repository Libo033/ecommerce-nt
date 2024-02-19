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

/*
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  // EDIT 1 NOTE
  try {
    const client: MongoClient = await clientPromise;
    const mySession: RequestCookie | undefined = cookies().get("mySession");
    const id = params.id;
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

    const edit_note = {
      title: data.title,
      content: data.content,
      expire_date: data.expire_date,
    };

    const edit_note_edited = await db
      .collection("notes")
      .updateOne({ _id: new ObjectId(id) }, { $set: edit_note });

    return Response.json(edit_note_edited.acknowledged, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ Error: error.message }, { status: 500 });
    }
  }
}
*/
