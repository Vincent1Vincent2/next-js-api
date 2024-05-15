import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";
export const dynamic = "force-dynamic";

export const GET = async () => {
  // 1: Get all posts
  await dbConnect();

  const users = await User.find().lean().exec();

  return Response.json(users);
};
