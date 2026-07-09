import { NextRequest, NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/content";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import { extractYoutubeId } from "@/lib/youtube";
import GalleryItem from "@/models/GalleryItem";

export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();
  const normalizedPayload =
    payload.type === "video" && payload.youtubeId
      ? { ...payload, youtubeId: extractYoutubeId(payload.youtubeId) }
      : payload;

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload: normalizedPayload }, { status: 202 });
  }

  const item = await GalleryItem.create(normalizedPayload);
  return NextResponse.json(item, { status: 201 });
}

