import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../../models/posts";
import dbConnect from "../../../../../util/dbConnect";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return new NextResponse(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  try {
    const post = await Post.findById(id).lean().exec();

    if (!post) {
      console.log("No post found for ID:", id);
      return new NextResponse(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    console.log("Fetched post:", post);
    return new NextResponse(JSON.stringify(post), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
