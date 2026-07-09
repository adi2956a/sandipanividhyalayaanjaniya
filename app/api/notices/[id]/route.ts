import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import Notice from "@/models/Notice";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectToDatabase();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const notice = await Notice.findById(params.id).lean();
  return notice
    ? NextResponse.json(notice)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const notice = await Notice.findByIdAndUpdate(params.id, payload, { new: true });
  return NextResponse.json(notice);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  if (!db) return NextResponse.json({ message: "Database not configured" }, { status: 202 });

  await Notice.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}

