import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Clear the username cookie
    res.setHeader("Set-Cookie", "username=; Path=/; Max-Age=0");

    const message = { message: "Logged out successfully" };
    return res.status(200).json(message);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}