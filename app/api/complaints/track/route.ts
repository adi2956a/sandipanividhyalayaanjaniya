import { NextRequest, NextResponse } from "next/server";
import { getComplaintTrackResult } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const trackingId = request.nextUrl.searchParams.get("trackingId");

  if (!trackingId) {
    return NextResponse.json({ error: "trackingId is required" }, { status: 400 });
  }

  const complaint = await getComplaintTrackResult(trackingId.trim().toUpperCase());
  if (!complaint) {
    return NextResponse.json({ error: "Complaint not found" }, { status: 404 });
  }

  return NextResponse.json(complaint);
}
