import type { NextRequest } from "next/server";
import { ContentStatus } from "@prisma/client";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { upsertLocalTestimonial } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { testimonialSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const body = await request.json();
  const parsed = testimonialSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Data testimonial tidak valid.");
  }

  if (!hasDatabaseUrl) {
    try {
      const state = await upsertLocalTestimonial(parsed.data);
      const testimonial =
        state.testimonials.find((item) => item.id === parsed.data.id) ??
        state.testimonials.find(
          (item) =>
            item.customerName === parsed.data.customerName &&
            item.quote === parsed.data.quote &&
            item.sourceLabel === parsed.data.sourceLabel,
        );

      if (!testimonial) {
        throw new Error("Testimonial gagal ditemukan setelah disimpan.");
      }

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ testimonial, storageMode: "local" });
    } catch (error) {
      return jsonError(getPrismaMessage(error));
    }
  }

  try {
    const payload = {
      customerName: parsed.data.customerName,
      customerRole: parsed.data.customerRole || null,
      quote: parsed.data.quote,
      rating: parsed.data.rating,
      sourceLabel: parsed.data.sourceLabel,
      sourceUrl: parsed.data.sourceUrl || null,
      avatarImageId: parsed.data.avatarImageId || null,
      sortOrder: parsed.data.sortOrder,
      isFeatured: parsed.data.isFeatured,
      status: ContentStatus[parsed.data.status],
    };

    const testimonial = parsed.data.id
      ? await prisma.testimonial.update({
          where: { id: parsed.data.id },
          data: payload,
        })
      : await prisma.testimonial.create({
          data: payload,
        });

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ testimonial });
  } catch (error) {
    return jsonError(getPrismaMessage(error));
  }
}
