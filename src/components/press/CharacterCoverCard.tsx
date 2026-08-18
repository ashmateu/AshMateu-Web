"use client";

import React, { useState } from "react";
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

export function CharacterCoverCard({ group }: { group: CharacterCoverGroup }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = group.covers.length;
  const isMulti = total > 1;

  const currentCover = group.covers[currentIndex];

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
    <div className="bg-white rounded-2xl border border-[#B5A898]/40 overflow-hidden group hover:border-black transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between">
      {/* IMAGE / MINI CAROUSEL CONTAINER */}
      <div className="relative aspect-[3/4.2] w-full bg-[#FAF6F0] overflow-hidden select-none">
        <Image
          key={currentCover.src}
          src={currentCover.src}
          alt={currentCover.title || group.characterName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover object-[center_top] transition-transform duration-500 group-hover:scale-102"
        />

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded text-[8.5px] font-mono font-bold tracking-wider uppercase text-[#0A0A0A] border border-[#B5A898]/30 shadow-2xs">
            {group.badge}
          </div>

          {isMulti && (
            <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono font-medium tracking-wider uppercase text-white/90 border border-white/15 flex items-center gap-1 shadow-2xs">
              <Layers size={10} className="text-[#b5a898]" />
              <span>
                {currentIndex + 1} / {total}
              </span>
            </div>
          )}
        </div>

        {/* NAVIGATION OVERLAYS (IF MULTI-IMAGE) */}
        {isMulti && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Portada anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-black hover:text-white text-black backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md border border-[#B5A898]/30 cursor-pointer z-20"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={handleNext}
              type="button"
              aria-label="Portada siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-black hover:text-white text-black backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md border border-[#B5A898]/30 cursor-pointer z-20"
            >
              <ChevronRight size={16} />
            </button>

            {/* BOTTOM DOTS BAR */}
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1 z-10 pointer-events-none">
              {group.covers.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    dotIdx === currentIndex
                      ? "w-4 bg-white shadow-sm"
                      : "w-1 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* FOOTER & METADATA */}
      <div className="p-4 sm:p-5 bg-white border-t border-[#B5A898]/20 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[8.5px] font-mono tracking-widest uppercase text-[#7A6A5A] font-semibold truncate">
              {group.publication}
            </span>
            {isMulti && (
              <span className="text-[8px] font-mono text-[#7A6A5A] uppercase tracking-wider shrink-0">
                {total} {total === 1 ? "tapa" : "tapas"}
              </span>
            )}
          </div>

          <h3 className="font-serif text-base sm:text-lg text-[#0A0A0A] font-normal leading-snug truncate mb-1">
            {group.characterName}
          </h3>

          <p className="text-[11px] text-[#121212]/70 font-light truncate">
            {currentCover.title || group.roleOrNote}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CharacterCoverCard;
