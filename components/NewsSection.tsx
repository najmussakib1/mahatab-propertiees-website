"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

interface HomeNewsItem {
  id: number;
  title: string;
  category: "news" | "event";
  date: string;
  excerpt: string;
  image: string;
}

export default function NewsSection({ isActive = true }: { isActive?: boolean }) {
  const [items, setItems] = useState<HomeNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/news", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data)) setItems(data.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div id="news" className="w-full mt-10 pt-10 border-t border-amber-950/10 select-none scroll-mt-28">
      {/* Title */}
      <div className="mb-6 flex flex-col items-start">
        <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
          stay in the know
        </span>
        <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />

        <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left">
          Exciting News and Events <span className="font-light text-teal-700">from MPL</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl glass-nav-light p-0 border border-white/70 flex flex-col gap-3 animate-pulse overflow-hidden"
            >
              <div className="w-full aspect-[16/10] bg-slate-300/50" />
              <div className="px-5 pb-5 flex flex-col gap-2">
                <div className="h-4 w-2/3 rounded-full bg-slate-300/60" />
                <div className="h-3 w-full rounded-full bg-slate-300/40" />
                <div className="h-3 w-5/6 rounded-full bg-slate-300/40" />
              </div>
            </div>
          ))}

        {!loading && items.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 rounded-3xl glass-nav-light border border-white/70 px-8 py-14 text-center text-slate-500">
            Stay tuned — fresh updates are on the way.
          </div>
        )}

        {items.map((item, idx) => (
          <NewsCard key={item.id} item={item} index={idx} />
        ))}
      </div>

      {/* View all link */}
      <div className="mt-9 flex justify-center">
        <Link
          href="/news"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-[#3b2605] bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
        >
          <span>View All News &amp; Events</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}