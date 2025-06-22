import { NextRequest, NextResponse } from "next/server";
import { createUploadUrl } from "@/lib/s3";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");
  const contentType = searchParams.get("contentType");
  const uuid = searchParams.get("uuid");

  if (!filename || !contentType) {
    return NextResponse.json(
      { error: "Missing filename or contentType" },
      { status: 400 }
    );
  }

  const key = `uploads/${uuid}/${filename}`;
  const url = await createUploadUrl(key, contentType);

  return NextResponse.json({ url, key });
}
