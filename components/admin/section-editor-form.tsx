"use client";

import { Controller, type Control, type UseFormRegister } from "react-hook-form";

import { ImageUploader } from "@/components/admin/image-uploader";
import type { HomeEditorFormInput } from "@/lib/validation/admin";

type AdminSectionBlock = {
  id: string;
  key: string;
  label: string;
  type: "TEXT" | "TEXTAREA" | "URL" | "IMAGE" | "BOOLEAN" | "JSON";
  sortOrder: number;
  value: unknown;
};

type AdminSectionData = {
  id: string;
  key: string;
  name: string;
  isVisible: boolean;
  sortOrder: number;
  blocks: AdminSectionBlock[];
};

type SectionEditorFormProps = {
  section: AdminSectionData;
  sectionIndex: number;
  formKey: "sections" | "globalSections";
  register: UseFormRegister<HomeEditorFormInput>;
  control: Control<HomeEditorFormInput>;
};

function resolveImageValue(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const candidate = value as {
      assetId?: string | null;
      url?: unknown;
      alt?: unknown;
    };

    return {
      assetId:
        typeof candidate.assetId === "string" || candidate.assetId === null
          ? candidate.assetId
          : null,
      url: typeof candidate.url === "string" ? candidate.url : "",
      alt: typeof candidate.alt === "string" ? candidate.alt : "",
    };
  }

  return {
    assetId: null,
    url: "",
    alt: "",
  };
}

export function SectionEditorForm({
  section,
  sectionIndex,
  formKey,
  register,
  control,
}: SectionEditorFormProps) {
  const sectionPath = `${formKey}.${sectionIndex}` as const;

  return (
    <section className="rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]">
      <input type="hidden" {...register(`${sectionPath}.id` as const)} />
      <input type="hidden" {...register(`${sectionPath}.key` as const)} />
      <input type="hidden" {...register(`${sectionPath}.name` as const)} />
      <div className="flex flex-col gap-3 border-b border-[#eee8df] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
            {section.key}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-[#182433]">
            {section.name}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#364152]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#c9c1b6]"
              {...register(`${sectionPath}.isVisible` as const)}
            />
            Tampilkan section
          </label>
          <div className="grid gap-1">
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a8595]">
              Urutan
            </label>
            <input
              type="number"
              min={0}
              className="w-24 rounded-xl border border-[#ddd6cb] bg-[#f8f5f0] px-3 py-2 text-sm"
              {...register(`${sectionPath}.sortOrder` as const, {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {section.blocks.map((block, blockIndex) => {
          const blockPath = `${sectionPath}.blocks.${blockIndex}` as const;

          return (
            <div key={block.id} className="grid gap-2">
              <input type="hidden" {...register(`${blockPath}.id` as const)} />
              <input type="hidden" {...register(`${blockPath}.key` as const)} />
              <input type="hidden" {...register(`${blockPath}.label` as const)} />
              <input type="hidden" {...register(`${blockPath}.type` as const)} />
              <input
                type="hidden"
                {...register(`${blockPath}.sortOrder` as const, { valueAsNumber: true })}
              />

              {block.type === "TEXT" || block.type === "URL" ? (
                <>
                  <label className="text-sm font-semibold text-[#182433]">
                    {block.label}
                  </label>
                  <input
                    type={block.type === "URL" ? "url" : "text"}
                    className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm text-[#182433] outline-none transition focus:border-[#22364d] focus:bg-white"
                    {...register(`${blockPath}.value` as const)}
                  />
                </>
              ) : null}

              {block.type === "TEXTAREA" ? (
                <>
                  <label className="text-sm font-semibold text-[#182433]">
                    {block.label}
                  </label>
                  <textarea
                    rows={4}
                    className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm text-[#182433] outline-none transition focus:border-[#22364d] focus:bg-white"
                    {...register(`${blockPath}.value` as const)}
                  />
                </>
              ) : null}

              {block.type === "BOOLEAN" ? (
                <label className="inline-flex min-h-[3.25rem] items-center gap-3 rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm font-semibold text-[#182433]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#c9c1b6]"
                    {...register(`${blockPath}.value` as const)}
                  />
                  {block.label}
                </label>
              ) : null}

              {block.type === "JSON" ? (
                <>
                  <label className="text-sm font-semibold text-[#182433]">
                    {block.label}
                  </label>
                  <textarea
                    rows={5}
                    className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 font-mono text-xs text-[#182433] outline-none transition focus:border-[#22364d] focus:bg-white"
                    {...register(`${blockPath}.value` as const)}
                  />
                </>
              ) : null}

              {block.type === "IMAGE" ? (
                <Controller
                  control={control}
                  name={`${blockPath}.value` as const}
                  render={({ field }) => (
                    <ImageUploader
                      label={block.label}
                      value={resolveImageValue(field.value)}
                      onChange={field.onChange}
                    />
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
