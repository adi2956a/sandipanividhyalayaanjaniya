import { NextRequest, NextResponse } from "next/server";
import { getHomepageContent } from "@/lib/content";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import HomepageContentModel from "@/models/HomepageContent";

export async function GET() {
  const content = await getHomepageContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const updated = await HomepageContentModel.findOneAndUpdate({}, payload, {
    upsert: true,
    new: true
  });

  return NextResponse.json(updated);
}

