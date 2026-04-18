import type { NextRequest } from "next/server";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { updateLocalSettings } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { settingsSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Data settings tidak valid.");
  }

  if (!hasDatabaseUrl) {
    try {
      await updateLocalSettings(parsed.data);

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ success: true, storageMode: "local" });
    } catch (error) {
      return jsonError(getPrismaMessage(error));
    }
  }

  try {
    const data = parsed.data;

    await prisma.businessProfile.update({
      where: { id: "default" },
      data: {
        siteUrl: data.siteUrl,
        logoUrl: data.logoUrl,
        faviconUrl: data.faviconUrl,
        defaultMetaTitle: data.defaultMetaTitle,
        defaultMetaDescription: data.defaultMetaDescription,
        defaultKeywords: data.defaultKeywords,
        defaultOgImageId: data.defaultOgImageId || null,
        googleAnalyticsId: data.googleAnalyticsId || null,
        googleTagManagerId: data.googleTagManagerId || null,
        googleSearchConsoleVerification:
          data.googleSearchConsoleVerification || null,
      },
    });

    await prisma.navigationItem.deleteMany();
    await prisma.navigationItem.createMany({
      data: data.navigationItems,
    });

    for (const page of data.pageSeo) {
      await prisma.page.update({
        where: { id: page.pageId },
        data: {
          seoTitle: page.seoTitle || null,
          seoDescription: page.seoDescription || null,
          seoKeywords: page.seoKeywords,
          canonicalPath: page.canonicalPath || null,
          robotsIndex: page.robotsIndex,
          robotsFollow: page.robotsFollow,
        },
      });
    }

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ success: true });
  } catch (error) {
    return jsonError(getPrismaMessage(error));
  }
}
