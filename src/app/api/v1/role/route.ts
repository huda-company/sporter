import { NextRequest, NextResponse } from "next/server";

import { MONGODB } from "@/config/mongodb";
import { respBody, statCode } from "@/config/serverResponse";

import connectToDatabase from "@/mongodb/connDb";
import Role from "@/mongodb/schemas/role";

import { onRoleFilter } from "./config/filter";

import { ISortOptions } from "^/@types/models/user";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  await connectToDatabase();

  const page = Number(searchParams.get("page")) ?? 1;
  const limit = Number(searchParams.get("limit")) ?? 10;

  const sortOptions: ISortOptions = {}; // Define an empty object for sort options

  const filter = onRoleFilter(searchParams as any);

  const wishlists = await Role.paginate(filter, {
    page,
    limit,
    customLabels: MONGODB.PAGINATION_LABEL,
    sort: sortOptions,
  });

  return NextResponse.json({ data: wishlists }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { level, roleName, description, isActive } = await req.json();

  await connectToDatabase();
  try {
    const dataToInsert = {
      level: level,
      roleName: roleName,
      description: description ?? "",
      isActive: isActive,
    };

    const role = await Role.create(dataToInsert);

    return NextResponse.json(
      { ...respBody.SUCCESS.RETRIEVED_DATA_SUCCESS, data: role },
      statCode[200]
    );
  } catch (error) {
    return NextResponse.json(
      { ...respBody.ERROR.UNEXPECTED_ERROR },
      { status: 500 }
    );
  }
}
