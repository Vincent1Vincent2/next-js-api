import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";

export async function GET(req: NextRequest, res: NextResponse) {
  // 1. Get the user session from the request
  await dbConnect();
  const userSessionCookie = req.cookies.get("username");
  const user = await User.find({ username: userSessionCookie });

  // 2. Check if the user session is valid and has a non-null email
  if (typeof user === "object" && user.length > 0) {
    // User is authenticated

    return NextResponse.json(user, { status: 200 });
  } else {
    // User is not authenticated
    return NextResponse.json("No", { status: 401 });
  }
}
