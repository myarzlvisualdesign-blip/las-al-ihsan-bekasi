import { jwtVerify, SignJWT } from "jose";

import { env } from "@/lib/env";

export const ADMIN_SESSION_COOKIE = "alihsan_admin_session";

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
  role: string;
};

const secret = new TextEncoder().encode(env.authSecret);

export async function createAdminSessionToken(payload: AdminSession) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminSessionToken(token: string) {
  const verified = await jwtVerify<AdminSession>(token, secret);
  return verified.payload;
}
