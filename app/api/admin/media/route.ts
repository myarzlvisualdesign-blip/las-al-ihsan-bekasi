import { randomUUID } from "node:crypto";
import { MediaKind } from "@prisma/client";
import type { NextRequest } from "next/server";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { insertLocalMediaAsset } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { LocalStorageAdapter } from "@/lib/storage/local";

export const runtime = "nodejs";

const storage = new LocalStorageAdapter();

function resolveMediaKind(mimeType: string) {
  if (mimeType.startsWith("video/")) {
    return MediaKind.VIDEO;
  }

  if (mimeType.startsWith("image/")) {
    return MediaKind.IMAGE;
  }

  return MediaKind.FILE;
}

export async function POST(request: NextRequest) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  let storageKey: string | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const altText = formData.get("altText");

    if (!(file instanceof File) || file.size === 0) {
      return jsonError("File upload tidak valid.");
    }

    const uploaded = await storage.upload({
      file,
      title: typeof title === "string" ? title : undefined,
      altText: typeof altText === "string" ? altText : undefined,
    });

    storageKey = uploaded.storageKey;

    if (!hasDatabaseUrl) {
      const asset = {
        id: `media-${randomUUID()}`,
        kind: resolveMediaKind(file.type),
        title: uploaded.title,
        altText: uploaded.altText,
        fileName: uploaded.fileName,
        storageKey: uploaded.storageKey,
        url: uploaded.url,
        mimeType: uploaded.mimeType,
        extension: uploaded.extension,
        sizeBytes: uploaded.sizeBytes,
      };

      await insertLocalMediaAsset(asset);

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ asset, storageMode: "local" });
    }

    const asset = await prisma.mediaAsset.create({
      data: {
        kind: resolveMediaKind(file.type),
        title: uploaded.title,
        altText: uploaded.altText,
        fileName: uploaded.fileName,
        storageKey: uploaded.storageKey,
        url: uploaded.url,
        mimeType: uploaded.mimeType,
        extension: uploaded.extension,
        sizeBytes: uploaded.sizeBytes,
      },
    });

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ asset, storageMode: "database" });
  } catch (error) {
    if (storageKey?.startsWith("uploads/")) {
      await storage.remove(storageKey).catch(() => null);
    }

    return jsonError(getPrismaMessage(error));
  }
}
