import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSession } from "@/lib/auth/guards";
import { hasDatabaseUrl } from "@/lib/env";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f3ee_0%,#efe9df_100%)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[32px] border border-white/70 bg-[rgba(255,255,255,0.82)] p-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
            Admin Panel
          </p>
          <h1 className="mt-4 font-display text-[3rem] leading-[0.94] text-[#182433]">
            CMS custom Bengkel Las Al-Ihsan
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-[#556476]">
            Panel ini mengelola homepage, layanan, portfolio, testimonial,
            FAQ, kontak, media, dan SEO website secara langsung dari
            source of truth CMS.
          </p>
          <p className="mt-3 max-w-xl text-xs leading-6 text-[#7a8595]">
            {hasDatabaseUrl
              ? "Mode aktif: PostgreSQL production datastore."
              : "Mode aktif: local persistent store di data/cms-state.json dan public/uploads."}
          </p>
        </div>
        <div className="rounded-[32px] border border-white/70 bg-[rgba(255,255,255,0.82)] p-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
