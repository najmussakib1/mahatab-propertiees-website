"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";

const INTRODUCTION =
  "Welcome to Mahatab Properties Ltd. (MPL). My life\u2019s philosophy has always been anchored in a simple but profound truth: \u201cHumans are for humanity\u201d. From my early days in student leadership at Edward College to my tenure as Chairman of Pabna Sadar Upazila, my foremost commitment has been the socio-economic and educational upliftment of our communities.";

const BODY_FIRST =
  "Whether establishing Pabna College, Haji Jasim Uddin Degree College, or initiating extensive rural infrastructure projects, my goal has always been to build strong foundations for a brighter future.";

const BODY_SECOND =
  "While our foundational enterprise has long been dedicated to expansive land developments, we established Mahatab Properties Ltd. (MPL) as a specialized sister concern with a distinct focus: pioneering state-of-the-art multi-storied building developments. We recognize that as our communities grow, the need for sustainable, modern, and high-quality vertical infrastructure becomes paramount. MPL is driven by this very vision \u2014 to elevate urban living standards while maintaining the unyielding integrity and trust we have cultivated over the decades.";

const CLOSING =
  "We invite you to be a part of our journey as we continue to shape the skyline and build a prosperous tomorrow.";

export default function ManagingDirectorMessage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id="director-message" className="w-full mt-10 pt-10 border-t border-amber-950/10 select-none scroll-mt-28">
      {/* Title */}
      <div className="mb-2 flex flex-col items-start select-none">
        <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
          leadership &amp; vision
        </span>
        <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />
      </div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left">
        Message from the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
          Managing Director
        </span>
      </h3>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Portrait */}
        <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-8">
          <div className="relative w-full max-w-[320px] rounded-3xl overflow-hidden glass-nav-light p-2 shadow-2xl border border-white/70">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <SmartImage
                src="/managing-director.webp"
                alt="Mahatab Uddin Biswas, Managing Director, Mahatab Properties Ltd."
                sizes="(max-width: 768px) 320px, 380px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xl sm:text-2xl font-medium tracking-wide text-slate-900">
              Mahatab Uddin Biswas
            </p>
            <p className="mt-1 text-sm text-slate-600 font-light tracking-wider">
              Managing Director
              <br />
              Mahatab Properties Ltd. (MPL)
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="lg:col-span-8">
          <div className="relative rounded-3xl glass-nav-light border border-white/70 shadow-xl p-6 sm:p-8 md:p-10">
            <div
              className={`relative overflow-hidden transition-all duration-700 ease-out ${
                expanded ? "max-h-none" : "max-h-[230px]"
              }`}
            >
              <p className="text-slate-700/90 font-light leading-relaxed text-base sm:text-lg">
                {INTRODUCTION} {BODY_FIRST}
              </p>
              <p className="mt-4 text-slate-700/90 font-light leading-relaxed text-base sm:text-lg">
                {BODY_SECOND}
              </p>
              <p className="mt-4 text-slate-700/90 font-light leading-relaxed text-base sm:text-lg">
                {CLOSING}
              </p>

              {/* Fade-out gradient when collapsed */}
              <div
                className={`pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f7f2e9] to-transparent transition-opacity duration-700 ${
                  expanded ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>

            {/* Read More / Read Less toggle */}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-teal-700 hover:text-teal-900 transition-colors duration-300"
            >
              <span>{expanded ? "Read Less" : "Read More"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : "group-hover:translate-y-0.5"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}