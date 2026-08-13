"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { defaultVlogItems, VlogItem } from "@/lib/data/vlog";
import GsapReveal from "@/components/animations/GsapReveal";

export default function VlogSection({
  items = defaultVlogItems,
}: {
  items?: VlogItem[];
}) {
  const [activeItem, setActiveItem] = useState<VlogItem>(
    items[0] || defaultVlogItems[0]
  );
  const [playing, setPlaying] = useState(false);

  const handleSelect = (item: VlogItem) => {
    setActiveItem(item);
    setPlaying(true);
  };

  return (
    <section
      id="vlog"
      className="py-24 md:py-36 bg-white border-t border-[#b5a898]/30 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-6">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-[#f7f3ee] px-3 py-1 rounded-full text-[9.5px] tracking-[0.26em] uppercase text-[#7a7065] mb-3 font-medium">
              <span>05 · Contenido Audiovisual &amp; Masterclasses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
              Vlog &amp; Redes
            </h2>
          </GsapReveal>

          <a
            href="https://www.youtube.com/playlist?list=PLHRzKysY3DfkOeyVYBN-SSvv9Za6PHv81"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-black hover:text-[#b5a898] border-b border-black/40 hover:border-[#b5a898] pb-1 transition-colors w-fit font-medium"
          >
            <span>Ver Canal en YouTube &amp; TikTok</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* MAIN VIDEO THEATER + PLAYLIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* MAIN VIDEO PLAYER */}
          <div className="lg:col-span-8">
            <GsapReveal>
              <div className="relative aspect-video w-full bg-[#0a0a0a] overflow-hidden shadow-2xl border border-black/80 group">
                {playing ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeItem.youtubeId}?autoplay=1&rel=0`}
                    title={activeItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div
                    onClick={() => setPlaying(true)}
                    className="group/thumb relative w-full h-full cursor-pointer"
                  >
                    <Image
                      src={activeItem.thumbnail}
                      alt={activeItem.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/25 transition-colors flex items-center justify-center">
                      {/* LUXURY CIRCULAR PLAY BUTTON */}
                      <div className="w-18 h-18 rounded-full bg-[#b5a898]/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover/thumb:scale-110 group-hover/thumb:bg-white transition-all duration-300 backdrop-blur-md">
                        <Play size={26} className="translate-x-0.5 fill-black" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1 font-medium border border-white/20">
                      {activeItem.category}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#b5a898] font-semibold block mb-2">
                  {activeItem.category} · Episodio Destacado
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-black font-normal leading-snug">
                  {activeItem.title}
                </h3>
              </div>
            </GsapReveal>
          </div>

          {/* PLAYLIST THUMBNAILS */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#7a7065] font-semibold mb-1 block">
              Episodios &amp; Masterclasses
            </span>

            {items.map((item, i) => {
              const isSelected = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`flex gap-4 p-3 text-left transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? "bg-[#FAF7F2] border-black shadow-sm"
                      : "bg-white border-[#b5a898]/30 hover:border-black"
                  }`}
                >
                  <div className="relative w-28 aspect-video flex-shrink-0 bg-black overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-ping" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#b5a898] font-medium line-clamp-1 mb-1">
                      № 0{i + 1} · {item.category}
                    </span>
                    <h4 className="text-xs text-black font-medium line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
