import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteriorSlideshow from "@/components/InteriorSlideshow";
import ParallaxImage from "@/components/ParallaxImage";
import SmartImage from "@/components/SmartImage";
import Image from "next/image";
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
  { text: "Interior", delay: 200 },
  { text: "Solutions", delay: 380 },
];

const GOLD_UNDERLINE = {
  background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)",
  backgroundSize: "200% 200%",
};

const OFFERS = [
  {
    title: "Interior Design & Consultancy",
    desc: "Creative and practical design concepts tailored to your style, space and functionality.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    title: "Turnkey Project Execution",
    desc: "End-to-end interior solutions including material sourcing, installation and finishing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0a2 2 0 00-2 2h2m12 0H9m3 6h.01M9 17h.01M15 17h.01M9 13h.01M15 13h.01" />
      </svg>
    ),
  },
  {
    title: "Custom Furniture & Décor",
    desc: "Bespoke furniture and décor elements to enhance comfort, warmth and aesthetics.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2zm0 7h18M7 13v4m10-4v4" />
      </svg>
    ),
  },
  {
    title: "Renovation & Remodeling",
    desc: "Modernizing existing spaces with intelligent, efficient and sustainable solutions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
  },
];

export default function InteriorPage() {
  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO ===================== */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/about-interior.webp"
            alt="Mahatab Properties interior solutions"
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
            style={{ animationDelay: "600ms" }}
          >
            Transforming Spaces, Enhancing Lifestyles
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-golden-hero absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ animationDelay: "900ms" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-200/80">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-amber-200/50 flex justify-center pt-2">
            <span className="w-1 h-2 rounded-full bg-amber-300 animate-pin-bob" />
          </div>
        </div>
      </section>

      {/* ===================== INTRO ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 pt-20 md:pt-28 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT: collage */}
            <div className="lg:col-span-6 relative flex items-start justify-start">
              <div className="relative w-[78%] rounded-3xl overflow-hidden glass-nav-light p-2 border border-white/70 shadow-2xl">
                <Image
                  src="/about-interior.webp"
                  alt="Mahatab Properties interior design"
                  width={896}
                  height={1200}
                  className="w-full h-[340px] sm:h-[420px] object-cover object-top rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[11px] uppercase tracking-widest text-teal-300 font-semibold drop-shadow">Designed for Living</span>
                </div>
              </div>
              <ParallaxImage invert className="absolute -bottom-6 right-0 w-[45%] z-10">
                <div className="rounded-3xl overflow-hidden glass-nav-light p-2 border border-white/80 shadow-2xl">
                  <Image
                    src="/about-interior.webp"
                    alt="MPL interior craft"
                    width={896}
                    height={1200}
                    className="w-full h-40 sm:h-48 object-cover object-bottom rounded-2xl"
                  />
                </div>
              </ParallaxImage>
            </div>

            {/* RIGHT: copy */}
            <div className="lg:col-span-6">
              <div className="mb-5 flex flex-col items-start select-none">
                <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                  Mahatab Properties · Interior Solution Department
                </span>
                <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left leading-snug">
                Innovative Design,{" "}
                <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
                  Functional Elegance
                </span>
              </h2>

              <div className="mt-6 flex flex-col gap-5">
                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  At Mahatab Properties Ltd., the Interior Solution Department (ISD) is
                  dedicated to bringing innovative design and functional elegance together
                  under one expert team. We specialize in crafting customized interior
                  environments that reflect the unique personality and needs of our
                  valued clients.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  Our focus is on delivering complete turnkey interior solutions — from
                  concept and planning to execution and finishing. Whether it is a
                  residential apartment, commercial office, retail space or hospitality
                  interior, ISD ensures exceptional quality, thoughtful design and
                  meticulous craftsmanship in every detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHAT WE OFFER ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              What We Offer
            </span>
            <div className="mt-2 mx-auto h-[3px] w-40 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900">
              Complete Interior Care, Under One Roof
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFERS.map((offer, idx) => (
              <div
                key={offer.title}
                className="rounded-3xl glass-nav-light p-6 border border-white/70 hover:border-teal-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg mb-5"
                  style={{ background: "linear-gradient(135deg, #0d6e7e 0%, #074853 100%)" }}
                >
                  {offer.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900 tracking-tight leading-snug">{offer.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed font-light">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OUR STRENGTH ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <div className="rounded-3xl p-[1px] bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 shadow-2xl">
            <div className="rounded-3xl bg-[#e9dcc6] px-6 sm:px-10 py-10 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              {/* LEFT: text */}
              <div>
                <div className="mb-5 flex flex-col items-start select-none">
                  <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                    Our Strength
                  </span>
                  <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extralight tracking-tight text-slate-900 leading-snug">
                  A Team That Builds Better Living
                </h2>
                <div className="mt-5 flex flex-col gap-5">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                    With a skilled team of architects, designers, engineers and craftsmen,
                    ISD is committed to maintaining strict quality standards, transparency
                    and on-time project delivery. We combine creativity with cutting-edge
                    technology to transform ordinary spaces into inspiring environments.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                    At ISD, we believe that interiors should not only look beautiful — they
                    should feel like home and support a better way of living.
                  </p>
                </div>
              </div>

              {/* RIGHT: image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden glass-nav-light p-2 border border-white/80 shadow-2xl">
                  <Image
                    src="/about-interior.webp"
                    alt="MPL interior craftsmanship"
                    width={896}
                    height={1200}
                    className="w-full h-[280px] sm:h-[340px] object-cover object-center rounded-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-[#3b2605] text-2xl font-bold shadow-xl border border-amber-200/50"
                  style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}>
                  ISD
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== INTERIOR SLIDESHOW ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              Our Portfolio
            </span>
            <div className="mt-2 mx-auto h-[3px] w-40 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900">
              Designed Spaces, <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">Sketched to Life</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Explore our interior concepts showcased one by one — from luxury
              living rooms to refined spaces, every design tells a story.
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