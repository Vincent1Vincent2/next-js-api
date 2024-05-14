import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../../models/posts";
import User from "../../../../../models/user";
import dbConnect from "../../../../../util/dbConnect";
import IUser from "../../posts/[id]/route";

export const GET = async (req: NextRequest, res: NextResponse) => {
  // 1: Get all posts
  await dbConnect();

  const userSessionCookie = req.cookies.get("username");
  const user: IUser | null = await User.findOne({
    username: userSessionCookie?.value,
  });

  // 3: Find and save the posts for the user
  if (user) {
    const posts = await Post.find({ author: user._id }).lean().exec();
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
    });
  } else {
    return new NextResponse(JSON.stringify("User not found"), {
      status: 404,
    });
  }
};
