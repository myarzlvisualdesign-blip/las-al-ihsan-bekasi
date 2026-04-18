"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/button-link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from "@/components/icons";
import { siteConfig, type DocumentationMedia } from "@/lib/site";

type DocumentationCarouselProps = {
  items: DocumentationMedia[];
};

const AUTOPLAY_DELAY_MS = 4800;

const controlButtonClass =
  "site-button inline-flex items-center justify-center gap-2 rounded-full border border-[#d7ddd6] bg-white px-4 py-2 text-sm font-semibold text-[#253243] transition hover:border-[#182433] hover:bg-[#f8f6f2]";

function formatDuration(durationSeconds?: number) {
  if (!durationSeconds) {
    return "Video";
  }

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function DocumentationCarousel({ items }: DocumentationCarouselProps) {
  const photos = items.filter((item) => item.type === "image");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const normalizeIndex = (nextIndex: number) =>
    (nextIndex + photos.length) % photos.length;
  const goToSlide = (nextIndex: number) => {
    setActiveIndex(normalizeIndex(nextIndex));
  };
  const stepSlide = (step: number) => {
    setActiveIndex((current) => normalizeIndex(current + step));
  };

  useEffect(() => {
    if (photos.length < 2 || isPaused) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1 + photos.length) % photos.length);
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeIndex, isPaused, photos.length]);

  if (photos.length === 0) {
    return null;
  }

  const activePhoto = photos[activeIndex];
  const progressStyle = {
    "--progress-duration": `${AUTOPLAY_DELAY_MS}ms`,
  } as CSSProperties;

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="site-panel rounded-[28px] border border-[#d8ddd7] bg-white p-3 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-4 lg:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div
            key={activePhoto.src}
            className="site-fade-in relative overflow-hidden rounded-[24px] bg-[#15202c] aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/11]"
          >
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 52vw"
              className="object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full bg-white/94 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#182433] shadow-[0_12px_26px_rgba(15,23,42,0.08)]">
              Foto Proyek Asli
            </div>
          </div>
          <div
            key={`${activePhoto.src}-copy`}
            className="site-fade-in flex flex-col justify-between rounded-[24px] border border-[#e1ddd5] bg-[#f8f5f0] p-5 sm:p-6"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#dbe4da] bg-white px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#2d5e4c]">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isPaused ? "bg-[#c9972f]" : "bg-[#0f9d58]"
                    } ${isPaused ? "" : "site-bob"}`}
                  />
                  {isPaused ? "Auto-Swap Dijeda" : "Auto-Swap Aktif"}
                </div>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#d7dde5]">
                  <span
                    key={`${activePhoto.src}-${isPaused ? "paused" : "active"}`}
                    className={`block h-full rounded-full bg-[#182433] ${
                      isPaused ? "" : "site-progress"
                    }`}
                    style={progressStyle}
                  />
                </div>
              </div>

              <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                {activePhoto.category}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[#182433] sm:text-[2rem]">
                {activePhoto.title}
              </h3>
              <p className="mt-4 text-sm leading-8 text-[#556476] sm:text-base">
                {activePhoto.description}
              </p>
              <div className="mt-6 grid gap-3 text-sm text-[#253243] sm:grid-cols-2">
                <div className="site-chip rounded-2xl border border-[#ddd8cf] bg-white px-4 py-4">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-amber">
                    Sumber
                  </span>
                  <span className="mt-2 block font-semibold text-[#182433]">
                    Foto proyek pengerjaan asli
                  </span>
                </div>
                <div className="site-chip rounded-2xl border border-[#ddd8cf] bg-white px-4 py-4">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-amber">
                    Keterangan
                  </span>
                  <span className="mt-2 block font-semibold text-[#182433]">
                    Foto nyata, bukan stok atau mockup template
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/portfolio">Lihat Halaman Portfolio</ButtonLink>
              <ButtonLink href={siteConfig.whatsappPrimaryUrl} variant="secondary">
                Tanya Proyek Serupa
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="overflow-x-auto px-1 py-3">
          <div className="flex min-w-max gap-3">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Buka foto ${index + 1}: ${photo.title}`}
                aria-pressed={index === activeIndex}
                title={photo.title}
                className={`site-chip site-chip-static flex h-[9.5rem] w-[12.5rem] shrink-0 items-start gap-3 rounded-[1.2rem] border px-3.5 py-3.5 text-left transition sm:h-[10rem] sm:w-[13.25rem] ${
                  index === activeIndex
                    ? "border-[#182433] bg-[#182433] text-white shadow-[0_16px_28px_rgba(15,23,42,0.14)]"
                    : "border-[#d7ddd6] bg-white text-[#253243] hover:border-[#182433]"
                }`}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1rem]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex flex-1 flex-col justify-center self-stretch">
                  <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-amber">
                    Foto {index + 1}
                  </p>
                  <p className="mt-1 line-clamp-4 text-[1rem] font-semibold leading-[1.12] break-words sm:text-[1.05rem]">
                    {photo.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 lg:justify-end">
          <button
            type="button"
            onClick={() => stepSlide(-1)}
            className={controlButtonClass}
          >
            <ChevronLeftIcon className="h-4.5 w-4.5" />
            <span>Sebelumnya</span>
          </button>
          <button
            type="button"
            onClick={() => stepSlide(1)}
            className={controlButtonClass}
          >
            <span>Berikutnya</span>
            <ChevronRightIcon className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function DocumentationVideoGrid({ items }: DocumentationCarouselProps) {
  const videos = items.filter((item) => item.type === "video");

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
            Video Lapangan
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-[#182433] sm:text-[2.2rem]">
            Video lapangan melengkapi foto agar hasil kerja lebih mudah dinilai.
          </h3>
          <p className="mt-3 text-sm leading-8 text-[#556476] sm:text-base">
            Cuplikan video ini menampilkan detail panel, gerbang, dan proses
            pengerjaan di lapangan dalam format yang lebih hidup.
          </p>
        </div>
        <ButtonLink href={siteConfig.whatsappPrimaryUrl} variant="secondary">
          Tanya Detail Video
        </ButtonLink>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {videos.map((video) => (
          <article
            key={video.src}
            className="site-card overflow-hidden rounded-[24px] border border-[#d8ddd7] bg-white shadow-[0_16px_36px_rgba(15,23,42,0.06)]"
          >
            <div className="relative aspect-video overflow-hidden bg-[#15202c]">
              <video
                controls
                playsInline
                preload="metadata"
                poster={video.poster}
                className="h-full w-full object-cover"
              >
                <source src={video.src} type="video/mp4" />
                Browser Anda belum mendukung pemutaran video HTML5.
              </video>
              <div className="absolute left-4 top-4 rounded-full bg-white/94 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#182433] shadow-[0_12px_26px_rgba(15,23,42,0.08)]">
                Video Proyek
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-sm font-semibold text-[#182433] shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                <PlayCircleIcon className="h-4.5 w-4.5" />
                <span>{formatDuration(video.durationSeconds)}</span>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                {video.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[#182433]">
                {video.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#556476]">
                {video.description}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <ButtonLink href={siteConfig.whatsappPrimaryUrl} variant="secondary">
                  Konsultasi Video Serupa
                </ButtonLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
