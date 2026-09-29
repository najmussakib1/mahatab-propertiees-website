"use client";

import Link from "next/link";

const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=24.0152943,89.279165&z=16&output=embed";
const MAPS_LINK = "https://maps.app.goo.gl/reNX5BYbFZb31HXAA";

const ADDRESS = "MPL Head Office, Farida Tower, Rajapur, Pabna.";

export default function GoogleMapSection() {
  return (
    <section id="location" className="relative w-full bg-[#e9dcc6] border-t border-amber-950/10 select-none">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-14 pt-16 pb-16">
        <div className="mb-3 flex flex-col items-start">
          <span className="text-3xl sm:text-4xl font-light tracking-[0.18em] text-teal-700 uppercase [transform:scaleY(1.12)] origin-left">
            Our Location
          </span>
          <div
            className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]"
            style={{
              background:
                "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)",
              backgroundSize: "200% 200%",
            }}
          />
        </div>

        <p className="mt-4 text-sm sm:text-base text-slate-700/80 font-light leading-relaxed max-w-2xl">
          Welcome to the home of Mahatab Properties Ltd. Our head office awaits
          you at {ADDRESS} — walk in to meet our team, explore our latest
          projects, and take the first step toward your dream home.
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-700/80 font-light leading-relaxed max-w-2xl mb-8">
          Use the map below to find your way, or press the button underneath to
          get turn-by-turn directions in Google Maps.
        </p>

        <div className="w-full overflow-hidden rounded-3xl border border-amber-950/15 shadow-2xl shadow-amber-950/20">
          <iframe
            src={MAPS_EMBED_URL}
            title="Mahatab Properties Ltd — Map Location"
            width="100%"
            height="480"
            style={{ border: 0, filter: "saturate(0.9)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-[#3b2605] tracking-wide transition-all duration-300 group overflow-hidden shadow-xl shadow-amber-600/30 hover:shadow-amber-500/40 active:scale-95 border border-amber-200/60"
            style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#3b2605] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="relative z-10 text-sm md:text-base">Get Directions</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-[#3b2605] transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}