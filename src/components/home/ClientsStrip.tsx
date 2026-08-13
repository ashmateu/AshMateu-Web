"use client";

import React from "react";
import Image from "next/image";
import GsapReveal from "@/components/animations/GsapReveal";

interface BrandItem {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
}

const brandLogos: BrandItem[] = [
  {
    name: "Chanel",
    src: "/images/brands/chanel.svg",
    width: 100,
    height: 38,
    className: "h-7 sm:h-8",
  },
  {
    name: "Louis Vuitton",
    src: "/images/brands/louis_vuitton.svg",
    width: 110,
    height: 36,
    className: "h-6 sm:h-7",
  },
  {
    name: "Gucci",
    src: "/images/brands/gucci.svg",
    width: 110,
    height: 36,
    className: "h-5 sm:h-6",
  },
  {
    name: "Miu Miu",
    src: "/images/brands/miu_miu.svg",
    width: 105,
    height: 36,
    className: "h-5 sm:h-6",
  },
  {
    name: "Dolce & Gabbana",
    src: "/images/brands/dolce_gabbana.svg",
    width: 135,
    height: 34,
    className: "h-4 sm:h-5",
  },
  {
    name: "Marie Claire",
    src: "/images/brands/marie_claire.svg",
    width: 125,
    height: 38,
    className: "h-6 sm:h-7",
  },
  {
    name: "Nike",
    src: "/images/brands/nike.svg",
    width: 75,
    height: 36,
    className: "h-5 sm:h-6",
  },
  {
    name: "L'Oréal Paris",
    src: "/images/brands/loreal.svg",
    width: 115,
    height: 34,
    className: "h-4 sm:h-5",
  },
  {
    name: "Mercedes-Benz",
    src: "/images/brands/mercedes_benz.svg",
    width: 125,
    height: 40,
    className: "h-7 sm:h-8",
  },
  {
    name: "Netflix",
    src: "/images/brands/netflix.svg",
    width: 90,
    height: 36,
    className: "h-5 sm:h-6",
  },
];

export default function ClientsStrip() {
  return (
    <section className="py-20 md:py-24 bg-[#f7f3ee] border-b border-[#b5a898]/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <GsapReveal>
          {/* SECTION PILL BADGE */}
          <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-white/80 backdrop-blur-sm px-3.5 py-1 rounded-full text-[9px] tracking-[0.28em] uppercase text-[#7a7065] font-semibold mb-12 shadow-xs">
            <span>Marcas &amp; Publicaciones Seleccionadas</span>
          </div>

          {/* AUTHENTIC BRAND ISOLOGOS GRID */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-18">
            {brandLogos.map((brand) => (
              <div
                key={brand.name}
                className="group flex items-center justify-center p-2 transition-all duration-300 hover:scale-105"
                title={brand.name}
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  className={`${brand.className || "h-6"} w-auto object-contain brightness-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
