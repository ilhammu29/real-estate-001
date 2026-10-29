import { NextRequest, NextResponse } from "next/server";
import { uploadImageFile } from "@/lib/r2";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadImageFile(buffer, file.name, file.type || "image/jpeg");

    return NextResponse.json({
      success: true,
      url: result.url,
      key: result.key,
      provider: result.provider,
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
