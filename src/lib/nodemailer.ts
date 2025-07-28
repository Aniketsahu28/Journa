import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl)
      throw new Error("Base URL is not defined in environment variables.");

    const verificationUrl = `${baseUrl}/verify?token=${token}&email=${email}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<a href="${verificationUrl}">Click here to verify your email for Journa</a>`,
    });
  } catch (error) {
    throw new Error(`Failed to send verification email. Error: ${error}`);
  }
}
