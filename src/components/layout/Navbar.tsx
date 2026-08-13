"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X, ArrowUpRight, Check } from "lucide-react";

export type RunwayVariant = "3A" | "3B" | "3C" | "3D";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [variant, setVariant] = useState<RunwayVariant>("3A");
  const [showSwitcher, setShowSwitcher] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync with query param (?nav=3A, 3B, 3C, 3D) or localStorage
  useEffect(() => {
    const navParam = searchParams.get("nav") as RunwayVariant;
    if (navParam && ["3A", "3B", "3C", "3D"].includes(navParam)) {
      setVariant(navParam);
    } else {
      const saved = localStorage.getItem("ash_runway_variant") as RunwayVariant;
      if (saved && ["3A", "3B", "3C", "3D"].includes(saved)) {
        setVariant(saved);
      }
    }
  }, [searchParams]);

  const handleSelectVariant = (v: RunwayVariant) => {
    setVariant(v);
    localStorage.setItem("ash_runway_variant", v);
  };

  const navLinks = [
    { label: "WHAT I DO?", href: "/#highlights", num: "01" },
    { label: "FASHION GALLERY", href: "/galeria", num: "02" },
    { label: "TRENDS", href: "/blog", num: "03" },
    { label: "STYLING SERVICES", href: "/como-trabajo", num: "04" },
    { label: "VLOG", href: "/#vlog", num: "05" },
    { label: "NEWSLETTER", href: "/newsletter", num: "06" },
  ];

  return (
    <>
      {/* =========================================================================
          VARIANTE 3A: RUNWAY MINIMAL CLASSIC
          Línea inferior continua, tipografía Bodoni pura con descriptor horizontal,
          enlaces con divisor diagonal sutil '/' y botón de WhatsApp en píldora fina.
          ========================================================================= */}
      {variant === "3A" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
            scrolled
              ? "bg-[#0a0a0a]/95 border-white/15 py-4 backdrop-blur-xl shadow-lg"
              : "bg-black/40 border-white/15 py-5 backdrop-blur-md"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-baseline gap-3 group text-white">
              <span className="font-serif text-2xl md:text-[28px] font-normal uppercase tracking-[0.06em] group-hover:text-[#b5a898] transition-colors leading-none">
                Ash Mateu
              </span>
              <span className="hidden sm:inline text-[9px] tracking-[0.28em] text-[#b5a898] uppercase font-light">
                · Directora Creativa
              </span>
            </Link>

            {/* LINKS WITH '/' SEPARATORS */}
            <ul className="hidden lg:flex items-center gap-5 xl:gap-7 text-[10px] tracking-[0.24em] uppercase font-medium text-white/80">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <React.Fragment key={link.label}>
                    <li>
                      <Link
                        href={link.href}
                        className={`transition-colors py-1 relative hover:text-white ${
                          isActive ? "text-white font-semibold" : ""
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#b5a898]" />
                        )}
                      </Link>
                    </li>
                    {i < navLinks.length - 1 && (
                      <span className="text-white/20 select-none font-light">/</span>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>

            {/* CTA: Subtle hairline pill */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 border border-white/35 hover:border-white bg-white/5 hover:bg-white text-white hover:text-black px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white hover:text-[#b5a898]"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* =========================================================================
          VARIANTE 3B: RUNWAY HIGH EDITORIAL (Numbered + Gold Accent CTA)
          Línea milimétrica, logotipo con subtítulo apilado 'DIRECCIÓN CREATIVA & STYLING',
          enlaces con micro-índice numérico '01. WHAT I DO?' y botón en oro champagne.
          ========================================================================= */}
      {variant === "3B" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
            scrolled
              ? "bg-[#0a0a0a]/95 border-white/20 py-3.5 backdrop-blur-2xl shadow-xl"
              : "bg-[#0a0a0a]/60 border-white/15 py-4 backdrop-blur-lg"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO: STACKED EDITORIAL */}
            <Link href="/" className="flex flex-col group text-white">
              <span className="font-serif text-2xl md:text-[26px] font-normal uppercase tracking-[0.08em] group-hover:text-[#b5a898] transition-colors leading-tight">
                Ash Mateu
              </span>
              <span className="text-[7.5px] tracking-[0.32em] text-[#b5a898] uppercase font-medium">
                Dirección Creativa &amp; Styling
              </span>
            </Link>

            {/* LINKS WITH NUMBERED MICRO-INDEX */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-[9.5px] tracking-[0.22em] uppercase font-medium text-white/80">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#b5a898] transition-colors py-1 group flex items-center gap-1"
                  >
                    <span className="text-[8px] text-[#b5a898]/70 font-mono">
                      {link.num}.
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA: CHAMPAGNE GOLD PILL WITH NESTED CIRCLE */}
            <div className="flex items-center gap-3.5">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden sm:inline-flex items-center gap-2 bg-[#b5a898] hover:bg-white text-black pl-4 pr-1.5 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 shadow-md"
              >
                <span>WhatsApp</span>
                <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={11} strokeWidth={2.5} />
                </div>
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white hover:text-[#b5a898]"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* =========================================================================
          VARIANTE 3C: RUNWAY GLASS STRIP (Clean Dot Indicators & Sleek Pill)
          Franja translúcida ultra limpia, monograma con punto de oro y año,
          enlaces con indicador de punto inferior y botón alargado traslúcido.
          ========================================================================= */}
      {variant === "3C" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
            scrolled
              ? "bg-[#0a0a0a]/90 border-white/15 py-3.5 backdrop-blur-xl shadow-lg"
              : "bg-gradient-to-r from-black/70 via-black/40 to-black/70 border-white/20 py-4.5 backdrop-blur-md"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO: ASH MATEU + GOLD DOT */}
            <Link href="/" className="flex items-center gap-2.5 group text-white">
              <span className="font-serif text-2xl md:text-[26px] font-normal uppercase tracking-[0.08em] group-hover:text-[#b5a898] transition-colors leading-none">
                Ash Mateu<span className="text-[#c9a84c]">.</span>
              </span>
              <span className="hidden sm:inline-block h-3.5 w-[1px] bg-white/25 mx-0.5" />
              <span className="hidden sm:inline-block text-[8px] tracking-[0.25em] text-white/50 uppercase">
                Est. 2011
              </span>
            </Link>

            {/* LINKS: CLEAN & AIRY */}
            <ul className="hidden lg:flex items-center gap-7 xl:gap-9 text-[10px] tracking-[0.26em] uppercase font-medium text-white/75">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors relative py-1 flex flex-col items-center group"
                    >
                      <span className={isActive ? "text-white font-semibold" : ""}>
                        {link.label}
                      </span>
                      <span
                        className={`w-1 h-1 rounded-full bg-[#c9a84c] mt-1 transition-all duration-300 ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA: SLEEK TRANSLUCENT CAPSULE */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white px-4 py-1.5 rounded-full text-[9.5px] tracking-[0.2em] uppercase font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={12} />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white hover:text-[#b5a898]"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* =========================================================================
          VARIANTE 3D: RUNWAY MAGAZINE MASTHEAD (Editorial Top Bar + Structured Nav)
          Inspirado en Vogue / Harper's Bazaar: micro-barra superior de coordenadas
          y barra principal con botón de contacto enmarcado en ángulo recto (0px radius).
          ========================================================================= */}
      {variant === "3D" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
            scrolled
              ? "bg-[#0a0a0a] border-white/20 py-3 backdrop-blur-none shadow-xl"
              : "bg-black/60 border-white/15 py-3.5 backdrop-blur-md"
          }`}
        >
          {/* TOP MICRO-STRIP */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-2 mb-2 border-b border-white/10 hidden sm:flex items-center justify-between text-[8px] tracking-[0.3em] uppercase text-white/50">
            <span>Buenos Aires · Paris · New York</span>
            <span>Fashion Styling &amp; Creative Direction · +54 9 11 2382-3297</span>
          </div>

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO: PROTAGONIST MASTHEAD */}
            <Link href="/" className="group text-white">
              <span className="font-serif text-2xl md:text-3xl font-normal uppercase tracking-[0.1em] group-hover:text-[#b5a898] transition-colors leading-none">
                Ash Mateu
              </span>
            </Link>

            {/* LINKS: MAGAZINE STYLE */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-[10px] tracking-[0.24em] uppercase font-medium text-white/80">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#b5a898] transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA: SHARP 0PX ARCHITECTURAL RECTANGLE */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 border border-white/40 hover:bg-white hover:text-black text-white px-4 py-1.5 text-[9.5px] tracking-[0.24em] uppercase font-semibold transition-all duration-300"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={12} />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-1.5 text-white hover:text-[#b5a898]"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* =========================================================================
          INTERACTIVE SWITCHER TOOLBAR (Discreet bar at bottom-right)
          ========================================================================= */}
      {showSwitcher && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a]/95 border border-white/20 text-white rounded-2xl p-3.5 shadow-2xl backdrop-blur-2xl flex flex-col gap-2.5 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <div className="flex flex-col">
              <span className="text-[9.5px] tracking-[0.2em] uppercase text-[#b5a898] font-semibold">
                Variantes Runway Border
              </span>
              <span className="text-[8px] text-white/50 tracking-wider uppercase">
                Basadas en la opción 3
              </span>
            </div>
            <button
              onClick={() => setShowSwitcher(false)}
              className="text-white/40 hover:text-white text-xs p-1"
              title="Cerrar selector"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <button
              onClick={() => handleSelectVariant("3A")}
              className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                variant === "3A"
                  ? "bg-white text-black border-white font-semibold shadow-sm"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3A. Minimal Classic</span>
              {variant === "3A" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("3B")}
              className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                variant === "3B"
                  ? "bg-white text-black border-white font-semibold shadow-sm"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3B. High Editorial</span>
              {variant === "3B" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("3C")}
              className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                variant === "3C"
                  ? "bg-white text-black border-white font-semibold shadow-sm"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3C. Glass Strip</span>
              {variant === "3C" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("3D")}
              className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                variant === "3D"
                  ? "bg-white text-black border-white font-semibold shadow-sm"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3D. Magazine Masthead</span>
              {variant === "3D" && <Check size={12} />}
            </button>
          </div>
        </div>
      )}

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
