import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import { extractYoutubeId } from "@/lib/youtube";
import GalleryItem from "@/models/GalleryItem";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();
  const normalizedPayload =
    payload.type === "video" && payload.youtubeId
      ? { ...payload, youtubeId: extractYoutubeId(payload.youtubeId), imageUrl: undefined }
      : { ...payload, youtubeId: undefined };

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload: normalizedPayload }, { status: 202 });
  }

  const item = await GalleryItem.findByIdAndUpdate(params.id, normalizedPayload, { new: true });
  return NextResponse.json(item);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  if (!db) return NextResponse.json({ message: "Database not configured" }, { status: 202 });

  await GalleryItem.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
