import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { jsonError, jsonSuccess } from "@/app/api/admin/_helpers";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
} from "@/lib/auth/session";
import { verifyLocalAdminCredentials } from "@/lib/cms/local-store";
import { ensureCmsSeeded } from "@/lib/cms/seed";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Input login tidak valid.");
  }

  if (!hasDatabaseUrl) {
    const admin = await verifyLocalAdminCredentials(
      parsed.data.email,
      parsed.data.password,
    );

    if (!admin) {
      return jsonError("Email atau password salah.", 401);
    }

    const token = await createAdminSessionToken({
      sub: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return jsonSuccess({ success: true, storageMode: "local" });
  }

  await ensureCmsSeeded(prisma);

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!admin) {
    return jsonError("Email atau password salah.", 401);
  }

  const passwordMatches = await bcrypt.compare(
    parsed.data.password,
    admin.passwordHash,
  );

  if (!passwordMatches) {
    return jsonError("Email atau password salah.", 401);
  }

  const token = await createAdminSessionToken({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  return NextResponse.json({ success: true, storageMode: "database" });
}
