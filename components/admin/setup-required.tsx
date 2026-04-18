export function SetupRequired({ message }: { message?: string }) {
  return (
    <div className="rounded-[28px] border border-[#e8d8c9] bg-white p-8 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
        Setup diperlukan
      </p>
      <h1 className="mt-4 font-display text-4xl text-[#182433]">
        Admin panel membutuhkan PostgreSQL aktif.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#556476]">
        {message ??
          "Konfigurasikan DATABASE_URL dan DIRECT_URL di environment, lalu jalankan prisma generate, prisma db push, dan prisma db seed sebelum menggunakan admin panel."}
      </p>
      <pre className="mt-6 overflow-x-auto rounded-2xl bg-[#182433] px-5 py-4 text-sm text-[#d7dee7]">
        <code>{`cp .env.example .env.local
npm run db:generate
npm run db:push
npm run db:seed`}</code>
      </pre>
    </div>
  );
}
