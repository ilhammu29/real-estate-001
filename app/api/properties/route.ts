import { NextRequest, NextResponse } from "next/server";
import { getProperties, createProperty } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    const properties = await getProperties({ category, search });
    return NextResponse.json({ success: true, count: properties.length, data: properties });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.price) {
      return NextResponse.json({ success: false, error: "Title and price are required" }, { status: 400 });
    }

    const newProperty = await createProperty({
      title: body.title,
      price: body.price,
      priceNum: Number(body.priceNum) || 0,
      category: body.category || "cantilever",
      location: body.location || "South Ridge Boulevard",
      landArea: Number(body.landArea) || 0,
      buildingArea: Number(body.buildingArea) || 0,
      bedrooms: Number(body.bedrooms) || 1,
      bathrooms: Number(body.bathrooms) || 1,
      image: body.image || "/images/house-container-hd.webp",
      badge: body.badge || "New Unit",
      description: body.description || "",
      features: Array.isArray(body.features) ? body.features : [],
      isFeatured: Boolean(body.isFeatured),
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
