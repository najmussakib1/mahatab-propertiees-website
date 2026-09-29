import { notFound } from "next/navigation";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import { getNewsEventById } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatNewsDate } from "@/components/NewsCard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export const revalidate = 60;

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const item = Number.isFinite(id) ? getNewsEventById(id) : undefined;
  if (!item) notFound();

  const isEvent = item.category === "event";
  const paragraphs = item.body.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO ===================== */}
      <section className="relative h-[62vh] min-h-[430px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src={item.image || "/slide-1.webp"}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pd-hero-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-14 h-full flex flex-col justify-end pb-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                isEvent
                  ? "bg-amber-500/30 text-amber-100 border border-amber-400/40"
                  : "bg-teal-500/30 text-teal-200 border border-teal-400/40"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isEvent ? "bg-amber-300" : "bg-teal-400"}`} />
              {isEvent ? "Event" : "News"}
            </span>
            <span className="text-[11px] uppercase font-mono text-amber-200/90 tracking-wider">
              {formatNewsDate(item.date)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight drop-shadow-xl">
            {item.title}
          </h1>
        </div>
      </section>

      {/* ===================== BODY ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 md:px-14 py-16 md:py-20">
          <div className="prose-inline flex flex-col gap-5">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base sm:text-lg text-slate-700 leading-relaxed font-light first-of-type:text-xl first-of-type:text-slate-800"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-amber-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-[#3b2605] bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/30 transition-all duration-300 active:scale-95 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to News &amp; Events</span>
            </Link>
            <span className="text-xs text-slate-500 font-light">Mahatab Properties Ltd</span>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </div>
  );
}