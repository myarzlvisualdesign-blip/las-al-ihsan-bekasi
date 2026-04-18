"use client";

import { useEffect, useRef, useState } from "react";

import type { SiteStat } from "@/lib/site";

type AnimatedStatGridProps = {
  stats: readonly SiteStat[];
  cardClassName: string;
};

function formatStatValue(stat: SiteStat, currentValue: number) {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  }).format(currentValue);

  return `${stat.prefix ?? ""}${formattedValue}${stat.suffix ?? ""}`;
}

function AnimatedStatValue({ stat }: { stat: SiteStat }) {
  const valueRef = useRef<HTMLParagraphElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = valueRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionFrame = window.requestAnimationFrame(() => {
        setDisplayValue(stat.value);
      });

      return () => {
        window.cancelAnimationFrame(reducedMotionFrame);
      };
    }

    let frameId = 0;
    const duration = stat.value < 10 ? 1200 : 1450;
    const startTime = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(stat.value * easedProgress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isVisible, stat.value]);

  return (
    <p
      ref={valueRef}
      className="font-display text-[2.4rem] leading-none text-[#182433] tabular-nums sm:text-[3.1rem]"
    >
      {formatStatValue(stat, isVisible ? displayValue : 0)}
    </p>
  );
}

export function AnimatedStatGrid({
  stats,
  cardClassName,
}: AnimatedStatGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className={`${cardClassName} overflow-hidden p-4 sm:p-5`}>
          <AnimatedStatValue stat={stat} />
          <p className="mt-2 text-sm leading-6 text-[#637284]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
