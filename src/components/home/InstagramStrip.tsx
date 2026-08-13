"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import GsapReveal from "@/components/animations/GsapReveal";

export default function InstagramStrip() {
  const photos = [
    { src: "/images/hero_studio/MARIECLAIRE_2608064304_web.webp", alt: "Ash Mateu Editorial", loc: "PARIS" },
    { src: "/images/extracted/chanel-hc/img-005.webp", alt: "Chanel Haute Couture NYC", loc: "NYC" },
    { src: "/images/extracted/valentina-miumiu/img-000.webp", alt: "Valentina Ferrer Miu Miu", loc: "MILAN" },
    { src: "/images/extracted/leonie-dg/img-003.webp", alt: "Leonie Hanne Dolce & Gabbana", loc: "VENEZIA" },
    { src: "/images/extracted/calu-chinatown/img-004.webp", alt: "Calu Rivero Chinatown", loc: "NYC" },
    { src: "/images/hero_studio/MARIECLAIRE_2608064351_web.webp", alt: "Ash Mateu Marie Claire", loc: "BA" },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 rounded-full text-[9.5px] tracking-[0.26em] uppercase text-[#b5a898] mb-3 font-medium">
              <span>06 · Diario Visual &amp; Coberturas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              @ashmateu
            </h2>
          </GsapReveal>

          <a
            href="https://www.instagram.com/ashmateu"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#b5a898] hover:text-white border-b border-[#b5a898]/40 hover:border-white pb-1 transition-colors w-fit font-medium"
          >
            <span>Seguir en Instagram</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 6 EDITORIAL POLAROID TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {photos.map((p, idx) => (
            <GsapReveal key={idx} delay={idx * 0.04}>
              <a
                href="https://www.instagram.com/ashmateu"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[3/4] block bg-[#141416] border border-white/10 overflow-hidden shadow-lg hover:border-[#b5a898] transition-all duration-500"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover object-[center_18%] group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* CITY WATERMARK */}
                <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-[#b5a898] text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 font-medium">
                  {p.loc}
                </div>

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#b5a898] text-black flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </div>
                </div>
              </a>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
