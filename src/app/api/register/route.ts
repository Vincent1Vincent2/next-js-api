import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;
    await dbConnect();

    // 2: Check if username or password is missing and if, return 400
    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }

    // 3: Find user with provided username
    const user = await User.findOne({ username: username });

    // 6: If username is taken, return 409
    if (user) {
      return res.status(409).json("Username is already taken");
    }

    // 6: If we can't verify hashed password and password from
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // 7: Spread user to remove password
    const { password: _, ...authenticatedUser } = (user as any).toObject();

    // 8: Save the users username as cookie
    res.setHeader(
      "Set-Cookie",
      `username=${username}; Path=/; Max-Age=${60 * 60 * 24 * 7}`
    );

    const message = { message: "Welcome" };

    return res.status(201).json(message);
  } catch (error) {
    console.error("Error in API route:", error);
  }
}
