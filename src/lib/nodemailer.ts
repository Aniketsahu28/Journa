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
    throw new Error(`Failed to send verification email`);
  }
}

export async function sendForgotPasswordOtp(email: string, otp: string) {
  try {
    const OTP_CODE = `${otp}`;

    await sendEmail({
      to: email,
      subject: "One-Time Password (OTP) for Account Verification",
      html: `<body>
                <p>Hi there,</p>
                <p>Your One-Time Password (OTP) is:</p>
                <h2>${OTP_CODE}</h2>
                <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
                <p>If you didn't request this, you can ignore this email.</p>
                <p>Thanks,<br/>Journa</p>
            </body>`,
    });
  } catch (error) {
    throw new Error(`Failed to send otp email`);
  }
}
