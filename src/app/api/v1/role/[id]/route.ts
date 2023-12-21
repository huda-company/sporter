import { NextRequest, NextResponse } from "next/server";

import connectToDatabase from "@/mongodb/connDb";
import Role from "@/mongodb/schemas/role";

export async function GET(req: NextRequest, context: { params: any }) {
  const { id } = context.params;
  if (!id) {
    return NextResponse.json({ message: "unknown id" }, { status: 404 });
  }

  await connectToDatabase();

  const findRole = await Role.findById(id);
  if (findRole) {
    return NextResponse.json({ data: findRole }, { status: 200 });
  } else {
    return NextResponse.json({ message: "unknown id" }, { status: 404 });
  }
}
