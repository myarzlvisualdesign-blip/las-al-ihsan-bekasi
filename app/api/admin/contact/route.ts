import type { NextRequest } from "next/server";
import { SocialPlatform } from "@prisma/client";

import {
  jsonError,
  jsonSuccess,
  getPrismaMessage,
} from "@/app/api/admin/_helpers";
import { requireAdminApi } from "@/lib/auth/guards";
import { updateLocalContact } from "@/lib/cms/local-store";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { revalidateAdmin, revalidateSite } from "@/lib/revalidate";
import { contactSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi(request);

  if (!session) {
    return jsonError("Akses admin ditolak.", 401);
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || "Data kontak tidak valid.");
  }

  if (!hasDatabaseUrl) {
    try {
      await updateLocalContact(parsed.data);

      revalidateAdmin();
      revalidateSite();

      return jsonSuccess({ success: true, storageMode: "local" });
    } catch (error) {
      return jsonError(getPrismaMessage(error));
    }
  }

  try {
    const data = parsed.data;

    await prisma.businessProfile.update({
      where: { id: "default" },
      data: {
        businessName: data.businessName,
        shortName: data.shortName,
        tagline: data.tagline || null,
        supportEmail: data.supportEmail || null,
        primaryPhone: data.primaryPhone,
        secondaryPhone: data.secondaryPhone || null,
        whatsappPrimary: data.whatsappPrimary,
        whatsappSecondary: data.whatsappSecondary || null,
        whatsappMessage: data.whatsappMessage,
        whatsappSecondaryMessage: data.whatsappSecondaryMessage || null,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || null,
        district: data.district || null,
        city: data.city,
        region: data.region,
        postalCode: data.postalCode,
        countryCode: data.countryCode,
        mapsUrl: data.mapsUrl,
        mapsEmbedUrl: data.mapsEmbedUrl,
        reviewUrl: data.reviewUrl || null,
        instagramUrl: data.instagramUrl || null,
        tiktokUrl: data.tiktokUrl || null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        areasServed: data.areasServed,
        openingHoursNote: data.openingHoursNote || null,
      },
    });

    await prisma.socialLink.deleteMany({
      where: { profileId: "default" },
    });

    await prisma.operatingHour.deleteMany({
      where: { profileId: "default" },
    });

    await prisma.socialLink.createMany({
      data: data.socialLinks.map((item) => ({
        profileId: "default",
        platform: SocialPlatform[item.platform],
        label: item.label,
        url: item.url,
        isVisible: item.isVisible,
        sortOrder: item.sortOrder,
      })),
    });

    await prisma.operatingHour.createMany({
      data: data.operatingHours.map((item) => ({
        profileId: "default",
        dayLabel: item.dayLabel,
        opensAt: item.opensAt || null,
        closesAt: item.closesAt || null,
        isClosed: item.isClosed,
        sortOrder: item.sortOrder,
      })),
    });

    revalidateAdmin();
    revalidateSite();

    return jsonSuccess({ success: true });
  } catch (error) {
    return jsonError(getPrismaMessage(error));
  }
}
