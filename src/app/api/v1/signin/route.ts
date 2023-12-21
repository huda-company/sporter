import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { generateToken, saveTokenSessionToDB, verifyToken } from "@/utils/auth";

import { respBody, statCode } from "@/config/serverResponse";

import connectToDatabase from "@/mongodb/connDb";
import Session from "@/mongodb/schemas/session";
import User from "@/mongodb/schemas/user";
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    await connectToDatabase();

    const userCheck = await User.findOne({ email: email });
    if (userCheck) {
      const isPasswordValid = await bcrypt.compare(
        password,
        userCheck.password
      );
      if (isPasswordValid) {
        const checkUsrSession = await Session.findOne({ userId: userCheck.id });
        if (checkUsrSession) {
          // Verify the token
          await verifyToken(String(checkUsrSession.token));
          return NextResponse.json(
            { data: userCheck, token: checkUsrSession.token },
            statCode[200]
          );
        } else {
          const jwtToken = await generateToken(userCheck?.id);
          await saveTokenSessionToDB(jwtToken);

          return NextResponse.json(
            { data: userCheck, token: jwtToken },
            statCode[200]
          );
        }
      } else {
        return NextResponse.json(
          respBody.ERROR.INC_EMAIL_PASSWORD,
          statCode[400]
        );
      }
    } else {
      return NextResponse.json(respBody.ERROR.UNKNOWN_EMAIL, statCode[400]);
    }
  } catch (error: any) {
    if (error.code == "ERR_JWT_EXPIRED") {
      await connectToDatabase();

      const userCheck = await User.findOne(
        { email: email },
        { plainPassword: 0, password: 0 }
      );

      const jwtToken = await generateToken(userCheck?.id);
      await saveTokenSessionToDB(jwtToken);

      return NextResponse.json(
        { data: userCheck, token: jwtToken },
        statCode[200]
      );
    }
    return Response.json({ data: null }, statCode[500]);
  }
}
