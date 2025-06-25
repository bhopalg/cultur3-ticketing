import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("site_access");

  const allowedPaths = ["/login", "/favicon.ico", "/_next", "/api/webhook"];

  const isAllowedPath = allowedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (!cookie && !isAllowedPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
