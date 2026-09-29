"use client";

import SmartImage from "./SmartImage";

interface BoardMember {
  sl: number;
  name: string;
  position: string;
  photo: string;
}

const ADDRESS_LINE = "Biswas Bhaban, Ataikula Road, Salgaria, Pabna";

const BOARD: BoardMember[] = [
  {
    sl: 1,
    name: "MAHATAB UDDIN BISWAS",
    position: "Chairman",
    photo: "/managing-director.webp",
  },
  {
    sl: 2,
    name: "MD. MASUDUZZAMAN BISWAS",
    position: "Managing Director",
    photo: "/board-masuduzzaman.webp",
  },
  {
    sl: 3,
    name: "MD. ASADUZZAMAN BISWAS",
    position: "Director",
    photo: "/board-asaduzzaman.webp",
  },
  {
    sl: 4,
    name: "MRS. LOVELY YEASMIN",
    position: "Chairman",
    photo: "/board-lovely.webp",
  },
  {
    sl: 5,
    name: "MAHDI FAHMID BISWAS",
    position: "Director",
    photo: "/board-mahdi.webp",
  },
];

export default function DirectorialBoard() {
  return (
    <div
      id="directors"
      className="w-full mt-10 pt-10 border-t border-amber-950/10 select-none scroll-mt-28"
    >
      {/* Title */}
      <div className="mb-2 flex flex-col items-start select-none">
        <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
          board of directors
        </span>
        <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />
      </div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left">
        Directorial Board Info
      </h3>
      <p className="mt-3 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
        Registered Office: Biswas Bhaban, Ataikula Road, Salgaria, Pabna.
      </p>

      <div className="mt-8 rounded-3xl glass-nav-light border border-white/70 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] lg:min-w-0 border-collapse text-left">
            <thead>
              <tr className="bg-gradient-to-r from-teal-700 to-[#0d6e7e] text-white text-xs sm:text-sm uppercase tracking-wider">
                <th className="px-4 py-4 font-semibold whitespace-nowrap">No.</th>
                <th className="px-4 py-4 font-semibold whitespace-nowrap">Member</th>
                <th className="px-4 py-4 font-semibold whitespace-nowrap">Position</th>
              </tr>
            </thead>
            <tbody>
              {BOARD.map((m) => (
                <tr
                  key={m.sl}
                  className="border-t border-teal-900/10 transition-colors duration-300 hover:bg-white/70"
                >
                  {/* No. */}
                  <td className="px-4 py-4 align-top">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-600/10 text-teal-800 text-sm font-semibold">
                      {String(m.sl).padStart(2, "0")}
                    </span>
                  </td>

                  {/* Member photo + name */}
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-md border border-white/80 shrink-0">
                        <SmartImage
                          src={m.photo}
                          alt={m.name}
                          sizes="72px"
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-medium text-slate-900 leading-snug">
                        {m.name}
                      </span>
                    </div>
                  </td>

                  {/* Position */}
                  <td className="px-4 py-4 align-top">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-600/15 text-amber-800 border border-amber-600/25 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      {m.position}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}