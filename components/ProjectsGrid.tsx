"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SmartImage from "./SmartImage";

export interface ProjectItem {
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
}

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
      { threshold: 0.1 }
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
        <div
          className={
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      href={`/projects/${project.id}`}
      aria-label={`View details of ${project.name}`}
      className="block h-full group/book"
    >
      <div
        ref={ref}
        style={{ transitionDelay: visible ? "0ms" : `${(index % 3) * 110}ms` }}
        className={`group relative flex flex-col h-full overflow-hidden rounded-3xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-xl shadow-amber-900/10 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/50 ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.97]"
        }`}
      >
      {/* Project Image Box */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden">
        <SmartImage
          src={project.image}
          alt={project.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {project.status === "ongoing" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/30 text-teal-100 border border-teal-300/50 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-[0_0_12px_rgba(45,212,191,0.35)]">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
              Ongoing
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-slate-100 border border-white/20 text-[11px] font-medium uppercase tracking-wider backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              Closed
            </span>
          )}
        </div>

        {/* Type over image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="text-[10px] uppercase font-mono text-amber-100/90 tracking-wider">
            {project.type}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 text-amber-600 flex-shrink-0"
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
          {project.location}
        </p>

        <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Meta chips */}
        <div className="mt-4 mb-5 flex flex-wrap gap-2">
          {[project.units, project.floors]
            .filter(Boolean)
            .map((meta) => (
              <span
                key={meta}
                className="px-2.5 py-1 rounded-full bg-amber-100/70 border border-amber-200/70 text-[11px] font-medium text-amber-800"
              >
                {meta}
              </span>
            ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-900/10 flex items-center justify-between text-xs">
          <span className="text-amber-700 font-medium uppercase tracking-wider group-hover:text-teal-700 transition-colors">
            View Details
          </span>
          <div className="w-7 h-7 rounded-full bg-slate-900/5 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500/25 group-hover:translate-x-1 group-hover:scale-110">
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
  );
}

const SEARCH_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-[18px] h-[18px] text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CHEVRON_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "ongoing" | "closed">("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const types = useMemo(
    () => Array.from(new Set(projects.map((p) => p.type).filter(Boolean))).sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (!q) return true;
      return [p.name, p.location, p.type, p.description].some((field) =>
        field?.toLowerCase().includes(q)
      );
    });
  }, [query, statusFilter, typeFilter, projects]);

  const isFiltering = query.trim() !== "" || statusFilter !== "all" || typeFilter !== "all";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 [transform:scaleY(1.06)] origin-left">
            Our{" "}
            <span className="text-transparent bg-clip-text font-bold drop-shadow-[0_1px_0_rgba(120,53,15,0.25)] bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800">
              Projects
            </span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="self-start sm:self-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-nav-light text-sm font-medium text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
            {projects.length.toString().padStart(2, "0")} Completed & Ongoing Landmarks
          </span>
        </Reveal>
      </div>

      {/* ---------------- Search & Filter Toolbar ---------------- */}
      <div className="mt-9 flex flex-col lg:flex-row gap-3">
        {/* Search box */}
        <div className="relative flex-1">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {SEARCH_ICON}
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by project name, location, type or description..."
            className="w-full rounded-full glass-nav-light border border-white/70 px-12 py-3.5 text-sm text-slate-700 placeholder:text-slate-400 bg-white/60 focus:outline-none focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/5 hover:bg-amber-500/25 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all duration-300 active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Status filter */}
        <div className="relative lg:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="w-full appearance-none rounded-full glass-nav-light border border-white/70 bg-white/60 px-5 py-3.5 pr-11 text-sm font-medium text-slate-700 focus:outline-none focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="ongoing">Ongoing</option>
            <option value="closed">Closed</option>
          </select>
          {CHEVRON_ICON}
        </div>

        {/* Type filter */}
        <div className="relative lg:w-64">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full appearance-none rounded-full glass-nav-light border border-white/70 bg-white/60 px-5 py-3.5 pr-11 text-sm font-medium text-slate-700 focus:outline-none focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {CHEVRON_ICON}
        </div>
      </div>

      {/* Filtered result summary */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-light text-slate-500">
          Showing{" "}
          <span className="font-semibold text-teal-700">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "landmark" : "landmarks"}
          {isFiltering && (
            <span className="text-slate-400"> of {projects.length} projects</span>
          )}
        </p>
        {isFiltering && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatusFilter("all");
              setTypeFilter("all");
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 hover:text-teal-700 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
        )}
      </div>

      {/* Project grid — 3 in a row, re-animates every time the filters change */}
      <div
        key={`${statusFilter}-${typeFilter}-${query}`}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
      >
        {filtered.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl glass-nav-light border border-white/70 px-8 py-16 text-center">
          <div className="mx-auto flex items-center justify-center gap-2 mb-4">
            {SEARCH_ICON}
            <span className="text-sm font-medium text-slate-500">No matching projects</span>
          </div>
          <p className="text-sm text-slate-400 font-light">
            Try a different keyword or reset the filters to explore the full collection.
          </p>
        </div>
      )}
    </>
  );
}