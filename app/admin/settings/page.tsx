import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsEditor } from "@/components/admin/settings-editor";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminSettingsData } from "@/lib/cms/admin";

export default async function AdminSettingsPage() {
  await requireAdminSession();

  const data = await getAdminSettingsData();

  return (
    <AdminShell
      currentPath="/admin/settings"
      title="Settings"
      description="Kelola branding, global SEO, analytics, search console, navigasi, dan metadata tiap halaman."
    >
      <SettingsEditor
        business={data.business}
        navigationItems={data.navigationItems}
        pages={data.pages}
        mediaAssets={data.mediaAssets}
      />
    </AdminShell>
  );
}
