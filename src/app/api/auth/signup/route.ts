import { hashPassword } from "@/lib/bcrypt";
import { sendVerificationEmail } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/utils/generateVerificationToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password, dateOfBirth } = await req.json();

  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (userAlreadyExists) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    },
  });

  const token = await generateVerificationToken(email);

  sendVerificationEmail(email, token.token);

  return NextResponse.json({ user }, { status: 200 });
}
