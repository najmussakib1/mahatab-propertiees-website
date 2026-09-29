"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { navigateHomeTo } from "@/lib/navigation";
import { useEffect, useRef, useState } from "react";

const MENU_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "/about" },
  { name: "Landowners", href: "#landowners" },
  { name: "Project List", href: "#projects" },
  { name: "Career", href: "#career" },
  { name: "Gallery", href: "#gallery" },
  { name: "Interior Solution", href: "#interior" },
  { name: "EMI Calculator", href: "#emi" },
  { name: "Contact Us", href: "/contact" },
  { name: "News and Event", href: "#news" },
];

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const router = useRouter();
  const [hoveredName, setHoveredName] = useState<string>("Home");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const prevOpen = useRef(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Only act when the menu actually transitions, never on first mount or on
    // unrelated re-renders — otherwise the scroll position gets reset constantly.
    if (prevOpen.current === isOpen) {
      window.removeEventListener("keydown", handleKeyDown);
      if (isOpen) window.addEventListener("keydown", handleKeyDown);
      return;
    }
    prevOpen.current = isOpen;

    if (isOpen) {
      const y = window.scrollY;
      document.body.dataset.mplLockedAt = String(-y);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `${-y}px`;
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        const lockedAt = document.body.dataset.mplLockedAt;
        if (lockedAt) {
          window.scrollTo(0, parseInt(lockedAt) * -1);
          delete document.body.dataset.mplLockedAt;
        }
        window.removeEventListener("keydown", handleKeyDown);
      };
    }

    window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col select-none">
      {/* Backdrop — near-solid color; heavy blur only on desktop */}
      <div className="absolute inset-0 -z-10 mpl-menu-backdrop" style={{
        background: "rgba(233, 220, 198, 0.98)",
        borderRight: "1px solid rgba(120, 80, 30, 0.08)",
        boxShadow: "inset 0 0 80px rgba(13,110,126,0.08), 0 32px 64px rgba(90,60,20,0.15)"
      }} />
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{
        background: "linear-gradient(160deg, rgba(45,212,191,0.06) 0%, transparent 40%, transparent 70%, rgba(45,212,191,0.05) 100%)"
      }} />
      <div className="hidden md:block absolute top-0 right-1/3 w-[700px] h-[700px] bg-teal-500/10 rounded-full blur-[220px] pointer-events-none -z-10" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0d6e7e]/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Header: Logo + Close */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 py-7 flex items-center justify-between border-b border-amber-950/10 shrink-0">
        <Link href="/" onClick={onClose} className="hover:opacity-90 transition-opacity duration-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-clean.png" alt="Mahatab Properties Ltd" className="h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]" />
        </Link>
        <button onClick={onClose} type="button" aria-label="Close Menu"
          className="group flex flex-col justify-center items-end gap-2.5 p-3 hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none">
          <span className="w-10 h-[3.5px] bg-slate-900 rounded-full rotate-45 translate-y-[6px] group-hover:bg-teal-600 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.2)]" />
          <span className="w-10 h-[3.5px] bg-slate-900 rounded-full -rotate-45 -translate-y-[6px] group-hover:bg-teal-600 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.2)]" />
        </button>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center overflow-y-auto lg:overflow-visible py-4"
        style={{
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          minHeight: 0,
        }}>
        {/* LEFT: Navigation */}
        <div className="lg:col-span-7 flex flex-col justify-center">

          {/* "MENU" title with golden gradient */}
          <div className="mb-6 flex flex-col items-start">
            <span className="text-3xl sm:text-4xl md:text-[44px] font-light tracking-[0.22em] text-transparent bg-clip-text golden-stroke uppercase [transform:scaleY(1.15)] origin-left animate-golden-text-shimmer"
              style={{ backgroundImage: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #eab308 50%, #f59e0b 75%, #b45309 100%)", backgroundSize: "200% auto" }}>
              MENU
            </span>
            <div className="mt-2 h-[3px] rounded-full animate-gold-underline shadow-[0_0_14px_#f59e0b]"
              style={{ background: "linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #b45309 100%)", backgroundSize: "200% 200%" }} />
          </div>

          {/* Nav items — animate on open, blue color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            {MENU_ITEMS.map((item, idx) => {
              const isHov = hoveredName === item.name;
              return (
                <div key={item.name} className="animate-menu-item"
                  style={{ animationDelay: `${idx * 30 + 80}ms` }}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      if (item.href === "#projects") {
                        router.push("/projects");
                        return;
                      }
                      if (item.href === "#landowners") {
                        router.push("/landowner");
                        return;
                      }
                      if (item.href === "#career") {
                        router.push("/career");
                        return;
                      }
                      if (item.href === "/about") {
                        router.push("/about");
                        return;
                      }
                      if (item.href === "/contact") {
                        router.push("/contact");
                        return;
                      }
                      if (item.href === "#gallery") {
                        router.push("/gallery");
                        return;
                      }
                      if (item.href === "#interior") {
                        router.push("/interior-solutions");
                        return;
                      }
                      if (item.href === "#news") {
                        router.push("/news");
                        return;
                      }
                      navigateHomeTo(item.href);
                    }}
                    onMouseEnter={() => setHoveredName(item.name)}
                    className="group relative flex items-center justify-between py-2 transition-all duration-200 hover:translate-x-2"
                  >
                    <span className={`text-2xl sm:text-3xl md:text-[34px] font-extralight tracking-tight transition-colors duration-200 [transform:scaleY(1.15)] origin-left ${
                      isHov
                        ? "text-teal-600 drop-shadow-[0_0_18px_rgba(13,110,126,0.35)]"
                        : "text-teal-700 group-hover:text-teal-600"
                    }`}>
                      {item.name}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 transition-all duration-200 ${isHov ? "opacity-100 translate-x-0 text-teal-600" : "opacity-0 -translate-x-2 text-teal-600/30"}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {isHov && (
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-gradient-to-b from-teal-600 to-[#0d6e7e] rounded-r shadow-[0_0_10px_#0d6e7e]" />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-5 border-t border-teal-700/20 flex items-center justify-between">
            <span className="text-teal-800/80 font-light tracking-wider uppercase text-[11px]">Mahatab Properties Ltd · Architectural Precision</span>
            <div className="flex items-center gap-3">
              <span className="text-teal-700 tracking-wider text-xs">DHAKA</span>
              <span className="w-1 h-1 rounded-full bg-teal-600/70" />
              <span className="text-teal-700 text-xs">+880 2 883 4567</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Images */}
        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center h-full relative">
          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Sparkles */}
          <span className="absolute top-8 left-12 text-teal-600 text-sm animate-sparkle drop-shadow-[0_0_8px_rgba(13,110,126,0.5)]">✦</span>
          <span className="absolute top-24 right-10 text-cyan-600 text-xs animate-sparkle" style={{ animationDelay: "1.1s" }}>✦</span>
          <span className="absolute top-4 left-1/2 text-teal-500 text-base animate-sparkle" style={{ animationDelay: "0.5s" }}>✦</span>

          <div className="relative w-full h-[420px]" onMouseMove={handleMouseMove}>
            {/* About Building image — static backdrop */}
            <div className="absolute right-2 top-8 w-[58%] rounded-2xl overflow-hidden border border-teal-400/25 rotate-2 transition-transform duration-500"
              style={{
                boxShadow: "0 30px 60px rgba(0,0,0,0.55), 0 0 40px rgba(13,110,126,0.25), inset 0 0 30px rgba(45,212,191,0.1)"
              }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about-building.webp" alt="About Building" className="w-full h-56 object-cover" style={{ filter: "saturate(1.3) contrast(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(45,212,191,0.12), transparent 45%)" }} />
            </div>

            {/* About Interior image — moves slightly with cursor */}
            <div className="absolute left-2 bottom-4 w-[60%] rounded-2xl overflow-hidden border border-teal-300/35 -rotate-2 transition-transform duration-500"
              style={{
                boxShadow: "0 30px 60px rgba(0,0,0,0.55), 0 0 45px rgba(45,212,191,0.3), inset 0 0 30px rgba(45,212,191,0.12)",
                transform: `translate(calc(${mouse.x * 20}px + var(--t, 0px)), ${mouse.y * 16}px)`,
                zIndex: 10
              }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about-interior.webp" alt="About Interior" className="w-full h-64 object-cover" style={{ filter: "saturate(1.25) contrast(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(45,212,191,0.15), transparent 45%)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}