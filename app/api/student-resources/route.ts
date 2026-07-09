import { NextRequest, NextResponse } from "next/server";
import { getStudentResources } from "@/lib/content";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import StudentResource from "@/models/StudentResource";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const classValue = Number(searchParams.get("class"));
  const stream = searchParams.get("stream") ?? undefined;
  const subject = searchParams.get("subject") ?? undefined;

  const resources = await getStudentResources({
    class: Number.isNaN(classValue) ? undefined : classValue,
    stream,
    subject
  });

  return NextResponse.json(resources);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const resource = await StudentResource.create(payload);
  return NextResponse.json(resource, { status: 201 });
}
