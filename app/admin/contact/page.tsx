import { AdminShell } from "@/components/admin/admin-shell";
import { ContactEditor } from "@/components/admin/contact-editor";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminContactData } from "@/lib/cms/admin";

export default async function AdminContactPage() {
  await requireAdminSession();

  const business = await getAdminContactData();

  return (
    <AdminShell
      currentPath="/admin/contact"
      title="Contact"
      description="Kelola alamat, nomor WhatsApp, social links, Google Maps, jam operasional, dan area layanan lokal untuk local SEO."
    >
      <ContactEditor business={business} />
    </AdminShell>
  );
}
