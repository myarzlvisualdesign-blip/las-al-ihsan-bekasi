"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { SectionEditorForm } from "@/components/admin/section-editor-form";
import { SerpPreview } from "@/components/admin/serp-preview";
import { postJson } from "@/lib/admin-client";
import {
  homeEditorSchema,
  type HomeEditorFormInput,
  type HomeEditorFormValues,
} from "@/lib/validation/admin";

type AdminEditableBlock = {
  id: string;
  key: string;
  label: string;
  type: "TEXT" | "TEXTAREA" | "URL" | "IMAGE" | "BOOLEAN" | "JSON";
  sortOrder: number;
  value: unknown;
};

type AdminEditableSection = {
  id: string;
  key: string;
  name: string;
  isVisible: boolean;
  sortOrder: number;
  blocks: AdminEditableBlock[];
};

type EditablePageData = {
  id: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  canonicalPath: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  sections: AdminEditableSection[];
};

type HomeEditorProps = {
  homePage: EditablePageData | null;
  globalPage: Pick<EditablePageData, "sections"> | null;
  siteUrl: string;
};

export function HomeEditor({ homePage, globalPage, siteUrl }: HomeEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [keywordInput, setKeywordInput] = useState(
    (homePage?.seoKeywords ?? []).join(", "),
  );

  const form = useForm<HomeEditorFormInput, unknown, HomeEditorFormValues>({
    resolver: zodResolver(homeEditorSchema),
    defaultValues: {
      page: {
        pageId: homePage?.id ?? "",
        seoTitle: homePage?.seoTitle ?? "",
        seoDescription: homePage?.seoDescription ?? "",
        seoKeywords: homePage?.seoKeywords ?? [],
        canonicalPath: homePage?.canonicalPath ?? "/",
        robotsIndex: homePage?.robotsIndex ?? true,
        robotsFollow: homePage?.robotsFollow ?? true,
      },
      sections: (homePage?.sections ?? []) as HomeEditorFormInput["sections"],
      globalSections: (globalPage?.sections ?? []) as HomeEditorFormInput["globalSections"],
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const payload = {
        ...values,
        page: {
          ...values.page,
          seoKeywords: keywordInput
            .split(",")
            .map((item: string) => item.trim())
            .filter(Boolean),
        },
      };

      const result = await postJson<{ error?: string }>(
        "/api/admin/pages/home",
        payload,
      );

      if (!result.ok) {
        toast.error(result.data.error || "Homepage gagal disimpan.");
        return;
      }

      toast.success("Homepage berhasil disimpan.");
      router.refresh();
    });
  });

  const seoTitle = useWatch({
    control: form.control,
    name: "page.seoTitle",
  }) || "";
  const seoDescription = useWatch({
    control: form.control,
    name: "page.seoDescription",
  }) || "";
  const canonicalPath = useWatch({
    control: form.control,
    name: "page.canonicalPath",
  }) || "/";

  if (!homePage || !globalPage) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#d8d0c5] bg-[#f8f5f0] px-5 py-10 text-center text-sm text-[#556476]">
        Data homepage belum tersedia.
      </div>
    );
  }

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <section className="grid gap-5 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#182433]">
              SEO Title
            </label>
            <input
              type="text"
              className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
              {...form.register("page.seoTitle")}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#182433]">
              Meta Description
            </label>
            <textarea
              rows={4}
              className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
              {...form.register("page.seoDescription")}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#182433]">
              Keywords
            </label>
            <input
              type="text"
              value={keywordInput}
              onChange={(event) => setKeywordInput(event.target.value)}
              className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="grid gap-2 sm:col-span-2">
              <label className="text-sm font-semibold text-[#182433]">
                Canonical path
              </label>
              <input
                type="text"
                className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm"
                {...form.register("page.canonicalPath")}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#182433]">
                Robots
              </label>
              <label className="inline-flex items-center gap-2 rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm font-semibold">
                <input type="checkbox" {...form.register("page.robotsIndex")} />
                Index
              </label>
              <label className="inline-flex items-center gap-2 rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm font-semibold">
                <input type="checkbox" {...form.register("page.robotsFollow")} />
                Follow
              </label>
            </div>
          </div>
        </div>
        <SerpPreview
          title={seoTitle}
          description={seoDescription}
          url={`${siteUrl}${canonicalPath}`}
        />
      </section>

      <div className="grid gap-5">
        {homePage.sections.map((section, index) => (
          <SectionEditorForm
            key={section.id}
            section={section}
            sectionIndex={index}
            formKey="sections"
            register={form.register}
            control={form.control}
          />
        ))}
      </div>

      <div className="grid gap-5">
        {globalPage.sections.map((section, index) => (
          <SectionEditorForm
            key={section.id}
            section={section}
            sectionIndex={index}
            formKey="globalSections"
            register={form.register}
            control={form.control}
          />
        ))}
      </div>

      <div className="sticky bottom-4 z-20 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(15,23,42,0.16)] transition hover:bg-[#29415c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Menyimpan..." : "Simpan perubahan homepage"}
        </button>
      </div>
    </form>
  );
}
