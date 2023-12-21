import { NextRequest, NextResponse } from "next/server";

import connectToDatabase from "@/mongodb/connDb";
import Session from "@/mongodb/schemas/session";

export async function GET(req: NextRequest) {
  const header = await req.headers;
  const token = header.get("Authorization")?.split(" ")[1] ?? "";

  try {
    // Verify the token
    // const secret = new TextEncoder().encode(
    //     process.env.NEXTAUTH_SECRET,
    // )
    // const { payload } = await jose.jwtVerify(String(token), secret)

    await connectToDatabase();
    await Session.findOneAndDelete({ token: token });

    return NextResponse.json(
      { message: "Successfully logout" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code == "ERR_JWT_EXPIRED") {
      return NextResponse.json(
        { message: "token is expired" },
        { status: 401 }
      );
    }
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
