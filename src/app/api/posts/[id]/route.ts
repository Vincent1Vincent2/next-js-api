import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../../models/posts";
import User from "../../../../../models/user";
import dbConnect from "../../../../../util/dbConnect";

export const dynamic = "force-dynamic";

export default interface IUser {
  _id: string;
  username: string;
  isAdmin: boolean;
}

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

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();

    const id = req.nextUrl.pathname.split("/").pop();

    const userSessionCookie = req.cookies.get("username");
    const user: IUser | null = await User.findOne({
      username: userSessionCookie?.value,
    });

    if (!id) {
      return new NextResponse(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
      });
    }

    const post = await Post.findById(id);

    console.log("this is user", user);
    console.log("this is post", post);

    if (!post) {
      console.log("No post found for ID:", id);
      return new NextResponse(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    // 7: If user is admin, DELETE
    if (user!.isAdmin === true) {
      await post?.deleteOne();
      return new NextResponse(JSON.stringify({ message: "Post deleted" }), {
        status: 200,
      });
    }

    // 8: If posts author is not the same as current users id return 403
    if (post.author.toString() !== user!._id.toString()) {
      return new NextResponse(JSON.stringify({ message: "Not authorized" }), {
        status: 403,
      });
    }

    console.log("Fetched post:", post);
    return new NextResponse(
      JSON.stringify({ message: "Post has been deleted" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 404 }
    );
  }
}
