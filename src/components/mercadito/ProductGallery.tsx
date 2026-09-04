"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = images?.length || 0;

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay cada 2 segundos (2000ms)
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, 2000);

    return () => clearInterval(timer);
  }, [total, isPaused, goToNext, currentIndex]);

  // Soporte de teclado (flechas izquierda y derecha)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  // Soporte gestos táctiles (swipe móvil)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    touchStartX.current = null;
  };

  if (!images || total === 0) return null;

  const activeImage = images[currentIndex] || images[0];

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* IMAGEN PRINCIPAL (Double-Bezel con navegación y autoplay) */}
      <div className="p-2 rounded-[2.5rem] bg-black/[0.02] border border-black/10 shadow-xs">
        <div
          className="relative aspect-[4/5] w-full rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            key={activeImage}
            src={activeImage}
            alt={`${productName} — Vista ${currentIndex + 1} de ${total}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-opacity duration-500 ease-in-out animate-in fade-in"
          />

          {/* CONTROLES DE NAVEGACIÓN (IR Y VENIR) */}
          {total > 1 && (
            <>
              {/* Botón Anterior */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                aria-label="Ver imagen anterior"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-[#0A0A0A] backdrop-blur-md border border-black/10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 z-20 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Botón Siguiente */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Ver imagen siguiente"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-[#0A0A0A] backdrop-blur-md border border-black/10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 z-20 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* INDICADOR NUMÉRICO & DOTS */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-md">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Ir a foto ${idx + 1}`}
                    className="p-1 -m-1 cursor-pointer"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-5 h-1.5 bg-[#EA2638]"
                          : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* BADGE CONTADOR EN ESQUINA SUPERIOR */}
              <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-white/90">
                {currentIndex + 1} / {total}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MINIATURAS INTERACTIVAS */}
      {total > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 cursor-pointer ${
                  isSelected
                    ? "border-[#0A0A0A] scale-105 shadow-md ring-2 ring-[#EA2638]/40"
                    : "border-black/10 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} vista ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
