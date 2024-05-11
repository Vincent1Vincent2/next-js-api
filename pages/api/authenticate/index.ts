import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import dbConnect from "../../../util/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // 1. Get the user session from the request
    await dbConnect();
    console.log("in");
    const userSessionCookie = req.cookies.username;
    const user = await User.find({ username: userSessionCookie });

    // 2. Check if the user session is valid and has a non-null email
    if (typeof userSessionCookie === "string") {
      // User is authenticated

      return res.status(200).json(user);
    } else {
      // User is not authenticated

      return res.status(401).json("Not supposed to be here?");
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
