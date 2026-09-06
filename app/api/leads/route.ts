import { NextResponse } from "next/server";
import { createLead } from "@/lib/db/leads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, source_path, message, consent_share } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (typeof email === "string" && email.trim().length > 0 && !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const lead = await createLead({
      name: name.trim(),
      email: typeof email === "string" ? email.trim() : "",
      phone: typeof phone === "string" ? phone.trim() : "",
      source_path: typeof source_path === "string" ? source_path : "",
      message: typeof message === "string" ? message.slice(0, 5000) : undefined,
      consent_share: consent_share === true,
    });
    return NextResponse.json({ lead }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save your info. Please try again." }, { status: 500 });
  }
}
