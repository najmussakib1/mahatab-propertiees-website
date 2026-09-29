"use client";

import { useEffect, useRef } from "react";
import ClientsAndTestimonials from "./ClientsAndTestimonials";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import GalleryPreview from "./GalleryPreview";
import GoogleMapSection from "./GoogleMapSection";
import InteriorSlideshow from "./InteriorSlideshow";
import ManagingDirectorMessage from "./ManagingDirectorMessage";
import NewsSection from "./NewsSection";
import ProjectsShowcase from "./ProjectsShowcase";
import SmartImage from "./SmartImage";
import { INTERIOR_IMAGES } from "@/data/interior";

interface AboutSectionProps {
  scrollYOffset: number;
  isActive: boolean;
}

export default function AboutSection({ scrollYOffset, isActive }: AboutSectionProps) {
  // Mirrored 2nd image parallax: updated only while the user scrolls (no
  // continuous rAF loop — much cheaper on mobile).
  const mirrorImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mirrorImgRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const pct = (window.innerHeight / 2 - center) / (window.innerHeight / 2);
      const clamped = Math.max(-1, Math.min(1, pct));
      el.style.transform = `translateY(${clamped * 48}px)`;
    };

    // Find the nearest scrollable ancestor (the section's scroll container).
    let node: HTMLElement | null = el.parentElement;
    while (node && getComputedStyle(node).overflowY === "visible") {
      node = node.parentElement;
    }
    const target = node || document;
    target.addEventListener("scroll", update, { passive: true });
    update();

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      target.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div id="about" className="w-full max-w-7xl mx-auto px-6 md:px-14 pt-28 md:pt-32 pb-16 scroll-mt-28">
      {/* ---------------- PART 1: ABOUT US & BRAND PROMISE ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* LEFT COLUMN: 2 Images with Real-Time Parallax */}
        <div className="lg:col-span-6 relative flex items-center justify-start pb-6 pr-4 sm:pr-8">
          {/* Main Primary Image */}
          <div
            className={`relative w-56 sm:w-72 md:w-80 lg:w-[340px] h-[340px] sm:h-[400px] md:h-[460px] rounded-3xl overflow-hidden glass-nav-light p-2 shadow-2xl border border-white/70 group transition-all duration-500 ease-out will-change-transform ${
              isActive
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-6 scale-95"
            }`}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <SmartImage
                src="/about-building.webp"
                alt="Mahatab Properties Architecture"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 360px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] uppercase tracking-widest text-teal-300 font-semibold drop-shadow">
                  Excellence in Craft
                </span>
                <p className="text-white font-medium text-sm drop-shadow">
                  Aurora Signature Residences
                </p>
              </div>
            </div>
          </div>

          {/* 2nd Image (Luxury Penthouse Interior) - Smooth upward/downward parallax on scroll */}
          <div
            className={`absolute bottom-0 right-0 sm:right-2 md:right-4 w-44 sm:w-56 md:w-64 lg:w-[270px] h-52 sm:h-64 md:h-72 lg:h-[310px] rounded-3xl overflow-hidden glass-nav-light p-2 shadow-[0_20px_50px_rgba(90,60,20,0.25)] border border-white/80 z-10 group transition-all duration-500 delay-75 ease-out will-change-transform ${
              isActive
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
            style={{
              transform: isActive
                ? `translateY(${scrollYOffset}px)`
                : "translateY(24px)",
              transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease-out",
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <SmartImage
                src="/about-interior.webp"
                alt="Bespoke Luxury Interior"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 220px, 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] uppercase tracking-widest text-teal-200 font-semibold drop-shadow">
                  Interiors
                </span>
                <p className="text-white font-medium text-xs drop-shadow">
                  Panoramic Penthouse Living
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Title, Brand Promise Text, and About Us Button */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug tracking-tight transition-all duration-500 delay-50 ease-out will-change-transform ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Mahatab Properties Ltd. (MPL) started its journey in real estate sector
            and has become a household name in this sector as{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
              &ldquo;Delivering on promise&rdquo;
            </span>{" "}
            and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">
              &ldquo;Compliant and ethical builder&rdquo;
            </span>
            .
          </h2>

          <p
            className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light transition-all duration-500 delay-100 ease-out will-change-transform ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            The tagline,{" "}
            <strong className="text-teal-700 font-medium">
              “Building your future, today,”
            </strong>{" "}
            complements the visual identity by extending the architectural
            concept into a broader brand promise. It communicates that MAHATAB
            Properties is focused not only on developing properties, but on
            creating meaningful spaces and long-term value for its customers.
          </p>
        </div>
      </div>

      {/* ---------------- PART 1B: MIRRORED ABOUT (description left, images right) ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mt-10 md:mt-14">
        {/* LEFT COLUMN: Description + CTA (no title) */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <p
            className={`text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light transition-all duration-500 delay-100 ease-out will-change-transform ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            The tagline,{" "}
            <strong className="text-teal-700 font-medium">
              “Building your future, today,”
            </strong>{" "}
            complements the visual identity by extending the architectural
            concept into a broader brand promise. It communicates that MAHATAB
            Properties is focused not only on developing properties, but on
            creating meaningful spaces and long-term value for its customers.
          </p>

          <p
            className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light transition-all duration-500 delay-100 ease-out will-change-transform ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Every MPL project reflects a disciplined commitment to quality —
            sustainable engineering, refined materials, and transparent
            processes carried through from the very first blueprint to the
            final handover. With the trust of hundreds of families across the
            city, we craft residences designed to nurture communities and
            stand the test of time.
          </p>

          <div
            className={`mt-6 sm:mt-8 transition-all duration-500 delay-150 ease-out will-change-transform ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#about"
              className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-white tracking-wide transition-all duration-300 group overflow-hidden shadow-2xl shadow-[#0d6e7e]/40 hover:shadow-teal-400/30 active:scale-95 border border-white/25"
              style={{
                background: "linear-gradient(135deg, #0d6e7e 0%, #074853 100%)",
              }}
            >
              <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 ease-out group-hover:left-[100%]" />
              <span className="relative z-10 text-sm md:text-base">About Us</span>
              <div className="relative z-10 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:translate-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-teal-200 group-hover:text-white transition-colors"
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
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 2 Images with Parallax (mirrored: enter from right, 2nd image forward parallax) */}
        <div className="lg:col-span-6 relative flex items-center justify-end pb-6 pl-4 sm:pl-8">
          {/* Main Primary Image */}
          <div
            className={`relative w-56 sm:w-72 md:w-80 lg:w-[340px] h-[340px] sm:h-[400px] md:h-[460px] rounded-3xl overflow-hidden glass-nav-light p-2 shadow-2xl border border-white/70 group transition-all duration-500 ease-out will-change-transform ${
              isActive
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-6 scale-95"
            }`}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <SmartImage
                src="/about-building.webp"
                alt="Mahatab Properties Architecture"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 360px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] uppercase tracking-widest text-teal-300 font-semibold drop-shadow">
                  Excellence in Craft
                </span>
                <p className="text-white font-medium text-sm drop-shadow">
                  Aurora Signature Residences
                </p>
              </div>
            </div>
          </div>

          {/* 2nd Image - forward parallax: scroll down -> moves down, scroll up -> moves up */}
          <div
            ref={mirrorImgRef}
            className={`absolute bottom-0 left-0 sm:left-2 md:left-4 w-44 sm:w-56 md:w-64 lg:w-[270px] h-52 sm:h-64 md:h-72 lg:h-[310px] rounded-3xl overflow-hidden glass-nav-light p-2 shadow-[0_20px_50px_rgba(90,60,20,0.25)] border border-white/80 z-10 group transition-opacity duration-500 delay-75 ease-out will-change-transform ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <SmartImage
                src="/about-interior.webp"
                alt="Bespoke Luxury Interior"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 220px, 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] uppercase tracking-widest text-teal-200 font-semibold drop-shadow">
                  Interiors
                </span>
                <p className="text-white font-medium text-xs drop-shadow">
                  Panoramic Penthouse Living
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- PART 1C: MESSAGE FROM THE MANAGING DIRECTOR ---------------- */}
      <ManagingDirectorMessage />

      {/* ---------------- PART 2: SHOWCASING DISTINCTION IN EVERY DETAIL ---------------- */}
      <ProjectsShowcase isActive={isActive} />

      {/* ---------------- PART 3: CLIENTS & TESTIMONIALS ---------------- */}
      <ClientsAndTestimonials isActive={isActive} />
      </div>

      {/* ---------------- PART 4: CONTACT US (full-width band) ---------------- */}
      <ContactSection isActive={isActive} />

      {/* ---------------- PART 4A: INTERIOR SLIDER ---------------- */}
      <div className="bg-[#e9dcc6]">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-24">
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
      </div>

      {/* ---------------- PART 4B: GALLERY PREVIEW (one image per category, before news) ---------------- */}
      <div className="bg-[#e9dcc6]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 pt-16 md:pt-20 pb-2 border-t border-amber-950/10">
          <GalleryPreview isActive={isActive} />
        </div>
      </div>

      {/* ---------------- PART 4C: NEWS & EVENTS (bottom of home) ---------------- */}
      <div className="bg-[#e9dcc6]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-20">
          <NewsSection isActive={isActive} />
        </div>
      </div>

      {/* ---------------- PART 5: GOOGLE MAP LOCATION ---------------- */}
      <GoogleMapSection />

      {/* ---------------- PART 6: FOOTER ---------------- */}
      <Footer />
    </>
  );
}
