import User from "@/models/user_model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

type SendEmailType = {
  email: string;
  emailType: string;
  userId: string;
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailType) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    switch (emailType) {
      case "VERIFY":
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
      case "RESET":
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: String(process.env.SMTP_USERNAME),
        pass: String(process.env.SMTP_PASSWORD),
      },
    });

    const mailOptions = {
      from: "kishan@test.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click
          <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset-password"}?token=${hashedToken}">here
          </a> to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          }.
        </p>
      `,
    };

    const mailresponse = await transporter.sendMail(mailOptions);

    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
