import SmartImage from "./SmartImage";
import Link from "next/link";

export interface NewsCardItem {
  id: number;
  title: string;
  category: "news" | "event";
  date: string;
  excerpt: string;
  image: string;
}

const GOLD_TEXT =
  "linear-gradient(95deg, #fde68a 0%, #f59e0b 22%, #fef3c7 42%, #fbbf24 58%, #d97706 82%, #fbbf24 100%)";

export function formatNewsDate(isoDate: string): string {
  if (!isoDate) return "";
  const d = new Date(isoDate + (isoDate.length === 10 ? "T00:00:00" : ""));
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

export default function NewsCard({ item, index = 0 }: { item: NewsCardItem; index?: number }) {
  const isEvent = item.category === "event";

  return (
    <Link
      href={`/news/${item.id}`}
      className="block h-full group"
      aria-label={`Read: ${item.title}`}
    >
      <div
        className="rounded-3xl glass-nav-light border border-white/70 hover:border-teal-500/50 transition-all duration-300 flex flex-col h-full overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1.5"
        style={{ animationDelay: `${index * 120}ms` }}
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <SmartImage
            src={item.image || "/slide-1.webp"}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 32rem"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                isEvent
                  ? "bg-amber-500/30 text-amber-100 border border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                  : "bg-teal-500/30 text-teal-200 border border-teal-400/40 shadow-[0_0_12px_rgba(45,212,191,0.35)]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isEvent ? "bg-amber-300" : "bg-teal-400"}`} />
              {isEvent ? "Event" : "News"}
            </span>
          </div>

          {/* Date */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[11px] uppercase font-mono text-amber-200/90 tracking-wider">
              {formatNewsDate(item.date)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <h4 className="text-lg sm:text-xl font-light text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors leading-snug">
              {item.title}
            </h4>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed font-light line-clamp-3">
              {item.excerpt}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900/10 flex items-center justify-between text-xs">
            <span className="text-teal-700 font-mono">Read More</span>
            <div className="w-6 h-6 rounded-full bg-slate-900/5 flex items-center justify-center transition-all duration-300 group-hover:bg-teal-500/30 group-hover:translate-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { GOLD_TEXT };