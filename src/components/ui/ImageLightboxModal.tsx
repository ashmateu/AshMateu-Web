"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

interface ImageLightboxModalProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightboxModal({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotografía en alta resolución"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* TOP HEADER CONTROLS */}
      <div
        className="absolute top-0 inset-x-0 p-6 flex items-center justify-between z-20 text-white pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#b5a898] uppercase tracking-widest">
            {currentIndex + 1} / {images.length}
          </span>
          {currentImage.title && (
            <span className="font-serif text-sm md:text-base text-white/90 font-light border-l border-white/20 pl-3">
              {currentImage.title}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar visor"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
        >
          <X size={18} />
        </button>
      </div>

      {/* PREVIOUS BUTTON */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          type="button"
          aria-label="Fotografía anterior"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 shadow-lg"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* NEXT BUTTON */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          type="button"
          aria-label="Siguiente fotografía"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 shadow-lg"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* CENTRAL HIGH-RES IMAGE */}
      <div
        className="relative w-[90vw] h-[78vh] md:w-[85vw] md:h-[82vh] max-w-6xl max-h-[900px] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt || currentImage.title || "Editorial Photography"}
          fill
          sizes="95vw"
          className="object-contain select-none"
          priority
        />
      </div>

      {/* BOTTOM CAPTION */}
      {currentImage.caption && (
        <div
          className="absolute bottom-6 inset-x-0 text-center px-6 pointer-events-none z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-sans text-xs md:text-sm text-white/75 font-light max-w-xl mx-auto bg-black/60 backdrop-blur-md py-2 px-4 rounded-full border border-white/10 inline-block">
            {currentImage.caption}
          </p>
        </div>
      )}
    </div>
  );
}
