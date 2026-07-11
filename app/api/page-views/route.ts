import { NextResponse } from "next/server";
import { recordPageView } from "@/lib/db/page-views";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { path, referrer } = (body ?? {}) as Record<string, unknown>;

  if (typeof path !== "string" || path.trim().length === 0) {
    return NextResponse.json({ error: "Path is required." }, { status: 400 });
  }

  try {
    await recordPageView(path, typeof referrer === "string" && referrer ? referrer : null);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not record page view." }, { status: 500 });
  }
}
