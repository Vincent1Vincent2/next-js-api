// API route to fetch image
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getImageBucket } from "../../../models/image";
import User from "../../../models/user";
import dbConnect from "../../../util/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await dbConnect();

    const userSessionCookie = req.cookies.username;
    if (!userSessionCookie) {
      // User session cookie not found, user is not authenticated
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the user by username in the database
    const user = await User.findOne({ username: userSessionCookie });
    if (!user) {
      // User not found in the database, user is not authenticated
      return res.status(401).json({ message: "Unauthorized" });
    }

    {
      const id = new Types.ObjectId(process.env.IMAGE_KEY!);
      const imageBucket = getImageBucket();

      // Hämta bildens metadata så att vi kan sätta content-type till rätt värde.
      const imageData = await imageBucket.find({ _id: id }).next();
      if (!imageData) return res.status(404).json("Image does not exists");
      res.setHeader("Content-Type", imageData.metadata?.contentType);

      // Skickar bilden som ett svar till klienten
      imageBucket.openDownloadStream(id).pipe(res);
    }
  }
}
