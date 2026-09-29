import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import SmartImage from "@/components/SmartImage";
import { getProjects } from "@/lib/db";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export const revalidate = 60;

const GOLD_TEXT =
  "linear-gradient(95deg, #fde68a 0%, #f59e0b 22%, #fef3c7 42%, #fbbf24 58%, #d97706 82%, #fbbf24 100%)";

const HERO_WORDS: { text: string; delay: number }[] = [
  { text: "Spaces", delay: 200 },
  { text: "We've", delay: 380 },
  { text: "Shaped", delay: 560 },
];

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO — single slide image + golden typography ===================== */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        {/* Static cinematic image + overlays */}
        <div className="absolute inset-0">
          <SmartImage
            src="/slide-1.webp"
            alt="Mahatab Properties landmark"
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
            From sky-touching towers to serene waterfront villas — every address
            we build carries a signature of precision, warmth and timeless
            design.
          </p>

          <div className="animate-golden-hero mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "900ms" }}>
            <a
              href="#portfolio"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#3b2605] font-semibold rounded-full inline-flex items-center gap-3 shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
            >
              <span>View All Projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
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

      {/* ===================== PORTFOLIO — creamy background ===================== */}
      <section id="portfolio" className="relative w-full scroll-mt-24 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 pt-20 md:pt-28 pb-24">
          {/* Section heading */}
          <div className="mb-6 flex flex-col items-start select-none">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              Our Signature Collection
            </span>
            <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={{ background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)", backgroundSize: "200% 200%" }} />
          </div>

          <ProjectsGrid projects={projects} />
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </div>
  );
}