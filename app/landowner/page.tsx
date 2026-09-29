import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandownerApplication from "@/components/LandownerApplication";
import ParallaxImage from "@/components/ParallaxImage";
import SmartImage from "@/components/SmartImage";
import { getLandownerReviews } from "@/lib/db";
import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export const revalidate = 60;

const GOLD_TEXT =
  "linear-gradient(95deg, #fde68a 0%, #f59e0b 22%, #fef3c7 42%, #fbbf24 58%, #d97706 82%, #fbbf24 100%)";

const HERO_WORDS: { text: string; delay: number }[] = [
  { text: "Your", delay: 200 },
  { text: "Land,", delay: 380 },
  { text: "Our", delay: 560 },
  { text: "Promise.", delay: 740 },
];

const TRUST_POINTS = [
  {
    title: "Years of Proven Experience",
    desc: "A disciplined track record of delivering successful projects across Dhaka's most sought-after districts.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Transparent, Clear Agreements",
    desc: "No hidden conditions. Every share, profit split and timeline is documented and explained before you sign.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Maximum Value per Katha",
    desc: "Smart planning and premium engineering unlock the true worth of every property we develop together.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Quality Construction",
    desc: "Durable materials, certified engineering and meticulous finishing — a legacy built to stand for generations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
      </svg>
    ),
  },
  {
    title: "Lifelong Partnership",
    desc: "Our commitment continues long after handover — dependable after-sales support and a relationship built on trust.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-6.83 4 4 0 004 6.83zM14 6a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const GOLD_UNDERLINE = {
  background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)",
  backgroundSize: "200% 200%",
};

export default function LandownerPage() {
  const reviews = getLandownerReviews();

  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO ===================== */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/slide-2.webp"
            alt="Mahatab Properties landowner partnership"
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
            At Mahatab Properties, we partner with landowners to unlock the true
            potential of every plot — through transparent agreements, premium
            construction and long-term value that ensures mutual growth.
          </p>

          <div className="animate-golden-hero mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "1150ms" }}>
            <a
              href="#landowner-apply"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#3b2605] font-semibold rounded-full inline-flex items-center gap-3 shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
            >
              <span>Partner With Us</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-golden-hero absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ animationDelay: "1300ms" }}
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
            {/* LEFT: images */}
            <div className="lg:col-span-6 relative flex items-start justify-start">
              <div className="relative w-[78%] rounded-3xl overflow-hidden glass-nav-light p-2 border border-white/70 shadow-2xl">
                <Image
                  src="/about-building.webp"
                  alt="Mahatab Properties development"
                  width={640}
                  height={480}
                  className="w-full h-[300px] sm:h-[380px] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[11px] uppercase tracking-widest text-teal-300 font-semibold drop-shadow">Building Together</span>
                </div>
              </div>
              <ParallaxImage className="absolute -bottom-6 right-0 w-[45%] z-10">
                <div className="rounded-3xl overflow-hidden glass-nav-light p-2 border border-white/80 shadow-2xl">
                  <Image
                    src="/building-2.webp"
                    alt="MPL landmark project"
                    width={400}
                    height={300}
                    className="w-full h-40 sm:h-48 object-cover rounded-2xl"
                  />
                </div>
              </ParallaxImage>
            </div>

            {/* RIGHT: copy */}
            <div className="lg:col-span-6">
              <div className="mb-5 flex flex-col items-start select-none">
                <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                  A Partnership of Trust
                </span>
                <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left leading-snug">
                Your Land, Families&rsquo; Homes,{" "}
                <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
                  Shared Success
                </span>
              </h2>

              <div className="mt-6 flex flex-col gap-5">
                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  We believe land is more than dirt and title deeds — it is the
                  foundation upon which families build their future. That is why
                  every MPL partnership begins with a simple idea: treat your
                  property like our own.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  From structural integrity and aesthetic appeal to long-term
                  durability, every detail is handled by our in-house team of
                  engineers, architects and legal specialists — so you can watch
                  your plot grow into a landmark while we carry the effort,
                  the cost and the responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY LANDOWNERS TRUST ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              Why Landowners Trust MPL
            </span>
            <div className="mt-2 mx-auto h-[3px] w-40 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900">
              Real Partners, Real Value
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRUST_POINTS.map((p, idx) => (
              <div
                key={p.title}
                className="rounded-3xl glass-nav-light p-6 border border-white/70 hover:border-teal-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg mb-5"
                  style={{ background: "linear-gradient(135deg, #0d6e7e 0%, #074853 100%)" }}
                >
                  {p.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900 tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}

            {/* Last cell highlights the application CTA */}
            <div
              className="rounded-3xl pt-[1px] bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 p-[1px] shadow-2xl"
            >
              <div className="rounded-3xl bg-[#e9dcc6]/95 p-6 h-full flex flex-col justify-between gap-4">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-400 text-[#3b2605] flex items-center justify-center shadow-lg mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 tracking-tight">Have a Land You Cherish?</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed font-light">
                    Share a few details and our landowner specialists will prepare a free,
                    no-obligation development proposal tailored to your plot.
                  </p>
                </div>
                <a
                  href="#landowner-apply"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#3b2605] text-sm font-semibold shadow-lg shadow-amber-500/30 transition-all duration-300 active:scale-95"
                >
                  Request a Proposal
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LANDOWNER REVIEWS ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <div className="flex flex-col items-start gap-2 mb-12">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              Landowner&rsquo;s Review
            </span>
            <div className="h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={{ ...GOLD_UNDERLINE, width: 130 }} />
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left">
              Hear From the Owners Who Trusted Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, idx) => (
              <div
                key={r.id}
                className="rounded-3xl glass-nav-light p-6 sm:p-7 border border-white/70 hover:border-teal-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                {/* Quote mark */}
                <div className="text-5xl leading-none font-serif text-amber-500 select-none" style={{ fontFamily: "Georgia, serif" }}>
                  &ldquo;
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light mt-1">
                  {r.comment}
                </p>
                <div className="mt-6 pt-5 border-t border-amber-900/10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-teal-500/30 bg-slate-300/50 shrink-0">
                    {r.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-teal-700 font-bold">
                        {r.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{r.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {[r.role, r.company].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-amber-500 shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="rounded-3xl glass-nav-light border border-white/70 px-8 py-16 text-center text-slate-500">
              Landowner stories coming soon.
            </div>
          )}
        </div>
      </section>

      {/* ===================== APPLICATION ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT: copy / steps */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="mb-5 flex flex-col items-start select-none">
                <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                  Let&rsquo;s Begin
                </span>
                <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left leading-snug">
                How Landowner Partnership Works
              </h2>
              <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                Our process is straightforward and fully transparent at every stage.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                {[
                  { n: "01", t: "Share Your Details", d: "Submit your land's location, category and size in the form — no obligations at all." },
                  { n: "02", t: "Free Site Evaluation", d: "Our engineers visit, assess and prepare a valuation and development concept." },
                  { n: "03", t: "Transparent Agreement", d: "We document the profit share, timeline and every condition in plain writing." },
                  { n: "04", t: "We Build, You Watch", d: "MPL carries the design, finance and construction while you follow live progress." },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-500 shrink-0 mt-0.5">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{step.t}</h3>
                      <p className="text-[13px] text-slate-600 font-light mt-1 leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: application form */}
            <div className="lg:col-span-7">
              <LandownerApplication isActive />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}