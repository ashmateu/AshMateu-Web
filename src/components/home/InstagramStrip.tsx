"use client";

import React from "react";
import Image from "next/image";
import GsapReveal from "@/components/animations/GsapReveal";

export default function InstagramStrip() {
  const photos = [
    { src: "/images/hero_studio/MARIECLAIRE_2608064304_web.webp", alt: "Ash Mateu Editorial" },
    { src: "/images/extracted/chanel-hc/img-005.webp", alt: "Chanel Haute Couture NYC" },
    { src: "/images/extracted/valentina-miumiu/img-000.webp", alt: "Valentina Ferrer Miu Miu" },
    { src: "/images/extracted/leonie-dg/img-003.webp", alt: "Leonie Hanne Dolce & Gabbana" },
    { src: "/images/extracted/calu-chinatown/img-004.webp", alt: "Calu Rivero Chinatown" },
    { src: "/images/hero_studio/MARIECLAIRE_2608064351_web.webp", alt: "Ash Mateu Marie Claire" },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <GsapReveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#b5a898] font-medium mb-2">
              Diario Visual &amp; Coberturas
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white">
              @ashmateu
            </h2>
          </GsapReveal>
          <a
            href="https://www.instagram.com/ashmateu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-[#b5a898] hover:text-white border-b border-[#b5a898]/60 pb-1 transition-colors w-fit"
          >
            Seguir en Instagram ↗
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {photos.map((p, idx) => (
            <GsapReveal key={idx} delay={idx * 0.05}>
              <a
                href="https://www.instagram.com/ashmateu"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square block bg-[#161616] overflow-hidden"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover object-[center_18%] group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs tracking-widest uppercase font-medium">
                    Ver ↗
                  </span>
                </div>
              </a>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
