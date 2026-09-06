import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // wired2thrive.com is a single-purpose domain: the next-book (AI literacy)
  // interest list. Serve /next at its root; keep the URL bar on wired2thrive.com.
  if (host.startsWith("wired2thrive.com") || host.startsWith("www.wired2thrive.com")) {
    const { pathname } = request.nextUrl;
    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/next", request.url));
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
