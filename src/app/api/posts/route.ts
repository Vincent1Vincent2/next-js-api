import Post from "../../../../models/posts";
import dbConnect from "../../../../util/dbConnect";
export const dynamic = "force-dynamic";

export const GET = async () => {
  // 1: Get all posts
  await dbConnect();

  const posts = await Post.find().lean().exec();

  return Response.json(posts);
};
