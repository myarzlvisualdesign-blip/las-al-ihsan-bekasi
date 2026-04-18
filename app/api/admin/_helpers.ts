import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonSuccess(data: Record<string, unknown> = {}) {
  return NextResponse.json(data);
}

export function jsonDatabaseRequired() {
  return jsonError(
    "DATABASE_URL belum dikonfigurasi. Admin panel membutuhkan PostgreSQL aktif.",
    503,
  );
}

export function getPrismaMessage(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return "Data duplikat terdeteksi. Pastikan slug atau field unik lain tidak bentrok.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat menyimpan data.";
}
