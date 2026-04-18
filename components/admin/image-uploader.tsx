"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

type UploadedAsset = {
  id: string;
  url: string;
  altText: string;
  title: string;
};

type ImageUploaderProps = {
  label: string;
  value: { assetId?: string | null; url: string; alt: string };
  onChange: (value: { assetId?: string | null; url: string; alt: string }) => void;
};

export function ImageUploader({
  label,
  value,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState(value.url);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name.replace(/\.[^.]+$/, ""));
      formData.append("altText", value.alt || file.name.replace(/\.[^.]+$/, ""));

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        error?: string;
        asset?: UploadedAsset;
      };

      if (!response.ok || !result.asset) {
        toast.error(result.error || "Upload gambar gagal.");
        setPreviewUrl(value.url);
        return;
      }

      onChange({
        assetId: result.asset.id,
        url: result.asset.url,
        alt: result.asset.altText,
      });
      setPreviewUrl(result.asset.url);
      toast.success("Gambar berhasil diupload.");
    });
  };

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-[#182433]">{label}</label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-xl border border-[#d8d0c5] bg-[#f8f5f0] px-3 py-2 text-sm font-semibold text-[#182433] transition hover:bg-white"
        >
          {isPending ? "Mengupload..." : "Upload / ganti"}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="rounded-[22px] border border-[#ddd6cb] bg-[#f8f5f0] p-4">
        {previewUrl ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#e7e0d6]">
            <Image
              src={previewUrl}
              alt={value.alt || label}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              unoptimized={previewUrl.startsWith("blob:")}
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center rounded-[18px] border border-dashed border-[#d8d0c5] text-sm text-[#556476]">
            Belum ada gambar dipilih
          </div>
        )}
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#182433]">Alt text</label>
        <input
          type="text"
          value={value.alt}
          onChange={(event) =>
            onChange({
              ...value,
              alt: event.target.value,
            })
          }
          className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm text-[#182433] outline-none transition focus:border-[#22364d] focus:bg-white"
        />
      </div>
      {value.url ? (
        <p className="truncate text-xs text-[#7a8595]">{value.url}</p>
      ) : null}
    </div>
  );
}
