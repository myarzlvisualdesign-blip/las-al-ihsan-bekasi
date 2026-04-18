import { AdminShell } from "@/components/admin/admin-shell";
import { MediaManager } from "@/components/admin/media-manager";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminMediaData } from "@/lib/cms/admin";

export default async function AdminMediaPage() {
  await requireAdminSession();

  const assets = await getAdminMediaData();

  return (
    <AdminShell
      currentPath="/admin/media"
      title="Media"
      description="Upload, ganti, hapus, dan copy URL asset gambar atau video dengan validasi file dan preview."
    >
      <MediaManager assets={assets} />
    </AdminShell>
  );
}
