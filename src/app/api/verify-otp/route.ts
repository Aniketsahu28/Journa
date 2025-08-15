import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const userEnteredOtp = searchParams.get("userEnteredOtp");

    if (!email || !userEnteredOtp) {
      return NextResponse.json(
        { error: "Missing email or OTP" },
        { status: 400 }
      );
    }

    const otp = await prisma.otp.findUnique({
      where: {
        email: email,
      },
      select: {
        otp: true,
      },
    });

    if (!otp) {
      return NextResponse.json(
        { error: "OTP expired. Request new OTP" },
        { status: 400 }
      );
    }

    if (userEnteredOtp != otp.otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    } else {
      await prisma.otp.delete({
        where: {
          email: email,
        },
      });

      return NextResponse.json(
        { message: "OTP verified successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
