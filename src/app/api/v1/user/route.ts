/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { NextRequest } from "next/server";

import connectToDatabase from "@/mongodb/connDb";
import Role from "@/mongodb/schemas/role";
import User from "@/mongodb/schemas/user";

import { ISortOptions } from "^/@types/models/user";

export async function GET(req: NextRequest) {
  const headers = req.headers.get("Authorization");
  console.log("headers", headers);
  const { searchParams } = new URL(req.url);
  console.log("searchParams", searchParams);

  await connectToDatabase();
  const collection = await User.find({});

  // const { page = 1, limit = 1 } = req.query;

  const sortOptions: ISortOptions = {}; // Define an empty object for sort options

  // const filter = onWislistFilter(searchParams);

  // const wishlists = await User.paginate(filter, {
  //     page,
  //     limit,
  //     customLabels: MONGODB.PAGINATION_LABEL,
  //     sort: sortOptions,
  // });

  return Response.json({ product: collection }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const doCreateBranch = await Role.create({
      level: 1,
      roleName: "admin",
      isActive: true,
    });

    return Response.json({ data: doCreateBranch }, { status: 200 });
  } catch (error) {
    return Response.json({ data: null }, { status: 500 });
  }
}
