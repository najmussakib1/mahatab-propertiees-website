"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { navigateHomeTo } from "@/lib/navigation";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "#projects" },
  { name: "Landowners", href: "#landowners" },
  { name: "Contact Us", href: "#contact" },
];

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="relative w-full bg-[#e4d6bc] border-t border-amber-950/15 select-none">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-14 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand + taglines */}
          <div className="sm:col-span-2 lg:col-span-2 lg:pr-10">
            <Link href="/" className="relative block h-12 w-48 sm:h-14 sm:w-56">
              <Image
                src="/logo-clean.png"
                alt="Mahatab Properties Ltd"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-6 text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 tracking-wide">
              Building your future, today.
            </p>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-md">
              Crafting Bangladesh&rsquo;s most distinguished residential landmarks with
              uncompromising architectural brilliance, sustainable engineering, and
              lifelong value for our customers.
            </p>
            <div className="mt-6 h-[3px] w-32 rounded-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 shadow-[0_0_12px_rgba(180,83,9,0.4)]" />
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-amber-700 mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.href === "#projects") {
                        router.push("/projects");
                        return;
                      }
                      if (link.href === "/about") {
                        router.push("/about");
                        return;
                      }
                      navigateHomeTo(link.href);
                    }}
                    className="group inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600/70 group-hover:bg-amber-600 transition-colors duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-amber-700 mb-5">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  MPL Head Office, Farida Tower,
                  <br />
                  Rajapur, Pabna.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+880 1301-222211</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>mahatabpropertieslimited@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-amber-950/10">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 font-light">
          <span>
            © {new Date().getFullYear()} Mahatab Properties Ltd. All rights reserved.
          </span>
          <span>
            Developed by <span className="text-teal-700 font-medium">N. Sakib</span>
          </span>
        </div>
      </div>
    </footer>
  );
}