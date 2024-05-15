import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user";
import dbConnect from "../../../../../util/dbConnect";

export async function PUT(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").pop();
  const userSessionCookie = req.cookies.get("username");

  const adminUser = await User.findOne({ username: userSessionCookie?.value });

  if (!adminUser || !adminUser.isAdmin) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 403 });
  }

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ error: "No user found" }, { status: 404 });
  }

  if (user.isAdmin) {
    user.isAdmin = false;
    await user.save();
  } else {
    user.isAdmin = true;
    await user.save();
  }

  return NextResponse.json({ message: "User made admin" }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").pop();

  const userSessionCookie = req.cookies.get("username");

  const adminUser = await User.findOne({ username: userSessionCookie?.value });

  if (!adminUser || !adminUser.isAdmin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await User.deleteOne({ username: user.username });

  return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}
