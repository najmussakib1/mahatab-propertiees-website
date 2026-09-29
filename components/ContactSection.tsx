"use client";

import { useState } from "react";

interface FieldProps {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}

function Field({ placeholder, type = "text", value, onChange, textarea }: FieldProps) {
  const inputClass =
    "peer w-full bg-transparent border-b border-white/15 focus:border-teal-300 outline-none py-3 text-white placeholder:text-white/30 focus:placeholder:text-white/40 transition-colors duration-300 tracking-wide";
  return (
    <div className="group relative">
      {textarea ? (
        <textarea
          rows={4}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      <span className="absolute left-0 -bottom-px w-0 h-[1.5px] bg-gradient-to-r from-teal-300 via-teal-400 to-[#0d6e7e] group-focus-within:w-full transition-all duration-500" />
    </div>
  );
}

const MAIN_ROADS = [
  { d: "M -20 220 C 90 100 160 320 250 270 C 330 225 300 100 420 130 C 520 158 500 340 620 320", color: "#06121c" },
  { d: "M -20 630 C 90 520 170 690 260 650 C 360 605 330 500 450 530 C 530 553 560 680 620 670", color: "#94a3b8" },
  { d: "M 160 -20 C 130 90 230 150 200 280 C 170 410 80 460 120 590 C 150 690 230 740 200 820", color: "#06121c" },
  { d: "M 430 -20 C 390 100 480 180 450 320 C 420 460 520 540 470 670 C 440 750 480 810 460 820", color: "#64748b" },
  { d: "M -20 800 C 130 680 180 500 280 450 C 370 405 410 500 480 420 C 540 350 580 190 620 150", color: "#cbd5e1" },
  { d: "M -20 70 C 130 120 190 260 290 270 C 390 280 380 420 470 450 C 550 478 580 620 620 660", color: "#ffffff" },
  { d: "M 300 -20 C 380 30 290 170 330 300 C 370 430 480 390 460 530 C 444 640 370 720 420 820", color: "#06121c" },
];

const GOLD_ROADS = [
  { d: "M 30 -20 C 60 80 10 160 80 260 C 150 360 60 440 110 560 C 140 650 190 700 170 820", o: 0.6 },
  { d: "M -20 260 C 90 220 150 340 250 300 C 350 260 300 120 400 150 C 490 177 540 340 620 310", o: 0.7 },
  { d: "M 250 -20 C 310 100 240 220 310 330 C 380 440 300 560 370 680", o: 0.55 },
  { d: "M -20 100 C 110 160 90 300 190 340 C 290 380 340 250 440 290 C 520 325 560 240 620 270", o: 0.65 },
  { d: "M -20 440 C 100 500 160 380 240 440 C 330 510 410 420 490 470 C 560 515 590 580 620 570", o: 0.7 },
  { d: "M 500 -20 C 460 140 550 260 490 380 C 440 490 530 610 480 740", o: 0.6 },
  { d: "M -20 620 C 140 580 210 720 320 650 C 410 595 470 740 570 690 C 600 675 620 650 620 660", o: 0.65 },
  { d: "M 350 -20 C 390 100 320 200 370 290 C 420 400 540 340 560 460 C 580 560 560 680 600 820", o: 0.55 },
  { d: "M -20 380 C 100 360 150 470 250 440 C 350 410 430 520 530 490 C 575 476 600 450 620 450", o: 0.6 },
  { d: "M 130 820 C 170 690 230 740 270 620 C 310 500 390 620 430 500 C 470 380 520 500 570 430", o: 0.65 },
];

const DASH_ROADS = [
  { d: "M -20 220 C 90 100 160 320 250 270 C 330 225 300 100 420 130 C 520 158 500 340 620 320", color: "#94a3b8" },
  { d: "M -20 630 C 90 520 170 690 260 650 C 360 605 330 500 450 530 C 530 553 560 680 620 670", color: "#e2e8f0" },
  { d: "M 160 -20 C 130 90 230 150 200 280 C 170 410 80 460 120 590 C 150 690 230 740 200 820", color: "#94a3b8" },
  { d: "M 430 -20 C 390 100 480 180 450 320 C 420 460 520 540 470 670 C 440 750 480 810 460 820", color: "#cbd5e1" },
  { d: "M -20 800 C 130 680 180 500 280 450 C 370 405 410 500 480 420 C 540 350 580 190 620 150", color: "#f1f5f9" },
  { d: "M -20 70 C 130 120 190 260 290 270 C 390 280 380 420 470 450 C 550 478 580 620 620 660", color: "#ffffff" },
  { d: "M 300 -20 C 380 30 290 170 330 300 C 370 430 480 390 460 530 C 444 640 370 720 420 820", color: "#94a3b8" },
];

function MapArt() {
  return (
    <>
      <svg
        viewBox="0 0 600 800"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        {MAIN_ROADS.map((road, i) => (
          <g key={i}>
            <path
              d={road.d}
              stroke={road.color}
              strokeOpacity={road.color === "#ffffff" ? "0.08" : "0.13"}
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d={road.d}
              stroke={road.color}
              strokeOpacity={road.color === "#ffffff" ? "0.7" : "1"}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        ))}

        {GOLD_ROADS.map((road, i) => (
          <path
            key={i}
            d={road.d}
            stroke="#fbbf24"
            strokeWidth="1"
            strokeLinecap="round"
            strokeOpacity={road.o}
          />
        ))}

        <g className="ct-roads">
          {DASH_ROADS.map((road, i) => (
            <path
              key={i}
              d={road.d}
              stroke={road.color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity={road.color === "#ffffff" ? "0.3" : "0.5"}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>
      </svg>

      {/* Location pin */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
            <span className="absolute inset-0 rounded-full bg-white/25 ct-pin-ripple" />
            <span className="absolute inset-0 rounded-full bg-white/20 ct-pin-ripple" style={{ animationDelay: "1s" }} />
            <span className="absolute inset-0 rounded-full bg-white/15 ct-pin-ripple" style={{ animationDelay: "2s" }} />
          </div>
          <svg width="54" height="68" viewBox="0 0 74 94" className="relative drop-shadow-[0_0_25px_rgba(251,191,36,0.55)] animate-pin-bob">
            <path d="M37 4c14 0 25 11 25 24 0 15-14 31-25 43C26 59 12 43 12 28c0-13 11-24 25-24z" fill="#fbbf24" />
            <path d="M37 4c14 0 25 11 25 24 0 15-14 31-25 43V4z" fill="#fde68a" opacity="0.6" />
            <circle cx="37" cy="29" r="12" fill="#06121c" />
            <circle cx="37" cy="29" r="5" fill="#fbbf24">
              <animate attributeName="r" values="5;6.5;5" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </svg>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-pill px-4 py-1.5 whitespace-nowrap">
            <span className="text-xs font-bold tracking-[0.25em] bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
              PABNA
            </span>
          </div>
        </div>
      </div>

      {/* Top overlay chip */}
      <div className="absolute top-4 left-4 glass-pill px-4 py-2 flex items-center gap-2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs text-white/90 font-medium">Rajapur · Pabna</span>
      </div>
    </>
  );
}

export default function ContactSection({ isActive = true }: { isActive?: boolean }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <section id="contact" className="relative w-full bg-[#074e59] border-t border-white/10 select-none mt-10 scroll-mt-0">
      {/* Contact form (max-width container) */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-14 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div
            className={`lg:col-span-6 transition-all duration-700 ease-out ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Golden title + animated underline */}
            <div className="mb-3 flex flex-col items-start">
              <span
                className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.18em] text-transparent bg-clip-text uppercase [transform:scaleY(1.12)] origin-left animate-golden-text-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #fbbf24 0%, #fef08a 25%, #f59e0b 50%, #fcd34d 75%, #fbbf24 100%)",
                  backgroundSize: "200% auto",
                }}
              >
                Contact Us
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

            <p className="text-sm sm:text-base text-slate-300/85 font-light leading-relaxed max-w-lg mb-10">
              Reach out to our team for project inquiries, partnership opportunities, or
              any assistance regarding your dream home.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-lg">
              <Field placeholder="Your Name" value={form.name} onChange={set("name")} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field type="email" placeholder="Email Address" value={form.email} onChange={set("email")} />
                <Field type="tel" placeholder="Phone Number" value={form.phone} onChange={set("phone")} />
              </div>
              <Field placeholder="Subject" value={form.subject} onChange={set("subject")} />
              <Field placeholder="Your Message" value={form.message} onChange={set("message")} textarea />

              <div className="mt-2">
                {error && (
                  <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-400/20 rounded-lg px-4 py-2.5 mb-3">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-[#3b2605] tracking-wide transition-all duration-300 group overflow-hidden shadow-2xl shadow-amber-500/40 hover:shadow-amber-300/40 active:scale-95 border border-amber-200/50"
                  style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}
                >
                  <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-700 ease-out group-hover:left-[100%]" />
                  <span className="relative z-10 text-sm md:text-base">
                    {submitted ? "Message Sent ✓" : "Send Message"}
                  </span>
                  <div className="relative z-10 w-7 h-7 rounded-full bg-black/15 flex items-center justify-center transition-all duration-300 group-hover:bg-black/25 group-hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-[#3b2605] transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop map: anchored to the right edge, full height of the section */}
        <div
          className={`hidden lg:block absolute top-0 right-0 bottom-0 w-[50vw] transition-all duration-700 delay-150 ease-out ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MapArt />
        </div>
    </section>
  );
}