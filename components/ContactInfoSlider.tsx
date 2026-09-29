"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SmartImage from "./SmartImage";

/* Each slide is a full-width band styled like the "Ready to Join" section on
   the Careers page: background image + teal gradient, gold shimmer heading,
   gold underline, copy, CTA buttons and a right-side glass card. */

interface SlideButton {
  label: string;
  href: string;
  theme: "gold" | "glass";
}

interface ContactSlide {
  id: string;
  image: string;
  kicker: string;
  title: string;
  text: string[];
  buttons: SlideButton[];
  rightCard: {
    kicker: string;
    title?: string;
    lines: string[];
  };
}

const SLIDES: ContactSlide[] = [
  {
    id: "head-office",
    image: "/about-building.webp",
    kicker: "Head Office",
    title: "Visit Our Head Office",
    text: [
      "MPL Head Office, Farida Tower,",
      "Rajapur, Pabna.",
    ],
    buttons: [
      {
        label: "Get Directions",
        href: "https://www.google.com/maps/search/?api=1&query=Rajapur+Pabna",
        theme: "gold",
      },
      {
        label: "Rajapur · Pabna",
        href: "https://www.google.com/maps/search/?api=1&query=Rajapur+Pabna",
        theme: "glass",
      },
    ],
    rightCard: {
      kicker: "Business Hours",
      title: "We'd love to see you",
      lines: ["Saturday – Thursday · 9:00 AM – 6:00 PM", "Friday · Closed"],
    },
  },
  {
    id: "phone",
    image: "/slide-2.webp",
    kicker: "Phone",
    title: "Call Us Anytime",
    text: ["+880 1712-345678", "+880 1712-345679"],
    buttons: [
      {
        label: "Call Now",
        href: "tel:+8801712345678",
        theme: "gold",
      },
      {
        label: "+880 1712-345678",
        href: "tel:+8801712345678",
        theme: "glass",
      },
    ],
    rightCard: {
      kicker: "Direct WhatsApp Contact",
      title: "Chat instantly with our team",
      lines: ["+880 1301-222211"],
    },
  },
  {
    id: "email",
    image: "/interior-21.webp",
    kicker: "Email",
    title: "Email Our Team",
    text: ["info@mahatabproperties.com"],
    buttons: [
      {
        label: "Send Email",
        href: "mailto:info@mahatabproperties.com",
        theme: "gold",
      },
      {
        label: "info@mahatabproperties.com",
        href: "mailto:info@mahatabproperties.com",
        theme: "glass",
      },
    ],
    rightCard: {
      kicker: "Response Time",
      title: "We reply fast",
      lines: ["Within 24 hours on business days", "For urgent queries, call or WhatsApp"],
    },
  },
];

const GOLD_UNDERLINE = {
  background:
    "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)",
  backgroundSize: "200% 200%",
};

const SLIDE_DURATION = 6000;

export default function ContactInfoSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);

  const count = SLIDES.length;
  const slide = SLIDES[current];

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (paused) return;
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, count]);

  // Reset the interval after a manual navigation.
  const navigate = useCallback(
    (index: number) => {
      goTo(index);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        startRef.current = Date.now();
        timerRef.current = setInterval(() => {
          setCurrent((prev) => (prev + 1) % count);
        }, SLIDE_DURATION);
      }
    },
    [goTo, count]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(current - 1);
      if (e.key === "ArrowRight") navigate(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, current]);

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Rounded band — styled like the "Ready to Join" section */}
      <div className="rounded-3xl overflow-hidden relative">
        {/* Background image + teal gradient overlay */}
        <div className="absolute inset-0">
          <SmartImage
            src={slide.image}
            alt={slide.title}
            priority={current === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#074e59]/95 via-[#074e59]/85 to-[#0a3a46]/70" />
        </div>

        {/* Content */}
        <div
          key={slide.id}
          className="relative z-10 px-6 sm:px-10 md:px-14 py-14 md:py-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10"
        >
          {/* LEFT: copy */}
          <div className="animate-golden-hero lg:col-span-7">
            <div className="mb-3 flex flex-col items-start">
              <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-transparent bg-clip-text uppercase [transform:scaleY(1.1)] origin-left animate-golden-text-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #fbbf24 0%, #fef08a 25%, #f59e0b 50%, #fcd34d 75%, #fbbf24 100%)",
                  backgroundSize: "200% auto",
                }}
              >
                {slide.title}
              </span>
              <div
                className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]"
                style={GOLD_UNDERLINE}
              />
            </div>

            <p className="mt-4 flex flex-col gap-0.5">
              {slide.text.map((line) => (
                <span
                  key={line}
                  className="text-sm sm:text-base md:text-lg text-slate-200/90 font-light leading-relaxed"
                >
                  {line}
                </span>
              ))}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {slide.buttons.map((btn) =>
                btn.theme === "gold" ? (
                  <a
                    key={btn.label}
                    href={btn.href}
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#3b2605] font-semibold rounded-full inline-flex items-center gap-3 shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
                  >
                    <span>{btn.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ) : (
                  <a
                    key={btn.label}
                    href={btn.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-pill text-slate-100 border border-white/25 hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {btn.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* RIGHT: card */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="rounded-3xl glass-pill p-6 border border-white/20 bg-white/10 backdrop-blur-xl">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-300">
                {slide.rightCard.kicker}
              </span>
              {slide.rightCard.title && (
                <p className="mt-3 text-slate-100 text-sm sm:text-base font-light leading-relaxed">
                  {slide.rightCard.title}
                </p>
              )}
              <div className="mt-4 flex flex-col gap-2">
                {slide.rightCard.lines.map((line) => (
                  <div key={line} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_0_8px_#fbbf24] shrink-0" />
                    <span className="text-sm sm:text-base text-slate-100 font-light leading-relaxed">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => navigate(current - 1)}
            aria-label="Previous contact card"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-nav hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-all duration-300 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => navigate(current + 1)}
            aria-label="Next contact card"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-nav hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-all duration-300 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate(idx)}
              aria-label={`Go to ${s.title}`}
              className="group py-1 focus:outline-none"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-700 ${
                  idx === current
                    ? "w-10 bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_0_10px_#fbbf24]"
                    : "w-3 bg-slate-900/25 group-hover:bg-slate-900/55"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}