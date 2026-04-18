import { AdminShell } from "@/components/admin/admin-shell";
import { PortfolioManager } from "@/components/admin/portfolio-manager";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminPortfolioData } from "@/lib/cms/admin";

export default async function AdminPortfolioPage() {
  await requireAdminSession();

  const data = await getAdminPortfolioData();

  return (
    <AdminShell
      currentPath="/admin/portfolio"
      title="Portfolio"
      description="Tambah, edit, hapus, dan urutkan proyek portfolio lengkap dengan cover image, slug SEO, dan publish state."
    >
      <PortfolioManager
        portfolioItems={data.portfolioItems}
        mediaAssets={data.mediaAssets}
      />
    </AdminShell>
  );
}
