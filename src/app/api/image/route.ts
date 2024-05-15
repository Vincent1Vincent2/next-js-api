import busboy from "busboy";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { Readable } from "stream";
import { getImageBucket } from "../../../../models/image";
import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";

export async function POST(req: NextRequest) {
  await dbConnect();

  const userSessionCookie = req.cookies.get("username");
  if (!userSessionCookie) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const user = await User.findOne({ username: userSessionCookie.value });
  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const contentType = req.headers.get("content-type") || undefined;
  const bb = busboy({
    headers: {
      ...Object.fromEntries(req.headers),
      "content-type": contentType,
    },
  });

  let imageId: string | null = null;
  let filesProcessed = 0;
  let pendingUploads: Promise<void>[] = [];

  const uploadPromise = new Promise<string | null>((resolve, reject) => {
    bb.on("file", (name, file, info) => {
      const { filename, mimeType } = info;
      const bucket = getImageBucket();
      const uploadStream = bucket.openUploadStream(filename, {
        metadata: { contentType: mimeType },
      });

      const transformer = sharp().resize({
        width: 280,
        height: 280,
        fit: "contain",
      });

      console.log(`Starting upload for file: ${filename}`);

      const uploadFinished = new Promise<void>(
        (uploadResolve, uploadReject) => {
          uploadStream.on("finish", () => {
            console.log(`Upload finished for file: ${filename}`);
            imageId = uploadStream.id.toString();
            filesProcessed += 1;
            uploadResolve();
          });

          uploadStream.on("error", (err) => {
            console.error(`Upload stream error: ${err}`);
            uploadReject(err);
          });
        }
      );

      pendingUploads.push(uploadFinished);

      file.pipe(transformer).pipe(uploadStream);
    });

    bb.on("error", (err) => {
      console.error("Busboy error:", err);
      reject(err);
    });

    bb.on("finish", async () => {
      console.log("Busboy finished processing.");
      try {
        await Promise.all(pendingUploads);
        resolve(imageId);
      } catch (err) {
        reject(err);
      }
    });
  });

  try {
    const blob = await req.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const bufferStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });

    bufferStream.pipe(bb);

    const uploadedImageId = await uploadPromise;
    console.log("Uploaded Image ID:", uploadedImageId);

    if (!uploadedImageId) {
      return new NextResponse(JSON.stringify({ message: "No file uploaded" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify({ imageId: uploadedImageId }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
