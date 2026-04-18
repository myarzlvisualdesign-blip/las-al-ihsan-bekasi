import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAdminDashboardData } from "@/lib/cms/admin";

export default async function AdminDashboardPage() {
  await requireAdminSession();

  const dashboard = await getAdminDashboardData();
  const cards = [
    { label: "Portfolio", value: dashboard.portfolioCount },
    { label: "Layanan", value: dashboard.serviceCount },
    { label: "FAQ", value: dashboard.faqCount },
    { label: "Testimonials", value: dashboard.testimonialCount },
    { label: "Media", value: dashboard.mediaCount },
    { label: "Pages", value: dashboard.pageCount },
  ];

  return (
    <AdminShell
      currentPath="/admin"
      title="Dashboard"
      description="Ringkasan resource utama untuk memastikan konten, SEO, dan media berada dalam kondisi terkelola."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-[28px] border border-[#ddd6cb] bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.04)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">
              {card.label}
            </p>
            <p className="mt-4 font-display text-[3rem] leading-none text-[#182433]">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
