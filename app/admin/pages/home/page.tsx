import { AdminShell } from "@/components/admin/admin-shell";
import { HomeEditor } from "@/components/admin/home-editor";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminHomeEditorData } from "@/lib/cms/admin";

export default async function AdminHomePage() {
  await requireAdminSession();

  const data = await getAdminHomeEditorData();

  return (
    <AdminShell
      currentPath="/admin/pages/home"
      title="Homepage"
      description="Semua heading, paragraph, CTA, image, toggle section, dan SEO homepage dikelola dari sini."
    >
      <HomeEditor
        homePage={data.homePage}
        globalPage={data.globalPage}
        siteUrl={process.env.NEXT_PUBLIC_SITE_URL || "https://bengkellasal-ihsan.com"}
      />
    </AdminShell>
  );
}
