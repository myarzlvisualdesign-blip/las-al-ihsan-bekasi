"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { postJson } from "@/lib/admin-client";
import type { CmsBusinessProfile } from "@/lib/cms/types";
import { contactSchema } from "@/lib/validation/admin";

type SocialPlatformValue =
  | "WHATSAPP"
  | "INSTAGRAM"
  | "TIKTOK"
  | "MAPS"
  | "OTHER";

export function ContactEditor({
  business,
}: {
  business: CmsBusinessProfile | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...(business ?? {}),
      areasServed: (business?.areasServed ?? []).join(", "),
      socialLinks: (business?.socialLinks ?? []).map((item) => ({
        ...item,
        platform: item.platform as SocialPlatformValue,
      })),
      operatingHours: business?.operatingHours ?? [],
    },
  });

  const socialLinks = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });
  const operatingHours = useFieldArray({
    control: form.control,
    name: "operatingHours",
  });

  if (!business) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#d8d0c5] bg-[#f8f5f0] px-5 py-10 text-center text-sm text-[#556476]">
        Data profil bisnis belum tersedia.
      </div>
    );
  }

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await postJson<{ error?: string }>(
        "/api/admin/contact",
        values,
      );

      if (!result.ok) {
        toast.error(result.data.error || "Kontak gagal disimpan.");
        return;
      }

      toast.success("Kontak dan social links berhasil disimpan.");
      router.refresh();
    });
  });

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <section className="grid gap-4 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)] lg:grid-cols-2">
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Nama bisnis" {...form.register("businessName")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Nama singkat" {...form.register("shortName")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm lg:col-span-2" placeholder="Tagline" {...form.register("tagline")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Email support" {...form.register("supportEmail")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Nomor telepon utama" {...form.register("primaryPhone")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Nomor telepon kedua" {...form.register("secondaryPhone")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="WhatsApp utama" {...form.register("whatsappPrimary")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="WhatsApp kedua" {...form.register("whatsappSecondary")} />
        <textarea rows={3} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm lg:col-span-2" placeholder="Pesan default WhatsApp utama" {...form.register("whatsappMessage")} />
        <textarea rows={3} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm lg:col-span-2" placeholder="Pesan default WhatsApp kedua" {...form.register("whatsappSecondaryMessage")} />
      </section>

      <section className="grid gap-4 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)] lg:grid-cols-2">
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm lg:col-span-2" placeholder="Alamat baris 1" {...form.register("addressLine1")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm lg:col-span-2" placeholder="Alamat baris 2" {...form.register("addressLine2")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Kecamatan / district" {...form.register("district")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Kota" {...form.register("city")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Provinsi" {...form.register("region")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Kode pos" {...form.register("postalCode")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Kode negara" {...form.register("countryCode")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Area served, pisahkan koma" {...form.register("areasServed")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm lg:col-span-2" placeholder="Link Google Maps" {...form.register("mapsUrl")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm lg:col-span-2" placeholder="Link embed Google Maps" {...form.register("mapsEmbedUrl")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Instagram" {...form.register("instagramUrl")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="TikTok" {...form.register("tiktokUrl")} />
        <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Review URL" {...form.register("reviewUrl")} />
        <textarea rows={3} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Catatan jam operasional" {...form.register("openingHoursNote")} />
      </section>

      <section className="rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-[#182433]">Social links</h2>
          <button
            type="button"
            onClick={() =>
              socialLinks.append({
                platform: "OTHER",
                label: "",
                url: "",
                isVisible: true,
                sortOrder: socialLinks.fields.length,
              })
            }
            className="rounded-xl border border-[#d8d0c5] bg-[#f8f5f0] px-4 py-2 text-sm font-semibold"
          >
            Tambah link
          </button>
        </div>
        <div className="mt-4 grid gap-4">
          {socialLinks.fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-[22px] border border-[#eee8df] bg-[#fbf9f5] p-4 lg:grid-cols-[0.8fr_0.8fr_1.6fr_auto]">
              <select className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" {...form.register(`socialLinks.${index}.platform`)}>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="INSTAGRAM">Instagram</option>
                <option value="TIKTOK">TikTok</option>
                <option value="MAPS">Google Maps</option>
                <option value="OTHER">Other</option>
              </select>
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="Label" {...form.register(`socialLinks.${index}.label`)} />
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="URL" {...form.register(`socialLinks.${index}.url`)} />
              <button type="button" onClick={() => socialLinks.remove(index)} className="rounded-xl border border-[#efc6c1] bg-[#fff6f5] px-4 py-2 text-sm font-semibold text-[#b33b2e]">
                Hapus
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-[#182433]">Jam operasional</h2>
          <button
            type="button"
            onClick={() =>
              operatingHours.append({
                dayLabel: "",
                opensAt: "",
                closesAt: "",
                isClosed: false,
                sortOrder: operatingHours.fields.length,
              })
            }
            className="rounded-xl border border-[#d8d0c5] bg-[#f8f5f0] px-4 py-2 text-sm font-semibold"
          >
            Tambah hari
          </button>
        </div>
        <div className="mt-4 grid gap-4">
          {operatingHours.fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-[22px] border border-[#eee8df] bg-[#fbf9f5] p-4 lg:grid-cols-[1fr_1fr_1fr_auto_auto]">
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="Hari" {...form.register(`operatingHours.${index}.dayLabel`)} />
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="Buka" {...form.register(`operatingHours.${index}.opensAt`)} />
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="Tutup" {...form.register(`operatingHours.${index}.closesAt`)} />
              <label className="inline-flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" {...form.register(`operatingHours.${index}.isClosed`)} />
                Tutup
              </label>
              <button type="button" onClick={() => operatingHours.remove(index)} className="rounded-xl border border-[#efc6c1] bg-[#fff6f5] px-4 py-2 text-sm font-semibold text-[#b33b2e]">
                Hapus
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white transition hover:bg-[#29415c] disabled:opacity-60"
        >
          {isPending ? "Menyimpan..." : "Simpan kontak & lokasi"}
        </button>
      </div>
    </form>
  );
}
