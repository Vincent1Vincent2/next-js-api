import { Types } from "mongoose";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { getImageBucket } from "../../../../../models/image";
import dbConnect from "../../../../../util/dbConnect";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  if (!id || !Types.ObjectId.isValid(id as string)) {
    return NextResponse.json({ error: "Invalid image ID" }, { status: 400 });
  }

  const objectId = new Types.ObjectId(id as string);
  const imageBucket = getImageBucket();

  try {
    const imageData = await imageBucket.find({ _id: objectId }).next();
    if (!imageData) {
      return NextResponse.json(
        { error: "Image does not exist" },
        { status: 404 }
      );
    }

    const headers = new Headers();
    headers.set(
      "Content-Type",
      imageData.metadata?.contentType || "application/octet-stream"
    );

    const stream = imageBucket.openDownloadStream(objectId);

    // Create a ReadableStream from the GridFSBucketReadStream
    const readableStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(readableStream, { headers });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
