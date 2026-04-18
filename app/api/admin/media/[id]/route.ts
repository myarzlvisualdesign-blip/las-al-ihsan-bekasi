import type { Prisma } from "@prisma/client";
import type { NextRequest } from "next/server";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { deleteLocalMediaAsset, getLocalMediaData } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { LocalStorageAdapter } from "@/lib/storage/local";

export const runtime = "nodejs";

const storage = new LocalStorageAdapter();

function isImageBlockValue(
  value: Prisma.JsonValue,
): value is { assetId?: string | null; url?: string; alt?: string } {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const { id } = await params;

  try {
    if (!hasDatabaseUrl) {
      const assets = await getLocalMediaData();
      const asset = assets.find((item) => item.id === id);

      if (!asset) {
        return jsonError("Media tidak ditemukan.", 404);
      }

      await deleteLocalMediaAsset(id);

      if (asset.storageKey.startsWith("uploads/")) {
        await storage.remove(asset.storageKey).catch(() => null);
      }

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ success: true, storageMode: "local" });
    }

    const asset = await prisma.mediaAsset.findUnique({
      where: { id },
    });

    if (!asset) {
      return jsonError("Media tidak ditemukan.", 404);
    }

    const imageBlocks = await prisma.sectionBlock.findMany({
      where: { type: "IMAGE" },
      select: { id: true, value: true },
    });

    const referencedBlocks = imageBlocks.filter((block) => {
      if (!isImageBlockValue(block.value)) {
        return false;
      }

      return block.value.assetId === id;
    });

    await prisma.$transaction(async (tx) => {
      if (referencedBlocks.length > 0) {
        for (const block of referencedBlocks) {
          const currentValue = isImageBlockValue(block.value) ? block.value : {};

          await tx.sectionBlock.update({
            where: { id: block.id },
            data: {
              value: {
                assetId: null,
                url: "",
                alt:
                  typeof currentValue.alt === "string"
                    ? currentValue.alt
                    : asset.altText,
              },
            },
          });
        }
      }

      await tx.businessProfile.updateMany({
        where: { defaultOgImageId: id },
        data: { defaultOgImageId: null },
      });
      await tx.page.updateMany({
        where: { ogImageId: id },
        data: { ogImageId: null },
      });
      await tx.serviceItem.updateMany({
        where: { imageId: id },
        data: { imageId: null },
      });
      await tx.portfolioItem.updateMany({
        where: { coverImageId: id },
        data: { coverImageId: null },
      });
      await tx.testimonial.updateMany({
        where: { avatarImageId: id },
        data: { avatarImageId: null },
      });
      await tx.mediaAsset.delete({
        where: { id },
      });
    });

    if (asset.storageKey.startsWith("uploads/")) {
      await storage.remove(asset.storageKey).catch(() => null);
    }

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ success: true });
  } catch (error) {
    return jsonError(getPrismaMessage(error));
  }
}
