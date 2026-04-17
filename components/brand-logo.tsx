type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({
  compact = false,
  className = "",
}: BrandLogoProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-[1.4rem] border border-[#dce5f5] bg-white px-3 py-2 shadow-[0_18px_48px_rgba(32,54,95,0.12)] ${className}`}
    >
      <div className="relative flex h-14 w-14 items-center justify-center rounded-[1rem] bg-[#eef3fb] sm:h-16 sm:w-16">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
          className="h-full w-full"
        >
          <circle cx="60" cy="60" r="58" fill="#fff" />
          <path
            d="M22 90c6-16 20-25 38-25s32 9 38 25H22Z"
            fill="#243d6b"
          />
          <path
            d="M41 63 30 89h18l10-13 9 13h23L79 63H41Z"
            fill="#ef3945"
          />
          <path
            d="M40 58c0-22 15-36 34-36 18 0 30 13 30 31 0 10-3 17-8 22l-6-7c3-3 5-7 5-13 0-13-8-22-21-22-14 0-24 10-24 25h-10Z"
            fill="#ef3945"
          />
          <path
            d="m61 31 11 8 23-8c-4-7-12-12-22-12-7 0-13 2-18 6l6 6Z"
            fill="#243d6b"
          />
          <path
            d="M56 44c8-8 22-12 39-14l2 8c-12 4-24 8-35 12l-6 18-9-5 9-19Z"
            fill="#243d6b"
          />
          <path
            d="m34 67 26 12-5 9-27-10c-3-1-4-4-3-7 2-4 5-6 9-4Z"
            fill="#243d6b"
          />
          <path
            d="m50 71 18 18h13L60 66l-10 5Z"
            fill="#243d6b"
          />
          <path
            d="M38 82h12"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="m82 88 12 12"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="m83 80 17 4M82 84l8 15M79 88l-2 18M78 84l-13 11"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="leading-none">
        <div className="flex items-end gap-2">
          <span className="font-display text-[1.15rem] leading-none tracking-[0.06em] text-[#243d6b] [transform:skewX(-12deg)] sm:text-[1.45rem]">
            BENGKEL LAS
          </span>
        </div>
        <span
          className={`mt-1 block font-display leading-none tracking-[0.04em] text-[#ef3945] [transform:skewX(-12deg)] ${
            compact ? "text-[1.7rem] sm:text-[2rem]" : "text-[2rem] sm:text-[2.8rem]"
          }`}
        >
          AL IHSAN
        </span>
      </div>
    </div>
  );
}
