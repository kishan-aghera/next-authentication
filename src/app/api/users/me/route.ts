import { connect } from "@/db_config/db_config";
import { getDataFromToken } from "@/helpers/get_data_from_token";
import User from "@/models/user_model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findById(userId).select(
      "-password -isVerified -isAdmin"
    );

    return NextResponse.json(
      {
        message: "User found",
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
