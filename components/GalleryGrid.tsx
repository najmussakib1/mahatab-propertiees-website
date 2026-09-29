"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SmartImage from "./SmartImage";

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  categories: { value: string; label: string }[];
}

export default function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        <button
          onClick={() => setActive("all")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 active:scale-95 border ${
            active === "all"
              ? "bg-gradient-to-r from-amber-500 to-amber-400 text-[#3b2605] border-amber-300 shadow-lg shadow-amber-500/30 font-semibold"
              : "glass-nav-light border-white/70 text-slate-600 hover:text-slate-900 hover:border-teal-500/40"
          }`}
        >
          All Moments
        </button>
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setActive(c.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 active:scale-95 border ${
              active === c.value
                ? "bg-gradient-to-r from-amber-500 to-amber-400 text-[#3b2605] border-amber-300 shadow-lg shadow-amber-500/30 font-semibold"
                : "glass-nav-light border-white/70 text-slate-600 hover:text-slate-900 hover:border-teal-500/40"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Masonry-ish grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item)}
              className="group relative rounded-3xl overflow-hidden glass-nav-light p-2 border border-white/70 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left cursor-zoom-in"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200/60">
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <p className="text-white font-semibold text-sm leading-snug">{item.title}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-amber-300 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    View
                  </span>
                </div>
              </div>
              <div className="px-3 py-3.5 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900 tracking-tight truncate">{item.title}</p>
                <span className="shrink-0 text-[10px] uppercase tracking-widest text-teal-700 bg-teal-600/10 border border-teal-600/20 rounded-full px-2.5 py-1">
                  {categories.find((c) => c.value === item.category)?.label || item.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl glass-nav-light border border-white/70 px-8 py-16 text-center text-slate-500">
          No photos in this category yet.
        </div>
      )}

      {/* Lightbox — portaled to body so it escapes any parent stacking context */}
      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex flex-col bg-slate-950/95 backdrop-blur-md p-4 sm:p-8"
            style={{ isolation: "isolate" }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative flex-1 min-h-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <SmartImage
                src={lightbox.image}
                alt={lightbox.title}
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="pt-4 pb-2 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-white font-semibold">{lightbox.title}</p>
              <p className="text-amber-300/90 text-xs uppercase tracking-widest mt-1.5">
                {categories.find((c) => c.value === lightbox.category)?.label || lightbox.category}
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}