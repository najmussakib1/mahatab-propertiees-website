import DirectorialBoard from "@/components/DirectorialBoard";
import Footer from "@/components/Footer";
import InteriorSlideshow from "@/components/InteriorSlideshow";
import ManagingDirectorProfile from "@/components/ManagingDirectorProfile";
import Navbar from "@/components/Navbar";
import SmartImage from "@/components/SmartImage";
import { INTERIOR_IMAGES } from "@/data/interior";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export const revalidate = 60;

const GOLD_TEXT =
  "linear-gradient(95deg, #fde68a 0%, #f59e0b 22%, #fef3c7 42%, #fbbf24 58%, #d97706 82%, #fbbf24 100%)";

const HERO_WORDS: { text: string; delay: number }[] = [
  { text: "About", delay: 200 },
  { text: "Us", delay: 380 },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO — single slide image + golden typography ===================== */}
      <section className="relative h-[82vh] min-h-[580px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/about-building.webp"
            alt="Mahatab Properties — Builders of the future"
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
            Mahatab Properties Ltd. — a household name built on the promise of
            &ldquo;Delivering on promise&rdquo; and a legacy of compliant,
            ethical, future-ready construction.
          </p>
        </div>
      </section>

      {/* ===================== WHO WE ARE ===================== */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-20">
        <div className="mb-2 flex flex-col items-start select-none">
          <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
            who we are
          </span>
          <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left">
          A Legacy of Trust, Built to Last
        </h3>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          <div>
            <h4 className="text-lg font-semibold text-slate-900 leading-snug tracking-tight">
              Mahatab Properties Ltd. (MPL) started its journey in the real
              estate sector and has become a household name as{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
                &ldquo;Delivering on promise&rdquo;
              </span>{" "}
              and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">
                &ldquo;Compliant and ethical builder&rdquo;
              </span>
              .
            </h4>
            <p className="mt-5 text-slate-600 leading-relaxed font-light text-base sm:text-lg">
              The tagline,{" "}
              <strong className="text-teal-700 font-medium">
                &ldquo;Building your future, today,&rdquo;
              </strong>{" "}
              extends the architectural concept into a broader brand promise. It
              communicates that Mahatab Properties is focused not only on
              developing properties, but on creating meaningful spaces and
              long-term value for its customers.
            </p>
          </div>

          <div>
            <p className="text-slate-600 leading-relaxed font-light text-base sm:text-lg">
              Every MPL project reflects a disciplined commitment to quality —
              sustainable engineering, refined materials, and transparent
              processes carried through from the very first blueprint to the
              final handover. With the trust of hundreds of families across the
              region, we craft residences designed to nurture communities and
              stand the test of time.
            </p>
            <p className="mt-5 text-slate-600 leading-relaxed font-light text-base sm:text-lg">
              As a specialized sister concern focused exclusively on modern
              multi-storied building developments, MPL elevates urban living
              standards while maintaining the unyielding integrity and trust we
              have cultivated over the decades.
            </p>
          </div>
        </div>
      </div>

      {/* ===================== MANAGEMENT ===================== */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-14 pb-20">
        <ManagingDirectorProfile />
        <DirectorialBoard />
      </div>

      {/* ===================== INTERIOR SECTION ===================== */}
      <section className="w-full overflow-hidden border-t border-amber-950/10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              Interior Section
            </span>
            <div className="mt-2 mx-auto h-[3px] w-40 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" />
            <h3 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left">
              A Glimpse Into Our{" "}
              <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
                Interior Craft
              </span>
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Signature interior concepts from the Interior Solution Department —
              where design, comfort and craftsmanship come together.
            </p>
          </div>

          <div className="rounded-3xl p-[1px] bg-gradient-to-br from-amber-500 via-amber-400 to-teal-600 shadow-2xl">
            <div className="rounded-3xl overflow-hidden bg-[#e9dcc6]">
              <InteriorSlideshow
                images={INTERIOR_IMAGES}
                className="h-[420px] sm:h-[520px] md:h-[600px]"
                autoAdvanceMs={5000}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}