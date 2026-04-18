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
import type { CmsMediaAsset, CmsServiceItem } from "@/lib/cms/types";
import { serviceSchema } from "@/lib/validation/admin";

type ServicesManagerProps = {
  services: CmsServiceItem[];
  mediaAssets: CmsMediaAsset[];
};

type ServiceFormValues = z.input<typeof serviceSchema>;
type ServiceSubmitValues = z.output<typeof serviceSchema>;

const emptyValues: ServiceFormValues = {
  title: "",
  slug: "",
  badge: "",
  summary: "",
  description: "",
  bullets: ["", "", ""],
  imageId: "",
  altText: "",
  sortOrder: 0,
  isFeatured: false,
  status: "PUBLISHED",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: [],
};

export function ServicesManager({ services, mediaAssets }: ServicesManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<ServiceFormValues, unknown, ServiceSubmitValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: emptyValues,
  });

  const selectedImageId = useWatch({
    control: form.control,
    name: "imageId",
  });
  const selectedAsset = mediaAssets.find((item) => item.id === selectedImageId);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await postJson<{ error?: string }>("/api/admin/services", {
        ...values,
      });

      if (!result.ok) {
        toast.error(result.data.error || "Layanan gagal disimpan.");
        return;
      }

      toast.success("Layanan berhasil disimpan.");
      form.reset(emptyValues);
      router.refresh();
    });
  });

  return (
    <div className="grid gap-6">
      <ItemCrudTable
        items={services}
        emptyMessage="Belum ada layanan."
        columns={[
          { key: "title", label: "Layanan", render: (item) => item.title },
          { key: "summary", label: "Ringkasan", render: (item) => item.summary },
          { key: "status", label: "Status", render: (item) => item.status },
        ]}
        onEdit={(item) =>
          form.reset({
            id: item.id,
            title: item.title,
            slug: item.slug,
            badge: item.badge ?? "",
            summary: item.summary,
            description: item.description,
            bullets: Array.isArray(item.bullets)
              ? [...item.bullets, "", "", ""].slice(0, 3)
              : ["", "", ""],
            imageId: item.imageId ?? "",
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
          if (!window.confirm(`Hapus layanan "${item.title}"?`)) {
            return;
          }

          startTransition(async () => {
            const result = await deleteJson<{ error?: string }>(
              `/api/admin/services/${item.id}`,
            );

            if (!result.ok) {
              toast.error(result.data.error || "Layanan gagal dihapus.");
              return;
            }

            toast.success("Layanan berhasil dihapus.");
            router.refresh();
          });
        }}
      />

      <form className="grid gap-5 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]" onSubmit={onSubmit}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
              Form layanan
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#182433]">
              Tambah atau edit layanan
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
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Judul layanan" {...form.register("title")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Slug" {...form.register("slug")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Badge" {...form.register("badge")} />
          <input type="number" min={0} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Urutan" {...form.register("sortOrder", { valueAsNumber: true })} />
        </div>

        <textarea rows={3} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Ringkasan layanan" {...form.register("summary")} />
        <textarea rows={5} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Deskripsi layanan" {...form.register("description")} />

        <div className="grid gap-3 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
              placeholder={`Poin layanan ${index + 1}`}
              {...form.register(`bullets.${index}` as const)}
            />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            <select
              className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
              {...form.register("imageId")}
            >
              <option value="">Pilih gambar cover</option>
              {mediaAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.title}
                </option>
              ))}
            </select>
            <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Alt text gambar" {...form.register("altText")} />
            <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="SEO title" {...form.register("seoTitle")} />
            <textarea rows={3} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="SEO description" {...form.register("seoDescription")} />
            <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="SEO keywords, pisahkan dengan koma" {...form.register("seoKeywords")} />
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
            <label className="inline-flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" {...form.register("isFeatured")} />
              Tampilkan sebagai layanan unggulan
            </label>
            <select
              className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
              {...form.register("status")}
            >
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white transition hover:bg-[#29415c] disabled:opacity-60"
          >
            {isPending ? "Menyimpan..." : "Simpan layanan"}
          </button>
        </div>
      </form>
    </div>
  );
}
