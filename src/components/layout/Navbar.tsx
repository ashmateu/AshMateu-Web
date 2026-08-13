"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WHAT I DO?", href: "/#highlights" },
    { label: "FASHION GALLERY", href: "/galeria" },
    { label: "TRENDS", href: "/blog" },
    { label: "STYLING SERVICES", href: "/como-trabajo" },
    { label: "VLOG", href: "/#vlog" },
    { label: "NEWSLETTER", href: "/newsletter" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        {/* PROGRESSIVE TRANSLUCENT GRADIENT COVERING THE TOP 50% OF THE VIEWPORT */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-[50svh] transition-opacity duration-700 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.5) 12%, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 0.12) 38%, rgba(0, 0, 0, 0.03) 45%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        {/* MAIN NAV BAR CONTAINER */}
        <div
          className={`relative z-10 w-full transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a]/92 backdrop-blur-2xl py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] border-b border-white/10"
              : "py-5"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO: ASH MATEU + PARIS · BUENOS AIRES */}
            <Link href="/" className="flex items-center gap-3.5 group text-white">
              <div className="flex flex-col">
                <span className="font-serif text-2xl md:text-[28px] font-normal uppercase tracking-[0.1em] group-hover:text-[#b5a898] transition-colors leading-none">
                  Ash Mateu
                </span>
                <span className="text-[7.5px] tracking-[0.38em] text-[#b5a898] uppercase font-medium mt-1">
                  Paris · Buenos Aires
                </span>
              </div>
            </Link>

            {/* NAV LINKS WITH '+' COUTURE DELIMITERS & CENTER-EXPANDING GOLD HOVER */}
            <ul className="hidden lg:flex items-center gap-5 xl:gap-7 text-[10px] tracking-[0.28em] uppercase font-medium text-white/90">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <React.Fragment key={link.label}>
                    <li>
                      <Link
                        href={link.href}
                        className={`transition-colors py-1 relative hover:text-white group flex items-center gap-1 ${
                          isActive ? "text-white font-semibold" : ""
                        }`}
                      >
                        <span>{link.label}</span>
                        <span
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] bg-[#b5a898] transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>
                    </li>
                    {i < navLinks.length - 1 && (
                      <span className="text-[#b5a898]/40 select-none text-[8px] font-light">
                        +
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>

            {/* CTA: ATELIER DIRECT WHATSAPP WITH LIVE PULSING CRIMSON BEACON */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden sm:inline-flex items-center gap-2 bg-white/5 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 backdrop-blur-md shadow-sm active:scale-[0.98]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA2638] animate-pulse" />
                <span>WhatsApp</span>
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>

              {/* MOBILE HAMBURGER BUTTON */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white hover:text-[#b5a898] focus:outline-none"
                aria-label="Abrir menú"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER MODAL OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a]/98 backdrop-blur-3xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-300">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-3xl text-white/90 hover:text-[#b5a898] transition-colors block border-b border-white/10 pb-3"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/historia"
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-white/90 hover:text-[#b5a898] transition-colors block border-b border-white/10 pb-3"
              >
                MI HISTORIA
              </Link>
            </li>
          </ul>

          <div className="pt-8 border-t border-white/15">
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#b5a898] mb-4">
              Ash Mateu — Creative Direction &amp; Styling · +54 9 11 2382-3297
            </p>
            <a
              href="https://wa.me/5491123823297"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full text-center py-3.5 bg-[#b5a898] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-full shadow-lg"
            >
              <span>Contactar por WhatsApp</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
