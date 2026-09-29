"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SmartImage from "./SmartImage";

export interface DetailProject {
  id: number;
  name: string;
  location: string;
  status: "ongoing" | "closed";
  type: string;
  image: string;
  description: string;
  area: string;
  units: string;
  floors: string;
  facing: string;
  parking: string;
  handover: string;
  brochure: string;
  gallery: string[];
  features: string[];
  map_lat: string;
  map_lng: string;
}

const GOLD_TEXT =
  "linear-gradient(95deg, #fde68a 0%, #f59e0b 22%, #fef3c7 42%, #fbbf24 58%, #d97706 82%, #fbbf24 100%)";

const TEAL_GRADIENT = "linear-gradient(120deg, #0d6e7e 0%, #074e59 45%, #0d6e7e 100%)";

/* ------------------------------------------------ ONE-SHOT SCROLL REVEAL --- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div
        className="transition-all duration-700 ease-out will-change-transform"
        style={{ transitionDelay: visible ? "0ms" : `${delay}ms` }}
      >
        <div className={visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- ICON MAP --- */

function SpecCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="group rounded-2xl border border-amber-900/10 bg-white/70 shadow-lg shadow-amber-900/[0.06] hover:shadow-xl hover:shadow-amber-900/10 hover:-translate-y-1 hover:border-amber-500/40 transition-all duration-300 p-5 flex items-start gap-4">
      <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-amber-500/15 to-teal-600/15 text-teal-700 group-hover:text-amber-600 flex items-center justify-center transition-colors">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
          {label}
        </p>
        <p className="mt-1 text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}

const SPEC_ICONS: Record<string, React.ReactNode> = {
  type: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    </svg>
  ),
  location: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  floors: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8-5 8 5M4 8l8 5 8-5M4 8v8l8 5 8-5V8M12 13v8" />
    </svg>
  ),
  area: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0H5a2 2 0 01-2-2v-2m4-6h6v6H7v-6z" />
    </svg>
  ),
  units: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10V5a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1zm9 1V4a1 1 0 011-1h5a1 1 0 011 1v7a1 1 0 01-1 1h-5a1 1 0 01-1-1zM4 20v-5a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1zm9 0v-7a1 1 0 011-1h5a1 1 0 011 1v7a1 1 0 01-1 1h-5a1 1 0 01-1-1z" />
    </svg>
  ),
  facing: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  ),
  parking: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h5a3 3 0 010 6H8v4M8 7v10m0-6h.01" />
    </svg>
  ),
  handover: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
};

const AMENITY_ICONS: React.ReactNode[] = [
  <svg key="0" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  <svg key="1" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
  </svg>,
  <svg key="2" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>,
  <svg key="3" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="4" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h5a3 3 0 010 6H8v4M8 7v10m0-6h.01" />
  </svg>,
  <svg key="5" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.245-3.808 13.053 0M2.25 8.5c5.25-5.25 13.5-5.25 18.75 0M12 17.25h.008v.008H12v-.008z" />
  </svg>,
  <svg key="6" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>,
  <svg key="7" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
  </svg>,
  <svg key="8" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21m9-9h-1.5M4.5 12H3m15.364-6.364l-1.06 1.06M6.696 18.304l-1.06 1.06m0-14.728l1.06 1.06m11.668 11.668l1.06 1.06M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
  </svg>,
  <svg key="9" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661M9 15.75h6" />
  </svg>,
  <svg key="10" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>,
  <svg key="11" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>,
];

/* ------------------------------------------------------------- SPEC ROWS --- */

function buildSpecs(project: DetailProject): { label: string; value: string; icon: React.ReactNode }[] {
  const specs: { label: string; value: string; icon: React.ReactNode }[] = [];
  const push = (label: string, value: string, icon: React.ReactNode) => {
    if (value.trim()) specs.push({ label, value, icon });
  };
  push("Project Type", project.type, SPEC_ICONS.type);
  push("Location", project.location, SPEC_ICONS.location);
  push("Storied", project.floors, SPEC_ICONS.floors);
  push("Apartment Size", project.area, SPEC_ICONS.area);
  push("No. of Units", project.units, SPEC_ICONS.units);
  push("Facing", project.facing, SPEC_ICONS.facing);
  push("Car Parking", project.parking, SPEC_ICONS.parking);
  push("Handover", project.handover, SPEC_ICONS.handover);
  return specs;
}

/* -------------------------------------------------- LAZY GOOGLE MAP ----- */

function ProjectMap({ project }: { project: DetailProject }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Wait for the map to scroll into view before mounting the iframe
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Let the page paint first, then kick off the map request
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Safety net: hide the spinner even if the iframe never reports "load"
  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setLoaded(true), 6000);
    return () => clearTimeout(t);
  }, [loaded]);

  const showMap = inView && ready;
  const loading = !showMap || !loaded;

  return (
    <div ref={wrapperRef} className="relative aspect-[16/9] md:aspect-[21/9] bg-[#074853] overflow-hidden">
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <div className="relative">
            <span className="absolute -inset-4 rounded-full bg-teal-400/20 animate-ping" />
            <span className="absolute -inset-4 rounded-full bg-teal-400/10 animate-pulse" />
            <div className="relative w-16 h-16 rounded-full border-2 border-white/15 border-t-amber-400 animate-spin flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-xs uppercase tracking-[0.28em] text-teal-200 font-semibold">
              Locating {project.name}
            </p>
            <div className="w-44 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-400 via-amber-400 to-amber-500 animate-preloader-bar" />
            </div>
          </div>
        </div>
      )}

      {/* The actual map — mounted only when scrolled into view after the page paints */}
      {showMap && (
        <iframe
          title={`${project.name} — location map`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            project.map_lat + "," + project.map_lng
          )}&z=15&output=embed`}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
}

/* --------------------------------------------------------------- PAGE ----- */

export default function ProjectDetail({ project }: { project: DetailProject }) {
  const [active, setActive] = useState(0);
  const gallery = Array.from(new Set([project.image, ...project.gallery].filter(Boolean)));
  const specs = buildSpecs(project);

  return (
    <div className="relative">
      {/* ================================ HERO ================================ */}
      <section className="relative h-[68vh] min-h-[520px] w-full overflow-hidden">
        <div className="absolute inset-0 pd-hero-zoom">
          <SmartImage
            src={project.image || "/slide-1.webp"}
            alt={project.name}
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e9dcc6] via-transparent to-black/35" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-14 flex flex-col justify-end pb-16">
          <div className="animate-golden-hero" style={{ animationDelay: "80ms" }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs font-medium tracking-wide backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              All Projects
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 animate-golden-hero" style={{ animationDelay: "200ms" }}>
            {project.status === "ongoing" ? (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/25 text-teal-100 border border-teal-300/50 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-[0_0_18px_rgba(45,212,191,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
                Ongoing
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-slate-100 border border-white/20 text-[11px] font-medium uppercase tracking-wider backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Completed
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-amber-100/90 text-sm font-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </span>
          </div>

          <h1
            className="animate-golden-hero mt-4 leading-[1.02] text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
            style={{ animationDelay: "320ms" }}
          >
            <span
              className="text-transparent bg-clip-text golden-stroke font-extrabold tracking-tight pb-[0.1em] -mb-[0.1em] inline-block"
              style={{ backgroundImage: GOLD_TEXT, backgroundSize: "220% auto" }}
            >
              {project.name}
            </span>
          </h1>

          <p
            className="animate-golden-hero mt-3 text-sm sm:text-base text-amber-900/90 font-semibold uppercase tracking-[0.3em]"
            style={{ animationDelay: "440ms" }}
          >
            {project.type}
          </p>
        </div>
      </section>

      {/* ========================= INTRODUCTION + STATS ======================= */}
      <section className="relative -mt-6">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl border border-amber-900/10 bg-white/75 backdrop-blur-sm px-6 sm:px-10 py-10 shadow-xl shadow-amber-900/10">
            <Reveal className="lg:col-span-7">
              <div className="flex flex-col items-start">
                <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                  The Development
                </span>
                <div className="mt-2 h-[3px] w-28 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={{ background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)", backgroundSize: "200% 200%" }} />
              </div>
              <p className="mt-6 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-slate-700">
                {project.description}
              </p>
            </Reveal>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { label: "No. of Units", value: project.units },
                { label: "Storied", value: project.floors },
                { label: "Apartment Size", value: project.area },
                { label: "Handover", value: project.handover },
              ]
                .filter((s) => s.value.trim())
                .map((s, i) => (
                  <Reveal key={s.label} delay={i * 90}>
                    <div className="rounded-2xl border border-amber-900/10 bg-[#f3eada] px-5 py-6 text-center shadow-md shadow-amber-900/[0.05]">
                      <div className="text-2xl md:text-[26px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-teal-700 leading-tight">
                        {s.value}
                      </div>
                      <div className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                        {s.label}
                      </div>
                    </div>
                  </Reveal>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============================== AT A GLANCE ========================== */}
      <section className="relative mt-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14">
          <Reveal>
            <div className="flex flex-col items-start">
              <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                Everything You Need To Know
              </span>
              <div className="mt-2 h-[3px] w-28 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={{ background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)", backgroundSize: "200% 200%" }} />
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left">
                At a{" "}
                <span className="text-transparent bg-clip-text text-[0.95em] bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800">
                  Glance
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {specs.map((spec, i) => (
              <Reveal key={spec.label} delay={(i % 4) * 70}>
                <SpecCard label={spec.label} value={spec.value} icon={spec.icon} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== LOCATION / GOOGLE MAP ======================== */}
      {project.map_lat && project.map_lng && (
        <section className="relative mt-24">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-14">
            <Reveal>
              <div className="flex flex-col items-start">
                <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                  Find Us Here
                </span>
                <div className="mt-2 h-[3px] w-28 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={{ background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)", backgroundSize: "200% 200%" }} />
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left">
                  Location &amp;{" "}
                  <span className="text-transparent bg-clip-text text-[0.95em] bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800">
                    Map
                  </span>
                </h2>
                <p className="mt-3 text-slate-600 font-light leading-relaxed inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mt-10 rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/20 border border-white/60">
                <ProjectMap project={project} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ================================= GALLERY ============================ */}
      {gallery.length > 0 && (
        <section className="relative mt-24">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-14">
            <Reveal>
              <div className="flex flex-col items-start">
                <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-700">
                  A Closer Look
                </span>
                <div className="mt-2 h-[3px] w-28 rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]" style={{ background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)", backgroundSize: "200% 200%" }} />
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left">
                  Gallery &amp;{" "}
                  <span className="text-transparent bg-clip-text text-[0.95em] bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800">
                    Facade
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mt-10 rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/20 border border-white/60">
                <div className="relative aspect-[16/9] md:aspect-[21/9] bg-slate-800">
                  <SmartImage
                    key={gallery[active] || project.image}
                    src={gallery[active] || project.image}
                    alt={`${project.name} — view ${active + 1}`}
                    className="object-cover pd-zoom-in"
                    sizes="(max-width: 768px) 100vw, 1280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 right-5 text-[11px] font-mono text-white/80 tracking-widest bg-slate-950/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
                    {String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </Reveal>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                      active === i
                        ? "border-amber-500 shadow-lg shadow-amber-500/30 scale-[0.98]"
                        : "border-transparent opacity-70 hover:opacity-100 hover:scale-[0.98]"
                    }`}
                  >
                    <SmartImage src={src} alt="" sizes="220px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================== AMENITIES ============================= */}
      {project.features.length > 0 && (
        <section className="relative mt-24">
          <div
            className="mx-auto w-full max-w-7xl px-6 md:px-14 py-14 md:py-20 rounded-3xl text-white shadow-2xl shadow-teal-900/30"
            style={{ background: TEAL_GRADIENT }}
          >
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col items-start">
                  <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] text-teal-200">
                    Luxury Living, Thoughtfully Designed
                  </span>
                  <div className="mt-2 h-[3px] w-28 rounded-full bg-gradient-to-r from-teal-300 to-white/40" />
                  <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white [transform:scaleY(1.05)] origin-left">
                    Exceptional Amenities
                  </h2>
                </div>
                <p className="md:max-w-sm text-teal-100/85 text-sm font-light leading-relaxed">
                  Every residence is finished with premium materials and a complete suite
                  of amenities for a comfortable, secure lifestyle.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((feature, i) => (
                <Reveal key={feature} delay={(i % 3) * 80}>
                  <div className="h-full flex items-center gap-4 rounded-2xl bg-white/[0.07] border border-white/10 px-5 py-5 hover:bg-white/[0.12] hover:-translate-y-1 hover:border-amber-300/40 transition-all duration-300">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-amber-400/25 to-teal-400/20 text-amber-300 flex items-center justify-center">
                      {AMENITY_ICONS[i % AMENITY_ICONS.length]}
                    </div>
                    <p className="text-[15px] font-medium text-white/90 leading-snug">{feature}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================= CTA ================================ */}
      <section className="relative mt-24 mb-8">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-amber-900/10 bg-white/75 shadow-xl shadow-amber-900/10 px-6 sm:px-12 py-12 md:py-14 text-center">
              <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 md:w-80 md:h-80 rounded-full bg-amber-400/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 w-64 h-64 md:w-80 md:h-80 rounded-full bg-teal-500/15 blur-3xl" />

              <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 [transform:scaleY(1.05)] origin-center">
                Interested in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-teal-700">
                  {project.name}
                </span>
                ?
              </h2>
              <p className="relative mt-4 max-w-2xl mx-auto text-slate-600 font-light leading-relaxed">
                Talk to our team today for a site visit, the latest price list and payment
                plans tailored to you — and make this landmark your address.
              </p>

              <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[#3b2605] font-semibold tracking-wide shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/50 transition-all duration-300 active:scale-95 group"
                  style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}
                >
                  <span>Enquire About This Project</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                {project.brochure && (
                  <a
                    href={project.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border border-slate-300 text-slate-800 font-semibold tracking-wide shadow-lg shadow-slate-900/10 hover:border-teal-500/60 hover:text-teal-700 transition-all duration-300 active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Brochure
                  </a>
                )}

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold tracking-wide shadow-2xl shadow-teal-900/40 hover:shadow-teal-800/50 transition-all duration-300 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #0d6e7e 0%, #074853 100%)" }}
                >
                  <span>View All Projects</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}