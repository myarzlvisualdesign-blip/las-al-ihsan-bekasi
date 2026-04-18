import type { NextRequest } from "next/server";
import { ContentStatus } from "@prisma/client";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { upsertLocalService } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { serviceSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const body = await request.json();
  const parsed = serviceSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Data layanan tidak valid.");
  }

  if (!hasDatabaseUrl) {
    try {
      const state = await upsertLocalService(parsed.data);
      const service = state.services.find((item) => item.slug === parsed.data.slug);

      if (!service) {
        throw new Error("Layanan gagal ditemukan setelah disimpan.");
      }

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ service, storageMode: "local" });
    } catch (error) {
      return jsonError(getPrismaMessage(error));
    }
  }

  try {
    const payload = {
      title: parsed.data.title,
      slug: parsed.data.slug,
      badge: parsed.data.badge || null,
      summary: parsed.data.summary,
      description: parsed.data.description,
      bullets: parsed.data.bullets,
      imageId: parsed.data.imageId || null,
      altText: parsed.data.altText || null,
      sortOrder: parsed.data.sortOrder,
      isFeatured: parsed.data.isFeatured,
      status: ContentStatus[parsed.data.status],
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      seoKeywords: parsed.data.seoKeywords,
    };

    const service = parsed.data.id
      ? await prisma.serviceItem.update({
          where: { id: parsed.data.id },
          data: payload,
        })
      : await prisma.serviceItem.create({
          data: payload,
        });

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ service });
  } catch (error) {
    return jsonError(getPrismaMessage(error));
  }
}
