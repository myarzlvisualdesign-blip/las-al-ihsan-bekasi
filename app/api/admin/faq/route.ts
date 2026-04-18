import type { NextRequest } from "next/server";
import { ContentStatus } from "@prisma/client";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { upsertLocalFaq } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { faqSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const body = await request.json();
  const parsed = faqSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Data FAQ tidak valid.");
  }

  if (!hasDatabaseUrl) {
    try {
      const state = await upsertLocalFaq(parsed.data);
      const faq =
        state.faqs.find((item) => item.id === parsed.data.id) ??
        state.faqs.find(
          (item) =>
            item.question === parsed.data.question &&
            item.answer === parsed.data.answer &&
            item.sortOrder === parsed.data.sortOrder,
        );

      if (!faq) {
        throw new Error("FAQ gagal ditemukan setelah disimpan.");
      }

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ faq, storageMode: "local" });
    } catch (error) {
      return jsonError(getPrismaMessage(error));
    }
  }

  try {
    const payload = {
      question: parsed.data.question,
      answer: parsed.data.answer,
      sortOrder: parsed.data.sortOrder,
      status: ContentStatus[parsed.data.status],
    };

    const faq = parsed.data.id
      ? await prisma.faqItem.update({
          where: { id: parsed.data.id },
          data: payload,
        })
      : await prisma.faqItem.create({
          data: payload,
        });

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ faq });
  } catch (error) {
    return jsonError(getPrismaMessage(error));
  }
}
