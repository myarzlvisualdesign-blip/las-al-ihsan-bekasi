import type { NextRequest } from "next/server";

import { jsonError, jsonSuccess } from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { deleteLocalTestimonial } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";

export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const { id } = await params;

  if (!hasDatabaseUrl) {
    await deleteLocalTestimonial(id);

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ success: true, storageMode: "local" });
  }

  await prisma.testimonial.delete({
    where: { id },
  });

  revalidateAdmin();
  revalidateSite();

  return jsonSuccess({ success: true });
}
