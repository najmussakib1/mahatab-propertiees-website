"use client";

import SmartImage from "./SmartImage";

const sections: { title: string; points: string[] }[] = [
  {
    title: "Early Life and Political Leadership",
    points: [
      "Born on December 31, 1949, in the village of Chartarapur, Pabna, to renowned philanthropists Late Alhaj Haji Jasim Uddin and Fazilatunnesa.",
      "Emerged as a prominent student leader, serving as the VP of Edward College Students' Union from 1967 to 1968, and acting as a key convener of the historic 11-point movement in 1968\u20131969.",
      "Endured imprisonment for his activism during early political movements, and bravely protected freedom fighters and citizens during the 1971 Liberation War.",
      "Served as the Chairman of Pabna Sadar Upazila, securing the position with the highest vote margin in the country at the time, and spearheaded massive infrastructural developments across 378 square kilometers.",
    ],
  },
  {
    title: "Champion of Education and Social Welfare",
    points: [
      "Dedicated to eradicating illiteracy, he founded numerous academic institutions including Pabna College in 1983, Haji Jasim Uddin Degree College in Dublia, and Fazilatunnesa Girls' High School.",
      "Played a pivotal role in the nationalization of Shahid Bulbul College and Pabna Women's College, while significantly contributing to the establishment of Pabna Medical College and Pabna Cadet College.",
      "Serves as the Chartered President of the Rotary Club of Pabna, continuously facilitating healthcare camps and aid for the underprivileged.",
    ],
  },
  {
    title: "Corporate Vision at MPL",
    points: [
      "Transitioned his robust organizational and philanthropic skills into the corporate sector by founding Mahatab Biswas Real Estate Ltd.",
      "Currently guiding Mahatab Properties Ltd. (MPL), he leverages decades of entrepreneurial experience to focus exclusively on modern multi-storied building developments.",
      "His leadership in vertical infrastructure complements his earlier ventures in expansive land development, large-scale agricultural and dairy farming, and the visionary 'Green City' housing project.",
    ],
  },
  {
    title: "Awards and Recognitions",
    points: [
      "Awarded the Victory Day Honor Award in 2017, the Kabi Omar Ali Memorial Award in 2017, and the Bangabir MAG Osmani Gold Medal in 2017.",
      "Recipient of the Sher-e-Bangla Gold Medal in 2017 and the Huseyn Shaheed Suhrawardy Gold Medal in 2017.",
      "Earned international accolades for his humanitarian efforts, including the Maitree Sammanana in India in 2017 and the Friendship Award in Nepal in 2018.",
    ],
  },
];

export default function ManagingDirectorProfile() {
  return (
    <div
      id="chairman-profile"
      className="w-full mt-10 pt-10 border-t border-amber-950/10 select-none scroll-mt-28"
    >
      {/* Title */}
      <div className="mb-2 flex flex-col items-start select-none">
        <span className="text-xs sm:text-sm uppercase font-semibold tracking-[0.2em] text-teal-600">
          our leadership
        </span>
        <div className="mt-1 h-[2.5px] rounded-full animate-auto-underline shadow-[0_0_10px_#2dd4bf]" />
      </div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight text-slate-900 [transform:scaleY(1.08)] origin-left">
        Profile of the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500">
          Managing Director
        </span>
      </h3>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Portrait */}
        <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-8">
          <div className="relative w-full max-w-[340px] rounded-3xl overflow-hidden glass-nav-light p-2 shadow-2xl border border-white/70">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <SmartImage
                src="/managing-director.webp"
                alt="Principal (Retd.) Alhaj Mahatab Uddin Biswas"
                sizes="(max-width: 768px) 340px, 400px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xl sm:text-2xl font-medium tracking-wide text-slate-900">
              Mahatab Uddin Biswas
            </p>
            <p className="mt-1 text-sm text-slate-600 font-light tracking-wider leading-relaxed">
              Principal (Retd.) · Managing Director
              <br />
              Mahatab Properties Ltd. (MPL)
            </p>
          </div>
        </div>

        {/* Profile */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl glass-nav-light border border-white/70 shadow-xl p-6 sm:p-8 md:p-10">
            <p className="text-slate-800 leading-relaxed text-base sm:text-lg font-light">
              Principal (Retd.) Alhaj Mahatab Uddin Biswas is a distinguished
              educationist, a visionary social worker, and the Managing Director of
              Mahatab Properties Ltd. A celebrated philanthropist and transformative
              civic leader, he has dedicated his career to a singular, unwavering
              philosophy:
            </p>

            <blockquote className="mt-6 border-l-4 border-teal-600 pl-5 py-2">
              <p className="text-lg sm:text-xl italic text-teal-800 font-medium">
                &ldquo;Humans are for humanity&rdquo;
              </p>
            </blockquote>

            <p className="mt-6 text-slate-700/90 leading-relaxed text-base sm:text-lg font-light">
              Long before stepping into the corporate sector, he forged an enduring
              legacy in public administration as a historically popular Upazila
              Chairman and a pioneer of regional education, founding landmark
              academic institutions such as Pabna College and Haji Jasim Uddin
              Degree College. Driven by the same visionary spirit that catalyzed
              widespread socio-economic development across his community, he
              successfully established Mahatab Biswas Real Estate Ltd. Recognizing
              the region&rsquo;s evolving need for modern vertical infrastructure,
              he now guides Mahatab Properties Ltd. (MPL) — merging decades of
              foundational public trust with a bold commitment to architectural
              excellence.
            </p>

            <div className="mt-8 flex flex-col gap-8">
              {sections.map((s) => (
                <div key={s.title}>
                  <h4 className="flex items-center gap-3 text-lg sm:text-xl font-medium text-teal-800">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-teal-500 to-[#0d6e7e] shadow-[0_0_8px_rgba(13,110,126,0.5)]" />
                    {s.title}
                  </h4>
                  <ul className="mt-4 flex flex-col gap-3">
                    {s.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-700/90 leading-relaxed font-light text-sm sm:text-base"
                      >
                        <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-teal-600/60 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}