import type { NextRequest } from "next/server";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { saveLocalHomeEditor } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { safeJsonParse } from "@/lib/utils";
import { homeEditorSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

function normalizeBlockValue(type: string, value: unknown) {
  if (type === "BOOLEAN") {
    return Boolean(value);
  }

  if (type === "JSON" && typeof value === "string") {
    return safeJsonParse(value, {});
  }

  if (type === "IMAGE" && value && typeof value === "object") {
    return value;
  }

  return value ?? "";
}

export async function POST(request: NextRequest) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const body = await request.json();
  const parsed = homeEditorSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Data homepage tidak valid.");
  }

  if (!hasDatabaseUrl) {
    try {
      await saveLocalHomeEditor(parsed.data);

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ success: true, storageMode: "local" });
    } catch (error) {
      return jsonError(getPrismaMessage(error));
    }
  }

  try {
    await prisma.page.update({
      where: { id: parsed.data.page.pageId },
      data: {
        seoTitle: parsed.data.page.seoTitle || null,
        seoDescription: parsed.data.page.seoDescription || null,
        seoKeywords: parsed.data.page.seoKeywords,
        canonicalPath: parsed.data.page.canonicalPath || null,
        robotsIndex: parsed.data.page.robotsIndex,
        robotsFollow: parsed.data.page.robotsFollow,
      },
    });

    const allSections = [...parsed.data.sections, ...parsed.data.globalSections];

    for (const section of allSections) {
      await prisma.pageSection.update({
        where: { id: section.id },
        data: {
          isVisible: section.isVisible,
          sortOrder: section.sortOrder,
        },
      });

      for (const block of section.blocks) {
        await prisma.sectionBlock.update({
          where: { id: block.id },
          data: {
            value: normalizeBlockValue(block.type, block.value),
          },
        });
      }
    }

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ success: true });
  } catch (error) {
    return jsonError(getPrismaMessage(error));
  }
}
