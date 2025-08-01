import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();

    if (!newPassword) {
      return NextResponse.json(
        { error: "New Password cannot be empty" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: newPassword,
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
