"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sliders,
  Check,
  RotateCcw,
  Copy,
  ZoomIn,
  Sun,
  Smartphone,
  Monitor,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";

interface FramingConfig {
  x: number;
  y: number;
  zoom: number;
  brightness: number;
}

const DEFAULT_DESKTOP: FramingConfig = {
  x: 76,
  y: 22,
  zoom: 145,
  brightness: 110,
};

const DEFAULT_MOBILE: FramingConfig = {
  x: 75,
  y: 22,
  zoom: 130,
  brightness: 110,
};

export default function HeroCover() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");
  const [isLoaded, setIsLoaded] = useState(false);

  const [desktopFraming, setDesktopFraming] =
    useState<FramingConfig>(DEFAULT_DESKTOP);
  const [mobileFraming, setMobileFraming] =
    useState<FramingConfig>(DEFAULT_MOBILE);

  const [showCalibrator, setShowCalibrator] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initialize screen size and load saved configurations synchronously on mount
  useEffect(() => {
    const isMob = window.innerWidth < 768;
    setIsMobileScreen(isMob);
    setActiveTab(isMob ? "mobile" : "desktop");

    try {
      const savedDesk = localStorage.getItem("ash_hero_desktop_framing");
      if (savedDesk) {
        setDesktopFraming(JSON.parse(savedDesk));
      }
      const savedMob = localStorage.getItem("ash_hero_mobile_framing");
      if (savedMob) {
        setMobileFraming(JSON.parse(savedMob));
      }
    } catch (e) {
      console.error("Error loading saved framing configs", e);
    }

    // Mark as loaded so transitions are enabled without jump
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileScreen(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentConfig = isMobileScreen ? mobileFraming : desktopFraming;
  const editingConfig = activeTab === "mobile" ? mobileFraming : desktopFraming;

  const updateFraming = (updates: Partial<FramingConfig>) => {
    if (activeTab === "mobile") {
      const next = { ...mobileFraming, ...updates };
      setMobileFraming(next);
      localStorage.setItem("ash_hero_mobile_framing", JSON.stringify(next));
    } else {
      const next = { ...desktopFraming, ...updates };
      setDesktopFraming(next);
      localStorage.setItem("ash_hero_desktop_framing", JSON.stringify(next));
    }
  };

  const handleReset = () => {
    if (activeTab === "mobile") {
      setMobileFraming(DEFAULT_MOBILE);
      localStorage.setItem(
        "ash_hero_mobile_framing",
        JSON.stringify(DEFAULT_MOBILE)
      );
    } else {
      setDesktopFraming(DEFAULT_DESKTOP);
      localStorage.setItem(
        "ash_hero_desktop_framing",
        JSON.stringify(DEFAULT_DESKTOP)
      );
    }
  };

  const handleCopy = () => {
    const code = `// Mobile:\nobjectPosition: "${mobileFraming.x}% ${mobileFraming.y}%", transform: "scale(${mobileFraming.zoom / 100})"\n\n// Desktop:\nobjectPosition: "${desktopFraming.x}% ${desktopFraming.y}%", transform: "scale(${desktopFraming.zoom / 100})"`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Cinematic GSAP Reveal on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.4 }
      )
        .fromTo(
          textRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.14, duration: 1.1 },
          "-=0.9"
        )
        .fromTo(
          badgeRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle Interactive Mouse Parallax on Desktop
  useEffect(() => {
    if (isMobileScreen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!imageWrapperRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 12;
      const yPos = (clientY / window.innerHeight - 0.5) * 10;

      gsap.to(imageWrapperRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.2,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobileScreen]);

  const zoomPresets = [90, 100, 115, 130, 150, 180];
  const brightnessPresets = [100, 110, 120, 130, 140];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[660px] flex items-end overflow-hidden bg-[#0a0a0a]"
    >
      {/* FULL-SCREEN HERO BACKGROUND IMAGE WITH CINEMATIC BREATHE & LIGHTING */}
      <div
        ref={heroRef}
        className={`absolute inset-0 w-full h-full opacity-0 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : ""
        }`}
      >
        <div ref={imageWrapperRef} className="relative w-full h-full scale-[1.03]">
          <Image
            src="/images/hero/hero_cover_pptx.webp"
            alt="Ash Mateu — Creative Direction & High Fashion Styling"
            fill
            priority
            unoptimized
            style={{
              objectFit: "cover",
              objectPosition: `${currentConfig.x}% ${currentConfig.y}%`,
              transform: `scale(${currentConfig.zoom / 100})`,
              transformOrigin: `${currentConfig.x}% ${currentConfig.y}%`,
              filter: `brightness(${currentConfig.brightness / 100}) contrast(1.04) saturate(1.05)`,
              transition: isLoaded
                ? "object-position 0.25s ease-out, transform 0.25s ease-out, filter 0.2s ease-out"
                : "none",
            }}
          />
        </div>

        {/* EDITORIAL GRADIENT OVERLAY (ONLY AT BOTTOM FOR CLEAN TEXT CONTRAST) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent md:from-black/70 md:via-transparent md:to-transparent pointer-events-none" />
      </div>

      {/* HERO OVERLAID CONTENT */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 pb-8 sm:pb-12 md:pb-20 pointer-events-none">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-10">
          <div
            ref={textRef}
            className="max-w-2xl text-white pointer-events-auto"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.08] sm:leading-[1.04] tracking-tight text-white mb-3 md:mb-4 drop-shadow-md">
              Styling <span className="italic font-light">people</span>,
              <br />
              <span className="italic font-light">brands</span> and{" "}
              <span className="italic font-light">ideas</span>
              <span className="text-[#EA2638]">.</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-light text-white tracking-wide mb-1">
              Ash Mateu Prieto
            </p>
            <p className="text-xs sm:text-sm md:text-base font-light text-white/80 tracking-wide mb-4 md:mb-6 max-w-xl leading-relaxed">
              Creative Director &amp; Fashion Consultant.
            </p>

            <blockquote className="border-l-2 border-[#b5a898] pl-3 md:pl-4 py-0.5 md:py-1 mb-6 md:mb-8 text-xs md:text-sm italic text-white/75 max-w-lg leading-relaxed backdrop-blur-[2px]">
              ‘Construyo identidad a través de estrategias de branding y
              comunicación. Soy especialista en posicionar imagen de marcas y
              personas.’
            </blockquote>

            {/* MINIMAL EDITORIAL ACTION LINKS (TEXT + ARROW ONLY) */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs tracking-[0.22em] uppercase font-medium pt-1">
              <Link
                href="/historia"
                className="group inline-flex items-center gap-1.5 text-white hover:text-[#b5a898] transition-colors duration-300 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium border-b border-white/40 hover:border-[#b5a898] pb-1"
              >
                <span>Mi Historia</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/como-trabajo"
                className="group inline-flex items-center gap-1.5 text-white/85 hover:text-white transition-colors duration-300 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium border-b border-white/30 hover:border-white pb-1"
              >
                <span>¿Cómo Trabajo?</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT BADGE: PARIS / NYC / BA & CLIENT HIGHLIGHT */}
          <div
            ref={badgeRef}
            className="flex flex-col items-start lg:items-end gap-3 text-white/80 pointer-events-auto"
          >
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[9.5px] tracking-[0.25em] uppercase font-medium shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b5a898] animate-pulse" />
              <span>Buenos Aires · Nueva York · París</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] tracking-[0.2em] uppercase text-white/60">
              <span>Haute Couture &amp; Celebrity Styling</span>
            </div>
          </div>
        </div>
      </div>

      {/* DISCRETE CALIBRATION SLIDER TOGGLE FOR EDITING (CORNER BUTTON) */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setShowCalibrator(!showCalibrator)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.16em] uppercase font-semibold transition-all duration-300 shadow-md ${
            showCalibrator
              ? "bg-[#b5a898] text-black"
              : "bg-black/60 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md border border-white/20"
          }`}
          title="Ajustar encuadre milimétrico de la portada"
        >
          <Sliders size={12} strokeWidth={2} />
          <span>{showCalibrator ? "Cerrar Ajustes" : "Ajustar Foto"}</span>
        </button>
      </div>

      {/* FLOATING LUXURY CALIBRATOR PANEL */}
      {showCalibrator && (
        <div className="absolute bottom-16 right-4 z-30 w-[310px] sm:w-[350px] bg-black/90 backdrop-blur-xl border border-white/25 p-5 rounded-2xl shadow-2xl text-white text-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#b5a898]" />
              <span className="font-serif text-sm tracking-wide text-white">
                Encuadre de Portada
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-1 text-white/50 hover:text-white transition-colors"
                title="Restablecer"
              >
                <RotateCcw size={13} />
              </button>
              <button
                onClick={handleCopy}
                className="p-1 text-white/50 hover:text-[#b5a898] transition-colors"
                title="Copiar código CSS"
              >
                {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* DESKTOP / MOBILE TABS */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/10 rounded-lg mb-4 text-[11px] font-medium tracking-wider uppercase">
            <button
              onClick={() => setActiveTab("desktop")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all ${
                activeTab === "desktop"
                  ? "bg-[#b5a898] text-black font-semibold shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Monitor size={12} />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setActiveTab("mobile")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all ${
                activeTab === "mobile"
                  ? "bg-[#b5a898] text-black font-semibold shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Smartphone size={12} />
              <span>Mobile</span>
            </button>
          </div>

          {/* CONTROLS */}
          <div className="space-y-4">
            {/* HORIZONTAL POSITION (X) */}
            <div>
              <div className="flex justify-between text-[11px] text-white/70 mb-1.5">
                <span>Posición Horizontal (X)</span>
                <span className="font-mono text-white">{editingConfig.x}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={editingConfig.x}
                onChange={(e) => updateFraming({ x: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#b5a898]"
              />
            </div>

            {/* VERTICAL POSITION (Y) */}
            <div>
              <div className="flex justify-between text-[11px] text-white/70 mb-1.5">
                <span>Posición Vertical (Y / Rostro)</span>
                <span className="font-mono text-white">{editingConfig.y}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={editingConfig.y}
                onChange={(e) => updateFraming({ y: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#b5a898]"
              />
            </div>

            {/* ZOOM (ESCALA) */}
            <div>
              <div className="flex justify-between text-[11px] text-white/70 mb-1.5">
                <span className="flex items-center gap-1">
                  <ZoomIn size={11} />
                  <span>Zoom / Escala</span>
                </span>
                <span className="font-mono text-white">{editingConfig.zoom}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="220"
                value={editingConfig.zoom}
                onChange={(e) => updateFraming({ zoom: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#b5a898]"
              />
              <div className="flex justify-between gap-1 mt-1.5">
                {zoomPresets.map((z) => (
                  <button
                    key={z}
                    onClick={() => updateFraming({ zoom: z })}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors ${
                      editingConfig.zoom === z
                        ? "bg-[#b5a898] text-black font-bold"
                        : "bg-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    {z}%
                  </button>
                ))}
              </div>
            </div>

            {/* BRIGHTNESS (BRILLO) */}
            <div>
              <div className="flex justify-between text-[11px] text-white/70 mb-1.5">
                <span className="flex items-center gap-1">
                  <Sun size={11} />
                  <span>Brillo</span>
                </span>
                <span className="font-mono text-white">
                  {editingConfig.brightness}%
                </span>
              </div>
              <input
                type="range"
                min="70"
                max="160"
                value={editingConfig.brightness}
                onChange={(e) =>
                  updateFraming({ brightness: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#b5a898]"
              />
              <div className="flex justify-between gap-1 mt-1.5">
                {brightnessPresets.map((b) => (
                  <button
                    key={b}
                    onClick={() => updateFraming({ brightness: b })}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors ${
                      editingConfig.brightness === b
                        ? "bg-[#b5a898] text-black font-bold"
                        : "bg-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    {b}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
