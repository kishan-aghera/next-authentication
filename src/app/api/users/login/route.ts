import User from "@/models/user_model";
import { connect } from "@/db_config/db_config";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // Check if User exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    // Check if Password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    // Create token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
