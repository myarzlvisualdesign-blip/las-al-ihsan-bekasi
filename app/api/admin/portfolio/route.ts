import type { NextRequest } from "next/server";
import { ContentStatus } from "@prisma/client";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { upsertLocalPortfolio } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { portfolioSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const body = await request.json();
  const parsed = portfolioSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Data portfolio tidak valid.");
  }

  if (!hasDatabaseUrl) {
    try {
      const state = await upsertLocalPortfolio(parsed.data);
      const portfolio = state.portfolio.find((item) => item.slug === parsed.data.slug);

      if (!portfolio) {
        throw new Error("Portfolio gagal ditemukan setelah disimpan.");
      }

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ portfolio, storageMode: "local" });
    } catch (error) {
      return jsonError(getPrismaMessage(error));
    }
  }

  try {
    const payload = {
      title: parsed.data.title,
      slug: parsed.data.slug,
      category: parsed.data.category,
      location: parsed.data.location || null,
      shortDescription: parsed.data.shortDescription,
      description: parsed.data.description,
      coverImageId: parsed.data.coverImageId || null,
      altText: parsed.data.altText || null,
      sortOrder: parsed.data.sortOrder,
      isFeatured: parsed.data.isFeatured,
      status: ContentStatus[parsed.data.status],
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      seoKeywords: parsed.data.seoKeywords,
    };

    const portfolio = parsed.data.id
      ? await prisma.portfolioItem.update({
          where: { id: parsed.data.id },
          data: payload,
        })
      : await prisma.portfolioItem.create({
          data: payload,
        });

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ portfolio });
  } catch (error) {
    return jsonError(getPrismaMessage(error));
  }
}
