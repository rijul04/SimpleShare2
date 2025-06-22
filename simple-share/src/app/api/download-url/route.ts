import { createDownloadUrl } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  const url = await createDownloadUrl(key);
  return NextResponse.json({ url });
}
