"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SmartImage from "./SmartImage";

interface GalleryPreviewItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface GalleryPreviewProps {
  isActive?: boolean;
}

const CATEGORY_ORDER = ["handover", "mou", "service-work", "rehab-fair", "picnic"];

const CATEGORY_LABELS: Record<string, string> = {
  handover: "Handover",
  mou: "MOU Signing",
  "service-work": "Service Work",
  "rehab-fair": "REHAB Fair",
  picnic: "Picnic",
};

export default function GalleryPreview({ isActive = true }: GalleryPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<GalleryPreviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isActive) setHasAppeared(true);
  }, [isActive]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/gallery", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!mounted || !Array.isArray(data)) return;
        const firstOfCategory: Record<string, GalleryPreviewItem> = {};
        data.forEach((item: GalleryPreviewItem) => {
          if (item && !firstOfCategory[item.category]) firstOfCategory[item.category] = item;
        });
        const ordered = CATEGORY_ORDER.map((c) => firstOfCategory[c]).filter(
          Boolean
        ) as GalleryPreviewItem[];
        setItems(ordered);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  // Desktop-only gentle auto-scroll marquee (pauses on hover).
  useEffect(() => {
    if (!hasAppeared || paused || !window.matchMedia("(min-width: 768px)").matches) return;
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3200);
    return () => clearInterval(interval);
  }, [hasAppeared, paused]);

  return (
    <div id="gallery-preview" className="w-full select-none scroll-mt-28">
      {/* Title */}
      <div className="mb-6 flex flex-col items-start">
        <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
          captured moments
        </span>
        <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />
        <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left">
          A Glimpse Through <span className="font-light text-teal-700">Our Lens</span>
        </h3>
      </div>

      {/* Animated one-image-per-category strip */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:gap-6 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="lg:min-w-[380px] flex-1 rounded-3xl glass-nav-light p-3.5 border border-white/70 flex flex-col gap-3 animate-pulse overflow-hidden"
            >
              <div className="w-full aspect-[4/3] rounded-2xl bg-slate-300/50" />
              <div className="h-4 w-2/3 rounded-full bg-slate-300/60" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl glass-nav-light border border-white/70 px-8 py-14 text-center text-slate-500">
          Gallery moments will appear here soon — check back shortly.
        </div>
      ) : (
        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex items-stretch gap-6 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((item, idx) => {
            const label = CATEGORY_LABELS[item.category] || item.category;
            return (
              <Link
                key={item.id}
                href="/gallery"
                aria-label={`View ${label} moments in the gallery`}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[380px] block"
              >
                <div
                  style={{ animationDelay: `${idx * 120}ms` }}
                  className={`rounded-3xl glass-nav-light p-3.5 border border-white/70 hover:border-amber-500/50 transition-all duration-300 group relative overflow-hidden shadow-xl hover:-translate-y-1.5 ${
                    hasAppeared ? "animate-card-appear" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      sizes="380px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 text-amber-200 border border-amber-300/30 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                      {label}
                    </span>

                    {/* Title */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-white font-semibold text-sm leading-snug drop-shadow">
                        {item.title}
                      </p>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/30 text-white text-xs font-semibold uppercase tracking-widest backdrop-blur-md translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        View Gallery
                      </span>
                    </div>
                  </div>

                  <div className="px-1.5 pt-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-900 tracking-tight truncate group-hover:text-teal-700 transition-colors duration-300">
                      {label}
                    </span>
                    <span className="shrink-0 text-teal-700 text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-1">
                      Explore
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* View full gallery CTA */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-[#3b2605] bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
        >
          <span>View Full Gallery</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}