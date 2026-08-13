"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X, ArrowUpRight, Check, Sparkles } from "lucide-react";

export type RunwayAvantGardeVariant = "3A-1" | "3A-2" | "3A-3" | "3A-4";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [variant, setVariant] = useState<RunwayAvantGardeVariant>("3A-1");
  const [showSwitcher, setShowSwitcher] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync with URL query param (?nav=3A-1, 3A-2, 3A-3, 3A-4) or localStorage
  useEffect(() => {
    const navParam = searchParams.get("nav") as RunwayAvantGardeVariant;
    if (navParam && ["3A-1", "3A-2", "3A-3", "3A-4"].includes(navParam)) {
      setVariant(navParam);
    } else {
      const saved = localStorage.getItem("ash_runway_ag_variant") as RunwayAvantGardeVariant;
      if (saved && ["3A-1", "3A-2", "3A-3", "3A-4"].includes(saved)) {
        setVariant(saved);
      }
    }
  }, [searchParams]);

  const handleSelectVariant = (v: RunwayAvantGardeVariant) => {
    setVariant(v);
    localStorage.setItem("ash_runway_ag_variant", v);
  };

  const navLinks = [
    { label: "WHAT I DO?", href: "/#highlights", code: "01" },
    { label: "FASHION GALLERY", href: "/galeria", code: "02" },
    { label: "TRENDS", href: "/blog", code: "03" },
    { label: "STYLING SERVICES", href: "/como-trabajo", code: "04" },
    { label: "VLOG", href: "/#vlog", code: "05" },
    { label: "NEWSLETTER", href: "/newsletter", code: "06" },
  ];

  return (
    <>
      {/* =========================================================================
          VARIANTE 3A-1: HAUTE COUTURE MONOGRAPH (Saint Laurent / The Row)
          - Logo: 'ASH MATEU' en Bodoni estilizada con sub-label 'PARIS · BUENOS AIRES'
          - Línea de Pasarela: Hairline luminosa en degradé dorado/cristal
          - Enlaces: Espaciado ultra-fino con divisores técnicos '+'
          - CTA: Cápsula translúcida con baliza viva '● WhatsApp ↗'
          ========================================================================= */}
      {variant === "3A-1" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a]/92 backdrop-blur-2xl py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO WITH MAISON COORDINATES */}
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

            {/* LINKS WITH '+' COUTURE DELIMITERS */}
            <ul className="hidden lg:flex items-center gap-5 xl:gap-7 text-[10px] tracking-[0.28em] uppercase font-medium text-white/80">
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

            {/* CTA: ATELIER DIRECT WITH LIVE BEACON */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden sm:inline-flex items-center gap-2 bg-white/5 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 backdrop-blur-md shadow-sm active:scale-[0.98]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                <span>WhatsApp</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white hover:text-[#b5a898]"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* LUMINOUS RUNWAY HAIRLINE WIRE */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#b5a898]/50 to-transparent mt-3.5" />
        </header>
      )}

      {/* =========================================================================
          VARIANTE 3A-2: ARCHITECTURAL NOIR & MAGNETIC CAPSULE (Bottega / Acne Studios)
          - Logo: Monolítico con diamante 'ASH MATEU ◆ DIRECTORA CREATIVA'
          - Enlaces: Píldoras magnéticas de cristal al hacer hover
          - CTA: Botón en oro champagne cepillado con micro-círculo de tensión cinética
          ========================================================================= */}
      {variant === "3A-2" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/15 ${
            scrolled
              ? "bg-[#0a0a0a]/95 backdrop-blur-2xl py-3 shadow-2xl"
              : "bg-black/60 backdrop-blur-md py-4"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO WITH GEOMETRIC DIAMOND */}
            <Link href="/" className="flex items-baseline gap-2.5 group text-white">
              <span className="font-serif text-2xl md:text-[28px] font-normal uppercase tracking-[0.08em] group-hover:text-[#b5a898] transition-colors leading-none">
                Ash Mateu
              </span>
              <span className="text-[#c9a84c] text-[10px]">◆</span>
              <span className="hidden sm:inline text-[8.5px] tracking-[0.3em] text-white/70 uppercase font-light">
                Directora Creativa
              </span>
            </Link>

            {/* MAGNETIC GLASS PILL LINKS */}
            <ul className="hidden lg:flex items-center gap-2 xl:gap-3 text-[10px] tracking-[0.24em] uppercase font-medium text-white/80">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-sm"
                          : "hover:bg-white/10 hover:text-white text-white/75"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA: BRUSHED CHAMPAGNE GOLD BUTTON */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden sm:inline-flex items-center gap-2.5 bg-[#b5a898] hover:bg-white text-black pl-4 pr-1.5 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 shadow-md active:scale-[0.98]"
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
          VARIANTE 3A-3: EDITORIAL SPLIT FRAME (Vogue Paris / Balenciaga Runway)
          - Logo: 'ASH MATEU' con monograma de alta costura 'AM°'
          - Enlaces: Separados por barras verticales finas '|' con resplandor sutil
          - CTA: Marco arquitectónico 'ATELIER DIRECT ↗' con esquinas de precisión
          ========================================================================= */}
      {variant === "3A-3" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/20 ${
            scrolled
              ? "bg-[#0a0a0a]/95 backdrop-blur-xl py-3.5 shadow-xl"
              : "bg-gradient-to-r from-black/80 via-black/50 to-black/80 backdrop-blur-md py-4.5"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO WITH SUPERSCRIPT MONOGRAM */}
            <Link href="/" className="flex items-center gap-2 group text-white">
              <span className="font-serif text-2xl md:text-[28px] font-normal uppercase tracking-[0.1em] group-hover:text-[#b5a898] transition-colors leading-none">
                Ash Mateu
              </span>
              <span className="font-serif text-[11px] text-[#b5a898] italic font-light">
                AM°
              </span>
            </Link>

            {/* LINKS WITH VERTICAL BARS '|' */}
            <ul className="hidden lg:flex items-center gap-4 xl:gap-6 text-[10px] tracking-[0.26em] uppercase font-medium text-white/80">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <React.Fragment key={link.label}>
                    <li>
                      <Link
                        href={link.href}
                        className={`transition-colors py-1 hover:text-white ${
                          isActive
                            ? "text-[#b5a898] font-semibold border-b border-[#b5a898] pb-0.5"
                            : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                    {i < navLinks.length - 1 && (
                      <span className="text-white/20 select-none font-thin">|</span>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>

            {/* CTA: SURGICAL RECTANGLE ATELIER */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 border border-white/40 hover:border-white hover:bg-white hover:text-black text-white px-4 py-1.5 text-[9.5px] tracking-[0.24em] uppercase font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                <span>Atelier Direct</span>
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
          VARIANTE 3A-4: PURE AVANT-GARDE MINIMAL (Céline Phoebe Philo / Jil Sander)
          - Header: Pureza absoluta, tipografía etérea y máxima respiración
          - Logo: 'ASH MATEU' en tracking expandido con punto dorado de autor
          - CTA: 'WhatsApp +54 9 11 ↗' con subrayado reactivo en reposo
          ========================================================================= */}
      {variant === "3A-4" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/10 py-3.5"
              : "bg-transparent border-b border-white/15 py-6"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO: EXPANDED COUTURE SIGNATURE */}
            <Link href="/" className="group text-white">
              <span className="font-serif text-2xl md:text-[30px] font-normal uppercase tracking-[0.14em] group-hover:text-[#b5a898] transition-colors leading-none">
                Ash Mateu<span className="text-[#c9a84c]">.</span>
              </span>
            </Link>

            {/* LINKS: PURE ETHEREAL TRACKING */}
            <ul className="hidden lg:flex items-center gap-8 xl:gap-10 text-[10.5px] tracking-[0.3em] uppercase font-light text-white/85">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`transition-colors py-1 relative hover:text-white ${
                        isActive ? "text-white font-medium" : ""
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA: SLEEK DIRECT LINE */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-[0.24em] uppercase text-[#b5a898] hover:text-white border-b border-[#b5a898]/50 hover:border-white pb-0.5 transition-colors font-medium"
              >
                <span>WhatsApp ↗</span>
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
          INTERACTIVE SWITCHER TOOLBAR (Discreet bar at bottom-right)
          ========================================================================= */}
      {showSwitcher && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a]/95 border border-white/20 text-white rounded-2xl p-3.5 shadow-2xl backdrop-blur-2xl flex flex-col gap-2.5 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <div className="flex flex-col">
              <span className="text-[9.5px] tracking-[0.2em] uppercase text-[#b5a898] font-semibold flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#c9a84c]" />
                Evolución de Runway 3A
              </span>
              <span className="text-[8px] text-white/50 tracking-wider uppercase">
                Alta Moda Vanguardista
              </span>
            </div>
            <button
              onClick={() => setShowSwitcher(false)}
              className="text-white/40 hover:text-white text-xs p-1 cursor-pointer"
              title="Cerrar selector"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <button
              onClick={() => handleSelectVariant("3A-1")}
              className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                variant === "3A-1"
                  ? "bg-white text-black border-white font-semibold shadow-sm"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3A-1. Haute Couture</span>
              {variant === "3A-1" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("3A-2")}
              className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                variant === "3A-2"
                  ? "bg-white text-black border-white font-semibold shadow-sm"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3A-2. Architectural Noir</span>
              {variant === "3A-2" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("3A-3")}
              className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                variant === "3A-3"
                  ? "bg-white text-black border-white font-semibold shadow-sm"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3A-3. Split Frame</span>
              {variant === "3A-3" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("3A-4")}
              className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                variant === "3A-4"
                  ? "bg-white text-black border-white font-semibold shadow-sm"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3A-4. Pure Avant-Garde</span>
              {variant === "3A-4" && <Check size={12} />}
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
