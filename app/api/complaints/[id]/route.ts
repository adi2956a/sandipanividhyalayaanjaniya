import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import Complaint from "@/models/Complaint";

function buildComplaintLookup(id: string) {
  return id.startsWith("CMP-") ? { trackingId: id } : { _id: id };
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  if (!db) return NextResponse.json({ message: "Database not configured" }, { status: 202 });

  const complaint = await Complaint.findOne(buildComplaintLookup(params.id)).lean();
  return NextResponse.json(complaint);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const nextStatus = payload.status;
  const update = {
    ...payload,
    resolvedAt: nextStatus === "resolved" ? new Date() : null
  };

  const complaint = await Complaint.findOneAndUpdate(buildComplaintLookup(params.id), update, { new: true });
  return NextResponse.json(complaint);
}
