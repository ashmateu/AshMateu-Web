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
} from "lucide-react";
import gsap from "gsap";

interface FramingConfig {
  x: number;
  y: number;
  zoom: number;
  brightness: number;
}

const DEFAULT_DESKTOP: FramingConfig = {
  x: 50,
  y: 20,
  zoom: 100,
  brightness: 115,
};

// Optimally focused on the model's face for vertical mobile viewports
const DEFAULT_MOBILE: FramingConfig = {
  x: 70,
  y: 22,
  zoom: 100,
  brightness: 115,
};

export default function HeroCover() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");

  const [desktopFraming, setDesktopFraming] =
    useState<FramingConfig>(DEFAULT_DESKTOP);
  const [mobileFraming, setMobileFraming] =
    useState<FramingConfig>(DEFAULT_MOBILE);

  const [showCalibrator, setShowCalibrator] = useState(false);
  const [copied, setCopied] = useState(false);

  // Detect screen size and load saved configurations
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileScreen(mobile);
      setActiveTab(mobile ? "mobile" : "desktop");
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    // Load saved settings
    try {
      const savedDesk = localStorage.getItem("ash_hero_desktop_framing");
      if (savedDesk) {
        setDesktopFraming((prev) => ({ ...prev, ...JSON.parse(savedDesk) }));
      }
      const savedMob = localStorage.getItem("ash_hero_mobile_framing");
      if (savedMob) {
        setMobileFraming((prev) => ({ ...prev, ...JSON.parse(savedMob) }));
      }
    } catch (e) {
      console.error("Error loading saved framing configs", e);
    }

    return () => window.removeEventListener("resize", checkScreen);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroRef.current,
        { opacity: 0.85 },
        { opacity: 1, duration: 1.2 }
      )
        .fromTo(
          textRef.current?.children || [],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.16, duration: 1.2 },
          "-=0.9"
        )
        .fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        );
    });

    return () => ctx.revert();
  }, []);

  const zoomPresets = [90, 100, 115, 130, 150, 180];
  const brightnessPresets = [100, 110, 120, 130, 140];

  return (
    <section className="relative w-full h-[100svh] min-h-[660px] flex items-end overflow-hidden bg-[#0a0a0a]">
      {/* FULL-SCREEN HERO BACKGROUND IMAGE (4K UHD WITH SEPARATE MOBILE/DESKTOP FRAMING) */}
      <div ref={heroRef} className="absolute inset-0 w-full h-full">
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
            filter: `brightness(${currentConfig.brightness / 100}) contrast(1.03) saturate(1.04)`,
            transition:
              "object-position 0.1s ease-out, transform 0.1s ease-out, filter 0.15s ease-out",
          }}
        />
        {/* EDITORIAL VIGNETTE GRADIENT (DARKER TOWARDS BOTTOM TO ENSURE TEXT LEGIBILITY ON MOBILE) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 md:from-black/85 md:via-black/15 md:to-transparent pointer-events-none" />
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

            <p className="text-xs sm:text-sm md:text-base font-light text-white tracking-wide">
              Ash Mateu Prieto
            </p>
            <p className="text-xs sm:text-sm md:text-base font-light text-white/85 tracking-wide mb-4 md:mb-6 max-w-xl leading-relaxed">
              Creative Director &amp; Fashion Consultant.
            </p>

            <blockquote className="border-l-2 border-[#b5a898] pl-3 md:pl-4 py-0.5 md:py-1 mb-6 md:mb-8 text-xs md:text-sm italic text-white/75 max-w-lg leading-relaxed backdrop-blur-[2px]">
              ‘Construyo identidad a través de estrategias de branding y
              comunicación. Soy especialista en posicionar imagen de marcas y
              personas.’
            </blockquote>

            {/* BUTTON-IN-BUTTON NESTED ACTION LINKS */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs tracking-[0.2em] uppercase font-medium">
              <Link
                href="/historia"
                className="group inline-flex items-center gap-2.5 sm:gap-3 bg-white text-black pl-4 sm:pl-5 pr-2 py-1.5 sm:py-2 rounded-full font-semibold transition-all duration-300 hover:bg-[#b5a898] active:scale-[0.98] shadow-md text-[10.5px] sm:text-xs"
              >
                <span>Mi Historia</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={12} strokeWidth={2.2} />
                </div>
              </Link>
              <Link
                href="/como-trabajo"
                className="group inline-flex items-center gap-2.5 sm:gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 pl-4 sm:pl-5 pr-2 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 active:scale-[0.98] backdrop-blur-sm text-[10.5px] sm:text-xs"
              >
                <span>¿Cómo Trabajo?</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={12} strokeWidth={2.2} />
                </div>
              </Link>
            </div>
          </div>

          {/* LOCATIONS & CALIBRATOR TRIGGER BUTTON */}
          <div
            ref={badgeRef}
            className="flex flex-col items-start lg:items-end text-white/70 text-[9.5px] sm:text-[10px] tracking-[0.24em] uppercase gap-2 pointer-events-auto"
          >
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <span>Buenos Aires · Nueva York · París</span>
            </div>

            {/* ENCUADRE CALIBRATOR TOGGLE BUTTON */}
            <button
              onClick={() => setShowCalibrator(!showCalibrator)}
              className="mt-1 inline-flex items-center gap-1.5 bg-black/75 hover:bg-white text-white hover:text-black border border-white/40 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[9px] sm:text-[9.5px] tracking-[0.2em] uppercase font-medium transition-all backdrop-blur-md cursor-pointer shadow-xl active:scale-95"
            >
              <Sliders size={11} className="text-[#c9a84c]" />
              <span>
                {showCalibrator ? "Ocultar Calibrador" : "Ajustar Encuadre"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* LIVE ENCUADRE & LIGHTING CALIBRATOR PANEL (WITH MOBILE / DESKTOP SWITCHER) */}
      {showCalibrator && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#0a0a0a]/95 border border-white/25 text-white rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl w-84 max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto max-h-[85vh] overflow-y-auto">
          {/* HEADER & DEVICE TABS */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <Sliders size={13} className="text-[#c9a84c]" />
              <span className="text-[11px] font-semibold tracking-wider uppercase text-white">
                Ajuste de Encuadre
              </span>
            </div>
            <button
              onClick={() => setShowCalibrator(false)}
              className="text-white/50 hover:text-white text-xs p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* DEVICE SWITCHER (CELULAR VS ESCRITORIO) */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/5 rounded-xl mt-3 border border-white/10 text-[10px] tracking-wider uppercase font-medium">
            <button
              onClick={() => setActiveTab("mobile")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "mobile"
                  ? "bg-[#b5a898] text-black font-bold shadow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Smartphone size={12} />
              <span>Móvil ({isMobileScreen ? "Activo" : ""})</span>
            </button>
            <button
              onClick={() => setActiveTab("desktop")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "desktop"
                  ? "bg-[#b5a898] text-black font-bold shadow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Monitor size={12} />
              <span>Desktop ({!isMobileScreen ? "Activo" : ""})</span>
            </button>
          </div>

          <div className="space-y-3.5 py-3 text-xs">
            {/* POS X (HORIZONTAL) */}
            <div>
              <div className="flex justify-between text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1">
                <span>Posición Horizontal (X)</span>
                <span className="text-white font-mono">{editingConfig.x}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={editingConfig.x}
                onChange={(e) => updateFraming({ x: Number(e.target.value) })}
                className="w-full accent-[#b5a898] cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-white/40 mt-0.5">
                <span>Izquierda (0%)</span>
                <span>Centro (50%)</span>
                <span>Derecha (100%)</span>
              </div>
            </div>

            {/* POS Y (VERTICAL) */}
            <div>
              <div className="flex justify-between text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1">
                <span>Posición Vertical (Y)</span>
                <span className="text-white font-mono">{editingConfig.y}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={editingConfig.y}
                onChange={(e) => updateFraming({ y: Number(e.target.value) })}
                className="w-full accent-[#b5a898] cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-white/40 mt-0.5">
                <span>Arriba (0%)</span>
                <span>Centro (50%)</span>
                <span>Abajo (100%)</span>
              </div>
            </div>

            {/* ZOOM / SCALE */}
            <div>
              <div className="flex justify-between text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1">
                <span className="flex items-center gap-1">
                  <ZoomIn size={10} className="text-[#c9a84c]" />
                  <span>Escala / Zoom</span>
                </span>
                <span className="text-white font-mono font-bold">
                  {editingConfig.zoom}%
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="300"
                step="1"
                value={editingConfig.zoom}
                onChange={(e) =>
                  updateFraming({ zoom: Number(e.target.value) })
                }
                className="w-full accent-[#b5a898] cursor-pointer"
              />
              {/* QUICK ZOOM PRESETS */}
              <div className="flex items-center justify-between gap-1 mt-1.5">
                {zoomPresets.map((pz) => (
                  <button
                    key={pz}
                    onClick={() => updateFraming({ zoom: pz })}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-mono border transition-all cursor-pointer ${
                      editingConfig.zoom === pz
                        ? "bg-[#b5a898] text-black border-[#b5a898] font-bold"
                        : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {pz}%
                  </button>
                ))}
              </div>
            </div>

            {/* BRIGHTNESS CONTROL */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1">
                <span className="flex items-center gap-1">
                  <Sun size={10} className="text-[#c9a84c]" />
                  <span>Brillo</span>
                </span>
                <span className="text-white font-mono font-bold">
                  {editingConfig.brightness}%
                </span>
              </div>
              <input
                type="range"
                min="90"
                max="160"
                step="1"
                value={editingConfig.brightness}
                onChange={(e) =>
                  updateFraming({ brightness: Number(e.target.value) })
                }
                className="w-full accent-[#b5a898] cursor-pointer"
              />
              {/* QUICK BRIGHTNESS PRESETS */}
              <div className="flex items-center justify-between gap-1 mt-1.5">
                {brightnessPresets.map((pb) => (
                  <button
                    key={pb}
                    onClick={() => updateFraming({ brightness: pb })}
                    className={`px-2 py-0.5 rounded text-[8px] font-mono border transition-all cursor-pointer ${
                      editingConfig.brightness === pb
                        ? "bg-[#c9a84c] text-black border-[#c9a84c] font-bold"
                        : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {pb}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[9px] text-white/60 hover:text-white py-1 px-2 rounded border border-white/10 hover:border-white/30 cursor-pointer"
              title="Restablecer posición inicial"
            >
              <RotateCcw size={10} />
              <span>Reset</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold tracking-wider uppercase bg-[#b5a898] hover:bg-white text-black py-1.5 px-3 rounded-full shadow cursor-pointer transition-all active:scale-95"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              <span>{copied ? "¡Guardado!" : "Guardar"}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
