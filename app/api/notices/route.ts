import { NextRequest, NextResponse } from "next/server";
import { getNotices } from "@/lib/content";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import Notice from "@/models/Notice";

export const dynamic = "force-dynamic";

export async function GET() {
  const notices = await getNotices();
  return NextResponse.json(notices);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const notice = await Notice.create(payload);
  return NextResponse.json(notice, { status: 201 });
}
