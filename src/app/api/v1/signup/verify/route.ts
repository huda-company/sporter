import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

import { getTokenFromRequest, verifyToken } from "@/utils/auth";

import { respBody, statCode } from "@/config/serverResponse";

import connectToDatabase from "@/mongodb/connDb";
import User from "@/mongodb/schemas/user";

export async function POST(req: NextRequest) {
  const { type, code } = await req.json();

  if (type == "phone")
    return NextResponse.json(
      { ...respBody.ERROR.FEATURE_IS_DISABLE },
      statCode[400]
    );

  try {
    await connectToDatabase();

    const token = await getTokenFromRequest(req);
    const tokenInfo = await verifyToken(token);

    if (!tokenInfo) {
      return NextResponse.json(
        respBody.ERROR.EXPIRED_INVALID_TOKEN,
        statCode[401]
      );
    }

    const checkUser = await User.findById(String(tokenInfo.userId));

    if (
      typeof checkUser?.emailVerifAt !== "undefined" &&
      typeof checkUser?.emailVerifCode !== "undefined" &&
      checkUser?.emailVerifCode != null
    ) {
      return NextResponse.json(
        { ...respBody.ERROR.EMAIL_ALREADY_VERIFIED },
        statCode[400]
      );
    }

    if (!checkUser?.emailVerifCode) {
      return NextResponse.json(
        respBody.ERROR.EMAIL_VERIF_CODE_EMPTY,
        statCode[400]
      );
    }

    //if code !== code from DB
    if (String(code) !== String(checkUser.emailVerifCode)) {
      return NextResponse.json(
        respBody.ERROR.EMAIL_VERIF_CODE_MISMATCH,
        statCode[400]
      );
    }

    await User.findByIdAndUpdate(
      checkUser.id,
      { $set: { emailVerifAt: moment.now() } }, // Update the 'age' field
      { new: true }
    );

    return NextResponse.json(
      respBody.SUCCESS.EMAIL_VERIF_SUCCESS,
      statCode[200]
    );
  } catch (error) {
    return NextResponse.json(
      { ...respBody.ERROR.UNEXPECTED_ERROR },
      statCode[500]
    );
  }
}
