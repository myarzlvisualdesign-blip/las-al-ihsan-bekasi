export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f3ee_0%,#efe9df_100%)] px-4 py-8">
      <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="h-[32rem] animate-pulse rounded-[28px] bg-white/70" />
        <div className="h-[32rem] animate-pulse rounded-[32px] bg-white/70" />
      </div>
    </div>
  );
}
