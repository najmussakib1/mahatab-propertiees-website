"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Client, Gallery, LandownerReview, Message, News, Project, Testimonial } from "./api";
import { api, formatDate, GALLERY_CATEGORIES } from "./api";
import { Field, FormActions, GalleryEditor, ImageUploader, Modal, parseStringArray, Select, StringListEditor, TextArea } from "./forms";

/* ------------------------------------------------------------------ UI ---- */

function Pill({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "teal" | "gold" | "rose" }) {
  const tones = {
    slate: "bg-slate-700/60 text-slate-300",
    teal: "bg-teal-500/15 text-teal-300 border border-teal-500/30",
    gold: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function IconButton({
  onClick,
  label,
  danger,
  children,
}: {
  onClick: () => void;
  label: string;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors border ${
        danger
          ? "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
          : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-teal-300 hover:border-teal-500/40 hover:bg-slate-800"
      }`}
    >
      {children}
    </button>
  );
}

function ConfirmDelete({
  message,
  onConfirm,
  onCancel,
  loading,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <Modal title="Confirm deletion" onClose={onCancel}>
      <p className="text-sm text-slate-300 mb-6">{message}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors border border-slate-700"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          Delete
        </button>
      </div>
    </Modal>
  );
}

/* ---------------------------------------------------------- OVERVIEW ---- */

export function OverviewSection({
  projects,
  clients,
  testimonials,
  messages,
  news,
  landownerReviews,
  gallery,
  onGo,
}: {
  projects: Project[];
  clients: Client[];
  testimonials: Testimonial[];
  messages: Message[];
  news: News[];
  landownerReviews: LandownerReview[];
  gallery: Gallery[];
  onGo: (tab: "projects" | "clients" | "testimonials" | "messages" | "news" | "landowners" | "gallery") => void;
}) {
  const unread = messages.filter((m) => !m.is_read).length;
  const stats = [
    { label: "Projects", value: projects.length, icon: "building", tone: "from-teal-500 to-[#074853]", tab: "projects" as const },
    { label: "Clients", value: clients.length, icon: "badge", tone: "from-amber-500 to-amber-700", tab: "clients" as const },
    { label: "Testimonials", value: testimonials.length, icon: "quote", tone: "from-violet-500 to-purple-700", tab: "testimonials" as const },
    { label: "Landowner Reviews", value: landownerReviews.length, icon: "land", tone: "from-emerald-500 to-emerald-700", tab: "landowners" as const },
    { label: "Gallery Photos", value: gallery.length, icon: "gal", tone: "from-fuchsia-500 to-pink-700", tab: "gallery" as const },
    { label: "Unread Messages", value: unread, icon: "mail", tone: "from-rose-500 to-rose-700", tab: "messages" as const },
    { label: "News & Events", value: news.length, icon: "news", tone: "from-sky-500 to-blue-700", tab: "news" as const },
  ];

  const icons: Record<string, React.ReactNode> = {
    building: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
      </svg>
    ),
    badge: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    quote: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10.5h4M8 14h4m-7-6h6a2 2 0 012 2v2.5a2 2 0 01-2 2H8l-4 3v-5.5A2 2 0 014 8zm13 2a2 2 0 11-2 2" />
      </svg>
    ),
    mail: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    news: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-1.5 3h1.5M5 19h12a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 01-2 2H5v0a2 2 0 002 2zm3-8.5h5.5V9H8v3.5zm0 3.5h5m-5-6h5" />
      </svg>
    ),
    land: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    gal: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
      </svg>
    ),
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => onGo(s.tab)}
            className="text-left rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5 hover:from-teal-500/50 hover:to-white/10 transition-all group"
          >
            <div className="rounded-2xl bg-slate-900/95 px-5 py-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.tone} flex items-center justify-center text-white shadow-lg shrink-0`}>
                {icons[s.icon]}
              </div>
              <div>
                <div className="text-2xl font-bold text-white leading-none">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-1.5">{s.label}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent messages */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5">
          <div className="rounded-2xl bg-slate-900/95 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white tracking-wide">Recent Messages</h3>
              <button onClick={() => onGo("messages")} className="text-xs text-teal-400 hover:text-teal-300 font-medium">
                View all →
              </button>
            </div>
            <div className="flex flex-col divide-y divide-slate-800">
              {messages.slice(0, 4).map((m) => (
                <div key={m.id} className="py-3 flex items-start gap-3">
                  <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${m.is_read ? "bg-slate-600" : "bg-teal-400 shadow-[0_0_8px_#2dd4bf]"}`} />
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{m.subject || "No subject"}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{m.name} · {formatDate(m.created_at)}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && <p className="py-4 text-sm text-slate-500">No messages yet.</p>}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5">
          <div className="rounded-2xl bg-slate-900/95 px-6 py-5">
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Add Project", tab: "projects" as const },
                { label: "Add Client", tab: "clients" as const },
                { label: "Add Testimonial", tab: "testimonials" as const },
                { label: "Add Landowner Review", tab: "landowners" as const },
                { label: "Add Gallery Photo", tab: "gallery" as const },
                { label: "Add News / Event", tab: "news" as const },
                { label: "Inbox", tab: "messages" as const },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => onGo(a.tab)}
                  className="px-4 py-3 rounded-xl bg-slate-800/70 hover:bg-teal-600/20 hover:border-teal-500/40 border border-slate-700 text-sm text-slate-200 font-medium transition-all text-left"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- PROJECTS ---- */

const emptyProject: Omit<Project, "id"> = {
  name: "",
  location: "",
  status: "ongoing",
  type: "",
  image: "",
  description: "",
  area: "",
  units: "",
  floors: "",
  facing: "",
  parking: "",
  handover: "",
  brochure: "",
  gallery: [],
  features: [],
  map_lat: "",
  map_lng: "",
};

function ProjectFormModal({
  project,
  onClose,
  onSaved,
}: {
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Omit<Project, "id">>(
    project
      ? {
          ...project,
          gallery: parseStringArray(project.gallery),
          features: parseStringArray(project.features),
        }
      : { ...emptyProject, gallery: [""], features: [""] }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof Omit<Project, "id">) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const setGallery = (gallery: string[]) => setForm((f) => ({ ...f, gallery }));
  const setFeatures = (features: string[]) => setForm((f) => ({ ...f, features }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        gallery: (form.gallery as string[]).map((s) => s.trim()).filter(Boolean),
        features: (form.features as string[]).map((s) => s.trim()).filter(Boolean),
      };
      if (project) {
        await api(`/api/projects/${project.id}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await api("/api/projects", { method: "POST", body: JSON.stringify(payload) });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={project ? "Edit Project" : "Add Project"} onClose={onClose} wide>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Project Name" value={form.name} onChange={set("name")} required placeholder="e.g. Ainora Residences" />
          <Field label="Location" value={form.location} onChange={set("location")} placeholder="e.g. Dhanmondi, Dhaka" />
          <Field label="Property Type" value={form.type} onChange={set("type")} placeholder="e.g. Luxury Residential Condominium" />
          <Select
            label="Status"
            value={form.status}
            onChange={set("status")}
            options={[
              { value: "ongoing", label: "Ongoing" },
              { value: "closed", label: "Closed / Completed" },
            ]}
          />
          <Field label="Units" value={form.units} onChange={set("units")} placeholder="e.g. 84 Units" />
          <Field label="Floors / Storied" value={form.floors} onChange={set("floors")} placeholder="e.g. Ground + 6 (7 storied)" />
          <Field label="Apartment Size / Area" value={form.area} onChange={set("area")} placeholder="e.g. 1250 & 2500 sft" />
          <Field label="Facing" value={form.facing} onChange={set("facing")} placeholder="e.g. North Facing" />
          <Field label="Car Parking" value={form.parking} onChange={set("parking")} placeholder="e.g. 11 Nos" />
          <Field label="Handover Date" value={form.handover} onChange={set("handover")} placeholder="e.g. June 2026" />
          <Field label="Brochure Link (PDF)" value={form.brochure} onChange={set("brochure")} placeholder="https://… (optional)" />
          <Field label="Google Map Latitude" value={form.map_lat} onChange={set("map_lat")} placeholder="e.g. 23.7448 (optional)" />
          <Field label="Google Map Longitude" value={form.map_lng} onChange={set("map_lng")} placeholder="e.g. 90.3757 (optional)" />
        </div>
        <ImageUploader label="Cover Image" value={form.image} onChange={set("image")} aspect="video" />
        <TextArea label="Description" value={form.description} onChange={set("description")} placeholder="Short description shown on cards…" rows={3} />
        <GalleryEditor label="Gallery (additional photos)" values={form.gallery as string[]} onChange={setGallery} />
        <StringListEditor label="Features / Amenities" values={form.features as string[]} onChange={setFeatures} placeholder="e.g. Rooftop Garden" />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <FormActions onCancel={onClose} loading={saving} submitLabel={project ? "Save Changes" : "Create Project"} />
      </form>
    </Modal>
  );
}

export function ProjectsSection({
  items,
  refresh,
  notify,
}: {
  items: Project[];
  refresh: () => void;
  notify: (msg: string, tone?: "success" | "error") => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [deletingState, setDeletingState] = useState(false);

  const doDelete = async () => {
    if (!deleting) return;
    setDeletingState(true);
    try {
      await api(`/api/projects/${deleting.id}`, { method: "DELETE" });
      notify("Project deleted");
      setDeleting(null);
      refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingState(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Projects & Portfolio</h2>
          <p className="text-sm text-slate-500 mt-0.5">{items.length} project{items.length === 1 ? "" : "s"}</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-[#074853] hover:from-teal-500 hover:to-[#0d6e7e] text-white text-sm font-semibold shadow-lg shadow-teal-900/40 transition-all active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5 hover:from-teal-500/40 hover:to-white/10 transition-all group">
            <div className="rounded-2xl bg-slate-900/95 overflow-hidden">
              <div className="relative aspect-video bg-slate-800">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={p.image.endsWith(".svg")} sizes="480px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">No image</div>
                )}
                <span className={`absolute top-3 left-3 ${p.status === "ongoing" ? "teal" : "slate"}`}>
                  <Pill tone={p.status === "ongoing" ? "teal" : "slate"}>
                    {p.status === "ongoing" ? "Ongoing" : "Closed"}
                  </Pill>
                </span>
              </div>
              <div className="px-5 py-4">
                <h3 className="text-base font-semibold text-white tracking-tight truncate">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-1 truncate">{p.location || "—"}</p>
                <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider truncate">{p.type}</p>
                {(p.units || p.floors) && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.units && <Pill tone="gold">{p.units}</Pill>}
                    {p.floors && <Pill>{p.floors}</Pill>}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800">
                  <IconButton
                    onClick={() => {
                      setEditing(p);
                      setModalOpen(true);
                    }}
                    label="Edit project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => setDeleting(p)} label="Delete project" danger>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 px-6 py-12 text-center text-slate-500 text-sm">
          No projects yet — add your first project.
        </div>
      )}

      {modalOpen && (
        <ProjectFormModal
          project={editing}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            notify(editing ? "Project updated" : "Project created");
            refresh();
          }}
        />
      )}

      {deleting && (
        <ConfirmDelete
          message={`Delete "${deleting.name}"? This cannot be undone.`}
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
          loading={deletingState}
        />
      )}
    </div>
  );
}

/* ----------------------------------------------------------- CLIENTS ---- */

function ClientFormModal({
  client,
  onClose,
  onSaved,
}: {
  client: Client | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(client?.name || "");
  const [logo, setLogo] = useState(client?.logo || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = JSON.stringify({ name, logo });
      if (client) {
        await api(`/api/clients/${client.id}`, { method: "PUT", body });
      } else {
        await api("/api/clients", { method: "POST", body });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={client ? "Edit Client" : "Add Client"} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Company Name" value={name} onChange={setName} required placeholder="e.g. Google" />
        <ImageUploader label="Company Logo" value={logo} onChange={setLogo} aspect="square" initialPlaceholder="Upload a logo image" />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <FormActions onCancel={onClose} loading={saving} submitLabel={client ? "Save Changes" : "Add Client"} />
      </form>
    </Modal>
  );
}

export function ClientsSection({
  items,
  refresh,
  notify,
}: {
  items: Client[];
  refresh: () => void;
  notify: (msg: string, tone?: "success" | "error") => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState<Client | null>(null);
  const [deletingState, setDeletingState] = useState(false);

  const doDelete = async () => {
    if (!deleting) return;
    setDeletingState(true);
    try {
      await api(`/api/clients/${deleting.id}`, { method: "DELETE" });
      notify("Client removed");
      setDeleting(null);
      refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingState(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Our Clients</h2>
          <p className="text-sm text-slate-500 mt-0.5">{items.length} client{items.length === 1 ? "" : "s"} — shown on the website</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-[#074853] hover:from-teal-500 hover:to-[#0d6e7e] text-white text-sm font-semibold shadow-lg shadow-teal-900/40 transition-all active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((c) => (
          <div key={c.id} className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5 hover:from-amber-500/40 hover:to-white/10 transition-all group">
            <div className="rounded-2xl bg-slate-900/95 px-4 py-5 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center mb-3">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <span className="text-2xl font-bold text-teal-400">
                    {c.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-white truncate w-full">{c.name}</p>
              <div className="flex items-center gap-2 mt-3">
                <IconButton
                  onClick={() => {
                    setEditing(c);
                    setModalOpen(true);
                  }}
                  label="Edit client"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </IconButton>
                <IconButton onClick={() => setDeleting(c)} label="Delete client" danger>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 px-6 py-12 text-center text-slate-500 text-sm">
          No clients yet — add your first client.
        </div>
      )}

      {modalOpen && (
        <ClientFormModal
          client={editing}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            notify(editing ? "Client updated" : "Client added");
            refresh();
          }}
        />
      )}

      {deleting && (
        <ConfirmDelete
          message={`Remove ${deleting.name} from Clients?`}
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
          loading={deletingState}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------- TESTIMONIALS ---- */

function TestimonialFormModal({
  testimonial,
  onClose,
  onSaved,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(
    testimonial ?? { name: "", role: "", company: "", comment: "", avatar: "" }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = JSON.stringify(form);
      if (testimonial) {
        await api(`/api/testimonials/${testimonial.id}`, { method: "PUT", body });
      } else {
        await api("/api/testimonials", { method: "POST", body });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={testimonial ? "Edit Testimonial" : "Add Testimonial"} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name" value={form.name} onChange={set("name")} required placeholder="e.g. Ayesha Siddiqua" />
          <Field label="Role" value={form.role} onChange={set("role")} placeholder="e.g. Head of Operations" />
          <Field label="Company" value={form.company} onChange={set("company")} placeholder="e.g. Bayview Holdings" />
          <ImageUploader label="Avatar" value={form.avatar} onChange={set("avatar")} aspect="square" initialPlaceholder="Upload a portrait" />
          <div className="col-span-2">
            <TextArea label="Comment" value={form.comment} onChange={set("comment")} placeholder="What did they say?" rows={4} />
          </div>
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <FormActions onCancel={onClose} loading={saving} submitLabel={testimonial ? "Save Changes" : "Add Testimonial"} />
      </form>
    </Modal>
  );
}

export function TestimonialsSection({
  items,
  refresh,
  notify,
}: {
  items: Testimonial[];
  refresh: () => void;
  notify: (msg: string, tone?: "success" | "error") => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<Testimonial | null>(null);
  const [deletingState, setDeletingState] = useState(false);

  const doDelete = async () => {
    if (!deleting) return;
    setDeletingState(true);
    try {
      await api(`/api/testimonials/${deleting.id}`, { method: "DELETE" });
      notify("Testimonial deleted");
      setDeleting(null);
      refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingState(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Testimonials</h2>
          <p className="text-sm text-slate-500 mt-0.5">{items.length} testimonial{items.length === 1 ? "" : "s"} — shown on the website</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-[#074853] hover:from-teal-500 hover:to-[#0d6e7e] text-white text-sm font-semibold shadow-lg shadow-teal-900/40 transition-all active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5 hover:from-violet-500/40 hover:to-white/10 transition-all">
            <div className="rounded-2xl bg-slate-900/95 p-5 flex flex-col">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 shrink-0 ring-2 ring-teal-500/30">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-teal-400 font-bold">
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white truncate">{t.name || "—"}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {[t.role, t.company].filter(Boolean).join(" · ") || "—"}
                  </p>
                  <p className="text-[11px] text-amber-400 mt-1">&ldquo;&ldquo; &hellip; &rdquo;&rdquo;</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <IconButton
                    onClick={() => {
                      setEditing(t);
                      setModalOpen(true);
                    }}
                    label="Edit testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => setDeleting(t)} label="Delete testimonial" danger>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </IconButton>
                </div>
              </div>
              <blockquote className="mt-4 text-sm text-slate-400 leading-relaxed line-clamp-3">
                &ldquo;{t.comment}&rdquo;
              </blockquote>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 px-6 py-12 text-center text-slate-500 text-sm">
          No testimonials yet — add your first testimonial.
        </div>
      )}

      {modalOpen && (
        <TestimonialFormModal
          testimonial={editing}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            notify(editing ? "Testimonial updated" : "Testimonial added");
            refresh();
          }}
        />
      )}

      {deleting && (
        <ConfirmDelete
          message={`Delete the testimonial from ${deleting.name || "this person"}?`}
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
          loading={deletingState}
        />
      )}
    </div>
  );
}

/* ----------------------------------------------------------- NEWS -------- */

function NewsFormModal({
  item,
  onClose,
  onSaved,
}: {
  item: News | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(
    item ?? { title: "", category: "news" as const, date: "", excerpt: "", body: "", image: "" }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = JSON.stringify(form);
      if (item) {
        await api(`/api/news/${item.id}`, { method: "PUT", body });
      } else {
        await api("/api/news", { method: "POST", body });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={item ? "Edit News / Event" : "Add News / Event"} onClose={onClose} wide>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Title" value={form.title} onChange={set("title")} required placeholder="e.g. Ainora Residences Reaches Structural Completion" />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Type"
              value={form.category}
              onChange={set("category")}
              options={[
                { value: "news", label: "News" },
                { value: "event", label: "Event" },
              ]}
            />
            <Field label="Date" type="date" value={form.date} onChange={set("date")} />
          </div>
        </div>
        <ImageUploader label="Cover Image" value={form.image} onChange={set("image")} aspect="video" />
        <TextArea label="Excerpt (shown on cards)" value={form.excerpt} onChange={set("excerpt")} placeholder="Short summary…" rows={2} />
        <TextArea label="Full Story" value={form.body} onChange={set("body")} placeholder="Write the full announcement. Separate paragraphs with a blank line." rows={7} />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <FormActions onCancel={onClose} loading={saving} submitLabel={item ? "Save Changes" : "Add News / Event"} />
      </form>
    </Modal>
  );
}

export function NewsSection({
  items,
  refresh,
  notify,
}: {
  items: News[];
  refresh: () => void;
  notify: (msg: string, tone?: "success" | "error") => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<News | null>(null);
  const [deleting, setDeleting] = useState<News | null>(null);
  const [deletingState, setDeletingState] = useState(false);

  const doDelete = async () => {
    if (!deleting) return;
    setDeletingState(true);
    try {
      await api(`/api/news/${deleting.id}`, { method: "DELETE" });
      notify("News item deleted");
      setDeleting(null);
      refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingState(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">News &amp; Events</h2>
          <p className="text-sm text-slate-500 mt-0.5">{items.length} item{items.length === 1 ? "" : "s"} — shown on the website</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-[#074853] hover:from-teal-500 hover:to-[#0d6e7e] text-white text-sm font-semibold shadow-lg shadow-teal-900/40 transition-all active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add News / Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((n) => (
          <div key={n.id} className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5 hover:from-sky-500/40 hover:to-white/10 transition-all group">
            <div className="rounded-2xl bg-slate-900/95 overflow-hidden flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-44 shrink-0 aspect-video sm:aspect-auto bg-slate-800">
                {n.image ? (
                  <Image src={n.image} alt={n.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={n.image.endsWith(".svg")} sizes="240px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">No image</div>
                )}
                <span className={`absolute top-2.5 left-2.5`}>
                  <Pill tone={n.category === "event" ? "gold" : "teal"}>
                    {n.category === "event" ? "Event" : "News"}
                  </Pill>
                </span>
              </div>
              <div className="flex-1 px-5 py-4 flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight line-clamp-2 leading-snug">{n.title || "(untitled)"}</h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-mono uppercase tracking-wider">{n.date || "—"}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{n.excerpt}</p>
                <div className="flex items-center gap-2 mt-auto pt-3">
                  <IconButton
                    onClick={() => {
                      setEditing(n);
                      setModalOpen(true);
                    }}
                    label="Edit news item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => setDeleting(n)} label="Delete news item" danger>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 px-6 py-12 text-center text-slate-500 text-sm">
          No news or events yet — add your first item.
        </div>
      )}

      {modalOpen && (
        <NewsFormModal
          item={editing}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            notify(editing ? "News item updated" : "News item added");
            refresh();
          }}
        />
      )}

      {deleting && (
        <ConfirmDelete
          message={`Delete "${deleting.title || "this item"}"? This cannot be undone.`}
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
          loading={deletingState}
        />
      )}
    </div>
  );
}

/* --------------------------------------------------- LANDOWNER REVIEWS ---- */

function LandownerReviewFormModal({
  item,
  onClose,
  onSaved,
}: {
  item: LandownerReview | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(
    item ?? { name: "", role: "", company: "", comment: "", avatar: "" }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = JSON.stringify(form);
      if (item) {
        await api(`/api/landowner-reviews/${item.id}`, { method: "PUT", body });
      } else {
        await api("/api/landowner-reviews", { method: "POST", body });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={item ? "Edit Landowner Review" : "Add Landowner Review"} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name" value={form.name} onChange={set("name")} required placeholder="e.g. Mohammad Shafiqur Rahman" />
          <Field label="Role" value={form.role} onChange={set("role")} placeholder="e.g. Landowner" />
          <Field label="Company / Location" value={form.company} onChange={set("company")} placeholder="e.g. Dhanmondi, Dhaka" />
          <ImageUploader label="Avatar" value={form.avatar} onChange={set("avatar")} aspect="square" initialPlaceholder="Upload a portrait" />
          <div className="col-span-2">
            <TextArea label="Comment" value={form.comment} onChange={set("comment")} placeholder="What did they say?" rows={4} />
          </div>
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <FormActions onCancel={onClose} loading={saving} submitLabel={item ? "Save Changes" : "Add Review"} />
      </form>
    </Modal>
  );
}

export function LandownerReviewsSection({
  items,
  refresh,
  notify,
}: {
  items: LandownerReview[];
  refresh: () => void;
  notify: (msg: string, tone?: "success" | "error") => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<LandownerReview | null>(null);
  const [deleting, setDeleting] = useState<LandownerReview | null>(null);
  const [deletingState, setDeletingState] = useState(false);

  const doDelete = async () => {
    if (!deleting) return;
    setDeletingState(true);
    try {
      await api(`/api/landowner-reviews/${deleting.id}`, { method: "DELETE" });
      notify("Review deleted");
      setDeleting(null);
      refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingState(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Landowner Reviews</h2>
          <p className="text-sm text-slate-500 mt-0.5">{items.length} review{items.length === 1 ? "" : "s"} — shown on the landowner page</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-[#074853] hover:from-teal-500 hover:to-[#0d6e7e] text-white text-sm font-semibold shadow-lg shadow-teal-900/40 transition-all active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((r) => (
          <div key={r.id} className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5 hover:from-amber-500/40 hover:to-white/10 transition-all">
            <div className="rounded-2xl bg-slate-900/95 p-5 flex flex-col">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 shrink-0 ring-2 ring-teal-500/30">
                  {r.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-teal-400 font-bold">
                      {r.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white truncate">{r.name || "—"}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {[r.role, r.company].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <IconButton
                    onClick={() => {
                      setEditing(r);
                      setModalOpen(true);
                    }}
                    label="Edit review"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => setDeleting(r)} label="Delete review" danger>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </IconButton>
                </div>
              </div>
              <blockquote className="mt-4 text-sm text-slate-400 leading-relaxed line-clamp-3">
                &ldquo;{r.comment}&rdquo;
              </blockquote>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 px-6 py-12 text-center text-slate-500 text-sm">
          No reviews yet — add your first landowner review.
        </div>
      )}

      {modalOpen && (
        <LandownerReviewFormModal
          item={editing}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            notify(editing ? "Review updated" : "Review added");
            refresh();
          }}
        />
      )}

      {deleting && (
        <ConfirmDelete
          message={`Delete the review from ${deleting.name || "this person"}?`}
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
          loading={deletingState}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------ GALLERY ---- */

function GalleryFormModal({
  item,
  onClose,
  onSaved,
}: {
  item: Gallery | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(
    item ?? { title: "", category: "handover", image: "" }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = JSON.stringify(form);
      if (item) {
        await api(`/api/gallery/${item.id}`, { method: "PUT", body });
      } else {
        await api("/api/gallery", { method: "POST", body });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={item ? "Edit Gallery Photo" : "Add Gallery Photo"} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Select
          label="Category"
          value={form.category}
          onChange={set("category")}
          options={GALLERY_CATEGORIES}
        />
        <Field label="Title" value={form.title} onChange={set("title")} required placeholder="e.g. Aurora Signature Villa Possession Ceremony" />
        <ImageUploader label="Photo" value={form.image} onChange={set("image")} aspect="video" initialPlaceholder="Upload the gallery photo" />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <FormActions onCancel={onClose} loading={saving} submitLabel={item ? "Save Changes" : "Add Photo"} />
      </form>
    </Modal>
  );
}

export function GallerySection({
  items,
  refresh,
  notify,
}: {
  items: Gallery[];
  refresh: () => void;
  notify: (msg: string, tone?: "success" | "error") => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Gallery | null>(null);
  const [deleting, setDeleting] = useState<Gallery | null>(null);
  const [deletingState, setDeletingState] = useState(false);

  const catLabel = (v: string) => GALLERY_CATEGORIES.find((c) => c.value === v)?.label || v;

  const doDelete = async () => {
    if (!deleting) return;
    setDeletingState(true);
    try {
      await api(`/api/gallery/${deleting.id}`, { method: "DELETE" });
      notify("Photo removed");
      setDeleting(null);
      refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingState(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Gallery</h2>
          <p className="text-sm text-slate-500 mt-0.5">{items.length} photo{items.length === 1 ? "" : "s"} — shown on the gallery page</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-[#074853] hover:from-teal-500 hover:to-[#0d6e7e] text-white text-sm font-semibold shadow-lg shadow-teal-900/40 transition-all active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Photo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((g) => (
          <div key={g.id} className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5 hover:from-amber-500/40 hover:to-white/10 transition-all group">
            <div className="rounded-2xl bg-slate-900/95 overflow-hidden">
              <div className="relative aspect-[4/3] bg-slate-800">
                {g.image ? (
                  <Image src={g.image} alt={g.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={g.image.endsWith(".svg")} sizes="300px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">No image</div>
                )}
                <span className="absolute top-2.5 left-2.5">
                  <Pill tone="gold">{catLabel(g.category)}</Pill>
                </span>
                <div className="absolute top-2.5 right-2.5 flex gap-2">
                  <IconButton
                    onClick={() => {
                      setEditing(g);
                      setModalOpen(true);
                    }}
                    label="Edit photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => setDeleting(g)} label="Delete photo" danger>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </IconButton>
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-white tracking-tight line-clamp-2 leading-snug">{g.title || "(untitled)"}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 px-6 py-12 text-center text-slate-500 text-sm">
          No photos yet — add your first gallery image.
        </div>
      )}

      {modalOpen && (
        <GalleryFormModal
          item={editing}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            notify(editing ? "Photo updated" : "Photo added");
            refresh();
          }}
        />
      )}

      {deleting && (
        <ConfirmDelete
          message={`Delete "${deleting.title || "this photo"}"? This cannot be undone.`}
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
          loading={deletingState}
        />
      )}
    </div>
  );
}

/* ----------------------------------------------------------- MESSAGES ---- */

export function MessagesSection({
  items,
  refresh,
  notify,
}: {
  items: Message[];
  refresh: () => void;
  notify: (msg: string, tone?: "success" | "error") => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<Message | null>(null);
  const [deletingState, setDeletingState] = useState(false);

  const toggleRead = async (m: Message) => {
    try {
      await api(`/api/messages/${m.id}`, {
        method: "PATCH",
        body: JSON.stringify({ is_read: m.is_read ? 0 : 1 }),
      });
      refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Update failed", "error");
    }
  };

  const doDelete = async () => {
    if (!deleting) return;
    setDeletingState(true);
    try {
      await api(`/api/messages/${deleting.id}`, { method: "DELETE" });
      notify("Message deleted");
      setDeleting(null);
      refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingState(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Inbox</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {items.length} message{items.length === 1 ? "" : "s"} · {items.filter((m) => !m.is_read).length} unread
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {items.slice().sort((a, b) => Number(a.is_read) - Number(b.is_read)).map((m) => (
          <div
            key={m.id}
            className={`rounded-2xl border transition-colors ${
              m.is_read ? "bg-slate-900/60 border-slate-800" : "bg-slate-900 border-teal-500/30"
            }`}
          >
            <button
              onClick={() => setExpanded(expanded === m.id ? null : m.id)}
              className="w-full px-5 py-4 flex items-start gap-3 text-left"
            >
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${m.is_read ? "bg-slate-600" : "bg-teal-400 shadow-[0_0_10px_#2dd4bf]"}`} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="text-sm font-semibold text-white truncate">{m.subject || "(no subject)"}</p>
                  <span className="text-[11px] text-slate-500 shrink-0">{formatDate(m.created_at)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {m.name} <span className="text-slate-600">·</span> {m.email || m.phone || "no contact"}
                </p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-slate-500 transition-transform ${expanded === m.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expanded === m.id && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-800/70">
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap mt-4">{m.message}</p>
                <div className="flex flex-wrap items-center gap-2 mt-5">
                  <button
                    onClick={() => toggleRead(m)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors border ${
                      m.is_read
                        ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                        : "bg-teal-600/20 border-teal-500/40 text-teal-300 hover:bg-teal-600/30"
                    }`}
                  >
                    {m.is_read ? "Mark as unread" : "Mark as read"}
                  </button>
                  <button
                    onClick={() => setDeleting(m)}
                    className="px-4 py-2 rounded-lg text-xs font-medium bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  >
                    Delete message
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 px-6 py-12 text-center text-slate-500 text-sm">
          Inbox is empty. Messages from the contact form will appear here.
        </div>
      )}

      {deleting && (
        <ConfirmDelete
          message={`Delete the message from ${deleting.name}?`}
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
          loading={deletingState}
        />
      )}
    </div>
  );
}

/* ----------------------------------------------------------- SETTINGS ---- */

export function SettingsSection({
  notify,
}: {
  notify: (msg: string, tone?: "success" | "error") => void;
}) {
  const [showClientsSection, setShowClientsSection] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    api<{ showClientsSection: boolean }>("/api/settings")
      .then((s) => {
        if (mounted) setShowClientsSection(Boolean(s.showClientsSection));
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const save = async (value: boolean) => {
    setSaving(true);
    try {
      await api("/api/settings", {
        method: "PUT",
        body: JSON.stringify({ showClientsSection: value }),
      });
      setShowClientsSection(value);
      notify(value ? "Clients section shown on the home page" : "Clients section hidden on the home page");
    } catch (err) {
      notify(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Website Settings</h2>
        <p className="text-sm text-slate-500 mt-0.5">Control what appears on the public website</p>
      </div>

      <div className="rounded-2xl p-[1px] bg-gradient-to-br from-white/15 to-white/5">
        <div className="rounded-2xl bg-slate-900/95 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">Our Clients Section</h3>
              <p className="text-xs text-slate-500 mt-1">
                Show the &ldquo;Our Clients&rdquo; logo section on the home page. When turned off,
                the section is hidden (testimonials are unaffected).
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showClientsSection}
              disabled={loading || saving}
              onClick={() => save(!showClientsSection)}
              className={`relative w-12 h-7 rounded-full shrink-0 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-60 ${
                showClientsSection ? "bg-teal-600" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all duration-300 ${
                  showClientsSection ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Current status:{" "}
            <span className={showClientsSection ? "text-teal-400 font-medium" : "text-rose-400 font-medium"}>
              {loading ? "Loading…" : showClientsSection ? "Visible" : "Hidden"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}