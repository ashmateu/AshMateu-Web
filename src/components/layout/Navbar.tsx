"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
              : "pt-7 sm:pt-8 md:pt-9 pb-5 md:pb-6"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-end lg:justify-center relative">
            {/* NAV LINKS WITH '+' COUTURE DELIMITERS & CENTER-EXPANDING GOLD HOVER */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-9 text-[13px] sm:text-[13.5px] tracking-[0.24em] uppercase font-medium text-white/95">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <React.Fragment key={link.label}>
                    <li>
                      <Link
                        href={link.href}
                        className={`transition-colors py-1.5 relative hover:text-white group flex items-center gap-1 ${
                          isActive ? "text-white font-semibold" : ""
                        }`}
                      >
                        <span>{link.label}</span>
                        <span
                          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] bg-[#b5a898] transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>
                    </li>
                    {i < navLinks.length - 1 && (
                      <span className="text-[#b5a898]/50 select-none text-[10px] font-light">
                        +
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>

            {/* CTA: ATELIER DIRECT WHATSAPP (OFFICIAL WHATSAPP GREEN #25D366) */}
            <div className="flex items-center gap-4 lg:absolute lg:right-6 xl:right-12">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden sm:inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/35 hover:border-[#25D366] px-4.5 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 backdrop-blur-md shadow-sm active:scale-[0.98]"
              >
                {/* WHATSAPP OFFICIAL ICON */}
                <svg
                  className="w-[12px] h-[12px] fill-[#25D366] group-hover:fill-black transition-colors"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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
            <div className="mb-3">
              <span className="font-serif text-2xl tracking-[0.22em] uppercase text-white font-normal">
                Ash Mateu
              </span>
            </div>
            <div className="flex flex-col gap-1 mb-4 text-[9px] tracking-[0.25em] uppercase text-[#b5a898]">
              <p>Buenos Aires · Nueva York · París · +54 9 11 2382-3297</p>
              <a href="mailto:info@ashmateu.com" className="hover:text-white transition-colors underline underline-offset-2">
                info@ashmateu.com
              </a>
            </div>
            <a
              href="https://wa.me/5491123823297"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full text-center py-3.5 bg-[#25D366] text-black font-bold text-xs tracking-[0.2em] uppercase rounded-full shadow-lg"
            >
              <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Contactar por WhatsApp</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
