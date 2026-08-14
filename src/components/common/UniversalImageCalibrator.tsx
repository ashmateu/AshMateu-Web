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
  Crosshair,
  Sparkles,
  Trash2,
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

const STORAGE_KEY = "ash_universal_image_framings_v2";

export default function UniversalImageCalibrator() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedImgKey, setSelectedImgKey] = useState<string | null>(null);
  const [selectedImgElement, setSelectedImgElement] = useState<HTMLImageElement | null>(null);
  const [framings, setFramings] = useState<{ [srcKey: string]: ImageFraming }>({});
  const [currentConfig, setCurrentConfig] = useState<ImageFraming>(DEFAULT_FRAMING);
  const [copied, setCopied] = useState(false);

  // Helper to extract UNIQUE key from any Next.js Image or raw img src
  const getCleanKey = (img: HTMLImageElement | string): string => {
    let src = typeof img === "string" ? img : img.currentSrc || img.src || img.getAttribute("src") || "";
    
    if (!src) return "";

    try {
      const url = new URL(src, window.location.href);
      
      // If it's a Next.js optimized image (/_next/image?url=...&w=...&q=...)
      if (url.pathname.includes("/_next/image")) {
        const actualUrl = url.searchParams.get("url");
        if (actualUrl) {
          return decodeURIComponent(actualUrl);
        }
      }

      // If Next.js uses static chunks or direct public path
      const pathname = decodeURIComponent(url.pathname);
      return pathname;
    } catch {
      return src;
    }
  };

  // Load saved framings on mount and clean up corrupted old keys
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure no generic '/_next/image' key is polluting all images
        delete parsed["/_next/image"];
        delete parsed["/_next/image/"];
        setFramings(parsed);
      }
    } catch (e) {
      console.error("Error loading saved image framings:", e);
    }
  }, []);

  // Apply saved framings individually to each DOM image
  const applyAllFramings = useCallback(() => {
    const images = document.querySelectorAll<HTMLImageElement>("img");
    images.forEach((img) => {
      // Don't modify images inside the calibrator UI itself
      if (img.closest("#universal-calibrator-panel")) return;

      const key = getCleanKey(img);
      if (!key || key === "/_next/image") return;

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
    const interval = setInterval(applyAllFramings, 1200);
    return () => clearInterval(interval);
  }, [applyAllFramings]);

  // Click-to-calibrate individual image
  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove("calibrator-active");
      document.querySelectorAll("img[data-calibrating='true']").forEach((el) => {
        el.removeAttribute("data-calibrating");
      });
      return;
    }

    document.body.classList.add("calibrator-active");

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Ignore clicks inside calibrator panel or trigger button
      if (target.closest("#universal-calibrator-panel") || target.closest("#calibrator-trigger-btn")) {
        return;
      }

      const img = target.tagName === "IMG" ? (target as HTMLImageElement) : target.querySelector("img");

      if (img) {
        e.preventDefault();
        e.stopPropagation();

        // Remove active attribute from previous image
        document.querySelectorAll("img[data-calibrating='true']").forEach((el) => {
          el.removeAttribute("data-calibrating");
        });

        // Mark this specific image as currently being calibrated
        img.setAttribute("data-calibrating", "true");

        const srcKey = getCleanKey(img);
        if (!srcKey || srcKey === "/_next/image") return;

        setSelectedImgKey(srcKey);
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

  // Update framing in real-time ONLY for the selected individual image
  const updateFraming = (partial: Partial<ImageFraming>) => {
    if (!selectedImgKey || !selectedImgElement) return;

    const updated = { ...currentConfig, ...partial };
    setCurrentConfig(updated);

    // Apply strictly to the selected DOM element
    selectedImgElement.style.objectPosition = `${updated.x}% ${updated.y}%`;
    selectedImgElement.style.transform = `scale(${updated.zoom / 100})`;
    selectedImgElement.style.transformOrigin = `${updated.x}% ${updated.y}%`;
    if (updated.brightness !== 100) {
      selectedImgElement.style.filter = `brightness(${updated.brightness / 100})`;
    } else {
      selectedImgElement.style.filter = "";
    }

    // Persist individually with its unique path key
    const newFramings = { ...framings, [selectedImgKey]: updated };
    delete newFramings["/_next/image"];
    setFramings(newFramings);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFramings));
    } catch (e) {
      console.error("Error saving individual framing", e);
    }
  };

  const handleReset = () => {
    if (!selectedImgKey || !selectedImgElement) return;
    const resetConfig: ImageFraming = { x: 50, y: 15, zoom: 100, brightness: 100 };
    updateFraming(resetConfig);
  };

  const handleClearAll = () => {
    if (window.confirm("¿Restablecer el encuadre de todas las fotos a su estado original?")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("ash_universal_image_framings");
      setFramings({});
      setSelectedImgKey(null);
      setSelectedImgElement(null);
      window.location.reload();
    }
  };

  const handleCopy = () => {
    if (!selectedImgKey) return;
    const snippet = `/* Imagen: ${selectedImgKey} */\nobjectPosition: "${currentConfig.x}% ${currentConfig.y}%",\ntransform: "scale(${currentConfig.zoom / 100})",\nfilter: "brightness(${currentConfig.brightness / 100})"`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: "👤 Rostro Superior (10%)", x: 50, y: 10 },
    { label: "👗 Rostro / Busto (20%)", x: 50, y: 20 },
    { label: "🎯 Centro (50%)", x: 50, y: 50 },
    { label: "👠 Cuerpo Entero (15%)", x: 50, y: 15 },
  ];

  return (
    <>
      {/* GLOBAL STYLES FOR HIGHLIGHTING AND INDIVIDUAL TARGETING */}
      <style jsx global>{`
        body.calibrator-active img {
          outline: 2px dashed rgba(181, 168, 152, 0.7) !important;
          outline-offset: 2px !important;
          cursor: crosshair !important;
          transition: outline 0.2s ease, box-shadow 0.2s ease !important;
        }
        body.calibrator-active img:hover {
          outline: 3px solid #b5a898 !important;
          box-shadow: 0 0 20px rgba(181, 168, 152, 0.9) !important;
        }
        body.calibrator-active img[data-calibrating="true"] {
          outline: 3.5px solid #22c55e !important;
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.9) !important;
          animation: pulse-ring 2s infinite ease-in-out;
        }
        @keyframes pulse-ring {
          0%, 100% { outline-color: #22c55e; }
          50% { outline-color: #eab308; }
        }
      `}</style>

      {/* DISCREET FLOATING ACTIVATOR BUTTON */}
      <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2">
        <button
          id="calibrator-trigger-btn"
          onClick={() => {
            const next = !isEnabled;
            setIsEnabled(next);
            if (!next) {
              setSelectedImgKey(null);
              setSelectedImgElement(null);
            }
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10.5px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 shadow-2xl border cursor-pointer ${
            isEnabled
              ? "bg-[#0a0a0a] text-white border-white/40 ring-2 ring-[#22c55e] scale-105"
              : "bg-white/95 hover:bg-white text-black border-[#b5a898]/50 hover:border-black backdrop-blur-md"
          }`}
          title="Activar modo edición de encuadre foto por foto"
        >
          <Crosshair size={14} className={isEnabled ? "text-[#22c55e] animate-spin" : "text-black"} />
          <span>{isEnabled ? "Calibrando Foto Individual" : "📐 Centrar Fotos (Foto por Foto)"}</span>
        </button>

        {isEnabled && (
          <span className="hidden sm:inline-block bg-[#0a0a0a]/90 text-white text-[9.5px] px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
            {selectedImgKey ? "Ajustando foto seleccionada (borde verde)" : "👉 Hacé click sobre la foto que querés ajustar"}
          </span>
        )}
      </div>

      {/* FLOATING CALIBRATOR INSPECTOR PANEL */}
      {isEnabled && selectedImgKey && (
        <div
          id="universal-calibrator-panel"
          className="fixed bottom-20 left-5 z-50 w-[320px] sm:w-[360px] bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl shadow-2xl text-white animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[10.5px] tracking-[0.2em] uppercase font-bold text-white">
                Ajuste Individual de Foto
              </span>
            </div>
            <button
              onClick={() => {
                if (selectedImgElement) {
                  selectedImgElement.removeAttribute("data-calibrating");
                }
                setSelectedImgKey(null);
                setSelectedImgElement(null);
              }}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              title="Cerrar panel"
            >
              <X size={15} />
            </button>
          </div>

          {/* IMAGE PATH LABEL */}
          <div className="py-2.5 bg-white/5 px-3 rounded-lg my-2.5 border border-white/10">
            <span className="text-[8.5px] tracking-wider uppercase text-[#b5a898] font-semibold block mb-0.5">
              Archivo Activo:
            </span>
            <p className="text-[11px] text-white font-mono truncate font-medium">
              {selectedImgKey.split("/").pop()}
            </p>
          </div>

          {/* PRESETS BUTTONS */}
          <div className="grid grid-cols-2 gap-1.5 pb-2.5 mb-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => updateFraming({ x: p.x, y: p.y })}
                className="text-[9px] py-1.5 px-2.5 bg-white/5 hover:bg-white/15 text-white/90 rounded-md border border-white/10 hover:border-[#22c55e] transition-all text-left font-medium cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* SLIDERS CONTROLS */}
          <div className="space-y-3.5 py-1 text-xs">
            {/* POSICIÓN Y (VERTICAL - ROSTRO) */}
            <div>
              <div className="flex justify-between text-[10px] tracking-wider uppercase text-[#b5a898] mb-1 font-medium">
                <span>Altura / Rostro (Y)</span>
                <span className="text-white font-mono font-bold">{currentConfig.y}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={currentConfig.y}
                onChange={(e) => updateFraming({ y: Number(e.target.value) })}
                className="w-full accent-[#22c55e] cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-white/40 mt-0.5 font-mono">
                <span>Arriba (0%)</span>
                <span className="text-[#22c55e]">Rostro (10-20%)</span>
                <span>Abajo (100%)</span>
              </div>
            </div>

            {/* POSICIÓN X (HORIZONTAL) */}
            <div>
              <div className="flex justify-between text-[10px] tracking-wider uppercase text-[#b5a898] mb-1 font-medium">
                <span>Posición Horizontal (X)</span>
                <span className="text-white font-mono font-bold">{currentConfig.x}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={currentConfig.x}
                onChange={(e) => updateFraming({ x: Number(e.target.value) })}
                className="w-full accent-[#22c55e] cursor-pointer"
              />
            </div>

            {/* ESCALA / ZOOM */}
            <div>
              <div className="flex justify-between text-[10px] tracking-wider uppercase text-[#b5a898] mb-1 font-medium">
                <span className="flex items-center gap-1">
                  <ZoomIn size={11} />
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
                className="w-full accent-[#22c55e] cursor-pointer"
              />
            </div>

            {/* BRILLO */}
            <div>
              <div className="flex justify-between text-[10px] tracking-wider uppercase text-[#b5a898] mb-1 font-medium">
                <span className="flex items-center gap-1">
                  <Sun size={11} />
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
                className="w-full accent-[#22c55e] cursor-pointer"
              />
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2 mt-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-[9.5px] text-white/70 hover:text-white py-1.5 px-2.5 rounded border border-white/10 hover:border-white/30 cursor-pointer transition-colors"
                title="Restablecer esta foto"
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>

              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-1 text-[9.5px] text-red-400/70 hover:text-red-300 py-1.5 px-2 rounded border border-red-500/20 hover:border-red-500/40 cursor-pointer transition-colors"
                title="Borrar todos los ajustes guardados"
              >
                <Trash2 size={11} />
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase bg-[#b5a898] hover:bg-white text-black py-1.5 px-3.5 rounded-full shadow cursor-pointer transition-all active:scale-95"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? "¡Copiado!" : "Copiar CSS"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
