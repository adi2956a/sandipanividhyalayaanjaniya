import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import StudentResource from "@/models/StudentResource";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const resource = await StudentResource.findByIdAndUpdate(params.id, payload, { new: true });
  return NextResponse.json(resource);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  if (!db) return NextResponse.json({ message: "Database not configured" }, { status: 202 });

  await StudentResource.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
