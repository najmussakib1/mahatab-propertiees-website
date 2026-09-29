"use client";

import { useEffect, useState } from "react";

const PHONE = "01301222211";
const WHATSAPP_URL = "https://wa.me/8801301222211";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mahatab Properties on WhatsApp"
      className={`group fixed bottom-6 right-6 z-50 flex items-center transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* WhatsApp pill label that expands on hover */}
      <span className="pointer-events-none mr-3 hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full border border-white/70 bg-[#e9dcc6] px-0 py-2 text-sm font-medium text-slate-800 shadow-2xl transition-all duration-500 group-hover:max-w-[240px] group-hover:px-5 md:inline-block">
        WhatsApp
        <span className="ml-2 font-mono text-[12px] tracking-wider text-emerald-700">
          {PHONE}
        </span>
      </span>

      {/* Animated WhatsApp bubble */}
      <span className="relative flex h-16 w-16 items-center justify-center">
        {/* Expanding pulse rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-wa-ping" />
        <span
          className="absolute inset-0 rounded-full bg-emerald-400/30 animate-wa-ping"
          style={{ animationDelay: "0.6s" }}
        />
        {/* Glow under the bubble */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl transition-opacity duration-300 group-hover:bg-emerald-400/50" />
        {/* Core button */}
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-600/40 ring-2 ring-white/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-emerald-500/60 group-hover:rotate-6 active:scale-90">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>

        {/* Small "new message" dot */}
        <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-rose-500 ring-2 ring-white/80 shadow-md">
          <svg viewBox="0 0 24 24" className="h-3 w-3 mx-auto mt-0.5 text-white" fill="currentColor" aria-hidden="true">
            <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </span>
      </span>
    </a>
  );
}