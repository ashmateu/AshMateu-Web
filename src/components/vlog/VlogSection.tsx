"use client";

import React, { useState } from "react";
import Image from "next/image";
import { defaultVlogItems, VlogItem } from "@/lib/data/vlog";
import GsapReveal from "@/components/animations/GsapReveal";

export default function VlogSection({ items = defaultVlogItems }: { items?: VlogItem[] }) {
  const [activeItem, setActiveItem] = useState<VlogItem>(items[0] || defaultVlogItems[0]);
  const [playing, setPlaying] = useState(false);

  const handleSelect = (item: VlogItem) => {
    setActiveItem(item);
    setPlaying(true);
  };

  return (
    <section id="vlog" className="py-24 md:py-32 bg-white border-t border-[#b5a898]/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <GsapReveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
              Contenido Audiovisual &amp; Masterclasses
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-black tracking-tight">
              Vlog &amp; Redes
            </h2>
          </GsapReveal>
          <a
            href="https://www.youtube.com/playlist?list=PLHRzKysY3DfkOeyVYBN-SSvv9Za6PHv81"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-black hover:text-[#b5a898] border-b border-black/60 pb-1 transition-colors w-fit"
          >
            Ver en YouTube &amp; TikTok ↗
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* MAIN VIDEO PLAYER */}
          <div className="lg:col-span-8">
            <GsapReveal>
              <div className="relative aspect-video w-full bg-black overflow-hidden shadow-2xl border border-[#b5a898]/30">
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
                    className="group relative w-full h-full cursor-pointer"
                  >
                    <Image
                      src={activeItem.thumbnail}
                      alt={activeItem.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6 text-white translate-x-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#b5a898] font-medium block mb-2">
                  {activeItem.category}
                </span>
                <h3 className="font-serif text-2xl text-black font-normal leading-snug">
                  {activeItem.title}
                </h3>
              </div>
            </GsapReveal>
          </div>

          {/* PLAYLIST THUMBNAILS */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#7a7065] font-medium mb-2">
              Episodios &amp; Masterclasses
            </p>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`flex gap-4 p-3 text-left transition-all duration-200 border ${
                  activeItem.id === item.id
                    ? "bg-[#f7f3ee] border-black"
                    : "bg-white border-[#b5a898]/30 hover:border-black"
                }`}
              >
                <div className="relative w-28 aspect-video flex-shrink-0 bg-black overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] tracking-[0.18em] uppercase text-[#b5a898] font-medium line-clamp-1">
                    {item.category}
                  </span>
                  <h4 className="text-xs text-black font-medium line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
