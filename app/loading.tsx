export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-4">
        <div className="h-10 w-40 animate-pulse rounded-full bg-white/70" />
        <div className="h-28 w-full animate-pulse rounded-[32px] bg-white/70" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-56 animate-pulse rounded-[28px] bg-white/70" />
          <div className="h-56 animate-pulse rounded-[28px] bg-white/70" />
          <div className="h-56 animate-pulse rounded-[28px] bg-white/70" />
        </div>
      </div>
    </main>
  );
}
