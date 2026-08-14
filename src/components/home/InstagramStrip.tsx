"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import GsapReveal from "@/components/animations/GsapReveal";

export default function InstagramStrip() {
  const photos = [
    {
      src: "/images/catalog/03_fashion_week_paris_canon/4A2A4418.JPEG",
      alt: "Ash Mateu en Paris Fashion Week Street Style",
      loc: "PARÍS",
    },
    {
      src: "/images/catalog/01_chanel_alta_costura_studio/_E8A9215.jpg",
      alt: "Producción Chanel Haute Couture",
      loc: "ESTUDIO",
    },
    {
      src: "/images/catalog/03_fashion_week_paris_canon/4A2A4232.JPEG",
      alt: "Ash Mateu en Fashion Week Fitting & Shows",
      loc: "PARÍS",
    },
    {
      src: "/images/hero_studio/MARIECLAIRE_2608064419_web.webp",
      alt: "Ash Mateu Retrato Editorial de Moda",
      loc: "BUENOS AIRES",
    },
    {
      src: "/images/catalog/03_fashion_week_paris_canon/4A2A4184.JPEG",
      alt: "Ash Mateu Cobertura de Moda Internacional",
      loc: "PARÍS",
    },
    {
      src: "/images/hero_studio/MARIECLAIRE_2608064351_web.webp",
      alt: "Ash Mateu Dirección Creativa & Styling",
      loc: "NUEVA YORK",
    },
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
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>

        {/* 6 HIGH-IMPACT POLAROID EDITORIAL TILES */}
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
                  className="object-cover object-[center_top] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </a>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
