import { AdminShell } from "@/components/admin/admin-shell";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminTestimonialsData } from "@/lib/cms/admin";

export default async function AdminTestimonialsPage() {
  await requireAdminSession();

  const data = await getAdminTestimonialsData();

  return (
    <AdminShell
      currentPath="/admin/testimonials"
      title="Testimonials"
      description="Kelola ulasan customer, rating, source, dan avatar yang dipakai pada homepage dan halaman ulasan."
    >
      <TestimonialsManager
        testimonials={data.testimonials}
        mediaAssets={data.mediaAssets}
      />
    </AdminShell>
  );
}
