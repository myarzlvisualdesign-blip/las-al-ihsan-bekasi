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
import type { CmsMediaAsset, CmsTestimonial } from "@/lib/cms/types";
import { testimonialSchema } from "@/lib/validation/admin";

type TestimonialFormValues = z.input<typeof testimonialSchema>;
type TestimonialSubmitValues = z.output<typeof testimonialSchema>;

const emptyValues: TestimonialFormValues = {
  customerName: "",
  customerRole: "",
  quote: "",
  rating: 5,
  sourceLabel: "Google Maps",
  sourceUrl: "",
  avatarImageId: "",
  sortOrder: 0,
  isFeatured: true,
  status: "PUBLISHED",
};

export function TestimonialsManager({
  testimonials,
  mediaAssets,
}: {
  testimonials: CmsTestimonial[];
  mediaAssets: CmsMediaAsset[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<
    TestimonialFormValues,
    unknown,
    TestimonialSubmitValues
  >({
    resolver: zodResolver(testimonialSchema),
    defaultValues: emptyValues,
  });
  const selectedImageId = useWatch({
    control: form.control,
    name: "avatarImageId",
  });
  const selectedAsset = mediaAssets.find((item) => item.id === selectedImageId);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await postJson<{ error?: string }>(
        "/api/admin/testimonials",
        values,
      );

      if (!result.ok) {
        toast.error(result.data.error || "Testimonial gagal disimpan.");
        return;
      }

      toast.success("Testimonial berhasil disimpan.");
      form.reset(emptyValues);
      router.refresh();
    });
  });

  return (
    <div className="grid gap-6">
      <ItemCrudTable
        items={testimonials}
        emptyMessage="Belum ada testimonial."
        columns={[
          { key: "name", label: "Nama", render: (item) => item.customerName },
          { key: "quote", label: "Quote", render: (item) => item.quote },
          { key: "rating", label: "Rating", render: (item) => `${item.rating}/5` },
        ]}
        onEdit={(item) =>
          form.reset({
            id: item.id,
            customerName: item.customerName,
            customerRole: item.customerRole ?? "",
            quote: item.quote,
            rating: item.rating,
            sourceLabel: item.sourceLabel,
            sourceUrl: item.sourceUrl ?? "",
            avatarImageId: item.avatarImageId ?? "",
            sortOrder: item.sortOrder,
            isFeatured: item.isFeatured,
            status: item.status,
          })
        }
        onDelete={(item) => {
          if (!window.confirm(`Hapus testimonial "${item.customerName}"?`)) {
            return;
          }

          startTransition(async () => {
            const result = await deleteJson<{ error?: string }>(
              `/api/admin/testimonials/${item.id}`,
            );

            if (!result.ok) {
              toast.error(result.data.error || "Testimonial gagal dihapus.");
              return;
            }

            toast.success("Testimonial berhasil dihapus.");
            router.refresh();
          });
        }}
      />

      <form className="grid gap-5 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]" onSubmit={onSubmit}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
              Form testimonial
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#182433]">
              Tambah atau edit testimonial
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
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Nama customer" {...form.register("customerName")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Peran / headline" {...form.register("customerRole")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Sumber review" {...form.register("sourceLabel")} />
          <input type="url" className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="URL sumber" {...form.register("sourceUrl")} />
          <input type="number" min={1} max={5} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Rating" {...form.register("rating", { valueAsNumber: true })} />
          <input type="number" min={0} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Urutan" {...form.register("sortOrder", { valueAsNumber: true })} />
        </div>
        <textarea rows={5} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Isi testimonial" {...form.register("quote")} />
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            <select className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" {...form.register("avatarImageId")}>
              <option value="">Pilih avatar / foto</option>
              {mediaAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.title}
                </option>
              ))}
            </select>
            <label className="inline-flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" {...form.register("isFeatured")} />
              Tampilkan sebagai testimonial unggulan
            </label>
            <select className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" {...form.register("status")}>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
          <div className="rounded-[24px] border border-[#ddd6cb] bg-[#f8f5f0] p-4">
            {selectedAsset ? (
              <div className="relative aspect-[1/1] overflow-hidden rounded-[18px]">
                <Image
                  src={selectedAsset.url}
                  alt={selectedAsset.altText}
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[1/1] items-center justify-center rounded-[18px] border border-dashed border-[#d8d0c5] text-sm text-[#556476]">
                Upload avatar dari halaman Media lalu pilih di sini.
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white transition hover:bg-[#29415c] disabled:opacity-60"
          >
            {isPending ? "Menyimpan..." : "Simpan testimonial"}
          </button>
        </div>
      </form>
    </div>
  );
}
