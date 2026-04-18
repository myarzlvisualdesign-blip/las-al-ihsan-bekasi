import { AdminShell } from "@/components/admin/admin-shell";
import { FaqManager } from "@/components/admin/faq-manager";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminFaqData } from "@/lib/cms/admin";

export default async function AdminFaqPage() {
  await requireAdminSession();

  const faqs = await getAdminFaqData();

  return (
    <AdminShell
      currentPath="/admin/faq"
      title="FAQ"
      description="Kelola pertanyaan umum untuk homepage, halaman FAQ, dan structured data FAQPage."
    >
      <FaqManager items={faqs} />
    </AdminShell>
  );
}
