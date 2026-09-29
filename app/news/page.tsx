import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsCard, { GOLD_TEXT } from "@/components/NewsCard";
import { getNewsEvents } from "@/lib/db";
import SmartImage from "@/components/SmartImage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export const revalidate = 60;

const HERO_WORDS: { text: string; delay: number }[] = [
  { text: "Headlines", delay: 200 },
  { text: "&", delay: 380 },
  { text: "Highlights", delay: 560 },
];

export default function NewsPage() {
  const items = getNewsEvents();

  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO ===================== */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/slide-2.webp"
            alt="Mahatab Properties news and events"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 h-full flex flex-col justify-center">
          <h1 className="flex flex-col items-start [transform:scaleY(1.06)] origin-left">
            {HERO_WORDS.map((word, i) => (
              <span
                key={word.text}
                className="animate-golden-hero leading-[1.05] text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] overflow-visible"
                style={{ animationDelay: `${word.delay}ms` }}
              >
                <span
                  className="text-transparent bg-clip-text animate-golden-text-shimmer golden-stroke font-extrabold tracking-tight pb-[0.1em] -mb-[0.1em] inline-block"
                  style={{
                    backgroundImage: GOLD_TEXT,
                    backgroundSize: "220% auto",
                    filter:
                      "drop-shadow(0 2px 0 rgba(120,53,15,0.35)) drop-shadow(0 0 30px rgba(245,158,11,0.35))",
                  }}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-golden-hero mt-7 max-w-2xl text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed drop-shadow-md"
            style={{ animationDelay: "760ms" }}
          >
            Milestones, launches, community gatherings and every moment worth
            sharing from the Mahatab Properties family.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-golden-hero absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ animationDelay: "1100ms" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-200/80">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-amber-200/50 flex justify-center pt-2">
            <span className="w-1 h-2 rounded-full bg-amber-300 animate-pin-bob" />
          </div>
        </div>
      </section>

      {/* ===================== NEWS GRID ===================== */}
      <section id="news" className="relative w-full scroll-mt-24 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 pt-20 md:pt-28 pb-24">
          {/* Section heading */}
          <div className="mb-10 flex flex-col items-start select-none">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              Exciting News and Events from MPL
            </span>
            <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={{ background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)", backgroundSize: "200% 200%" }} />
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {items.map((item, idx) => (
                <NewsCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl glass-nav-light border border-white/70 px-8 py-16 text-center text-slate-500">
              Stay tuned — fresh updates are on the way.
            </div>
          )}
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </div>
  );
}