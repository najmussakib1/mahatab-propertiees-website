import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmartImage from "@/components/SmartImage";
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
  { text: "Build", delay: 200 },
  { text: "Your", delay: 380 },
  { text: "Future", delay: 560 },
];

const CAREER_EMAIL = "mahatabpropertieslimited@gmail.com";
const WHATSAPP_NUMBER = "+8801301222211";
const WHATSAPP_URL = "https://wa.me/8801301222211";

const ROLES = [
  {
    title: "Project Engineer",
    image: "/career-project-engineer.webp",
    desc: "Lead on-site delivery of our residential towers — coordinate contractors, safeguard structural integrity, and translate blueprints into flawless finishes.",
    tags: ["Site Management", "Structural Quality", "Delivery"],
  },
  {
    title: "Head Engineer",
    image: "/career-head-engineer.webp",
    desc: "Own the engineering roadmap across projects — review designs, mentor site engineering teams, and uphold our compliance-first construction standards.",
    tags: ["Design Review", "Team Leadership", "Compliance"],
  },
  {
    title: "Corporate Accountant",
    image: "/career-accountant.webp",
    desc: "Keep our financial engine precise — manage accounts, budgeting, tax filings and reporting that drive confident, transparent business decisions.",
    tags: ["Accounts", "Budgeting", "Reporting"],
  },
];

const GOLD_UNDERLINE = {
  background:
    "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)",
  backgroundSize: "200% 200%",
};

const PERKS = [
  {
    title: "Long-Term Growth",
    desc: "Build a career on a foundation of stability — our expansion creates lasting roles, not temporary positions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Real Impact",
    desc: "Your work shapes homes and communities visible across the region — every project carries your signature.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
      </svg>
    ),
  },
  {
    title: "Professional Excellence",
    desc: "Work alongside experienced engineers and accountants on multi-storied developments built to international standards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function CareerPage() {
  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO ===================== */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/slide-3.webp"
            alt="Careers at Mahatab Properties — sky-high multi-storied development"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/45" />
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
            As a rapidly growing force in real estate and multi-storied
            development, we are consistently looking for dedicated
            professionals to join our team and grow with us.
          </p>

          <div className="animate-golden-hero mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "1150ms" }}>
            <a
              href="#open-roles"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#3b2605] font-semibold rounded-full inline-flex items-center gap-3 shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
            >
              <span>View Open Roles</span>
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
            {/* LEFT: copy */}
            <div className="lg:col-span-7">
              <div className="mb-5 flex flex-col items-start select-none">
                <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                  Grow With Us
                </span>
                <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left leading-snug">
                A Team Building the{" "}
                <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
                  Landmarks of Tomorrow
                </span>
              </h2>

              <div className="mt-6 flex flex-col gap-5">
                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  As a rapidly growing force in real estate and multi-storied
                  development, we are consistently looking for dedicated
                  professionals to join our team. Our recent expansions have
                  created opportunities across multiple disciplines, including
                  roles for Project Engineers, Head Engineers, and Corporate
                  Accountants.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  Please send your CV to{" "}
                  <a
                    href={`mailto:${CAREER_EMAIL}`}
                    className="font-medium text-teal-700 hover:text-teal-800 underline decoration-teal-500/40 underline-offset-4 transition-colors duration-300"
                  >
                    {CAREER_EMAIL}
                  </a>{" "}
                  to be considered for current and future vacancies.
                </p>
              </div>
            </div>

            {/* RIGHT: images */}
            <div className="lg:col-span-5 relative flex items-start justify-end lg:justify-center">
              <div className="relative w-[82%] rounded-3xl overflow-hidden glass-nav-light p-2 border border-white/70 shadow-2xl">
                <Image
                  src="/career-head-engineer.webp"
                  alt="Head Engineers working on an MPL multi-storied development"
                  width={640}
                  height={480}
                  className="w-full h-[300px] sm:h-[360px] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold drop-shadow">
                    Growing. Building. Together.
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-8 left-0 w-[46%] z-10">
                <div className="rounded-3xl overflow-hidden glass-nav-light p-2 border border-white/80 shadow-2xl">
                  <Image
                    src="/career-project-engineer.webp"
                    alt="Project Engineer reviewing blueprints"
                    width={400}
                    height={300}
                    className="w-full h-40 sm:h-48 object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY JOIN ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              Why Join MPL
            </span>
            <div className="mt-2 mx-auto h-[3px] w-40 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900">
              A Career Worth Building Your Future On
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((p, idx) => (
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
          </div>
        </div>
      </section>

      {/* ===================== OPEN ROLES ===================== */}
      <section id="open-roles" className="relative w-full overflow-hidden scroll-mt-24">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <div className="mb-12 flex flex-col items-start">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
              Current Opportunities
            </span>
            <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={GOLD_UNDERLINE} />
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left">
              Roles We&rsquo;re Hiring For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {ROLES.map((role, idx) => (
              <div
                key={role.title}
                className="rounded-3xl overflow-hidden glass-nav-light border border-white/70 hover:border-teal-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl flex flex-col"
                style={{ animationDelay: `${idx * 140}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <SmartImage
                    src={role.image}
                    alt={role.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
                    {role.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-light flex-1">
                    {role.desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[11px] font-medium text-teal-800 bg-teal-600/10 border border-teal-600/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== APPLY CTA ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <div className="rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0">
              <SmartImage
                src="/career-accountant.webp"
                alt="Corporate accounting team at Mahatab Properties"
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#074e59]/95 via-[#074e59]/85 to-[#0a3a46]/70" />
            </div>

            <div className="relative z-10 px-6 sm:px-10 md:px-14 py-14 md:py-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-7">
                <div className="mb-3 flex flex-col items-start">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-transparent bg-clip-text uppercase [transform:scaleY(1.1)] origin-left animate-golden-text-shimmer"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #fbbf24 0%, #fef08a 25%, #f59e0b 50%, #fcd34d 75%, #fbbf24 100%)",
                      backgroundSize: "200% auto",
                    }}
                  >
                    Ready to Join?
                  </span>
                  <div
                    className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]"
                    style={GOLD_UNDERLINE}
                  />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-slate-200/90 font-light leading-relaxed max-w-2xl">
                  Send your CV and your story to us — be considered for current
                  and future vacancies across Project Engineering, Head
                  Engineering and Corporate Accounting. If you are dedicated to
                  craftsmanship and growth, we want to hear from you.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${CAREER_EMAIL}`}
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#3b2605] font-semibold rounded-full inline-flex items-center gap-3 shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
                  >
                    <span>Send Your CV</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${CAREER_EMAIL}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-pill text-slate-100 border border-white/25 hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {CAREER_EMAIL}
                  </a>
                </div>
              </div>

              {/* WhatsApp card */}
              <div className="lg:col-span-5 mt-10 lg:mt-0">
                <div className="rounded-3xl glass-pill p-6 border border-white/20 bg-white/10 backdrop-blur-xl">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-300">
                    Direct WhatsApp Contact
                  </span>
                  <p className="mt-3 text-slate-100 text-sm sm:text-base font-light leading-relaxed">
                    Prefer to talk first? Reach our team instantly on WhatsApp
                    for any question about current or upcoming roles.
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 ring-2 ring-white/30"
                      style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
                      aria-label="Chat on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-slate-300/80">
                        WhatsApp
                      </div>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg sm:text-xl font-semibold text-white tracking-wide hover:text-amber-300 transition-colors duration-300"
                      >
                        {WHATSAPP_NUMBER}
                      </a>
                    </div>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 w-full justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-semibold shadow-xl shadow-emerald-600/30 transition-all duration-300 active:scale-95"
                  >
                    Chat With Us Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}