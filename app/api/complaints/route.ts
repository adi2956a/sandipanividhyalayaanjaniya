import { NextRequest, NextResponse } from "next/server";
import { checkComplaintRateLimit, generateComplaintTrackingId } from "@/lib/complaints";
import { getComplaints } from "@/lib/content";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import Complaint from "@/models/Complaint";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const searchParams = request.nextUrl.searchParams;
  const complaints = await getComplaints({
    category: searchParams.get("category") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    submittedBy: searchParams.get("submittedBy") ?? undefined
  });

  return NextResponse.json(complaints);
}

export async function POST(request: NextRequest) {
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  const rateLimit = checkComplaintRateLimit(ipAddress);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  const db = await connectToDatabase();
  const payload = await request.json();

  const complaintPayload = {
    trackingId: generateComplaintTrackingId(),
    category: payload.category,
    submittedBy: payload.submittedBy,
    classSection: payload.classSection,
    message: payload.message,
    optionalContact: payload.optionalContact,
    status: "submitted",
    adminResponse: "",
    isUrgent: payload.category === "bullying" || payload.category === "safety"
  };

  if (!db) {
    return NextResponse.json({ trackingId: complaintPayload.trackingId }, { status: 201 });
  }

  const complaint = await Complaint.create(complaintPayload);
  return NextResponse.json({ trackingId: complaint.trackingId }, { status: 201 });
}
