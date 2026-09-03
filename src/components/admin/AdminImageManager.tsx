"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SiteImageConfig } from "@/lib/site-images";
import { Sliders, Check, RotateCcw, Crosshair, ZoomIn, Sun, Link2, Sparkles } from "lucide-react";

interface Props {
  initialImages: SiteImageConfig[];
}

export default function AdminImageManager({ initialImages }: Props) {
  const [images, setImages] = useState<SiteImageConfig[]>(initialImages);
  const [selectedId, setSelectedId] = useState<string>(initialImages[0]?.id || "");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const activeImage = images.find((img) => img.id === selectedId) || images[0];

  const updateActiveConfig = (updates: Partial<SiteImageConfig>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === activeImage.id ? { ...img, ...updates } : img))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeImage),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`✦ Encuadre guardado para "${activeImage.label}"`);
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        alert(data.error || "No se pudo guardar.");
      }
    } catch (e) {
      alert("Error al conectar con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  const centerImage = () => {
    updateActiveConfig({ objectPositionX: 50, objectPositionY: 50 });
  };

  const focusFaceTop = () => {
    updateActiveConfig({ objectPositionX: 50, objectPositionY: 20 });
  };

  const resetDefault = () => {
    updateActiveConfig({
      objectPositionX: 50,
      objectPositionY: 50,
      zoom: 100,
      brightness: 100,
    });
  };

  return (
    <div className="space-y-8">
      {/* SELECCIONADOR DE IMAGEN POR SECCIÓN */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-black/10">
        {images.map((img) => {
          const isSelected = img.id === activeImage.id;
          return (
            <button
              key={img.id}
              onClick={() => setSelectedId(img.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all ${
                isSelected
                  ? "bg-[#0A0A0A] text-white font-medium shadow-sm"
                  : "bg-white/80 border border-black/10 text-[#0A0A0A]/70 hover:bg-black/5"
              }`}
            >
              <span className="text-[9px] block text-[#B5A898] tracking-widest">{img.section}</span>
              <span>{img.label}</span>
            </button>
          );
        })}
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* PANEL DE CONTROL EN DOS COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUMNA IZQUIERDA: VISOR INTERACTIVO EN VIVO */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-3 rounded-[2.5rem] bg-black/[0.02] border border-black/10">
            <div className="p-6 rounded-[calc(2.5rem-0.625rem)] bg-white border border-black/[0.06] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5A] font-semibold">
                    {activeImage.section}
                  </span>
                  <h3 className="font-serif text-lg text-[#0A0A0A]">
                    {activeImage.label}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#7A6A5A]">
                  <span>X: {activeImage.objectPositionX}%</span>
                  <span>·</span>
                  <span>Y: {activeImage.objectPositionY}%</span>
                  <span>·</span>
                  <span>Zoom: {activeImage.zoom}%</span>
                </div>
              </div>

              {/* CONTENEDOR CON ENCUADRE DINÁMICO */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-black/10">
                <Image
                  src={activeImage.src}
                  alt={activeImage.label}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: `${activeImage.objectPositionX}% ${activeImage.objectPositionY}%`,
                    transform: `scale(${activeImage.zoom / 100})`,
                    filter: `brightness(${activeImage.brightness / 100})`,
                    transition: "object-position 0.15s ease, transform 0.15s ease, filter 0.15s ease",
                  }}
                />

                {/* CRUZ DE GUÍA EN EL CENTRO (OPCIONAL DE VISIÓN) */}
                <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-white border-dashed border-t" />
                  <div className="h-full w-[1px] bg-white border-dashed border-l absolute" />
                </div>
              </div>

              {/* BOTONES RÁPIDOS */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/10">
                <button
                  type="button"
                  onClick={centerImage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/15 text-xs font-medium hover:bg-black/5 transition-colors"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Centrar (50% 50%)</span>
                </button>

                <button
                  type="button"
                  onClick={focusFaceTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/15 text-xs font-medium hover:bg-black/5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enfocar Superior (50% 20%)</span>
                </button>

                <button
                  type="button"
                  onClick={resetDefault}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/15 text-xs font-medium hover:bg-black/5 transition-colors text-[#7A6A5A]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: DESLIZADORES DE CONTROL Y URL */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 md:p-8 rounded-[2rem] bg-white border border-black/10 space-y-6 shadow-sm">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0A0A0A] border-b border-black/10 pb-3">
              Ajustes de Encuadre & Posición
            </h4>

            {/* SLIDER POSICIÓN X */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#7A6A5A] uppercase tracking-wider font-medium">
                  Posición Horizontal (X)
                </span>
                <span className="font-mono text-[#0A0A0A]">{activeImage.objectPositionX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={activeImage.objectPositionX}
                onChange={(e) => updateActiveConfig({ objectPositionX: Number(e.target.value) })}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#7A6A5A]">
                <span>← Izquierda (0%)</span>
                <span>Centro (50%)</span>
                <span>Derecha (100%) →</span>
              </div>
            </div>

            {/* SLIDER POSICIÓN Y */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#7A6A5A] uppercase tracking-wider font-medium">
                  Posición Vertical (Y)
                </span>
                <span className="font-mono text-[#0A0A0A]">{activeImage.objectPositionY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={activeImage.objectPositionY}
                onChange={(e) => updateActiveConfig({ objectPositionY: Number(e.target.value) })}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#7A6A5A]">
                <span>↑ Arriba (0%)</span>
                <span>Centro (50%)</span>
                <span>Abajo (100%) ↓</span>
              </div>
            </div>

            {/* SLIDER ZOOM */}
            <div className="space-y-2 pt-2 border-t border-black/10">
              <div className="flex justify-between text-xs">
                <span className="text-[#7A6A5A] uppercase tracking-wider font-medium">
                  Escala / Zoom
                </span>
                <span className="font-mono text-[#0A0A0A]">{activeImage.zoom}%</span>
              </div>
              <input
                type="range"
                min="100"
                max="200"
                step="5"
                value={activeImage.zoom}
                onChange={(e) => updateActiveConfig({ zoom: Number(e.target.value) })}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
            </div>

            {/* SLIDER BRILLO */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#7A6A5A] uppercase tracking-wider font-medium">
                  Brillo / Luminosidad
                </span>
                <span className="font-mono text-[#0A0A0A]">{activeImage.brightness}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="140"
                value={activeImage.brightness}
                onChange={(e) => updateActiveConfig({ brightness: Number(e.target.value) })}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
            </div>

            {/* CAMBIAR URL DE LA IMAGEN */}
            <div className="pt-2 border-t border-black/10">
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1.5 font-medium">
                URL o Ruta de la Imagen
              </label>
              <input
                type="text"
                value={activeImage.src}
                onChange={(e) => updateActiveConfig({ src: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-xs font-mono bg-[#F7F3EE]/40 focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
              <span className="text-[10px] text-[#7A6A5A] mt-1 block">
                Podés pegar cualquier link HTTPS o ruta local como /images/...
              </span>
            </div>

            {/* BOTÓN GUARDAR */}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3.5 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#7A6A5A] active:scale-[0.98] transition-all shadow-md disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar Cambios de Esta Foto"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
