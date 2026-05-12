import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, createSessionToken, validateCredentials } from "@/lib/admin-auth";

// API route POST tradicional · mais robusto que Server Action pra setar cookie
// (Next 16 + Server Action + redirect() tinha edge cases com cookie propagation)
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const payload = validateCredentials(email, password);
  if (!payload) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }

  const token = await createSessionToken(payload.email, payload.name, payload.role);

  // Resposta com Set-Cookie no header · garantido pelo NextResponse
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set({
    name: ADMIN_COOKIE.name,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_COOKIE.maxAge,
    path: "/",
  });

  return response;
}
