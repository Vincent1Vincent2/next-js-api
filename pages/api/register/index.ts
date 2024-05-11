import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import dbConnect from "../../../util/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      const { username, password } = req.body;

      // 2: Validation error if username and password are provided and not empty
      const errors: { [key: string]: string } = {};

      // 3: Check if username has been provided
      if (!username) {
        res.status(400).json((errors.username = "Username is required"));
      }

      // 4: Check if password has been provided
      if (!password) {
        res.status(400).json((errors.password = "Password is required"));
      }

      // 5: Check if a username is taken
      const existingUser = await User.findOne({ username });

      // 6: If username is taken, return 409
      if (existingUser) {
        return res
          .status(409)
          .json((errors.existingUser = "Username is already taken"));
      }

      // 7: Hash the users password and save it
      const hashedPassword = await bcrypt.hash(password, 10);

      // 8: Create a new user with the hashed password
      const user = await User.create({
        username,
        password: hashedPassword,
        isAdmin: false,
      });

      const message = { message: "Authenticated" };

      return res.status(201).json(message);
    } catch (error) {
      console.error("Error in API route:", error);
    }
  }
}
