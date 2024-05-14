import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // 1. Get the user session from the request
  await dbConnect();
  const userSessionCookie = req.cookies.username;
  const user = await User.find({ username: userSessionCookie });

  // 2. Check if the user session is valid and has a non-null email
  if (typeof user === "object" && user.length > 0) {
    // User is authenticated

    return res.status(200).json(true);
  } else {
    // User is not authenticated

    return res.status(401).json(false);
  }
}
