import { revalidatePath } from "next/cache";

const sitePaths = [
  "/",
  "/layanan",
  "/portfolio",
  "/tentang",
  "/ulasan",
  "/faq",
  "/lokasi",
];

export function revalidateSite() {
  for (const path of sitePaths) {
    revalidatePath(path);
  }

  revalidatePath("/portfolio/[slug]", "page");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");
}

export function revalidateAdmin() {
  revalidatePath("/admin");
  revalidatePath("/admin/pages/home");
  revalidatePath("/admin/services");
  revalidatePath("/admin/portfolio");
  revalidatePath("/admin/faq");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/contact");
  revalidatePath("/admin/settings");
  revalidatePath("/admin/media");
}
