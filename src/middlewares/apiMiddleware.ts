import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

import { respBody, statCode } from "@/config/serverResponse";

export const apiMware = async (req: NextRequest) => {
  const url = req.url;

  try {
    const token = await req.headers.get("authorization")?.split(" ")[1];

    if (!url.includes("signin") && !url.includes("signup")) {
      // Verify the token
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
      await jose.jwtVerify(String(token), secret);

      return NextResponse.next();
    }
  } catch (error: any) {
    //expected catched from jose
    if (error.code == "ERR_JWT_EXPIRED") {
      return NextResponse.json(
        respBody.ERROR.EXPIRED_INVALID_TOKEN,
        statCode[401]
      );
    }
  }
};
