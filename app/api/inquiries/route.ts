import { NextRequest, NextResponse } from "next/server";
import { getInquiries, createInquiry } from "@/lib/db";

export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: "Name and phone are required" }, { status: 400 });
    }

    const newInquiry = await createInquiry({
      name: body.name,
      phone: body.phone,
      villa: body.villa || "General Inquiry",
      preferredDate: body.preferredDate || "",
      notes: body.notes || "",
    });

    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
