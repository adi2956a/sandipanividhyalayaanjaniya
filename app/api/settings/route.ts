import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/content";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import SiteSettingsModel from "@/models/SiteSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const updated = await SiteSettingsModel.findOneAndUpdate({}, payload, {
    upsert: true,
    new: true
  });

  return NextResponse.json(updated);
}
