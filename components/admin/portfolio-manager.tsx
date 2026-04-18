"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { ItemCrudTable } from "@/components/admin/item-crud-table";
import { deleteJson, postJson } from "@/lib/admin-client";
import type { CmsMediaAsset, CmsPortfolioItem } from "@/lib/cms/types";
import { portfolioSchema } from "@/lib/validation/admin";

type PortfolioManagerProps = {
  portfolioItems: CmsPortfolioItem[];
  mediaAssets: CmsMediaAsset[];
};

type PortfolioFormValues = z.input<typeof portfolioSchema>;
type PortfolioSubmitValues = z.output<typeof portfolioSchema>;

const emptyValues: PortfolioFormValues = {
  title: "",
  slug: "",
  category: "",
  location: "",
  shortDescription: "",
  description: "",
  coverImageId: "",
  altText: "",
  sortOrder: 0,
  isFeatured: false,
  status: "PUBLISHED",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: [],
};

export function PortfolioManager({
  portfolioItems,
  mediaAssets,
}: PortfolioManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<PortfolioFormValues, unknown, PortfolioSubmitValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: emptyValues,
  });
  const selectedImageId = useWatch({
    control: form.control,
    name: "coverImageId",
  });
  const selectedAsset = mediaAssets.find((item) => item.id === selectedImageId);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await postJson<{ error?: string }>("/api/admin/portfolio", values);

      if (!result.ok) {
        toast.error(result.data.error || "Portfolio gagal disimpan.");
        return;
      }

      toast.success("Portfolio berhasil disimpan.");
      form.reset(emptyValues);
      router.refresh();
    });
  });

  return (
    <div className="grid gap-6">
      <ItemCrudTable
        items={portfolioItems}
        emptyMessage="Belum ada item portfolio."
        columns={[
          { key: "title", label: "Proyek", render: (item) => item.title },
          { key: "category", label: "Kategori", render: (item) => item.category },
          { key: "status", label: "Status", render: (item) => item.status },
        ]}
        onEdit={(item) =>
          form.reset({
            id: item.id,
            title: item.title,
            slug: item.slug,
            category: item.category,
            location: item.location ?? "",
            shortDescription: item.shortDescription,
            description: item.description,
            coverImageId: item.coverImageId ?? "",
            altText: item.altText ?? "",
            sortOrder: item.sortOrder,
            isFeatured: item.isFeatured,
            status: item.status,
            seoTitle: item.seoTitle ?? "",
            seoDescription: item.seoDescription ?? "",
            seoKeywords: item.seoKeywords.join(", "),
          })
        }
        onDelete={(item) => {
          if (!window.confirm(`Hapus portfolio "${item.title}"?`)) {
            return;
          }

          startTransition(async () => {
            const result = await deleteJson<{ error?: string }>(
              `/api/admin/portfolio/${item.id}`,
            );

            if (!result.ok) {
              toast.error(result.data.error || "Portfolio gagal dihapus.");
              return;
            }

            toast.success("Portfolio berhasil dihapus.");
            router.refresh();
          });
        }}
      />

      <form className="grid gap-5 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]" onSubmit={onSubmit}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
              Form portfolio
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#182433]">
              Tambah atau edit proyek
            </h2>
          </div>
          <button
            type="button"
            onClick={() => form.reset(emptyValues)}
            className="rounded-xl border border-[#d8d0c5] bg-[#f8f5f0] px-4 py-2 text-sm font-semibold"
          >
            Form baru
          </button>
        </div>
        <input type="hidden" {...form.register("id")} />
        <div className="grid gap-4 lg:grid-cols-2">
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Judul proyek" {...form.register("title")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Slug" {...form.register("slug")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Kategori" {...form.register("category")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Lokasi pengerjaan" {...form.register("location")} />
        </div>
        <textarea rows={3} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Ringkasan proyek" {...form.register("shortDescription")} />
        <textarea rows={5} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Deskripsi lengkap proyek" {...form.register("description")} />
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            <select className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" {...form.register("coverImageId")}>
              <option value="">Pilih cover image</option>
              {mediaAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.title}
                </option>
              ))}
            </select>
            <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Alt text gambar" {...form.register("altText")} />
            <input type="number" min={0} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Urutan" {...form.register("sortOrder", { valueAsNumber: true })} />
            <select className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" {...form.register("status")}>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
            <label className="inline-flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" {...form.register("isFeatured")} />
              Tampilkan di homepage
            </label>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[24px] border border-[#ddd6cb] bg-[#f8f5f0] p-4">
              {selectedAsset ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-[18px]">
                  <Image
                    src={selectedAsset.url}
                    alt={selectedAsset.altText}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-[18px] border border-dashed border-[#d8d0c5] text-sm text-[#556476]">
                  Upload gambar baru dari halaman Media lalu pilih di sini.
                </div>
              )}
            </div>
            <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="SEO title" {...form.register("seoTitle")} />
            <textarea rows={3} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="SEO description" {...form.register("seoDescription")} />
            <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="SEO keywords, pisahkan dengan koma" {...form.register("seoKeywords")} />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white transition hover:bg-[#29415c] disabled:opacity-60"
          >
            {isPending ? "Menyimpan..." : "Simpan portfolio"}
          </button>
        </div>
      </form>
    </div>
  );
}
