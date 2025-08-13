import { sendVerificationEmail } from "@/lib/nodemailer";
import { generateVerificationToken } from "@/lib/utils/generateVerificationToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const token = await generateVerificationToken(email);
  await sendVerificationEmail(email, token.token);

  return NextResponse.json(
    { message: "Verification email sent." },
    { status: 201 }
  );
}
