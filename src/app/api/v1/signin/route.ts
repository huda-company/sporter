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
    if (!userCheck)
      return NextResponse.json(respBody.ERROR.UNKNOWN_EMAIL, statCode[400]);

    //matching password
    const isPasswordValid = await bcrypt.compare(password, userCheck.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        respBody.ERROR.INC_EMAIL_PASSWORD,
        statCode[400]
      );
    }

    //checking user session
    const checkUsrSession = await Session.findOne({ userId: userCheck.id });

    if (!checkUsrSession) {
      const generatedtoken = await generateToken(userCheck?.id);
      await saveTokenSessionToDB(generatedtoken);

      return NextResponse.json(
        {
          ...respBody.SUCCESS.SIGN_IN_SUCCESS,
          data: userCheck,
          token: generatedtoken,
        },
        statCode[200]
      );
    }

    // Verify the token
    let userToken = checkUsrSession.token;
    const verifToken = await verifyToken(String(checkUsrSession.token));

    //perform regenerate JWT token
    if (!verifToken) {
      const jwtToken = await generateToken(userCheck?.id);
      await saveTokenSessionToDB(jwtToken);
      userToken = jwtToken;
    }

    return NextResponse.json(
      {
        ...respBody.SUCCESS.SIGN_IN_SUCCESS,
        data: userCheck,
        token: userToken,
      },
      statCode[200]
    );
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
    return NextResponse.json(
      { ...respBody.ERROR.UNEXPECTED_ERROR },
      statCode[500]
    );
  }
}
