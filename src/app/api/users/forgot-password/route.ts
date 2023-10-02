import { connect } from "@/db_config/db_config";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/user_model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email } = requestBody;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json({ error: "No User found" }, { status: 404 });
    }

    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json(
      { message: "Email Sent", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
