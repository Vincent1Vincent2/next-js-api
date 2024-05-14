import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // Clear the username cookie

  res.cookies.set("username", ";", {
    path: "/",
    maxAge: 0,
    httpOnly: true, // Important for security
    sameSite: "strict",
  });

  const message = { message: "Logged out successfully" };
  const response = new NextResponse(JSON.stringify({ message: message }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
