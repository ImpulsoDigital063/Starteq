// Mock auth pro painel admin · usa Web Crypto API (compatível com Edge Runtime)
// Fase 2 → Supabase Auth

import { cookies } from "next/headers";

// SECRET com || (não ??) pra cair no fallback mesmo se a env var resolver pra string vazia
// (Edge runtime trata env vars diferente · `||` é mais defensivo)
const SECRET = process.env.ADMIN_AUTH_SECRET || "starteq-dev-secret-fica-aqui-mock-virou-supabase-na-fase-2";
const COOKIE_NAME = "starteq_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

// Mock credentials · em produção · Supabase Auth + RLS
const ADMIN_USERS: Record<string, { password: string; name: string; role: "admin" | "tecnico" }> = {
  "junior@starteq.com.br": { password: "starteq2026", name: "Júnior", role: "admin" },
  "marcos@starteq.com.br": { password: "marcos2026", name: "Marcos Silva", role: "tecnico" },
  "lucas@starteq.com.br": { password: "lucas2026", name: "Lucas Pereira", role: "tecnico" },
};

const enc = new TextEncoder();
const dec = new TextDecoder();

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function hmacSign(payload: string): Promise<string> {
  const key = await importKey(SECRET);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return bufToBase64Url(sig);
}

async function hmacVerify(payload: string, signature: string): Promise<boolean> {
  const key = await importKey(SECRET);
  return crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBuf(signature),
    enc.encode(payload)
  );
}

function bufToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBuf(b64url: string): ArrayBuffer {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(b64url.length / 4) * 4, "=");
  const str = atob(b64);
  const buf = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) buf[i] = str.charCodeAt(i);
  return buf.buffer;
}

function strToBase64Url(s: string): string {
  return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToStr(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(b64url.length / 4) * 4, "=");
  return decodeURIComponent(escape(atob(b64)));
}

export type SessionPayload = {
  email: string;
  name: string;
  role: "admin" | "tecnico";
  exp: number;
};

export async function createSessionToken(email: string, name: string, role: "admin" | "tecnico"): Promise<string> {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = JSON.stringify({ email, name, role, exp });
  const b64 = strToBase64Url(payload);
  const sig = await hmacSign(b64);
  return `${b64}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;
  const ok = await hmacVerify(b64, sig);
  if (!ok) return null;
  try {
    const payload = JSON.parse(base64UrlToStr(b64)) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function validateCredentials(email: string, password: string): SessionPayload | null {
  const user = ADMIN_USERS[email.toLowerCase().trim()];
  if (!user) return null;
  if (user.password !== password) return null;
  return {
    email: email.toLowerCase().trim(),
    name: user.name,
    role: user.role,
    exp: Date.now() + MAX_AGE * 1000,
  };
}

export async function getServerSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const c = store.get(COOKIE_NAME);
  if (!c) return null;
  return verifySessionToken(c.value);
}

/**
 * Use no início de cada page admin (exceto /admin/login).
 * Redireciona pra login se sem session válida.
 */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getServerSession();
  if (!session) {
    const { redirect } = await import("next/navigation");
    redirect("/admin/login");
  }
  return session as SessionPayload;
}

export const ADMIN_COOKIE = {
  name: COOKIE_NAME,
  maxAge: MAX_AGE,
};
