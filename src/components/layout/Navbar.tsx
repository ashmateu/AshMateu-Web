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
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 sm:px-6 ${
          scrolled ? "pt-3 pb-2" : "pt-6 pb-4"
        }`}
      >
        <nav
          className={`w-full max-w-[1360px] transition-all duration-500 flex items-center justify-between px-6 md:px-8 py-3.5 ${
            scrolled
              ? "bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
              : "bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-transparent rounded-none"
          }`}
        >
          {/* BRAND MONOGRAM LOGO */}
          <Link href="/" className="flex items-center gap-3.5 text-white group">
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-[26px] tracking-[0.06em] font-normal uppercase text-white group-hover:text-[#b5a898] transition-colors leading-none">
                Ash
              </span>
              <span className="text-[7.5px] tracking-[0.28em] text-[#b5a898] uppercase mt-0.5 font-medium">
                Est. 2011
              </span>
            </div>
            <div className="h-6 w-[1px] bg-white/20"></div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[7.5px] leading-tight tracking-[0.22em] uppercase text-white/70">
                Creative Direction
                <br />&amp; High Styling
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-8 text-[10.5px] tracking-[0.22em] font-medium uppercase text-white/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 hover:text-white relative py-1 group ${
                      isActive ? "text-white font-semibold" : ""
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#b5a898] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* BUTTON-IN-BUTTON WHATSAPP CTA */}
          <div className="flex items-center gap-3.5">
            <a
              href="https://wa.me/5491123823297?text=Hola%20Ash,%20te%20escribo%20desde%20tu%20sitio%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-white/10 hover:bg-[#b5a898] text-white hover:text-black border border-white/25 hover:border-[#b5a898] pl-4 pr-1.5 py-1.5 rounded-full text-[10px] tracking-[0.18em] font-medium uppercase transition-all duration-300 shadow-sm active:scale-[0.98]"
              aria-label="Contactar por WhatsApp"
            >
              <span>WhatsApp</span>
              {/* NESTED INNER ICON CAPSULE */}
              <div className="w-6 h-6 rounded-full bg-white/15 group-hover:bg-black group-hover:text-white text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={13} strokeWidth={2.2} />
              </div>
            </a>

            {/* HAMBURGER TOGGLE */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white hover:text-[#b5a898] transition-colors focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
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
