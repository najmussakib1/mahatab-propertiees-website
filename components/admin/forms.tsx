"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { uploadImage } from "./api";

export function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${wide ? "max-w-3xl" : "max-w-xl"} rounded-3xl p-[1px] bg-gradient-to-br from-teal-500/50 via-white/10 to-amber-500/40 shadow-2xl my-8`}
        >
          <div className="rounded-3xl bg-slate-900 px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-500 outline-none focus:border-teal-500/70 focus:ring-2 focus:ring-teal-500/20 transition-all"
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-500 outline-none focus:border-teal-500/70 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none"
      />
    </label>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 outline-none focus:border-teal-500/70 focus:ring-2 focus:ring-teal-500/20 transition-all appearance-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ImageUploader({
  label,
  value,
  onChange,
  aspect = "video",
  initialPlaceholder,
  rounded = "rounded-xl",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  aspect?: "video" | "square" | "tall";
  initialPlaceholder?: string;
  rounded?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "tall" ? "aspect-[3/4]" : "aspect-video";

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">
        {label}
      </span>
      <div className={`relative ${aspectClass} ${rounded} overflow-hidden bg-slate-800/60 border border-slate-700`}>
        {value ? (
          <Image src={value} alt="preview" fill className="object-cover" unoptimized={value.endsWith(".svg")} sizes="400px" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-2 p-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
            </svg>
            <span className="text-xs">{uploading ? "Uploading…" : initialPlaceholder || "No image selected"}</span>
          </div>
        )}
        {uploading && <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></div>}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer transition-colors border border-slate-700">
          {uploading ? (
            <>
              <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload image
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-300 text-xs font-medium transition-colors border border-slate-700"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      {value && !value.startsWith("/") && <p className="mt-1.5 text-xs text-amber-400 break-all">External URL: {value}</p>}
    </div>
  );
}

export function FormActions({
  onCancel,
  loading,
  submitLabel,
}: {
  onCancel: () => void;
  loading: boolean;
  submitLabel: string;
}) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors border border-slate-700"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={loading}
        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-[#074853] hover:from-teal-500 hover:to-[#0d6e7e] text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        {submitLabel}
      </button>
    </div>
  );
}

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/** Editable list of free-text strings (e.g. project features). */
export function StringListEditor({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const set = (i: number, v: string) => onChange(values.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  return (
    <div>
      <span className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">{label}</span>
      <div className="flex flex-col gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={v}
              onChange={(e) => set(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-teal-500/70 focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove row"
              className="w-9 h-9 shrink-0 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-300 flex items-center justify-center transition-colors border border-slate-700"
            >
              <XIcon />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-medium transition-colors border border-slate-700 self-start"
        >
          <PlusIcon />
          Add row
        </button>
      </div>
    </div>
  );
}

/** Multi-image uploader grid (project gallery). */
export function GalleryEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [uploading, setUploading] = useState<number | null>(null);
  const set = (i: number, v: string) => onChange(values.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  const onFile = async (i: number, file: File | undefined) => {
    if (!file) return;
    setUploading(i);
    try {
      set(i, await uploadImage(file));
    } catch {
      // surface silently; cell keeps its placeholder
    } finally {
      setUploading(null);
    }
  };

  return (
    <div>
      <span className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-medium">{label}</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {values.map((v, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-slate-800/60 border border-slate-700">
            {v ? (
              <Image src={v} alt="" fill className="object-cover" unoptimized={v.endsWith(".svg")} sizes="240px" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
                </svg>
                <span className="text-[11px]">No image</span>
              </div>
            )}
            {uploading === i && (
              <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                onFile(i, e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove image"
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-950/70 hover:bg-rose-600/90 text-white flex items-center justify-center transition-colors"
            >
              <XIcon />
            </button>
          </div>
        ))}
        {values.length < 8 && (
          <button
            type="button"
            onClick={() => onChange([...values, ""])}
            className="aspect-square rounded-xl border-2 border-dashed border-slate-700 hover:border-teal-500/60 text-slate-500 hover:text-teal-400 flex flex-col items-center justify-center gap-1.5 transition-colors"
          >
            <PlusIcon />
            <span className="text-[11px]">Add image</span>
          </button>
        )}
      </div>
    </div>
  );
}

/** Normalize gallery/features fields coming back from the API (JSON string or array). */
export function parseStringArray(v: string | string[] | undefined | null): string[] {
  if (Array.isArray(v)) return v.length ? [...v] : [""];
  if (typeof v === "string" && v.trim()) {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed.length ? parsed : [""];
    } catch {
      return [v];
    }
  }
  return [""];
}