import { connect } from "@/db_config/db_config";
import User from "@/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { password, confirmPassword, token } = requestBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    console.log(user);

    return NextResponse.json(
      { message: "Password Reset Successfuly", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
