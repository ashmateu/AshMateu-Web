"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

export interface CoverItem {
  src: string;
  title: string;
  subtitle?: string;
  date?: string;
}

export interface CharacterCoverGroup {
  id: string;
  characterName: string;
  publication: string;
  roleOrNote: string;
  badge: string;
  covers: CoverItem[];
}

export function CharacterCoverCard({
  group,
  autoplayIntervalMs = 4000,
}: {
  group: CharacterCoverGroup;
  autoplayIntervalMs?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = group.covers.length;
  const isMulti = total > 1;

  // Autoplay with crossfade
  useEffect(() => {
    if (!isMulti || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoplayIntervalMs);

    return () => clearInterval(timer);
  }, [isMulti, isHovered, total, autoplayIntervalMs]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-[3/4.2] w-full rounded-2xl border border-[#B5A898]/40 overflow-hidden group hover:border-black transition-all duration-500 shadow-xs hover:shadow-xl bg-[#FAF6F0] select-none"
    >
      {/* ALL IMAGES STACKED FOR SMOOTH CROSSFADE */}
      {group.covers.map((cover, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={`${cover.src}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={cover.src}
              alt={cover.title || group.characterName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover object-[center_top] group-hover:scale-103 transition-transform duration-700 ease-out"
              priority={idx === 0}
            />
          </div>
        );
      })}

      {/* HOVER OVERLAY (APPEARS ONLY ON HOVER) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20 flex flex-col justify-between p-5 text-white pointer-events-none">
        
        {/* TOP METADATA BAR */}
        <div className="flex items-center justify-between pointer-events-auto">
          <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded text-[8.5px] font-mono font-bold tracking-wider uppercase text-white border border-white/20 shadow-2xs">
            {group.publication}
          </span>

          {isMulti && (
            <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[8.5px] font-mono font-medium tracking-wider text-[#b5a898] border border-white/10 flex items-center gap-1.5 shadow-2xs">
              <Layers size={10} />
              <span>
                {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </span>
          )}
        </div>

        {/* BOTTOM METADATA & TITLES */}
        <div className="pointer-events-auto">
          <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-tight mb-1">
            {group.characterName}
          </h3>

          <p className="text-xs font-sans text-white/80 font-light leading-snug line-clamp-2 mb-3">
            {group.covers[currentIndex]?.title || group.roleOrNote}
          </p>

          {/* DOTS INDICATOR (IF MULTI) */}
          {isMulti && (
            <div className="flex items-center gap-1.5 pt-2 border-t border-white/20">
              {group.covers.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(dotIdx);
                  }}
                  type="button"
                  aria-label={`Ir a portada ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === currentIndex
                      ? "w-6 bg-[#b5a898]"
                      : "w-1.5 bg-white/40 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ARROW NAVIGATION (VISIBLE ONLY ON HOVER IF MULTI) */}
      {isMulti && (
        <>
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Portada anterior"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-white hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg border border-white/20 cursor-pointer z-30"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={handleNext}
            type="button"
            aria-label="Portada siguiente"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-white hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg border border-white/20 cursor-pointer z-30"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}

export default CharacterCoverCard;
