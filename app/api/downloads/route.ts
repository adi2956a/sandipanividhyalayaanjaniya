import { NextRequest, NextResponse } from "next/server";
import { getDownloads } from "@/lib/content";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import Download from "@/models/Download";

export const dynamic = "force-dynamic";

export async function GET() {
  const downloads = await getDownloads();
  return NextResponse.json(downloads);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const download = await Download.create(payload);
  return NextResponse.json(download, { status: 201 });
}
