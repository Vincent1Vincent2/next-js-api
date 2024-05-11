import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/posts";
import dbConnect from "../../../util/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    // 1: Get all posts
    const posts = await Post.find().lean().exec();

    res.status(200).json(posts);
  }
}
