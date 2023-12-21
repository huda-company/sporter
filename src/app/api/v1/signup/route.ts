import { NextRequest, NextResponse } from "next/server";

import connectToDatabase from "@/mongodb/connDb";
import User from "@/mongodb/schemas/user";

export async function POST(req: NextRequest) {
  const { email, name, password, phone, birthDate, roles } = await req.json();

  try {
    await connectToDatabase();

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return NextResponse.json({ data: "email exist" }, { status: 400 });
    } else {
      const newUser = await User.create({
        name: name,
        email: email,
        password: password,
        plainPassword: password,
        phone: phone,
        birthDate: birthDate,
        roles: roles,
      });
      return NextResponse.json({ data: newUser }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
