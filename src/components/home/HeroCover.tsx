"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sliders, Check, RotateCcw, Copy } from "lucide-react";
import gsap from "gsap";

export default function HeroCover() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Live framing state (persisted in localStorage)
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(20);
  const [zoom, setZoom] = useState(100);
  const [showCalibrator, setShowCalibrator] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedFraming = localStorage.getItem("ash_hero_new_framing");
    if (savedFraming) {
      try {
        const parsed = JSON.parse(savedFraming);
        if (parsed.x !== undefined) setPosX(parsed.x);
        if (parsed.y !== undefined) setPosY(parsed.y);
        if (parsed.zoom !== undefined) setZoom(parsed.zoom);
      } catch (e) {
        console.error("Error loading saved framing", e);
      }
    }
  }, []);

  const updateFraming = (x: number, y: number, z: number) => {
    setPosX(x);
    setPosY(y);
    setZoom(z);
    localStorage.setItem(
      "ash_hero_new_framing",
      JSON.stringify({ x, y, zoom: z })
    );
  };

  const handleReset = () => {
    updateFraming(50, 20, 100);
  };

  const handleCopy = () => {
    const code = `objectPosition: "${posX}% ${posY}%", transform: "scale(${zoom / 100})"`;
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

  return (
    <section className="relative w-full h-[100svh] min-h-[660px] flex items-end overflow-hidden bg-[#0a0a0a]">
      {/* FULL-SCREEN HERO BACKGROUND IMAGE WITH LIVE ADJUSTABLE FRAMING */}
      <div ref={heroRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero/hero_cover_pptx.webp"
          alt="Ash Mateu — Creative Direction & High Fashion Styling"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: `${posX}% ${posY}%`,
            transform: `scale(${zoom / 100})`,
            transformOrigin: `${posX}% ${posY}%`,
            transition: "object-position 0.1s ease-out, transform 0.1s ease-out",
          }}
          className="filter brightness-[0.94] contrast-[1.02]"
        />
        {/* EDITORIAL VIGNETTE GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 pointer-events-none" />
      </div>

      {/* HERO OVERLAID CONTENT */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-14 md:pb-20 pointer-events-none">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div ref={textRef} className="max-w-2xl text-white pointer-events-auto">
            {/* MICROSCOPIC EYEBROW BADGE WITH RED ACCENT DOT */}
            <div className="inline-flex items-center gap-2 border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[9.5px] tracking-[0.26em] uppercase text-[#b5a898] mb-4 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA2638] animate-pulse" />
              <span>Ash Mateu Prieto</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.04] tracking-tight text-white mb-4 drop-shadow-md">
              Styling <span className="italic font-light">people</span>,
              <br />
              <span className="italic font-light">brands</span> and{" "}
              <span className="italic font-light">ideas</span>
              <span className="text-[#EA2638]">.</span>
            </h1>

            <p className="text-sm md:text-base font-light text-white/85 tracking-wide mb-6 max-w-xl leading-relaxed">
              Creative Director &amp; Fashion Consultant.
            </p>

            <blockquote className="border-l-2 border-[#b5a898] pl-4 py-1 mb-8 text-xs md:text-sm italic text-white/75 max-w-lg leading-relaxed backdrop-blur-[2px]">
              ‘Construyo identidad a través de estrategias de branding y
              comunicación. Soy especialista en posicionar imagen de marcas y
              personas.’
            </blockquote>

            {/* BUTTON-IN-BUTTON NESTED ACTION LINKS */}
            <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.2em] uppercase font-medium">
              <Link
                href="/historia"
                className="group inline-flex items-center gap-3 bg-white text-black pl-5 pr-2 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-[#b5a898] active:scale-[0.98] shadow-md"
              >
                <span>Mi Historia</span>
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </div>
              </Link>
              <Link
                href="/como-trabajo"
                className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 pl-5 pr-2 py-2 rounded-full font-medium transition-all duration-300 active:scale-[0.98] backdrop-blur-sm"
              >
                <span>¿Cómo Trabajo?</span>
                <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </div>
              </Link>
            </div>
          </div>

          {/* LOCATIONS & CALIBRATOR TRIGGER BUTTON */}
          <div
            ref={badgeRef}
            className="flex flex-col items-start lg:items-end text-white/70 text-[10px] tracking-[0.24em] uppercase gap-2.5 pointer-events-auto"
          >
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <span>Buenos Aires · Nueva York · París</span>
            </div>

            {/* ENCUADRE CALIBRATOR TOGGLE BUTTON */}
            <button
              onClick={() => setShowCalibrator(!showCalibrator)}
              className="mt-2 inline-flex items-center gap-1.5 bg-black/75 hover:bg-white text-white hover:text-black border border-white/40 px-3.5 py-1.5 rounded-full text-[9.5px] tracking-[0.2em] uppercase font-medium transition-all backdrop-blur-md cursor-pointer shadow-xl active:scale-95"
            >
              <Sliders size={12} className="text-[#c9a84c]" />
              <span>{showCalibrator ? "Ocultar Calibrador" : "Ajustar Encuadre"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* LIVE ENCUADRE CALIBRATOR PANEL */}
      {showCalibrator && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a]/95 border border-white/25 text-white rounded-2xl p-5 shadow-2xl backdrop-blur-2xl w-80 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders size={14} className="text-[#c9a84c]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-white">
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

          <div className="space-y-4 py-4 text-xs">
            {/* POS X (HORIZONTAL) */}
            <div>
              <div className="flex justify-between text-[10px] tracking-wider uppercase text-[#b5a898] mb-1.5">
                <span>Posición Horizontal (X)</span>
                <span className="text-white font-mono">{posX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={posX}
                onChange={(e) =>
                  updateFraming(Number(e.target.value), posY, zoom)
                }
                className="w-full accent-[#b5a898] cursor-pointer"
              />
              <div className="flex justify-between text-[8.5px] text-white/40 mt-0.5">
                <span>Izquierda (0%)</span>
                <span>Centro (50%)</span>
                <span>Derecha (100%)</span>
              </div>
            </div>

            {/* POS Y (VERTICAL) */}
            <div>
              <div className="flex justify-between text-[10px] tracking-wider uppercase text-[#b5a898] mb-1.5">
                <span>Posición Vertical (Y)</span>
                <span className="text-white font-mono">{posY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={posY}
                onChange={(e) =>
                  updateFraming(posX, Number(e.target.value), zoom)
                }
                className="w-full accent-[#b5a898] cursor-pointer"
              />
              <div className="flex justify-between text-[8.5px] text-white/40 mt-0.5">
                <span>Arriba (0%)</span>
                <span>Centro (50%)</span>
                <span>Abajo (100%)</span>
              </div>
            </div>

            {/* ZOOM / SCALE */}
            <div>
              <div className="flex justify-between text-[10px] tracking-wider uppercase text-[#b5a898] mb-1.5">
                <span>Escala / Zoom</span>
                <span className="text-white font-mono">{zoom}%</span>
              </div>
              <input
                type="range"
                min="90"
                max="150"
                value={zoom}
                onChange={(e) =>
                  updateFraming(posX, posY, Number(e.target.value))
                }
                className="w-full accent-[#b5a898] cursor-pointer"
              />
              <div className="flex justify-between text-[8.5px] text-white/40 mt-0.5">
                <span>Alejar (90%)</span>
                <span>Normal (100%)</span>
                <span>Acercar (150%)</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[9.5px] text-white/60 hover:text-white py-1 px-2 rounded border border-white/10 hover:border-white/30 cursor-pointer"
              title="Restablecer posición inicial"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase bg-[#b5a898] hover:bg-white text-black py-1.5 px-3.5 rounded-full shadow cursor-pointer transition-all active:scale-95"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? "¡Guardado!" : "Guardar Ajuste"}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
