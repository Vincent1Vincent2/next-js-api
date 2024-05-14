import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Clear the username cookie
  res.setHeader("Set-Cookie", "username=; Path=/; Max-Age=0");

  const message = { message: "Logged out successfully" };
  return res.status(200).json(message);
}
