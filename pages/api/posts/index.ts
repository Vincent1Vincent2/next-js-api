import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/posts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1: Get all posts
  const posts = await Post.find().lean().exec();

  res.status(200).json(posts);
}
