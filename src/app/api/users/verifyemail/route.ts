import { connect } from "@/db_config/db_config";
import User from "@/models/user_model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email Verified", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
