import busboy from "busboy";
import { NextRequest, NextResponse } from "next/server";
import { Readable, pipeline } from "stream";
import { promisify } from "util";
import { getImageBucket } from "../../../../models/image";
import User from "../../../../models/user";
import dbConnect from "../../../../util/dbConnect";

const pipelineAsync = promisify(pipeline);

export async function middleware(req: NextRequest) {
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

  const user = await User.findOne({ username: userSessionCookie });
  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (req.method === "POST") {
    const bb = busboy({ headers: Object.fromEntries(req.headers) });
    const uploadPromise = new Promise((resolve, reject) => {
      bb.on("file", async (name, file, info) => {
        const { filename, mimeType } = info;
        const bucket = getImageBucket();
        const uploadStream = bucket.openUploadStream(filename, {
          metadata: { contentType: mimeType },
        });

        try {
          await pipelineAsync(file, uploadStream);
          resolve(uploadStream.id.toString());
        } catch (error) {
          reject(error);
        }
      });

      bb.on("finish", () => {
        resolve(null);
      });

      bb.on("error", (error) => {
        reject(error);
      });
    });

    try {
      const blob = await req.blob();
      const bufferStream = new Readable({
        read() {
          this.push(blob.stream());
          this.push(null);
        },
      });

      bufferStream.pipe(bb);

      const imageId = await uploadPromise;
      if (!imageId) {
        return new NextResponse(
          JSON.stringify({ message: "No file uploaded" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      return new NextResponse(JSON.stringify({ imageId }), {
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

  return NextResponse.next();
}
