export interface Project {
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
  gallery: string[] | string;
  features: string[] | string;
  map_lat: string;
  map_lng: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: number;
  created_at: string;
}

export interface News {
  id: number;
  title: string;
  category: "news" | "event";
  date: string;
  excerpt: string;
  body: string;
  image: string;
}

export interface LandownerReview {
  id: number;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar: string;
}

export interface Gallery {
  id: number;
  title: string;
  category: string;
  image: string;
}

export const GALLERY_CATEGORIES: { value: string; label: string }[] = [
  { value: "handover", label: "Handover" },
  { value: "mou", label: "MOU Signing" },
  { value: "service-work", label: "Service Work" },
  { value: "rehab-fair", label: "REHAB Fair" },
  { value: "picnic", label: "Picnic" },
];

export type Entity = Project | Client | Testimonial;

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  }
  return data as T;
}

export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error || "Upload failed");
  return (data as { url: string }).url;
}

export function formatDate(iso: string): string {
  const d = new Date(iso.includes("T") ? iso : iso.replace(" ", "T") + "Z");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}