"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/* ---------------- TYPES ---------------- */
interface Client {
  id: number;
  name: string;
  logo: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar: string;
}

/* Clients are laid out in 3 rows. Page size = 3 rows × dynamic columns. */
const ROWS = 3;

function buildClientPages(clients: Client[]): Client[][] {
  if (clients.length === 0) return [];
  const columns = Math.ceil(clients.length / (ROWS * 2));
  const pageSize = ROWS * columns;
  const pages: Client[][] = [];
  for (let i = 0; i < clients.length; i += pageSize) pages.push(clients.slice(i, i + pageSize));
  return pages.filter((p) => p.length > 0);
}

/* Spiral decorative path (Archimedean spiral centred at 70,70) */
const SPIRAL_PATH = (() => {
  const points: string[] = [];
  for (let i = 0; i <= 420; i++) {
    const t = (i / 420) * 9 * Math.PI;
    const r = 3 + t * 2;
    points.push(`${(70 + Math.cos(t) * r).toFixed(1)},${(70 + Math.sin(t) * r).toFixed(1)}`);
  }
  return `M ${points.join(" L ")}`;
})();

const SLIDE_DURATION = 6000;

/* ---------------- COMPONENT ---------------- */
export default function ClientsAndTestimonials({ isActive }: { isActive?: boolean }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showClients, setShowClients] = useState(true);
  const [loading, setLoading] = useState(true);

  const [hasAppeared, setHasAppeared] = useState(false);
  const [clientPage, setClientPage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [logosPaused, setLogosPaused] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const clientPages = buildClientPages(clients);

  useEffect(() => {
    if (isActive) setHasAppeared(true);
  }, [isActive]);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch("/api/clients", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/testimonials", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/settings", { cache: "no-store" })
        .then((r) => r.json())
        .catch(() => ({})),
    ])
      .then(([c, t, s]) => {
        if (mounted) {
          if (Array.isArray(c)) setClients(c);
          if (Array.isArray(t) && t.length > 0) setTestimonials(t);
          if (s && typeof s.showClientsSection === "boolean") setShowClients(s.showClientsSection);
        }
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  /* Auto slide client pages */
  useEffect(() => {
    if (logosPaused || clientPages.length <= 1 || !showClients) return;
    const timer = setInterval(() => {
      setClientPage((prev) => (prev + 1) % clientPages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [logosPaused, clientPages.length, showClients]);

  /* Auto slide testimonials */
  useEffect(() => {
    if (carouselPaused || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [carouselPaused, testimonials.length]);

  const goToClientPage = useCallback((index: number) => {
    setClientPage((index + clientPages.length) % clientPages.length);
  }, [clientPages.length]);

  const goTo = useCallback((index: number) => {
    setCurrent((index + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const active = testimonials[current];

  return (
    <div id="reviews" className="w-full mt-10 pt-10 border-t border-amber-950/10 select-none scroll-mt-28">
      {/* ═══════════════ CLIENTS SECTION ═══════════════ */}
      {showClients && (
      <div className="mb-20">
        <div className="mb-3 flex flex-col items-start select-none">
          <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
            Our Clients
          </span>
          <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left max-w-4xl">
          Committed to long-term success with every client through{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
            strategic collaboration
          </span>{" "}
          solutions.
        </h3>

        {/* 3-row logo grid, sliding through overflow pages */}
        <div
          className={`relative mt-12 overflow-hidden transition-opacity duration-700 ${
            hasAppeared ? "opacity-100" : "opacity-0"
          }`}
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
          }}
          onMouseEnter={() => setLogosPaused(true)}
          onMouseLeave={() => setLogosPaused(false)}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${clientPage * 100}%)`,
              transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {loading && (
              <div className="w-full flex-shrink-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-10 rounded-lg bg-slate-300/50" />
                ))}
              </div>
            )}

            {!loading && clientPages.length === 0 && (
              <div className="w-full text-center text-slate-400 text-sm py-6">
                No clients yet.
              </div>
            )}

            {clientPages.map((page, pageIdx) => {
              const columns = page.length < ROWS ? page.length : Math.ceil(page.length / ROWS);
              return (
                <div
                  key={pageIdx}
                  className="w-full flex-shrink-0 grid gap-x-6 gap-y-8 sm:gap-x-10 items-center justify-items-center"
                  style={{
                    gridTemplateRows: `repeat(${ROWS}, auto)`,
                    gridTemplateColumns: `repeat(${Math.max(columns, 2)}, minmax(0,1fr))`,
                    gridAutoFlow: "column",
                  }}
                >
                  {page.map((client) => (
                    <div
                      key={client.id}
                      className="flex items-center gap-2.5 text-slate-500 hover:text-teal-700 transition-colors duration-300 whitespace-nowrap cursor-default"
                    >
                      {client.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="h-10 md:h-12 w-auto max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 md:w-6 md:h-6 opacity-60 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                          </svg>
                          <span className="text-lg md:text-2xl font-semibold tracking-tight">
                            {client.name}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Client page indicators */}
        {clientPages.length > 1 && (
          <div className="mt-7 flex items-center justify-center gap-2">
            {clientPages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToClientPage(idx)}
                aria-label={`Go to client page ${idx + 1}`}
                className="group py-1 focus:outline-none"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === clientPage
                      ? "w-10 bg-gradient-to-r from-teal-500 to-[#0d6e7e] shadow-[0_0_10px_rgba(13,110,126,0.5)]"
                      : "w-4 bg-slate-400/30 group-hover:bg-slate-500/50"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      )}

      {/* ═══════════════ TESTIMONIALS SECTION ═══════════════ */}
      <div className="mt-16">
        <div className="mb-3 flex flex-col items-start select-none">
          <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
            Testimonials
          </span>
          <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left max-w-4xl mb-14">
          Hear from our clients whose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
            trust, satisfaction, and success
          </span>{" "}
          continue to inspire everything we build.
        </h3>

        {/* Premium carousel */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setCarouselPaused(true)}
          onMouseLeave={() => setCarouselPaused(false)}
        >
          {loading || testimonials.length === 0 ? (
            <div className="rounded-[28px] bg-white/60 border border-white/80 shadow-xl px-12 py-14 text-center text-slate-400 animate-pulse">
              {loading ? "Loading testimonials…" : "No testimonials yet."}
            </div>
          ) : (
            <>
              <div key={active.id} className={`animate-testimonial-in ${hasAppeared ? "" : "opacity-0"}`}>
                {/* Gradient ring wrapper */}
                <div className="rounded-[28px] p-[1.5px] bg-gradient-to-br from-teal-500/50 via-white/60 to-transparent shadow-[0_25px_70px_rgba(90,60,20,0.35)]">
                  <div className="relative rounded-[27px] px-6 py-10 sm:px-12 sm:py-12 overflow-hidden border border-white/80 backdrop-blur-sm"
                    style={{
                      background: "linear-gradient(160deg, rgba(255,253,247,0.98) 0%, rgba(251,245,232,0.98) 60%, rgba(255,252,244,0.98) 100%)",
                    }}>
                    {/* Spiral background (left side) */}
                    <div className="absolute inset-y-0 left-6 flex items-center justify-center pointer-events-none">
                      <svg
                        viewBox="0 0 140 140"
                        className="w-32 h-32 md:w-40 md:h-40"
                      >
                        <path
                          d={SPIRAL_PATH}
                          fill="none"
                          stroke="#0d6e7e"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          opacity="0.3"
                          className="spiral-draw animate-spiral-slow"
                          style={{ animationDelay: "0s, 5.5s" }}
                        />
                      </svg>
                    </div>

                    {/* Decorative quote glyph */}
                    <span className="absolute top-2 left-7 text-[130px] sm:text-[160px] leading-none font-serif text-teal-700/10 select-none">
                      &ldquo;
                    </span>

                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-teal-600/50 shadow-[0_0_35px_rgba(13,110,126,0.3)]">
                          {active.avatar ? (
                            <Image
                              src={active.avatar}
                              alt={active.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-teal-50 text-teal-700 text-2xl font-bold">
                              {active.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-[#0d6e7e] flex items-center justify-center border-2 border-white shadow-[0_0_12px_rgba(13,110,126,0.4)]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </div>

                      {/* Star rating */}
                      <div className="mt-5 flex gap-1.5 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 17.3l-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2l2.9 6.7 7.1.6-5.4 4.7 1.6 7z" />
                          </svg>
                        ))}
                      </div>

                      {/* Comment */}
                      <blockquote className="mt-6 text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-extralight max-w-xl">
                        &ldquo;{active.comment}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="mt-7">
                        <h4 className="text-lg sm:text-xl text-slate-900 font-medium tracking-tight">
                          {active.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-teal-700 mt-1 tracking-wider uppercase">
                          {[active.role, active.company].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 flex items-center justify-center gap-5">
                <button
                  onClick={() => goTo(current - 1)}
                  aria-label="Previous Testimonial"
                  className="w-11 h-11 rounded-full glass-nav-light hover:bg-white/80 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dots with auto-playing progress */}
                <div className="flex items-center gap-2">
                  {testimonials.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => goTo(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                      className="relative h-1.5 overflow-hidden rounded-full transition-all duration-500 bg-slate-400/30 hover:bg-slate-500/40 focus:outline-none"
                      style={{ width: idx === current ? "60px" : "18px" }}
                    >
                      {idx === current && (
                        <span
                          key={current}
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal-400 to-[#0d6e7e] shadow-[0_0_10px_#2dd4bf] animate-testimonial-progress"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goTo(current + 1)}
                  aria-label="Next Testimonial"
                  className="w-11 h-11 rounded-full glass-nav-light hover:bg-white/80 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}