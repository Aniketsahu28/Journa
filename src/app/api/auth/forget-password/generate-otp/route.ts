import { sendForgotPasswordOtp } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { generateOTP } from "@/lib/utils/generateOtp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const userWithEmailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userWithEmailExist) {
      return NextResponse.json(
        { error: "User with this email doesn't exist." },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 60); //Expires in 10 minutes

    //Delete already existing otp's of the user
    await prisma.otp.deleteMany({
      where: {
        email: email,
      },
    });

    //Create the new otp
    await prisma.otp.create({
      data: {
        email: email,
        otp: otp,
        expires: expiresAt,
      },
    });

    await sendForgotPasswordOtp(email, otp);

    return NextResponse.json(
      { message: "Otp sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error. ${error}` },
      { status: 500 }
    );
  }
}
