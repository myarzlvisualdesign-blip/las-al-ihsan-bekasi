"use client";

import type { CSSProperties } from "react";
import { startTransition, useEffect, useState } from "react";
import Image from "next/image";

import { ButtonLink } from "@/components/button-link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapsIcon,
} from "@/components/icons";
import {
  reviewSnapshot,
  siteConfig,
  type GoogleTestimonial,
} from "@/lib/site";

type GoogleReviewCarouselProps = {
  items: readonly GoogleTestimonial[];
};

const AUTO_SWAP_MS = 5600;

function StarRow({
  rating = 5,
  className = "",
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <div className={`flex gap-1 text-[#d6a434] ${className}`.trim()}>
      {Array.from({ length: Math.max(1, Math.round(rating)) }).map((_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getWrappedIndex(index: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return (index + total) % total;
}

export function GoogleReviewCarousel({
  items,
}: GoogleReviewCarouselProps) {
  const reviews = items.filter((item) => item.kind !== "insight");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasMultipleReviews = reviews.length > 1;
  const activeReview = reviews[activeIndex] ?? reviews[0];

  const selectReview = (nextIndex: number) => {
    startTransition(() => {
      setActiveIndex(getWrappedIndex(nextIndex, reviews.length));
    });
  };

  useEffect(() => {
    if (!hasMultipleReviews || isPaused) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((currentIndex) =>
          getWrappedIndex(currentIndex + 1, reviews.length),
        );
      });
    }, AUTO_SWAP_MS);

    return () => {
      window.clearInterval(timerId);
    };
  }, [hasMultipleReviews, isPaused, reviews.length]);

  if (!activeReview) {
    return null;
  }

  return (
    <div
      className="site-panel rounded-[30px] border border-[#ddd8cf] bg-white p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)] sm:p-7 lg:p-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-amber">
            Ulasan Google
          </p>
          <h2 className="mt-4 font-display text-[2.2rem] leading-[0.98] text-[#182433] sm:text-[3rem]">
            Satu kartu utama yang berganti otomatis, tapi detail review tetap
            terasa lengkap.
          </h2>
          <p className="mt-4 text-sm leading-8 text-[#556476] sm:text-base">
            Review utama tampil bergantian otomatis. Tiap reviewer tetap
            membawa headline, kutipan asli, dan poin bukti supaya calon
            pelanggan bisa menangkap konteks pekerjaannya lebih cepat.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="rounded-full border border-[#ddd8cf] bg-[#f8f5f0] px-4 py-2 text-sm font-semibold text-[#253243]">
            {reviewSnapshot.rating} / 5
          </div>
          <div className="rounded-full border border-[#ddd8cf] bg-[#f8f5f0] px-4 py-2 text-sm font-semibold text-[#253243]">
            {reviewSnapshot.reviewCount} ulasan
          </div>
          <div className="rounded-full border border-[#ddd8cf] bg-[#f8f5f0] px-4 py-2 text-sm font-semibold text-[#253243]">
            Dicek {reviewSnapshot.capturedAt}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.32fr)_minmax(0,0.92fr)]">
        <article
          key={activeReview.name}
          className="site-panel site-fade-in relative overflow-hidden rounded-[28px] border border-[#2a3f58] bg-[#182433] p-6 text-white shadow-[0_26px_70px_rgba(15,23,42,0.22)] lg:p-7"
        >
          {hasMultipleReviews ? (
            <div className="absolute inset-x-0 top-0 h-1 bg-white/10">
              <div
                key={activeReview.name}
                className="site-progress h-full bg-[#d9b6a0]"
                style={
                  {
                    "--progress-duration": `${AUTO_SWAP_MS}ms`,
                  } as CSSProperties
                }
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#d9b6a0]">
                Review Pilihan
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-[2rem]">
                {activeReview.headline}
              </h3>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#dbe4ee]">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isPaused ? "bg-[#d9b6a0]" : "bg-[#7ed0a2]"
                }`}
              />
              {hasMultipleReviews
                ? isPaused
                  ? "Auto swap dijeda"
                  : "Auto swap aktif"
                : "Review tunggal"}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            {activeReview.avatar ? (
              <div className="h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-full border border-white/12 bg-white/10">
                <Image
                  src={activeReview.avatar}
                  alt={`Avatar reviewer ${activeReview.name}`}
                  width={72}
                  height={72}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/10 text-lg font-semibold text-white">
                {getInitials(activeReview.name)}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-lg font-semibold text-white">
                {activeReview.name}
              </p>
              <p className="mt-1 text-sm text-[#c7d1dc]">
                {activeReview.source} • {activeReview.sourceDate}
              </p>
              <StarRow rating={activeReview.rating} className="mt-3 text-base" />
            </div>
          </div>

          <p className="mt-6 text-lg leading-9 text-[#eef2f7] sm:text-[1.3rem]">
            &ldquo;{activeReview.quote}&rdquo;
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {activeReview.proofPoints.map((point) => (
              <div
                key={point}
                className="rounded-[18px] border border-white/12 bg-white/[0.07] px-4 py-3 text-sm font-medium text-[#dbe4ee]"
              >
                {point}
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-white/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {reviews.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => selectReview(index)}
                    className={`site-chip-static rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                      isActive
                        ? "border-white bg-white text-[#182433]"
                        : "border-white/16 bg-white/8 text-[#dbe4ee] hover:bg-white/14"
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Tampilkan review ${item.name}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      setActiveIndex((currentIndex) =>
                        getWrappedIndex(currentIndex - 1, reviews.length),
                      );
                    })
                  }
                  className="site-chip-static inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-45"
                  aria-label="Review sebelumnya"
                  disabled={!hasMultipleReviews}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
                <button
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      setActiveIndex((currentIndex) =>
                        getWrappedIndex(currentIndex + 1, reviews.length),
                      );
                    })
                  }
                  className="site-chip-static inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-45"
                  aria-label="Review berikutnya"
                  disabled={!hasMultipleReviews}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>

        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {reviews.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => selectReview(index)}
                  className={`site-card rounded-[24px] border p-5 text-left transition ${
                    isActive
                      ? "border-[#b33b2e] bg-[#fff6f1] shadow-[0_18px_36px_rgba(179,59,46,0.14)]"
                      : "border-[#ddd8cf] bg-[#f8f5f0] hover:border-[#b33b2e]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-[#182433]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-[#667587]">
                        {item.sourceDate}
                      </p>
                    </div>
                    <StarRow rating={item.rating} className="text-[0.92rem]" />
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-7 text-[#253243]">
                    {item.headline}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#556476]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </button>
              );
            })}
          </div>

          <article className="site-card flex h-full flex-col justify-between rounded-[24px] border border-[#ddd8cf] bg-[#182433] p-5 text-white">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/8">
                <MapsIcon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#d9b6a0]">
                Verifikasi
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">
                Buka profil Google Maps untuk membaca ulasan lengkap.
              </h3>
              <p className="mt-4 text-sm leading-8 text-[#c7d1dc]">
                Rating dan jumlah ulasan terbaru saya verifikasi dari tampilan
                Google Maps publik pada {reviewSnapshot.capturedAt}.
              </p>
              <div className="mt-5 grid gap-2 text-sm text-[#dbe4ee]">
                <div className="rounded-[18px] border border-white/12 bg-white/[0.07] px-4 py-3">
                  Rating saat dicek: {reviewSnapshot.rating} / 5
                </div>
                <div className="rounded-[18px] border border-white/12 bg-white/[0.07] px-4 py-3">
                  Total ulasan publik: {reviewSnapshot.reviewCount}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <ButtonLink
                href={siteConfig.reviewUrl}
                variant="secondary"
                className="w-full !border-white !bg-white !text-[#182433] hover:!bg-[#f5efe6]"
              >
                Lihat Google Maps
              </ButtonLink>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
