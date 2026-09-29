"use client";

import AboutSection from "@/components/AboutSection";
import Navbar from "@/components/Navbar";
import SmartImage from "@/components/SmartImage";
import { navigateTo } from "@/lib/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* =========================================================================
   SLIDER CONFIGURATION
   ========================================================================= */
interface Slide {
  id: number;
  image: string;
  titleLight: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  button: {
    label: string;
    href: string;
  };
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/interior-49.webp",
    titleLight: "Building Your",
    titleHighlight: "Future",
    titleSuffix: ", Today.",
    description:
      "Crafting Bangladesh's most distinguished residential landmarks with uncompromising architectural brilliance and sustainable engineering.",
    button: {
      label: "Explore Projects",
      href: "#projects",
    },
  },
  // --- SLIDE 2 ---
  {
    id: 2,
    image: "/interior-43.webp",
    titleLight: "Where Elegance",
    titleHighlight: "Meets",
    titleSuffix: "Serenity.",
    description:
      "Private waterfront sanctuaries designed with floor-to-ceiling panoramic glass, natural stone finishes, and infinite horizon vistas.",
    button: {
      label: "Our Reviews",
      href: "#reviews",
    },
  },
  // --- SLIDE 3 ---
  {
    id: 3,
    image: "/interior-21.webp",
    titleLight: "Sky-High",
    titleHighlight: "Innovation",
    titleSuffix: "& Prestige.",
    description:
      "Forward-thinking commercial hubs featuring lush sky-gardens, LEED platinum efficiency, and world-class corporate infrastructure.",
    button: {
      label: "Contact Us",
      href: "#contact",
    },
  },
  // --- SLIDE 4 ---
  {
    id: 4,
    image: "/interior-08.webp",
    titleLight: "Interior",
    titleHighlight: "Elegance",
    titleSuffix: ", Refined.",
    description:
      "Signature interior environments crafted by our Interior Solution Department — bespoke design, functional elegance, meticulous craftsmanship.",
    button: {
      label: "Interior Solutions",
      href: "/interior-solutions",
    },
  },
];

const GOLD_TEXT =
  "linear-gradient(95deg, #fde68a 0%, #f59e0b 22%, #fef3c7 42%, #fbbf24 58%, #d97706 82%, #fbbf24 100%)";

const PUNCT_START = new Set([",", ".", "!", "?", ";", ":", "\u2013", "\u2014"]);

function tokenizePart(words: { text: string; hl?: boolean }[], part: string, hl = false) {
  const rawWords = part.trim().split(/\s+/).filter(Boolean);
  for (const raw of rawWords) {
    let word = raw;
    while (word.length > 0 && PUNCT_START.has(word[0]) && words.length > 0) {
      words[words.length - 1].text += word[0];
      word = word.slice(1);
    }
    if (word) words.push({ text: word, hl });
  }
}

function TitleReveal({
  light,
  highlight,
  suffix,
}: {
  light: string;
  highlight: string;
  suffix: string;
}) {
  const words: { text: string; hl?: boolean }[] = [];
  tokenizePart(words, light);
  tokenizePart(words, highlight, true);
  tokenizePart(words, suffix);

  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block animate-golden-hero" style={{ animationDelay: `${130 + i * 110}ms` }}>
          <span
            className="inline-block text-transparent bg-clip-text animate-golden-text-shimmer golden-stroke font-extrabold pb-[0.06em] -mb-[0.06em]"
            style={{
              backgroundImage: GOLD_TEXT,
              backgroundSize: "220% auto",
              filter: w.hl
                ? "drop-shadow(0 2px 0 rgba(120,53,15,0.35)) drop-shadow(0 0 28px rgba(245,158,11,0.45))"
                : "drop-shadow(0 2px 0 rgba(120,53,15,0.35)) drop-shadow(0 0 18px rgba(245,158,11,0.25))",
            }}
          >
            {w.text}
          </span>
          {i < words.length - 1 && "\u00a0"}
        </span>
      ))}
    </>
  );
}

/* =========================================================================
   SLIDER CONFIGURATION
   ========================================================================= */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  // Active section: 0 = Slider, 1 = About & Projects
  const [activeSection, setActiveSection] = useState<0 | 1>(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isTransitioningRef = useRef(false);
  const touchStartY = useRef(0);
  const section2Ref = useRef<HTMLElement>(null);

  // Detect small screens (the auto-scroll behaviour below is mobile-only)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Auto-advance slider every 7.5 seconds (only when active on Slider)
  useEffect(() => {
    if (activeSection !== 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setAnimKey((prev) => prev + 1);
    }, 7500);

    return () => clearInterval(timer);
  }, [currentSlide, activeSection]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAnimKey((prev) => prev + 1);
  };

  const active = slides[currentSlide];

  // High-performance smooth switch between sections
  const switchSection = useCallback((target: 0 | 1) => {
    if (isTransitioningRef.current || target === activeSection) return;
    isTransitioningRef.current = true;
    setActiveSection(target);
    setParallaxY(target === 1 ? -22 : 0);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 400);
  }, [activeSection]);

  // Mobile only: if the user stays idle on the hero for 15s, gently move
  // them to the About & Projects section. Any interaction resets the clock.
  useEffect(() => {
    if (!isMobile) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const reset = () => {
      clearTimeout(timer);
      if (activeSection !== 0) return;
      timer = setTimeout(() => switchSection(1), 15000);
    };

    const events: (keyof WindowEventMap)[] = [
      "touchstart",
      "touchmove",
      "touchend",
      "wheel",
      "keydown",
      "scroll",
    ];
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, reset));
      clearTimeout(timer);
    };
  }, [isMobile, activeSection, switchSection]);

  // Smooth scroll listener on section 2 to update the 2nd image upward/downward parallax
  // (rAF-throttled + rounded so we only re-render once per frame and only when the
  // offset actually changes — no scroll churn re-rendering the whole page)
  const parallaxPending = useRef(false);
  const handleSection2Scroll = () => {
    if (parallaxPending.current) return;
    parallaxPending.current = true;
    requestAnimationFrame(() => {
      parallaxPending.current = false;
      if (!section2Ref.current) return;
      const st = Math.round(section2Ref.current.scrollTop);
      // As user scrolls further down into section 2, move 2nd image smoothly upward (from -22px down to -75px)
      const dynamicOffset = -22 - Math.min(60, Math.round(st * 0.15));
      setParallaxY(dynamicOffset);
    });
  };

  // Global navigation: handles clicks on any in-app anchor link
  useEffect(() => {
    const onNavigate = (e: Event) => {
      const hash = (e as CustomEvent<string>).detail;
      if (!hash || hash === "#home") {
        if (section2Ref.current) section2Ref.current.scrollTop = 0;
        switchSection(0);
        return;
      }
      switchSection(1);
      window.setTimeout(() => {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (section2Ref.current) {
          section2Ref.current.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 560);
    };
    window.addEventListener("mpl-navigate", onNavigate);

    // Support arriving with a hash, e.g. from the Projects page via "/#about"
    const initialHash = window.location.hash;
    if (initialHash && initialHash !== "#home") {
      window.setTimeout(() => onNavigate(new CustomEvent("mpl-navigate", { detail: initialHash })), 60);
    }

    return () => window.removeEventListener("mpl-navigate", onNavigate);
  }, [switchSection]);

  // Wheel gesture handler to switch between Section 1 and Section 2
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 15) return;

      if (e.deltaY > 0 && activeSection === 0) {
        // Scrolling DOWN on Hero -> Switch to Section 2
        switchSection(1);
      } else if (e.deltaY < 0 && activeSection === 1) {
        // Only switch back to Hero if Section 2 is at the very top
        if (section2Ref.current && section2Ref.current.scrollTop <= 8) {
          switchSection(0);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (diff > 45 && activeSection === 0) {
        switchSection(1);
      } else if (diff < -45 && activeSection === 1) {
        if (section2Ref.current && section2Ref.current.scrollTop <= 8) {
          switchSection(0);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, switchSection]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#e9dcc6] select-none">
      {/* Permanent Sticky Navbar: Transparent on Hero, Frosted Glass on Section 2 */}
      <Navbar isSection2={activeSection === 1} />

      {/* ---------------- BACKGROUND IMAGE LAYER (z-0 to ensure high visibility) ---------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <SmartImage
              src={slide.image}
              alt="Real Estate Landmark"
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Crisp Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* ---------------- SOLID BACKDROP FOR SECTION 2 ---------------- */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-500 ease-out bg-[#e9dcc6]/95 pointer-events-none ${
          activeSection === 1 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Subtle Brand Glowing Ambient Orbs (hidden on mobile for performance) — radial
          gradients, no filter blur, so they cost nothing to paint */}
      <div
        aria-hidden
        className="hidden md:block absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full pointer-events-none z-10"
        style={{ background: "radial-gradient(circle, rgba(13,110,126,0.28) 0%, rgba(13,110,126,0.12) 45%, transparent 72%)" }}
      />
      <div
        aria-hidden
        className="hidden md:block absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full pointer-events-none z-10"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.22) 0%, rgba(45,212,191,0.08) 45%, transparent 72%)" }}
      />

      {/* =========================================================================
          SECTION 1: HERO SLIDER (z-20)
         ========================================================================= */}
      <section
        className={`absolute inset-0 z-20 flex flex-col justify-between transition-all duration-500 ease-out ${
          activeSection === 0
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-12 pointer-events-none"
        }`}
      >
        {/* Main Headline & Description */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 pt-32 md:pt-44 pb-12 flex-1 flex flex-col justify-center w-full">
          <div className="max-w-3xl">
            <div key={animKey} className="flex flex-col items-start">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
                <TitleReveal
                  light={active.titleLight}
                  highlight={active.titleHighlight}
                  suffix={active.titleSuffix}
                />
              </h1>

              <p
                className="animate-golden-hero mt-6 text-base sm:text-xl text-slate-200/90 max-w-2xl font-normal leading-relaxed drop-shadow-md"
                style={{ animationDelay: "680ms" }}
              >
                {active.description}
              </p>

              <div
                className="animate-golden-hero mt-10"
                style={{ animationDelay: "860ms" }}
              >
                <a
                  href={active.button.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (active.button.href.startsWith("/")) {
                      window.location.assign(active.button.href);
                      return;
                    }
                    navigateTo(active.button.href);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#3b2605] font-semibold rounded-full inline-flex items-center gap-3 shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
                >
                  <span>{active.button.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll-down mouse indicator */}
        {activeSection === 0 && (
          <button
            type="button"
            onClick={() => switchSection(1)}
            aria-label="Scroll down to About & Projects"
            className="absolute bottom-[72px] sm:bottom-[80px] left-1/2 -translate-x-1/2 z-30 cursor-pointer pointer-events-auto flex flex-col items-center gap-2 px-6 py-2 group"
          >
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-white/55 group-hover:text-white/90 transition-colors duration-300 font-semibold">
              Scroll
            </span>
            <span className="relative w-[22px] h-[36px] sm:w-6 sm:h-10 rounded-full border-2 border-white/45 group-hover:border-white/80 transition-colors duration-300 pt-1.5 flex justify-center">
              <span className="absolute top-2 w-[3.5px] h-[3.5px] rounded-full bg-gradient-to-r from-amber-300 to-amber-500 animate-scroll-wheel shadow-[0_0_8px_#fbbf24]" />
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-white/40 group-hover:text-white/80 -mt-0.5 transition-all duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {/* Bottom Slider Progress Indicators & Arrows */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-14 pb-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group relative py-2 focus:outline-none"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    idx === currentSlide
                      ? "w-14 bg-gradient-to-r from-teal-400 to-[#0d6e7e] shadow-[0_0_12px_#2dd4bf]"
                      : "w-6 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                goToSlide((currentSlide - 1 + slides.length) % slides.length)
              }
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-full glass-nav hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => goToSlide((currentSlide + 1) % slides.length)}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full glass-nav hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT US + SHOWCASING DISTINCTION IN EVERY DETAIL (z-20)
         ========================================================================= */}
      <section
        ref={section2Ref}
        onScroll={handleSection2Scroll}
        className={`absolute inset-0 z-20 overflow-y-auto transition-all duration-500 ease-out ${
          activeSection === 1
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        <AboutSection scrollYOffset={parallaxY} isActive={activeSection === 1} />
      </section>

      {/* Subtle Right Indicator Dots */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        <button
          onClick={() => switchSection(0)}
          aria-label="Hero Slider"
          className="group p-1.5 focus:outline-none"
        >
          <div
            className={`w-2.5 rounded-full transition-all duration-400 ${
              activeSection === 0
                ? "h-8 bg-teal-600 shadow-[0_0_12px_rgba(13,110,126,0.5)]"
                : "h-2.5 bg-slate-900/25 group-hover:bg-slate-900/55"
            }`}
          />
        </button>
        <button
          onClick={() => switchSection(1)}
          aria-label="About & Showcase"
          className="group p-1.5 focus:outline-none"
        >
          <div
            className={`w-2.5 rounded-full transition-all duration-400 ${
              activeSection === 1
                ? "h-8 bg-teal-600 shadow-[0_0_12px_rgba(13,110,126,0.5)]"
                : "h-2.5 bg-slate-900/25 group-hover:bg-slate-900/55"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
