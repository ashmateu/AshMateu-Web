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
  Image as ImageIcon,
  Upload,
  Search,
  FolderOpen,
  CheckCircle2,
  Save,
  Download,
} from "lucide-react";
import catalogManifest from "@/lib/data/catalog_manifest.json";

interface SlotConfig {
  x: number;
  y: number;
  zoom: number;
  brightness: number;
  customSrc?: string;
  originalSrc?: string;
}

const DEFAULT_CONFIG: SlotConfig = {
  x: 50,
  y: 15,
  zoom: 100,
  brightness: 100,
};

const STORAGE_KEY = "ash_site_image_slots_v5_permanent";

// Deterministic DOM path generator - 100% stable across reloads
function getDomPath(el: HTMLElement): string {
  const stack: string[] = [];
  let curr: HTMLElement | null = el;
  while (curr && curr.tagName !== "BODY" && curr.tagName !== "HTML") {
    let sibIndex = 1;
    let sib: Element | null = curr;
    while ((sib = sib.previousElementSibling)) {
      if (sib.tagName === curr.tagName) sibIndex++;
    }
    const id = curr.id ? `#${curr.id}` : "";
    const tag = curr.tagName.toLowerCase();
    stack.unshift(id ? `${tag}${id}` : `${tag}:nth-of-type(${sibIndex})`);
    curr = curr.parentElement;
  }
  return stack.join(" > ");
}

export default function UniversalImageCalibrator() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"replace" | "framing">("replace");
  const [selectedSlotKey, setSelectedSlotKey] = useState<string | null>(null);
  const [selectedImgElement, setSelectedImgElement] = useState<HTMLImageElement | null>(null);
  const [slotConfigs, setSlotConfigs] = useState<{ [slotKey: string]: SlotConfig }>({});
  const [currentConfig, setCurrentConfig] = useState<SlotConfig>(DEFAULT_CONFIG);
  const [copied, setCopied] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      const isAllowed =
        host.includes("ashmateu-web.vercel.app") ||
        host.includes("localhost") ||
        host.includes("127.0.0.1") ||
        window.location.search.includes("editor=true");
      setIsEditorVisible(isAllowed);
    }
  }, []);

  // Gallery Picker States
  const [selectedCategory, setSelectedCategory] = useState<string>("portadas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customUrlInput, setCustomUrlInput] = useState<string>("");

  const categories = Object.keys(catalogManifest);

  // Clean canonical image URL
  const getCanonicalSrc = (img: HTMLImageElement | string): string => {
    let src = typeof img === "string" ? img : img.getAttribute("data-original-src") || img.currentSrc || img.src || img.getAttribute("src") || "";
    try {
      const url = new URL(src, window.location.href);
      if (url.pathname.includes("/_next/image")) {
        const actualUrl = url.searchParams.get("url");
        if (actualUrl) return decodeURIComponent(actualUrl);
      }
      return decodeURIComponent(url.pathname);
    } catch {
      return src;
    }
  };

  // Compute permanent slot key based on page path + DOM selector
  const getSlotKey = (img: HTMLImageElement): string => {
    let existingKey = img.getAttribute("data-ash-slot-key");
    if (existingKey) return existingKey;

    const page = typeof window !== "undefined" ? window.location.pathname : "/";
    const domPath = getDomPath(img);
    const key = `${page}::${domPath}`;
    img.setAttribute("data-ash-slot-key", key);
    return key;
  };

  // Forcibly apply image source and bypass Next.js srcset lock
  const applyImageSource = (img: HTMLImageElement, newSrc: string) => {
    try {
      img.removeAttribute("srcset");
      img.setAttribute("src", newSrc);
      img.setAttribute("srcset", newSrc);
      img.src = newSrc;
      img.srcset = newSrc;
      img.setAttribute("data-applied-src", newSrc);

      const picture = img.closest("picture");
      if (picture) {
        picture.querySelectorAll("source").forEach((source) => {
          source.removeAttribute("srcset");
          source.setAttribute("srcset", newSrc);
          source.srcset = newSrc;
        });
      }
    } catch (e) {
      console.error("Error applying image source", e);
    }
  };

  // Load saved slot configurations on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSlotConfigs(parsed);
      }
    } catch (e) {
      console.error("Error loading saved slot configurations:", e);
    }
  }, []);

  // Apply saved configurations strictly to their assigned DOM slots
  const applySlotConfigs = useCallback(() => {
    const images = document.querySelectorAll<HTMLImageElement>("img");
    images.forEach((img) => {
      if (img.closest("#universal-calibrator-panel")) return;

      // Remember original src before any modification
      if (!img.getAttribute("data-original-src")) {
        img.setAttribute("data-original-src", getCanonicalSrc(img));
      }

      const slotKey = getSlotKey(img);
      const config = slotConfigs[slotKey];

      if (config) {
        // Apply custom image replacement if saved
        if (config.customSrc && img.getAttribute("data-applied-src") !== config.customSrc) {
          applyImageSource(img, config.customSrc);
        }

        // Apply framing to this exact element only
        img.style.objectPosition = `${config.x}% ${config.y}%`;
        img.style.transform = `scale(${config.zoom / 100})`;
        img.style.transformOrigin = `${config.x}% ${config.y}%`;
        if (config.brightness !== 100) {
          img.style.filter = `brightness(${config.brightness / 100})`;
        } else {
          img.style.filter = "";
        }
      }
    });
  }, [slotConfigs]);

  useEffect(() => {
    applySlotConfigs();
    const interval = setInterval(applySlotConfigs, 600);
    return () => clearInterval(interval);
  }, [applySlotConfigs]);

  // Click-to-select individual image slot
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

      if (target.closest("#universal-calibrator-panel") || target.closest("#calibrator-trigger-btn")) {
        return;
      }

      const img = target.tagName === "IMG" ? (target as HTMLImageElement) : target.querySelector("img");

      if (img && !img.closest("#universal-calibrator-panel")) {
        e.preventDefault();
        e.stopPropagation();

        document.querySelectorAll("img[data-calibrating='true']").forEach((el) => {
          el.removeAttribute("data-calibrating");
        });

        img.setAttribute("data-calibrating", "true");

        const slotKey = getSlotKey(img);
        setSelectedSlotKey(slotKey);
        setSelectedImgElement(img);

        const existing = slotConfigs[slotKey] || {
          x: 50,
          y: 15,
          zoom: 100,
          brightness: 100,
          originalSrc: img.getAttribute("data-original-src") || getCanonicalSrc(img),
        };
        setCurrentConfig(existing);
      }
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, [isEnabled, slotConfigs]);

  // Update configuration for the selected image ONLY & SAVE IMMEDIATELY
  const updateSlot = (partial: Partial<SlotConfig>) => {
    if (!selectedSlotKey || !selectedImgElement) return;

    const original = selectedImgElement.getAttribute("data-original-src") || getCanonicalSrc(selectedImgElement);
    const updated: SlotConfig = { ...currentConfig, originalSrc: original, ...partial };
    setCurrentConfig(updated);

    // Apply replacement immediately to the active DOM element
    if (updated.customSrc) {
      applyImageSource(selectedImgElement, updated.customSrc);
    }

    // Apply framing styles directly
    selectedImgElement.style.objectPosition = `${updated.x}% ${updated.y}%`;
    selectedImgElement.style.transform = `scale(${updated.zoom / 100})`;
    selectedImgElement.style.transformOrigin = `${updated.x}% ${updated.y}%`;
    if (updated.brightness !== 100) {
      selectedImgElement.style.filter = `brightness(${updated.brightness / 100})`;
    } else {
      selectedImgElement.style.filter = "";
    }

    // Persist immediately to state & localStorage
    const newConfigs = { ...slotConfigs, [selectedSlotKey]: updated };
    setSlotConfigs(newConfigs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfigs));
      setSavedFeedback("💾 Guardado automáticamente");
      setTimeout(() => setSavedFeedback(null), 2500);
    } catch (e) {
      console.error("Error saving slot configuration:", e);
    }
  };

  // Replace image with a catalog image
  const handleSelectCatalogImage = (imgPath: string, imgName: string) => {
    updateSlot({ customSrc: imgPath });
    setSavedFeedback(`✅ Foto cambiada y guardada: ${imgName}`);
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  // Upload local file from device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateSlot({ customSrc: dataUrl });
        setSavedFeedback("✅ Foto de tu dispositivo guardada");
        setTimeout(() => setSavedFeedback(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetSlot = () => {
    if (!selectedSlotKey || !selectedImgElement) return;
    const newConfigs = { ...slotConfigs };
    delete newConfigs[selectedSlotKey];
    setSlotConfigs(newConfigs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfigs));
    } catch (e) {}
    window.location.reload();
  };

  const handleClearAll = () => {
    if (window.confirm("¿Restablecer todas las fotos y encuadres del sitio a su estado original?")) {
      localStorage.removeItem(STORAGE_KEY);
      setSlotConfigs({});
      setSelectedSlotKey(null);
      setSelectedImgElement(null);
      window.location.reload();
    }
  };

  const handleCopyCode = () => {
    const totalCustomSlots = Object.keys(slotConfigs).length;
    const dataStr = JSON.stringify(slotConfigs, null, 2);
    navigator.clipboard.writeText(dataStr);
    setCopied(true);
    setSavedFeedback(`📋 ${totalCustomSlots} cambios copiados al portapapeles`);
    setTimeout(() => {
      setCopied(false);
      setSavedFeedback(null);
    }, 3000);
  };

  // Filtered images in catalog picker
  const currentCategoryImages = (catalogManifest as Record<string, Array<{ name: string; path: string; label: string }>>)[selectedCategory] || [];
  const filteredCatalogImages = currentCategoryImages.filter((img) =>
    img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presets = [
    { label: "👤 Rostro Superior (10%)", x: 50, y: 10 },
    { label: "👗 Rostro / Busto (20%)", x: 50, y: 20 },
    { label: "🎯 Centro (50%)", x: 50, y: 50 },
    { label: "👠 Cuerpo Entero (15%)", x: 50, y: 15 },
  ];

  return (
    <>
      {/* GLOBAL STYLES FOR HIGHLIGHTING AND ISOLATED EDITING */}
      <style jsx global>{`
        body.calibrator-active img {
          outline: 2px dashed rgba(181, 168, 152, 0.7) !important;
          outline-offset: 2px !important;
          cursor: pointer !important;
          transition: outline 0.2s ease, box-shadow 0.2s ease !important;
        }
        body.calibrator-active img:hover {
          outline: 3px solid #b5a898 !important;
          box-shadow: 0 0 20px rgba(181, 168, 152, 0.9) !important;
        }
        body.calibrator-active img[data-calibrating="true"] {
          outline: 4px solid #22c55e !important;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.95) !important;
          animation: pulse-ring 2s infinite ease-in-out;
        }
        @keyframes pulse-ring {
          0%, 100% { outline-color: #22c55e; }
          50% { outline-color: #eab308; }
        }
      `}</style>

      {/* DISCREET FLOATING ACTIVATOR BUTTON (ONLY ON ashmateu-web.vercel.app / PREVIEW) */}
      {isEditorVisible && (
        <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2">
          <button
            id="calibrator-trigger-btn"
            onClick={() => {
              const next = !isEnabled;
              setIsEnabled(next);
              if (!next) {
                setSelectedSlotKey(null);
                setSelectedImgElement(null);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10.5px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 shadow-2xl border cursor-pointer ${
              isEnabled
                ? "bg-[#0a0a0a] text-white border-white/40 ring-2 ring-[#22c55e] scale-105"
                : "bg-white/95 hover:bg-white text-black border-[#b5a898]/50 hover:border-black backdrop-blur-md"
            }`}
            title="Modo edición: Cambiar fotos y encuadrar individualmente"
          >
            <Crosshair size={14} className={isEnabled ? "text-[#22c55e] animate-spin" : "text-black"} />
            <span>{isEnabled ? "Modo Editor Activo" : "🎨 Cambiar / Encuadrar Fotos"}</span>
          </button>

          {isEnabled && (
            <span className="hidden sm:inline-block bg-[#0a0a0a]/90 text-white text-[9.5px] px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-lg">
              {selectedSlotKey ? "Foto seleccionada (borde verde) lista para cambiar o encuadrar" : "👉 Hacé click sobre cualquier foto para cambiarla o ajustarla"}
            </span>
          )}
        </div>
      )}

      {/* FLOATING POWERFUL INSPECTOR & IMAGE REPLACER PANEL */}
      {isEnabled && selectedSlotKey && (
        <div
          id="universal-calibrator-panel"
          className="fixed bottom-20 left-5 z-50 w-[330px] sm:w-[380px] max-h-[85vh] flex flex-col bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl shadow-2xl text-white animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-3 border-b border-white/15 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[10.5px] tracking-[0.2em] uppercase font-bold text-white">
                Editor Individual de Foto
              </span>
            </div>
            <button
              onClick={() => {
                if (selectedImgElement) {
                  selectedImgElement.removeAttribute("data-calibrating");
                }
                setSelectedSlotKey(null);
                setSelectedImgElement(null);
              }}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              title="Cerrar panel"
            >
              <X size={15} />
            </button>
          </div>

          {/* MAIN TABS: CAMBIAR FOTO vs AJUSTAR ENCUADRE */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/10 rounded-lg my-3 shrink-0 text-[10.5px] font-semibold tracking-wider uppercase">
            <button
              type="button"
              onClick={() => setActiveTab("replace")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === "replace"
                  ? "bg-[#22c55e] text-black font-bold shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <ImageIcon size={12} />
              <span>1. Cambiar Foto</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("framing")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === "framing"
                  ? "bg-[#22c55e] text-black font-bold shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Sliders size={12} />
              <span>2. Encuadre (X/Y)</span>
            </button>
          </div>

          {/* REALTIME STATUS / FEEDBACK */}
          {savedFeedback && (
            <div className="bg-[#22c55e]/20 border border-[#22c55e] text-[#22c55e] text-[10px] py-1.5 px-3 rounded-lg mb-2 flex items-center gap-1.5 font-medium animate-in fade-in">
              <CheckCircle2 size={13} />
              <span className="truncate">{savedFeedback}</span>
            </div>
          )}

          {/* TAB 1: CAMBIAR FOTO POR OTRA DEL CATÁLOGO O LOCAL */}
          {activeTab === "replace" && (
            <div className="overflow-y-auto space-y-3 pr-1 py-1 text-xs custom-scrollbar">
              {/* UPLOAD LOCAL FILE */}
              <div className="p-3 bg-white/5 border border-white/15 rounded-xl text-center hover:border-[#22c55e] transition-colors">
                <label className="flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:text-[#22c55e] transition-colors">
                  <Upload size={18} className="text-[#22c55e]" />
                  <span className="text-[10.5px] font-semibold tracking-wider uppercase text-white">
                    Subir foto desde tu dispositivo
                  </span>
                  <span className="text-[8.5px] text-white/50">Toca aquí para elegir foto JPG, PNG, WebP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* CATEGORY SELECTOR */}
              <div>
                <div className="flex justify-between items-center text-[9.5px] tracking-wider uppercase text-[#b5a898] mb-1 font-medium">
                  <span className="flex items-center gap-1">
                    <FolderOpen size={10} />
                    <span>Carpetas del Catálogo:</span>
                  </span>
                  <span className="text-white/60">({currentCategoryImages.length} fotos)</span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 text-white rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-[#22c55e] cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      📁 {cat} ({((catalogManifest as Record<string, Array<{ name: string; path: string; label: string }>>)[cat] || []).length})
                    </option>
                  ))}
                </select>
              </div>

              {/* SEARCH IN CATEGORY */}
              <div className="relative">
                <Search size={11} className="absolute left-2.5 top-2.5 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar foto por nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 text-white rounded-lg pl-7 pr-2.5 py-1.5 text-[10px] focus:outline-none focus:border-[#22c55e]"
                />
              </div>

              {/* THUMBNAILS GRID PICKER */}
              <div className="grid grid-cols-3 gap-2 max-h-[190px] overflow-y-auto p-1.5 bg-black/50 rounded-xl border border-white/10">
                {filteredCatalogImages.map((img) => {
                  const isCurrent = currentConfig.customSrc === img.path || selectedImgElement?.getAttribute("src")?.includes(img.name);
                  return (
                    <button
                      key={img.path}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSelectCatalogImage(img.path, img.name);
                      }}
                      className={`group relative aspect-[3/4] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        isCurrent
                          ? "border-[#22c55e] ring-2 ring-[#22c55e] scale-95"
                          : "border-white/15 hover:border-white/60"
                      }`}
                      title={`Tocar para aplicar: ${img.name}`}
                    >
                      <img
                        src={img.path}
                        alt={img.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#22c55e]/25 flex items-center justify-center">
                          <CheckCircle2 size={18} className="text-[#22c55e] drop-shadow-md" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* CUSTOM URL INPUT */}
              <div className="pt-1">
                <span className="text-[9px] tracking-wider uppercase text-white/60 block mb-1">
                  O pegar URL / ruta de imagen:
                </span>
                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="https://... o /images/..."
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 bg-[#141414] border border-white/15 text-white rounded-lg px-2 py-1 text-[10px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customUrlInput.trim()) {
                        handleSelectCatalogImage(customUrlInput.trim(), "URL Personalizada");
                        setCustomUrlInput("");
                      }
                    }}
                    className="bg-[#22c55e] text-black px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase cursor-pointer hover:bg-white transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AJUSTAR ENCUADRE */}
          {activeTab === "framing" && (
            <div className="overflow-y-auto space-y-3.5 pr-1 py-1 text-xs custom-scrollbar">
              {/* PRESETS BUTTONS */}
              <div className="grid grid-cols-2 gap-1.5 pb-1">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => updateSlot({ x: p.x, y: p.y })}
                    className="text-[9px] py-1.5 px-2 bg-white/5 hover:bg-white/15 text-white/90 rounded border border-white/10 hover:border-[#22c55e] transition-all text-left font-medium cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

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
                  onChange={(e) => updateSlot({ y: Number(e.target.value) })}
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
                  onChange={(e) => updateSlot({ x: Number(e.target.value) })}
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
                  onChange={(e) => updateSlot({ zoom: Number(e.target.value) })}
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
                  onChange={(e) => updateSlot({ brightness: Number(e.target.value) })}
                  className="w-full accent-[#22c55e] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2 mt-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleResetSlot}
                className="inline-flex items-center gap-1 text-[9.5px] text-white/70 hover:text-white py-1.5 px-2.5 rounded border border-white/10 hover:border-white/30 cursor-pointer transition-colors"
                title="Restablecer foto y posición original de este cuadro"
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1 text-[9.5px] text-red-400/70 hover:text-red-300 py-1.5 px-2 rounded border border-red-500/20 hover:border-red-500/40 cursor-pointer transition-colors"
                title="Restablecer todas las fotos del sitio"
              >
                <Trash2 size={11} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase bg-[#b5a898] hover:bg-white text-black py-1.5 px-3.5 rounded-full shadow cursor-pointer transition-all active:scale-95"
              title="Copiar todos los cambios realizados"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? "¡Copiado!" : "Exportar Todo"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
