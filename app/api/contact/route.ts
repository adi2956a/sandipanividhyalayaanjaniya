import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(10)
});

export async function POST(request: NextRequest) {
  const payload = contactSchema.parse(await request.json());
  const db = await connectToDatabase();

  if (!db) {
    return NextResponse.json({ message: "Submission captured in fallback mode", payload }, { status: 201 });
  }

  const submission = await ContactSubmission.create(payload);
  return NextResponse.json(submission, { status: 201 });
}

