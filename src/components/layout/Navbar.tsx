"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X, ArrowUpRight, Check } from "lucide-react";

export type NavbarVariant = "1" | "2" | "3" | "4";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [variant, setVariant] = useState<NavbarVariant>("1");
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

  // Sync with URL query param if present (?nav=1,2,3,4) or localStorage
  useEffect(() => {
    const navParam = searchParams.get("nav") as NavbarVariant;
    if (navParam && ["1", "2", "3", "4"].includes(navParam)) {
      setVariant(navParam);
    } else {
      const saved = localStorage.getItem("ash_navbar_variant") as NavbarVariant;
      if (saved && ["1", "2", "3", "4"].includes(saved)) {
        setVariant(saved);
      }
    }
  }, [searchParams]);

  const handleSelectVariant = (v: NavbarVariant) => {
    setVariant(v);
    localStorage.setItem("ash_navbar_variant", v);
  };

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
      {/* =========================================================================
          VARIANTE 1: MINIMAL EDITORIAL (Saint Laurent / Céline style)
          Limpia, transparente, sin cajas ni fondos pesados. Solo la firma pura.
          ========================================================================= */}
      {variant === "1" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg"
              : "bg-transparent py-7"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LOGO: Clean serif wordmark */}
            <Link href="/" className="group">
              <span className="font-serif text-2xl md:text-3xl text-white font-normal uppercase tracking-[0.08em] group-hover:text-[#b5a898] transition-colors leading-none">
                Ash Mateu
              </span>
            </Link>

            {/* LINKS: Centered ultra-crisp uppercase */}
            <ul className="hidden lg:flex items-center gap-8 xl:gap-10 text-[10.5px] tracking-[0.26em] uppercase font-medium text-white/80">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors relative py-1 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#b5a898] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA: Subtle hairline pill */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 border border-white/35 hover:border-white bg-black/20 hover:bg-white text-white hover:text-black px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 backdrop-blur-sm"
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
          VARIANTE 2: FLOATING GLASS CAPSULE (Linear / Modern Bottega style)
          Cápsula flotante suspendida con bordes redondeados y vidrio ahumado.
          ========================================================================= */}
      {variant === "2" && (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
          <nav
            className={`w-full max-w-[1240px] flex items-center justify-between px-6 md:px-8 py-3 rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                : "bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl"
            }`}
          >
            {/* LOGO: Monogram + Small dot */}
            <Link href="/" className="flex items-center gap-2 group text-white">
              <span className="font-serif text-xl md:text-2xl font-normal uppercase tracking-wider group-hover:text-[#b5a898] transition-colors leading-none">
                Ash
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#b5a898]" />
            </Link>

            {/* COMPACT LINKS */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-[10px] tracking-[0.22em] uppercase font-medium text-white/80">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* GOLD ACCENT PILL BUTTON */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#b5a898] hover:bg-white text-black px-4 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 shadow-sm"
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
          </nav>
        </header>
      )}

      {/* =========================================================================
          VARIANTE 3: ARCHITECTURAL RUNWAY (Chanel / Vogue Runway style)
          Full-width, con línea inferior milimétrica y descriptor técnico sutil.
          ========================================================================= */}
      {variant === "3" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a] border-white/15 py-4"
              : "bg-black/30 backdrop-blur-md border-white/10 py-5"
          }`}
        >
          <div className="w-full px-6 md:px-12 flex items-center justify-between">
            {/* LOGO WITH INLINE TECHNICAL SUBTITLE */}
            <Link href="/" className="flex items-baseline gap-3 group text-white">
              <span className="font-serif text-2xl md:text-3xl font-normal uppercase tracking-[0.06em] group-hover:text-[#b5a898] transition-colors leading-none">
                Ash Mateu
              </span>
              <span className="hidden sm:inline text-[9px] tracking-[0.28em] text-[#b5a898] uppercase font-light">
                · Directora Creativa
              </span>
            </Link>

            {/* LINKS WITH DIVIDER DOTS */}
            <ul className="hidden lg:flex items-center gap-5 xl:gap-6 text-[10px] tracking-[0.24em] uppercase font-medium text-white/75">
              {navLinks.map((link, i) => (
                <React.Fragment key={link.label}>
                  <li>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                  {i < navLinks.length - 1 && (
                    <span className="text-white/20 select-none">/</span>
                  )}
                </React.Fragment>
              ))}
            </ul>

            {/* MINIMALIST SQUARE BORDER CTA */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 border border-white/40 hover:border-[#b5a898] hover:text-[#b5a898] text-white px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-colors"
              >
                <span>Contacto</span>
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
          VARIANTE 4: SPLIT MAISON SYMMETRICAL (Jacquemus / Cartier style)
          Logo centrado y navegación dividida simétricamente a izquierda y derecha.
          ========================================================================= */}
      {variant === "4" && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg"
              : "bg-gradient-to-b from-black/70 to-transparent py-6"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LEFT 3 LINKS */}
            <ul className="hidden lg:flex items-center gap-7 text-[10px] tracking-[0.24em] uppercase font-medium text-white/80 w-1/3">
              <li>
                <Link href="/#highlights" className="hover:text-white transition-colors">
                  WHAT I DO?
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="hover:text-white transition-colors">
                  GALLERY
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  TRENDS
                </Link>
              </li>
            </ul>

            {/* CENTER PROTAGONIST LOGO */}
            <div className="flex-1 lg:flex-initial text-left lg:text-center">
              <Link href="/" className="group inline-block">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal uppercase tracking-[0.12em] group-hover:text-[#b5a898] transition-colors leading-none block">
                  Ash Mateu
                </span>
                <span className="text-[7.5px] tracking-[0.35em] text-[#b5a898] uppercase block mt-1 font-medium text-center">
                  Buenos Aires · Paris · NYC
                </span>
              </Link>
            </div>

            {/* RIGHT 2 LINKS + WHATSAPP */}
            <div className="hidden lg:flex items-center justify-end gap-7 text-[10px] tracking-[0.24em] uppercase font-medium text-white/80 w-1/3">
              <Link href="/como-trabajo" className="hover:text-white transition-colors">
                SERVICES
              </Link>
              <Link href="/newsletter" className="hover:text-white transition-colors">
                NEWSLETTER
              </Link>
              <a
                href="https://wa.me/5491123823297"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black hover:bg-[#b5a898] px-4 py-1.5 rounded-full font-semibold transition-colors flex items-center gap-1"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white hover:text-[#b5a898]"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
      )}

      {/* =========================================================================
          INTERACTIVE SWITCHER TOOLBAR (Discreet bar at bottom for instant testing)
          ========================================================================= */}
      {showSwitcher && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a]/95 border border-white/20 text-white rounded-2xl p-3 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <span className="text-[9.5px] tracking-[0.2em] uppercase text-[#b5a898] font-semibold">
              Selector de Navbar (4 Variantes)
            </span>
            <button
              onClick={() => setShowSwitcher(false)}
              className="text-white/40 hover:text-white text-xs p-0.5"
              title="Cerrar selector"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <button
              onClick={() => handleSelectVariant("1")}
              className={`p-2 rounded-lg text-left transition-all border flex items-center justify-between ${
                variant === "1"
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>1. Minimal Editorial</span>
              {variant === "1" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("2")}
              className={`p-2 rounded-lg text-left transition-all border flex items-center justify-between ${
                variant === "2"
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>2. Floating Capsule</span>
              {variant === "2" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("3")}
              className={`p-2 rounded-lg text-left transition-all border flex items-center justify-between ${
                variant === "3"
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>3. Runway Border</span>
              {variant === "3" && <Check size={12} />}
            </button>

            <button
              onClick={() => handleSelectVariant("4")}
              className={`p-2 rounded-lg text-left transition-all border flex items-center justify-between ${
                variant === "4"
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
              }`}
            >
              <span>4. Split Symmetrical</span>
              {variant === "4" && <Check size={12} />}
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
