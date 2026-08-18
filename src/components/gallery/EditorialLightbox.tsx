"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MessageCircle, Sparkles, MapPin, Calendar, Layers } from "lucide-react";
import { Project } from "@/lib/data/projects";

interface EditorialLightboxProps {
  project: Project | null;
  initialImageIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditorialLightbox({
  project,
  initialImageIndex = 0,
  isOpen,
  onClose,
}: EditorialLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [initialImageIndex, project]);

  const images = project?.images && project.images.length > 0 ? project.images : project ? [project.coverImage] : [];
  const total = images.length;

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !project) return null;

  const currentImage = images[currentIndex] || project.coverImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl transition-all duration-300 select-none">
      
      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-30 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#b5a898] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
            {project.category}
          </span>
          <span className="hidden sm:inline-block text-white/50 text-xs font-light">
            {project.client}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {total > 1 && (
            <span className="text-white/80 font-mono text-xs bg-white/10 px-3 py-1 rounded-full border border-white/15">
              {currentIndex + 1} / {total}
            </span>
          )}
          <button
            onClick={onClose}
            type="button"
            aria-label="Cerrar visor"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* MAIN STAGE / IMAGE CONTAINER */}
      <div className="relative w-full h-full max-w-[1400px] max-h-[85vh] mx-auto p-4 sm:p-10 flex items-center justify-center">
        <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
          <Image
            key={currentImage}
            src={currentImage}
            alt={`${project.title} - ${currentIndex + 1}`}
            fill
            sizes="100vw"
            priority
            className="object-contain transition-opacity duration-300"
          />
        </div>

        {/* PREV / NEXT BUTTONS */}
        {total > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Foto anterior"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-2xl z-20"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={handleNext}
              type="button"
              aria-label="Foto siguiente"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-2xl z-20"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* BOTTOM THUMBNAILS & DETAILS BAR */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-30 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* PROJECT INFO SUMMARY */}
        <div className="text-center sm:text-left max-w-md">
          <h2 className="font-serif text-lg sm:text-xl text-white font-normal leading-snug">
            {project.title}
          </h2>
          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-mono text-white/60 mt-1">
            {project.location && (
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-[#b5a898]" />
                {project.location}
              </span>
            )}
            {project.year && (
              <span className="flex items-center gap-1">
                <Calendar size={11} className="text-[#b5a898]" />
                {project.year}
              </span>
            )}
            {project.role && (
              <span className="hidden md:inline-block text-[#b5a898]">
                {project.role}
              </span>
            )}
          </div>
        </div>

        {/* THUMBNAIL STRIP */}
        {total > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-xs sm:max-w-md py-1 px-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                type="button"
                className={`relative w-12 h-16 rounded-md overflow-hidden shrink-0 border transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "border-white scale-105 shadow-md ring-2 ring-white/40"
                    : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* CTA WHATSAPP / CONTACT */}
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/5491128362624?text=${encodeURIComponent(
              `Hola Ash, me interesa conocer más sobre tu servicio de estilismo para proyectos similares a: ${project.title}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-full transition-all shadow-lg"
          >
            <MessageCircle size={14} />
            <span>Consultar Producción</span>
          </a>
        </div>

      </div>

    </div>
  );
}
