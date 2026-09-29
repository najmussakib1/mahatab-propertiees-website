"use client";

import { useState } from "react";

const CATEGORIES = ["Residential", "Commercial", "Mixed Use", "Industrial", "Open Plot / Agricultural"];
const FACINGS = ["North Facing", "South Facing", "East Facing", "West Facing", "Corner Plot"];

const inputClass =
  "w-full bg-white/70 border border-amber-900/15 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-600/60 focus:ring-2 focus:ring-teal-600/15 transition-all text-sm";

const labelClass = "block text-[11px] uppercase tracking-widest text-teal-800 font-semibold mb-1.5";

interface FormRows {
  [key: string]: string;
}

export default function LandownerApplication({ isActive = true }: { isActive?: boolean }) {
  const [form, setForm] = useState<FormRows>({
    category: "Residential",
    facing: "North Facing",
    location: "",
    landSize: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Landowner Application — ${form.category} (${form.location || "Location TBD"})`,
          message: [
            `Category: ${form.category}`,
            `Facing: ${form.facing}`,
            `Location: ${form.location || "—"}`,
            `Land Size: ${form.landSize || "—"}`,
            "",
            form.message,
          ].join("\n"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit application");
      setSubmitted(true);
      setForm((f) => ({ ...f, location: "", landSize: "", name: "", phone: "", email: "", message: "" }));
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
    }
  };

  return (
    <div
      id="landowner-apply"
      className={`w-full transition-all duration-700 ease-out ${
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <form onSubmit={handleSubmit} className="rounded-3xl glass-nav-light border border-white/70 shadow-xl overflow-hidden">
        {/* Card header */}
        <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-[#0d6e7e] to-[#074853] flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg tracking-tight">Landowner Application</h3>
          <span className="text-[11px] uppercase tracking-widest text-teal-200/80 font-medium">Confidential</span>
        </div>

        <div className="px-6 sm:px-8 py-7 flex flex-col gap-7">
          {/* SECTION 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 text-[#3b2605] text-sm font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="text-sm font-semibold text-slate-900 leading-none">Land&rsquo;s Information</p>
                <p className="text-[11px] text-slate-500 mt-1">Tell us about the property you own</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className={labelClass}>Land Category</span>
                <select value={form.category} onChange={(e) => set("category")(e.target.value)} className={inputClass}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>Facing</span>
                <select value={form.facing} onChange={(e) => set("facing")(e.target.value)} className={inputClass}>
                  {FACINGS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>Location / Area</span>
                <input value={form.location} onChange={(e) => set("location")(e.target.value)} placeholder="e.g. Dhanmondi, Dhaka" className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Approx. Land Size</span>
                <input value={form.landSize} onChange={(e) => set("landSize")(e.target.value)} placeholder="e.g. 5 Katha" className={inputClass} />
              </label>
            </div>
          </div>

          {/* SECTION 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 text-[#3b2605] text-sm font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="text-sm font-semibold text-slate-900 leading-none">Owner&rsquo;s Information</p>
                <p className="text-[11px] text-slate-500 mt-1">How can our landowner team reach you?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className={labelClass}>Full Name *</span>
                <input value={form.name} onChange={(e) => set("name")(e.target.value)} required placeholder="Your full name" className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Phone Number *</span>
                <input value={form.phone} onChange={(e) => set("phone")(e.target.value)} type="tel" required placeholder="+880 1XXX-XXXXXX" className={inputClass} />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>Email Address</span>
                <input value={form.email} onChange={(e) => set("email")(e.target.value)} type="email" placeholder="you@example.com" className={inputClass} />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>Additional Details</span>
                <textarea value={form.message} onChange={(e) => set("message")(e.target.value)} rows={3} placeholder="Share any expectations, documents you have, or questions for our team…" className={`${inputClass} resize-none`} />
              </label>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-600 bg-rose-500/10 border border-rose-400/20 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-[11px] text-slate-500 font-light max-w-sm">
              Our landowner specialists will contact you within 2 working days. All information shared remains strictly confidential.
            </p>
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap text-[#3b2605] tracking-wide transition-all duration-300 group overflow-hidden shadow-lg shadow-amber-500/40 hover:shadow-amber-300/40 active:scale-95 border border-amber-200/50"
              style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}
            >
              <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-700 ease-out group-hover:left-[100%]" />
              <span className="relative z-10">
                {submitted ? "Submitted ✓" : "Submit Application"}
              </span>
              <span className="relative z-10 w-5 h-5 rounded-full bg-black/15 flex items-center justify-center transition-all duration-300 group-hover:bg-black/25 group-hover:translate-x-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#3b2605]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}