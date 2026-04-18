import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import { slugify } from "@/lib/slug";
import type { StorageAdapter, UploadInput, UploadResult } from "@/lib/storage";

const uploadsDirectory = path.join(process.cwd(), "public", "uploads");

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "video/mp4",
]);

function ensureAllowedMimeType(mimeType: string) {
  if (!allowedMimeTypes.has(mimeType)) {
    throw new Error("Jenis file tidak diizinkan.");
  }
}

function getExtension(fileName: string, mimeType: string) {
  const fromFileName = path.extname(fileName).toLowerCase();

  if (fromFileName) {
    return fromFileName;
  }

  if (mimeType === "image/jpeg") return ".jpg";
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  if (mimeType === "image/avif") return ".avif";
  if (mimeType === "image/svg+xml") return ".svg";
  if (mimeType === "video/mp4") return ".mp4";

  return "";
}

export class LocalStorageAdapter implements StorageAdapter {
  async upload({ file, title, altText }: UploadInput): Promise<UploadResult> {
    ensureAllowedMimeType(file.type);

    const isVideo = file.type.startsWith("video/");
    const maxSizeBytes = isVideo ? 20 * 1024 * 1024 : 5 * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      throw new Error(
        isVideo
          ? "Ukuran video maksimal 20 MB."
          : "Ukuran gambar maksimal 5 MB.",
      );
    }

    const now = new Date();
    const folder = path.join(
      uploadsDirectory,
      String(now.getFullYear()),
      String(now.getMonth() + 1).padStart(2, "0"),
    );

    await mkdir(folder, { recursive: true });

    const extension = getExtension(file.name, file.type);
    const baseName = slugify(title || file.name.replace(/\.[^.]+$/, "")) || "asset";
    const safeFileName = `${baseName}-${crypto.randomBytes(6).toString("hex")}${extension}`;
    const storageKey = path.join(
      "uploads",
      String(now.getFullYear()),
      String(now.getMonth() + 1).padStart(2, "0"),
      safeFileName,
    );
    const outputPath = path.join(process.cwd(), "public", storageKey);
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(outputPath, buffer);

    return {
      title: title?.trim() || file.name.replace(/\.[^.]+$/, ""),
      altText: altText?.trim() || title?.trim() || file.name.replace(/\.[^.]+$/, ""),
      fileName: safeFileName,
      storageKey,
      url: `/${storageKey.replace(/\\/g, "/")}`,
      mimeType: file.type,
      extension,
      sizeBytes: file.size,
    };
  }

  async remove(storageKey: string) {
    const resolvedPath = path.resolve(process.cwd(), "public", storageKey);
    const uploadsRoot = path.resolve(uploadsDirectory);

    if (!resolvedPath.startsWith(uploadsRoot)) {
      throw new Error("Path file tidak valid.");
    }

    await rm(resolvedPath, { force: true });
  }
}
