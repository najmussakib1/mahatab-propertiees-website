"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SmartImage from "./SmartImage";
import type { InteriorImage } from "@/data/interior";

interface InteriorSlideshowProps {
  images: InteriorImage[];
  autoAdvanceMs?: number;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  priority?: boolean;
}

export default function InteriorSlideshow({
  images,
  autoAdvanceMs = 5000,
  className = "",
  showArrows = true,
  showDots = true,
  showCounter = true,
  priority = false,
}: InteriorSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (paused || autoAdvanceMs <= 0) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, autoAdvanceMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, autoAdvanceMs, count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, current]);

  if (count === 0) return null;

  return (
    <div
      className={`relative overflow-hidden select-none group ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Crossfading image stack */}
      {images.map((img, idx) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            idx === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <SmartImage
            src={img.src}
            alt={img.alt}
            priority={priority && idx === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Soft vignette so the controls read clearly */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20 pointer-events-none" />

      {/* Counter badge */}
      {showCounter && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3.5 py-2 rounded-full glass-nav text-white/85 text-xs sm:text-sm font-semibold tracking-widest">
          <span className="text-amber-300">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-white/40">/</span>
          <span>{String(count).padStart(2, "0")}</span>
        </div>
      )}

      {/* Arrows */}
      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-nav hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-all duration-300 active:scale-90 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-nav hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-all duration-300 active:scale-90 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 flex-wrap justify-center max-w-[90%]">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="group py-1 focus:outline-none"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-700 ${
                  idx === current
                    ? "w-8 bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_0_10px_#fbbf24]"
                    : "w-3 bg-white/35 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}