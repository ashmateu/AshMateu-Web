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
    <section className="py-14 md:py-18 lg:py-20 bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-5">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#b5a898] mb-2.5 font-medium">
              <span>06 · Diario Visual &amp; Coberturas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-white tracking-tight">
              @ashmateu
            </h2>
          </GsapReveal>

          <a
            href="https://www.instagram.com/ashmateu"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#b5a898] hover:text-white border-b border-[#b5a898]/40 hover:border-white pb-1 transition-colors w-fit font-medium"
          >
            <span>Seguir en Instagram</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 6 EDITORIAL POLAROID TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {photos.map((p, idx) => (
            <GsapReveal key={idx} delay={idx * 0.03}>
              <a
                href="https://www.instagram.com/ashmateu"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[3/4] block bg-[#141416] border border-white/10 overflow-hidden shadow-md hover:border-[#b5a898] transition-all duration-400"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* CITY WATERMARK */}
                <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-[#b5a898] text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 font-medium">
                  {p.loc}
                </div>
              </a>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
