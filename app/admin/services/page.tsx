import { AdminShell } from "@/components/admin/admin-shell";
import { ServicesManager } from "@/components/admin/services-manager";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminServicesData } from "@/lib/cms/admin";

export default async function AdminServicesPage() {
  await requireAdminSession();

  const data = await getAdminServicesData();

  return (
    <AdminShell
      currentPath="/admin/services"
      title="Layanan"
      description="Kelola daftar layanan yang tampil di homepage, halaman layanan, schema Service, dan internal linking."
    >
      <ServicesManager
        services={data.services}
        mediaAssets={data.mediaAssets}
      />
    </AdminShell>
  );
}
