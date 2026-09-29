"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SmartImage from "./SmartImage";

interface ShowcaseProject {
  id: number;
  name: string;
  location: string;
  status: "ongoing" | "closed";
  type: string;
  image: string;
  description: string;
  area?: string;
  units?: string;
  floors?: string;
}

interface ProjectsShowcaseProps {
  isActive?: boolean;
}

export default function ProjectsShowcase({ isActive = true }: ProjectsShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data)) setProjects(data);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      setHasAppeared(true);
    }
  }, [isActive]);

  // Automatic Smooth Horizontal Scrolling — desktop only for smoothness on phones
  useEffect(() => {
    if (!isActive || isPaused || !window.matchMedia("(min-width: 768px)").matches) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If reached end, smoothly loop back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
        }
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="projects" className="w-full mt-10 pt-10 border-t border-amber-950/10 select-none scroll-mt-28">
      {/* Title & Navigation Controls in one line */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          {/* "at a glance to project" with automatic animating underline */}
          <div className="mb-2 flex flex-col items-start select-none">
            <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
              at a glance to project
            </span>
            {/* Automatic Pulsing & Expanding Underline */}
            <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left">
            Showcasing Distinction in Every Detail
          </h3>
        </div>

        {/* Prev / Next Slide Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll Projects Left"
            className="w-10 h-10 rounded-full glass-nav-light hover:bg-white/80 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all active:scale-90"
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
            onClick={() => scroll("right")}
            aria-label="Scroll Projects Right"
            className="w-10 h-10 rounded-full glass-nav-light hover:bg-white/80 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all active:scale-90"
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

      {/* Horizontal One-Line Project Slider Container - Automatically moves, pauses on user hover */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex items-stretch gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] rounded-3xl glass-nav-light p-3.5 border border-white/70 flex flex-col gap-3 animate-pulse"
            >
              <div className="w-full h-52 sm:h-56 rounded-2xl bg-slate-300/50" />
              <div className="h-5 w-2/3 rounded-full bg-slate-300/60" />
              <div className="h-3 w-1/2 rounded-full bg-slate-300/40" />
            </div>
          ))}

        {!loading && projects.length === 0 && (
          <div className="min-w-full rounded-3xl glass-nav-light border border-white/70 px-8 py-14 text-center text-slate-500">
            No projects yet. Add projects from the admin dashboard.
          </div>
        )}

        {projects.map((project, idx) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            aria-label={`View details of ${project.name}`}
            className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] block"
          >
            <div
              style={{
                animationDelay: `${idx * 120}ms`,
              }}
              className={`rounded-3xl glass-nav-light p-3.5 border border-white/70 hover:border-teal-500/50 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden shadow-xl hover:-translate-y-1.5 ${
                hasAppeared ? "animate-card-appear" : "opacity-0 translate-y-8"
              }`}
            >
            {/* Project Image Box */}
            <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden mb-3.5">
              <SmartImage
                src={project.image}
                alt={project.name}
                sizes="360px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Status Badge: Ongoing (Teal Glow) / Closed (Subtle Charcoal Glass) */}
              <div className="absolute top-3 left-3">
                {project.status === "ongoing" ? (
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/40 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-[0_0_12px_rgba(45,212,191,0.35)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  Ongoing
                </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-slate-200 border border-white/20 text-[11px] font-medium uppercase tracking-wider backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Closed
                  </span>
                )}
              </div>

              {/* Property Type Badge */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] uppercase font-mono text-teal-200/90 tracking-wider">
                  {project.type}
                </span>
              </div>
            </div>

            {/* Project Name & Location */}
            <div className="px-1.5 pb-1 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-xl font-light text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors">
                  {project.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-teal-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">{project.location}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900/10 flex items-center justify-between text-xs">
                <span className="text-teal-700 font-mono">View Details</span>
                <div className="w-6 h-6 rounded-full bg-slate-900/5 flex items-center justify-center transition-all duration-300 group-hover:bg-teal-500/30 group-hover:translate-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-slate-700"
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
                </div>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
