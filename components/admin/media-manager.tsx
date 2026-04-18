"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteJson } from "@/lib/admin-client";
import type { CmsMediaAsset } from "@/lib/cms/types";

export function MediaManager({ assets }: { assets: CmsMediaAsset[] }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isPending, startTransition] = useTransition();

  const uploadAsset = async () => {
    if (!file) {
      toast.error("Pilih file terlebih dulu.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title || file.name.replace(/\.[^.]+$/, ""));
      formData.append("altText", altText || title || file.name.replace(/\.[^.]+$/, ""));

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        toast.error(result.error || "Upload media gagal.");
        return;
      }

      toast.success("Media berhasil diupload.");
      setFile(null);
      setTitle("");
      setAltText("");
      setPreviewUrl("");
      router.refresh();
    });
  };

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <input
            type="file"
            accept="image/*,video/mp4"
            onChange={(event) => {
              const nextFile = event.target.files?.[0] ?? null;
              setFile(nextFile);

              if (nextFile) {
                setPreviewUrl(URL.createObjectURL(nextFile));
                setTitle(nextFile.name.replace(/\.[^.]+$/, ""));
              }
            }}
            className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
          />
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
            placeholder="Judul media"
          />
          <input
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
            placeholder="Alt text"
          />
          <button
            type="button"
            disabled={isPending}
            onClick={uploadAsset}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white transition hover:bg-[#29415c] disabled:opacity-60"
          >
            {isPending ? "Mengupload..." : "Upload media"}
          </button>
        </div>
        <div className="rounded-[24px] border border-[#ddd6cb] bg-[#f8f5f0] p-4">
          {previewUrl ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#e7e0d6]">
              {file?.type.startsWith("video/") ? (
                <video
                  src={previewUrl}
                  className="h-full w-full object-cover"
                  controls
                />
              ) : (
                <Image
                  src={previewUrl}
                  alt={altText || title || "Preview media"}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center rounded-[18px] border border-dashed border-[#d8d0c5] text-sm text-[#556476]">
              Preview media akan tampil di sini.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset) => (
          <article
            key={asset.id}
            className="overflow-hidden rounded-[24px] border border-[#ddd6cb] bg-white shadow-[0_14px_32px_rgba(15,23,42,0.04)]"
          >
            <div className="relative aspect-[16/11] bg-[#e7e0d6]">
              {asset.kind === "VIDEO" ? (
                <video src={asset.url} className="h-full w-full object-cover" controls />
              ) : (
                <Image
                  src={asset.url}
                  alt={asset.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="grid gap-2 p-4">
              <h3 className="text-lg font-semibold text-[#182433]">{asset.title}</h3>
              <p className="text-sm text-[#556476]">{asset.altText}</p>
              <p className="truncate text-xs text-[#7a8595]">{asset.url}</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(asset.url);
                    toast.success("URL media disalin.");
                  }}
                  className="rounded-xl border border-[#d8d0c5] bg-[#f8f5f0] px-3 py-2 text-sm font-semibold text-[#182433]"
                >
                  Copy URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!window.confirm(`Hapus media "${asset.title}"?`)) {
                      return;
                    }

                    startTransition(async () => {
                      const result = await deleteJson<{ error?: string }>(
                        `/api/admin/media/${asset.id}`,
                      );

                      if (!result.ok) {
                        toast.error(result.data.error || "Media gagal dihapus.");
                        return;
                      }

                      toast.success("Media berhasil dihapus.");
                      router.refresh();
                    });
                  }}
                  className="rounded-xl border border-[#efc6c1] bg-[#fff6f5] px-3 py-2 text-sm font-semibold text-[#b33b2e]"
                >
                  Hapus
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
