import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { username, password } = body;

  // 2: Check if username or password is missing and if, return 400
  if (!username || !password) {
    return new NextResponse(
      JSON.stringify({ message: "Missing username or password" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 3: Find user with provided username
  const user = await User.findOne({ username: username });

  // 4: If no user is found return 401
  if (!user) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid username or password" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 6: Check if we can't verify hashed password and password
  if (!(await bcrypt.compare(password, user.password))) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid username or password" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 7: Exclude password and prepare user object
  const { password: _, ...authenticatedUser } = user.toObject();

  // 8: Construct the response and set the username cookie
  const response = new NextResponse(
    JSON.stringify({ message: "Welcome", user: authenticatedUser }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Set cookie using NextResponse's cookie method
  response.cookies.set("username", username, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true, // Important for security
    sameSite: "strict",
  });

  return response;
}
