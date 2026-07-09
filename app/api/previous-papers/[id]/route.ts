import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import PreviousYearPaper from "@/models/PreviousYearPaper";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  if (!db) return NextResponse.json({ message: "Database not configured" }, { status: 202 });

  await PreviousYearPaper.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
