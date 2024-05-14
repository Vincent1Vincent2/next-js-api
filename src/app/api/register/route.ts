import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { username, password } = body;
    await dbConnect();

    // 2: Check if username or password is missing and if, return 400
    if (!username || !password) {
      return NextResponse.json("Missing username or password", { status: 400 });
    }

    // 3: Find user with provided username
    const user = await User.findOne({ username: username });

    // 6: If username is taken, return 409
    if (user) {
      return NextResponse.json("Username is already taken", { status: 409 });
    }

    // 6: If we can't verify hashed password and password from
    if (!(await bcrypt.compare(password, user.password))) {
      return NextResponse.json("Invalid username or password", { status: 401 });
    }

    // 7: Spread user to remove password
    const { password: _, ...authenticatedUser } = (user as any).toObject();

    const message = { message: "Registered" };

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error in API route:", error);
  }
}
