"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Client, Gallery, LandownerReview, Message, News, Project, Testimonial } from "./api";
import { api } from "./api";
import {
  ClientsSection,
  GallerySection,
  LandownerReviewsSection,
  MessagesSection,
  NewsSection,
  OverviewSection,
  ProjectsSection,
  SettingsSection,
  TestimonialsSection,
} from "./dashboard-sections";

type Tab = "overview" | "projects" | "clients" | "testimonials" | "news" | "landowners" | "gallery" | "messages" | "settings";

const NAV: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h5v-5a2 2 0 014 0v5h5V10" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
      </svg>
    ),
  },
  {
    id: "news",
    label: "News & Events",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-1.5 3h1.5M5 19h12a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 01-2 2H5v0a2 2 0 002 2zm3-8.5h5.5V9H8v3.5zm0 3.5h5m-5-6h5" />
      </svg>
    ),
  },
  {
    id: "clients",
    label: "Clients",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10.5h4M8 14h4m-7-6h6a2 2 0 012 2v2.5a2 2 0 01-2 2H8l-4 3v-5.5A2 2 0 014 8z" />
      </svg>
    ),
  },
  {
    id: "landowners",
    label: "Landowners",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
      </svg>
    ),
  },
  {
    id: "messages",
    label: "Messages",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

interface Toast {
  id: number;
  message: string;
  tone: "success" | "error";
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [sideOpen, setSideOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [landownerReviews, setLandownerReviews] = useState<LandownerReview[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const notify = useCallback((message: string, tone: "success" | "error" = "success") => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [p, c, t, m, n, lr, g] = await Promise.all([
        api<Project[]>("/api/projects"),
        api<Client[]>("/api/clients"),
        api<Testimonial[]>("/api/testimonials"),
        api<Message[]>("/api/messages"),
        api<News[]>("/api/news"),
        api<LandownerReview[]>("/api/landowner-reviews"),
        api<Gallery[]>("/api/gallery"),
      ]);
      setProjects(Array.isArray(p) ? p : []);
      setClients(Array.isArray(c) ? c : []);
      setTestimonials(Array.isArray(t) ? t : []);
      setMessages(Array.isArray(m) ? m : []);
      setNews(Array.isArray(n) ? n : []);
      setLandownerReviews(Array.isArray(lr) ? lr : []);
      setGallery(Array.isArray(g) ? g : []);
    } catch (err) {
      notify(err instanceof Error ? err.message : "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ---------- Sidebar ---------- */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 flex flex-col ${
          sideOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-[#074853] flex items-center justify-center shadow-lg shadow-teal-900/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-white leading-tight tracking-tight">MPL Admin</p>
            <p className="text-[11px] text-slate-500">Control Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  setSideOpen(false);
                }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-teal-600/25 to-[#074853]/30 text-teal-300 border border-teal-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/70 border border-transparent"
                }`}
              >
                {item.icon}
                {item.label}
                {item.id === "messages" && unread > 0 && (
                  <span className="ml-auto text-[10px] font-bold bg-rose-500 text-white rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800 flex flex-col gap-1">
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V10.5m3-7.5v6m-6-6l6 6" />
            </svg>
            View Website
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m0 0l4-4m-4 4l4 4m6-1v5a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v5" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {sideOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden" onClick={() => setSideOpen(false)} />
      )}

      {/* ---------- Main ---------- */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setSideOpen(true)}
            aria-label="Open menu"
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight capitalize">{NAV.find((n) => n.id === tab)?.label}</h1>
            <p className="text-xs text-slate-500 hidden sm:block">Mahatab Properties Ltd — dashboard</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:flex w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
            <span className="text-xs text-slate-400 hidden sm:block">admin</span>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <span className="w-8 h-8 border-2 border-slate-700 border-t-teal-400 rounded-full animate-spin" />
              <p className="text-sm text-slate-500">Loading dashboard…</p>
            </div>
          ) : (
            <>
              {tab === "overview" && (
                <OverviewSection
                  projects={projects}
                  clients={clients}
                  testimonials={testimonials}
                  messages={messages}
                  news={news}
                  landownerReviews={landownerReviews}
                  gallery={gallery}
                  onGo={setTab}
                />
              )}
              {tab === "projects" && <ProjectsSection items={projects} refresh={loadAll} notify={notify} />}
              {tab === "clients" && <ClientsSection items={clients} refresh={loadAll} notify={notify} />}
              {tab === "testimonials" && <TestimonialsSection items={testimonials} refresh={loadAll} notify={notify} />}
              {tab === "landowners" && <LandownerReviewsSection items={landownerReviews} refresh={loadAll} notify={notify} />}
              {tab === "gallery" && <GallerySection items={gallery} refresh={loadAll} notify={notify} />}
              {tab === "news" && <NewsSection items={news} refresh={loadAll} notify={notify} />}
              {tab === "messages" && <MessagesSection items={messages} refresh={loadAll} notify={notify} />}
              {tab === "settings" && <SettingsSection notify={notify} />}
            </>
          )}
        </main>
      </div>

      {/* ---------- Toasts ---------- */}
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl text-sm font-medium shadow-2xl border backdrop-blur-xl flex items-center gap-2 animate-toast-in ${
              t.tone === "success"
                ? "bg-teal-900/90 border-teal-500/40 text-teal-100"
                : "bg-rose-900/90 border-rose-500/40 text-rose-100"
            }`}
          >
            {t.tone === "success" ? "✓" : "✕"} {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}