import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryImages, GALLERY_CATEGORIES } from "@/lib/db";
import SmartImage from "@/components/SmartImage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export const revalidate = 60;

const GOLD_TEXT =
  "linear-gradient(95deg, #fde68a 0%, #f59e0b 22%, #fef3c7 42%, #fbbf24 58%, #d97706 82%, #fbbf24 100%)";

const HERO_WORDS: { text: string; delay: number }[] = [
  { text: "Moments", delay: 200 },
  { text: "That", delay: 380 },
  { text: "Matter", delay: 560 },
  { text: "Most.", delay: 740 },
];

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO ===================== */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/slide-3.webp"
            alt="Mahatab Properties gallery"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 h-full flex flex-col justify-center pt-24 sm:pt-28">
          <h1 className="flex flex-col items-start [transform:scaleY(1.06)] origin-left">
            {HERO_WORDS.map((word, i) => (
              <span
                key={word.text}
                className="animate-golden-hero leading-[1.02] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] overflow-visible"
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
            style={{ animationDelay: "960ms" }}
          >
            Handovers, partnerships, service teams and the celebrations that bring
            the Mahatab Properties family together — captured through the lens.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-golden-hero absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ animationDelay: "1150ms" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-200/80">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-amber-200/50 flex justify-center pt-2">
            <span className="w-1 h-2 rounded-full bg-amber-300 animate-pin-bob" />
          </div>
        </div>
      </section>

      {/* ===================== GALLERY GRID ===================== */}
      <section id="gallery" className="relative w-full scroll-mt-24 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 pt-20 md:pt-28 pb-24">
          {/* Section heading */}
          <div className="mb-10 flex flex-col items-start select-none">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              A Walk Through Our Journey
            </span>
            <div
              className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]"
              style={{
                background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)",
                backgroundSize: "200% 200%",
              }}
            />
          </div>

          <GalleryGrid
            items={images.map((g) => ({ id: g.id, title: g.title, category: g.category, image: g.image }))}
            categories={GALLERY_CATEGORIES}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}