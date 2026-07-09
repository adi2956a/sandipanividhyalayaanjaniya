import { NextRequest, NextResponse } from "next/server";
import { getPreviousYearPapers } from "@/lib/content";
import { requireAdmin } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongodb";
import PreviousYearPaper from "@/models/PreviousYearPaper";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const classValue = Number(searchParams.get("class"));
  const subject = searchParams.get("subject") ?? undefined;
  const yearValue = Number(searchParams.get("year"));

  const papers = await getPreviousYearPapers({
    class: Number.isNaN(classValue) ? undefined : classValue,
    subject,
    year: Number.isNaN(yearValue) ? undefined : yearValue
  });

  return NextResponse.json(papers);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const db = await connectToDatabase();
  const payload = await request.json();

  if (!db) {
    return NextResponse.json({ message: "Database not configured", payload }, { status: 202 });
  }

  const paper = await PreviousYearPaper.create(payload);
  return NextResponse.json(paper, { status: 201 });
}
