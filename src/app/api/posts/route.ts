import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../models/posts";
import { default as User } from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";
import IUser from "./[id]/route";
export const dynamic = "force-dynamic";

export const GET = async () => {
  // 1: Get all posts
  await dbConnect();

  const posts = await Post.find().lean().exec();

  return Response.json(posts);
};

export const POST = async (req: NextRequest) => {
  await dbConnect();

  const body = await req.json();
  const { title, content, imageId, price, imagesContainer } = body;

  const userSessionCookie = req.cookies.get("username");
  const user: IUser | null = await User.findOne({
    username: userSessionCookie?.value,
  });

  if (typeof title !== "string") {
    return NextResponse.json({ error: "Title Required" }, { status: 400 });
  }

  if (typeof content !== "string") {
    return NextResponse.json({ error: "Content Required" }, { status: 400 });
  }

  if (!imageId || !imagesContainer) {
    return NextResponse.json({ error: "Image Required" }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  let newImagesContainer = imagesContainer.map(
    (img: { imageId: string }) => img.imageId
  );

  const post = await Post.create({
    title: title,
    content: content,
    imageId: imageId.imageId,
    price: price,
    author: user?._id,
    username: user.username,
    imagesContainer: newImagesContainer,
  });

  return new NextResponse(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
