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
      className="py-16 md:py-20 lg:py-24 bg-white border-t border-[#b5a898]/30 relative overflow-hidden"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-5">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-[#f7f3ee] px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#7a7065] mb-2.5 font-medium">
              <span>07 · Contenido Audiovisual &amp; Masterclasses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-black tracking-tight">
              Vlog &amp; Redes
            </h2>
          </GsapReveal>

          <a
            href="https://www.youtube.com/playlist?list=PLHRzKysY3DfkOeyVYBN-SSvv9Za6PHv81"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-black hover:text-[#b5a898] border-b border-black/40 hover:border-[#b5a898] pb-1 transition-colors w-fit font-medium"
          >
            <span>Ver Canal en YouTube &amp; TikTok</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* MAIN VIDEO THEATER + PLAYLIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* MAIN VIDEO PLAYER */}
          <div className="lg:col-span-8">
            <GsapReveal>
              <div className="relative aspect-video w-full bg-[#0a0a0a] overflow-hidden shadow-xl border border-black/80 group">
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
                      className="object-cover object-[center_top] group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/25 transition-colors flex items-center justify-center">
                      {/* LUXURY CIRCULAR PLAY BUTTON */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#b5a898]/90 text-black flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.5)] group-hover/thumb:scale-110 group-hover/thumb:bg-white transition-all duration-300 backdrop-blur-md">
                        <Play size={22} className="translate-x-0.5 fill-black" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-0.5 font-medium border border-white/20">
                      {activeItem.category}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#b5a898] font-semibold block mb-1.5">
                  {activeItem.category} · Episodio Destacado
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-black font-normal leading-snug">
                  {activeItem.title}
                </h3>
              </div>
            </GsapReveal>
          </div>

          {/* PLAYLIST THUMBNAILS */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#7a7065] font-semibold block pb-2 border-b border-[#b5a898]/30">
              Episodios &amp; Coberturas
            </span>

            {items.map((item, idx) => {
              const isCurrent = activeItem.id === item.id;
              return (
                <GsapReveal
                  key={item.id}
                  delay={idx * 0.04}
                  className={`group/item flex gap-3 p-2.5 border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-[#FAF7F2] border-black shadow-sm"
                      : "bg-white border-[#b5a898]/30 hover:border-black hover:bg-[#FAF7F2]"
                  }`}
                >
                  <div
                    onClick={() => handleSelect(item)}
                    className="relative w-24 h-16 sm:w-28 sm:h-18 flex-shrink-0 bg-black overflow-hidden"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover object-[center_top] group-hover/item:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play size={14} className="fill-white text-white opacity-80" />
                    </div>
                  </div>

                  <div onClick={() => handleSelect(item)} className="flex-1 flex flex-col justify-center">
                    <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#7a7065] font-medium block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-xs text-black font-normal line-clamp-2 leading-snug group-hover/item:text-[#b5a898] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </GsapReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
