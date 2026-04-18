"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { ItemCrudTable } from "@/components/admin/item-crud-table";
import { deleteJson, postJson } from "@/lib/admin-client";
import type { CmsFaq } from "@/lib/cms/types";
import { faqSchema } from "@/lib/validation/admin";

type FaqFormValues = z.input<typeof faqSchema>;
type FaqSubmitValues = z.output<typeof faqSchema>;

const emptyValues: FaqFormValues = {
  question: "",
  answer: "",
  sortOrder: 0,
  status: "PUBLISHED",
};

export function FaqManager({ items }: { items: CmsFaq[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FaqFormValues, unknown, FaqSubmitValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: emptyValues,
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await postJson<{ error?: string }>("/api/admin/faq", values);

      if (!result.ok) {
        toast.error(result.data.error || "FAQ gagal disimpan.");
        return;
      }

      toast.success("FAQ berhasil disimpan.");
      form.reset(emptyValues);
      router.refresh();
    });
  });

  return (
    <div className="grid gap-6">
      <ItemCrudTable
        items={items}
        emptyMessage="Belum ada FAQ."
        columns={[
          { key: "question", label: "Pertanyaan", render: (item) => item.question },
          { key: "answer", label: "Jawaban", render: (item) => item.answer },
          { key: "status", label: "Status", render: (item) => item.status },
        ]}
        onEdit={(item) =>
          form.reset({
            id: item.id,
            question: item.question,
            answer: item.answer,
            sortOrder: item.sortOrder,
            status: item.status,
          })
        }
        onDelete={(item) => {
          if (!window.confirm(`Hapus FAQ "${item.question}"?`)) {
            return;
          }

          startTransition(async () => {
            const result = await deleteJson<{ error?: string }>(
              `/api/admin/faq/${item.id}`,
            );

            if (!result.ok) {
              toast.error(result.data.error || "FAQ gagal dihapus.");
              return;
            }

            toast.success("FAQ berhasil dihapus.");
            router.refresh();
          });
        }}
      />

      <form className="grid gap-5 rounded-[28px] border border-[#ddd6cb] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]" onSubmit={onSubmit}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
              Form FAQ
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#182433]">
              Tambah atau edit FAQ
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
        <textarea rows={2} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Pertanyaan" {...form.register("question")} />
        <textarea rows={5} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Jawaban" {...form.register("answer")} />
        <div className="grid gap-4 lg:grid-cols-2">
          <input type="number" min={0} className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" placeholder="Urutan" {...form.register("sortOrder", { valueAsNumber: true })} />
          <select className="rounded-2xl border border-[#ddd6cb] bg-[#f8f5f0] px-4 py-3 text-sm" {...form.register("status")}>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white transition hover:bg-[#29415c] disabled:opacity-60"
          >
            {isPending ? "Menyimpan..." : "Simpan FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
}
