import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/utils/auth";

import { respBody, statCode } from "@/config/serverResponse";

import connectToDatabase from "@/mongodb/connDb";
import Session from "@/mongodb/schemas/session";
import User from "@/mongodb/schemas/user";

export async function GET(req: NextRequest) {
  const header = await req.headers;
  const token = header.get("Authorization")?.split(" ")[1];

  try {
    // Verify the token
    await verifyToken(String(token));

    await connectToDatabase();

    const session = await Session.findOne({ token: token }).lean();
    if (session) {
      const userCheck = await User.findById(session.userId, {
        plainPassword: 0,
        password: 0,
      });

      return NextResponse.json({ data: userCheck }, { status: 200 });
    } else {
      return NextResponse.json(
        respBody.ERROR.EXPIRED_INVALID_TOKEN,
        statCode[401]
      );
    }
  } catch (error: any) {
    if (error.code == "ERR_JWT_EXPIRED") {
      return NextResponse.json(
        respBody.ERROR.EXPIRED_INVALID_TOKEN,
        statCode[401]
      );
    }
    return NextResponse.json(
      { ...respBody.ERROR.UNEXPECTED_ERROR },
      statCode[401]
    );
  }
}
