import { hashPassword } from "@/lib/bcrypt";
import { sendVerificationEmail } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/utils/generateVerificationToken";
import { NextRequest, NextResponse } from "next/server";
import { ZUserSignupSchema } from "@/zod/ZUserSignup";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, dateOfBirth } = await req.json();
    const result = ZUserSignupSchema.safeParse({
      name,
      email,
      password,
      dateOfBirth,
    });

    if (result.success) {
      const userAlreadyExists = await prisma.user.findFirst({
        where: {
          email: result.data.email,
        },
      });

      if (userAlreadyExists) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 400 }
        );
      }

      const hashedPassword = await hashPassword(result.data.password);
      await prisma.user.create({
        data: {
          name: result.data.name,
          email: result.data.email,
          password: hashedPassword,
          dateOfBirth: result.data.dateOfBirth,
        },
      });

      const token = await generateVerificationToken(result.data.email);
      await sendVerificationEmail(result.data.email, token.token);
      return NextResponse.json({ message: "Signup successfull. Welcome to Journa!" }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: z.flattenError(result.error).fieldErrors },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
