import busboy from "busboy";
import { NextApiRequest, NextApiResponse } from "next";
import { getImageBucket } from "../../../../models/image";
import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parser
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }
  const userSessionCookie = req.cookies.username;
  if (!userSessionCookie) {
    // User session cookie not found, user is not authenticated
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Find the user by username in the database
  const user = await User.findOne({ username: userSessionCookie });
  if (!user) {
    // User not found in the database, user is not authenticated
    return res.status(401).json({ message: "Unauthorized" });
  }

  const bb = busboy({ headers: req.headers });

  // Define a promise to handle the file upload process
  const fileUploadPromise = new Promise((resolve, reject) => {
    bb.on("file", (_, incomingStream, info) => {
      const uploadStream = getImageBucket().openUploadStream(info.filename, {
        metadata: {
          contentType: info.mimeType,
        },
      });

      uploadStream.on("finish", () => {
        resolve(uploadStream.id); // Resolve with the uploaded image ID
      });

      // Pipe incoming stream through sharp transformer and then to upload stream
      incomingStream.pipe(uploadStream);
    });

    // Error handling for the file upload process
    bb.on("error", (err) => {
      reject(err); // Reject the promise with the error
    });
  });

  // Pipe request to Busboy
  req.pipe(bb);

  // Wait for the file upload process to complete
  try {
    const imageId = await fileUploadPromise;
    res.status(201).json({ imageId });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
