import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value; // Read auth token from cookies
  const isLoginPage = req.nextUrl.pathname === "/login";

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/"],
};
