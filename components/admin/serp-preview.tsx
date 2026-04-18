type SerpPreviewProps = {
  title: string;
  description: string;
  url: string;
};

export function SerpPreview({ title, description, url }: SerpPreviewProps) {
  return (
    <div className="rounded-[24px] border border-[#ddd6cb] bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
        Preview SERP
      </p>
      <div className="mt-4">
        <p className="truncate text-sm text-[#1a7f37]">{url}</p>
        <h3 className="mt-2 text-xl font-semibold leading-tight text-[#1a0dab]">
          {title || "Judul SEO akan tampil di sini"}
        </h3>
        <p className="mt-2 text-sm leading-7 text-[#4d5156]">
          {description || "Deskripsi SEO akan tampil di sini."}
        </p>
      </div>
    </div>
  );
}
