"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md py-4 border-b border-white/10 shadow-lg"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 text-white group">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-wider font-light uppercase">
                Ash
              </span>
              <span className="text-[8px] tracking-[0.25em] text-[#b5a898] uppercase">
                Est. 2011
              </span>
            </div>
            <div className="h-6 w-[1px] bg-white/20"></div>
            <div className="flex flex-col">
              <span className="text-[7.5px] leading-tight tracking-[0.2em] uppercase text-white/70">
                Creative Direction
                <br />&amp; Styling
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-7 text-[10.5px] tracking-[0.22em] font-medium uppercase text-white/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 hover:text-white relative py-1 ${
                      isActive ? "text-white font-semibold" : ""
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#b5a898]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* WHATSAPP DIRECT CTA & HAMBURGER */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5491123823297?text=Hola%20Ash,%20te%20escribo%20desde%20tu%20sitio%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#b5a898] text-white hover:text-black border border-white/30 hover:border-[#b5a898] px-4 py-2 rounded-full text-[10px] tracking-[0.16em] font-medium uppercase transition-all duration-300 shadow-sm"
              aria-label="Contactar por WhatsApp"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.083-2.264-.569-1.874-.78-3.08-2.697-3.174-.821-.093-.125-.75-.998-.75-1.904 0-.907.476-1.35.645-1.534.17-.184.37-.23.493-.23.124 0 .248.001.354.006.113.006.264-.043.413.314.155.372.53 1.29.576 1.384.047.094.078.204.016.328-.063.125-.094.203-.188.312-.094.11-.197.246-.282.33-.094.094-.192.196-.083.383.11.188.487.804 1.046 1.301.72.641 1.326.84 1.514.934.188.094.298.078.407-.047.11-.125.469-.547.594-.734.125-.187.25-.156.422-.094.172.063 1.094.516 1.282.609.188.094.313.141.359.219.047.078.047.453-.097.858zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.637 0-3.155-.478-4.434-1.297l-.318-.202-2.955.775.789-2.88-.221-.351C4.008 14.925 3.5 13.515 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* HAMBURGER TOGGLE */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white hover:text-[#b5a898] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-200">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-3xl text-white/90 hover:text-[#b5a898] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/historia"
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-white/90 hover:text-[#b5a898] transition-colors"
              >
                MI HISTORIA
              </Link>
            </li>
          </ul>

          <div className="pt-8 border-t border-white/10">
            <p className="text-[9px] tracking-[0.25em] uppercase text-white/40 mb-4">
              Ash Mateu — Creative Direction &amp; Styling
            </p>
            <a
              href="https://wa.me/5491123823297"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center py-3 bg-[#b5a898] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-none"
            >
              Contactar por WhatsApp ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
