"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sliders,
  X,
  RotateCcw,
  Copy,
  Check,
  ZoomIn,
  Sun,
  Eye,
  Crosshair,
  Sparkles,
} from "lucide-react";

interface ImageFraming {
  x: number;
  y: number;
  zoom: number;
  brightness: number;
}

const DEFAULT_FRAMING: ImageFraming = {
  x: 50,
  y: 15,
  zoom: 100,
  brightness: 100,
};

const STORAGE_KEY = "ash_universal_image_framings";

export default function UniversalImageCalibrator() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedImgSrc, setSelectedImgSrc] = useState<string | null>(null);
  const [selectedImgElement, setSelectedImgElement] = useState<HTMLImageElement | null>(null);
  const [framings, setFramings] = useState<{ [srcKey: string]: ImageFraming }>({});
  const [currentConfig, setCurrentConfig] = useState<ImageFraming>(DEFAULT_FRAMING);
  const [copied, setCopied] = useState(false);

  // Helper to extract clean key from img src
  const getCleanKey = (src: string): string => {
    try {
      const url = new URL(src, window.location.href);
      return decodeURIComponent(url.pathname);
    } catch {
      return src;
    }
  };

  // Load saved framings on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFramings(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading saved image framings:", e);
    }
  }, []);

  // Apply saved framings to all DOM images
  const applyAllFramings = useCallback(() => {
    const images = document.querySelectorAll<HTMLImageElement>("img");
    images.forEach((img) => {
      const key = getCleanKey(img.currentSrc || img.src);
      const framing = framings[key];
      if (framing) {
        img.style.objectPosition = `${framing.x}% ${framing.y}%`;
        img.style.transform = `scale(${framing.zoom / 100})`;
        img.style.transformOrigin = `${framing.x}% ${framing.y}%`;
        if (framing.brightness !== 100) {
          img.style.filter = `brightness(${framing.brightness / 100})`;
        }
      }
    });
  }, [framings]);

  useEffect(() => {
    applyAllFramings();
    const interval = setInterval(applyAllFramings, 1500);
    return () => clearInterval(interval);
  }, [applyAllFramings]);

  // Click-to-calibrate interceptor when enabled
  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove("calibrator-active");
      return;
    }

    document.body.classList.add("calibrator-active");

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const img = target.tagName === "IMG" ? (target as HTMLImageElement) : target.querySelector("img");

      if (img && !target.closest("#universal-calibrator-panel")) {
        e.preventDefault();
        e.stopPropagation();

        const srcKey = getCleanKey(img.currentSrc || img.src);
        setSelectedImgSrc(srcKey);
        setSelectedImgElement(img);

        const existing = framings[srcKey] || {
          x: 50,
          y: 15,
          zoom: 100,
          brightness: 100,
        };
        setCurrentConfig(existing);
      }
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, [isEnabled, framings]);

  // Update framing in real-time
  const updateFraming = (partial: Partial<ImageFraming>) => {
    if (!selectedImgSrc || !selectedImgElement) return;

    const updated = { ...currentConfig, ...partial };
    setCurrentConfig(updated);

    // Update element instantly in DOM
    selectedImgElement.style.objectPosition = `${updated.x}% ${updated.y}%`;
    selectedImgElement.style.transform = `scale(${updated.zoom / 100})`;
    selectedImgElement.style.transformOrigin = `${updated.x}% ${updated.y}%`;
    if (updated.brightness !== 100) {
      selectedImgElement.style.filter = `brightness(${updated.brightness / 100})`;
    } else {
      selectedImgElement.style.filter = "";
    }

    // Persist to state & localStorage
    const newFramings = { ...framings, [selectedImgSrc]: updated };
    setFramings(newFramings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFramings));
    } catch (e) {
      console.error("Error saving framing", e);
    }
  };

  const handleReset = () => {
    if (!selectedImgSrc || !selectedImgElement) return;
    const resetConfig: ImageFraming = { x: 50, y: 15, zoom: 100, brightness: 100 };
    updateFraming(resetConfig);
  };

  const handleCopy = () => {
    if (!selectedImgSrc) return;
    const snippet = `/* ${selectedImgSrc} */\nobjectPosition: "${currentConfig.x}% ${currentConfig.y}%",\ntransform: "scale(${currentConfig.zoom / 100})",\nfilter: "brightness(${currentConfig.brightness / 100})"`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: "👤 Rostro Superior", x: 50, y: 12 },
    { label: "👗 Rostro / Busto", x: 50, y: 22 },
    { label: "🎯 Centro", x: 50, y: 50 },
    { label: "👠 Cuerpo Entero", x: 50, y: 15 },
  ];

  return (
    <>
      {/* GLOBAL STYLES WHEN CALIBRATOR IS ACTIVE */}
      <style jsx global>{`
        body.calibrator-active img {
          outline: 2px dashed #b5a898 !important;
          outline-offset: 2px !important;
          cursor: crosshair !important;
          transition: outline 0.2s ease !important;
        }
        body.calibrator-active img:hover {
          outline: 3px solid #000000 !important;
          box-shadow: 0 0 15px rgba(181, 168, 152, 0.8) !important;
        }
      `}</style>

      {/* DISCREET FLOATING ACTIVATOR BUTTON */}
      <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            const next = !isEnabled;
            setIsEnabled(next);
            if (!next) {
              setSelectedImgSrc(null);
              setSelectedImgElement(null);
            }
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 shadow-xl border cursor-pointer ${
            isEnabled
              ? "bg-[#0a0a0a] text-white border-white/30 ring-2 ring-[#b5a898] scale-105"
              : "bg-white/90 hover:bg-white text-black border-[#b5a898]/40 hover:border-black backdrop-blur-md"
          }`}
          title="Activar modo edición de encuadre para todas las fotos del sitio"
        >
          <Crosshair size={13} className={isEnabled ? "text-[#b5a898] animate-spin" : ""} />
          <span>{isEnabled ? "Modo Calibrador Activo" : "📐 Centrar / Encuadrar Fotos"}</span>
        </button>

        {isEnabled && (
          <span className="hidden sm:inline-block bg-[#0a0a0a]/90 text-[#b5a898] text-[9.5px] px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
            Hacé click en cualquier imagen para ajustarla
          </span>
        )}
      </div>

      {/* FLOATING CALIBRATOR INSPECTOR PANEL */}
      {isEnabled && selectedImgSrc && (
        <div
          id="universal-calibrator-panel"
          className="fixed bottom-20 left-5 z-50 w-[320px] sm:w-[350px] bg-[#0a0a0a]/96 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl shadow-2xl text-white animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <div className="flex items-center gap-2">
              <Sliders size={13} className="text-[#b5a898]" />
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white">
                Ajustar Encuadre
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedImgSrc(null);
                setSelectedImgElement(null);
              }}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* IMAGE PATH LABEL */}
          <div className="py-2">
            <span className="text-[8.5px] tracking-wider uppercase text-[#b5a898] block">
              Foto Seleccionada:
            </span>
            <p className="text-[10px] text-white/80 font-mono truncate">
              {selectedImgSrc.split("/").pop()}
            </p>
          </div>

          {/* PRESETS BUTTONS */}
          <div className="grid grid-cols-2 gap-1.5 py-2 border-y border-white/10 my-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => updateFraming({ x: p.x, y: p.y })}
                className="text-[9px] py-1.5 px-2 bg-white/5 hover:bg-white/15 text-white/90 rounded border border-white/10 hover:border-[#b5a898] transition-all text-left font-medium"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* SLIDERS CONTROLS */}
          <div className="space-y-3 py-1 text-xs">
            {/* POSICIÓN Y (VERTICAL - ROSTRO) */}
            <div>
              <div className="flex justify-between text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1">
                <span>Posición Vertical (Rostro / Altura)</span>
                <span className="text-white font-mono font-bold">{currentConfig.y}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={currentConfig.y}
                onChange={(e) => updateFraming({ y: Number(e.target.value) })}
                className="w-full accent-[#b5a898] cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-white/40 mt-0.5 font-mono">
                <span>Arriba (0%)</span>
                <span>Rostro (15%)</span>
                <span>Abajo (100%)</span>
              </div>
            </div>

            {/* POSICIÓN X (HORIZONTAL) */}
            <div>
              <div className="flex justify-between text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1">
                <span>Posición Horizontal (X)</span>
                <span className="text-white font-mono font-bold">{currentConfig.x}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={currentConfig.x}
                onChange={(e) => updateFraming({ x: Number(e.target.value) })}
                className="w-full accent-[#b5a898] cursor-pointer"
              />
            </div>

            {/* ESCALA / ZOOM */}
            <div>
              <div className="flex justify-between text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1">
                <span className="flex items-center gap-1">
                  <ZoomIn size={10} />
                  <span>Zoom / Escala</span>
                </span>
                <span className="text-white font-mono font-bold">{currentConfig.zoom}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="250"
                value={currentConfig.zoom}
                onChange={(e) => updateFraming({ zoom: Number(e.target.value) })}
                className="w-full accent-[#b5a898] cursor-pointer"
              />
            </div>

            {/* BRILLO */}
            <div>
              <div className="flex justify-between text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1">
                <span className="flex items-center gap-1">
                  <Sun size={10} />
                  <span>Brillo</span>
                </span>
                <span className="text-white font-mono font-bold">{currentConfig.brightness}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="150"
                value={currentConfig.brightness}
                onChange={(e) => updateFraming({ brightness: Number(e.target.value) })}
                className="w-full accent-[#b5a898] cursor-pointer"
              />
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2 mt-2">
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
              <span>{copied ? "¡Copiado!" : "Copiar CSS"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
