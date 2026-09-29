import ContactInfoSlider from "@/components/ContactInfoSlider";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GoogleMapSection from "@/components/GoogleMapSection";
import Navbar from "@/components/Navbar";
import SmartImage from "@/components/SmartImage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export const revalidate = 60;

const GOLD_TEXT =
  "linear-gradient(95deg, #fde68a 0%, #f59e0b 22%, #fef3c7 42%, #fbbf24 58%, #d97706 82%, #fbbf24 100%)";

const HERO_WORDS: { text: string; delay: number }[] = [
  { text: "Contact", delay: 200 },
  { text: "Us", delay: 380 },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />

      {/* ===================== HERO ===================== */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/interior-49.webp"
            alt="Contact Mahatab Properties"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 h-full flex flex-col justify-center pt-24 sm:pt-28">
          <h1 className="flex flex-col items-start [transform:scaleY(1.06)] origin-left">
            {HERO_WORDS.map((word, i) => (
              <span
                key={word.text}
                className="animate-golden-hero leading-[1.02] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] overflow-visible"
                style={{ animationDelay: `${word.delay}ms` }}
              >
                <span
                  className="text-transparent bg-clip-text animate-golden-text-shimmer golden-stroke font-extrabold tracking-tight pb-[0.1em] -mb-[0.1em] inline-block"
                  style={{
                    backgroundImage: GOLD_TEXT,
                    backgroundSize: "220% auto",
                    filter:
                      "drop-shadow(0 2px 0 rgba(120,53,15,0.35)) drop-shadow(0 0 30px rgba(245,158,11,0.35))",
                  }}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-golden-hero mt-7 max-w-2xl text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed drop-shadow-md"
            style={{ animationDelay: "760ms" }}
          >
            Reach out to our team for project inquiries, partnership opportunities,
            or any assistance regarding your dream home.
          </p>
        </div>
      </section>

      {/* ===================== INFO CARDS (slider) ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-14 py-16 md:py-20">
          <ContactInfoSlider />
        </div>
      </section>

      {/* ===================== CONTACT FORM (same as home) ===================== */}
      <ContactSection />

      {/* ===================== GOOGLE MAP LOCATION ===================== */}
      <GoogleMapSection />

      <Footer />
    </div>
  );
}