import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/utils/sendMail";

import { respBody, statCode } from "@/config/serverResponse";

import { SignupVerifEmailTemplate } from "@/templates/email/EmailVerification";

import connectToDatabase from "@/mongodb/connDb";
import User from "@/mongodb/schemas/user";

export async function POST(req: NextRequest) {
  const { email, name, password, phone, birthDate, gender } = await req.json();

  try {
    await connectToDatabase();

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return NextResponse.json(
        respBody.ERROR.EMAIL_OR_PHONE_ALREADY_REGISTERED,
        statCode[400]
      );
    } else {
      //create new user on mongodb
      const newUser = await User.create({
        name: name,
        email: email,
        password: password,
        plainPassword: password,
        phone: phone,
        birthDate: birthDate,
        gender: gender,
        roles: ["65747721e91490d7ca9f0b32"],
      });

      //create verifCode
      const encodeNewUser = await moment.now();

      await User.findByIdAndUpdate(
        newUser.id,
        { $set: { emailVerifCode: encodeNewUser } },
        { new: true }
      );

      //send verif email
      const htmlTemplate = await SignupVerifEmailTemplate({
        logo: "https://i.ibb.co/hBncy2h/sporter-logo.png",
        headline: "Email Verification",
        verifCode: encodeNewUser,
        name: name,
        footer: "Everything about sports",
      });

      const emailParam = {
        to: email,
        subject: "SPORTER Email Verification",
        text: "This is a plain text email.",
        html: htmlTemplate,
      };

      sendEmail(emailParam);

      return NextResponse.json(
        { ...respBody.SUCCESS.NEW_USER_CREATE, success: true, data: newUser },
        statCode[200]
      );
    }
  } catch (error) {
    return NextResponse.json(
      { ...respBody.ERROR.UNEXPECTED_ERROR },
      statCode[500]
    );
  }
}
