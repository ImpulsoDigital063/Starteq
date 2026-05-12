import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/admin-auth";

const COOKIE_NAME = "starteq_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protege /admin/* exceto /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
