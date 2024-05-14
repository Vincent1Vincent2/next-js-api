import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // Clear the username cookie

  const response = new NextResponse(JSON.stringify({ message: "Logged Out" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Set cookie using NextResponse's cookie method
  response.cookies.set("username", "", {
    path: "/",
    maxAge: -1, // 7 days
    httpOnly: true, // Important for security
    sameSite: "strict",
  });

  return response;
}
