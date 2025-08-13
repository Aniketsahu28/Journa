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
    if (!baseUrl) {
      throw new Error("Base URL is not defined in environment variables.");
    }

    const verificationUrl = `${baseUrl}/accounts/verify?token=${token}&email=${email}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<div style="font-family: Poppins, sans-serif; line-height: 1.5; padding: 20px; background-color: #f9f9f9;">
              <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #333;">Verify Your Email Address</h2>
                <p>Thank you for signing up! Please verify your email address to activate your account.</p>
      
                <a href="${verificationUrl}" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Verify Email
                </a>

                <p style="margin-top: 20px; font-size: 14px; color: #555;">
                  Or copy and paste the following link into your browser:  
                </p>
                <p style="word-break: break-all; color: #1a73e8;">${verificationUrl}</p>
      
                <hr style="margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">
                  If you did not create this account, you can ignore this email.
                </p>
              </div>
            </div>`,
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
