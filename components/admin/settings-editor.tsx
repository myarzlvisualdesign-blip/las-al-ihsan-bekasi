"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { SerpPreview } from "@/components/admin/serp-preview";
import { postJson } from "@/lib/admin-client";
import type {
  CmsBusinessProfile,
  CmsMediaAsset,
  CmsNavigationItem,
} from "@/lib/cms/types";
import {
  settingsSchema,
  type SettingsFormInput,
  type SettingsFormValues,
} from "@/lib/validation/admin";

type PageSeoSettingsItem = {
  id: string;
  route: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  canonicalPath: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
};

export function SettingsEditor({
  business,
  navigationItems,
  pages,
  mediaAssets,
}: {
  business: CmsBusinessProfile | null;
  navigationItems: CmsNavigationItem[];
  pages: PageSeoSettingsItem[];
  mediaAssets: CmsMediaAsset[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [defaultKeywordInput, setDefaultKeywordInput] = useState(
    (business?.defaultKeywords ?? []).join(", "),
  );
  const [pageKeywordInputs, setPageKeywordInputs] = useState<Record<string, string>>(
    Object.fromEntries(
      pages.map((page) => [page.id, (page.seoKeywords ?? []).join(", ")]),
    ),
  );
  const form = useForm<SettingsFormInput, unknown, SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteUrl: business?.siteUrl ?? "",
      logoUrl: business?.logoUrl ?? "",
      faviconUrl: business?.faviconUrl ?? "",
      defaultMetaTitle: business?.defaultMetaTitle ?? "",
      defaultMetaDescription: business?.defaultMetaDescription ?? "",
      defaultKeywords: business?.defaultKeywords ?? [],
      defaultOgImageId: business?.defaultOgImageId ?? "",
      googleAnalyticsId: business?.googleAnalyticsId ?? "",
      googleTagManagerId: business?.googleTagManagerId ?? "",
      googleSearchConsoleVerification:
        business?.googleSearchConsoleVerification ?? "",
      navigationItems,
      pageSeo: pages.map((page) => ({
        pageId: page.id,
        seoTitle: page.seoTitle ?? "",
        seoDescription: page.seoDescription ?? "",
        seoKeywords: page.seoKeywords ?? [],
        canonicalPath: page.canonicalPath ?? page.route,
        robotsIndex: page.robotsIndex,
        robotsFollow: page.robotsFollow,
      })),
    },
  });

  const navigation = useFieldArray({
    control: form.control,
    name: "navigationItems",
  });
  const watchedDefaultMetaTitle = useWatch({
    control: form.control,
    name: "defaultMetaTitle",
  }) || "";
  const watchedDefaultMetaDescription = useWatch({
    control: form.control,
    name: "defaultMetaDescription",
  }) || "";
  const watchedSiteUrl = useWatch({
    control: form.control,
    name: "siteUrl",
  }) || "";
  const watchedPageSeo = useWatch({
    control: form.control,
    name: "pageSeo",
  }) || [];

  if (!business) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#d8d0c5] bg-[#f8f5f0] px-5 py-10 text-center text-sm text-[#556476]">
        Data settings bisnis belum tersedia.
      </div>
    );
  }

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const payload = {
        ...values,
        defaultKeywords: defaultKeywordInput,
        pageSeo: values.pageSeo.map((page) => ({
          ...page,
          seoKeywords: pageKeywordInputs[page.pageId] ?? "",
        })),
      };

      const result = await postJson<{ error?: string }>(
        "/api/admin/settings",
        payload,
      );

      if (!result.ok) {
        toast.error(result.data.error || "Settings gagal disimpan.");
        return;
      }

      toast.success("Settings dan SEO berhasil disimpan.");
      router.refresh();
    });
  });

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <section className="grid gap-5 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4">
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Site URL" {...form.register("siteUrl")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Logo URL" {...form.register("logoUrl")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Favicon URL" {...form.register("faviconUrl")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Default meta title" {...form.register("defaultMetaTitle")} />
          <textarea rows={4} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Default meta description" {...form.register("defaultMetaDescription")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Default keywords, pisahkan dengan koma" value={defaultKeywordInput} onChange={(event) => setDefaultKeywordInput(event.target.value)} />
          <select className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" {...form.register("defaultOgImageId")}>
            <option value="">Pilih default OG image</option>
            {mediaAssets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.title}
              </option>
            ))}
          </select>
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Google Analytics ID" {...form.register("googleAnalyticsId")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Google Tag Manager ID" {...form.register("googleTagManagerId")} />
          <input className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Search Console verification" {...form.register("googleSearchConsoleVerification")} />
        </div>
        <SerpPreview
          title={watchedDefaultMetaTitle}
          description={watchedDefaultMetaDescription}
          url={watchedSiteUrl}
        />
      </section>

      <section className="rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-[#182433]">Navigasi</h2>
          <button
            type="button"
            onClick={() =>
              navigation.append({
                label: "",
                href: "",
                isVisible: true,
                isExternal: false,
                sortOrder: navigation.fields.length,
              })
            }
            className="rounded-xl border border-[#d8d0c5] bg-[#f8f5f0] px-4 py-2 text-sm font-semibold"
          >
            Tambah menu
          </button>
        </div>
        <div className="mt-4 grid gap-4">
          {navigation.fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-[22px] border border-[#eee8df] bg-[#fbf9f5] p-4 lg:grid-cols-[0.9fr_1.3fr_auto_auto_auto]">
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="Label" {...form.register(`navigationItems.${index}.label`)} />
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="Href" {...form.register(`navigationItems.${index}.href`)} />
              <label className="inline-flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" {...form.register(`navigationItems.${index}.isVisible`)} />
                Tampil
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" {...form.register(`navigationItems.${index}.isExternal`)} />
                External
              </label>
              <button type="button" onClick={() => navigation.remove(index)} className="rounded-xl border border-[#efc6c1] bg-[#fff6f5] px-4 py-2 text-sm font-semibold text-[#b33b2e]">
                Hapus
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-semibold text-[#182433]">SEO per halaman</h2>
        <div className="mt-4 grid gap-4">
          {watchedPageSeo.map((page, index) => (
            <div key={page.pageId} className="grid gap-3 rounded-[22px] border border-[#eee8df] bg-[#fbf9f5] p-4">
              <p className="text-sm font-semibold text-[#182433]">
                {pages[index]?.route}
              </p>
              <input type="hidden" {...form.register(`pageSeo.${index}.pageId`)} />
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="SEO title" {...form.register(`pageSeo.${index}.seoTitle`)} />
              <textarea rows={3} className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="SEO description" {...form.register(`pageSeo.${index}.seoDescription`)} />
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="Canonical path" {...form.register(`pageSeo.${index}.canonicalPath`)} />
              <input className="rounded-2xl border border-[#ddd6cb] bg-white px-4 py-3 text-sm" placeholder="SEO keywords, pisahkan dengan koma" value={pageKeywordInputs[page.pageId] ?? ""} onChange={(event) => setPageKeywordInputs((current: Record<string, string>) => ({ ...current, [page.pageId]: event.target.value }))} />
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" {...form.register(`pageSeo.${index}.robotsIndex`)} />
                  Index
                </label>
                <label className="inline-flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" {...form.register(`pageSeo.${index}.robotsFollow`)} />
                  Follow
                </label>
              </div>
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
          {isPending ? "Menyimpan..." : "Simpan settings"}
        </button>
      </div>
    </form>
  );
}
