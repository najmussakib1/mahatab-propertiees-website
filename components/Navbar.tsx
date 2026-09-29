"use client";

import HamburgerMenu from "@/components/HamburgerMenu";
import { navigateHomeTo } from "@/lib/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface NavbarProps {
  isSection2?: boolean;
  autoScrolled?: boolean;
}

export default function Navbar({ isSection2 = false, autoScrolled = false }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(
    pathname === "/projects"
      ? "Projects"
      : pathname === "/about"
        ? "About"
        : pathname === "/landowner"
          ? "Landowners"
          : "Home"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // On standalone pages (e.g. /projects) the navbar starts transparent over the
  // hero and turns into a frosted, colored bar as soon as the user scrolls.
  useEffect(() => {
    if (!autoScrolled) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [autoScrolled]);

  const frosted = isSection2 || scrolled;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    name: string,
    href: string
  ) => {
    e.preventDefault();
    setActiveTab(name);
    if (href === "#projects") {
      router.push("/projects");
      return;
    }
    if (href === "#landowners") {
      router.push("/landowner");
      return;
    }
    if (href === "/about") {
      router.push("/about");
      return;
    }
    if (href === "/contact") {
      router.push("/contact");
      return;
    }
    if (href === "#gallery") {
      router.push("/gallery");
      return;
    }
    navigateHomeTo(href);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "#projects" },
    { name: "Landowners", href: "#landowners" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-14 py-6 transition-all duration-500 pointer-events-auto ${
          frosted
            ? "border-b border-amber-950/10 backdrop-blur-2xl bg-[#e9dcc6]/80 shadow-2xl"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Clean Transparent Logo Alone */}
          <Link
            href="/"
            className="relative block hover:opacity-90 transition-opacity duration-300"
          >
            <div className="relative h-12 w-48 sm:h-14 sm:w-56 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
              <Image
                src={frosted ? "/logo-clean.png" : "/logo-white.png"}
                alt="Mahatab Properties Ltd"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Center: Glass Effect Navigation Capsule */}
          <nav
            className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-full shadow-2xl ${
              frosted ? "glass-nav-light" : "glass-nav"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.name, link.href)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-[#0d6e7e] text-white shadow-lg shadow-[#0d6e7e]/50 font-semibold"
                      : frosted
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-900/5"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right: Big 2-Bar Hamburger (NO BORDER, Clean & Bold, Opens Menu Instantly) */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Full Navigation Menu"
              className="group flex flex-col justify-center items-end gap-2.5 p-3 hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none"
            >
              {/* Top Bar - Large & Wide */}
              <span className={`w-10 h-[3.5px] rounded-full transition-all duration-200 group-hover:w-8 shadow-[0_2px_8px_rgba(0,0,0,0.3)] ${
                frosted ? "bg-slate-900 group-hover:bg-teal-600" : "bg-white group-hover:bg-teal-300"
              }`} />
              {/* Bottom Bar - Distinct 2-bar aesthetic */}
              <span className={`w-6 h-[3.5px] rounded-full transition-all duration-200 group-hover:w-10 shadow-[0_2px_8px_rgba(0,0,0,0.3)] ${
                frosted ? "bg-slate-900 group-hover:bg-teal-600" : "bg-white group-hover:bg-teal-300"
              }`} />
            </button>
          </div>
        </div>
      </header>

      {/* Full Page Hamburger Modal Component */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}


